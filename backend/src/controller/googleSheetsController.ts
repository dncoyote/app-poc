import { Request, Response, NextFunction } from 'express';
import { authorize, getSheetData } from '../service/googleSheetsService';

const SPREADSHEET_ID = '1Fa2ZglPI2_Yjc9PbvMYsbBI68m2_FKesrC0DQacwrWM';
const SHEET_NAME = 'Test!A:Z';

async function readSheet(req: Request, res: Response, next: NextFunction) {
  try {
    const auth = await authorize();
    const data = await getSheetData(auth, SPREADSHEET_ID, SHEET_NAME);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export { readSheet };
