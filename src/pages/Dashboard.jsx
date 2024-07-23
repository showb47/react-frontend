import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/mainContent';
import axios from 'axios';
import { BaseUrl } from '../config/baseurl';


function Dashboard() {
  const [count, setCount] = useState()
  useEffect(() => {
    allData()
  } ,[])

  const allData = async () => {
    try {
        const res = await axios.get(`${BaseUrl}/dashboard`)
        console.log(res)
        if(res.status == 200){
          setCount(res.data.data)
      }
    } catch (error) {
        console.log(error)
    }
}

console.log("==================", count)
  return (
    <Container fluid>
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
      {count && (<MainContent count={count} />)}
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;

