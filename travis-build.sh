#!/bin/bash

# ======================================================
# Fail the build if this step encounters an error
# ======================================================
set -e

# ======================================================
# Abort commit if building a pull request
# ======================================================
if [[ "$TRAVIS_EVENT_TYPE" == "pull_request" ]]; then
  exit 0
fi

# ======================================================
# Defaults
# ======================================================
if [[ ! -n "$STACHE_DEVELOP_BRANCH" ]]; then
  STACHE_DEVELOP_BRANCH="develop"
fi

# ======================================================
# Are we building to test or prod?
# ======================================================
if [[ "$TRAVIS_BRANCH" == "$STACHE_DEVELOP_BRANCH" ]]; then
  stache build --config=stache.yml,build:deploy/,stache.deploy.yml
else
  stache build --config=stache.yml,stache.prod.yml,build:deploy/,stache.deploy.yml
fi
