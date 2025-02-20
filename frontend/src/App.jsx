import React from "react";
import {BrowserRouter  as Router,Routes,Route} from "react-router-dom"
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import AuthLayout from "./layout/AuthLayout";
import Signup from "./pages/signup";
const App=()=>{
  return (
    <div className="">
      <Router>
        <Routes>
            <Route path="/" element={<MainLayout/>}>
              {" "}
              <Route index element={<Home/>}/>
            </Route>
            <Route path="/" element={<AuthLayout/>}>
                <Route path="/signup" element={<Signup/>}/>
            </Route>
        </Routes>
      </Router>
    </div>
  )
};

export default App;