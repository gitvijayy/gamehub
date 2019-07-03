from rest_framework import generics, permissions
from rest_framework.response import Response
# from .serializers import validateSerializer
# from .serializers import addPlayerSerializer
from .serializers import GameSerializer
from .serializers import ActiveGamesSerializer
# from .serializers import ActivePlayersSerializer
# from .serializers import DeleteAllSerializer
from games.models import Games
from games.models import Players
# from games.models import OnlinePlayers
from datetime import timedelta

from rest_framework import viewsets, permissions


class GamesViewSet(viewsets.ModelViewSet):
    queryset = Games.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = GameSerializer


class PlayersViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ActiveGamesSerializer

    def get_queryset(self):
        return self.request.user.user.all()
        # return Players.objects.all()


# class ActivePlayersViewSet(viewsets.ModelViewSet):
#     queryset = OnlinePlayers.objects.filter(status="online")
#     permission_classes = [
#         permissions.AllowAny
#     ]
#     serializer_class = ActivePlayersSerializer


# class DeleteViewSet(viewsets.ModelViewSet):
#     queryset = Games.objects.all()
#     permission_classes = [
#         permissions.AllowAny
#     ]
#     serializer_class = DeleteAllSerializer
