"""gamehub URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls import include as include1, url
# from django.views.generic import TemplateView
# from django.contrib import admin
# from django.urls import path, include, re_path
# from django.views.generic import TemplateView
urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('accounts.urls')),
    path('', include('memory.urls')),
    path('', include('goofspiel.urls')),
    path('', include('games.urls')),
    path('', include('defaultgame.urls')),
    path('', include('war.urls')),
    path('admin/', admin.site.urls),
    url(r'^chat/', include('chat.urls')),
    # url(r'^ws/socket/', include('defaultgame.urls'))

    # path('chat/', include1('chat.api.urls', namespace='chat')),
    # re_path(r'^.*', TemplateView.as_view(template_name='index.html'))
]
