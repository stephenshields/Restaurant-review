import React from 'react'
import {Navbar} from 'react-bootstrap'
import Filter from '../components/Filter'

function NavBar(props) {
	return	(
		<Navbar 
		variant="dark"
		style={{
			backgroundColor: '#21242b',
			padding: '2px'
		}}> 
    <Navbar.Brand style={{paddingLeft: '5px'}} href="#home">Lets Eat</Navbar.Brand>
     <Navbar.Collapse className="justify-content-end mr-3" >
     <Navbar.Text className="pr-3">
     Filter From
     </Navbar.Text>
    <Filter
    key="1"
    keyNum="1"
    setFilter={props.setFilter}
    >
    </Filter>
    <Navbar.Text className="pr-3 pl-3">
     To
     </Navbar.Text>
    <Filter
    key="2"
    keyNum="2"
    setFilter={props.setFilter}>
    </Filter>
     </Navbar.Collapse>
  </Navbar>

	)
}

export default NavBar;