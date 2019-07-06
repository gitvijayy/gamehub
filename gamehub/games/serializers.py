from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from games.models import Games
from games.models import Players
from games.models import Usersonline
from goofspiel.models import Rounds as GoofspielRounds
from memory.models import Rounds as MemoryRounds
# from games.models import Leaderboard
# from datetime import timedelta
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


def addGame(name, player, total_player):

    newGame = Games.objects.create(
        status="New", name=name)
    newGame.save()
    if(name == "Memory"):
        random_number = random.randint(1, 13)
        random.shuffle(cardsArray)
        extras = cardsArray[random_number:random_number+26]
        extras = extras + extras
        random.shuffle(extras)
        newGame.extras = extras
        if total_player == 1:
            newGame.no_of_players = 1
            newGame.status = "Active"
        newGame.save()
        newRound = MemoryRounds.objects.create(
            game_id=newGame)
        newRound.save()

    if(name == "Goofspiel"):
        prize_card = random.randint(1, 13)
        print("here")
        newRound = GoofspielRounds.objects.create(
            game_id=newGame, prizeCard=prize_card)
        print("coudnt get here")
        newRound.save()

    addPlayer(newGame, player)
    return newGame


class GameSerializer(serializers.ModelSerializer):

    # Games.objects.all().delete()
    # OnlinePlayers.objects.all().delete()
    # Players.objects.all().delete()

    class Meta:
        model = Games
        fields = '__all__'

    def create(self,  validated_data):
        current_user = self.context['request'].user
        no_of_players = validated_data['no_of_players']
        if no_of_players == 1:
            newGame = addGame(
                validated_data['name'], current_user, no_of_players)
            return newGame
        inactive_games = Games.objects.filter(
            status="New", name=validated_data['name'])
        if inactive_games:
            for game in inactive_games:
                current_players = game.game.all()
                for player in current_players:
                    if player.player == current_user:
                        newGame = addGame(
                            validated_data['name'], current_user, no_of_players)
                        return newGame
                    if current_players.count() == (game.no_of_players - 1):
                        game.status = 'Active'
                        game.save()
                        addPlayer(game, current_user)
                        return game

        newGame = addGame(
            validated_data['name'], current_user, no_of_players)
        return newGame


class UserNameSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username',)


class ActiveGamesSerializer(serializers.ModelSerializer):
    # game_id = GameSerializer()
    player = UserNameSerializer()

    class Meta:
        model = Players
        fields = ['game_id', 'player']
        depth = 1


class ActivePlayersSerializer(serializers.ModelSerializer):

    # game_id = GameSerializer()

    # Games.objects.all().delete()
    # Players.objects.all().delete()

    class Meta:
        model = Usersonline
        fields = '__all__'
        depth = 1

    def create(self,  validated_data):
        # activeplayers = Usersonline.objects.filter(status='online')
        # for user in activeplayers:
        #     user.status = 'logout'
        #     user.save()

        # raise serializers.ValidationError("Not Your Turn")
        get_user = Usersonline.objects.get(user=self.context['request'].user)
        get_user.status = "logout"
        get_user.save()
        return get_user


# class LeaderboardSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Players
#         fields = '__all__'

#     def update(self, validated_data):
#         print(validated_data)
#         return validated_data


# class DeleteAllSerializer(serializers.ModelSerializer):
#     # game_id = GameSerializer()
#     #OnlinePlayers.objects.all().delete()
#     Games.objects.all().delete()
#     Players.objects.all().delete()
#     OnlinePlayers.objects.all().delete()

#     class Meta:
#         model = Games
#         fields = '__all__'


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
