
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form, Container } from "react-bootstrap";
// import loading from "../../assets/loader.gif";
import "./home.css";
import { addBankAcc, getBankAcc } from "../../utils/ApiRequest";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Spinner";
import TableData from "./TableData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import BarChartIcon from "@mui/icons-material/BarChart";
import Analytics from "./Analytics";

const BankAcc = () => {
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
  const [bankaccounts, setBankaccounts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [view, setView] = useState("table");

  const handleStartChange = (date) => {
    setStartDate(date);
  };

  const handleEndChange = (date) => {
    setEndDate(date);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const avatarFunc = async () => {
      if (localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);

        // if (user.isAvatarImageSet === false || user.avatarImage === "") {
        //   navigate("/setAvatar");
        // }
        setcUser(user);
        setRefresh(true);
      } else {
        navigate("/login");
      }
    };

    avatarFunc();
  }, [navigate]);

  const [values, setValues] = useState({
    bankName: "",
    accNum: "",
    amount: "",
    accType: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeFrequency = (e) => {
    setFrequency(e.target.value);
  };

  const handleSetType = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    const { bankName, accNum, amount, accType } =
      values;

    if (
      !bankName ||
      !accNum ||
      !amount ||
      !accType 
    ) {
      toast.error("Please enter all the fields", toastOptions);
    }
    setLoading(true);

    const { data } = await axios.post(addBankAcc, {
      bankName: bankName,
      accNum: accNum,
      amount: amount,
      accType: accType,
      userId: cUser._id,
    });

    if (data.success === true) {
      toast.success(data.message, toastOptions);
      handleClose();
      setRefresh(!refresh);
    } else {
      toast.error(data.message, toastOptions);
    }

    setLoading(false);
  };

 


  


  useEffect(() => {

    const fetchAllBankAcc = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post(getBankAcc, {
          userId: cUser._id,
          // frequency: frequency,
          // startDate: startDate,
          // endDate: endDate,
          // type: type,
        });
        
        console.log(data.bankAccounts);
        setBankaccounts(data.bankAccounts);
        console.log("BANK ACCOUNTS:",bankaccounts)
        console.log("Bank accounts fetched successfully:", data);
        // setBankaccounts(data);
        setLoading(false);
      } catch (err) {
        // toast.error("Error please Try again...", toastOptions);
        setLoading(false);
      }
    };

    fetchAllBankAcc();
  }, [refresh, frequency, endDate, type, startDate]);

  const handleTableClick = (e) => {
    setView("table");
  };

  const handleChartClick = (e) => {
    setView("chart");
  };

  return (
    <>
      <Header />

      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <Container
            style={{ position: "relative", zIndex: "2 !important" }}
            className="mt-3"
          >
            <div className="filterRow">
              
              
              <div>
                <Button onClick={handleShow} className="addNew" style={{backgroundColor:"transparent",color:"#ffcc00",border: "2px solid white"}}>
                  Add New
                </Button>
                <Button onClick={handleShow} className="mobileBtn">
                  +
                </Button>
                <Modal show={show} onHide={handleClose} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Bank Account Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>bankName</Form.Label>
                        <Form.Control
                          name="bankName"
                          type="text"
                          placeholder="Enter Bank Name"
                          value={values.name}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formAccNumber">
                        <Form.Label>Account Number</Form.Label>
                        <Form.Control
                          name="accNum"
                          type="number"
                          placeholder="Enter your Account Number"
                          value={values.accNum}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formAmount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                          name="amount"
                          type="number"
                          placeholder="Enter your Bank Balance"
                          value={values.amount}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formSelect">
                        <Form.Label>Account Type</Form.Label>
                        <Form.Select
                          name="accType"
                          value={values.accType}
                          onChange={handleChange}
                        >
                          <option value="">Choose...</option>
                          <option value="Savings">Savings</option>
                          <option value="Salary">Salary</option>
                          <option value="Current">Current</option>
                          <option value="Fixed Deposit">Fixed Deposit</option>
                          <option value="Recurring Deposit">Recurring Deposit</option>
                          <option value="Overseas Indians">Overseas Indians</option>
                          <option value="Demat Account">Demat Account</option>
                          <option value="Other">Other</option>
                        </Form.Select>
                      </Form.Group>
                  
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
            <br style={{ color: "white" }}></br>

            {frequency === "custom" ? (
              <>
                <div className="date">
                  <div className="form-group">
                    <label htmlFor="startDate" className="text-white">
                      Start Date:
                    </label>
                    <div>
                      <DatePicker
                        selected={startDate}
                        onChange={handleStartChange}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="endDate" className="text-white">
                      End Date:
                    </label>
                    <div>
                      <DatePicker
                        selected={endDate}
                        onChange={handleEndChange}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            <Analytics bankaccounts={bankaccounts} user={cUser} />
            {/* {view === "table" ? (
              <>
               
                <Analytics bankaccounts={bankaccounts} user={cUser} />
              </>
            ) : (
              <>
                <Analytics bankaccounts={bankaccounts} user={cUser} />
              </>
            )} */}
            <ToastContainer />
          </Container>
        </>
      )}
    </>
  );
};

export default BankAcc;