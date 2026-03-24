/*
 Used to store test records created during automation (daily, only one per day).

How it works:
- Saves one record per object per day inside: dataset/records/<Object>/<YYYY-MM-DD>/record.json
- saveRecord() creates/overwrites the file when a record is created
- saveEditedRecord() updates the same file by adding edited fields with "_edited" suffix containing new values

Usage examples:
saveRecord('Contacts', contactData);        // after creating a record
saveEditedRecord('Contacts', editedData);   // after editing the record
*/

import fs from 'fs';
import path from 'path';

const BASE_DIR = './dataset/records';

// Usefull functions to handle naming, paths, objects selection
function getToday() {
  return new Date().toISOString().split('T')[0];
}

function getObjectDir(objectName) {
  return path.join(BASE_DIR, objectName);
}

function getTodayDir(objectName) {
  return path.join(getObjectDir(objectName), getToday());
}

function getRecordPath(objectName) {
  return path.join(getTodayDir(objectName), 'record.json');
}

function ensureTodayFolder(objectName) {
  const dir = getTodayDir(objectName);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return dir;
}

function saveToJson(objectName, recordData) {
  ensureTodayFolder(objectName);

  const filePath = getRecordPath(objectName);

  const record = {
    createdAt: new Date().toISOString(),
    ...recordData
  };

  fs.writeFileSync(filePath, JSON.stringify(record, null, 2));

  console.log(`${objectName} record saved to: ${filePath}`);
}

 function updateRecordJson(objectName, editData) {
  const filePath = getRecordPath(objectName);

  if (!fs.existsSync(filePath)) {
    throw new Error(`No ${objectName} record found for today`);
  }

  const existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const editedFields = {};
  for (const [key, value] of Object.entries(editData)) {
    editedFields[`${key}_edited`] = value;
  }

  const updated = {
    ...existing,
    editedAt: new Date().toISOString(),
    ...editedFields
  };

  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));

  console.log(`${objectName} edited record saved`);
}

export { saveToJson, updateRecordJson };