import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

function Pagination({setIslogin}) {
  const api = "https://jsonplaceholder.typicode.com/posts/1/comments";
  const [apiData, setApiData] = useState([]);
  const [checkbox, setCheckbox] = useState(false);
  const [pagination, setPagination] = useState(false);
const navigation =useNavigate()
  const apiDatahandel = async () => {
    await axios
      .get(api)
      .then((response) => setApiData(response.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    apiDatahandel();
  }, []);

  const listview = () => {
    if (apiData) {
      setPagination(!pagination);
    }
  };
  const local = localStorage.getItem("item");
 const logout=(e)=>{
    e.preventDefault()
    setIslogin(false)
    localStorage.clear()
 navigation("/")
 }
  return (
    <div className={checkbox ? "DarkMode" : "lightMode"}>
      <p>
        {checkbox ? "Dark Mode" : "Light Mode"}
        <input type="checkbox" onClick={(e) => setCheckbox(!checkbox)} />
      </p>
      <button onClick={() => listview()}>pagination list</button>
      <div>
        {pagination ? (
          <div className="pagination">
            {apiData.map((el) => (
              <div key={el.id}>
                <p>{el.email}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>click button to see the pagination </div>
        )}
        <button onClick={(e)=>logout(e)}>logout</button>
      </div>
    </div>
  );
}

export default Pagination;
