#!/bin/bash
for o in {0..3}
do
  TS_NODE_FILES=true yarn run-ts-node brute/getObjectSetBytes.ts "$1" "$o" 8 &
done
