import React from 'react'
import PropTypes from 'prop-types';
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, FormInline, Dropdown, DropdownToggle, DropdownMenu,  DropdownItem } from "mdbreact";



class Nav extends React.Component{
constructor(){
    super();
    this.state = {
        isOpen: false
    }

    this.toggleCollapse = this.toggleCollapse.bind(this)

}

  toggleCollapse(){
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (

      <Navbar color="indigo" dark expand="md">
          <NavbarBrand>
            <a href='/'><strong className="white-text">Navbar</strong></a>
          </NavbarBrand>
          <NavbarToggler
            onClick={this.toggleCollapse}
          />

          <Collapse
            id="navbarCollapse3"
            isOpen={this.state.isOpen}
            navbar
          >
            <NavbarNav right>
              <NavItem>
                <NavLink to="/investments">Invest</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/transactions">Track</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/transactions">Transactions</NavLink>
              </NavItem>
              <NavItem>
                <Dropdown>
                  <DropdownToggle nav caret>
                    <div className="d-none d-md-inline">Profile</div>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem href="/accounts">Accounts</DropdownItem>
                    <DropdownItem href="/users/sign_out">Logout</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavItem>
            </NavbarNav>

          </Collapse>
      </Navbar>
    );
  }
}

export default Nav;