from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    country = models.CharField(max_length=254)
    city = models.CharField(max_length=254)
    zip_code = models.CharField(max_length=254)

class Travel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=256)
    begin_date = models.DateField(blank=True)
    end_date = models.DateField(blank=True)
    country_codes = models.CharField(max_length=2048,blank=True)
    cities = models.CharField(max_length=2048,blank=True)

class Coordinates(models.Model):
    lat = models.FloatField()
    lng = models.FloatField()

class TravelPosition(models.Model):
    travel = models.ForeignKey(Travel, related_name='positions', on_delete=models.CASCADE)
    coordinates = models.OneToOneField(
        Coordinates,
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=256)
    type = models.SmallIntegerField()
    rating = models.SmallIntegerField()
    description = models.CharField(max_length=2048, blank=True)
    main_image = models.CharField(max_length=256, blank=True)
    pictures = models.CharField(max_length=4096, blank=True)
    country_code = models.CharField(max_length=256, blank=True)
    city = models.CharField(max_length=256, blank=True)
