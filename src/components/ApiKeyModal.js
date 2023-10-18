import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';

const ApiKeyModal = ({ show, onClose }) => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const key = localStorage.getItem('apiKey');
    if (!key) {
      //setShow(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('apiKey', apiKey);
    onClose();
  };

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Informe a sua API Key</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formApiKey">
            <Form.Label>API Key</Form.Label>
            <Form.Control type="text" placeholder="Insira a API Key" onChange={handleApiKeyChange} />
            <Form.Text className="text-muted">
              Acesse <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer">aqui</a> para gerar sua API Key.
            </Form.Text>
          </Form.Group>
          <Alert variant="info">
            <p>
              Este aplicativo pode ser testado sem inserir a API Key. Porém, a API Key default só permite 3 requisições por minuto para todos os usuários que estiverem acessando o aplicativo.
            </p>
          </Alert>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApiKeyModal;
