// when loading sma4.gba in a hex editor, this is the last byte with a value
// from 0x3e15fb on, it's just zeros. So assuming those zeros are unused space
// in the ROM
export const ROM_SIZE_1_1 = 0x3e15fa;
export const ROM_SIZE_WII_U_VC = ROM_SIZE_1_1 * 2;
