import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import Products, { loader as productsLoader } from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminProductDetail from "./pages/Admin/AdminProductDetail";
import AdminProductInfo from "./pages/Admin/AdminProductInfo";
import AdminProductPhotos from "./pages/Admin/AdminProductPhotos";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Error from "./components/Error";

import "../server";

// import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        index
        element={<Products />}
        loader={productsLoader}
        errorElement={<Error />}
      />
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
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
