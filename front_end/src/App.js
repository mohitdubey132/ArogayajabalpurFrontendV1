import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import { Footer } from "./components/Layouts/Footer";
import { NavigationBar } from "./components/Layouts/NavigationBar";
import Error from "./pages/Error";
import DoctorSigin from "./pages/DoctorSigin";
import {ContextProvider} from './context';
import {DoctorsWindow} from './pages/DoctorsWindow';


function App() {
  return (<div id="Homepage">
  
    <ContextProvider>
    <NavigationBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/doctorSigin" element={<DoctorSigin/>} />
      <Route path='/doctors' element={<DoctorsWindow/>}/>
      <Route path="*" element={<Error />} />
      {/* // <Route path='/user' >
      //   <Route index element={<User />}/>
      //   <Route path="edit" element={<Edit/>}/>
      //   <Route path="appointments" element={<Appointments/>}/>
      // </Route> */}
      


    </Routes>
    <Footer />
    </ContextProvider>
  </div>
  );
}

export default App;
