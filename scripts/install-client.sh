#!/bin/bash
# install-client.sh: Conditionally run `npm install` if package.json has changed.

function check_args() {
  local missing=0
  local required=(
    "CACHE"
    "CURRENT"
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

# Compare cached package.json to current
if ! cmp --silent ${CACHE} ${CURRENT}; then
  echo "Dependencies are up to date."
else
  echo "Dependencies have changed. Running npm install..."
  npm install
  echo "Removing outdated cache..."
  rm node_modules.tar.gz
fi
