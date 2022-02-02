# Ad Language Monitor

**This is not an officially supported Google product. It is a reference implementation.**

## Overview

A Cloud Function that usese Retext.js to monitor the inclusive language of ad copy.

## Deploy

Run the command:

    gcloud functions deploy AdLanguageMonitor --runtime node14 --trigger-http

## Testing

Install dependencies:

    yarn

Run the tests:

    yarn test

## Development

Run the development environment:

    yarn start

Send a payload to the development function:

    curl -X POST http://localhost:8080/ -H "Content-Type:application/json"  -d '{ "text": "He’s pretty set on beating your butt for sheriff." }'

*Note: You can use either the HTTP query string or the JSON body to generate a response.*

## References

- https://github.com/retextjs/retext
- https://github.com/retextjs/retext-equality
- https://unifiedjs.com
