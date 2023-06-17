import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminProductDetail from "./pages/Admin/AdminProductDetail";
import AdminProductInfo from "./pages/Admin/AdminProductInfo";
import AdminProductPhotos from "./pages/Admin/AdminProductPhotos";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

import "../server";

// import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Products />} />
            <Route path=":id" element={<ProductDetail />} />
            <Route path="about" element={<About />} />

            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/:id" element={<AdminProductDetail />}>
                <Route index element={<AdminProductInfo />} />
                <Route path="photos" element={<AdminProductPhotos />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      ;
    </>
  );
}

export default App;
