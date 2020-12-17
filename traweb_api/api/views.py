from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer
from .permissions import IsOwnedUserModel
from rest_framework.permissions import AllowAny, IsAuthenticated


class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = (AllowAny,)
        elif self.request.method == 'GET':
            self.permission_classes = (IsAuthenticated,)
        elif self.request.method in ['PATCH', 'PUT']:
            self.permission_classes = (IsOwnedUserModel,)

        return super(UserViewset, self).get_permissions()

    def get_object(self):
        pk = self.kwargs.get('pk')

        if pk == "current":
            return self.request.user

        return super(UserViewset, self).get_object()
