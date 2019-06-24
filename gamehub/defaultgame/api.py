from rest_framework import generics, permissions
from rest_framework.response import Response
# from .serializers import validateSerializer
# from .serializers import addPlayerSerializer
from .serializers import GameSerializer
from .serializers import RoundSerializer
from .serializers import PlayerSerializer
from .serializers import TurnSerializer
from defaultgame.models import Games
from defaultgame.models import Rounds
from defaultgame.models import Players
from defaultgame.models import Turns
from rest_framework import viewsets, permissions


class GamesViewSet(viewsets.ModelViewSet):
    queryset = Games.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = GameSerializer


class RoundsViewSet(viewsets.ModelViewSet):
    queryset = Rounds.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = RoundSerializer


class TurnsViewSet(viewsets.ModelViewSet):
    queryset = Turns.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = TurnSerializer


class PlayersViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PlayerSerializer

    def get_queryset(self):
        return self.request.user.users.all()


# Lead Viewset
    # permission_classes = [
    #     permissions.IsAuthenticated
    # ]
# class GamesViewSetActive(viewsets.ModelViewSet):
#     queryset = Games.objects.all()
#     permission_classes = [
#         permissions.AllowAny
#     ]
#     # permission_classes = [
#     #     permissions.IsAuthenticated
#     # ]
#     serializer_class = GameSerializer
    # def get_queryset(self):
    #     # print(self.request.user)
    #     # print(User)
    #     # print("asda")
    #     # print(Lead.objects.count())
    #     # return Lead.objects.all()
    #     print(self.request.user.games.all())
    #     return self.request.user.games.all()
    # def perform_create(self,  serializer):
    #     # print(self)
    #     # print(self.request)
    #     # print(self.request.user)
    #     serializer.save(owner=self.request.user)
    #     # print(Lead.objects.count())
    #     # return Lead.objects.all()
    #     return self.request.user.leads.all()
    # print(self.request.user)
    # (data=request.data, context={
    #     'request': request
    # })
    # ActivitySerializer(
    #     data=request.data,
    #     context={
    #         'request': request
    #     }
    # )
    # def perform_create(self,  serializer):
    #     serializer.save(status=self.request.user)
  # permission_classes = [
    #     permissions.IsAuthenticated
    # ]
 # permission_classes = [
    #     permissions.IsAuthenticated
    # ]
 # def perform_create(self,  serializer):
    #     # print(self)
    #     # print(self.request)
    #     # print(self.request.user)
    #     serializer.save(player=self.request.user)
# queryset = Players.objects.filter(player=self.context['request'].user)
    # ab = []
    # for a in queryset:
    #     ab.append({a.player.username})
    # queryset = ab
    # print(queryset)
  # permission_classes = [
    #     permissions.IsAuthenticated
    # ]
# print(self.request.user)
        # print(User)
        # print("asda")
        # print(Lead.objects.count())
        # return Lead.objects.all()
        #     return self.request.user
        # print(self.request.user)
    # def get_queryset(self):
    #     # print(Lead.objects.count())
    #     # return Lead.objects.all()
    #     return self.request.user.leads.all()
    # def perform_create(self,  serializer):
    #     serializer.save(gameid=self.request.user)
# class LeadViewSet(viewsets.ModelViewSet):
#     # queryset = Lead.objects.all()
#     # permission_classes = [
#     #     permissions.AllowAny
#     # ]
#     permission_classes = [
#         permissions.IsAuthenticated
#     ]
#     serializer_class = LeadSerializer
#     def get_queryset(self):
#         # print(self.request.user)
#         # print(User)
#         # print("asda")
#         # print(Lead.objects.count())
#         # return Lead.objects.all()
#         return self.request.user.leads.all()
#     def perform_create(self,  serializer):
#         # print(self)
#         # print(self.request)
#         # print(self.request.user)
#         serializer.save(owner=self.request.user)
# Register Api
# class ValidateAPI(generics.GenericAPIView):
#     serializer_class = validateSerializer
#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         # user = serializer.save()
#         return Response({
#             # "user": UserSerializer(user, context=self.get_serializer_context()).data,
#             # "token": AuthToken.objects.create(user)[1]
#             "testing": "oh yeah"
#         })
# class AddPlayerAPI(generics.GenericAPIView):
#     serializer_class = addPlayerSerializer
#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()
#         return Response({
#             # "user": UserSerializer(user, context=self.get_serializer_context()).data,
#             # "token": AuthToken.objects.create(user)[1]
#             "testing": "oh yeah"
#         })
# Login Api
# class LoginAPI(generics.GenericAPIView):
#     serializer_class = LoginSerializer
#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data
#         return Response({
#             "user": UserSerializer(user, context=self.get_serializer_context()).data,
#             "token": AuthToken.objects.create(user)[1]
#         })
# # Get user Api
# class UserAPI(generics.RetrieveAPIView):
#     permission_classes = [
#         permissions.IsAuthenticated,
#     ]
#     serializer_class = UserSerializer
#     def get_object(self):
#         return self.request.user
