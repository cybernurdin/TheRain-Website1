"use client";

import { useState } from "react";
import type { Locale } from "@/data/site";
import { ui, text } from "@/data/content";

type Status = "idle" | "sending" | "success" | "error";

const labels = {
  firstName: { en: "First name", fr: "Prénom" },
  lastName: { en: "Last name", fr: "Nom" },
  email: { en: "Email address", fr: "Adresse email" },
  topic: { en: "Topic", fr: "Sujet" },
  message: { en: "Message", fr: "Message" },
  name: { en: "Full name", fr: "Nom complet" },
  accountType: { en: "Account type", fr: "Type de compte" },
  phone: { en: "Phone number", fr: "Numéro de téléphone" },
  scope: { en: "Deletion scope", fr: "Périmètre de suppression" },
  reason: { en: "Reason", fr: "Raison" },
  details: { en: "Additional details", fr: "Détails supplémentaires" }
};

function fieldClass() {
  return "mt-2 w-full rounded-2xl border border-white/12 bg-white/7 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300";
}

export function ContactForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setStatus(response.ok ? "success" : "error");
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="card rounded-3xl p-5 md:p-7" aria-label={locale === "fr" ? "Formulaire de contact" : "Contact form"}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-slate-200">
          {text(labels.firstName, locale)}
          <input name="firstName" autoComplete="given-name" required placeholder={locale === "fr" ? "Votre prénom" : "Your first name"} className={fieldClass()} />
        </label>
        <label className="text-sm font-semibold text-slate-200">
          {text(labels.lastName, locale)}
          <input name="lastName" autoComplete="family-name" required placeholder={locale === "fr" ? "Votre nom" : "Your last name"} className={fieldClass()} />
        </label>
      </div>
      <label className="mt-4 block text-sm font-semibold text-slate-200">
        {text(labels.email, locale)}
        <input name="email" type="email" autoComplete="email" required placeholder="name@example.com" className={fieldClass()} />
      </label>
      <label className="mt-4 block text-sm font-semibold text-slate-200">
        {text(labels.topic, locale)}
        <select name="topic" required className={fieldClass()}>
          <option value="general">{locale === "fr" ? "Demande générale" : "General inquiry"}</option>
          <option value="rider">{locale === "fr" ? "Passager" : "Rider support"}</option>
          <option value="driver">{locale === "fr" ? "Chauffeur" : "Driver support"}</option>
          <option value="school">{locale === "fr" ? "Transport scolaire" : "School transport"}</option>
          <option value="business">{locale === "fr" ? "Entreprise ou flotte" : "Business or fleet"}</option>
        </select>
      </label>
      <label className="mt-4 block text-sm font-semibold text-slate-200">
        {text(labels.message, locale)}
        <textarea name="message" required rows={5} placeholder={locale === "fr" ? "Dites-nous comment nous pouvons vous aider..." : "Tell us how we can help you..."} className={fieldClass()} />
      </label>
      <button type="submit" disabled={status === "sending"} className="mt-5 rounded-full bg-sky-500 px-6 py-3 text-sm font-black text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60">
        {status === "sending" ? (locale === "fr" ? "Envoi..." : "Sending...") : text(ui.submit, locale)}
      </button>
      <p aria-live="polite" className="mt-3 min-h-6 text-sm text-slate-300">
        {status === "success" && (locale === "fr" ? "Message envoyé. Notre équipe vous répondra bientôt." : "Message sent. Our team will reply soon.")}
        {status === "error" && (locale === "fr" ? "Impossible d'envoyer le message pour le moment." : "Unable to send the message right now.")}
      </p>
    </form>
  );
}

export function DataDeletionForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/data-deletion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setStatus(response.ok ? "success" : "error");
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="card rounded-3xl p-5 md:p-7" aria-label={locale === "fr" ? "Formulaire de suppression des données" : "Data deletion form"}>
      <label className="block text-sm font-semibold text-slate-200">
        {text(labels.name, locale)}
        <input name="name" required autoComplete="name" placeholder={locale === "fr" ? "Votre nom complet" : "Your full name"} className={fieldClass()} />
      </label>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-slate-200">
          {text(labels.accountType, locale)}
          <select name="accountType" required className={fieldClass()}>
            <option value="rider">{locale === "fr" ? "Passager" : "Rider"}</option>
            <option value="driver">{locale === "fr" ? "Chauffeur" : "Driver"}</option>
            <option value="parent">{locale === "fr" ? "Parent transport scolaire" : "School transport parent"}</option>
            <option value="fleet">{locale === "fr" ? "Gestionnaire de flotte" : "Fleet manager"}</option>
            <option value="guest">{locale === "fr" ? "Invité" : "Guest"}</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-200">
          {text(labels.phone, locale)}
          <input name="phone" required autoComplete="tel" placeholder="+237 6XX XXX XXX" className={fieldClass()} />
        </label>
      </div>
      <label className="mt-4 block text-sm font-semibold text-slate-200">
        {text(labels.email, locale)}
        <input name="email" type="email" autoComplete="email" placeholder="name@example.com" className={fieldClass()} />
      </label>
      <label className="mt-4 block text-sm font-semibold text-slate-200">
        {text(labels.scope, locale)}
        <select name="scope" required className={fieldClass()}>
          <option value="account">{locale === "fr" ? "Supprimer mon compte" : "Delete my account"}</option>
          <option value="marketing">{locale === "fr" ? "Supprimer mes préférences marketing" : "Delete my marketing preferences"}</option>
          <option value="partial">{locale === "fr" ? "Demande partielle" : "Partial request"}</option>
        </select>
      </label>
      <label className="mt-4 block text-sm font-semibold text-slate-200">
        {text(labels.reason, locale)}
        <textarea name="reason" rows={4} placeholder={locale === "fr" ? "Expliquez brièvement votre demande..." : "Briefly explain your request..."} className={fieldClass()} />
      </label>
      <label className="mt-4 block text-sm font-semibold text-slate-200">
        {text(labels.details, locale)}
        <textarea name="details" rows={3} placeholder={locale === "fr" ? "Informations supplémentaires..." : "Additional information..."} className={fieldClass()} />
      </label>
      <button type="submit" disabled={status === "sending"} className="mt-5 rounded-full bg-sky-500 px-6 py-3 text-sm font-black text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60">
        {status === "sending" ? (locale === "fr" ? "Traitement..." : "Processing...") : text(ui.submitDeletion, locale)}
      </button>
      <p aria-live="polite" className="mt-3 min-h-6 text-sm text-slate-300">
        {status === "success" && (locale === "fr" ? "Demande envoyée. Nous vous contacterons avec une référence." : "Request submitted. We will contact you with a reference.")}
        {status === "error" && (locale === "fr" ? "Impossible d'envoyer la demande pour le moment." : "Unable to submit the request right now.")}
      </p>
    </form>
  );
}
