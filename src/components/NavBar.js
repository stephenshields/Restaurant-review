import React from 'react'
import { Navbar, Col, Row, Container } from 'react-bootstrap'
import Filter from '../components/Filter'

function NavBar(props) {
    return ( 
		<Container
		fluid 
		variant="dark"
		style={{
			backgroundColor: '#21242b',
		}}>
		<Row sm={1} md={2}>
			<Col md={8} sm={6}>
		    	<h3 style={{color: 'white'}} href="#home">Lets Eat</h3>
		    </Col>
		    <Col md={4} sm={6}>
			    <Filter
			    key="1"
			    keyNum="1"
			    setFilter={props.setFilter}
			    >
			    </Filter>
			    <Navbar.Text style={{color: 'gray'}} className="pr-2 pl-2">
			     -
			     </Navbar.Text>
			    <Filter
			    key="2"
			    keyNum="2"
			    setFilter={props.setFilter}>
			    </Filter>
		     </Col>
	     </Row>
	     </Container>
    )
}

export default NavBar;