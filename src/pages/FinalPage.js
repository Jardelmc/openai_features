import React from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

const FinalPage = () => (
  <Container className="my-5">
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <Card>
          <Card.Body>
            <Card.Title className="text-center">
              <h1>Informações para Contato e Recursos</h1>
            </Card.Title>
            <ListGroup variant="flush">
              <ListGroupItem>
                <strong>GitHub:</strong> <a href="https://github.com/Jardelmc" target="_blank" rel="noreferrer">Jardelmc</a>
              </ListGroupItem>
              <ListGroupItem>
                <strong>Repositório do Site:</strong> <a href="https://github.com/Jardelmc/openai_features" target="_blank" rel="noreferrer">openai_features</a>
              </ListGroupItem>
              <ListGroupItem>
                <strong>Repositório do TCC:</strong> <a href="https://github.com/Jardelmc/tcc-kdd-kmeans" target="_blank" rel="noreferrer">tcc-kdd-kmeans</a>
              </ListGroupItem>
              <ListGroupItem>
                <strong>E-mail:</strong> <a href="mailto:jardel.casteluber@gmail.com">jardel.casteluber@gmail.com</a>
              </ListGroupItem>
              <ListGroupItem>
                <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/jardelcasteluber/" target="_blank" rel="noreferrer">jardelcasteluber</a>
              </ListGroupItem>
              <ListGroupItem>
                <strong>Documentação da OpenAI:</strong> <a href="https://platform.openai.com/docs/introduction" target="_blank" rel="noreferrer">OpenAI Docs</a>
              </ListGroupItem>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default FinalPage;
