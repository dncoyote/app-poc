import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { authenticate } from '@google-cloud/local-auth';
import path from 'path';
import Statement from '../model/Statement';

// Paths to your OAuth2 credentials and token
const CREDENTIALS_PATH = path.join(__dirname, '../../credentials.json');
const TOKEN_PATH = path.join(__dirname, '../../token.json');

// Scopes for the Google Sheets API
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

// Authorize function to get OAuth2 client
async function authorize(): Promise<OAuth2Client> {
  const auth = await authenticate({
    keyfilePath: CREDENTIALS_PATH,
    scopes: SCOPES,
  });
  return auth;
}

// Function to get data from Google Sheets and map to Statement model
async function getSheetData(auth: OAuth2Client, spreadsheetId: string, range: string): Promise<Statement[]> {
  const sheets = google.sheets({ version: 'v4', auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = response.data.values;

  if (!rows || rows.length === 0) {
    throw new Error('No data found in the spreadsheet.');
  }

  // Map the rows to Statement model attributes
  const statements = rows.map(row => {
    return {
      id: row[0], // Assumes first column contains the id
      Category: row[2], // Assumes second column contains the Category
      Type: row[3] as 'SALARY' | 'CREDIT' | 'DEBIT', // Assumes third column contains the Type
      Amount: parseFloat(row[4]), // Assumes fourth column contains the Amount
      Description: row[5], // Assumes fifth column contains the Description
      Date: new Date(row[6]), // Assumes sixth column contains the Date
    } as Statement;
  });

  return statements;
}

export { authorize, getSheetData };
