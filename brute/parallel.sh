#!/bin/bash
for o in {0..3}
do
  TS_NODE_FILES=true yarn run-ts-node brute/brute.ts "$o" 4 > "offset_$o.csv" &
done
