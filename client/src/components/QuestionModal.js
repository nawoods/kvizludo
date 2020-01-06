import React, { Component, Fragment } from 'react';
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
      newQuestion: this.props.existingQuestion ? this.props.existingQuestion : {}
    }
  }

  propTypes = {
    onSubmit: PropTypes.func.isRequired,
    existingQuestion: PropTypes.object
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

  questionModalInput = fieldName => (
    <Input
      type='text'
      name={fieldName}
      id={fieldName}
      placeholder={this.props.existingQuestion ?
        this.props.existingQuestion[fieldName]
        : ''}
      onChange={this.onChange}></Input>
  )

  render() {
    return (
      <Fragment>
        { this.props.existingQuestion ?
          <Button
            className="edit-btn"
            color="warning"
            size="sm"
            onClick={this.toggle}
          >🖊️</Button>
        :
          <Button 
            color="dark" 
            style={{marginBottom:'2rem'}}
            onClick={this.toggle}
          >
            Aldoni demandon
          </Button>
        }
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Aldoni demandon</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='questionText'>Demando</Label>
                {this.questionModalInput('questionText')}
              </FormGroup>
              <FormGroup>
                <Label for='correctAnswer'>Ĝusta respondo</Label>
                {this.questionModalInput('correctAnswer')}
              </FormGroup>
              <FormGroup>
                <Label for='incorrectAnswer1'>Malĝustaj respondoj</Label>
                {this.questionModalInput('incorrectAnswer1')}
              </FormGroup>
              <FormGroup>
                {this.questionModalInput('incorrectAnswer2')}
              </FormGroup>
              <FormGroup>
                {this.questionModalInput('incorrectAnswer3')}
              </FormGroup>
              <Button color="dark">
                {this.props.existingQuestion ? `Modifi` : `Aldoni`}
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>

    );
  }

}

export default QuestionModal;