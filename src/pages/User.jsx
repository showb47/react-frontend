// import React from 'react'

// export default function User() {
//   return (
//     <div>User</div>
//   )
// }
import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import { IoTrashBin } from 'react-icons/io5'
import { FaEdit } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios'
import { BaseUrl } from '../config/baseurl'
const schema = yup
  .object()
  .shape({
    name: yup.string().required("Name is Required."),
    email: yup.string().required("Email is Required."),
    password: yup.string().required("Password is Required."),
  })
  .required("All field is Required");

export default function User() {
    const [userlist, setUserlist] = useState([])
    
    const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema)})
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getUserFun()
    },[])

    // add user data
    const newUser = async (data) => {
        try {
            const res = await axios.post(`${BaseUrl}/user/signup`, data)
            if (res.status == 200) {
                handleClose()
            }
        } catch (error) {
            console.log(error)
        }
    }

    // get user api
    const getUserFun = async () => {
        try {
            const resp = await axios.get(`${BaseUrl}/user/alluser`)
            console.log(resp);
            if(resp.status == 200){
                setUserlist(resp.data.users)
            }
        } catch (error) {
            console.log(error);
        }
    }

    // delete user by id api
    const userDeleteFun = async (id) => {
        try {
            const resp = await axios.delete(`${BaseUrl}/user/delete${id}`)
            if(resp.status == 200){
                getUserFun()
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container fluid>
            <Row>
                <Col md={2}>
                    <Sidebar />
                </Col>
                <Col md={10}>
                    <h1>User list</h1>
                    <br />
                    <div style={{ textAlign: 'right' }}>
                        <Button variant='primary' onClick={handleShow}>Add User</Button>
                    </div>
                    <br />
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userlist.length > 0 ? (userlist.map((item, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item?.name}</td>
                                    <td>{item?.email}</td>
                                    <td>
                                    <FaEdit size={25} color='blue' style={{cursor:'pointer'}} />
                                    &nbsp;&nbsp;
                                    <IoTrashBin size={25} color='red' style={{cursor:'pointer'}} onClick={() => userDeleteFun(item?._id)} />
                                </td>
                                </tr>
                            ))

                            ) : (
                                <tr>
                                    <td>There is no user data</td>
                                </tr>
                            )}

                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" {...register("name")} />
                            <span style={{color:"red"}}>{errors.name?.message}</span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" {...register("email")} />
                            <span style={{color:"red"}}>{errors.email?.message}</span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" {...register("password")} />
                            <span style={{color:"red"}}>{errors.password?.message}</span>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit(newUser)}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}