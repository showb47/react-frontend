import React  from 'react';
import { Nav } from 'react-bootstrap';


const Sidebar = ()=> {
  return (
    <div className="sidebar">
      <div className="logo">x</div>
      <Nav defaultActiveKey="/" className="flex-column">
        <Nav.Link href='/'>Dashboard</Nav.Link>
        <Nav.Link href='/admins'>Admin</Nav.Link>
        <Nav.Link href='/users'>User</Nav.Link>
        <Nav.Link href='/categories'>Category</Nav.Link>
        <Nav.Link href="/products">Product</Nav.Link>
        <Nav.Link href='/settings'>Settings</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;