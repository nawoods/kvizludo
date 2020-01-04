import React, { Component } from 'react';
import { Container, ListGroupItem, Button, Table } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class QuestionList extends Component {
  constructor(props) {
    super(props);

    this.state = { questions: [] };
    this.fetchQuestions();
  }

  fetchQuestions = () => {
    fetch('/api/questions')
      .then(res => res.json())
      .then(questions => {
        this.setState(state => ({
          ...state,
          questions
        }));
      });
  };

  addQuestion = () => {
    const newQuestion = {
      questionText: prompt('Demando'),
      correctAnswer: prompt('Ĝusta respondo'),
      incorrectAnswer1: prompt('Malĝusta respondo 1'),
      incorrectAnswer2: prompt('Malĝusta respondo 2'),
      incorrectAnswer3: prompt('Malĝusta respondo 3')
    };

    if (!newQuestion) return;

    fetch('/api/questions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newQuestion)
    })
      .then(res => res.json())
      .then(res => {
        this.setState(state => ({
          questions: [...state.questions, res]
        }));
      });
  };

  removeQuestion = id => {
    fetch(`/api/questions/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(res => {
        if (!res.success) return;

        this.setState(state => ({
          questions: state.questions.filter(question => question._id !== id)
        }));
      });
  };

  render() {
    const { questions } = this.state;
    return(
      <Container>
        <Button 
          color="dark" 
          style={{marginBottom:'2rem'}}
          onClick={this.addQuestion}
        >
          Aldoni demandon
        </Button>
        <TransitionGroup className="question-list">
          {questions.map((question) => (
            <CSSTransition key={question._id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={() => this.removeQuestion(question._id)}
                >&times;</Button>
                {question.questionText}
                <Table borderless size="sm">
                  <tbody>
                    <tr>
                      <th scope="row">Ĝusta</th>
                      <td>{question.correctAnswer}</td>
                    </tr>
                    <tr>
                      <th scope="row">Malĝusta</th>
                      <td>{question.incorrectAnswer1}</td>
                    </tr>
                    <tr>
                      <th scope="row">Malĝusta</th>
                      <td>{question.incorrectAnswer2}</td>
                    </tr>
                    <tr>
                      <th scope="row">Malĝusta</th>
                      <td>{question.incorrectAnswer3}</td>
                    </tr>
                  </tbody>
                </Table>
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Container>
    )
  }

}

export default QuestionList;