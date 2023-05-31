import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const QuestionModal = ({ show, handleClose, text, apiKey }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    setLoading(true);
    const newMessages = [
      {
        role: 'system',
        content: `Analise o texto: ${text}.\nO usuário está fazendo uma pergunta. Responda de acordo com o que tiver no texto acima `,
      },
      {
        role: 'user',
        content: question,
      },
    ];

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: newMessages,
          temperature: 0.8,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      );

      const { data } = response;
      if (data && data.choices && data.choices.length > 0) {
        setAnswer(data.choices[0].message.content.trim());
      }
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro :(');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Faça uma pergunta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          as="textarea"
          rows={3}
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Digite sua pergunta aqui..."
        />
        {answer && <p><strong>Resposta:</strong> {answer}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={askQuestion} disabled={loading}>
          {loading ? 'Carregando...' : 'Perguntar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuestionModal;
