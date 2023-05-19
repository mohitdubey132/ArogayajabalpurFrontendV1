import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import { Footer } from "./components/Layouts/Footer";
import { NavigationBar } from "./components/Layouts/NavigationBar";
import Error from "./pages/Error";
import DoctorSigin from "./pages/DoctorSigin";
import { ContextProvider } from './context';
import { DoctorsWindow } from './pages/DoctorsWindow';
import { ViewDoctors } from "./pages/ViewDoctors";
import { AddProduct } from "./pages/AddProduct";
import { AdminDashBoard } from "./pages/AdminDashBoard";
import { ViewProductsAdmin } from './pages/ViewProductsAdmin';
import { ViewOrdersAdmin } from "./pages/ViewOrdersAdmin";
import { AppointmentsUser } from "./pages/AppointmentsUser";
import BookAppointment from "./pages/BookAppointment";
function App() {
  return (<div id="Homepage">

    <ContextProvider>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/doctorSigin" element={<DoctorSigin />} />
        <Route path='/doctors' element={<DoctorsWindow />} />
        <Route path="*" element={<Error />} />
        <Route path='/user' >
          {/* <Route index element={<User />} /> */}
          <Route path="appointments" element={<AppointmentsUser />} />
          <Route path="bookAppointment/:id" element={<BookAppointment/>}/>
          {/* <Route path="orders" element={<OrdersUser />} /> */}
        </Route>
        <Route path='/admin'>
          <Route index element={<AdminDashBoard />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="viewDoctor" element={<ViewDoctors />} />
          <Route path="ViewProducts" element={<ViewProductsAdmin />} />
          <Route path="orders" element={<ViewOrdersAdmin />} />
        </Route>



      </Routes>
      <Footer />
    </ContextProvider>
  </div>
  );
}

export default App;
