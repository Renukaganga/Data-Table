// components/data-download.tsx
'use client'
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Parser } from 'json2csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export type UserData = {
  name: string;
  email: string;
  lastSeen: string;
}

interface DataDownloadProps {
  data: UserData[];
}

const DataDownload: FC<DataDownloadProps> = ({ data }) => {
  const handleDownloadCSV = () => {
    const parser = new Parser();
    const csv = parser.parse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    const tableColumn = ["Name", "Email", "Last Seen"];
    const tableRows: any[] = [];

    data.forEach(row => {
      const rowData = [
        row.name,
        row.email,
        row.lastSeen
      ];
      tableRows.push(rowData);
    });

    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 10,
      theme: 'striped',
    });

    doc.save('data.pdf');
  };

  return (
    <div>
      <Button onClick={handleDownloadCSV}>Download CSV</Button>
      <Button onClick={handleDownloadPDF}>Download PDF</Button>
    </div>
  );
};

export default DataDownload;
