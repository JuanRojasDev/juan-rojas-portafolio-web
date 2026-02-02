import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import emailjs from "emailjs-com";
import EarthCanvas from "../canvas/Earth";
import ReactDOM from "react-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme, error }) => (error ? "red" : theme.text_secondary + 50)};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: ${({ error }) => (error ? "6px" : "0px")};
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ErrorMessage = styled.div`
  font-size: 14px;
  color: red;
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(18, 100%, 33%, 1);
  background: linear-gradient(225deg, hsla(18, 100%, 33%, 1) 0%, hsla(41, 100%, 40%, 1) 100%);
  background: -moz-linear-gradient(225deg, hsla(18, 100%, 33%, 1) 0%, hsla(41, 100%, 40%, 1) 100%);
  background: -webkit-linear-gradient(225deg, hsla(18, 100%, 33%, 1) 0%, hsla(41, 100%, 40%, 1) 100%);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;

  &:hover {
    transform: scale(1.05);
    transition: all 0.4s ease-in-out;
  }
`;

const Notification = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translate(-50%, -10px);
  background-color: #4caf50; /* Fondo verde */
  color: white;
  padding: 15px 18px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.18);
  z-index: 9999;
  will-change: transform, opacity;
  opacity: 1; /* asegurar que sea visible cuando se monta */
  animation: slideDown 360ms cubic-bezier(.2,.8,.2,1) both;

  @keyframes slideDown {
    0% { transform: translate(-50%, -10px); }
    100% { transform: translate(-50%, 0); }
  }
`;

const CheckIcon = styled.span`
  margin-right: 10px;
  font-size: 20px;
`;

const CloseButton = styled.button`
  margin-left: 12px;
  background: transparent;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  padding: 4px 6px;
`;

const Snackbar = ({ show, onClose, children }) => {
  useEffect(() => {
    if (!show) return;
    const id = setTimeout(() => onClose && onClose(), 3000);
    return () => clearTimeout(id);
  }, [show, onClose]);

  if (!show) return null;

  return ReactDOM.createPortal(
    <Notification role="status" aria-live="polite">
      <CheckIcon>✓</CheckIcon>
      <div style={{ fontWeight: 600 }}>{children}</div>
      <CloseButton aria-label="Cerrar notificación" onClick={onClose}>
        ×
      </CloseButton>
    </Notification>,
    document.body
  );
};

const Contact = () => {
  const form = useRef();
  const [emailError, setEmailError] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const email = formData.get("from_email");

    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);

    emailjs
      .sendForm(
      "service_1g0njf7",
      "template_24ia49x", 
      form.current,
      "OoFydm2AoCvcBZ54F" 
      )
      .then(
        (result) => {
          if (result.status === 200 ) {
            setShowNotification(true);
            form.current.reset();
          } else {
            alert("Error al enviar el mensaje: " + result.text);
          }
        },
        (error) => {
          alert("Error al enviar el mensaje: " + error.text);
        }
      );
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <Container>
      <Snackbar show={showNotification} onClose={() => setShowNotification(false)}>
        ¡Correo electrónico enviado correctamente!
      </Snackbar>
      <Wrapper>
        <EarthCanvas />
        <Title>Contactame</Title>
        <Desc>
          ¡No dudes en comunicarte conmigo si tienes alguna pregunta u inquietud!
        </Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Enviame un E-Mail 🚀</ContactTitle>
          <ContactInput
            placeholder="Tu E-Mail"
            name="from_email"
            error={emailError}
            onChange={() => setEmailError(false)}
          />
          {emailError && <ErrorMessage>Por favor ingresa un correo electrónico válido.</ErrorMessage>}
          <ContactInput placeholder="Tu Nombre" name="from_name" />
          <ContactInput placeholder="Titulo" name="subject" />
          <ContactInputMessage placeholder="Descripción" name="message" rows={4} />
          <ContactButton type="submit" value="Enviar" />
        </ContactForm>
      </Wrapper>
    </Container>
  );
};

export default Contact;
