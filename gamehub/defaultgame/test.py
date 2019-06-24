import random


# def prize_card_generator():
# prize_cards = Rounds.objects.filter(game_id=gameid)
prize_cards_list = [1, 2, 3, 4, 5, 6, 7, 8, 9]

# for card in prize_cards:
#     prize_cards_list.append(card)
# print(prize_cards_list)
# if len(prize_cards_list) != 4:
random_card = random.randint(1, 13)
while prize_cards_list.count(random_card) == 1:
    print("break 1")
    print(random_card)
    print("break2")
    # i = 1
    # while i == 1:
    #     if random_card in prize_cards_list:
    random_card = random.randint(1, 13)
    print(random_card)
print("out")
print(random_card)
# else:
#     break

# return random_card
