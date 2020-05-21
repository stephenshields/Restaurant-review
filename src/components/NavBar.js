import React from 'react'
import { Navbar, Col} from 'react-bootstrap'
import Filter from '../components/Filter'

function NavBar(props) {
    return (
        <Navbar 
		variant="dark"
		style={{
			backgroundColor: '#21242b',
		}}> 
		<Col xs={3} >
	    	<Navbar.Brand href="#home">Lets Eat</Navbar.Brand>
	    </Col>
	    <Col xs={9} >
		     <Navbar.Collapse className="justify-content-end" >
			    <Filter
			    key="1"
			    keyNum="1"
			    setFilter={props.setFilter}
			    >
			    </Filter>
			    <Navbar.Text className="pr-2 pl-2">
			     -
			     </Navbar.Text>
			    <Filter
			    key="2"
			    keyNum="2"
			    setFilter={props.setFilter}>
			    </Filter>
		     </Navbar.Collapse>
	     </Col>
  </Navbar>

    )
}

export default NavBar;