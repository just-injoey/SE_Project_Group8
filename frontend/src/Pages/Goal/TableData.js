import React, { useEffect, useState } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import moment from "moment";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./goal.css";
import { deleteGoals, editGoals } from "../../utils/ApiRequest";
import axios from "axios";
// import { set } from "mongoose";

const TableData = (props) => {
  const [show, setShow] = useState(false);
  const [goals, setGoals] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [currId, setCurrId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState(null);

  const handleEditClick = (itemKey) => {
    // const buttonId = e.target.id;
    console.log("Clicked button ID:", itemKey);
    if (goals.length > 0) {
      const editTran = props.data.filter((item) => item._id === itemKey);
      setCurrId(itemKey);
      setEditingGoal(editTran);
      handleShow();
    }
  };

  const handleEditSubmit = async (e) => {
    // e.preventDefault();

    const {data} = await axios.put(`${editGoals}/${currId}`, {
      ...values,
    });

    if(data.success === true){

      await handleClose();
      await setRefresh(!refresh);
      window.location.reload();
    }
    else{
      console.log("error");
    }

  }

  const handleDeleteClick = async (itemKey) => {
    console.log(user._id);
    console.log("Clicked button ID delete:", itemKey);
    setCurrId(itemKey);
    const {data} = await axios.post(`${deleteGoals}/${itemKey}`,{
      userId: props.user._id,
    });

    if(data.success === true){
      await setRefresh(!refresh);
      window.location.reload();
    }
    else{
      console.log("error");
    }

  };

  const [values, setValues] = useState({
    goal: "",
    amount: "",
    description: "",
    category: "",
    targetdate: "",
    goalType: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    setUser(props.user);
    setGoals(props.data);
  }, [props.data,props.user, refresh]);

  return (
    <>
      <Container>
        <Table responsive="md" className="data-table">
          <thead>
            <tr>
              <th>Target Date</th>
              <th>Goal</th>
              <th>Amount</th>
              <th>Goal Type</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {props.data.map((item, index) => (
              <tr key={index}>
                <td>{moment(item.targetdate).format("YYYY-MM-DD")}</td>
                <td>{item.goal}</td>
                <td>{item.amount}</td>
                <td>{item.goalType}</td>
                <td>{item.category}</td>
                <td>
                  <div className="icons-handle">
                    <EditNoteIcon
                      sx={{ cursor: "pointer" }}
                      key={item._id}
                      id={item._id}
                      onClick={() => handleEditClick(item._id)}
                    />

                    <DeleteForeverIcon
                      sx={{ color: "red", cursor: "pointer" }}
                      key={index}
                      id={item._id}
                      onClick={() => handleDeleteClick(item._id)}
                    />

                    {editingGoal ? (
                      <>
                        <div>
                          <Modal show={show} onHide={handleClose} centered>
                            <Modal.Header closeButton>
                              <Modal.Title>
                                Update Goals
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Form onSubmit={handleEditSubmit}>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formName"
                                >
                                  <Form.Label>Goal</Form.Label>
                                  <Form.Control
                                    name="goal"
                                    type="text"
                                    placeholder={editingGoal[0].goal}
                                    value={values.goal}
                                    onChange={handleChange}
                                  />
                                </Form.Group>

                                <Form.Group
                                  className="mb-3"
                                  controlId="formAmount"
                                >
                                  <Form.Label>Amount</Form.Label>
                                  <Form.Control
                                    name="amount"
                                    type="number"
                                    placeholder={editingGoal[0].amount}
                                    value={values.amount}
                                    onChange={handleChange}
                                  />
                                </Form.Group>

                                <Form.Group
                                  className="mb-3"
                                  controlId="formSelect"
                                >
                                  <Form.Label>Category</Form.Label>
                                  <Form.Select
                                    name="category"
                                    value={values.category}
                                    onChange={handleChange}
                                  >
                                    <option value="Groceries">Groceries</option>
                                    <option value="Rent">Rent</option>
                                    <option value="Salary">Salary</option>
                                    <option value="Tip">Tip</option>
                                    <option value="Food">Food</option>
                                    <option value="Medical">Medical</option>
                                    <option value="Utilities">Utilities</option>
                                    <option value="Entertainment">
                                      Entertainment
                                    </option>
                                    <option value="Transportation">
                                      Transportation
                                    </option>
                                    <option value="Other">Other</option>
                                  </Form.Select>
                                </Form.Group>

                                <Form.Group
                                  className="mb-3"
                                  controlId="formDescription"
                                >
                                  <Form.Label>Description</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="description"
                                    placeholder={editingGoal[0].description}
                                    value={values.description}
                                    onChange={handleChange}
                                  />
                                </Form.Group>

                                <Form.Group
                                  className="mb-3"
                                  controlId="formSelect1"
                                >
                                  <Form.Label>Goal Type</Form.Label>
                                  <Form.Select
                                    name="goalType"
                                    value={values.goalType}
                                    onChange={handleChange}
                                  >
                                    <option value="Credit">credit</option>
                                    <option value="Expense">expense</option>
                                  </Form.Select>
                                </Form.Group>

                                <Form.Group
                                  className="mb-3"
                                  controlId="formDate"
                                >
                                  <Form.Label>Target Date</Form.Label>
                                  <Form.Control
                                    type="date"
                                    name="targetdate"
                                    value={values.targetdate}
                                    onChange={handleChange}
                                  />
                                </Form.Group>
                              </Form>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Close
                              </Button>
                              <Button variant="primary" type="submit" onClick={handleEditSubmit}>Submit</Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default TableData;