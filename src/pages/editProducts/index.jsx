import React, { useState, useEffect } from "react";
import { useStore } from "../../store/store";
import { useNavigate } from "react-router-dom";

const EditProducts = () => {
    const navigate=useNavigate()
  const [data, setData] = useState([
    {
      name: "",
      supplierId: "",
      categoryId: "",
      quantityPerUnit: "",
      unitPrice: "",
      unitsInStock: "",
      unitsOnOrder: "",
      reorderLevel: "",
      discontinued: false,
    },
  ]);
  const { editingProdId } = useStore();

  const fetchProductById = async () => {
    try {
      const response = await fetch(
        `https://northwind.vercel.app/api/products/${editingProdId}`
      );
      const productData = await response.json();
      setData(productData);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://northwind.vercel.app/api/products/${editingProdId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        alert("Product updated successfully!");
      } else {
        alert("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
    navigate("/products")
  };

  useEffect(() => {
    fetchProductById();
  }, [editingProdId]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Supplier ID
          </label>
          <input
            type="number"
            name="supplierId"
            value={data.supplierId}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category ID
          </label>
          <input
            type="number"
            name="categoryId"
            value={data.categoryId}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity Per Unit
          </label>
          <input
            type="text"
            name="quantityPerUnit"
            value={data.quantityPerUnit}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Unit Price
          </label>
          <input
            type="number"
            step="0.01"
            name="unitPrice"
            value={data.unitPrice}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Units in Stock
          </label>
          <input
            type="number"
            name="unitsInStock"
            value={data.unitsInStock}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Units on Order
          </label>
          <input
            type="number"
            name="unitsOnOrder"
            value={data.unitsOnOrder}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reorder Level
          </label>
          <input
            type="number"
            name="reorderLevel"
            value={data.reorderLevel}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="flex items-center">
          <label className="block text-sm font-medium text-gray-700">
            Discontinued
          </label>
          <input
            type="checkbox"
            name="discontinued"
            checked={data.discontinued}
            onChange={handleChange}
            className="ml-3"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProducts;
