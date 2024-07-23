import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap'
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

export default function Admin() {
    const [adminlist, setAdminlist] = useState([])
    
    const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema)})
    const [show, setShow] = useState(false);
    const [editAdminId, setEditAdminId] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    

    useEffect(() => {
        getAdminFun()
    },[])

    // add admin data
    const newAdmin = async (data) => {
        try {
            const res = await axios.post(`${BaseUrl}/admin/signup`, data)
            if (res.status == 200) {
                handleClose()
            }
        } catch (error) {
            console.log(error)
        }
    }

    // get admin api
    const getAdminFun = async () => {
        try {
            const resp = await axios.get(`${BaseUrl}/admin/alladmin`)
            console.log(resp,'=================w');
            if(resp.status == 200){
                setAdminlist(resp.data.admins)
            }
        } catch (error) {
            console.log(error);
        }
    }

    // delete admin by id api
    const adminDeleteFun = async (id) => {
        try {
            const resp = await axios.delete(`${BaseUrl}/admin/delete/${id}`)
            if(resp.status == 200){
                getAdminFun()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleCloseEditModal = () => {
        setShow(false);
        setEditAdminId(null); // Clear edit admin ID
      }

    ///edit admin
    const handleShowEditModal = (adminId) => {
        setShow(true);
        setEditAdminId(adminId);
        // Populate edit form fields with existing data of the admin to edit
        const adminToEdit = adminlist.find(admin => admin._id === adminId);
        reset({
          name: adminToEdit.name,
          email: adminToEdit.email,
          password: adminToEdit.password,
        });
      }

    ///upadate admin 
    const updateAdmin = async (data) => {
        try {
          const res = await axios.put(`${BaseUrl}/admin/update/${editAdminId}`, data);
          if (res.status === 200) {
            // handleCloseEditModal();
            handleClose()
            getAdminFun(); // Refresh admin list after updating admin
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
                    <h1>Admin list</h1>
                    <br />
                    <div style={{ textAlign: 'right' }}>
                        <Button variant='primary' onClick={handleShow}>Add Admin</Button>
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
                            {adminlist.length > 0 ? (adminlist.map((item, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item?.name}</td>
                                    <td>{item?.email}</td>
                                    <td>
                                    <FaEdit size={25} style={{cursor:'pointer'}} color='blue' onClick={() => handleShowEditModal(item?._id)} />
                                    &nbsp;&nbsp;
                                    <IoTrashBin size={25} style={{cursor:'pointer'}} color='red'  onClick={() => adminDeleteFun(item?._id)} />
                                </td>
                                </tr>
                            ))

                            ) : (
                                <tr>
                                    <td>There is no admin data</td>
                                </tr>
                            )}

                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Admin</Modal.Title>
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
                    <Button variant="primary" onClick={handleSubmit(newAdmin)}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

             {/* Edit Admin Modal */}
      <Modal show={show} onHide={handleCloseEditModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(updateAdmin)}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" {...register("name")} />
              <span style={{ color: "red" }}>{errors.name?.message}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" {...register("email")} />
              <span style={{ color: "red" }}>{errors.email?.message}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" {...register("password")} />
              <span style={{ color: "red" }}>{errors.password?.message}</span>
            </Form.Group>

            <Button variant="secondary" onClick={handleCloseEditModal}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleSubmit(updateAdmin)}>
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
        </Container>
    )
}
