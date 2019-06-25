import json
from django.utils.safestring import mark_safe
from django.shortcuts import render
# chat/views.py


def index(request):
    return render(request, 'chat/index.html', {})


def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name_json': mark_safe(json.dumps(room_name))
    })

# from django.contrib.auth import get_user_model
# from django.shortcuts import render, get_object_or_404
# from .models import Chat, Contact

# User = get_user_model()


# def get_last_10_messages(chatId):
#     chat = get_object_or_404(Chat, id=chatId)
#     return chat.messages.order_by('-timestamp').all()[:10]


# def get_user_contact(username):
#     user = get_object_or_404(User, username=username)
#     return get_object_or_404(Contact, user=user)


# def get_current_chat(chatId):
#     return get_object_or_404(Chat, id=chatId)


# import json

# from django.http import HttpResponse
# from channels import Group
# from channels.handler import AsgiHandler

# # from .game import Board

# # game = Board(75, 75)


# def http_consumer(message):
#     response = HttpResponse(
#         'Welcome to Game of Life! You should try websockets.')

#     for chunk in AsgiHandler.encode_response(response):
#         message.reply_channel.send(chunk)


# def ws_add(message):
#     Group('game').add(message.reply_channel)
#     message.reply_channel.send({
#         'text': json.dumps("game.current_generation"),
#     })


# def ws_receive(message):
#     # game.new_generation()
#     Group('game').send({
#         'text': json.dumps("game.current_generation"),
#     })


# def ws_disconnect(message):
#     Group('game').discard(message.reply_channel)
