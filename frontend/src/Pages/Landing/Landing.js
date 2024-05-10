import React, { useEffect, useState,Helmet } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
// import loading from "../../assets/loader.gif";
import "./landing.css";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Spinner";


const Landing = () => {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  const [cUser, setcUser] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [view, setView] = useState("table");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Header />

      {loading ? (
        <>
          <Spinner />
        </>
      ):( 
      <>
      <div style={{marginTop:"50px"}}></div>
      <h2 style={{ position: "relative", zIndex: "2 !important", display: "flex",padding:"10px", fontSize:"45px", textAlign: "center", justifyContent:"center", color:"#ffcc10"}}
            className="mt-3" >
              Manage your expenses
      </h2>
      <h2 style={{ position: "relative", zIndex: "2 !important", display: "flex", padding:"10px",fontSize:"45px", textAlign: "center", justifyContent:"center", color:"#ffcc10"}}
            className="mt-3" >
              Track your finances
      </h2>
      <h2 style={{ position: "relative", zIndex: "2 !important", display: "flex", fontSize:"45px", textAlign: "center", justifyContent:"center", color:"#ffcc10"}}
            className="mt-3" >
              Analyse your behaviour
      </h2>
      <h2 style={{ position: "relative", zIndex: "2 !important", display: "flex",padding:"10px", fontSize:"45px", textAlign: "center", justifyContent:"center", color:"#ffcc10"}}
            className="mt-3" >
              Chat with an expert-AI
      </h2>
      <h2 style={{ position: "relative", zIndex: "2 !important", display: "flex", padding:"10px",fontSize:"45px", textAlign: "center", justifyContent:"center", color:"#ffcc10"}}
            className="mt-3" >
              Visualise and understand
      </h2>

      </>
      )
      }
    </>
  );

};

export default Landing;