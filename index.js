// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {retext} from 'retext';
import {reporter} from 'vfile-reporter';
import {reporterJson} from 'vfile-reporter-json';
import retextEquality from 'retext-equality';

/**
 * Retext Cloud Function.
 *
 * @param {Request} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Response} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 * @return {Response} The response.
 */
export async function AdLanguageMonitor(req, res) {
  try {
    if (!req.query.text && !req.body.text) {
      throw new Error('Missing text parameter.');
    }

    const input = req.query.text ? decodeURIComponent(req.query.text) : req.body.text;

    retext()
        .use(retextEquality)
        .process(input)
        .then((file) => {
          console.log(reporter(file));
          const output = reporterJson(file);
          res.send(output);
        }, (err) => {
          console.error(err);
          res.status(500).send(err);
        });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
