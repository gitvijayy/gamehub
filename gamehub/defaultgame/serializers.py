from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from defaultgame.models import Games
from defaultgame.models import Rounds
from defaultgame.models import Players
from defaultgame.models import Turns
import random

# import random
# for x in range(10):
#     print random.randint(1, 101)


def prize_card_generator(gameid):
    prize_cards = Rounds.objects.filter(game_id=gameid)
    prize_cards_list = []

    for card in prize_cards:
        prize_cards_list.append(card.prizeCard)
    print(prize_cards_list)
    if len(prize_cards_list) != 13:
        random_card = random.randint(1, 13)
        while prize_cards_list.count(random_card) == 1:
            # i = 1
            # while i == 1:
            #     if random_card in prize_cards_list:
            random_card = random.randint(1, 13)
        # else:
        #     break

        return random_card

    return "Game Over"


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

        if validated_data['round_id'].turns.count() >= 1:
            player_valid_turn = Turns.objects.filter(
                round_id=validated_data['round_id'], player=self.context['request'].user)

            if player_valid_turn:
                raise serializers.ValidationError("Not Your Turn")

            prize_card = prize_card_generator(
                validated_data['round_id'].game_id)

            if prize_card == "Game Over":
                raise serializers.ValidationError("Game Over")

            newRound = Rounds.objects.create(
                game_id=validated_data['round_id'].game_id, prizeCard=prize_card)
            newRound.save()

        newTurn = Turns.objects.create(
            round_id=validated_data['round_id'], player=self.context['request'].user, action=validated_data['action'])

        return newTurn


class RoundSerializer(serializers.ModelSerializer):
    turns = TurnDataSerializer(many=True, read_only=True)

    class Meta:
        model = Rounds
        fields = ['id', 'prizeCard', 'turns']
        # depth = 5


class GameSerializer(serializers.ModelSerializer):

    # Games.objects.all().delete()
    # Turns.objects.all().delete()
    # Rounds.objects.all().delete()
    # Players.objects.all().delete()
    # player = UserNameSerializer()

    rounds = RoundSerializer(many=True, read_only=True)
    players = PlayerNameSerializer(many=True, read_only=True)

    class Meta:
        model = Games
        fields = ['id', 'status',  'players', 'rounds']

    def create(self,  validated_data):

        def addGame():
            newGame = Games.objects.create(status="New")
            newGame.save()
            addPlayer(newGame)
            return newGame

        def addPlayer(game):
            addPlayer = Players.objects.create(
                game_id=game, player=self.context['request'].user)
            addPlayer.save()

        inactive_games = Games.objects.filter(status="New")
        if inactive_games:
            for game in inactive_games:
                current_players = game.players.all()
                for player in current_players:
                    if player.player == self.context['request'].user:
                        newGame = addGame()
                        return newGame
                    if current_players.count() == (game.no_of_players - 1):
                        game.status = 'Active'
                        game.save()
                        addPlayer(game)
                        prize_card = random.randint(1, 13)
                        newRound = Rounds.objects.create(
                            game_id=game, prizeCard=prize_card)
                        newRound.save()
                        return game

        newGame = addGame()
        return newGame


class PlayerSerializer(serializers.ModelSerializer):

    # game_id = GameSerializer()

    class Meta:
        model = Players
        fields = ['game_id']
        depth = 1

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
