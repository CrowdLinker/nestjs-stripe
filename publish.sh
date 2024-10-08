#!/bin/bash
# Publish package version with a version (picks up from package.json so please update it before running this).
#
# Copyright 2024 Crowdlinker
#
# You should have received a copy of the MIT along with this program.
# If not, see <https://opensource.org/licenses/MIT>.

npm run build
cp README.md ./dist
cp LICENSE ./dist
cp package.json ./dist
cd ./dist
npm publish --access public
