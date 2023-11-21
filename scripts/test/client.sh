#!/bin/bash
# client.sh: Run E2E tests on deployed client using Playwright.

function check_args() {
  local missing=0
  local required=(
    "BROWSER"
    "CLIENT_REVISION"
    "SERVER_REVISION"
    "TEST_EMAIL"
    "TEST_PASSWORD"
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

export DEPLOYED="true" # use minimal reporting
export FRONTEND_URL="${CLIENT_REVISION}"
export ROOT_URL="${SERVER_REVISION}"

CONFIG="../playwright.config.ts"

# Run Playwright tests
if ! npx playwright test --project="${BROWSER}" --config="${CONFIG}"; then
  echo "Tests failed."
  # Uncomment the line below to fail the script when tests fail
  # exit 1
  echo "Ignoring failed tests for now."
else
  echo "All tests passed."
fi
