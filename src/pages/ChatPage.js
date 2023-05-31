import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Spinner,
  Card,
  ListGroup,
  Alert,
} from "react-bootstrap";
import { BsArrowRightCircle } from "react-icons/bs";
import axios from "axios";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [basePrompt, setBasePrompt] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handlePromptChange = (event) => {
    setBasePrompt(event.target.value);
  };

  const handleSubmit = async (event) => {
    if (!message || message === "") return;
    event.preventDefault();

    let newMessages = [
      ...messages,
      {
        role: "user",
        content: message,
      },
    ];

    if (basePrompt && newMessages.length < 2) {
      newMessages = [
        {
          role: "system",
          content: basePrompt,
        },
        ...newMessages,
      ];
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: newMessages,
          temperature: 0.8,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              localStorage.getItem("apiKey") ||
              process.env.REACT_APP_OPENAI_API_KEY
            }`,
          },
        }
      );

      const { data } = response;
      if (data && data.choices && data.choices.length > 0) {
        newMessages.push({
          role: "assistant",
          content: data.choices[0].message.content.trim(),
        });
        setMessages(newMessages);
        setMessage("");
      }
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro :(");
    } finally {
      setLoading(false);
    }
  };

  const businessPrompts = [
    {
      name: "Livraria",
      prompt:
        "Atue como atendente da Livraria 'Literatura ao seu Alcance'. Seu objetivo é auxiliar os clientes a encontrar os livros que desejam, conforme o catálogo abaixo: \nCatálogo: 'A Última Folha': R$35,00 | 'Caminho Suave': R$45,00 | 'Cidade dos Sonhos': R$28,00 | 'O Último dos Moicanos': R$30,00",
    },
    {
      name: "Loja de roupas",
      prompt:
        "Atue como vendedor na loja de roupas 'Moda e Estilo'. Seu objetivo é ajudar os clientes a escolherem as roupas que mais combinam com eles, conforme o catálogo abaixo: \nCatálogo: Camiseta Polo: R$75,00 | Calça Jeans: R$120,00 | Blusa de Seda: R$85,00 | Vestido Floral: R$200,00",
    },
    {
      name: "Floricultura",
      prompt:
        "Atue como atendente na Floricultura 'Flor do Campo'. Seu objetivo é ajudar os clientes a escolherem as flores e arranjos ideais para cada ocasião, conforme o catálogo abaixo: \nCatálogo: Rosas Vermelhas (dúzia): R$30,00 | Orquídea: R$45,00 | Girassol (unidade): R$10,00 | Arranjo de Flores do Campo: R$70,00",
    },
    {
      name: "Concessionária de carros",
      prompt:
        "Atue como vendedor na Concessionária de Carros 'Velocidade Máxima'. Seu objetivo é auxiliar os clientes na escolha do carro que melhor atende às suas necessidades, conforme o catálogo abaixo: \nCatálogo: Sedan Luxo (Modelo 2023): R$120.000,00 | SUV Família (Modelo 2023): R$90.000,00 | Esportivo Compacto (Modelo 2023): R$80.000,00 | Pick-up Robusta (Modelo 2023): R$140.000,00",
    },
    {
      name: "Padaria",
      prompt:
        "Atue como atendente na Padaria 'Pão Quente'. Seu objetivo é atender os clientes e receber pedidos, conforme o cardápio abaixo: \nCardápio: Pão Francês (unidade): R$0,75 | Baguete: R$4,50 | Torta de Frango (fatia): R$6,00 | Café Expresso: R$4,00",
    },
    {
      name: "Loja de eletrônicos",
      prompt:
        "Atue como vendedor na Loja de Eletrônicos 'Tecnologia Avançada'. Seu objetivo é ajudar os clientes a escolherem os produtos eletrônicos que melhor atendem às suas necessidades, conforme o catálogo abaixo: \nCatálogo: Smartphone 128GB: R$2.500,00 | Laptop 16GB RAM, 512GB SSD: R$5.500,00 | Smart TV 55': R$3.000,00 | Fone de Ouvido Bluetooth: R$250,00",
    },
    {
      name: "Farmácia",
      prompt:
        "Atue como atendente na Farmácia 'Saúde em Dia'. Seu objetivo é atender os clientes, auxiliando-os a encontrar os produtos que procuram, conforme o catálogo abaixo: \nCatálogo: Analgésico (caixa): R$12,00 | Antigripal (caixa): R$18,00 | Protetor Solar FPS 60: R$35,00 | Vitamina C (frasco): R$25,00",
    },
    {
      name: "Supermercado",
      prompt:
        "Atue como atendente no Supermercado 'Compras & Economia'. Seu objetivo é auxiliar os clientes a localizar produtos e atender suas solicitações, conforme o catálogo abaixo: \nCatálogo: Leite Integral (litro): R$3,50 | Arroz (pacote 1kg): R$5,00 | Frango Congelado (kg): R$8,00 | Sabão em Pó (pacote 1kg): R$10,00",
    },
    {
      name: "Salão de beleza",
      prompt:
        "Atue como recepcionista no Salão de Beleza 'Bela & Poderosa'. Seu objetivo é receber os clientes, agendar horários e informar sobre os serviços oferecidos, conforme o catálogo abaixo: \nCatálogo: Corte de Cabelo: R$50,00 | Manicure: R$30,00 | Pedicure: R$40,00 | Hidratação Capilar: R$80,00",
    },
    {
      name: "Pet Shop",
      prompt:
        "Atue como atendente no Pet Shop 'Amigo Animal'. Seu objetivo é auxiliar os clientes a encontrar os produtos e serviços que melhor atendem às necessidades de seus animais de estimação, conforme o catálogo abaixo: \nCatálogo: Ração para Cães (pacote 5kg): R$80,00 | Brinquedo para Gatos: R$20,00 | Banho em Cães de porte médio: R$50,00 | Vacina Anti-rábica: R$70,00",
    },
  ];

  return (
    <Container style={{ backgroundColor: "#f5f5f5", padding: "20px" }}>
      <Row className="my-4 p-4 bg-light text-center rounded">
        <Col>
          <h1>Chat com o GPT-3.5 Turbo</h1>
          <p>
            Esta aplicação utiliza a API do OpenAI para realizar um chat
            interativo com o modelo de linguagem GPT-3.5 Turbo. Este chat
            permite criar uma variedade de conversas baseadas em um prompt
            inicial predefinido. O prompt inicial orienta o modelo de linguagem
            sobre o contexto da conversa. Você pode escolher um dos prompts
            predefinidos a qualquer momento, selecionando uma opção na lista de
            exemplos. Cada opção representa um cenário de negócios diferente,
            como atuar como um atendente de livraria, vendedor de uma loja de
            roupas, atendente de uma floricultura, e muitos outros. Após
            selecionar o prompt desejado, você pode interagir com o modelo de
            linguagem digitando suas mensagens e enviando-as através do
            formulário abaixo. Cada prompt predefinido fornece um cenário e um
            objetivo, guiando a interação com o modelo de linguagem.
          </p>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId="basePrompt" className="mt-4">
            <Form.Label><strong>Prompt do Sistema</strong></Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={basePrompt}
              onChange={handlePromptChange}
              placeholder="Escreva aqui como o ChatGPT deve se comportar durante o diálogo ou selecione um modelo de exemplo."
            />

            <Form.Group controlId="businessSelect">
              <Form.Label>Selecione um exemplo</Form.Label>
              <Form.Select
                aria-label="Selecione um exemplo de Prompt"
                value={selectedBusiness}
                onChange={(event) => {
                  const selectedPrompt = businessPrompts.find(
                    (prompt) => prompt.name === event.target.value
                  );
                  setSelectedBusiness(event.target.value);
                  if (selectedPrompt) {
                    setBasePrompt(selectedPrompt.prompt);
                  }
                }}
              >
                <option value="">Selecione...</option>
                {businessPrompts.map((prompt) => (
                  <option value={prompt.name} key={prompt.name}>
                    {prompt.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form.Group>
        </Col>
      </Row>

      <br />
      <br />

      <Alert key={"primary"} variant={"primary"}>
        <Row className="mt-3">
          <Col>
            <ListGroup variant="flush">
              {messages.map((msg, index) => {
                if (msg.role !== "system") {
                  return (
                    <ListGroup.Item
                      key={index}
                      className={`${msg.role}-message`}
                    >
                      <Card>
                        <Card.Body>
                          <Card.Text>{msg.content}</Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                          {msg.role === "assistant" ? "ChatGPT" : "User"}
                        </Card.Footer>
                      </Card>
                    </ListGroup.Item>
                  );
                }
              })}
            </ListGroup>
          </Col>
        </Row>
      </Alert>

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
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <BsArrowRightCircle />
                )}
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
