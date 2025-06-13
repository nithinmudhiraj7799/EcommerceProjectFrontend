// src/components/InvoiceDownloadButton.jsx
import axios from "axios";

const InvoiceDownloadButton = () => {
  const downloadInvoice = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/download-invoice", {
        name: "Nithin Talari",
        email: "nithin@example.com",
        address: "Vikarabad, Telangana",
        items: [
          { product: "Mango", quantity: 3, price: 50 },
          { product: "Banana", quantity: 5, price: 10 },
        ],
      });

      if (res.data.downloadURL) {
        window.open(res.data.downloadURL, "_blank"); // Opens PDF in new tab
      }
    } catch (error) {
      console.error("Error downloading invoice:", error);
      alert("Failed to download invoice. Please try again.");
    }
  };

  return (
    <button
      onClick={downloadInvoice}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Download Invoice
    </button>
  );
};

export default InvoiceDownloadButton;
