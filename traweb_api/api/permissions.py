from rest_framework import permissions
from .models import User


class IsOwnedUserModel(permissions.BasePermission):

    def has_permission(self, request, view):
        user = User.objects.get(pk=view.kwargs['pk']) # get user from user table.
        if request.user == user:
            return True

        return False


class IsOwnedTravel(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return request.user == obj.user
