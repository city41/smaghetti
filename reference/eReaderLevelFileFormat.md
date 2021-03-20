# EReader Level File Format

The doc "GOODSTUFF__LevelCard_Doc.txt" seems to be mostly correct. Other docs have proven to be wrong at least once.

## sprites

calling them sprites is a misnomer. These are full fledged entities. If you change a goomba to a koopa for example, it's 100% a koopa, not a goomba that looks like a koopa. In other words calling them "sprites" is wrong because this isn't just their graphical appearance, it's their logic and everything.

sprites won't necessarily load their graphics correctly. in level 1-2 I changed a goomba to a boomerang bro. The bro worked correctly, threw its boomerang and all that, but its graphics were garbled.

## level settings

changing music is trivial, just pick a different song and it will play.

changing object set is not trivial and will almost certainly crash the game. I suspect object set and the objects map are strongly correlated

## objects

Objects are things that make sense to exist in "swaths". For example, bricks, coins, question blocks, terrain are all objects. Because you will often define a "strip" of coins" or a "block" of bricks, they are objects. Objects have a width and height parameter, so a coin object that is 2x2 looks like

OO
OO

### object header

TTTT - first two bytes -- level timer in essentially decimal. classic 1-2 has this as 03 00, ie 300 seconds. so setting it to say 02 12 will be 212 seconds

???? -- community unknown

?L -- length of level. seems only bottom nibble counts? Changing didn't seem to do anything

CC - background color - changing this in 1-2 caused the tiles to change color, they seem to be using a different palette? the color changes were never pleasant

S? - scroll settings

ZG G? - 
    top three bits of first byte - level entry action. so far see no difference when changed
    bottom 5 bits of first byte - tile set. changing this causes the background to use the wrong tiles. have not seen it impact sprites yet

second byte - top four bits, graphic set 2. changing this can crash the game

AD - extra color and extra effect ????

BB - background graphics
    0x37 - underground cave wall backdrop
    0x38 - nearby green hills poking through the clouds
    0x39 - far away blue hills poking through clouds
    0x3A - fortress brick wall


## object types

question block with mushroom
============================
bank: 0
object ID: 0x10
length: ignored (bank byte just needs to have top two bits clear to indicate bank 0)


"coin banks"
===========
a strip of question blocks that each have a single coin inside
----------
bank: 1
object ID: 0x10
length: horizontal length - 1
2nd length(param): doesn't seem to matter, possibly ignored


breakable bricks
================
bank: 1
object ID: F
length: horizontal length - 1
2nd length: vertical length - 1

coins
=====
coins come in "strips"
-----
bank: 1
object ID: 16
length: horizontal length - 1
2nd length: vertical height - 1


#### example:
41 11 36 F 1

description: in classic 1-2, after the "w" shaped bricks 
there is a vertical wall with a single tile gap at bottom,
this object is the most upper and most left piece of that wall, a 2x2 brick set

41 -> 01000001 -> 01/000001 -> bank 1, length 1 -> bank 1, actual length 2
11 -> y is at tile decimal 17 (near the top of the screen)
36 -> x is at tile decimal 54
F -> this is a breakable brick
1 -> vertical height 1 -> actual height 2

 
## rooms

just like in mario maker, one room in the file format sense can logically be many rooms. Like all of the bonus rooms in 1-2 (such as going down the first pipe) are all defined in room 1.



# LEVELS

## Classic 1-2 objects in room 0 (main level room)

address: 6A, bank: 0, id: 10 -- question block with mushroom
address: 6E, bank: 1, id: 10 -- four question blocks with coins (right after mushroom)
address: A3, bank: 1, id: F -- the first set of vertical blocks in the "W"
address: D9, bank: 1, id: F -- the first set of vertical blocks in the "wall with single tile gap at bottom"
address: DE, bank: 1, id: F -- the second set of vertical blocks in the "wall with single tile gap at bottom"
address: E3, bank: 1, id: F -- the third set of vertical blocks in the "wall with single tile gap at bottom"
-- skipping e8, see below
address: ED, bank: 1, id: F -- the "ceiling" to the "ledge" after the "wall" that has the coins on it
address: F2, bank: 1, id: 16 -- the coins just on top of the ledge

weird things
====
address E8, after turning into a coin block, it appeared embedded in the left most wall of the level. but its X coordinate is 0x37
