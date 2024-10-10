import React, { useState } from "react";
import SupplierModal from "../components/SupplierModal";
import Modal from "react-modal";
import PhotoUploadModal from "../Modal/PhotoModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/NavBar";

Modal.setAppElement("#root");

const ItemMaster = () => {
  const [item, setItem] = useState({
    itemNo: `ITEM-${Date.now()}`,
    itemName: "",
    inventoryLocation: "",
    brand: "",
    category: "",
    supplier: "",
    stockUnit: "Pieces",
    unitPrice: 0,
    itemImages: [],
    status: "Enabled",
  });

  const [showImageModal, setShowImageModal] = useState(false);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState("");

  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    if (!item.itemName) newErrors.itemName = "Item Name is required.";
    if (!item.inventoryLocation)
      newErrors.inventoryLocation = "Inventory Location is required.";
    if (!item.brand) newErrors.brand = "Brand is required.";
    if (!item.category) newErrors.category = "Category is required.";
    if (item.unitPrice <= 0)
      newErrors.unitPrice = "Unit Price must be greater than 0.";
    if (!item.supplier) newErrors.supplier = "Supplier must be selected.";
    if (!item.itemImages.length)
      newErrors.itemImages = "At least one image must be uploaded.";

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleImagesUpload = (uploadedImages) => {
    setItem((prevItem) => ({
      ...prevItem,
      itemImages: [...prevItem.itemImages, ...uploadedImages],
    }));
    setShowImageModal(false);
  };

  const handleSupplierSelect = (supplier) => {
    setSelectedSupplier(supplier);
    setItem({ ...item, supplier });
    setShowSupplierModal(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateFields();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        toast.success("Item saved successfully!", { position: "top-right" });

        setItem({
          itemNo: `ITEM-${Date.now()}`,
          itemName: "",
          inventoryLocation: "",
          brand: "",
          category: "",
          supplier: "",
          stockUnit: "Pieces",
          unitPrice: 0,
          itemImages: [],
          status: "Enabled",
        });
        setErrors({});
      } else {
        toast.error("Failed to save the item. Please try again.", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Error saving item. Please check your server.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center p-8">
      <div className="fixed top-0 w-full z-50">
        <Navbar />
      </div>
      <ToastContainer />
      <div className="bg-white  shadow-md rounded-lg p-6 mb-6 w-full max-w-4xl mt-20">
        <h1 className="text-3xl font-bold text-blue-600 text-center">
          Item Master
        </h1>
      </div>

      <div className="bg-gradient-to-r from-light-blue-800 to-light-blue-100 rounded-lg shadow-lg p-6 w-full max-w-4xl">
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700">Item No:</label>
              <input
                type="text"
                value={item.itemNo}
                disabled
                className="border border-gray-300 rounded-lg p-3 w-full bg-gray-100"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Item Name:</label>
              <input
                type="text"
                name="itemName"
                value={item.itemName}
                onChange={handleInputChange}
                className={`border ${
                  errors.itemName ? "border-red-500" : "border-gray-300"
                } rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400`}
                placeholder="Enter item name"
              />
              {errors.itemName && (
                <span className="text-red-600">{errors.itemName}</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Inventory Location:</label>
              <input
                type="text"
                name="inventoryLocation"
                value={item.inventoryLocation}
                onChange={handleInputChange}
                className={`border ${
                  errors.inventoryLocation
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400`}
                placeholder="Enter inventory location"
              />
              {errors.inventoryLocation && (
                <span className="text-red-600">{errors.inventoryLocation}</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Brand:</label>
              <input
                type="text"
                name="brand"
                value={item.brand}
                onChange={handleInputChange}
                className={`border ${
                  errors.brand ? "border-red-500" : "border-gray-300"
                } rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400`}
                placeholder="Enter brand name"
              />
              {errors.brand && (
                <span className="text-red-600">{errors.brand}</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Category:</label>
              <input
                type="text"
                name="category"
                value={item.category}
                onChange={handleInputChange}
                className={`border ${
                  errors.category ? "border-red-500" : "border-gray-300"
                } rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400`}
                placeholder="Enter category"
              />
              {errors.category && (
                <span className="text-red-600">{errors.category}</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Stock Unit:</label>
              <select
                name="stockUnit"
                value={item.stockUnit}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Pieces">Pieces</option>
                <option value="Boxes">Boxes</option>
              </select>
            </div>

            <div className="flex items-center space-x-4 w-full mb-4">
              <label className="block text-gray-700">Supplier:</label>
              <span className="text-gray-900 flex-grow">
                {selectedSupplier || "No supplier selected"}
              </span>
              <button
                type="button"
                onClick={() => setShowSupplierModal(true)}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                {selectedSupplier ? "Change Supplier" : "Select Supplier"}
              </button>
            </div>
            {showSupplierModal && (
              <SupplierModal onSelect={handleSupplierSelect} />
            )}
            {errors.supplier && (
              <span className="text-red-600">{errors.supplier}</span>
            )}

            <div className="mb-4">
              <label className="block text-gray-700">Unit Price:</label>
              <input
                type="number"
                name="unitPrice"
                value={item.unitPrice}
                onChange={handleInputChange}
                className={`border ${
                  errors.unitPrice ? "border-red-500" : "border-gray-300"
                } rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400`}
                placeholder="Enter unit price"
              />
              {errors.unitPrice && (
                <span className="text-red-600">{errors.unitPrice}</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Status:</label>
              <select
                name="status"
                value={item.status}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Enabled">Enabled</option>
                <option value="Disabled">Disabled</option>
              </select>
            </div>

            <div className="mb-4 col-span-1 md:col-span-2">
              <label className="block text-gray-700">Item Images:</label>
              <button
                type="button"
                onClick={() => setShowImageModal(true)}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
              >
                Upload Images
              </button>
              {errors.itemImages && (
                <span className="text-red-600">{errors.itemImages}</span>
              )}
            </div>

            <div className="mb-4 col-span-1 md:col-span-2">
              {item.itemImages.length > 0 && (
                <div className="flex flex-wrap">
                  {item.itemImages.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Item Image ${index}`}
                      width="100"
                      className="rounded mb-2 mr-2"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="col-span-1 md:col-span-2">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
              >
                Save Item
              </button>
            </div>
          </div>
        </form>

        <PhotoUploadModal
          isOpen={showImageModal}
          onClose={() => setShowImageModal(false)}
          onUpload={handleImagesUpload}
          file={5}
        />
      </div>
    </div>
  );
};

export default ItemMaster;
