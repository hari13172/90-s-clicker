import { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import logo from '../assets/logo.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Clicker() {

    const [traditionalPhotographer, setTraditionalPhotographer] = useState(1);
    const [traditionalVideographer, setTraditionalVideographer] = useState(1);
    const [candidPhotographer, setCandidPhotographer] = useState(1);
    const [candidVideographer, setCandidVideographer] = useState(1);
    const [drone, setDrone] = useState(1);
    const [album, setAlbum] = useState(0);
    const [sheetNumber, setSheetNumber] = useState(16);
    const [eventType, setEventType] = useState('Wedding');
    const [hdQualityPendrive, setHdQualityPendrive] = useState(false);
    const [bigSizePhotoFrame, setBigSizePhotoFrame] = useState(false);

    const resetForm = () => {
        setTraditionalPhotographer(1);
        setTraditionalVideographer(1);
        setCandidPhotographer(1);
        setCandidVideographer(1);
        setDrone(1);
        setAlbum(0);
        setSheetNumber(16);
        setEventType('Wedding');
        setHdQualityPendrive(false);
        setBigSizePhotoFrame(false);
    };

    const generateRandomPDF = async (e: any) => {
        e.preventDefault()
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
            let startX = width / 2 - 40; // Adjust x position for centering text
            let startY = height / 2 + 15; // Adjust y position for centering text vertically

            // album logic
            const albumText = album > 0 ? `${album} / ${sheetNumber}` : "0";

            // Data entries to insert into the PDF
            const textEntries = [
                `Event Type: ${eventType}`, // Include the event type
                `Traditional Photographer: ${traditionalPhotographer}`,
                `Traditional Videographer: ${traditionalVideographer}`,
                `Candid Photographer: ${candidPhotographer}`,
                `Candid Videographer: ${candidVideographer}`,
                `Drone: ${drone}`,
                `Album: ${albumText}`,
                `Video HD Quality Pendrive: ${hdQualityPendrive ? 'Yes' : 'No'}`,
                `Big Size Photo Frame: ${bigSizePhotoFrame ? 'Yes' : 'No'}`,
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

            // Create a sanitized filename from the event type
            const sanitizedEventType = eventType.replace(/[\/\\?%*:|"<>]/g, '_'); // Replace invalid characters
            const filename = `Invoice_${sanitizedEventType}.pdf`;


            // Trigger the browser to download the updated PDF document
            const blob = new Blob([updatedPdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);

            // Toast 
            toast.success('PDF generated and downloaded successfully!');

            //reset
            resetForm()
        } catch (error) {
            console.error('Error generating PDF:', error);
            toast.error('Failed to generate PDF.');
        }
    };


    const inputClass = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-blue-500";

    return (
        <div className="min-h-screen bg-gray-400 flex items-center justify-center">
            <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-center items-center mb-4">
                    <img src={logo} alt="Logo" className="w-[350px] h-[200px]" />
                </div>
                <h1 className="text-2xl text-center font-bold mb-4 text-gray-700">Invoice Generator</h1>
                <div className="space-y-4">
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Event Type:
                            <select
                                className={inputClass}
                                value={eventType}
                                onChange={(e) => setEventType(e.target.value)}
                            >
                                <option value="Wedding">Wedding</option>
                                <option value="Engagement">Engagement</option>
                                <option value="Other">Other</option>
                            </select>
                        </label>
                    </div>

                    <div className="flex justify-between items-center">
                        <label className="block w-full">
                            <span className="text-gray-700">Traditional Photographer:</span>
                            <select
                                className={inputClass}
                                value={traditionalPhotographer}
                                onChange={(e) => setTraditionalPhotographer(parseInt(e.target.value))}
                            >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                            </select>
                        </label>
                        <label className="block w-full ml-4">
                            <span className="text-gray-700">Traditional Videographer:</span>
                            <select
                                className={inputClass}
                                value={traditionalVideographer}
                                onChange={(e) => setTraditionalVideographer(parseInt(e.target.value))}
                            >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                            </select>
                        </label>
                    </div>

                    <div className="flex justify-between items-center">
                        <label className="block w-full">
                            <span className="text-gray-700">Candid Photographer:</span>
                            <select
                                className={inputClass}
                                value={candidPhotographer}
                                onChange={(e) => setCandidPhotographer(parseInt(e.target.value))}
                            >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                            </select>
                        </label>
                        <label className="block w-full ml-4">
                            <span className="text-gray-700">Candid Videographer:</span>
                            <select
                                className={inputClass}
                                value={candidVideographer}
                                onChange={(e) => setCandidVideographer(parseInt(e.target.value))}
                            >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                            </select>
                        </label>
                    </div>

                    <div className="flex justify-between items-center">
                        <label className="block w-full">
                            <span className="text-gray-700">Drone:</span>
                            <select
                                className={inputClass}
                                value={drone}
                                onChange={(e) => setDrone(parseInt(e.target.value))}
                            >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                            </select>
                        </label>
                        <label className="block w-full ml-4">
                            <span className="text-gray-700">Album:</span>
                            <select
                                className={inputClass}
                                value={album}
                                onChange={(e) => setAlbum(parseInt(e.target.value))}
                            >
                                <option value={0}>Select</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                            </select>
                        </label>
                    </div>

                    {album > 0 && (
                        <div className="mt-2">
                            <label className="block text-gray-700">
                                Sheet Number:
                                <input
                                    type="number"
                                    className={inputClass}
                                    value={sheetNumber}
                                    onChange={(e) => setSheetNumber(parseInt(e.target.value) || 16)}
                                    min="1"
                                />
                            </label>
                        </div>
                    )}

                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="hdQualityPendrive"
                            checked={hdQualityPendrive}
                            onChange={(e) => setHdQualityPendrive(e.target.checked)}
                            className="mr-2"
                        />
                        <label htmlFor="hdQualityPendrive" className="text-gray-700">Video HD Quality Pendrive</label>
                    </div>
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="bigSizePhotoFrame"
                            checked={bigSizePhotoFrame}
                            onChange={(e) => setBigSizePhotoFrame(e.target.checked)}
                            className="mr-2"
                        />
                        <label htmlFor="bigSizePhotoFrame" className="text-gray-700">Big Size Photo Frame</label>
                    </div>

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
