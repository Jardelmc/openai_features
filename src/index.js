import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import AudioExtractor from './pages/AudioExtractor';
import ApiKeyModal from './components/ApiKeyModal'
import ChatPage from './pages/ChatPage';
import IntroPage from './pages/IntroPage';
import SectionDivider from './components/SectionDivider';
import FinalPage from './pages/FinalPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">FeMASS - Semana Acadêmica 2023
        <p style={{fontSize: '0.7rem'}}>Jardel Casteluber</p></Navbar.Brand>        
      </Container>
    </Navbar>
    <ApiKeyModal />

    <IntroPage />

    <SectionDivider title="Áudio" />
   
    <Container className="app-container">
      <div id="audioExtractor">
        <AudioExtractor />
      </div>
    </Container>

    <SectionDivider title="Chat" />

    <Container className="app-container">
      <div id="chatPage">
        <ChatPage />
      </div>
    </Container>

    <SectionDivider title="Recursos e Contato" />

    <Container className="app-container">
      <div id="finish">
        <FinalPage />
      </div>
    </Container>    
  </React.StrictMode>,
);

