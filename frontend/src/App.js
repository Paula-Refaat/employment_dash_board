import {Outlet} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from "./AdminPages/Shared/Header";

function App() {
  return (

    <div className="App">
      <ToastContainer position='bottom-center'/>
      <Header />
      <Outlet/>
      <Header />
      
    </div>

  );
}

export default App;
