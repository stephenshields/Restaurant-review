import React from 'react'
import {Navbar} from 'react-bootstrap'
import Filter from '../components/Filter'

function NavBar() {
	return	(
		<Navbar 
		variant="dark"
		style={{
			backgroundColor: '#21242b',
			padding: '2px'
		}}> 
    <Navbar.Brand style={{paddingLeft: '5px'}} href="#home">Lets Eat</Navbar.Brand>
    <Filter></Filter>
  </Navbar>

	)
}

export default NavBar;