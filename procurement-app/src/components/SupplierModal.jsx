import React, { useState } from "react";
import Modal from "react-modal";

const SupplierModal = ({ onSelect }) => {
  const [showModal, setShowModal] = useState(false);
  const [suppliers] = useState(["Supplier A", "Supplier B", "Supplier C"]);

  // Optional: Set the app element for accessibility
  Modal.setAppElement('#root'); // Adjust this based on your app's root element

  return (
    <div>
      <button 
        type="button" 
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        onClick={() => setShowModal(true)}
      >
        Select Supplier
      </button>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="max-w-md mx-auto my-20 p-6 bg-white rounded shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-lg font-semibold mb-4">Select a Supplier</h2>
        <ul className="space-y-2">
          {suppliers.map((supplier, index) => (
            <li 
              key={index} 
              className="p-2 hover:bg-gray-100 rounded cursor-pointer"
              onClick={() => { 
                onSelect(supplier); 
                setShowModal(false); 
              }}
            >
              {supplier}
            </li>
          ))}
        </ul>
        <button 
          type="button" 
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default SupplierModal;
