from rest_framework.routers import DefaultRouter
from rest_framework_extensions.routers import NestedRouterMixin
from api import views

#router = DefaultRouter()
#router.register(r'users', views.UserViewset)
#router.register(r'travels', views.TravelViewset)

class NestedDefaultRouter(NestedRouterMixin, DefaultRouter):
    pass

router = NestedDefaultRouter()

router.register(r'users', views.UserViewset)
router.register(r'travels', views.TravelViewset).register(r'positions', views.TravelPositionViewset, basename='travel-positions', parents_query_lookups=['travel'])
