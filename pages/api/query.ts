// pages/api/data.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { readFile } from 'fs/promises';
import path from 'path';
import { WorkBook, read, utils } from 'xlsx';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'asteroid-data.csv');
    const buffer = await readFile(filePath);
    const workbook: WorkBook = read(buffer, { type: 'buffer' });
  
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = utils.sheet_to_json(sheet, { header: 1, raw: false });
    console.log(data)
  
    res.status(200).json(data);  
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
};
