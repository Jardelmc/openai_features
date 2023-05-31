import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const IntroPage = () => {
  return (
    <Container fluid style={{ backgroundColor: '#f0e4d7', color: '#4f4f4f', minHeight: '100vh', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Row>
        <Col>
          <h1 style={{ marginBottom: '2rem', fontWeight: 'bold' }}>Bem-vindo(a) ao Demonstrativo ChatGPT</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={8} className='mx-auto'>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
            Este aplicativo foi desenvolvido como uma demonstração de duas funcionalidades poderosas proporcionadas pela OpenAI: Extração de Áudio e Chat guiado com o modelo de linguagem GPT-3.5 Turbo.
          </p>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
            A motivação por trás do desenvolvimento deste aplicativo é apresentar estas funcionalidades na Semana Acadêmica 2023 na FeMASS.
          </p>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
            É esperado que este aplicativo forneça uma visão clara do potencial e das capacidades da OpenAI e inspire novas ideias para implementações inovadoras.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default IntroPage;
