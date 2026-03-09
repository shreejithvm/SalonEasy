from django.shortcuts import render
from adminApp.models import User,ProfileModel,StaffModel,ServiceModel,BookingModel,PaymentModel,FeedbackModel
from rest_framework.response import Response
# from rest_framework.viewsets import ModelViewSet
from rest_framework import viewsets, permissions,status
from rest_framework import authentication
from adminApp.serializers import UserSerializer,ProfileSerializer,StaffSerializer,ServiceSerializer,BookingSerializer,PaymentSerializer,FeedbackSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action,api_view,authentication_classes,permission_classes
from rest_framework.exceptions import ValidationError
from rest_framework.generics import CreateAPIView
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAdminUser

from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from django.db import IntegrityError
from rest_framework import status
from django.conf import settings
import razorpay
from django.shortcuts import get_object_or_404


@api_view(["GET"])                              # this is the customr method which gives user info by token
@authentication_classes([authentication.TokenAuthentication])
@permission_classes([permissions.IsAuthenticated])
def getdata(request,*args,**kwargs):
    user=request.user
    return Response({"id":user.id,"username":user.username})


# Create your views here.
class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAdminUser]

    @action(detail=False,methods=["GET"],permission_classes=[IsAdminUser])
    def get_users(self,request):
        customer=User.objects.filter(role="CUSTOMER")
        serilizer=UserSerializer(customer,many=True)
        return Response(serilizer.data)

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = ProfileModel.objects.all()
    serializer_class = ProfileSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ProfileModel.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated],url_path="me")
    def me(self, request,*kwargs,**args):
        profile,created =ProfileModel.objects.get_or_create(user=request.user)
        serializer =self.get_serializer(profile)
        return Response(serializer.data)    

class StaffProfileCreateView(CreateAPIView):
    serializer_class = StaffSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        if StaffModel.objects.filter(user=self.request.user).exists():
            raise ValidationError({"msg": "Profile already created"})
        serializer.save(user=self.request.user,is_active=True)

class StaffProfileView(RetrieveUpdateAPIView):
    serializer_class = StaffSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self):
        try:
            return StaffModel.objects.get(user=self.request.user)
        except StaffModel.DoesNotExist:
            raise NotFound("Profile not found")

# class StaffProfileListView(ListAPIView):
#     queryset = StaffModel.objects.all()
#     serializer_class = StaffSerializer
#     # authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated]

class StaffProfileList(viewsets.ModelViewSet):
    queryset=StaffModel.objects.all()
    serializer_class=StaffSerializer
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAuthenticated]

    @action(detail=False,methods=["GET"])
    def getMyorder(self,request):
        staff_profile=get_object_or_404(StaffModel,user=request.user)
        bookings=BookingModel.objects.filter(staff=staff_profile, is_paid=True)
        serializer=BookingSerializer(bookings,many=True)
        return Response(serializer.data)
    
      


class StaffRole(viewsets.ModelViewSet):
    queryset = StaffModel.objects.filter(is_active=True)
    serializer_class = StaffSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        specialization = self.request.query_params.get("specialization")

        if specialization:
            queryset = queryset.filter(specialization=specialization)

        return queryset      


class ServiceViewSet(viewsets.ModelViewSet):
    queryset=ServiceModel.objects.all()
    serializer_class=ServiceSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAdminUser]    


class BookingViewSet(viewsets.ModelViewSet):
    queryset = BookingModel.objects.all()
    serializer_class = BookingSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False,methods=["GET"],permission_classes=[IsAdminUser])    
    def get_allorders(self,request):
        orders=BookingModel.objects.filter(is_paid=True)
        serializer=BookingSerializer(orders,many=True)
        return Response(serializer.data)
    


class BookedSlot(APIView):
    def get(self,request):
        staff_id = request.query_params.get("staff")
        date=request.query_params.get("date")
        bookings=BookingModel.objects.filter(staff_id=staff_id,booking_date=date).values_list("booking_time", flat=True)
        return Response(list(bookings))


class BookingCreateView(CreateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except IntegrityError:
            raise serializers.ValidationError(
                {"detail": "This time slot is already booked. Please choose another time."}
            )


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = PaymentModel.objects.all()
    serializer_class = PaymentSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CreatePaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        booking_id = request.data.get("booking_id")

        booking = BookingModel.objects.get(id=booking_id)
        print("KEY ID:", settings.RAZORPAY_KEY_ID)
        print("KEY SECRET:", settings.RAZORPAY_KEY_SECRET)

        # create razorpay client
        client = razorpay.Client(
            auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
        )
           
        # create razorpay order
        order = client.order.create({
            "amount": int(booking.price * 100),  # convert to paise
            "currency": "INR",
            "payment_capture": 1
        })

        # save payment record
        payment = PaymentModel.objects.create(
            booking=booking,
            user=request.user,
            amount=booking.price,
            razorpay_order_id=order["id"],
            status="CREATED"
        )

        return Response({
            "order_id": order["id"],
            "razorpay_key": settings.RAZORPAY_KEY_ID,
            "amount": booking.price
        })        

@api_view(["POST"])
def verify_payment(request):

    data = request.data

    client = razorpay.Client(
        auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
    )

    try:
        client.utility.verify_payment_signature({
            "razorpay_order_id": data["razorpay_order_id"],
            "razorpay_payment_id": data["razorpay_payment_id"],
            "razorpay_signature": data["razorpay_signature"]
        })

        payment = PaymentModel.objects.get(
            razorpay_order_id=data["razorpay_order_id"]
        )

        payment.razorpay_payment_id = data["razorpay_payment_id"]
        payment.razorpay_signature = data["razorpay_signature"]
        payment.status = "SUCCESS"
        payment.save()

        # mark booking paid
        booking = payment.booking
        booking.is_paid = True
        booking.save()

        return Response({"message": "Payment successful"})

    except:
        return Response(
            {"message": "Payment verification failed"},
            status=status.HTTP_400_BAD_REQUEST
        )
    
class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = FeedbackModel.objects.all()
    serializer_class = FeedbackSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        booking = serializer.validated_data["booking"]
        serializer.save(user=self.request.user,staff=booking.staff)


class BookConfView(APIView):
    def get(self,request):
        bookings=BookingModel.objects.filter(user=request.user,is_paid=True)
        serializer=BookingSerializer(bookings,many=True)
        return Response(serializer.data)

