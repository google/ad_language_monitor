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

/* eslint-disable no-unused-vars */

/**
 * Runs the doGet event for Webapps.
 * @param {Request} event The event object that contains the request parameters.
 * @return {TextOutput} The output JSON from Retext.
 */
function doGet(event) {
  const text = event.parameter.text;

  const content = AppLib.getRetextReport(text);

  return ContentService.createTextOutput(JSON.stringify(content)).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Runs the doPost event for Webapps.
 * @param {Request} event The event object that contains the request parameters.
 * @return {TextOutput} The output JSON from Retext.
 */
function doPost(event) {
  const text = event.postData.text;
  const excludedRules = event.postData.excludedRules;

  const content = AppLib.getRetextReport(text, excludedRules);

  return ContentService.createTextOutput(JSON.stringify(content)).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Runs the onOpen event for Sheets and creates the menu.
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Ad Language Monitor')
      .addItem('Generate report...', 'generateReport')
      .addToUi();
}

const RULES_SHEET_NAME = 'Rules';
const INPUT_SHEET_NAME = 'Input';
const REPORT_SHEET_NAME = 'Report';

/**
 * Generates the report from the rules and inputs.
 */
function generateReport() {
  try {
    const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    const rulesSheet = activeSpreadsheet.getSheetByName(RULES_SHEET_NAME);
    const inputSheet = activeSpreadsheet.getSheetByName(INPUT_SHEET_NAME);
    const reportSheet = activeSpreadsheet.getSheetByName(REPORT_SHEET_NAME);

    const rules = rulesSheet.getDataRange().getValues();
    const excludedRules = [];

    for (let i = 1; i < rules.length; i++) {
      if (!rules[i][0]) {
        excludedRules.push(rules[i][1]);
      }
    }

    reportSheet.deleteRows(2, reportSheet.getLastRow());
    const inputs = inputSheet.getDataRange().getValues();

    for (let i = 1; i < inputs.length; i++) {
      const original = inputs[i][0];
      const reporter = AppLib.getRetextReport(original, excludedRules);
      const reports = reporter.map((item) => item['reason']);
      reportSheet.appendRow([original, reports.join(' | '), JSON.stringify(reporter)]);
    }

    SpreadsheetApp.setActiveSheet(reportSheet);

    const ui = SpreadsheetApp.getUi();
    ui.alert('Report created!', `${inputs.length - 1} ${inputs.length - 1 > 1 || inputs.length - 1 === 0 ? 'rows' : 'row'} processed.`, ui.ButtonSet.OK);
  } catch (err) {
    ui.alert('Something went wrong!', err.message, ui.ButtonSet.OK);
  }
}
