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
import {reporterJson} from 'vfile-reporter-json';
import retextEquality from 'retext-equality';

/**
 * Retext function.
 * @param {String} text The input text.
 * @param {Array} excludedRules The excluded rules array.
 * @return {Object} The JSON vFile report from Retext.js.
 */
function getRetextReport(text, excludedRules = []) {
  if (!text) {
    throw new Error('Missing text parameter.');
  }

  const processor = retext().use(retextEquality);
  const output = JSON.parse(reporterJson(processor.processSync(text)));
  const messages = output[0]['messages'];
  const report = messages.filter(
      (msg) => !excludedRules.includes(msg['ruleId']) ?? msg,
  );

  return report;
}

export {
  getRetextReport,
};
