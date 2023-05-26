import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from '../components/Dropzone';
import { Container, Button, Alert, Row, Col } from 'react-bootstrap';

const AudioExtractor = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');

  const extractText = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('model', 'whisper-1');

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('apiKey') || process.env.REACT_APP_OPENAI_API_KEY}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, config);
      setText(response.data.text);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Row className="my-4 p-4 bg-light text-center rounded">
        <Col>
          <h1>Extrair Texto de Áudio</h1>
          <br />
          <p>
            Esta aplicação utiliza a API do OpenAI para extrair texto de arquivos de áudio. O modelo usado para esta tarefa é o Whisper, 
            um ASR (Automatic Speech Recognition) treinado em 680,000 horas de dados multilíngues e multitarefas. O Whisper é capaz de
            transcrever áudio para texto com alta precisão, facilitando a transformação de informações faladas em texto escrito.
          </p>
        </Col>
      </Row>

      <Dropzone setFile={setFile} />

      <p className="text-center mt-3">
        Clique no box acima para escolher um arquivo de áudio ou arraste e solte o arquivo no box. 
        Após a seleção do arquivo, clique no botão "Extrair texto" para iniciar a extração do texto.
      </p>

      {file && (
        <Button className="mt-3" variant="primary" onClick={extractText}>Extrair texto</Button>
      )}

      {text && (
        <Alert variant="success" className="mt-3">
          <Alert.Heading>Texto extraído:</Alert.Heading>
          <p>{text}</p>
        </Alert>
      )}
    </Container>
  );
};

export default AudioExtractor;
