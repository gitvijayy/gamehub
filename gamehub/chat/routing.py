# chat/routing.py
from django.conf.urls import url
from django.urls import re_path
from . import consumers
# from .consumers import ChatConsumer

websocket_urlpatterns = [
    url(r'^ws/chat/(?P<room_name>[^/]+)/$', consumers.ChatConsumer),
]

# websocket_urlpatterns = [
#     re_path(r'^ws/chat/(?P<room_name>[^/]+)/$', ChatConsumer),
# ]


# from channels.routing import route
# from .consumers import http_consumer, ws_add, ws_disconnect, ws_receive

# channel_routing = [
#     route('http.request', http_consumer),  # Classic HTTP request handling
#     route('websocket.connect', ws_add),
#     route('websocket.receive', ws_receive),
#     route('websocket.disconnect', ws_disconnect),
# ]
