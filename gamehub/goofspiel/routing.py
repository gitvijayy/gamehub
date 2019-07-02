# chat/routing.py
from django.conf.urls import url
from django.urls import re_path
# from gamehub import consumers
from . import consumers

websocket_urlpatterns = [
    url(r'^ws/goofspiel/(?P<room_name>[^/]+)/$',
        consumers.ChatConsumer),
]
# router.register('api/defaultgame/games', GamesViewSet, 'games')
# websocket_urlpatterns = [
#     url(r'^ws/defaultgame/turns/(?P<room_name>[^/]+)/$',
#         consumers.ChatConsumer),
# ]
