"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { type FieldErrors, useForm } from "react-hook-form";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";
import { cn } from "@/lib/utils";

type SubmitState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
  });
  const statusRef = useRef<HTMLParagraphElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitting },
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

  useEffect(() => {
    if (submitState.status === "idle") return;
    statusRef.current?.focus();
  }, [submitState]);

  const onInvalid = (formErrors: FieldErrors<ContactFormValues>) => {
    const order: Array<keyof ContactFormValues> = [
      "name",
      "email",
      "subject",
      "message",
    ];
    const firstInvalid = order.find((field) => formErrors[field]);
    if (firstInvalid) setFocus(firstInvalid);
  };

  const onSubmit = handleSubmit(async (values) => {
    setSubmitState({ status: "idle" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !data.ok) {
        setSubmitState({
          status: "error",
          message:
            data.error ?? "Something went wrong while sending your message.",
        });
        return;
      }

      reset();
      setSubmitState({ status: "success" });
    } catch {
      setSubmitState({
        status: "error",
        message: "Network error. Check your connection and try again.",
      });
    }
  }, onInvalid);

  return (
    <form
      onSubmit={onSubmit}
      className="relative space-y-5"
      noValidate
      aria-labelledby="contact-form-heading"
    >
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

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name?.message} required>
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

        <Field id="email" label="Email" error={errors.email?.message} required>
          <input
            id="email"
            type="email"
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

      <Field
        id="subject"
        label="Subject"
        error={errors.subject?.message}
        required
      >
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
        required
      >
        <textarea
          id="message"
          rows={6}
          required
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(
            inputClassName(Boolean(errors.message)),
            "min-h-32 resize-y",
          )}
          {...register("message")}
        />
      </Field>

      {submitState.status === "success" ? (
        <p
          ref={statusRef}
          tabIndex={-1}
          role="status"
          className="border-accent/30 bg-accent/10 text-foreground rounded-md border px-4 py-3 text-sm outline-none"
        >
          Message sent. I will get back to you soon.
        </p>
      ) : null}

      {submitState.status === "error" ? (
        <p
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="border-destructive/30 bg-destructive/10 text-destructive rounded-md border px-4 py-3 text-sm outline-none"
        >
          {submitState.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 min-w-40 items-center justify-center rounded-md px-6 text-sm font-medium shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-foreground text-sm font-medium">
        {label}
        {required ? (
          <span className="text-destructive" aria-hidden>
            {" "}
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-destructive text-sm">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClassName(hasError: boolean) {
  return cn(
    "border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-ring min-h-11 w-full rounded-md border px-3 py-2.5 text-sm shadow-sm outline-none focus-visible:ring-2",
    hasError && "border-destructive",
  );
}
