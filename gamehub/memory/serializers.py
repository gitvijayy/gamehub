from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from games.models import Games
from games.models import Players
from memory.models import Turns
from memory.models import Rounds
import random


def add_turn(roundid, action, player, turncount, gameid):
    newTurn = Turns.objects.create(
        round_id=roundid, player=player, action=action)
    if turncount == 1:
        newRound = Rounds.objects.create(
            game_id=gameid)
        newRound.save()

    return newTurn


class UserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)


class PlayerNameSerializer(serializers.ModelSerializer):
    player = UserNameSerializer()

    class Meta:
        model = Players
        fields = ['player']


class TurnDataSerializer(serializers.ModelSerializer):
    player = UserNameSerializer()

    class Meta:
        model = Turns
        fields = ['id', 'round_id', 'player', 'action']


class TurnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turns
        fields = '__all__'

    def create(self,  validated_data):
        roundid = validated_data['round_id']
        turncount = roundid.turns.count()
        gameid = roundid.game_id
        get_rounds = Rounds.objects.filter(game_id=gameid).order_by('-id')
        user = self.context['request'].user
        players = Players.objects.filter(game_id=gameid)

        if turncount == 2:
            raise serializers.ValidationError("Invalid Play")

        if (get_rounds.count() == 1) & (turncount < 2) & (players[0].player == user):
            newturn = add_turn(
                roundid, validated_data['action'], user, turncount, gameid)
            return newturn
        if (get_rounds.count() == 1) & (players[0].player != user):
            raise serializers.ValidationError("Not Your Turn1")

        previous_round = get_rounds[1]
        previous_round_player = ""
        get_previous_turns = Turns.objects.filter(round_id=previous_round)
        turn_array = []
        for turn in get_previous_turns:
            turn_array.append(turn.action)
            previous_round_player = turn.player

        get_cards = Games.objects.get(id=gameid.id)
        cards = get_cards.extras.split()
        cards[0] = cards[0][1:7]
        cards[-1] = cards[-1][0:4] + ","

        if (cards[turn_array[0]] == cards[turn_array[1]]) & (previous_round_player != user):
            raise serializers.ValidationError("Not Your Turn")

        if (cards[turn_array[0]] != cards[turn_array[1]]) & (previous_round_player == user):
            raise serializers.ValidationError("Not Your Turn")

        newturn = add_turn(
            roundid, validated_data['action'], user, turncount, gameid)

        return newturn


class RoundSerializer(serializers.ModelSerializer):
    turns = TurnDataSerializer(many=True, read_only=True)

    class Meta:
        model = Rounds
        fields = ['id', 'turns', 'status']


class GameSerializer(serializers.ModelSerializer):
    # Games.objects.all().delete()
    # Turns.objects.all().delete()
    # Rounds.objects.all().delete()
    # Players.objects.all().delete()

    memoryrounds = RoundSerializer(many=True, read_only=True)
    game = PlayerNameSerializer(many=True, read_only=True)

    class Meta:
        model = Games
        fields = ['id', 'status',  'game', 'memoryrounds', 'extras']
