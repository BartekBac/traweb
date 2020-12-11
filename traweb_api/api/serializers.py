from rest_framework import serializers
from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('id', 'email', 'password', 'first_name', 'last_name',
                  'country', 'city', 'zip_code', 'last_login', 'date_joined')
        write_only_fields = ('password',)
        read_only_fields = ('id', 'last_login', 'date_joined')

    def create(self, validated_data):
        user = models.User.objects.create(
            email=validated_data['email'],
            username=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            country=validated_data['country'],
            city=validated_data['city'],
            zip_code=validated_data['zip_code']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user
