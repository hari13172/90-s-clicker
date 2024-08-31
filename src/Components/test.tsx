import { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

function Clicker() {
    const [traditionalPhotographer, setTraditionalPhotographer] = useState(0);
    const [traditionalVideographer, setTraditionalVideographer] = useState(0);
    const [candidPhotographer, setCandidPhotographer] = useState(0);
    const [album, setAlbum] = useState(0);

    const generatePDF = async () => {
        try {
            // Log the current state values to the console
            console.log('Traditional Photographer:', traditionalPhotographer);
            console.log('Traditional Videographer:', traditionalVideographer);
            console.log('Candid Photographer:', candidPhotographer);
            console.log('Album:', album);

            // Fetch the existing PDF template
            const existingPdfBytes = await fetch('src/assets/90sklicker.pdf').then((res) =>
                res.arrayBuffer()
            );

            // Load a PDFDocument from the existing PDF
            const pdfDoc = await PDFDocument.load(existingPdfBytes);

            // Embed a standard font
            const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

            // Get the first page of the document
            const page = pdfDoc.getPage(0);

            // Analyze the PDF to identify white space areas
            // Here we assume the white space starts from (50, 550) with sufficient height and width.
            // Adjust these values as per your PDF layout.
            const startX = 50;
            let startY = 550;

            // Draw text on the PDF in identified white space
            const textEntries = [
                `Traditional Photographer: ${traditionalPhotographer}`,
                `Traditional Videographer: ${traditionalVideographer}`,
                `Candid Photographer: ${candidPhotographer}`,
                `Album: ${album}`,
            ];

            // Loop through the text entries and draw them in white space
            textEntries.forEach((text, index) => {
                page.drawText(text, {
                    x: startX,
                    y: startY - index * 20, // Adjust line spacing by modifying the decrement value
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
            a.download = 'Invoice.pdf';
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
            <button onClick={generatePDF} className="bg-red-200">
                Generate Invoice PDF
            </button>
        </div>
    );
}

export default Clicker;
