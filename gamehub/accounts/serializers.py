from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from games.models import Usersonline


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])
        new_user = Usersonline.objects.create(user=user, status="online")
        print(new_user)
        new_user.save()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            get_user = Usersonline.objects.get(user=user)
            get_user.status = "online"
            get_user.save()

            return user
        raise serializers.ValidationError("Incorrect Credentials")
