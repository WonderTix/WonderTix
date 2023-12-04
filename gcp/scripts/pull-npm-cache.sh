#!/bin/bash
# pull-npm-cache.sh: Conditionally pull `node_modules.tar.gz` from GCS.

required=(
  "ENV"
  "NPM_CACHE"
)
source ${CHECK_ARGS} "${required[@]}"
echo "Pulling node_modules and package.json from GCS..."

gsutil -m cp \
  ${NPM_CACHE}/client/${ENV}/node_modules.tar.gz \
  ${NPM_CACHE}/client/${ENV}/cache-package.json \
  client

echo "Retrieved node_modules and package.json."
