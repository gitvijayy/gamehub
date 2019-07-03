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
        # card_list.append(1) # <----------------------- change this to new card
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
        # card_list.append(1)
    return card_list

def fetchCards(round,game,user_id):
    # print('this is the target' + user_id)
    # json.dump(games)
    # print('this is the taget game ' + game.playerswar)
    # game = Games.objects.filter(id=game.id)
    cards = []
    players = game.playerswar.all()
    for player in players:
        # print('this is the player' + player.player)
        if(player.player == user_id):
            # print('i found the right player')
            string_deck = player.deck
            # print('this is the deck: ' + string_deck)
            array_deck = stringToIntArray(string_deck)
            if(round.status == 'tie'):
                print('I got into the round status and found the tie')
                cards.append(array_deck.pop())
                cards.append(array_deck.pop())
                cards.append(array_deck.pop())
                cards.append(array_deck.pop())
            else:
                cards.append(array_deck.pop())
            # card_back = cards[len(cards)-1]
            array_deck_length = len(array_deck)
            modified_deck_string = ','.join(str(card) for card in array_deck) 
            # print('this is the card back: ' + str(card_back))
            # print('this is the modified deck: ' + modified_deck_string)
            player.deck = modified_deck_string
            player.deck_length = array_deck_length
            # player.deck_length = 0
            print('still did not crash')
            print(modified_deck_string)
            print(array_deck_length)
            print(cards)
            player.save()
            return cards
    return 'error: no player found'

def handleWin(player,turns,round):
    # print("#{player.username} won!!!!")
    str_deck = player.deck
    arr_deck = stringToIntArray(str_deck)
    # arr_deck.insert(0,turn2.action)
    # arr_deck.insert(0,turn1.action)
    arr_deck_new=[]
    for turn in turns:
        arr_deck_new.append(turn.action)
    arr_deck_new.extend(arr_deck)
    deck_length = len(arr_deck_new)
    str_deck_modified = ','.join(str(card) for card in arr_deck_new) 
    player.deck = str_deck_modified
    player.deck_length = deck_length
    # round.status = player
    print('everything worked so far')
    player.save()

def handleTie(round):
    print('I AM INSIDE THE HANDLE TIE')
    round.status = 'tie'
    round.save()

def checkLoser(player, round):
    if(player.deck_length == 0):
        game = round.game_id
        game.status = 'Game Over'
        game.save()
    

def handleRound(round):
    # print(round.status)
    game = round.game_id
    turns = round.turns.all()
    players = Players.objects.filter(game_id=game)
    player1 = players[0]
    player2 = players[1]
    # Section is to make sure card is matched to the right username
    cardplayed1 = []
    cardplayed2 = []
    # if(turn1.player.username == player1.player.username):
    #     cardplayed1 = turn1.action
    #     cardplayed2 = turn2.action
    # elif(turn1.player.username == player2.player.username):
    #     cardplayed1 = turn2.action
    #     cardplayed2 = turn1.action
    # else: 
    #     print('Error: no names were matched')
    
    # for turn in turns:
    #     if(turn.player.username == player1.player.username):
    #         cardplayed1.insert(turn.action)
    #         cardplayed2.insert(turn.action)
    #     elif(turn.player.username == player2.player.username):
    #         cardplayed1.insert(turn.action)
    #         cardplayed2.insert(turn.action)
    #     else:
    #         print('Error: no names were matched')
    for turn in turns:
        if(turn.player.username == player1.player.username):
            print('in the player 1')
            cardplayed1.append(turn.action)
            print('passed the insert')
        elif(turn.player.username == player2.player.username):
            print('in the player 2')
            cardplayed2.append(turn.action)
        else:
            print('Error: no names were matched')


    if ((cardplayed1[len(cardplayed1)-1] % 13) > (cardplayed2[len(cardplayed2)-1] % 13)):
        handleWin(player1,turns,round)
        checkLoser(player2,round)
        return True
    elif((cardplayed1[len(cardplayed1)-1] % 13) <= (cardplayed2[len(cardplayed2)-1] % 13)): #<-------------- bug needs fixing, tie is not handled
        handleWin(player2,turns,round)
        checkLoser(player1,round)
        return True
    else:
        handleTie(round)
        return False


    
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
        fields = ['player','deck_length']
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
            # cards = []
            # if validated_data['round_id'].status == 'tie':
            #     cards = fetchCards(validated_data['round_id'], self.context['request'].user)
            cards = fetchCards(validated_data['round_id'], validated_data['round_id'].game_id, self.context['request'].user)
            print(cards)
            for card in cards: 
                newTurn = Turns.objects.create(
                    round_id=validated_data['round_id'], 
                    player=self.context['request'].user, 
                    action=card
                    )
                # newTurn.save()
                # print('new Turn saved')
            if(handleRound(validated_data['round_id'])):
                newRound = Rounds.objects.create(game_id=validated_data['round_id'].game_id)
                newRound.save()
                return newTurn
            else:
                return validated_data['round_id'];

        cards = fetchCards(validated_data['round_id'],validated_data['round_id'].game_id, self.context['request'].user)
        # print('back in the TurnSerializer and the card back is:' + str(cards))
        newTurn = Turns.objects.create(
            round_id=validated_data['round_id'], 
            player=self.context['request'].user, 
            action=cards[0]
            )
        return newTurn
        
class RoundSerializer(serializers.ModelSerializer):
    turns = TurnDataSerializer(many=True, read_only=True)

    class Meta:
        model = Rounds
        fields = ['id', 'turns','status']

        def update(self, validated_data):
            validTurn = Turns.object.select()

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
            # deck_length = 1 #<====================== Introduced a bug
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
            # deck_length =  1 #<====================== Introduced a bug
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
                        newRound = Rounds.objects.create(
                            game_id=game,)
                        newRound.save()
                        return game
        newGame = addGame()
        return newGame