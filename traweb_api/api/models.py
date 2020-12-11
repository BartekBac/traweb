from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    country = models.CharField(max_length=254)
    city = models.CharField(max_length=254)
    zip_code = models.CharField(max_length=254)
