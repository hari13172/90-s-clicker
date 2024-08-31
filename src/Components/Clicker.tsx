import { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import logo from '../assets/logo.png'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Clicker() {
    const [traditionalPhotographer, setTraditionalPhotographer] = useState(0);
    const [traditionalVideographer, setTraditionalVideographer] = useState(0);
    const [candidPhotographer, setCandidPhotographer] = useState(0);
    const [candidVideographer, setCandidVideographer] = useState(0)
    const [drone, setDrone] = useState(0)
    const [album, setAlbum] = useState(0);

    const generateRandomPDF = async () => {

        if (
            traditionalPhotographer === 0 &&
            traditionalVideographer === 0 &&
            candidPhotographer === 0 &&
            candidVideographer === 0 &&
            drone === 0 &&
            album === 0) {

            toast.error('Please enter value greaterthan zero to generate pdf')
            return

        }
        try {
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

            // Define the start position for the text in the center or white space
            const { width, height } = page.getSize(); // Get page dimensions
            let startX = width / 2 - 50; // Adjust x position for centering text
            let startY = height / 2 + 15; // Adjust y position for centering text vertically

            // Data entries to insert into the PDF
            const textEntries = [
                `Traditional Photographer: ${traditionalPhotographer}`,
                `Traditional Videographer: ${traditionalVideographer}`,
                `Candid Photographer: ${candidPhotographer}`,
                `Candid Videographer: ${candidVideographer}`,
                `Drone: ${drone}`,
                `Album: ${album}`,
            ];

            // Loop through the entries and draw them into the PDF's white space
            textEntries.forEach((text, index) => {
                page.drawText(text, {
                    x: startX,
                    y: startY - index * 10, // Adjust line spacing by modifying the decrement value
                    size: 8,
                    font: helveticaFont,
                    color: rgb(0, 0, 0),
                });
            });

            // Serialize the PDFDocument to bytes (a Uint8Array)
            const updatedPdfBytes = await pdfDoc.save();

            // Trigger the browser to download the updated PDF document
            const blob = new Blob([updatedPdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Updated_Invoice.pdf';
            a.click();
            URL.revokeObjectURL(url);

            //toast
            toast.success('PDF generated and downloaded successfully!');
        } catch (error) {
            console.error('Error generating PDF:', error);

        }
    };

    return (
        <div className="min-h-screen bg-gray-400 flex items-center justify-center">
            <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-center items-center mb-4">
                    <img src={logo} alt="Logo" className="w-[150px] h-[150px]" />
                </div>
                <h1 className="text-2xl font-bold mb-4 text-gray-700">Invoice Generator</h1>
                <div className="space-y-4">
                    <label className="block">
                        <span className="text-gray-700">Traditional Photographer:</span>
                        <input
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-blue-500"
                            type="number"
                            value={traditionalPhotographer}
                            onChange={(e) => setTraditionalPhotographer(parseInt(e.target.value) || 0)}
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Traditional Videographer:</span>
                        <input
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-blue-500"
                            type="number"
                            value={traditionalVideographer}
                            onChange={(e) => setTraditionalVideographer(parseInt(e.target.value) || 0)}
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Candid Photographer:</span>
                        <input
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-blue-500"
                            type="number"
                            value={candidPhotographer}
                            onChange={(e) => setCandidPhotographer(parseInt(e.target.value) || 0)}
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Candid Videographer:</span>
                        <input
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-blue-500"
                            type="number"
                            value={candidVideographer}
                            onChange={(e) => setCandidVideographer(parseInt(e.target.value) || 0)}
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Drone:</span>
                        <input
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-blue-500"
                            type="number"
                            value={drone}
                            onChange={(e) => setDrone(parseInt(e.target.value) || 0)}
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Album:</span>
                        <input
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-blue-500"
                            type="number"
                            value={album}
                            onChange={(e) => setAlbum(parseInt(e.target.value) || 0)}
                        />
                    </label>
                    <button
                        onClick={generateRandomPDF}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Generate Invoice PDF
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>




    );
}

export default Clicker;
