import { Request, Response, NextFunction } from 'express';
import { authorize, getSheetData } from '../service/statementsGoogleSheetsService';

const SPREADSHEET_ID = '1Fa2ZglPI2_Yjc9PbvMYsbBI68m2_FKesrC0DQacwrWM';
const SHEET_NAME = 'Test1!A11:G';

async function readGoogleSheetStatement(req: Request, res: Response, next: NextFunction) {
  try {
    const auth = await authorize();
    const statements = await getSheetData(auth, SPREADSHEET_ID, SHEET_NAME);
    res.json(statements);
  } catch (error) {
    next(error);
  }
}

export { readGoogleSheetStatement };
