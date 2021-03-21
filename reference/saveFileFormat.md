# SMA4 Save File Format

## raw notes

entire save file size: 131072 bytes (128kib)
size of one ereader level: 2024 bytes (1.976kib)

first level data address: 0x6010 (24592)
second level data address: 0x6800 (26624), 2032 bytes later
third level data address: 0x7010 (28688), 2064 bytes later



## offsets (ends are inclusive)

0x80 - 0x94 : 0 level name
0x95 - 0xa9 : 1 level name
0xaa - 0xbe : 2 level name
0xbf - 0xd3 : 3 level name
0xd4 - 0xe8 : 4 level name
0xe9 - 0xfd : 5 level name
0xfe - 0x112 : 6 level name
0x113 - 0x127 : 7 level name
0x128 - 0x13c : 8 level name
0x13d - 0x151 : 9 level name
0x152 - 0x166 : 10 level name
0x167 - 0x17b : 11 level name
0x17c - 0x190 : 12 level name
0x191 - 0x1a5 : 13 level name
0x1a6 - 0x1ba : 14 level name
0x1bb - 0x1cf : 15 level name
0x1d0 - 0x1e4 : 16 level name
0x1e5 - 0x1f9 : 17 level name
0x1fa - 0x20e : 18 level name
0x20f - 0x223 : 19 level name
0x224 - 0x238 : 20 level name
0x239 - 0x24d : 21 level name
0x24e - 0x262 : 22 level name
0x263 - 0x277 : 23 level name
0x278 - 0x28c : 24 level name
0x28d - 0x2a1 : 25 level name
0x2a2 - 0x2b6 : 26 level name
0x2b7 - 0x2cb : 27 level name
0x2cc - 0x2e0 : 28 level name
0x2e1 - 0x2f5 : 29 level name
0x2f6 - 0x30a : 30 level name
0x30b - 0x31f : 31 level name
0x320 - 0x334 : 32 level name
0x335 - 0x349 : 33 level name
0x34a - 0x35e : 34 level name
0x35f - 0x373 : 35 level name
0x374 - 0x388 : 36 level name
0x389 - 0x39d : 37 level name
0x39e - 0x3b2 : 38 level name
0x3b3 - 0x3c7 : 39 level name
0x3c8 - 0x3dc : 40 level name
0x3dd - 0x3f1 : 41 level name
0x3f2 - 0x406 : 42 level name
0x407 - 0x41b : 43 level name
0x41c - 0x430 : 44 level name
0x431 - 0x445 : 45 level name
0x446 - 0x45a : 46 level name
0x45b - 0x46f : 47 level name
0x470 - 0x484 : 48 level name
0x485 - 0x499 : 49 level name
0x49a - 0x4ae : 50 level name
0x4af - 0x4c3 : 51 level name
0x4c4 - 0x4d8 : 52 level name
0x4d9 - 0x4ed : 53 level name
0x4ee - 0x502 : 54 level name
0x503 - 0x517 : 55 level name
0x518 - 0x52c : 56 level name
0x52d - 0x541 : 57 level name
0x542 - 0x556 : 58 level name
0x557 - 0x56b : 59 level name
0x56c - 0x580 : 60 level name
0x581 - 0x595 : 61 level name
0x596 - 0x5aa : 62 level name
0x5ab - 0x5bf : 63 level name
0x5c0 - 0x5d4 : 64 level name
0x5d5 - 0x5e9 : 65 level name
0x5ea - 0x5fe : 66 level name
0x5ff - 0x613 : 67 level name
0x614 - 0x628 : 68 level name
0x629 - 0x63d : 69 level name
0x63e - 0x652 : 70 level name
0x653 - 0x667 : 71 level name
