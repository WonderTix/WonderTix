#!/bin/bash
# check-args.sh: Used by other scripts to check for required args.

missing=0

for arg in "$@"; do
  if [ -z "${!arg}" ]; then
    echo "Error: missing required environment variable '$arg'"
    ((missing++))
  fi
done

if [ $missing -ne 0 ]; then
  echo "Error: one or more required environment variables are missing."
  exit 1
fi
