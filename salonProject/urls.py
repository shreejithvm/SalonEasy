"""
URL configuration for salonProject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from adminApp import views
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken import views as authview
from rest_framework.routers import DefaultRouter
from userApp.views import RegisterView, LoginView
from adminApp.views import StaffProfileCreateView,StaffProfileView,CreatePaymentView,verify_payment,BookConfView
from userApp.views import ForgotPasswordView,ResetPasswordView
from django.contrib.auth import views as auth_views
routers=DefaultRouter()
routers.register('user',views.UserView,basename="user_view")
routers.register('profile',views.ProfileViewSet,basename="profile_view")
routers.register('staff/orders',views.StaffProfileList,basename="staff_orders")
routers.register('staffs',views.StaffProfileList,basename="staffs_view")
routers.register('staffrole',views.StaffRole, basename='staff')
routers.register('service',views.ServiceViewSet,basename="service_view")
routers.register('booking',views.BookingViewSet,basename="booking_view")
routers.register('payment',views.PaymentViewSet,basename="payment_view")
routers.register('feedback',views.FeedbackViewSet,basename="feedback_view")

urlpatterns = [
        path('password_reset/', 
         auth_views.PasswordResetView.as_view(), 
         name='password_reset'),

    path('password_reset_done/', 
         auth_views.PasswordResetDoneView.as_view(), 
         name='password_reset_done'),

    path('reset/<uidb64>/<token>/', 
         auth_views.PasswordResetConfirmView.as_view(), 
         name='password_reset_confirm'),

    path('reset_done/', 
         auth_views.PasswordResetCompleteView.as_view(), 
         name='password_reset_complete'),

    path("forgot-password/", ForgotPasswordView.as_view()),
    path("reset-password/<uidb64>/<token>/", ResetPasswordView.as_view()),         

    path("staff/profile/", StaffProfileView.as_view()),
    path("staff/profile/create/", StaffProfileCreateView.as_view()),
    path("booked/",views.BookedSlot.as_view()),
    path("mybook/",views.BookConfView.as_view()),
    path("create/book/",views.BookingCreateView.as_view()),
    path("create-payment/", CreatePaymentView.as_view()),
    path("verify-payment/", verify_payment),
    path('admin/', admin.site.urls),
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
    path('get/user',views.getdata),
    path('token',authview.obtain_auth_token)
    
]+routers.urls + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
