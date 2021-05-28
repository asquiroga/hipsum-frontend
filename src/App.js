import logo from './logo.svg';
import './App.css';
import { Button, Card, CardText, CardTitle, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { useEffect, useState } from 'react';

const fetchTasks = async() => {
  const response = await fetch("http://localhost:3050/tasks/3");
  const tasks = await response.json();
  return tasks;
}

const completeTask = async (id) => {
   await fetch( `http://localhost:3050/complete/${id}`, { method: "POST"});
}

function App() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchTasks().then(tasks => {
      setTasks(tasks);
      setLoading(false);
    });
  }, []);

  return (
    <Container>
      <Row>
        <Col xs="12" md="3">Task View</Col>
      </Row>
      
      {loading ? <Row><Col xs="12" md="3">Loading...</Col> </Row> : (
        <Row>
          {tasks.map(task => 
            <Col xs="12" md="3" key={task.id}>
              <Card body>
                <CardTitle tag="h5">Task #{task.id}</CardTitle>
                <CardText>{task.title}
                </CardText>
                <CardText><Button onClick={() => {setOpenModal(true); setSelectedTask(task)}}>View task</Button></CardText>
              </Card>              
            </Col>
          )}
        </Row>
        )
      }

      <Modal isOpen={openModal}>
        <ModalHeader>Task #{selectedTask?.id}</ModalHeader>
        <ModalBody>
        {selectedTask && selectedTask.title}
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={() => completeTask(selectedTask.id)}>Complete!</Button>
          <Button color="primary" onClick={() => {setOpenModal(false)} }>Close</Button>
        </ModalFooter>
      </Modal>      
     </Container>
     );
}

export default App;
