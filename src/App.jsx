import "./App.css";
import Layout from "./components/layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Products from "./pages/products";
import AddProducts from "./pages/addProducts";
import EditProducts from "./pages/editProducts";

function App({ children }) {
  return (
    <>
      <Layout>
        {children}
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/products" element={<Products />}/>
          <Route path="/addProducts" element={<AddProducts />}/>
          <Route path="/editProducts" element={<EditProducts />}/>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
