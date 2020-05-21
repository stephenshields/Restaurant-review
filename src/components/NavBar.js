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
     <Navbar.Text className="pr-2">
     Filter By Rating
     </Navbar.Text>
    <Filter setFilter={props.setFilter}></Filter>
     </Navbar.Collapse>
  </Navbar>

	)
}

export default NavBar;