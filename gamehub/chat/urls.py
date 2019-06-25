# chat/urls.py
from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^(?P<room_name>[^/]+)/$', views.room, name='room')
]


# from django.urls import path, re_path

# app_name = 'chat'

# urlpatterns = [

# ]
