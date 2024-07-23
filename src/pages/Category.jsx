import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap'

import Sidebar from '../components/Sidebar'
import axios from 'axios'
import { BaseUrl } from '../config/baseurl'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IoTrashBin } from 'react-icons/io5'
import { FaEdit } from 'react-icons/fa'

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Name is Required."),
  })
  .required("All field is Required");


export default function Category() {
  const [categoryList, setCategoryList] = useState([])

  const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema)})
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => { 
    getCategoryFunc()

     }, [])
  //add category //
  console.log(categoryList)
  const newCategory = async (data) => {
    try {
      console.log("==============", data);
      const res = await axios.post(`${BaseUrl}/category/createcategory`, data)
     console.log(res)
      if (res.status == 200) {
        handleClose()
      }
    } catch (error) {
      console.log(error.response.data.message)
      return alert(error.response.data.message)

    }
  }

  //  get category // 
  const getCategoryFunc = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/category/allcategory`)
      console.log(response,'======k');
      if (response.status == 200) {
        setCategoryList(response.data.allcategory)
      }
    } catch (error) {
      console.log(error)

    }
  }
  // DELETE CATEGORY BY ID API ///
  const categoryDeleteFunc = async (id) => {
    try {
      const resp = await axios.delete(`${BaseUrl}/category/deleteCategoryById/${id}`)
      if (resp.status == 200) {
        getCategoryFunc()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <h1>Category list</h1>
          <br />
          <div style={{ textAlign: 'right' }}>
            <Button variant='primary' onClick={handleShow} >Add Category</Button>
          </div>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              
              {categoryList.length > 0 ? (categoryList.map((item, index) => (

                <tr>
                  <td>{index + 1}</td>
                  <td>{item?.name}</td>

                  <td>
                    <FaEdit size={25} color='blue' style={{cursor:'pointer'}} />
                    &nbsp;&nbsp;
                    <IoTrashBin size={25} color='red' style={{cursor:'pointer'}} onClick={() => categoryDeleteFunc(item?._id)} />
                  </td>
                </tr>
              ))
              ) : (
              <tr>
                <td>There is no category data</td>
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
              <span style={{ color: "red" }}>{errors.name?.message}</span>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit(newCategory)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

