import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const SectionDivider = ({ title }) => (
  <Container>
    <Row className="align-items-center my-5">
      <Col className="col-4">
        <hr />
      </Col>
      <Col className="col-4 text-center">
        <h2 className="display-5">{title}</h2>
      </Col>
      <Col className="col-4">
        <hr />
      </Col>
    </Row>
  </Container>
);

export default SectionDivider;
