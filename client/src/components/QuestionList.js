import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Table } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';

class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        { 
          id: uuid(),
          questionText: 'En kiu lando estas Seatlo?',
          correctAnswer: 'Usono',
          incorrectAnswer1: 'Kanado',
          incorrectAnswer2: 'Meksiko',
          incorrectAnswer3: 'Svedio'
        },
        { 
          id: uuid(),
          questionText: 'Kia besto estas Galojo?',
          correctAnswer: 'Kato',
          incorrectAnswer1: 'Hundo',
          incorrectAnswer2: 'Testudo',
          incorrectAnswer3: 'Serpento'
        },
        { 
          id: uuid(),
          questionText: 'Kiu estas la ĉefurbo de Kanado?',
          correctAnswer: 'Otavo',
          incorrectAnswer1: 'Toronto',
          incorrectAnswer2: 'Vankuvero',
          incorrectAnswer3: 'Montrealo'
        }
      ]
    }
  }

  addQuestion = () => {
    const questionText = prompt('Demando');
    const correctAnswer = prompt('Ĝusta respondo');
    const incorrectAnswer1 = prompt('Malĝusta respondo 1');
    const incorrectAnswer2 = prompt('Malĝusta respondo 2');
    const incorrectAnswer3 = prompt('Malĝusta respondo 3');
    if (questionText && correctAnswer && incorrectAnswer1 &&
                        incorrectAnswer2 && incorrectAnswer3) {
      this.setState(state => ({
        questions: [...state.questions, {
          id: uuid(),
          questionText,
          correctAnswer,
          incorrectAnswer1,
          incorrectAnswer2,
          incorrectAnswer3
        }]
      }))
    }
  }

  removeQuestion = id => {
    this.setState(state => ({
      questions: state.questions.filter(question => question.id !== id)
    }));
  }

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
            <CSSTransition key={question.id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={() => this.removeQuestion(question.id)}
                >&times;</Button>
                {question.questionText}
                <Table borderless size="sm">
                  <tbody>
                    <th scope="row">Ĝusta</th>
                    <td>{question.correctAnswer}</td>
                  </tbody>
                  <tbody>
                    <th scope="row">Malĝusta</th>
                    <td>{question.incorrectAnswer1}</td>
                  </tbody>
                  <tbody>
                    <th scope="row">Malĝusta</th>
                    <td>{question.incorrectAnswer2}</td>
                  </tbody>
                  <tbody>
                    <th scope="row">Malĝusta</th>
                    <td>{question.incorrectAnswer3}</td>
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