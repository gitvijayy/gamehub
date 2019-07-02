from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from games.models import OnlinePlayers
from .models import PlayerOnline
# User Serial


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

# Register Serial


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])
        return user

# Login Serial


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            get_user = OnlinePlayers.objects.filter(user=user)
            if get_user:
                get_user = OnlinePlayers.objects.get(user=user)
                get_user.status = "online"
                get_user.save()
            else:
                new_user = OnlinePlayers.objects.create(
                    user=user, status="online")
                new_user.save()

            return user
        raise serializers.ValidationError("Incorrect Credentials")


# class PlayerOnlineSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PlayerOnline
#         fields = '__all__'

#     # def update(self, validated_data):
#     #     # user = User.objects.get(id=self.request.user)
#     #     user = PlayerOnline.objects.create_user(
#     #         validated_data['username'], validated_data['email'], validated_data['password'])
#     #     return user
#     def create(self, validated_data):
#         obj, created = PlayerOnline.objects.update_or_create(
#             player=self.context['request'].user, status="Active")

#         if obj:
#             return obj
#         else:
#             return created
