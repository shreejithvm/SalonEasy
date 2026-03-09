from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    ROLE_CHOICES=(
        ('ADMIN','Admin'),
        ('STAFF','Staff'),
        ('CUSTOMER','Customer'),
    )

    email=models.EmailField(unique=True)
    role=models.CharField(max_length=10, choices=ROLE_CHOICES)

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['username']

    def __str__(self):
        return f"{self.email} ({self.role})"
    
class ProfileModel(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)   
    phone=models.CharField(max_length=15,blank=True)
    profile_pic=models.ImageField(upload_to="profiles/",blank=True)

    def __str__(self):
        return self.user.email
    

class StaffModel(models.Model):
    ROLE_CHOICES=(
        ("HAIR","hair"),
        ("SKIN","skin"),
        ("NAILS","nails"),
    )
    user=models.OneToOneField(User,on_delete=models.CASCADE) 
    specialization=models.CharField(max_length=10, choices=ROLE_CHOICES)  
    staff_phone=models.CharField(max_length=15,blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    staff_profile=models.ImageField(upload_to="staff_pic",blank=True ,null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.user.username
    

class ServiceModel(models.Model):
    SERVICE_CHOICES = (
        ("HAIR", "Hair"),
        ("SKIN", "Skin"),
        ("NAILS", "Nails"),
    )

    name = models.CharField(max_length=50)
    description=models.CharField(max_length=150)
    service_type = models.CharField(max_length=10, choices=SERVICE_CHOICES)

    def __str__(self):
        return self.name
    
   
class BookingModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bookings")
    staff = models.ForeignKey(StaffModel, on_delete=models.CASCADE, related_name="staff_bookings")
    service = models.CharField(max_length=10, choices=StaffModel.ROLE_CHOICES)

    price = models.DecimalField(max_digits=8, decimal_places=2)

    booking_date = models.DateField()
    booking_time = models.TimeField()
    is_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("staff", "booking_date", "booking_time")

    def __str__(self):
        return f"{self.user.username} - {self.service} - {self.booking_date}"


          
class PaymentModel(models.Model):
    PAYMENT_STATUS = (
        ("CREATED", "Created"),
        ("SUCCESS", "Success"),
        ("FAILED", "Failed"),
    )

    booking = models.ForeignKey(BookingModel,on_delete=models.CASCADE,related_name="payments")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    razorpay_order_id = models.CharField(max_length=100, blank=True, null=True)
    razorpay_payment_id = models.CharField(max_length=100, blank=True, null=True)
    razorpay_signature = models.CharField(max_length=255, blank=True, null=True)
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    status = models.CharField(max_length=10,choices=PAYMENT_STATUS, default="CREATED")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.booking.id} - {self.status}"
    
class FeedbackModel(models.Model):
    booking = models.OneToOneField(BookingModel,on_delete=models.CASCADE,related_name="feedback")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    staff = models.ForeignKey(StaffModel, on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField()  # 1 to 5
    comment = models.TextField(blank=True) 
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.staff.user.username} - {self.rating}⭐"

        
