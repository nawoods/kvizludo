import React, { Component } from 'react';
import {
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormGroup,
  Label
} from 'reactstrap';
import PropTypes from 'prop-types';

class QuestionModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      newQuestion: {}
    }
  }

  propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  onChange = e => {
    this.setState({ newQuestion: {
      ...this.state.newQuestion,
      [e.target.name]: e.target.value 
    }});
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.newQuestion);
    this.toggle();
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  render() {
    return (
      <Container>
        <Button 
          color="dark" 
          style={{marginBottom:'2rem'}}
          onClick={this.toggle}
        >
          Aldoni demandon
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Aldoni demandon</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='questionText'>Demando</Label>
                <Input
                  type='text'
                  name='questionText'
                  id='questionText'
                  onChange={this.onChange}></Input>
              </FormGroup>
              <FormGroup>
                <Label for='correctAnswer'>Ĝusta respondo</Label>
                <Input
                  type='text'
                  name='correctAnswer'
                  id='correctAnswer'
                  onChange={this.onChange}></Input>
              </FormGroup>
              <FormGroup>
                <Label for='incorrectAnswer1'>Malĝustaj respondoj</Label>
                <Input
                  type='text'
                  name='incorrectAnswer1'
                  id='incorrectAnswer1'
                  onChange={this.onChange}></Input>
                </FormGroup>
                <FormGroup>
                <Input
                  type='text'
                  name='incorrectAnswer2'
                  id='incorrectAnswer2'
                  onChange={this.onChange}></Input>
                </FormGroup>
                <FormGroup>
                <Input
                  type='text'
                  name='incorrectAnswer3'
                  id='incorrectAnswer3'
                  onChange={this.onChange}></Input>
              </FormGroup>
              <Button>Aldoni</Button>
            </Form>
          </ModalBody>
        </Modal>
      </Container>

    );
  }

}

export default QuestionModal;