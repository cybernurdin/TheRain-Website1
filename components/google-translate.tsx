"use client";

import { useCallback, useEffect, useRef } from "react";

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            autoDisplay: boolean;
          },
          element: string
        ) => unknown;
      };
    };
    googleTranslateElementInit?: () => void;
    __therainInstallTranslateToggle?: () => void;
    __therainSetTranslatedText?: (element: Element, value: string) => void;
    toggleLang?: () => void;
  }
}

const SCRIPT_ID = "google-translate-script";
const STORAGE_KEY = "site-language";
const LEGACY_STORAGE_KEY = "therain_lang";
const BRAND_NAME = "TheRain";

function setTranslatedText(element: Element, value: string) {
  element.textContent = "";

  const parts = value.split(BRAND_NAME);
  parts.forEach((part, index) => {
    if (part) element.appendChild(document.createTextNode(part));
    if (index < parts.length - 1) {
      const brand = document.createElement("span");
      brand.className = "notranslate";
      brand.setAttribute("translate", "no");
      brand.textContent = BRAND_NAME;
      element.appendChild(brand);
    }
  });
}

function updateLanguageLabels(language: string) {
  document.querySelectorAll<HTMLElement>("#langLabel").forEach((label) => {
    label.textContent = language === "fr" ? "EN" : "FR";
  });
  document.documentElement.setAttribute("data-lang", language);
}

function setTranslateCookie(language: string) {
  if (language === "en") {
    document.cookie = "googtrans=/en/en;path=/";
    return;
  }

  document.cookie = `googtrans=/en/${language};path=/`;
  document.cookie = `googtrans=/en/${language};path=/;domain=${window.location.hostname}`;
}

function waitForTranslateSelect(callback: (select: HTMLSelectElement) => void, attempts = 12) {
  const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
  if (select) {
    callback(select);
    return;
  }

  if (attempts <= 0) return;

  window.setTimeout(() => {
    waitForTranslateSelect(callback, attempts - 1);
  }, 250);
}

export function GoogleTranslate() {
  const initialized = useRef(false);

  const applyLanguage = useCallback((language: string) => {
    const targetLanguage = language === "fr" ? "fr" : "en";
    localStorage.setItem(STORAGE_KEY, targetLanguage);
    localStorage.setItem(LEGACY_STORAGE_KEY, targetLanguage);
    setTranslateCookie(targetLanguage);
    updateLanguageLabels(targetLanguage);

    waitForTranslateSelect((select) => {
      if (select.value !== targetLanguage) {
        select.value = targetLanguage;
      }
      select.dispatchEvent(new Event("change"));
    });
  }, []);

  const installToggle = useCallback(() => {
    window.toggleLang = () => {
      const currentLanguage = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY) || "en";
      applyLanguage(currentLanguage === "fr" ? "en" : "fr");
    };
  }, [applyLanguage]);

  useEffect(() => {
    window.__therainSetTranslatedText = setTranslatedText;
    window.__therainInstallTranslateToggle = installToggle;
    installToggle();

    window.googleTranslateElementInit = () => {
      if (initialized.current || !window.google?.translate) return;
      initialized.current = true;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,fr",
          autoDisplay: false
        },
        "google_translate_element"
      );

      const savedLanguage = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY) || "en";
      updateLanguageLabels(savedLanguage);
      if (savedLanguage !== "en") {
        window.setTimeout(() => applyLanguage(savedLanguage), 500);
      }
    };

    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google?.translate) {
      window.googleTranslateElementInit();
    }

    const savedLanguage = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY) || "en";
    updateLanguageLabels(savedLanguage);
  }, [applyLanguage, installToggle]);

  return <div id="google_translate_element" style={{ display: "none" }} />;
}
