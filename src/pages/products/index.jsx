import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/store";

const Products = () => {
  const { setEditingProdId } = useStore();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [dataPag, setDataPag] = useState([]);
  const [startPagination, setStartPagination] = useState(0);
  const [endPagination, setEndPagination] = useState(1);

  const fetchProducts = async () => {
    const response = await fetch("https://northwind.vercel.app/api/products");
    const products = await response.json();
    setDataPag(products.slice(startPagination * 10, endPagination * 10));
    setData(products);
  };

  const handleEditProduct = (id) => {
    setEditingProdId(id);
    navigate(`/editProducts`);
  };
  const handleDeleteProduct = async (id) => {
    console.log(id)
    await fetch(`https://northwind.vercel.app/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, [startPagination, endPagination]);

  return (
    <div className="bg-indigo-300 min-h-screen">
      <div className="relative overflow-auto">
        <div className="my-4 flex justify-center items-center gap-2">
          {data &&
            data.map((_, index) => {
              if (index < data.length / 10) {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setStartPagination(index);
                      setEndPagination(index + 1);
                    }}
                    className="bg-slate-600 text-white py-1 px-3 rounded"
                  >
                    {index + 1}
                  </button>
                );
              }
            })}
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 w-[50px] text-center">
                Product ID
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity per Unit
              </th>
              <th scope="col" className="px-6 py-3">
                Units in Stock
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                EDIT & DELETE
              </th>
            </tr>
          </thead>
          <tbody>
            {dataPag &&
              dataPag.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th scope="col" className="px-6 py-3 text-center">
                    {item.id}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {item.name}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {item.quantityPerUnit}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {item.unitsInStock}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {item.unitPrice}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 flex gap-4 justify-center"
                  >
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded-lg"
                      onClick={() => handleDeleteProduct(item.id)}
                    >
                      DELETE
                    </button>
                    <button
                      className="bg-yellow-500 text-white py-2 px-4 rounded-lg"
                      onClick={() => handleEditProduct(item.id)}
                    >
                      EDIT
                    </button>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
