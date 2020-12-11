from rest_framework import permissions
from . import models

class IsOwnedUserModel(permissions.BasePermission):

      def has_permission(self, request, view):
           user = models.User.objects.get(pk=view.kwargs['pk']) # get user from user table.
           if request.user == user:
              return True

           return False