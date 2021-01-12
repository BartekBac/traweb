from rest_framework import routers
from api import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewset)
router.register(r'travels', views.TravelViewset)
router.register(r'travel-positions', views.TravelPositionViewset)