#!/bin/bash
# install-client.sh: Conditionally run `npm install` if package.json has changed.

required=(
  "CACHE"
  "CURRENT"
)
source ${CHECK_ARGS} "${required[@]}"

# Compare cached package.json to current
if ! cmp --silent ${CACHE} ${CURRENT}; then
  echo "Dependencies are up to date."
else
  echo "Dependencies have changed. Running npm install..."
  npm install
  echo "Removing outdated cache..."
  rm node_modules.tar.gz
fi
