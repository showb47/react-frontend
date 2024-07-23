import React from 'react';
import Table from 'react-bootstrap/Table';
import { Container, Row, Col, Card, } from 'react-bootstrap';

const MainContent = (props) => {

const {count} = props
console.log(count,"=================iii")
const {admins, users, products, categories} = count
console.log(props, "==================")
  return (
    <Container fluid>
<h1> Admin Dashboard</h1>
 

<div  style={{
  display:'flex',
  justifyContent:'space-around'
}}>
            <div  className='box' style={{
                  width:"16rem",
                  height:'10rem',
                  border:'1px solid black',
                  borderRadius:'10px'
              }}>  <h3>Total Admin</h3>
              <h1>{admins}</h1>
              
             
              </div>
              <div className='box' style={{
                  width:"16rem",
                  height:'10rem',
                  border:'1px solid black',
                  borderRadius:'10px'
              }}> <h3>Total User</h3>
              <h1>{users}</h1>
               </div>
              <div className='box' style={{
                  width:"16rem",
                  height:'10rem',
                  border:'1px solid black',
                  borderRadius:'10px'
              }}> <h3>Total Category</h3>
              <h1>
                
                 {categories}</h1>
               </div>
              
              <div className='box' style={{
                  width:"16rem",
                  height:'10rem',
                  border:'1px solid black',
                  borderRadius:'10px'
              }}> <h3>Total Product</h3>
                  <h1>    {products}</h1>
                </div></div>
            
           

        
        

   


      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
        <Card.Title>Dashboard</Card.Title>
             

              <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MainContent;


