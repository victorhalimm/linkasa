import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { Button } from "@mui/material";
import React from "react";

const DownloadReport = () => {
    const generatePDF = () => {
        const doc = new jsPDF();

        doc.text("LinKasa Report", 20, 20);

        autoTable(doc, {
            head: [['Expenses', 'Cost', 'Department']],
            body: [
                ['x', 'x', 'x'],
            ],
            startY: 30,
        });

        doc.save("report.pdf");
    };

    const downloadCSV = () => {
        const data = [
            ['Expenses', 'Cost', 'Department'],
            ['x', 'y', 'z'],
        ];
    
        const csvContent = "data:text/csv;charset=utf-8," 
            + data.map(e => e.join(",")).join("\n");
    
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "report.csv");
        document.body.appendChild(link);
    
        link.click();
        document.body.removeChild(link); 
    };
    

    return (
        <React.Fragment>
            <Button onClick={generatePDF} variant="contained">
                Download Report (PDF)
            </Button>
            <Button onClick={downloadCSV} variant="contained" style={{ marginLeft: "10px" }}>
                Download Report (CSV)
            </Button>
        </React.Fragment>
    );
};

export default DownloadReport;
