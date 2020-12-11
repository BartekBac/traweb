from rest_framework import viewsets
from . import models
from . import serializers
from rest_framework.permissions import AllowAny, IsAuthenticated


class UserViewset(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = (AllowAny,)
        elif self.request.method == 'GET':
            self.permission_classes = (IsAuthenticated)

        return super(UserViewset, self).get_permissions()
