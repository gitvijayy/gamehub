from django.conf.urls import url
from django.urls import re_path
# from gamehub import consumers
from . import consumers

websocket_urlpatterns = [
    url(r'^ws/games/(?P<room_name>[^/]+)/$',
        consumers.ChatConsumer),
]
