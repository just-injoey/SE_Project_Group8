

import React from "react";
import { useEffect, useState } from "react";
// import CardBox from "./CardBox";
import { Container, Row } from "react-bootstrap";
import CircularProgressBar from "../../components/CircularProgressBar";
import LineProgressBar from "../../components/LineProgressBar";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

// import { Row, Col, Card, Typography, Button, Statistic, Space } from 'antd';
import {
  DollarCircleOutlined,
  BankOutlined,
  FileTextOutlined,
  AlertOutlined,
} from '@ant-design/icons'
import { useNavigate } from "react-router-dom";

// import MovingIcon from '@mui/icons-material/Moving';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const RupeeCircleOutlined = () => (
  <div style={{ fontSize: 24, textAlign: 'center', lineHeight: '24px', width: 30, height: 30, borderRadius: '50%', backgroundColor: '#fff', color: '#000', border: '1px solid #000'  }}>
    ₹
  </div>
);
  
const Analytics = ({ bankaccounts }) => {
  const navigate = useNavigate();
  // if(bankaccounts.name){
  //   console.log("Inside analytics of bankaccounts & data is:", bankaccounts.name);
  // }
  // else{
  //   console.log("Inside analytics of bankaccounts & no data present")
  // }
  useEffect(() => {
    if (bankaccounts && bankaccounts.length > 0) {
      console.log("Inside analytics of bankaccounts, data is present:", bankaccounts);
    } else {
      console.log("Inside analytics of bankaccounts, no data present");
    }
  }, [bankaccounts]);
  // const TotalBankaccounts = bankaccounts.length;
  // console.log("number of bankaccounts:", TotalBankaccounts);
  // const totalIncomeTransactions = transactions.filter(
  //   (item) => item.transactionType === "credit"
  // );
  // const totalExpenseTransactions = transactions.filter(
  //   (item) => item.transactionType === "expense"
  // );

  // let totalIncomePercent =
  //   (totalIncomeTransactions.length / TotalTransactions) * 100;
  // let totalExpensePercent =
  //   (totalExpenseTransactions.length / TotalTransactions) * 100;

  // // console.log(totalIncomePercent, totalExpensePercent);

  // const totalTurnOver = transactions.reduce(
  //   (acc, transaction) => acc + transaction.amount,
  //   0
  // );
  // const totalTurnOverIncome = transactions
  //   .filter((item) => item.transactionType === "credit")
  //   .reduce((acc, transaction) => acc + transaction.amount, 0);
  // const totalTurnOverExpense = transactions
  //   .filter((item) => item.transactionType === "expense")
  //   .reduce((acc, transaction) => acc + transaction.amount, 0);

  // const TurnOverIncomePercent = (totalTurnOverIncome / totalTurnOver) * 100;
  // const TurnOverExpensePercent = (totalTurnOverExpense / totalTurnOver) * 100;

  
  

  return (
    <>
      <Container className="mt-5 ">
        <Row>
        {bankaccounts.map((item, index) => (
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-header bg-white text-black">
                <span style={{ fontWeight: "bold" }}>
                <BankOutlined/> {item.bankName}
                </span>{" "}
               
              </div>
              <div className="card-body">
              <h5 className="card-title" style={{color: "grey"}}>
                  Account No.: {item.accNum}
                </h5>
                <h5 className="card-title" style={{color: "grey"}}>
                  Type: {item.accType}
                </h5>

                <div className="d-flex justify-content-left mt-3 ">
                <RupeeCircleOutlined/>
                  <h5 className="card-title" style={{color: "green"}}>
                     {item.amount}                  
                  </h5>
                  
                </div>

              </div>
            </div>
          </div>
        ))}
        </Row>
      </Container>
        
      
    </>
  );
};

export default Analytics;
