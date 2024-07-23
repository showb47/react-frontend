
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
    price: yup.number().required("Price is Required."),
    rating: yup.number().required("Rating is Required."),
    category: yup.string().required("Category is Required."),
    description: yup.string().required("Description is Required."),
  })
  .required("All field is Required");

export default function Product() {
    const [productlist, setProductlist] = useState([])
    
    const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema)})
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getProductFun()
    },[])

    // add product data
    const newProduct = async (data) => {
        try {
            const res = await axios.post(`${BaseUrl}/product/createproduct`, data)
            if (res.status == 200) {
                handleClose()
            }
        } catch (error) {
            console.log(error)
        }
    }

    // get product api
    const getProductFun = async () => {
        try {
            const resp = await axios.get(`${BaseUrl}/product/allproduct`)
            console.log(resp);
            if(resp.status == 200){
                setProductlist(resp.data.product)
            }
        } catch (error) {
            console.log(error);
        }
    }

    // delete product by id api
    const productDeleteFun = async (id) => {
        try {
            const resp = await axios.delete(`${BaseUrl}/product/deleteproduct/${id}`)
            if(resp.status == 200){
                getProductFun()
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
                    <h1>Product list</h1>
                    <br />
                    <div style={{ textAlign: 'right' }}>
                        <Button variant='primary'  onClick={handleShow}>Add Product</Button>
                    </div>
                    <br />
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Rating</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productlist.length > 0 ? (productlist.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <img src={item?.imageUrl} style={{height:'80px',width:'120px'}}  alt="mountain" />
                                    {/* <td>{item?.imageUrl}</td> */}
                                    <td>{item?.name}</td>
                                    <td>{item?.price}</td>
                                    <td>{item?.description}</td>
                                    <td>{item?.category}</td>
                                    <td>{item?.rating}</td>
                                    <td>
                                    <FaEdit size={25} color='blue' style={{cursor:'pointer'}} />
                                    &nbsp;&nbsp;
                                    <IoTrashBin size={25} color='red' style={{cursor:'pointer'}} onClick={() => productDeleteFun(item?._id)} />
                                </td>
                                </tr>
                            ))

                            ) : (
                                <tr>
                                    <td>There is no product data</td>
                                </tr>
                            )}

                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>ImageUrl</Form.Label>
                            <Form.Control type="image" placeholder="Enter imageurl" {...register("imageurl")} />
                            <span style={{color:"red"}}>{errors.name?.message}</span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Enter name" {...register("name")} />
                            <span style={{color:"red"}}>{errors.email?.message}</span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="Enter price" {...register("price")} />
                            <span style={{color:"red"}}>{errors.password?.message}</span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter description" {...register("description")} />
                            <span style={{color:"red"}}>{errors.password?.message}</span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" placeholder="Enter category" {...register("category")} />
                            <span style={{color:"red"}}>{errors.password?.message}</span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control type="number" placeholder="Enter rating" {...register("rating")} />
                            <span style={{color:"red"}}>{errors.password?.message}</span>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit(newProduct)}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}