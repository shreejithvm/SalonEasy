from rest_framework import serializers
from adminApp.models import (User,ProfileModel,StaffModel,ServiceModel,BookingModel,PaymentModel,FeedbackModel)
from datetime import date

# class UserSerializer(serializers.ModelSerializer):
#     id=serializers.IntegerField(read_only=True)
#     class Meta:
#         model = User
#         fields = ["id","email","username","role","is_active",]

# class UserSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True)

#     class Meta:
#         model = User
#         fields = ['id', 'email', 'username', 'password', 'role']

#     def create(self, validated_data):
#         return User.objects.create_user(**validated_data)

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password', 'role']

    def create(self, validated_data):
        role = validated_data.get("role")

        #Block admin registration
        if role == "ADMIN":
            raise serializers.ValidationError("Admin cannot register")

        # Create user
        user = User.objects.create_user(**validated_data)

        #  Mark staff correctly
        if role == "STAFF":
            user.is_staff = True
            user.save()

        return user
            
class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = ProfileModel
        fields = ["id","user","phone","profile_pic",]

class StaffSerializer(serializers.ModelSerializer):
    id=serializers.IntegerField(read_only=True)
    user = UserSerializer(read_only=True)
    is_active=serializers.BooleanField(read_only=True)
    class Meta:
        model = StaffModel
        fields = ["id","user","specialization","staff_phone","price","staff_profile","is_active",]

        

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceModel
        fields = ["id","name","description","service_type",]

class BookingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    staff = StaffSerializer(read_only=True)
    staff_id = serializers.PrimaryKeyRelatedField(queryset=StaffModel.objects.all(),source="staff",write_only=True)
    class Meta:
        model=BookingModel
        fields=["id","user","staff","staff_id","service","price","booking_date","booking_time","is_paid","created_at",]
        read_only_fields = ["is_paid", "created_at"]

    def validate(self, attrs):
        staff = attrs["staff"]
        booking_date = attrs["booking_date"]
        booking_time = attrs["booking_time"]

        # ❌ Past date
        if booking_date < date.today():
            raise serializers.ValidationError({
                "booking_date": "Booking date cannot be in the past."
            })

        # ❌ Duplicate booking (THIS IS THE KEY)
        if BookingModel.objects.filter(
            staff=staff,
            booking_date=booking_date,
            booking_time=booking_time
        ).exists():
            raise serializers.ValidationError({
                "booking_time": "This time slot is already booked. Please choose another time."
            })

        return attrs    

        


class PaymentSerializer(serializers.ModelSerializer):
    booking_id = serializers.PrimaryKeyRelatedField(
        queryset=BookingModel.objects.all(),
        source="booking"
    )

    class Meta:
        model = PaymentModel
        fields = [
            "id",
            "booking_id",
            "user",
            "razorpay_order_id",
            "razorpay_payment_id",
            "razorpay_signature",
            "amount",
            "status",
            "created_at",
        ]
        read_only_fields = ["status", "created_at"]


class FeedbackSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    staff = StaffSerializer(read_only=True)
    booking_id = serializers.PrimaryKeyRelatedField(
        queryset=BookingModel.objects.all(),
        source="booking"
    )

    class Meta:
        model = FeedbackModel
        fields = [
            "id",
            "booking_id",
            "user",
            "staff",
            "rating",
            "comment",
            "created_at",
        ]
        read_only_fields = ["created_at"]
