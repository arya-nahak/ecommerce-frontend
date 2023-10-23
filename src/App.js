import React, { useEffect } from "react";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import Protector from "./features/Auth/Component/Protector";
import { useDispatch, useSelector } from "react-redux";
import { getCartRequestByuser } from "./features/Cart/CartAction";
import PageNotFound from "./app/PageNotFound";
import OrderSuccess from "./Pages/OrderSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protector>
        <Home />
      </Protector>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <SignUpPage />,
  },
  {
    path: "/cart",
    element: (
      <Protector>
        <CartPage />
      </Protector>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protector>
        <CheckoutPage />
      </Protector>
    ),
  },
  {
    path: "/product/overview/:id",
    element: (
      <Protector>
        <ProductDetailPage />
      </Protector>
    ),
  },
  {
    path: "/order/success/:id",
    element: (
      <OrderSuccess/>
    ),
  },
  {
    path: "*",
    element: (
      <PageNotFound/>
    ),
  },
]);

function App() {
  const currentUser = useSelector((state) => state.userAuth.users);
  const products = useSelector(state=>state.cart.cart)
  const cartChanges = useSelector(state=>state.cart.isRequest)
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      const uid = `?user=${currentUser.id}`;
      dispatch(getCartRequestByuser(uid));
    }
    console.log(products,"pppppppppppppppppppppppppppppppppppppppppppppppppppp");
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
