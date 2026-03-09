from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from adminApp.models import User
from adminApp.serializers import UserSerializer
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class LoginView(ObtainAuthToken):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['user']
        token, _ = Token.objects.get_or_create(user=user)
   
        return Response({
            "token": token.key,
            "user_id": user.id,
            "role": user.role,
            "is_staff": user.is_staff,   # 👈 REQUIRED
            "is_superuser": user.is_superuser            
        })

class ForgotPasswordView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get("email")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=400)

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)

        reset_link = f"http://localhost:5173/reset/{uid}/{token}/"

        send_mail(
            "Password Reset",
            f"Click here to reset your password: {reset_link}",
            "your_email@gmail.com",
            [email],
        )

        return Response({"message": "Reset link sent to email"})
    
class ResetPasswordView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, uidb64, token):
        new_password = request.data.get("password")

        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except:
            return Response({"error": "Invalid link"}, status=400)

        if not default_token_generator.check_token(user, token):
            return Response({"error": "Token invalid"}, status=400)

        user.set_password(new_password)
        user.save()

        return Response({"message": "Password reset successful"})
    
