import * as XLSX from 'xlsx'

/**
 * Builds and downloads a real .xlsx file in the browser.
 *
 * The panel this replaced exported every one of its reports to Excel, and the
 * people using it still work that way — a report they can't take away isn't
 * finished. Kept deliberately small: a sheet is an array of plain objects,
 * the keys become the header row.
 */

export interface Sheet {
  name: string
  rows: Record<string, string | number | null>[]
}

/** Excel refuses sheet names over 31 characters or containing : \ / ? * [ ] */
function safeSheetName(name: string) {
  return name.replace(/[:\\/?*[\]]/g, ' ').slice(0, 31) || 'Sheet1'
}

function columnWidths(rows: Record<string, string | number | null>[]) {
  if (rows.length === 0) return []
  return Object.keys(rows[0]).map((key) => {
    const longest = rows.reduce(
      (max, row) => Math.max(max, String(row[key] ?? '').length),
      key.length,
    )
    // Wide enough to read, capped so one long description doesn't push every
    // other column off the screen.
    return { wch: Math.min(Math.max(longest + 2, 10), 45) }
  })
}

export function downloadExcel(fileName: string, sheets: Sheet[]) {
  const workbook = XLSX.utils.book_new()

  for (const sheet of sheets) {
    const worksheet = XLSX.utils.json_to_sheet(sheet.rows)
    worksheet['!cols'] = columnWidths(sheet.rows)
    XLSX.utils.book_append_sheet(workbook, worksheet, safeSheetName(sheet.name))
  }

  // Stamped with the date so a folder of these stays tellable apart.
  const stamp = new Date().toISOString().slice(0, 10)
  XLSX.writeFile(workbook, `${fileName}-${stamp}.xlsx`, { compression: true })
}
