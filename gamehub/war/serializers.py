from rest_framework import serializers
from django.contrib.auth.models import User


from war.models import Games
from war.models import Players
from war.models import Rounds
from war.models import Turns

import random


# def generateDeck():
#     prize_cards = Rounds.objects.filter(game_id=gameid)
#     prize_cards_list = []
#     for card in prize_cards:
#         prize_cards_list.append(card.prizeCard)
#     print(prize_cards_list)
#     if len(prize_cards_list) != 13:
#         random_card = random.randint(1, 13)
#         while prize_cards_list.count(random_card) == 1:
#             # i = 1
#             # while i == 1:
#             #     if random_card in prize_cards_list:
#             random_card = random.randint(1, 13)
#         # else:
#         #     break
#         return random_card
#     return "Game Over"
def generateHalfDeck():
    card_list = []
    while(len(card_list) < 26):
        # print(card_list)
        random_card = random.randint(1,52);
        if(not (random_card in card_list)):
            card_list.append(random_card)
    return card_list

def generateSecondHalfDeck(opponent):
    card_list = []
    opponent_deck_string = opponent[0].deck
    opponent_deck_string_inarray = opponent_deck_string.split(',') 
    opponent_deck = list(map(int, opponent_deck_string_inarray))
    for card in range(1,52):
        if(not (card in opponent_deck)) :
            card_list.append(card)
    return card_list

    
class UserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)

class PlayerSerializer(serializers.ModelSerializer):
    # game_id = GameSerializer()
    class Meta:
        model = Players
        fields = ['game_id']
        depth = 1

class PlayerNameSerializer(serializers.ModelSerializer):
    player = UserNameSerializer()

    class Meta:
        model = Players
        fields = ['player','deck']
        # fields = '__all__'
        # depth = 5
        # depth = 2

class TurnDataSerializer(serializers.ModelSerializer):
    player = UserNameSerializer()

    class Meta:
        model = Turns
        fields = ['id', 'player', 'action']


class TurnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turns
        fields = '__all__'

    def create(self,  validated_data):
        if validated_data['round_id'].turns.count() >= 1:
            # raise serializers.ValidationError(
            #     validated_data['round_id'], validated_data['round_id'].turns.count())
            player_valid_turn = Turns.objects.filter(
                round_id=validated_data['round_id'], player=self.context['request'].user)
            if player_valid_turn:
                raise serializers.ValidationError("Not Your Turn")

            # prize_card = prize_card_generator(
            #     validated_data['round_id'].game_id)
            # if prize_card == "Game Over":
                # raise serializers.ValidationError("Game Over")
            # deck = Players.objects.filter(person=self.context['request'].user).deck
            newRound = Rounds.objects.create(
                game_id=validated_data['round_id'].game_id)
            newRound.save()

        newTurn = Turns.objects.create(
            round_id=validated_data['round_id'], player=self.context['request'].user, action=validated_data['action'])
        return newTurn
        
class RoundSerializer(serializers.ModelSerializer):
    turns = TurnDataSerializer(many=True, read_only=True)

    class Meta:
        model = Rounds
        fields = ['id', 'turns']
    

class GameSerializer(serializers.ModelSerializer):
    # Games.objects.all().delete()
    # Turns.objects.all().delete()
    # Rounds.objects.all().delete()
    # Players.objects.all().delete()
    # player = UserNameSerializer()
    round = RoundSerializer(many=True, read_only=True)
    playerswar = PlayerNameSerializer(many=True, read_only=True)

    class Meta:
        model = Games
        fields = ['id', 'status',  'playerswar','round']
        # fields = '__all__'
        # depth = 5 # needs rounds

    def create(self,  validated_data):
        def addGame():
            newGame = Games.objects.create(status="New")
            newGame.save()
            addFirstPlayer(newGame)
            return newGame

        def addFirstPlayer(game):
            deck = generateHalfDeck()
            stringDeck = ','.join(str(card) for card in deck) 
            # print('got into the game')
            addPlayer = Players.objects.create(
                game_id=game, player=self.context['request'].user, deck=stringDeck)
            addPlayer.save()

        def addSecondPlayer(game,opponent):
            deck = generateSecondHalfDeck(opponent)
            stringDeck = ','.join(str(card) for card in deck) 
            addPlayer = Players.objects.create(
                game_id=game, player=self.context['request'].user, deck=stringDeck)
            addPlayer.save()

        inactive_games = Games.objects.filter(status="New")
        if inactive_games:
            for game in inactive_games:
                current_players = game.playerswar.all()
                for player in current_players:
                    if player.player == self.context['request'].user:
                        newGame = addGame()
                        return newGame
                    if current_players.count() == (game.no_of_players - 1):
                        game.status = 'Active'
                        game.save()
                        addSecondPlayer(game,current_players)
                        prize_card = random.randint(1, 13)
                        newRound = Rounds.objects.create(
                            game_id=game,)
                        newRound.save()
                        return game
        newGame = addGame()
        return newGame