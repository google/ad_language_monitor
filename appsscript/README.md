# Ad Language Monitor

**This is not an officially supported Google product. It is a reference implementation.**

## Overview

An Apps Script application that uses Retext.js to monitor the inclusive language of ad copy.

## Setup

Install the dependencies:

    yarn

## Build

Build the application:

    yarn run gas

## Deploy

Installing the `clasp` tool for deploying to Apps Script:

    yarn global add @google/clasp

Log in to your Google account to use with `clasp`:

    clasp login

*Note: You may need to edit the `.clasp.json` file to ensure the deployment if from the generated `dist/` folder.*

Run the deployment:

    yarn run deploy

## References

- https://developers.google.com/apps-script/guides/clasp
- https://github.com/retextjs/retext
- https://github.com/retextjs/retext-equality
- https://unifiedjs.com
