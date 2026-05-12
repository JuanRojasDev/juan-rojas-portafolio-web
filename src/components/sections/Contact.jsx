import React, { useRef, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import ReactDOM from "react-dom";
import { Bio } from "../../data/constants";
import { useLanguage } from "../../context/LanguageContext";
import GithubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GmailIcon from "@mui/icons-material/Mail";

// ─── Keyframes ───
const slideDown = keyframes`
  from { transform: translate(-50%, -20px); opacity: 0; }
  to   { transform: translate(-50%, 0);     opacity: 1; }
`;

const pulseGreen = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
  50%       { box-shadow: 0 0 0 6px rgba(16,185,129,0); }
`;

const borderRotate = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// ─── Layout ───
const Container = styled.div`
  display: flex;
  justify-content: center;
  z-index: 10;
  padding: 80px 20px;
  position: relative;

  /* Ambient purple glow */
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 400px;
    background: radial-gradient(ellipse, rgba(133,76,230,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const Title = styled(motion.div)`
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  text-align: center;
  font-weight: 800;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  letter-spacing: -0.03em;

  @media (max-width: 768px) {
    font-size: clamp(1.9rem, 6vw, 2.6rem);
  }
`;

const Desc = styled(motion.div)`
  font-size: clamp(0.95rem, 1.5vw, 1.05rem);
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.75;
  margin-bottom: 20px;
`;

// ─── Two-column layout ───
const ContactLayout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 24px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// ─── Left info panel ───
const InfoPanel = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoCard = styled.div`
  background: rgba(17, 25, 40, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(12px);
`;

const InfoTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  letter-spacing: -0.02em;
  margin-bottom: 10px;
`;

const InfoText = styled.p`
  font-size: 0.9rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_secondary};
`;

const AvailBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 9999px;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.25);
  font-size: 13px;
  font-weight: 700;
  color: #10B981;
  margin-top: 14px;
  width: fit-content;

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #10B981;
    animation: ${pulseGreen} 2s ease-in-out infinite;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  color: ${({ theme }) => theme.text_secondary};
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.25s ease;

  .icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: rgba(255, 127, 0, 0.10);
    border: 1px solid rgba(255, 127, 0, 0.20);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.primary};
    flex-shrink: 0;
    font-size: 1.1rem;
    transition: all 0.25s ease;
  }

  .label { flex: 1; }

  .arrow {
    font-size: 12px;
    opacity: 0;
    transform: translateX(-4px);
    transition: all 0.25s ease;
  }

  &:hover {
    border-color: rgba(255, 127, 0, 0.25);
    background: rgba(255, 127, 0, 0.05);
    color: ${({ theme }) => theme.text_primary};

    .icon {
      background: rgba(255, 127, 0, 0.18);
      border-color: rgba(255, 127, 0, 0.40);
    }

    .arrow {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

// ─── Right form panel ───
const FormOuter = styled.div`
  position: relative;
  border-radius: 18px;
  padding: 2px;
  background: linear-gradient(
    135deg,
    rgba(255,127,0,0.5),
    rgba(133,76,230,0.35),
    rgba(255,127,0,0.2),
    rgba(133,76,230,0.5)
  );
  background-size: 300% 300%;
  animation: ${borderRotate} 6s ease infinite;
`;

const FormInner = styled(motion.form)`
  background: rgba(17, 25, 40, 0.92);
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  backdrop-filter: blur(16px);

  @media (max-width: 480px) {
    padding: 24px 20px;
  }
`;

const FormTitle = styled.div`
  font-size: clamp(1.2rem, 2vw, 1.4rem);
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  letter-spacing: -0.02em;
  margin-bottom: 4px;
`;

const FieldLabel = styled.label`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text_tertiary};
  font-family: var(--font-mono);
  margin-bottom: 4px;
  display: block;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid ${({ $error, theme }) =>
    $error ? theme.error : "rgba(255,255,255,0.10)"};
  outline: none;
  font-size: 0.95rem;
  font-family: var(--font-sans);
  color: ${({ theme }) => theme.text_primary};
  border-radius: 10px;
  padding: 11px 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder { color: rgba(255,255,255,0.25); }

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px rgba(255, 127, 0, 0.12);
  }
`;

const Textarea = styled.textarea`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255,255,255,0.10);
  outline: none;
  font-size: 0.95rem;
  font-family: var(--font-sans);
  color: ${({ theme }) => theme.text_primary};
  border-radius: 10px;
  padding: 11px 14px;
  resize: vertical;
  min-height: 110px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder { color: rgba(255,255,255,0.25); }

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px rgba(255, 127, 0, 0.12);
  }
`;

const ErrorMsg = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.error};
  font-family: var(--font-mono);
`;

const SubmitBtn = styled(motion.button)`
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(225deg, hsla(18, 100%, 33%, 1) 0%, hsla(41, 100%, 40%, 1) 100%);
  color: #fff;
  font-size: 1rem;
  font-weight: 800;
  font-family: var(--font-sans);
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(255, 127, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: box-shadow 0.3s ease;
  margin-top: 4px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    box-shadow: 0 8px 32px rgba(255, 127, 0, 0.55);
    &::before { left: 140%; }
  }

  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

// ─── Toast ───
const Toast = styled.div`
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translate(-50%, 0);
  background: rgba(16, 185, 129, 0.95);
  backdrop-filter: blur(12px);
  color: white;
  padding: 13px 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  z-index: 9999;
  animation: ${slideDown} 0.3s ease forwards;
  border: 1px solid rgba(255,255,255,0.15);
  font-size: 14px;
  font-weight: 600;
`;

const ToastClose = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  opacity: 0.8;
  margin-left: 8px;
  &:hover { opacity: 1; }
`;

const Snackbar = ({ show, onClose, children }) => {
  useEffect(() => {
    if (!show) return;
    const id = setTimeout(onClose, 4000);
    return () => clearTimeout(id);
  }, [show, onClose]);

  if (!show) return null;

  return ReactDOM.createPortal(
    <Toast role="status" aria-live="polite">
      <span>✓</span>
      <span>{children}</span>
      <ToastClose onClick={onClose}>×</ToastClose>
    </Toast>,
    document.body
  );
};

// ─── Component ───
const Contact = () => {
  const form = useRef();
  const [emailError, setEmailError] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const { translate } = useLanguage();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = new FormData(form.current).get("from_email");
    if (!validateEmail(email)) { setEmailError(true); return; }
    setEmailError(false);
    setSending(true);
    emailjs
      .sendForm("service_1g0njf7", "template_24ia49x", form.current, "OoFydm2AoCvcBZ54F")
      .then((r) => { if (r.status === 200) { setSent(true); form.current.reset(); } })
      .catch((err) => alert("Error: " + err.text))
      .finally(() => setSending(false));
  };

  return (
    <Container id="Contact">
      <Snackbar show={sent} onClose={() => setSent(false)}>
        ¡Correo electrónico enviado correctamente!
      </Snackbar>

      <Wrapper>
        <Title
          initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {translate("contact")}
        </Title>
        <Desc
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          ¡No dudes en comunicarte conmigo si tienes alguna pregunta u oportunidad!
        </Desc>

        <ContactLayout>
          {/* ── Left info ── */}
          <InfoPanel
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <InfoCard>
              <InfoTitle>Construyamos algo juntos</InfoTitle>
              <InfoText>
                Abierto a roles full-time, proyectos freelance y colaboraciones interesantes.
                Respondo en menos de 24 horas.
              </InfoText>
              <AvailBadge>
                <span className="dot" />
                Disponible para trabajar
              </AvailBadge>
            </InfoCard>

            <InfoCard>
              <InfoTitle style={{ marginBottom: "14px" }}>Conecta conmigo</InfoTitle>
              <SocialLinks>
                <SocialLink
                  href={Bio.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="icon"><GithubIcon fontSize="inherit" /></span>
                  <span className="label">GitHub</span>
                  <span className="arrow">→</span>
                </SocialLink>
                <SocialLink
                  href={Bio.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="icon"><LinkedInIcon fontSize="inherit" /></span>
                  <span className="label">LinkedIn</span>
                  <span className="arrow">→</span>
                </SocialLink>
                <SocialLink
                  href={Bio.gmail}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="icon"><GmailIcon fontSize="inherit" /></span>
                  <span className="label">Gmail</span>
                  <span className="arrow">→</span>
                </SocialLink>
              </SocialLinks>
            </InfoCard>
          </InfoPanel>

          {/* ── Right form ── */}
          <FormOuter>
            <FormInner
              ref={form}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FormTitle>Enviame un E-Mail 🚀</FormTitle>

              <FieldGroup>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  name="from_email"
                  placeholder="tu@email.com"
                  $error={emailError}
                  onChange={() => setEmailError(false)}
                  required
                />
                {emailError && <ErrorMsg>Por favor ingresa un correo válido.</ErrorMsg>}
              </FieldGroup>

              <FieldGroup>
                <FieldLabel>Nombre</FieldLabel>
                <Input type="text" name="from_name" placeholder="Tu nombre completo" required />
              </FieldGroup>

              <FieldGroup>
                <FieldLabel>Asunto</FieldLabel>
                <Input type="text" name="subject" placeholder="¿En qué puedo ayudarte?" />
              </FieldGroup>

              <FieldGroup>
                <FieldLabel>Mensaje</FieldLabel>
                <Textarea name="message" placeholder="Cuéntame sobre tu proyecto..." rows={4} required />
              </FieldGroup>

              <SubmitBtn
                type="submit"
                disabled={sending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {sending ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: "spin 1s linear infinite" }}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    Enviar Mensaje
                  </>
                )}
              </SubmitBtn>
            </FormInner>
          </FormOuter>
        </ContactLayout>
      </Wrapper>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </Container>
  );
};

export default Contact;
