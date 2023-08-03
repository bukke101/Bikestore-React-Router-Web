import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { loader as homeProductsLoader } from "./pages/Home";
import { loader as productsLoader } from "./pages/products/Products";
import { loader as productLoader } from "./pages/products/ProductDetail";
import { loader as adminProductsLoader } from "./pages/admin/AdminProducts";
import { loader as adminProductLoader } from "./pages/admin/AdminProductDetail";
import { requireAuth } from "./utils";
import { CartProvider } from "./components/CartContext";

import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";
import Error from "./components/Error";

import Home from "./pages/Home";
import Products from "./pages/products/Products";
import ProductDetail from "./pages/products/ProductDetail";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductDetail from "./pages/admin/AdminProductDetail";
import Dashboard from "./pages/admin/Dashboard";
import AdminProductInfo from "./pages/admin/AdminProductInfo";
import AdminProductPhotos from "./pages/admin/AdminProductPhotos";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Login, {
  action as loginAction,
  loader as loginLoader,
} from "./pages/Login";
import NotFound from "./pages/NotFound";

import "./server";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        index
        element={<Home />}
        loader={homeProductsLoader}
        errorElement={<Error />}
      />
      <Route path="about" element={<About />} />

      <Route path="cart" element={<Cart />} />
      <Route
        path="login"
        loader={loginLoader}
        action={loginAction}
        element={<Login />}
      />
      <Route
        path="products"
        element={<Products />}
        loader={productsLoader}
        errorElement={<Error />}
      />
      <Route
        path="/products/:id"
        element={<ProductDetail />}
        loader={productLoader}
        errorElement={<Error />}
      />

      <Route path="admin" element={<AdminLayout />}>
        <Route
          index
          loader={async ({ request }) => await requireAuth(request)}
          element={<Dashboard />}
        />
        <Route
          path="products"
          element={<AdminProducts />}
          loader={adminProductsLoader}
          errorElement={<Error />}
        />
        <Route
          path="products/:id"
          element={<AdminProductDetail />}
          loader={adminProductLoader}
          errorElement={<Error />}
        >
          <Route
            index
            loader={async ({ request }) => await requireAuth(request)}
            element={<AdminProductInfo />}
          />
          <Route
            path="photos"
            loader={async ({ request }) => await requireAuth(request)}
            element={<AdminProductPhotos />}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
