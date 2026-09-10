"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { SITE_TYPES, URGENCY_TYPES } from "@/data/content";
import { track, trackValidationErrors } from "@/lib/analytics";
import {
  SERVICE_OPTIONS,
  contactSchema,
  type ContactInput,
} from "@/lib/contact-schema";
import { EMAIL, mailtoHref } from "@/lib/site-config";

/**
 * Where the enquiry posts.
 *
 * On a Node host this is our own API route, which validates server-side,
 * rate limits and sends over SMTP. A static export (GitHub Pages) has no
 * server, so it posts to an external form service instead — set
 * NEXT_PUBLIC_FORM_ENDPOINT to a Formspree / Web3Forms / Basin URL.
 *
 * If neither is available the form does not pretend to work: it says so and
 * points at the email address. A form that silently swallows enquiries is
 * worse than no form.
 */
const EXTERNAL_ENDPOINT = (process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "").trim();
const IS_STATIC_EXPORT = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
const ENDPOINT = EXTERNAL_ENDPOINT || (IS_STATIC_EXPORT ? "" : "/api/contact");

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "error"; message: string };

export function ContactForm() {
  const router = useRouter();
  // Read here rather than from the page's searchParams prop — see the note in
  // src/app/contact/page.tsx.
  const preselect = useSearchParams().get("service") ?? undefined;
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const startedRef = useRef(false);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    // `service` and `siteType` are intentionally absent unless preselected:
    // their <select> carries a disabled empty placeholder, so an unanswered
    // dropdown submits "" and fails validation with a useful message rather
    // than silently defaulting to the first option. `consent` is likewise
    // left undefined so an unticked box cannot be mistaken for consent.
    defaultValues: {
      ...(preselect && SERVICE_OPTIONS.includes(preselect)
        ? { service: preselect }
        : {}),
      urgency: "Quote",
      website: "",
    },
  });

  // Capture the page and any UTM parameters the visitor arrived with.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setValue("pageUrl", window.location.href.slice(0, 500));
    const utm = {
      utmSource: params.get("utm_source"),
      utmMedium: params.get("utm_medium"),
      utmCampaign: params.get("utm_campaign"),
    } as const;
    for (const [key, value] of Object.entries(utm)) {
      if (value) setValue(key as keyof ContactInput, value.slice(0, 120));
    }
  }, [setValue]);

  /** Fires once, the first time the visitor engages with any field. */
  const onFirstInteraction = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track("form_start");
  };

  const onSubmit = handleSubmit(
    async (values) => {
      setStatus({ kind: "sending" });
      try {
        const response = await fetch(ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Formspree and Basin return JSON rather than a redirect for this.
            Accept: "application/json",
          },
          body: JSON.stringify(values),
        });
        const result = (await response.json().catch(() => ({}))) as {
          ok?: boolean;
          success?: boolean;
          error?: string;
          fieldErrors?: Record<string, string>;
        };

        // Our own API answers { ok: true }. External services vary — some
        // return { success: true }, some only a 200 — so a 2xx is enough there.
        const delivered = EXTERNAL_ENDPOINT
          ? response.ok
          : response.ok && result.ok === true;

        if (!delivered) {
          // Surface server-side field errors against the right inputs.
          if (result.fieldErrors) {
            for (const [field, message] of Object.entries(result.fieldErrors)) {
              setError(field as keyof ContactInput, { type: "server", message });
            }
            trackValidationErrors(Object.keys(result.fieldErrors));
          }
          setStatus({
            kind: "error",
            message:
              result.error ??
              "We could not send that just now. Please try again in a moment.",
          });
          return;
        }

        track("form_submit_success", { service: String(values.service) });
        router.push("/contact/sent");
      } catch {
        setStatus({
          kind: "error",
          message:
            "That did not reach us — check your connection and try once more.",
        });
      }
    },
    (formErrors) => {
      trackValidationErrors(Object.keys(formErrors));
    },
  );

  const busy = isSubmitting || status.kind === "sending";
  const disabled = busy || !ENDPOINT;
  const err = (field: keyof ContactInput) => errors[field]?.message;
  const invalid = (field: keyof ContactInput) =>
    errors[field] ? "true" : undefined;
  const describedBy = (field: keyof ContactInput) =>
    errors[field] ? `${field}-error` : undefined;

  return (
    <form
      className="form-card glass edge-specular"
      onSubmit={onSubmit}
      onFocusCapture={onFirstInteraction}
      noValidate
    >
      {!ENDPOINT && (
        <p
          className="form-status form-status-warn"
          role="status"
          style={{ marginBottom: 22 }}
        >
          <strong>This form is not connected yet.</strong> This build has no
          submission endpoint configured, so nothing sent here would reach
          anyone. Email{" "}
          <a href={mailtoHref()} style={{ color: "inherit", fontWeight: 600 }}>
            {EMAIL.value}
          </a>{" "}
          instead and we will pick it up.
        </p>
      )}

      <div className="form-grid">
        <div className="field">
          <label className="field-label" htmlFor="name">
            Full name<span className="req">*</span>
          </label>
          <input
            id="name"
            className="input"
            autoComplete="name"
            aria-invalid={invalid("name")}
            aria-describedby={describedBy("name")}
            {...register("name")}
          />
          {err("name") && (
            <p className="field-error" id="name-error">
              {err("name")}
            </p>
          )}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="company">
            Company <span style={{ opacity: 0.6 }}>(optional)</span>
          </label>
          <input
            id="company"
            className="input"
            autoComplete="organization"
            {...register("company")}
          />
        </div>

        <div className="field">
          <label className="field-label" htmlFor="phone">
            Phone<span className="req">*</span>
          </label>
          <input
            id="phone"
            className="input"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={invalid("phone")}
            aria-describedby={describedBy("phone")}
            {...register("phone")}
          />
          {err("phone") && (
            <p className="field-error" id="phone-error">
              {err("phone")}
            </p>
          )}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="email">
            Email<span className="req">*</span>
          </label>
          <input
            id="email"
            className="input"
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-invalid={invalid("email")}
            aria-describedby={describedBy("email")}
            {...register("email")}
          />
          {err("email") && (
            <p className="field-error" id="email-error">
              {err("email")}
            </p>
          )}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="location">
            Suburb or town<span className="req">*</span>
          </label>
          <input
            id="location"
            className="input"
            autoComplete="address-level2"
            aria-invalid={invalid("location")}
            aria-describedby={describedBy("location")}
            {...register("location")}
          />
          {err("location") && (
            <p className="field-error" id="location-error">
              {err("location")}
            </p>
          )}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="service">
            Service required<span className="req">*</span>
          </label>
          <select
            id="service"
            className="select"
            defaultValue={
              preselect && SERVICE_OPTIONS.includes(preselect) ? preselect : ""
            }
            aria-invalid={invalid("service")}
            aria-describedby={describedBy("service")}
            {...register("service")}
          >
            <option value="" disabled>
              Choose a service
            </option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {err("service") && (
            <p className="field-error" id="service-error">
              {err("service")}
            </p>
          )}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="siteType">
            Site type<span className="req">*</span>
          </label>
          <select
            id="siteType"
            className="select"
            defaultValue=""
            aria-invalid={invalid("siteType")}
            aria-describedby={describedBy("siteType")}
            {...register("siteType")}
          >
            <option value="" disabled>
              Choose a site type
            </option>
            {SITE_TYPES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {err("siteType") && (
            <p className="field-error" id="siteType-error">
              {err("siteType")}
            </p>
          )}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="urgency">
            What do you need?<span className="req">*</span>
          </label>
          <select
            id="urgency"
            className="select"
            aria-invalid={invalid("urgency")}
            aria-describedby={describedBy("urgency")}
            {...register("urgency")}
          >
            {URGENCY_TYPES.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
          {err("urgency") && (
            <p className="field-error" id="urgency-error">
              {err("urgency")}
            </p>
          )}
        </div>

        <div className="field span-2">
          <label className="field-label" htmlFor="message">
            About the job<span className="req">*</span>
          </label>
          <textarea
            id="message"
            className="textarea"
            placeholder="Appliances involved, type of building, and roughly when you need it done."
            aria-invalid={invalid("message")}
            aria-describedby={describedBy("message")}
            {...register("message")}
          />
          {err("message") && (
            <p className="field-error" id="message-error">
              {err("message")}
            </p>
          )}
        </div>
      </div>

      {/* Honeypot — hidden from people and from assistive technology. */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <input type="hidden" {...register("pageUrl")} />
      <input type="hidden" {...register("utmSource")} />
      <input type="hidden" {...register("utmMedium")} />
      <input type="hidden" {...register("utmCampaign")} />

      <div className="form-footer">
        <div className="field">
          <div className="checkbox-row">
            <input
              id="consent"
              type="checkbox"
              className="checkbox"
              aria-invalid={invalid("consent")}
              aria-describedby={describedBy("consent")}
              {...register("consent")}
            />
            <label htmlFor="consent" className="t-small" style={{ margin: 0 }}>
              I agree that Gas Designs may use these details to respond to this
              enquiry, as described in the{" "}
              <Link
                href="/privacy-policy"
                style={{ color: "var(--ion-cyan)", textDecoration: "underline" }}
              >
                privacy policy
              </Link>
              .
            </label>
          </div>
          {err("consent") && (
            <p className="field-error" id="consent-error">
              {err("consent")}
            </p>
          )}
        </div>

        {status.kind === "error" && (
          <p className="form-status form-status-err" role="alert">
            {status.message}
          </p>
        )}

        <div className="form-submit-row">
          <button type="submit" className="btn btn-primary" disabled={disabled}>
            {busy ? "Sending…" : "Send enquiry"}
          </button>
          <p className="t-small" style={{ margin: 0 }}>
            We reply to every enquiry, including the ones we cannot take on.
          </p>
        </div>
      </div>
    </form>
  );
}
