#!/bin/bash

set -e

echo "\nUpdate jira ticket status"

bundle install
bundle exec fastlane updateJiraPlatform --verbose

echo "Jira tickets updated 🎉"
