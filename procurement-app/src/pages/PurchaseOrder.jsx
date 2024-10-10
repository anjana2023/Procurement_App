import React, { useState, useEffect } from "react";
import SupplierModal from "../components/SupplierModal";
import axios from "axios";
import { saveAs } from "file-saver";
import Navbar from "../components/NavBar";
const PurchaseOrder = () => {
  const [order, setOrder] = useState({
    orderNo: Date.now(),
    orderDate: new Date().toISOString().split("T")[0],
    supplierName: "",
    items: [],
  });

  const [newItem, setNewItem] = useState({
    itemNo: "",
    itemName: "",
    stockUnit: "Pieces",
    unitPrice: 0,
    orderQty: 0,
    netAmount: 0,
    packingUnit: "Box",
  });

  const [errors, setErrors] = useState({});
  const [storedItems, setStoredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const validateFields = () => {
    const newErrors = {};

    if (!order.supplierName) {
      newErrors.supplierName = "Supplier is required.";
    }

    if (!newItem.itemNo) {
      newErrors.itemNo = "Item Number is required.";
    }
    if (!newItem.itemName) {
      newErrors.itemName = "Item Name is required.";
    }
    if (!newItem.packingUnit) {
      newErrors.packingUnit = "Packing Unit is required.";
    }
    if (!newItem.orderQty || newItem.orderQty <= 0) {
      newErrors.orderQty = "Order Quantity must be greater than 0.";
    }
    if (!newItem.unitPrice) {
      newErrors.unitPrice = "Unit Price is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/items");
        setStoredItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });

    if (name === "orderQty" || name === "unitPrice") {
      setNewItem((prevItem) => ({
        ...prevItem,
        netAmount: prevItem.orderQty * prevItem.unitPrice,
      }));
    }
  };

  const addItemToOrder = () => {
    if (validateFields()) {
      const netAmount = newItem.orderQty * newItem.unitPrice;
      setOrder((prevOrder) => ({
        ...prevOrder,
        items: [...prevOrder.items, { ...newItem, netAmount }],
      }));
      setNewItem({
        itemNo: "",
        itemName: "",
        packingUnit: "Box",
        orderQty: "",
        unitPrice: "",
        netAmount: 0,
      });
      setErrors({});
    }
  };

  const deleteItemFromOrder = (index) => {
    const updatedItems = order.items.filter((_, i) => i !== index);
    setOrder({ ...order, items: updatedItems });
  };

  const exportToExcel = () => {
    if (!order.items || order.items.length === 0) {
      alert("No items to export.");
      return;
    }

    let csvContent =
      "Item No,Item Name,Stock Unit,Packing Unit,Order Qty,Unit Price,Net Amount\n";

    order.items.forEach((item) => {
      csvContent += `${item.itemNo},${item.itemName},${item.stockUnit},${item.packingUnit},${item.orderQty},${item.unitPrice},${item.netAmount}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "purchase_order.csv");
  };

  const printOrder = () => {
    window.print();
  };

  const handleItemSelection = (e) => {
    const selectedItem = storedItems.find(
      (item) => item.itemName === e.target.value
    );
    if (selectedItem) {
      setNewItem({
        ...newItem,
        itemNo: selectedItem.itemNo,
        itemName: selectedItem.itemName,
        stockUnit: selectedItem.stockUnit,
        unitPrice: selectedItem.unitPrice,
      });
      setSelectedItem(selectedItem);
    } else {
      setSelectedItem(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="fixed top-0 w-full z-50">
        <Navbar />
      </div>
      <div className="bg-white  shadow-md rounded-lg p-6 mt-20 mb-6 w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-blue-600 text-center">
          Purchase Order
        </h1>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Order No:</label>
            <input
              type="text"
              value={order.orderNo}
              disabled
              className="mt-1 p-2 border rounded w-full bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Order Date:</label>
            <input
              type="date"
              value={order.orderDate}
              disabled
              className="mt-1 p-2 border rounded w-full bg-gray-100"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Supplier:</label>
            <div className="flex items-center">
              <input
                type="text"
                value={order.supplierName}
                disabled
                className="mt-1 p-2 border rounded w-full bg-gray-100"
              />
              <SupplierModal
                onSelect={(supplier) =>
                  setOrder({ ...order, supplierName: supplier })
                }
                className="ml-2"
              />
            </div>
            {errors.supplierName && (
              <p className="text-red-500">{errors.supplierName}</p>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Add Item to Order</h2>

            <label className="block text-gray-700">Select Item:</label>
            <select
              name="itemName"
              onChange={handleItemSelection}
              className="mt-1 p-2 border rounded w-full"
            >
              <option value="">Select an Item</option>
              {storedItems.length > 0 ? (
                storedItems.map((item) => (
                  <option key={item.itemNo} value={item.itemName}>
                    {item.itemName}
                  </option>
                ))
              ) : (
                <option disabled>No items available</option>
              )}
            </select>

            {errors.itemName && (
              <p className="text-red-500">{errors.itemName}</p>
            )}

            {selectedItem && (
              <div className="mt-4 bg-gray-100 p-4 rounded">
                <h3 className="font-semibold">Selected Item Details:</h3>
                <p>
                  <strong>Item No:</strong> {selectedItem.itemNo}
                </p>
                <p>
                  <strong>Stock Unit:</strong> {selectedItem.stockUnit}
                </p>
              </div>
            )}

            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
                <label className="block text-gray-700">Order Qty:</label>
                <input
                  type="number"
                  name="orderQty"
                  value={newItem.orderQty}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                />
                {errors.orderQty && (
                  <p className="text-red-500">{errors.orderQty}</p>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-gray-700">Unit Price:</label>
                <input
                  type="number"
                  name="unitPrice"
                  value={newItem.unitPrice}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                  disabled
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Packing Unit:</label>
              <select
                name="packingUnit"
                value={newItem.packingUnit}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded w-full"
              >
                <option value="Box">Box</option>
                <option value="Carton">Carton</option>
              </select>
              {errors.packingUnit && (
                <p className="text-red-500">{errors.packingUnit}</p>
              )}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={addItemToOrder}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Add Item
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Order Items</h2>
            {order.items.length > 0 ? (
              <table className="w-full bg-white shadow rounded-lg">
                <thead>
                  <tr className="bg-blue-100 text-left">
                    <th className="p-2">Item No</th>
                    <th className="p-2">Item Name</th>
                    <th className="p-2">Packing Unit</th>
                    <th className="p-2">Order Qty</th>
                    <th className="p-2">Unit Price</th>
                    <th className="p-2">Net Amount</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index}>
                      <td className="p-2">{item.itemNo}</td>
                      <td className="p-2">{item.itemName}</td>
                      <td className="p-2">{item.packingUnit}</td>
                      <td className="p-2">{item.orderQty}</td>
                      <td className="p-2">{item.unitPrice}</td>
                      <td className="p-2">{item.netAmount}</td>
                      <td className="p-2">
                        <button
                          type="button"
                          className="bg-red-500 text-white py-1 px-2 rounded"
                          onClick={() => deleteItemFromOrder(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No items added yet.</p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={exportToExcel}
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Export to Excel
            </button>
            <button
              type="button"
              onClick={printOrder}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Print Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseOrder;
