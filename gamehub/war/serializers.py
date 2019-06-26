from rest_framework import serializers
from django.contrib.auth.models import User


from war.models import Games
from war.models import Players
from war.models import Rounds

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

class GameSerializer(serializers.ModelSerializer):
    # Games.objects.all().delete()
    # Turns.objects.all().delete()
    # Rounds.objects.all().delete()
    # Players.objects.all().delete()
    # player = UserNameSerializer()
    # rounds = RoundSerializer(many=True, read_only=True)
    playerswar = PlayerNameSerializer(many=True, read_only=True)

    class Meta:
        model = Games
        fields = ['id', 'status',  'playerswar']
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
                        # prize_card = random.randint(1, 13)
                        # newRound = Rounds.objects.create(
                        #     game_id=game, prizeCard=prize_card)
                        # newRound.save()
                        return game
        newGame = addGame()
        return newGame