export const csvAsTable = (csv: string) => {
  const dataTable: { [key: string]: string }[] = [];
  const lines: string[] = csv.split("\n");

  if (lines.length > 0) {
    const headers: string[] = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
      const rowData = lines[i].split(",");

      dataTable[i] = {};
      for (let j = 0; j < rowData.length; j++) {
        dataTable[i][headers[j]] = rowData[j];
      }
    }
  }
  return dataTable;
};
