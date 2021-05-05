#!/bin/bash
for o in {0..2}
do
  TS_NODE_FILES=true yarn run-ts-node brute/getSpriteGraphicSetBytes.ts "$1" "$o" 2 &
done
