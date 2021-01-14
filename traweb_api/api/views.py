from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import User, Travel, TravelPosition
from .serializers import UserSerializer, TravelSerializer, TravelPositionSerializer
from .permissions import IsOwnedUserModel


class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    #def get_permissions(self):
    #    if self.request.method == 'POST':
    #        self.permission_classes = (AllowAny,)
    #    elif self.request.method == 'GET':
    #        self.permission_classes = (IsAuthenticated,)
    #    elif self.request.method in ['PATCH', 'PUT']:
    #        self.permission_classes = (IsOwnedUserModel,)
    #
    #    return super(UserViewset, self).get_permissions()

    def get_object(self):
        pk = self.kwargs.get('pk')

        if pk == "current":
            return self.request.user

        return super(UserViewset, self).get_object()

class TravelViewset(viewsets.ModelViewSet):
    queryset = Travel.objects.all()
    serializer_class = TravelSerializer


class TravelPositionViewset(viewsets.ModelViewSet):
    queryset = TravelPosition.objects.all()
    serializer_class = TravelPositionSerializer

# TODO: dodać jakieś filtrowanie że z url bierze travel_id i zwraca tylko do te positions
