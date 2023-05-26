import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import AudioExtractor from './pages/AudioExtractor';
import ApiKeyModal from './components/ApiKeyModal'
import ChatPage from './pages/ChatPage';
import IntroPage from './pages/IntroPage';


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
   
    <Container className="app-container">
      <div id="audioExtractor">
        <AudioExtractor />
      </div>
      <div id="chatPage">
        <ChatPage />
      </div>
    </Container>
  </React.StrictMode>,
);

