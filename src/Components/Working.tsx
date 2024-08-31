import { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

function Clicker() {
    const [traditionalPhotographer, setTraditionalPhotographer] = useState(0);
    const [traditionalVideographer, setTraditionalVideographer] = useState(0);
    const [candidPhotographer, setCandidPhotographer] = useState(0);
    const [album, setAlbum] = useState(0);

    const generateRandomPDF = async () => {
        try {
            // Create a new PDFDocument
            const pdfDoc = await PDFDocument.create();

            // Add a blank page to the document
            const page = pdfDoc.addPage([600, 800]); // Custom page size, you can adjust this as needed

            // Embed a standard font
            const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

            // Define the start position for the text
            let startX = 300;
            let startY = 350;

            // Data entries to insert into the PDF
            const textEntries = [
                `Traditional Photographer: ${traditionalPhotographer}`,
                `Traditional Videographer: ${traditionalVideographer}`,
                `Candid Photographer: ${candidPhotographer}`,
                `Album: ${album}`,
            ];

            // Loop through the entries and draw them into the PDF
            textEntries.forEach((text, index) => {
                page.drawText(text, {
                    x: startX,
                    y: startY - index * 30, // Adjust line spacing by modifying the decrement value
                    size: 12,
                    font: helveticaFont,
                    color: rgb(0, 0, 0),
                });
            });

            // Serialize the PDFDocument to bytes (a Uint8Array)
            const pdfBytes = await pdfDoc.save();

            // Trigger the browser to download the PDF document
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Random_Invoice.pdf';
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <div>
            <h1>Invoice Generator</h1>
            <label>
                Traditional Photographer:
                <input
                    className="bg-blue-400"
                    type="number"
                    value={traditionalPhotographer}
                    onChange={(e) => setTraditionalPhotographer(parseInt(e.target.value) || 0)}
                />
            </label>
            <label>
                Traditional Videographer:
                <input
                    className="bg-blue-400"
                    type="number"
                    value={traditionalVideographer}
                    onChange={(e) => setTraditionalVideographer(parseInt(e.target.value) || 0)}
                />
            </label>
            <label>
                Candid Photographer:
                <input
                    className="bg-blue-400"
                    type="number"
                    value={candidPhotographer}
                    onChange={(e) => setCandidPhotographer(parseInt(e.target.value) || 0)}
                />
            </label>
            <label>
                Album:
                <input
                    className="bg-blue-400"
                    type="number"
                    value={album}
                    onChange={(e) => setAlbum(parseInt(e.target.value) || 0)}
                />
            </label>
            <button onClick={generateRandomPDF} className="bg-red-200">
                Generate Random Invoice PDF
            </button>
        </div>
    );
}

export default Clicker;
