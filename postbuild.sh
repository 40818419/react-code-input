#!/bin/bash
text="if (typeof window === 'undefined') {
  global.window = {};
}"

file="./lib/ReactCodeInput.js"

echo -e "$text\n$(cat $file)" > $file