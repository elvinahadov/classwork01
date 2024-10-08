import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <section className="bg-indigo-500">
      <div className="container mx-auto max-w-[1128px] h-[70px] flex items-center justify-center gap-10 text-white font-semibold">
        <Link to={"/"}>
          <p>Home</p>
        </Link>
        <Link to={"/products"}>
          <p>Products</p>
        </Link>
        <Link to={"/addProducts"}>
          <p>Add Products</p>
        </Link>
      </div>
    </section>
  );
};

export default Header;
