import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Spinner, Card, ListGroup } from 'react-bootstrap';
import { BsArrowRightCircle } from 'react-icons/bs';
import axios from 'axios';


const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [basePrompt, setBasePrompt] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handlePromptChange = (event) => {
    setBasePrompt(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let newMessages = [
      ...messages,
      {
        role: 'user',
        content: message,
      },
    ];

    if (basePrompt && newMessages.length < 2) {
      newMessages = [
        {
          role: 'system',
          content: basePrompt,
        },
        ...newMessages,
      ];
    }

    setLoading(true);
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: newMessages,
          temperature: 0.8,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('apiKey')}`
          }
        }
      );

      const { data } = response;
      if (data && data.choices && data.choices.length > 0) {
        newMessages.push({
          role: 'assistant',
          content: data.choices[0].message.content.trim(),
        });
        setMessages(newMessages);
        setMessage('');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPrompt = async () => {
    setIsLoading(true);
    const messages = [
      {
        "role": "system",
        "content": "Você é o ChatGPT, uma IA altamente inteligente e adaptável. Seu objetivo é ajudar a criar um prompt para orientar uma futura conversa. Você vai selecionar aleatoriamente um entre 100 possíveis modelos de negócios. Depois de selecionar, você irá gerar um prompt que descreve um cenário de atendimento ao cliente para esse negócio específico. O prompt deve incluir detalhes sobre o tipo de negócio, as informações que você teria como assistente desse negócio e o objetivo principal de sua função no atendimento ao cliente. Por favor, comece agora."
      }
    ];
  
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
      },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('apiKey')}`
          }
        }
      );
  
      if (response.data && response.data.choices && response.data.choices.length > 0) {
        setBasePrompt(response.data.choices[0].message.content.trim());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <Container style={{ backgroundColor: '#f5f5f5', padding: '20px' }}>

      <Row className="my-4 p-4 bg-light text-center rounded">
        <Col>
          <h1>Chat com o GPT-3.5 Turbo</h1>
          <p>
            Esta aplicação utiliza a API do OpenAI para realizar um chat interativo com o modelo de linguagem GPT-3.5 Turbo. 
            Este chat permite criar uma variedade de conversas baseadas em um prompt inicial. O prompt inicial orienta o modelo
            de linguagem sobre o contexto da conversa. Você pode gerar um novo prompt a qualquer momento clicando no botão 
            "Gerar Prompt". Após gerar o prompt, você pode interagir com o modelo de linguagem digitando suas mensagens e 
            enviando-as através do formulário abaixo.
          </p>
        </Col>
      </Row>

        <Row>
            <Col>
                <Form.Group controlId="basePrompt" className="mt-4">
                <Form.Label>Prompt do Sistema</Form.Label>
                <Form.Control as="textarea" rows={3} value={basePrompt} onChange={handlePromptChange} />
                <Button className="mt-2" variant="primary" onClick={fetchPrompt} disabled={isLoading}>
                    {isLoading ? (
                    <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        <span className="sr-only">Carregando...</span>
                    </>
                    ) : (
                    <>Gerar Prompt</>
                    )}
                </Button>
                </Form.Group>
            </Col>
        </Row>


      <Row className="mt-3">
        <Col>
            <ListGroup variant="flush">
            {messages.map((msg, index) => {
                if(msg.role !== 'system') {
                   return (
                        <ListGroup.Item key={index} className={`${msg.role}-message`}>
                        <Card>
                            <Card.Body>
                            <Card.Text>
                                {msg.content}
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                            {msg.role === 'assistant' ? 'ChatGPT' : 'User'}
                            </Card.Footer>
                        </Card>
                        </ListGroup.Item>
                    )
                }
            })}
            </ListGroup>
        </Col>
    </Row>


      <Row className="mt-3">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="d-flex">
              <Form.Control
                type="text"
                placeholder="Digite sua mensagem"
                value={message}
                onChange={handleChange}
                disabled={loading}
              />
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : <BsArrowRightCircle />}
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
