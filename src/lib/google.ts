type ExcelResponse = {
  values: string[][];
};

export type Fame = {
  date: string;
  official: string;
  tournament: string;
  champion: string;
  bracket: string;
  vod: string;
};

function parseSheet<T>(excel: ExcelResponse): T[] {
  const rows = excel.values;
  const header = rows[0].map(s => s.toLowerCase());
  const records = rows.slice(1);
  return records.map<T>(rec => {
    const out: any = {};
    header.forEach((key, col) => {
      out[key] = rec[col] || undefined;
    });
    return out;
  });
}

export async function fetchFame(): Promise<Fame[]> {
  const apiKey = 'AIzaSyCHdcHceG6dcWgo7Ldzb7WpSQgdN8JXnas';
  const spreadsheetId = '1iu8zCP5S9Ex3tJgPuSaGX0y_X-Mcy-Ff-kQt5AAlXJs';
  const sheetName = 'Sheet1';
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;

  const resp = await fetch(url);
  const data = await resp.json();
  return parseSheet<Fame>(data);
}
