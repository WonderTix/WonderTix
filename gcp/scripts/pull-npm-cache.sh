#!/bin/bash
# pull-npm-cache.sh: Conditionally pull `node_modules.tar.gz` from GCS.

function check_args() {
  local missing=0
  local required=(
    "ENV"
    "NPM_CACHE"
  )

  for arg in "${required[@]}"; do
    if [ -z "${!arg}" ]; then
      echo "Error: Missing required environment variable '$arg'"
      ((missing++))
    fi
  done

  if [ $missing -ne 0 ]; then
    echo "Error: One or more required environment variables are missing."
    exit 1
  fi
}

check_args
echo "Pulling node_modules and package.json from GCS..."

gsutil -m cp \
  ${NPM_CACHE}/client/${ENV}/node_modules.tar.gz \
  ${NPM_CACHE}/client/${ENV}/cache-package.json \
  client

echo "Retrieved node_modules and package.json."
