import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
const itemsPerPage = 5;
function Pagination({ setIslogin }) {
  const api = "https://jsonplaceholder.typicode.com/posts";
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const [checkbox, setCheckbox] = useState(false);
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = apiData.slice(startIndex, endIndex);
    setPaginatedData(currentData);
  }, [apiData, currentPage]);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const navigation = useNavigate();
  const apiDatahandel = async () => {
    await axios
      .get(api)
      .then((response) => setApiData(response.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    apiDatahandel();
  }, []);
  console.log(apiData);
  const local = localStorage.getItem("item");
  const logout = (e) => {
    e.preventDefault();
    setIslogin(false);
    localStorage.clear();
    navigation("/");
  };
  return (
    <div className={checkbox ? "DarkMode" : "lightMode"}>
      <p>
        {checkbox ? "Dark Mode" : "Light Mode"}
        <input type="checkbox" onClick={(e) => setCheckbox(!checkbox)} />
      </p>
      <div className="pagination">
        {paginatedData.map((el) => (
          <div key={el.id}>
            <p>{el.title}</p>
          </div>
        ))}
      </div>

      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span> Page {currentPage} </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(apiData.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
      <div>
        <button onClick={(e) => logout(e)}>logout</button>
      </div>
    </div>
  );
}

export default Pagination;
