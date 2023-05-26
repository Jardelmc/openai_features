import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const ApiKeyModal = () => {
  const [show, setShow] = useState(false);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const key = localStorage.getItem('apiKey');
    if (!key) {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('apiKey', apiKey);
    setShow(false);
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
          </Form.Group>
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
