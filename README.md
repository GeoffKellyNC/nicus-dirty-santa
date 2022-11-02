# nicus-dirty-santa
Nicus Dirty Santa




Game Plan: 



Rules:
1. Gifts are placed (Kept Anonymous )
2. Each Player gets a number indicating their play order
3. Player one Picks a random Gift and reveals it to everyone
4. Player two can choose to choose a random gift from the gift pile or choose to steal player 1's gift. 
    4a. If player 2 chooses to steal player 1's gift, they can choose a new gift
    4b. Player 2 can not choose their original gift back.
5. This continues with each person allowed to choose a gift or steal one from someone else
6. A gift can be stolen more than once but no more than 3 times. If your gift is stolen, no immediate gift take backs. (only track last gift taken)
7. When all gifts have been unwrapped the person who drew #1 is allowed one more turn to either keep what they have or have one final steal.
8. Optional: One variation of Dirty Santa includes a rule that each participant cannot be stolen from more than 3 times.




Data: 
- Prize { id, name, image, currentOwner, previousOwner, numOfSteals }
- Player { id, name, currentPrize, previousPrize, timesStolenFrom }




Player Makes Move: 
-   Next player is next in the queue
- Send Gift Name



