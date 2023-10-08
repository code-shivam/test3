import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component /Login";
import Pagination from "./component /Pagination ";
import { useState } from "react";

const App = () => {
  const [isLogin, setIslogin] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setIslogin={setIslogin}  isLogin={isLogin}/>} />
          {isLogin && <Route path="/list" element={<Pagination setIslogin={setIslogin}/>} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
