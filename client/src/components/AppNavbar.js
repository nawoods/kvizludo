import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
import LoginModal from './auth/LoginModal';
import PropTypes from 'prop-types';

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  static propTypes = {
    login: PropTypes.func.isRequired,
    error: PropTypes.string
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">
              Kvizludo
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <LoginModal 
                    onSubmit={this.props.login} 
                    user={this.props.user}
                    error={this.props.error} 
                  />
                </NavItem>
              </Nav>
            </Collapse>
          </Container>

        </Navbar>
      </div>
    );
  }

}

export default AppNavbar;