import React, { useRef, useState } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../context/LanguageContext";
import { Bio } from "../data/constants";
import { RevealText, RevealBlock } from "../components/studio/Reveal";
import { Page, Shell, PageHead, PageTitle } from "../components/studio/Layout";
import { ArrowUpRight } from "../components/studio/Icons";
import { useMagnetic } from "../hooks/useMagnetic";

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.75fr;
  gap: clamp(2.5rem, 7vw, 7rem);
  padding-bottom: var(--section);

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }

  @media (max-width: 640px) {
    gap: 2.5rem;
  }
`;

const Aside = styled.div`
  h4 {
    font-family: var(--font-sans);
    font-size: var(--label);
    font-weight: 500;
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: var(--ink-faint);
    margin-bottom: 1rem;
  }

  a,
  p {
    font-size: var(--body);
    font-weight: 400;
    display: block;
    margin-bottom: 0.4rem;
    line-height: 1.5;
    transition: color 0.3s var(--ease);
  }

  a {
    width: fit-content;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--ink);

    &:hover {
      color: var(--accent);
    }

    svg {
      transition: transform 0.35s var(--ease);
    }

    &:hover svg {
      transform: translate(3px, -3px);
    }
  }

  p {
    color: var(--ink-soft);
  }

  div + div {
    margin-top: 2.8rem;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 0;
`;

const Field = styled.label`
  display: block;
  border-bottom: 1px solid var(--rule);
  padding: clamp(1.4rem, 2.5vw, 1.6rem) 0 clamp(0.85rem, 1.5vw, 1rem);
  transition: border-color 0.4s var(--ease);

  &:focus-within {
    border-color: var(--ink);
  }

  span {
    display: block;
    font-family: var(--font-sans);
    font-size: var(--label);
    font-weight: 500;
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: var(--ink-faint);
    margin-bottom: 0.7rem;
  }

  input,
  textarea {
    width: 100%;
    font-family: inherit;
    font-size: clamp(1.05rem, 1.8vw, 1.4rem);
    font-weight: 500;
    letter-spacing: var(--tracking-tight);
    color: var(--ink);
    background: none;
    border: none;
    outline: none;
    resize: none;
    line-height: 1.4;

    &::placeholder {
      color: var(--ink-faint);
      opacity: 0.6;
    }
  }

  textarea {
    min-height: clamp(6rem, 10vw, 8rem);
  }
`;

const Submit = styled.button`
  justify-self: start;
  margin-top: clamp(2.5rem, 5vw, 3.5rem);
  display: grid;
  place-items: center;
  width: clamp(150px, 16vw, 190px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--ink);
  color: var(--paper-on-ink);
  font-size: clamp(0.9rem, 1.1vw, 1rem);
  font-weight: 500;
  cursor: pointer;
  will-change: transform;
  box-shadow: 
    var(--shadow-inset),
    0 4px 24px rgba(28, 29, 32, 0.15);
  transition: all 0.5s var(--ease);

  &:hover:not(:disabled) {
    background: var(--accent);
    transform: scale(1.05);
    box-shadow: 
      var(--shadow-inset),
      0 8px 32px rgba(69, 92, 233, 0.25);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  @media (max-width: 640px) {
    width: 130px;
    font-size: 0.875rem;
  }
`;

const Status = styled.p`
  margin-top: 1.75rem;
  font-size: var(--body);
  font-weight: 400;
  color: ${({ $error }) => ($error ? "#D14343" : "var(--ink-soft)")};
  line-height: 1.5;
`;

// ─── EmailJS ───
// Claves públicas por diseño: el envío va del navegador del visitante a
// EmailJS. Si el formulario deja de enviar, revisa primero que el servicio de
// Gmail siga conectado en el panel de EmailJS.
const SERVICE_ID = "service_1g0njf7";
const TEMPLATE_ID = "template_24ia49x";
const PUBLIC_KEY = "OoFydm2AoCvcBZ54F";

const Contact = () => {
  const { translate } = useLanguage();
  const form = useRef(null);
  const magneticRef = useMagnetic({ strength: 0.45, radius: 120 });
  const [state, setState] = useState("idle");

  const onSubmit = (e) => {
    e.preventDefault();
    setState("sending");

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(() => {
        setState("sent");
        form.current.reset();
      })
      .catch((err) => {
        // EmailJS devuelve { status, text }. Sin esto el fallo es mudo: un 412
        // ("Invalid grant") significa que hay que reconectar Gmail en el panel
        // de EmailJS, y no se distingue de un error de red.
        console.error("EmailJS:", err?.status, err?.text || err);
        setState("error");
      });
  };

  return (
    <Page>
      <Shell>
        <PageHead>
          <PageTitle>
            <RevealText delay={0.05}>{translate("studio.contact_title")}</RevealText>
          </PageTitle>
        </PageHead>

        <ContactGrid>
          <Aside>
            <RevealBlock y={20}>
              <div>
                <h4>{translate("studio.get_in_touch")}</h4>
                <a href="mailto:rojassalinasjuanandres@gmail.com">
                  rojassalinasjuanandres@gmail.com
                </a>
              </div>
              <div>
                <h4>{translate("studio.socials")}</h4>
                <a href={Bio.github} target="_blank" rel="noreferrer">
                  GitHub <ArrowUpRight />
                </a>
                <a href={Bio.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn <ArrowUpRight />
                </a>
              </div>
              <div>
                <h4>{translate("studio.based_in")}</h4>
                <p>Bogotá, D.C — Colombia</p>
              </div>
            </RevealBlock>
          </Aside>

          <RevealBlock delay={0.1} y={24}>
            <Form ref={form} onSubmit={onSubmit}>
              <Field>
                <span>{translate("contact_name_label")}</span>
                <input
                  type="text"
                  name="from_name"
                  required
                  placeholder={translate("contact_name_placeholder")}
                />
              </Field>
              <Field>
                <span>Email</span>
                <input
                  type="email"
                  name="from_email"
                  required
                  placeholder={translate("contact_email_placeholder")}
                />
              </Field>
              <Field>
                <span>{translate("contact_subject_label")}</span>
                <input
                  type="text"
                  name="subject"
                  placeholder={translate("contact_subject_placeholder")}
                />
              </Field>
              <Field>
                <span>{translate("contact_message_label")}</span>
                <textarea
                  name="message"
                  required
                  placeholder={translate("contact_message_placeholder")}
                />
              </Field>

              <Submit
                ref={magneticRef}
                type="submit"
                disabled={state === "sending"}
              >
                {state === "sending"
                  ? translate("contact_sending")
                  : translate("studio.send")}
              </Submit>

              {state === "sent" && <Status>{translate("contact_success")}</Status>}
              {state === "error" && (
                <Status $error>{translate("studio.send_error")}</Status>
              )}
            </Form>
          </RevealBlock>
        </ContactGrid>
      </Shell>
    </Page>
  );
};

export default Contact;
