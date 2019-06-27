from rest_framework import serializers
from django.contrib.auth.models import User


from war.models import Games
from war.models import Players
from war.models import Rounds
from war.models import Turns

import random
import json


def stringToIntArray(string_deck) :
    string_deck_inarray = string_deck.split(',') 
    return list(map(int, string_deck_inarray))

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
    # opponent_deck_string_inarray = opponent_deck_string.split(',') 
    # opponent_deck = list(map(int, opponent_deck_string_inarray))
    opponent_deck = stringToIntArray(opponent_deck_string)
    for card in range(1,53):
        if(not (card in opponent_deck)) :
            card_list.append(card)
    random.shuffle(card_list)
    return card_list

def fetchCard(game,user_id):
    # print('this is the target' + user_id)
    # json.dump(games)
    # print('this is the taget game ' + game.playerswar)
    # game = Games.objects.filter(id=game.id)
    players = game.playerswar.all()
    for player in players:
        # print('this is the player' + player.player)
        if(player.player == user_id):
            # print('i found the right player')
            string_deck = player.deck
            # print('this is the deck: ' + string_deck)
            array_deck = stringToIntArray(string_deck)
            card_back = array_deck.pop()
            array_deck_length = len(array_deck)
            modified_deck_string = ','.join(str(card) for card in array_deck) 
            # print('this is the card back: ' + str(card_back))
            # print('this is the modified deck: ' + modified_deck_string)
            player.deck = modified_deck_string
            player.deck_length = array_deck_length
            player.save()
            return card_back
    return 'error: no player found'

def handleRound(round):
    # print('this is the turns:' + round.turns)
    game = round.game_id
    turns = round.turns.all()
    turn1 = turns[0]
    turn2 = turns[1]
    print('this is the player: ' + turn1.player.username)
    print('this is the card he played: ' + str(turn1.action))
    print('this is the player: ' + turn2.player.username)
    print('this is the card he played: ' + str(turn2.action))
    players = Players.objects.filter(game_id=game)
    player1 = players[0]
    player2 = players[1]
    print(player1.player.username)
    print(player2.player.username)
    # Section is to make sure card is matched to the right username
    cardplayed1 = 0
    cardplayed2 = 0
    if(turn1.player.username == player1.player.username):
        cardplayed1 = turn1.action
        cardplayed2 = turn2.action
    elif(turn1.player.username == player2.player.username):
        cardplayed1 = turn2.action
        cardplayed2 = turn1.action
    else: 
        print('Error: no names were matched')

    # print('this is player one' + players[0].player.username + 'he played' + str(cardplayed1))
    # print('this is player two' + players[1].player.username + 'he played' + str(cardplayed2))

    # user2 = User.objects.get(username=turn2.player.username)
    # print(user.username)
    # player2 = Players.objects.get(player=user2)
    
    if ((cardplayed1 % 13) > (cardplayed2 % 13)):
        # user1 = User.objects.get(username=turn1.player.username)
        # print('this is user1: ' + user1.username)
        # player1 = Players.objects.get(player=user1)
        # print('this is player1 deck: ' + player1.deck)
        str_deck = player1.deck
        arr_deck = stringToIntArray(str_deck)
        arr_deck.append(turn1.action)
        arr_deck.append(turn2.action)
        deck_length = len(arr_deck)
        str_deck_modified = ','.join(str(card) for card in arr_deck) 
        player1.deck = str_deck_modified
        player1.deck_length = deck_length
        print(player1.player.username + ' now has' + str(player1.deck_length) + 'cards')
        print(player2.player.username + ' now has' + str(player2.deck_length) + 'cards')
        player1.save()
    else:
        # user2 = User.objects.get(username=turn2.player.username)
        # print('this is user2: ' + user2.username)
        # player2 = Players.objects.get(player=user2)
        # print('this is player2 deck: ' + player2.deck)
        str_deck = player2.deck
        arr_deck = stringToIntArray(str_deck)
        arr_deck.append(turn1.action)
        arr_deck.append(turn2.action)
        deck_length = len(arr_deck)
        str_deck_modified = ','.join(str(card) for card in arr_deck) 
        player2.deck = str_deck_modified
        player2.deck_length = deck_length
        print(player1.player.username + ' now has' + str(player1.deck_length) + ' cards')
        print(player2.player.username + ' now has' + str(player2.deck_length) + ' cards')
        player2.save()


    
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
        fields = ['player','deck','deck_length']
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
            print('got into the the validation phase')
            # raise serializers.ValidationError(
            #     validated_data['round_id'], validated_data['round_id'].turns.count())
            player_valid_turn = Turns.objects.filter(
                round_id=validated_data['round_id'], player=self.context['request'].user)
            if player_valid_turn:
                raise serializers.ValidationError("Not Your Turn")
            card = fetchCard(validated_data['round_id'].game_id, self.context['request'].user)
            newTurn = Turns.objects.create(
                round_id=validated_data['round_id'], 
                player=self.context['request'].user, 
                action=card
                )
            handleRound(validated_data['round_id'])
            newRound = Rounds.objects.create(game_id=validated_data['round_id'].game_id)
            newRound.save()
            return newTurn

        card = fetchCard(validated_data['round_id'].game_id, self.context['request'].user)
        print('back in the TurnSerializer and the card back is:' + str(card))
        newTurn = Turns.objects.create(
            round_id=validated_data['round_id'], 
            player=self.context['request'].user, 
            action=card
            )
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
            deck_length = len(deck)
            stringDeck = ','.join(str(card) for card in deck) 
            # print('got into the game')
            addPlayer = Players.objects.create(
                game_id=game, 
                player=self.context['request'].user, 
                deck=stringDeck,
                deck_length=deck_length)
            addPlayer.save()

        def addSecondPlayer(game,opponent):
            deck = generateSecondHalfDeck(opponent)
            deck_length = len(deck)
            stringDeck = ','.join(str(card) for card in deck) 
            addPlayer = Players.objects.create(
                game_id=game, 
                player=self.context['request'].user, 
                deck=stringDeck,
                deck_length=deck_length
                )
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