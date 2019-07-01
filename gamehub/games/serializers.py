from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from memory.models import Games
from memory.models import Players
from goofspiel.models import Rounds as GoofspielRounds

import random
# import random
# for x in range(10):
#     print random.randint(1, 101)
cardsArray = ["1C", "1H", "1S", "1D", "2C", "2H", "2S", "2D", "3C", "3H", "3S",
              "3D", "4C", "4H", "4S", "4D", "5C", "5H", "5S", "5D", "6C", "6H", "6S", "6D", "7C", "7H",
              "7S", "7D", "8C", "8H", "8S", "8D", "9C", "9H", "9S", "9D",
              "10C", "10H", "10S", "10D", "11C", "11H", "11S", "11D", "12C", "12H",
              "12S", "12D", "13C", "13H", "13S", "13D"]


def addPlayer(game, player):
    addPlayer = Players.objects.create(
        game_id=game, player=player)
    addPlayer.save()


def addGame(name, player):
    extras = ""

    if(name == "Memory"):
        random.shuffle(cardsArray)
        extras = cardsArray

    newGame = Games.objects.create(
        status="New", extras=extras, name=name)
    newGame.save()

    if(name == "Goofspiel"):
        prize_card = random.randint(1, 13)
        newRound = GoofspielRounds.objects.create(
            game_id=newGame, prizeCard=prize_card)
        newRound.save()

    addPlayer(newGame, player)
    return newGame


class GameSerializer(serializers.ModelSerializer):

    class Meta:
        model = Games
        fields = '__all__'

    def create(self,  validated_data):
        current_user = self.context['request'].user
        inactive_games = Games.objects.filter(
            status="New", name=validated_data['name'])
        if inactive_games:
            for game in inactive_games:
                current_players = game.game.all()
                for player in current_players:
                    if player.player == current_user:
                        newGame = addGame(
                            validated_data['name'], current_user)
                        return newGame
                    if current_players.count() == (game.no_of_players - 1):
                        game.status = 'Active'
                        game.save()
                        addPlayer(game, current_user)
                        return game
        newGame = addGame(validated_data['name'], current_user)
        return newGame


class ActiveGamesSerializer(serializers.ModelSerializer):
    # game_id = GameSerializer()
    class Meta:
        model = Players
        fields = ['game_id']
        depth = 1


# class ActiveGameSerializer(serializers.ModelSerializer):
#     # game_id = GameSerializer()
#     class Meta:
#         model = Players
#         fields = ['game_id']
    # try:
        #     game = Games.objects.get(status="New")
        # except Games.DoesNotExist:
        #     game = None
        # print(self.context['request'].user)
    # Games.objects.all().delete()
    # Turns.objects.all().delete()
    # Rounds.objects.all().delete()
    # Players.objects.all().delete()
    # player = UserNameSerializer()
# class RoundLinkSerializer(serializers.HyperlinkedModelSerializer):
#     # games_id = serializers.PrimaryKeyRelatedField(
#     #     queryset=Games.objects.all(), source='Games.id')
#     class Meta:
#         model = Rounds
#         fields = '__all__'
# def create(self, validated_data):
#     Roundstatus = Rounds.objects.filter(
#         games=validated_data['games']['id'], player2="")
#     if Roundstatus:
#         obj = Rounds.objects.get(
#             games=validated_data['games']['id'], player2="")
#         Roundstatus.update(player2=validated_data['player2'])
#         obj.player2 = validated_data['player2']
#         return obj
#     else:
#         round = Rounds.objects.create(
#             games=validated_data['games']['id'], player1=validated_data['player1'],
#             prizeCard=validated_data['prizeCard']
#         )
#         return round
# games_id = serializers.PrimaryKeyRelatedField(
#     queryset=Games.objects.all(), source='Games.id')
