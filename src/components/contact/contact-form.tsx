"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { type FieldErrors, useForm } from "react-hook-form";
import { SOCIAL_LINKS } from "@/lib/constants";
import {
  contactFormSchema,
  type ContactField,
  type ContactFormValues,
} from "@/lib/validations";
import { cn } from "@/lib/utils";

type SubmitState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

type ApiResponse = {
  ok?: boolean;
  error?: string;
  fieldErrors?: Partial<Record<ContactField, string[]>>;
};

const FIELD_ORDER: ContactField[] = ["name", "email", "subject", "message"];
const MESSAGE_HINT_ID = "message-hint";

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
  });
  const [sending, setSending] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setFocus,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  // Move focus to the result so screen reader and keyboard users hear it.
  useEffect(() => {
    if (submitState.status === "idle") return;
    statusRef.current?.focus();
  }, [submitState]);

  const focusFirstError = (fields: Partial<Record<ContactField, unknown>>) => {
    const firstInvalid = FIELD_ORDER.find((field) => fields[field]);
    if (firstInvalid) setFocus(firstInvalid);
  };

  const onInvalid = (formErrors: FieldErrors<ContactFormValues>) =>
    focusFirstError(formErrors);

  const onSubmit = handleSubmit(async (values) => {
    setSubmitState({ status: "idle" });
    setSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json().catch(() => ({}))) as ApiResponse;

      if (response.ok && data.ok) {
        reset();
        setSubmitState({ status: "success" });
        return;
      }

      // Server-side validation mirrors the client; show its messages inline.
      if (data.fieldErrors) {
        for (const field of FIELD_ORDER) {
          const message = data.fieldErrors[field]?.[0];
          if (message) setError(field, { type: "server", message });
        }
        focusFirstError(data.fieldErrors);
        return;
      }

      setSubmitState({
        status: "error",
        message:
          data.error ?? "Something went wrong while sending your message.",
      });
    } catch {
      setSubmitState({
        status: "error",
        message: "Network error. Check your connection and try again.",
      });
    } finally {
      setSending(false);
    }
  }, onInvalid);

  if (submitState.status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="border-accent/30 bg-accent/10 rounded-lg border p-6 outline-none motion-safe:animate-enter"
      >
        <CircleCheck className="text-accent size-6" aria-hidden />
        <p className="text-foreground mt-3 text-lg font-medium">
          Message sent — thank you.
        </p>
        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
          I&apos;ll get back to you within 24–48 hours.
        </p>
        <button
          type="button"
          onClick={() => setSubmitState({ status: "idle" })}
          className="text-foreground hover:text-accent mt-4 inline-flex min-h-11 items-center text-sm font-medium underline-offset-4 transition-colors hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      method="post"
      className="relative"
      noValidate
      aria-labelledby="contact-form-heading"
      aria-busy={sending}
    >
      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        aria-hidden
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <fieldset disabled={sending} className="space-y-5">
        <legend className="sr-only">Your message</legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="name" label="Name" error={errors.name?.message}>
            <input
              id="name"
              type="text"
              autoComplete="name"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={inputClassName(Boolean(errors.name))}
              {...register("name")}
            />
          </Field>

          <Field id="email" label="Email" error={errors.email?.message}>
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={inputClassName(Boolean(errors.email))}
              {...register("email")}
            />
          </Field>
        </div>

        <Field id="subject" label="Subject" error={errors.subject?.message}>
          <input
            id="subject"
            type="text"
            autoComplete="off"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            className={inputClassName(Boolean(errors.subject))}
            {...register("subject")}
          />
        </Field>

        <Field
          id="message"
          label="Message"
          error={errors.message?.message}
          hint="At least 10 characters — a role, a project or a question."
        >
          <textarea
            id="message"
            rows={6}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={cn(
              MESSAGE_HINT_ID,
              errors.message && "message-error",
            )}
            className={cn(
              inputClassName(Boolean(errors.message)),
              "min-h-32 resize-y",
            )}
            {...register("message")}
          />
        </Field>

        {submitState.status === "error" ? (
          <div
            ref={statusRef}
            tabIndex={-1}
            role="alert"
            className="border-destructive/30 bg-destructive/10 flex gap-3 rounded-md border px-4 py-3 text-sm outline-none motion-safe:animate-enter"
          >
            <CircleAlert
              className="text-destructive mt-0.5 size-4 shrink-0"
              aria-hidden
            />
            <p className="text-foreground leading-relaxed">
              {submitState.message} You can also email me at{" "}
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="font-medium underline underline-offset-4"
              >
                {SOCIAL_LINKS.email}
              </a>
              .
            </p>
          </div>
        ) : null}

        <button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 min-w-40 items-center justify-center gap-2 rounded-md px-6 text-sm font-medium shadow-sm transition-colors motion-safe:transition-[color,background-color,translate] motion-safe:hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70 disabled:motion-safe:hover:translate-y-0"
        >
          {sending ? (
            <>
              <LoaderCircle
                className="size-4 motion-safe:animate-spin"
                aria-hidden
              />
              Sending…
            </>
          ) : (
            "Send message"
          )}
        </button>
      </fieldset>

      <p className="sr-only" aria-live="polite">
        {sending ? "Sending your message…" : ""}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-foreground text-sm font-medium">
        {label}
        <span className="text-destructive" aria-hidden>
          {" "}
          *
        </span>
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-muted-foreground text-xs">
          {hint}
        </p>
      ) : hint ? (
        <span id={`${id}-hint`} className="sr-only">
          {hint}
        </span>
      ) : null}
      {error ? (
        <p
          id={`${id}-error`}
          className="text-destructive flex items-center gap-1.5 text-sm"
        >
          <CircleAlert className="size-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClassName(hasError: boolean) {
  return cn(
    "border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-ring min-h-11 w-full rounded-md border px-3 py-2.5 text-sm shadow-sm outline-none transition-colors focus-visible:ring-2 disabled:opacity-70",
    hasError && "border-destructive",
  );
}
