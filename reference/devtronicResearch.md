This doc was written by devtronic, and originally posted here in German:
https://board.romhackersworld.eu/thread/13303-super-mario-advance-4-research-thread/

It was translated to English using Google translate

NOTE: it is based on the European release, so values are possibly different from the US 1.1 release

# Super Mario Advance 4 Research

## 1. Rome info

`Dump: 1190 Rome name: SUPER MARIOD Rome code: AX4P Rome version: 01 Language: Multi5 - Europe`

## 2nd level pointer

Offset of the pointer to the list of level pointers (universal): `0x9C88`
The following data can be found under these RAM offsets in the VBA:

- `0x03003B0A` Level Id (2 bytes, little endian)
- `0x03003B0C` Level address (3 bytes, little endian; followed by 08)
- `0x03003B10` opponent address (3 bytes, little endian; followed by 08)
- `0x03003B14` Opponent Opponent Id

  | World | Level               | Level ID (BE) | Opponent ID (BE) |     Offset | Opponent Map | Remark     |
  | ----: | :------------------ | ------------: | ---------------: | ---------: | -----------: | :--------- |
  |     1 | 1                   |      `0x0022` |         `0x004F` | `0x155303` |   `0x16C24D` |            |
  |     1 | 1                   |      `0x0023` |         `0x0002` | `0x155460` |   `0x16BA5C` | Bonus area |
  |     1 | 2                   |             ` |                ` | `0x1567F4` |              |            |
  |     1 | 3                   |             ` |                ` | `0x154216` |              |            |
  |     1 | 4                   |             ` |                ` | `0x15A5BC` |              |            |
  |     1 | 5                   |             ` |                ` | `0x157CF0` |              |            |
  |     1 | 6                   |             ` |                ` | `0x15A44D` |              |            |
  |     1 | Fortress            |             ` |                ` | `0x15F3D7` |              |            |
  |     1 | Lock                |             ` |                ` |            |              |            |
  |     2 | 1                   |             ` |                ` | `0x15E30E` |              |            |
  |     2 | 2                   |             ` |                ` | `0x1573CD` |              |            |
  |     2 | 3                   |             ` |                ` | `0x15E7FF` |              |            |
  |     2 | 4                   |             ` |                ` | `0x15EC83` |              |            |
  |     2 | 5                   |             ` |                ` | `0x15E5B6` |              |            |
  |     2 | Fortress            |             ` |                ` |            |              |            |
  |     2 | Lock                |             ` |                ` |            |              |            |
  |     3 | 1                   |             ` |                ` | `0x15BBBB` |              |            |
  |     3 | 2                   |             ` |                ` | `0x1596D0` |              |            |
  |     3 | 3                   |             ` |                ` | `0x15572E` |              |            |
  |     3 | 4                   |             ` |                ` | `0x1590C5` |              |            |
  |     3 | 5                   |             ` |                ` | `0x15B86E` |              |            |
  |     3 | 6                   |             ` |                ` |            |              |            |
  |     3 | 7                   |             ` |                ` |            |              |            |
  |     3 | 8                   |             ` |                ` |            |              |            |
  |     3 | 9                   |             ` |                ` |            |              |            |
  |     3 | Fortress 1 (left)   |             ` |                ` |            |              |            |
  |     3 | Fortress 2 (center) |             ` |                ` |            |              |            |
  |     3 | Lock                |             ` |                ` |            |              |            |
  |     4 | 1                   |             ` |                ` |            |              |            |
  |     4 | 2                   |             ` |                ` |            |              |            |
  |     4 | 3                   |             ` |                ` |            |              |            |
  |     4 | 4                   |             ` |                ` |            |              |            |
  |     4 | 5                   |             ` |                ` |            |              |            |
  |     4 | 6                   |             ` |                ` |            |              |            |
  |     4 | Fortress 1 (right)  |             ` |                ` |            |              |            |
  |     4 | Fortress 2 (center) |             ` |                ` |            |              |            |
  |     4 | Lock                |             ` |                ` |            |              |            |
  |     5 | 1                   |             ` |                ` |            |              |            |
  |     5 | 2                   |             ` |                ` |            |              |            |
  |     5 | 3                   |             ` |                ` |            |              |            |
  |     5 | 4                   |             ` |                ` |            |              |            |
  |     5 | 5                   |             ` |                ` |            |              |            |
  |     5 | 6                   |             ` |                ` |            |              |            |
  |     5 | 7                   |             ` |                ` |            |              |            |
  |     5 | 8                   |             ` |                ` |            |              |            |
  |     5 | 9                   |             ` |                ` |            |              |            |
  |     5 | Tower to the Clouds |             ` |                ` |            |              |            |
  |     5 | Fortress 1 (ground) |             ` |                ` |            |              |            |
  |     5 | Fortress 2 (clouds) |             ` |                ` |            |              |            |
  |     5 | Lock                |             ` |                ` |            |              |            |
  |     6 | 1                   |             ` |                ` |            |              |            |
  |     6 | 2                   |             ` |                ` |            |              |            |
  |     6 | 3                   |             ` |                ` |            |              |            |
  |     6 | 4                   |             ` |                ` |            |              |            |
  |     6 | 5                   |             ` |                ` |            |              |            |
  |     6 | 6                   |             ` |                ` |            |              |            |
  |     6 | 7                   |             ` |                ` |            |              |            |
  |     6 | 8                   |             ` |                ` |            |              |            |
  |     6 | 9                   |             ` |                ` |            |              |            |
  |     6 | 10                  |             ` |                ` |            |              |            |
  |     6 | Fortress 1 (left)   |             ` |                ` |            |              |            |
  |     6 | Fortress 2 (center) |             ` |                ` |            |              |            |
  |     6 | Fortress 3 (right)  |             ` |                ` |            |              |            |
  |     6 | Lock                |             ` |                ` |            |              |            |
  |     7 | 1                   |             ` |                ` |            |              |            |
  |     7 | 2                   |             ` |                ` |            |              |            |
  |     7 | 3                   |             ` |                ` |            |              |            |
  |     7 | 4                   |             ` |                ` |            |              |            |
  |     7 | 5                   |             ` |                ` |            |              |            |
  |     7 | 6                   |             ` |                ` |            |              |            |
  |     7 | 7                   |             ` |                ` |            |              |            |
  |     7 | 8                   |             ` |                ` |            |              |            |
  |     7 | 9                   |             ` |                ` |            |              |            |
  |     7 | Fortress 1 (left)   |             ` |                ` |            |              |            |
  |     7 | Fortress 2 (right)  |             ` |                ` |            |              |            |
  |     7 | Lock                |             ` |                ` |            |              |            |
  |     8 | 1                   |             ` |                ` |            |              |            |
  |     8 | 2                   |             ` |                ` |            |              |            |
  |     8 | Fortress            |             ` |                ` |            |              |            |
  |     8 | Lock                |             ` |                ` |            |              |            |

## 2. Map header

`AA AA BB BB CD EE FG HH IJ KL MM`

|   Block | What?                                                                                   |
| ------: | --------------------------------------------------------------------------------------- |
| `AA AA` | Level ID of the next area. (Big Endian)                                                 |
| `BB BB` | Opponent ID of the next area. (Big Endian)                                              |
|     `C` | Start position Y                                                                        |
|     `D` | Map length, a nibble corresponds to a block of 256px, i.e. 0 = 256px, 1 = 512px etc ... |
|    `EE` | Start position X                                                                        |
|     `F` | Scroll type                                                                             |
|     `G` | Object set of the next area                                                             |
|    `HH` | GFX                                                                                     |
|     `I` | Object set of the next area                                                             |
|     `J` | Music                                                                                   |
|     `K` | "Extra" color                                                                           |
|     `L` | "Extra" type                                                                            |
|    `MM` | Background                                                                              |

### 2.1 Music

| Nibble | Music                           |
| -----: | ------------------------------- |
|  `0x0` | Standard Overworld 1            |
|  `0x1` | Underground Theme # 1           |
|  `0x2` | Underwater Theme # 1            |
|  `0x3` | Fortress Theme                  |
|  `0x4` | Fortress fight                  |
|  `0x5` | Ship Theme                      |
|  `0x6` | Individual fight against cooper |
|  `0x7` | P button pressed                |
|  `0x8` | Overworld 2 Theme               |
|  `0x9` | After fighting against Kooper   |
|  `0xA` | Above the clouds                |
|  `0xB` | Underground Theme # 2           |
|  `0xC` | Classic Theme                   |
|  `0xD` | Underground Theme # 3           |
|  `0xE` | Underwater Theme # 2            |
|  `0xF` | Fight against Bowser            |

### 2.2 Extra color

| Nibble | Extra                    |
| -----: | ------------------------ |
|  `0x0` | Black                    |
|  `0x1` | Blue                     |
|  `0x2` | White 1                  |
|  `0x3` | Dark blue                |
|  `0x4` | Dark green               |
|  `0x5` | Dark brown               |
|  `0x6` | Dark gray and dark green |
|  `0x7` | Blue                     |
|  `0x8` | Black                    |
|  `0x9` | Dark gray                |
|  `0xA` | White 2                  |
|  `0xB` | ??                       |
|  `0xC` | ??                       |
|  `0xD` | ??                       |
|  `0xE` | ??                       |
|  `0xF` | ??                       |

### 2.4 Extra type

| Nibble | Extra                          |
| -----: | ------------------------------ |
|  `0x0` | Nothing                        |
|  `0x1` | Fog # 1                        |
|  `0x2` | Clouds # 1                     |
|  `0x3` | ??                             |
|  `0x4` | Nothing??                      |
|  `0x5` | Water # 1                      |
|  `0x6` | Water # 2                      |
|  `0x7` | Next to # 2, offset background |
|  `0x8` | Clouds # 2                     |
|  `0x9` | Haunted house pillars          |
|  `0xA` | Underground background?        |
|  `0xB` | Clouds # 3, Animated           |
|  `0xC` | Nothing??                      |
|  `0xD` | Water # 3?                     |
|  `0xE` | Clouds # 4                     |
|  `0xF` | Fortress background            |

### 2.5 background

|          Byte | Background                               |
| ------------: | ---------------------------------------- |
|        `0x00` | Nothing                                  |
|        `0x01` | Underwater # 1                           |
|        `0x02` | Lightning bolts                          |
|        `0x03` | Cooperative ship with lightning bolts    |
|        `0x04` | Underground                              |
|        `0x05` | Overworld # 1                            |
|        `0x06` | Ghost Castle # 1                         |
|        `0x07` | Scene in front of ship                   |
|        `0x08` | Trees with snow                          |
|        `0x09` | Tubes                                    |
|        `0x0A` | Hill # 1                                 |
|        `0x0B` | Ground # 2                               |
|        `0x0C` | Mountains with trees                     |
|        `0x0D` | Desert # 1                               |
|        `0x0E` | Desert # 2 With Pyramids                 |
|        `0x0F` | Hill # 2 Above the Clouds                |
|        `0x10` | Stones                                   |
|        `0x11` | Volcano                                  |
|        `0x12` | Clouds # 1                               |
|        `0x13` | Bonus area                               |
|        `0x14` | Crystals                                 |
|        `0x15` | Subsurface # 3                           |
|        `0x16` | Waterfalls # 1                           |
|        `0x17` | Toad's house                             |
|        `0x18` | Hill # 3 With Snow                       |
|        `0x19` | Background in pyramids                   |
|        `0x1A` | Overworld # 2                            |
|        `0x1B` | Bowser's Castle                          |
|        `0x1C` | Forest background                        |
|        `0x1D` | Hill # 4 Above the clouds in the evening |
|        `0x1E` | Waterfalls # 2                           |
|        `0x1F` | Glowing stones                           |
|        `0x20` | Black and red stones                     |
|        `0x21` | Underwater 2                             |
|        `0x22` | Bowser's Castle 2                        |
|        `0x23` | \* Weird (Coin ship?)                    |
|        `0x24` | Ship boss room (without lightning)       |
|        `0x25` | Underwater 3                             |
|        `0x26` | Underwater 4                             |
|        `0x27` | Orange clouds                            |
|        `0x28` | Orange bricks                            |
|        `0x29` | Bowser's Castle 3                        |
|        `0x2A` | Night Sky                                |
|        `0x2B` | Prison 3                                 |
|        `0x2C` | Ghost House 1                            |
|        `0x2D` | Ghost House 2                            |
|        `0x2E` | Bowser's Castle 3                        |
|        `0x2F` | \* Weird                                 |
|        `0x30` | Minigames 1                              |
|        `0x31` | Minigames 2                              |
|        `0x32` | Minigames 3                              |
|        `0x33` | Colored Block                            |
|        `0x34` | Cave entry (without sky)                 |
|        `0x35` | Pipe                                     |
|        `0x36` | Hills (high position)                    |
|        `0x37` | Cave                                     |
|        `0x38` | Snow Hills (high position)               |
|        `0x39` | Blue Hills                               |
|        `0x3A` | Prison 4                                 |
|        `0x3B` | WaterFall (different position)           |
|        `0x3C` | Prison 5                                 |
|        `0x3D` | Leaves (without night sky)               |
|        `0x3E` | WaterFall (different position)           |
|        `0x3F` | WaterFall (different position)           |
| `0x40`-`0xFF` | _ Crash _                                |

## 3. Map structure

The individual elements follow the mapheader.
These are read until the byte sequence `0x29 0xFF` marks the end of the map.
** Note **: Block data (coin boxes), opponent data (gumbas) and warp data (tubes) are located in different "maps"!

### 3.1 block data

A distinction is made between 4 byte and 5 byte elements.
The first byte also specifies the object bank, 0x00 = bank 1, from 0x40 = bank2

`AA BB CC DD [EE]`

| Byte | What                                                           |
| ---: | -------------------------------------------------------------- |
| `AA` | Length of the block (40 = 1, 41 = 2 ... or 00 = 1, 01 = 2 ...) |
| `BB` | Y position of the element (from above)                         |
| `CC` | X position of the element (from the left)                      |
| `DD` | Element type (coin box, tube, etc., list follows)              |
| `EE` | Additional value for 5 byte elements (e.g. second length)      |

### 3.1.1 Objects in the banks

|          Byte | Description                               | Bank | 5th byte?                  |
| ------------: | ----------------------------------------- | ---: | :------------------------- |
|        `0x00` | Bush                                      |    0 |                            |
|        `0x01` | Bush 2                                    |    0 |                            |
|        `0x02` | Bush 3                                    |    0 |                            |
|        `0x03` | ???                                       |    0 |                            |
|        `0x04` | Door                                      |    0 |                            |
|        `0x05` | ???                                       |    0 |                            |
|        `0x06` | Tendril                                   |    0 |                            |
| `0x07`-`0x0F` | ???                                       |    0 |                            |
|        `0x10` | Box with fire flower                      |    0 |                            |
|        `0x11` | Box with sheet                            |    0 |                            |
|        `0x12` | Box with a star                           |    0 |                            |
|        `0x13` | Box with coin                             |    0 |                            |
|        `0x14` | Box with coins                            |    0 |                            |
|        `0x15` | Muncher                                   |    0 |                            |
|        `0x16` | Block with fire flower                    |    0 |                            |
|        `0x17` | Block with sheet                          |    0 |                            |
|        `0x18` | Block with a star                         |    0 |                            |
|        `0x19` | Block with coin                           |    0 |                            |
|        `0x1A` | Block with coins                          |    0 |                            |
|        `0x1B` | Block with 1-Up                           |    0 |                            |
|        `0x1C` | Block with tendril                        |    0 |                            |
|        `0x1D` | Block with P-Switch                       |    0 |                            |
|        `0x1E` | Invisible box with coin                   |    0 |                            |
|        `0x1F` | Invisible box with 1-Up                   |    0 |                            |
|        `0x20` | Invisible note pad                        |    0 |                            |
|        `0x21` | Note pad with fire flower                 |    0 |                            |
|        `0x22` | Note pad with sheet                       |    0 |                            |
|        `0x23` | Note pad with star                        |    0 |                            |
|        `0x24` | Stone block with fire flower              |    0 |                            |
|        `0x25` | Stone block with leaf                     |    0 |                            |
|        `0x26` | Stone block with star                     |    0 |                            |
|        `0x27` | Invisible red note pad                    |    0 |                            |
|        `0x28` | P switch                                  |    0 |                            |
|        `0x29` | Target background                         |    0 |                            |
| `0x2A`-`0x42` | ???                                       |    0 |                            |
|        `0x43` | Box with shoe                             |    0 |                            |
|        `0x44` | Box with feather                          |    0 |                            |
|        `0x45` | Part of the goal                          |    0 |                            |
|        `0x46` | Door                                      |    0 |                            |
|        `0x47` | Block controllable coins                  |    0 |                            |
|        `0x48` | Sting 1                                   |    0 |                            |
|        `0x49` | Sting 2                                   |    0 |                            |
|        `0x4A` | ???                                       |    0 |                            |
|        `0x4B` | Shield with arrow (right)                 |    0 |                            |
|        `0x4C` | Shield with arrow (left)                  |    0 |                            |
|        `0x4D` | Red sting                                 |    0 |                            |
|        `0x4E` | ???                                       |    0 |                            |
|        `0x4F` | Block element                             |    0 |                            |
|        `0x50` | Block element                             |    0 |                            |
|        `0x50` | Wall racing block (bottom right)          |    0 |                            |
|        `0x51` | Wall racing block (bottom left)           |    0 |                            |
|        `0x52` | Wall racing block (top right)             |    0 |                            |
|        `0x53` | Wall racing block (top left)              |    0 |                            |
|        `0x54` | White tile                                |    0 |                            |
|        `0x55` | Box with P-Wing ???                       |    0 |                            |
|        `0x56` | Empty box ???                             |    0 |                            |
|        `0x57` | ???                                       |    0 |                            |
|        `0x58` | ???                                       |    0 |                            |
|        `0x59` | POW block                                 |    0 |                            |
| `0x5A`-`0xFE` | ???                                       |    0 |                            |
|        `0x00` | White block                               |    1 |                            |
|        `0x01` | Orange block                              |    1 |                            |
|        `0x02` | Green block                               |    1 |                            |
|        `0x03` | Blue block                                |    1 |                            |
|        `0x04` | White block (floating)                    |    1 |                            |
|        `0x05` | Orange block (floating)                   |    1 |                            |
|        `0x06` | Green Block (Floating)                    |    1 |                            |
|        `0x07` | Blue block (floating)                     |    1 |                            |
|        `0x08` | Bushes                                    |    1 |                            |
|        `0x09` | Gap in the ground                         |    1 |                            |
|        `0x0A` | Cloud blocks                              |    1 |                            |
|        `0x0B` | Ground                                    |    1 | Length of the bottom       |
|        `0x0C` | Ground                                    |    1 | Length of the bottom       |
|        `0x0D` | ???                                       |    1 |                            |
|        `0x0E` | Distance in the ground with water         |    1 |                            |
|        `0x0F` | Destructible Blocks                       |    1 |                            |
|        `0x10` | Coinbox                                   |    1 |                            |
|        `0x11` | Destructible block with coin              |    1 |                            |
|        `0x12` | Stone block                               |    1 |                            |
|        `0x13` | Note pad                                  |    1 |                            |
|        `0x14` | Note pad                                  |    1 |                            |
|        `0x15` | Empty stone block                         |    1 |                            |
|        `0x16` | Coin                                      |    1 |                            |
|        `0x17` | Tube down (accessible)                    |    1 |                            |
|        `0x18` | Tube down                                 |    1 |                            |
|        `0x19` | Tube down (accessible)                    |    1 |                            |
|        `0x1A` | Tube upwards (accessible)                 |    1 |                            |
|        `0x1B` | Tube up                                   |    1 |                            |
|        `0x1C` | Tube to the right (accessible)            |    1 |                            |
|        `0x1D` | Tube to the right                         |    1 |                            |
|        `0x1E` | Tube to the left (accessible)             |    1 |                            |
|        `0x1F` | Tube to the left                          |    1 |                            |
|        `0x20` | "Kugelwilli" "pipe" ""                    |    1 |                            |
|        `0x21` | Bridge                                    |    1 |                            |
|        `0x22` | ???                                       |    1 |                            |
|        `0x23` | Waterfall                                 |    1 | Width of the waterfall     |
|        `0x24` | Water surface 1                           |    1 | Width of the water surface |
|        `0x25` | Water surface 2                           |    1 | Width of the water surface |
|        `0x26` | Water surface 3                           |    1 | Width of the water surface |
|        `0x27` | ???                                       |    1 | ???                        |
|        `0x28` | Steel block                               |    1 | Width of the steel block   |
|        `0x29` | ???                                       |    1 | ???                        |
|        `0x2A` | ???                                       |    1 | ???                        |
|        `0x2B` | Blue Destructible Block                   |    1 |                            |
|        `0x2C` | Double-sided tube (accessible, vertical)  |    1 |                            |
|        `0x2D` | Clouds                                    |    1 |                            |
|        `0x2E` | Bonus area block                          |    1 | Width of the block         |
|        `0x2E` | Bushes                                    |    1 |                            |
|        `0x2F` | ???                                       |    1 |                            |
|        `0x51` | SMA mushroom block                        |    1 | Number of rows             |
|        `0x52` | SMA number pad                            |    1 | Number of rows             |
|        `0x53` | SMA number pad                            |    1 | Number of rows             |
|        `0x54` | SMA number pad                            |    1 | Number of rows             |
|        `0x55` | Gray stone block                          |    1 | Number of rows             |
|        `0x56` | Invisible block                           |    1 |                            |
|        `0x57` | Acceleration block                        |    1 |                            |
|        `0x58` | Blue and white platform made of SMW       |    1 |                            |
|        `0x59` | Rope                                      |    1 |                            |
|        `0x5A` | ???                                       |    1 |                            |
|        `0x5B` | ???                                       |    1 |                            |
|        `0x5C` | ???                                       |    1 |                            |
|        `0x5D` | Falling spike platform                    |    1 |                            |
|        `0x5E` | Spikes                                    |    1 |                            |
|        `0x5F` | SMA block                                 |    1 | Number of rows             |
|        `0x60` | Staircase from haunted house (ul.or.)     |    1 |                            |
|        `0x61` | Platform ???                              |    1 |                            |
|        `0x62` | ???                                       |    1 |                            |
|        `0x63` | ???                                       |    1 |                            |
|        `0x68` | Invisible block                           |    1 |                            |
|        `0x69` | ???                                       |    1 |                            |
|        `0x6A` | ???                                       |    1 | ???                        |
|        `0x6B` | Bonus area block                          |    1 |                            |
|        `0x6C` | Staircase from the haunted house (ol.ur.) |    1 |                            |
|        `0x6D` | ???                                       |    1 |                            |
|        `0x6E` | "Kugelwilli" "pipe" "from above"          |    1 |                            |
| `0x6F`-`0x71` | ???                                       |    1 | ???                        |
|        `0x72` | Diagonal row of coins (ul.or.)            |    1 | Number of coins            |
| `0x73`-`0x77` | ???                                       |    1 |                            |
|        `0x78` | Target area                               |    1 |                            |
| `0x79`-`0x7E` | ???                                       |    1 |                            |
|        `0x7F` | Flagpole                                  |    1 |                            |
|        `0x80` | White blocks                              |    1 | Number of rows             |
|        `0x81` | Bushes                                    |    1 |                            |
|        `0x82` | Bushes                                    |    1 |                            |
|        `0x83` | Bushes                                    |    1 |                            |
|        `0x84` | ???                                       |    1 |                            |
|        `0x85` | Door                                      |    1 |                            |
|        `0x86` | ???                                       |    1 |                            |
|        `0x87` | Tendril                                   |    1 |                            |
| `0x88`-`0x90` | ???                                       |    1 |                            |
| `0x91`-`0xA7` | Block from target area                    |    1 |                            |
|        `0xA8` | ???                                       |    1 |                            |
|        `0xA9` | ???                                       |    1 |                            |
|        `0xAA` | Target area                               |    1 |                            |
| `0xAB`-`0xC8` | ???                                       |    1 |                            |
|        `0xC9` | Water block                               |    1 |                            |
|        `0xCA` | Water block                               |    1 |                            |
|        `0xCB` | Water block                               |    1 |                            |
| `0xCC`-`0xCE` | ???                                       |    1 |                            |
|        `0xCF` | Water block                               |    1 |                            |
|        `0xD0` | Bonus area corner ol.                     |    1 |                            |
|        `0xD1` | Water block                               |    1 |                            |
| `0xD2`-`0xD5` | ???                                       |    1 |                            |
|        `0xD6` | Coinbox with P-Wing ???                   |    1 |                            |
|        `0xD7` | Empty coin box ???                        |    1 |                            |
| `0xD8`-`0xFE` | ???                                       |    1 |                            |

## 4. Worldmaps

The pointer to the worldmap list can be found at offset `0x0094B4`.
If you navigate to the offset given there (in my case `0x135AAC`),
there are 9 more pointers, which lead to the individual worldmaps.
The order corresponds to the order in the game, i.e. the first pointer = world 1, the second = world 2 ...
Number 9 is the warp zone.
The world maps themselves are always 12 tiles high, in the hex data one tile corresponds to 2 bytes.
The map ends with `0xFF 0x00`
The width of the world map corresponds to `(number of bytes of the map - 2) / 2 (bytes per tile) / 12 (tiles per column)`
Example: World 1 is 386 bytes long (including `0xFF 0x00`)
Hence `(386 - 2) / 2/12 = 16`  
In my ROM the worldmaps have the following offsets:

|     World |     Offset |
| --------: | ---------: |
|         1 | `0x133B18` |
|         2 | `0x133C9A` |
|         3 | `0x133F9C` |
|         4 | `0x13441E` |
|         5 | `0x134720` |
|         6 | `0x134A22` |
|         7 | `0x134EA4` |
|         8 | `0x1351A6` |
| Warp zone | `0x1357A8` |

## 5. Pallets

The pallets are recalculated in-game, which makes the search more complicated - but not impossible :-)
Sturmvogel extracted the ASM routine and I was able to deduce the following from it:
In order to find the palette in ROM we have to take the color in VBA and convert it to binary
and convert the individual color values ​​using this list (unfortunately some colors have several possible original values):

| Manipulated (VBA) | Original 1 | Original 2 |
| ----------------: | ---------: | ---------: |
|           `00000` |    `00000` |            |
|           `00011` |    `00001` |            |
|           `00100` |    `00010` |            |
|           `00101` |    `00011` |            |
|           `00110` |    `00100` |            |
|           `01000` |    `00101` |            |
|           `01001` |    `00110` |            |
|           `01010` |    `00111` |            |
|           `01011` |    `01000` |            |
|           `01100` |    `01001` |            |
|           `01101` |    `01010` |            |
|           `01110` |    `01011` |            |
|           `01111` |    `01100` |            |
|           `10000` |    `01101` |            |
|           `10001` |    `01110` |    `01111` |
|           `10010` |    `10000` |            |
|           `10011` |    `10001` |            |
|           `10100` |    `10010` |            |
|           `10101` |    `10011` |            |
|           `10110` |    `10100` |            |
|           `10111` |    `10101` |            |
|           `11000` |    `10110` |            |
|           `11001` |    `10111` |            |
|           `11010` |    `11000` |            |
|           `11011` |    `11001` |            |
|           `11100` |    `11010` |            |
|           `11101` |    `11011` |    `11100` |
|           `11110` |    `11101` |    `11110` |
|           `11111` |    `11111` |            |

As an an example:

```
Color in VBA: 0x149E Blue green red Decomposed into colors (binary): 00101 00100 11110 Replace the colors: 00101 -> 00011 00100 -> 00010 11110 -> 11101 OR 11110 Convert to Hex: 00011 00010 11101 -> 0C5D -> 5D0C (Little endian) 00011 00010 11110 -> 0C5E -> 5E0C (Little endian) If you do this with several consecutive colors, you will find the result the palette in ROM.
```

The complete story can be found here:
[https://board.romhackersworld.eu/thread/13317 ](https://board.romhackersworld.eu/thread/13317)
