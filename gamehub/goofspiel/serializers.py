from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from goofspiel.models import Rounds

from goofspiel.models import Turns
from games.models import Games
from games.models import Players
import random


def prize_card_generator(gameid):
    prize_cards = Rounds.objects.filter(game_id=gameid)
    prize_cards_list = []
    for card in prize_cards:
        prize_cards_list.append(card.prizeCard)

    if len(prize_cards_list) != 13:
        random_card = random.randint(1, 13)
        while prize_cards_list.count(random_card) == 1:
            random_card = random.randint(1, 13)
        return random_card
    return 0


def add_turn(roundid, action, player):
    newTurn = Turns.objects.create(
        round_id=roundid, player=player, action=action)
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
        user = self.context['request'].user
        # print(gameid.id)

        if turncount == 0:
            players = Players.objects.filter(
                game_id=gameid)
            for player in players:
                if player.player != user:
                    raise serializers.ValidationError("Not Your Turn")
                else:
                    newturn = add_turn(roundid, validated_data['action'], user)
                    return newturn

        if turncount >= 1:
            player_valid_turn = Turns.objects.filter(
                round_id=roundid, player=user)
            prize_card = prize_card_generator(gameid)
            if player_valid_turn and prize_card != 0:
                raise serializers.ValidationError("Not Your Turn")

            # prize_card = prize_card_generator(gameid)
            if prize_card == 0:
                newturn = add_turn(roundid, validated_data['action'], user)
                gameover = Games.objects.get(id=gameid.id)
                gameover.status = "Game Over"
                gameover.save()
                return newturn

            else:
                newturn = add_turn(roundid, validated_data['action'], user)
                newRound = Rounds.objects.create(
                    game_id=gameid, prizeCard=prize_card)
                newRound.save()
                return newturn


class RoundSerializer(serializers.ModelSerializer):
    turns = TurnDataSerializer(many=True, read_only=True)

    class Meta:
        model = Rounds
        fields = ['id', 'prizeCard', 'turns']
        # depth = 5


class GameSerializer(serializers.ModelSerializer):

    rounds = RoundSerializer(many=True, read_only=True)
    game = PlayerNameSerializer(many=True, read_only=True)

    class Meta:
        model = Games
        fields = ['id', 'name', 'status',  'game', 'rounds']


class PlayerSerializer(serializers.ModelSerializer):
    # game_id = GameSerializer()
    class Meta:
        model = Players
        fields = ['game_id']
        depth = 1


class ActiveGameSerializer(serializers.ModelSerializer):
    # game_id = GameSerializer()
    class Meta:
        model = Players
        fields = ['game_id']
