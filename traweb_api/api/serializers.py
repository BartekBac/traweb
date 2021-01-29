from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer
from .models import User, Travel, Coordinates, TravelPosition, Opinion


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'first_name', 'last_name',
                  'country', 'city', 'zip_code', 'last_login', 'date_joined', 'friends')
        write_only_fields = ('password',)
        read_only_fields = ('id', 'last_login', 'date_joined')

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create(
            email=validated_data['email'],
            username=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            country=validated_data['country'],
            city=validated_data['city'],
            zip_code=validated_data['zip_code'],
            friends=""
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

class CoordinatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coordinates
        fields = ('lat', 'lng')

class TravelPositionSerializer(WritableNestedModelSerializer):
    coordinates = CoordinatesSerializer()
    class Meta:
        model = TravelPosition
        fields = ('id', 'name', 'coordinates', 'type', 'rating',
         'description', 'main_image', 'pictures', 'country_code', 'city')

class OpinionSerializer(WritableNestedModelSerializer):
    class Meta:
        model = Opinion
        fields = ('is_positive', 'description')

class TravelSerializer(WritableNestedModelSerializer):
    begin_date = serializers.DateField(format="%d-%m-%Y", input_formats=['%d-%m-%Y', 'iso-8601']) # to do wywalenia 
    end_date = serializers.DateField(format="%d-%m-%Y", input_formats=['%d-%m-%Y', 'iso-8601'])
    positions = TravelPositionSerializer(many=True)
    opinions = OpinionSerializer(many = True)
    class Meta:
        model = Travel
        fields = ('id', 'user', 'name', 'begin_date', 'end_date', 'country_codes', 'cities', 'positions', 'opinions')
        read_only_fields = ('id',)

    
    def to_representation(self, instance):
        self.fields['user'] =  UserSerializer(read_only=True)
        return super(TravelSerializer, self).to_representation(instance)

