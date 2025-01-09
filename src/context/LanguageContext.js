import React, { createContext, useState, useContext } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("es");

  const translate = (key) => {
    if (key === "language_icon") {
      return language === "es"
        ? "https://em-content.zobj.net/source/apple/129/flag-for-spain_1f1ea-1f1f8.png"
        : "https://em-content.zobj.net/source/apple/129/flag-for-united-states_1f1fa-1f1f8.png";
    }
    const keys = key.split('.');
    let translation = translations[language];
    for (let i = 0; i < keys.length; i++) {
      translation = translation[keys[i]];
      if (!translation) return key;
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);