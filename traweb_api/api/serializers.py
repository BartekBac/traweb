from rest_framework import serializers
from .models import User, Travel, Coordinates, TravelPosition
from .util import Url


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'first_name', 'last_name',
                  'country', 'city', 'zip_code', 'last_login', 'date_joined')
        write_only_fields = ('password',)
        read_only_fields = ('id', 'last_login', 'date_joined')

    def create(self, validated_data):
        user = User.objects.create(
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

class CoordinatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coordinates
        fields = ('lat', 'lng')

# TODO: dodać przy travelposition update na podobę create

class TravelPositionSerializer(serializers.ModelSerializer):
    coordinates = CoordinatesSerializer()
    class Meta:
        model = TravelPosition
        fields = ('id', 'name', 'coordinates', 'type', 'rating',
         'description', 'main_image', 'pictures', 'country_code', 'city')
        read_only_fields = ('id',)

    def create(self, validated_data):
        travel_id = Url(self.context['request'].path).get_id_of('travels/')
        travel = Travel.objects.get(pk=travel_id)
        coordinates_data = validated_data.pop('coordinates')
        coordinates = Coordinates.objects.create(**coordinates_data)
        return TravelPosition.objects.create(**validated_data, travel=travel, coordinates=coordinates)

class TravelSerializer(serializers.ModelSerializer):
    positions = TravelPositionSerializer(many=True, read_only=True)
    class Meta:
        model = Travel
        fields = ('id', 'user', 'name', 'begin_date', 'end_date', 'country_codes', 'cities', 'positions')
        read_only_fields = ('id', 'positions',)
    
    def to_representation(self, instance):
        self.fields['user'] =  UserSerializer(read_only=True)
        return super(TravelSerializer, self).to_representation(instance)
