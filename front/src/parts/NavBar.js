import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import SigninModal from './SigninModal.js';

export default props => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
	return <>
		<Navbar color="light" light expand="md">
			<NavbarBrand href="/">webCoder</NavbarBrand>
			<NavbarToggler onClick={toggle} />
			<Collapse isOpen={isOpen} navbar>
				<Nav className="ml-auto" navbar>
					<UncontrolledDropdown nav inNavbar>
						<DropdownToggle nav caret>
							Options
						</DropdownToggle>
						<DropdownMenu right>
							<DropdownItem>
								Option 1
							</DropdownItem>
							<DropdownItem>
								Option 2
							</DropdownItem>
							<DropdownItem divider />
							<DropdownItem>
								Reset
							</DropdownItem>
						</DropdownMenu>
					</UncontrolledDropdown>
					<NavItem>
						<SigninModal
							buttonLabel="Sign in"
							signIn={props.setUser}
						/>
					</NavItem>
				</Nav>
			</Collapse>
		</Navbar>
	</>

}

Navbar.propTypes = {
  light: PropTypes.bool,
  dark: PropTypes.bool,
  fixed: PropTypes.string,
  color: PropTypes.string,
  role: PropTypes.string,
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  // pass in custom element to use
}

NavbarBrand.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  // pass in custom element to use
}