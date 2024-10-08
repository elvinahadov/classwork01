import React, { useEffect, useState } from "react";

const Products = () => {
  const [data, setData] = useState([]);
  const fetchProducts = async () => {
    const response = await fetch("https://northwind.vercel.app/api/products");
    const data = await response.json();
    setData(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 w-[50px]">
                Product Number
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
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
            {data &&
              data.map((item, index) => (  
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="col" className="px-6 py-3 text-center">
                    {index+1}
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
                  <th scope="col" className="px-6 py-3 flex gap-4 justify-center">
                    <button className="bg-red-500 text-white py-2 px-4 rounded-lg">DELETE</button>
                    <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg">EDIT</button>
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
