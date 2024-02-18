/*@Input :- exportToCsv('export.csv', [
	['name','description'],
  ['david','123'],
  ['jona','""'],
  ['a','b'],
])*/

export const exportCsv = (data: any) => {
        let processRow = (row: any) => {
            let finalVal = '';
            for (let j = 0; j < row.length; j++) {
                let innerValue = row[j] === null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                }
                let result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';
                if (j > 0)
                    finalVal += ',';
                finalVal += result;
            }
            return finalVal + '\n';
        };

        let csvFile = '';
        for (let i = 0; i < data.length; i++) {
            csvFile += processRow(data[i]);
        }
        return csvFile;
}


/** Convert a 2D array into a CSV string
 * Send Data:- [[1, '2', '"3"'],[true, null, undefined]]
 * Return :-
   "1","2","""3"""
   "true","null","undefined"
 * */
export const arrayToCsv = (data: any) =>{
    // @ts-ignore
    return data.map(row => row
            .map(String)  // convert every value to String
        // @ts-ignore
            .map(v => v.replaceAll('"', '""'))  // escape double colons
        // @ts-ignore
            .map(v => `"${v}"`)  // quote it
            .join(',')  // comma-separated
    ).join('\r\n');  // rows starting on new lines
}

export const convertArrayOfObjectsToCSV = (args: any)  =>{
    let result: any, ctr: any, keys: any, columnDelimiter: any, lineDelimiter: any, data: any;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach((item:any)=> {
        ctr = 0;
        keys.forEach((key: any)=> {
            if (ctr > 0) result += columnDelimiter;
            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });
    return result;
}

export const fileDownload = (content: any, type: any, fileName: string, column:any) =>{
    let data, filename, link, contentFile;

    if (content[0].length > 0) {
        contentFile =  exportCsv(content)
    }
    if (content[0].length  == undefined) {

        contentFile = convertArrayOfObjectsToCSV({
            data: content
        });
    }
    if (contentFile == null) return;

    filename = fileName || `${new Date().getMonth()}_${new Date().getFullYear()}_export.csv`;

    if (!contentFile.match(/^data:text\/csv/i)) {
        contentFile = 'data:text/csv;charset=utf-8,' + contentFile;
    }
    data = encodeURI(contentFile);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}