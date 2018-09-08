#!/bin/bash
text="if (typeof window === 'undefined') {
  global.window = {};
}"

file="./dist/ReactCodeInput.js"

echo -e "$text\n$(cat $file)" > $file