import React from "react";

// For routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductDetailContainer from "./pages/Product/ProductDetailContainer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfileContainer from "./containers/UserProfileContainer";
import NotFoundContainer from "./containers/NotFoundContainer";
import CartContainer from "./containers/CartContainer";
import User from "./pages/User";
import Admin from "./pages/Admin/Admin";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/product/:productId" element={<ProductDetailContainer />}></Route>
        <Route path="/profile" element={<UserProfileContainer />}></Route>        
        <Route path="/cart" element={<CartContainer />}></Route>        
        <Route path="/test" element={<User />}></Route>        
        <Route path="*" element={<NotFoundContainer />}></Route>        
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
