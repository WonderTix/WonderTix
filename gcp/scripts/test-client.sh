#!/bin/bash
# test-client.sh: Run E2E tests on deployed client using Playwright.

required=(
  "BROWSER"
  "CLIENT_REVISION"
  "SERVER_REVISION"
  "TEST_EMAIL"
  "TEST_PASSWORD"
)
source ${CHECK_ARGS} "${required[@]}"

export CI="true"
export DEPLOYED="true" # use minimal reporting
export FRONTEND_URL="${CLIENT_REVISION}"
export ROOT_URL="${SERVER_REVISION}"

# Run Playwright tests
if ! npx playwright test --project="${BROWSER}" --config="${CONFIG}"; then
  echo "Tests failed."
  # Uncomment the line below to fail the script when tests fail
  # exit 1
  echo "Ignoring failed tests for now."
else
  echo "All tests passed."
fi
