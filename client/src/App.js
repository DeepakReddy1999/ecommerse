import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbaar from './components/header/Navbaar';
import Newnav from './components/newnavbaar/Newnav';
import Maincomp from './components/home/MainComp';
import Footer from './components/footer/Footer';
import SignIn from './components/signup_signin/SignIn';
import SignUp from './components/signup_signin/SignUp';
import Buynow from './components/buynow/Buynow';
import Cart from './components/cart/Cart';


function App() {
  return (
    <>
    <Navbaar />
    <Newnav />
    <Routes>
      <Route exact path="/" element={<Maincomp />} /> 
      <Route exact path="/login" element={<SignIn />} /> 
      <Route exact path="/register" element={<SignUp />} /> 
      <Route exact path="/getproductsone/:id" element={<Cart />} /> 
      <Route exact path="/buynow" element={<Buynow />} /> 
    </Routes>
    <Footer />
    </>
  );
}

export default App;
