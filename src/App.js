import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from "./screens/HomeScreen";
import Register from "./screens/Register";
import SingleProduct from "./screens/SingleProduct";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import Login from "./screens/Login";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Footer from "./components/Footer"
import NotFound from "./screens/NotFound";
import { useSelector } from "react-redux";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} exact />
          <Route path="/search/:keyword" element={<HomeScreen />} exact />
          <Route path="/page/:pagenumber" element={<HomeScreen />} exact />
          <Route path="/search/:keyword/page/:pagenumber" element={<HomeScreen />} exact />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/cart/:id" element={<CartScreen />} />
          <Route path='/shipping' element={<ShippingScreen />} />
          <Route path='/payment' element={<PaymentScreen />} />
          <Route path='/placeorder' element={<PlaceOrderScreen />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/order/:id' element={<OrderScreen />} />
          <Route path='/profile' element={<ProfileScreen />}  />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
