import React, { Component } from 'react';
import { 
  NavLink, 
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Form,
  Input,
  Label,
  Button,
  Alert
} from 'reactstrap';
import PropTypes from 'prop-types';

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false
    }
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
  }

  componentDidUpdate(prevProps) {
    // toggle modal if user logged in
    if (this.props.user && !prevProps.user) {
      this.toggle();
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.email, this.state.password);
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Ensaluti
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Ensaluti</ModalHeader>
          <ModalBody>
            {
              this.props.error ?
                <Alert color='danger'>{this.props.error}</Alert>
              :
                null
            }
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='email'>Retpoŝto</Label>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Retpoŝto'
                  className='mb-3'
                  onChange={this.onChange}
                />
                <Label for='password'>Pasvorto</Label>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Pasvorto'
                  className='mb-3'
                  onChange={this.onChange}
                />
                <Button color='dark'>Ensaluti</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default LoginModal;