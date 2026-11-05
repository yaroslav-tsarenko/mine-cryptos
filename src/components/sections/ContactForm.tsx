import { useState, type FormEvent } from "react";
import { fakeRequest, required, validateEmail } from "../../lib/validate";
import { Button } from "../ui/Button";
import { Checkbox, TextArea, TextField } from "../ui/Field";
import { useToast } from "../ui/useToast";
import styles from "./ContactForm.module.css";

const SERVICES = ["100W+ Hosting Plans", "200W+ Hosting Plans", "1000W+ Hosting Plans", "Not Sure"];

type Values = { name: string; email: string; phone: string; message: string; services: string[] };
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { name: "", email: "", phone: "", message: "", services: [] };

function validate(v: Values): Errors {
  const e: Errors = {};
  e.name = required(v.name, "Name");
  e.email = validateEmail(v.email);
  if (v.phone && !/^[+\d][\d\s()-]{6,}$/.test(v.phone)) e.phone = "Please enter a valid phone number.";
  if (!v.message.trim()) e.message = "Please tell us how we can help.";
  else if (v.message.trim().length < 10) e.message = "Please add a little more detail (at least 10 characters).";
  if (!v.services.length) e.services = "Please choose at least one option.";
  return Object.fromEntries(Object.entries(e).filter(([, val]) => val)) as Errors;
}

export function ContactForm({ showFaqLink = true }: { showFaqLink?: boolean }) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const { notify } = useToast();

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleService = (s: string) =>
    set("services", values.services.includes(s) ? values.services.filter((x) => x !== s) : [...values.services, s]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      notify({ kind: "error", title: "Please check the form", description: "Some required fields need your attention." });
      return;
    }
    setBusy(true);
    await fakeRequest(true, 1100);
    setBusy(false);
    setSent(true);
    notify({ title: "Message sent", description: `Thanks, ${values.name.split(" ")[0]}! We'll reply within one business hour.` });
    setValues(EMPTY);
  };

  if (sent) {
    return (
      <div className={styles.success} role="status">
        <span className={styles.successIcon}>✓</span>
        <h3>Thanks — your message is on its way</h3>
        <p>A mining expert will reply to your email within one business hour. This is a demo, so no data was actually sent.</p>
        <Button variant="outline" onClick={() => setSent(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <div className={styles.row}>
        <TextField label="Name" required placeholder="Type Name" autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} error={errors.name} />
        <TextField label="Email" required type="email" placeholder="Type Email" autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} error={errors.email} />
      </div>
      <TextField label="Phone" type="tel" placeholder="Type Phone" autoComplete="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} error={errors.phone} hint="Optional" />
      <TextArea label="How can we help you?" required placeholder="Type Message" value={values.message} onChange={(e) => set("message", e.target.value)} error={errors.message} rows={4} />
      <fieldset className={styles.services} aria-invalid={!!errors.services || undefined}>
        <legend>
          Services <span className={styles.req}>*</span>
        </legend>
        <div className={styles.serviceGrid}>
          {SERVICES.map((s) => (
            <Checkbox key={s} label={s} checked={values.services.includes(s)} onChange={() => toggleService(s)} />
          ))}
        </div>
        {errors.services && <p className={styles.error}>{errors.services}</p>}
      </fieldset>
      <div className={styles.actions}>
        <Button type="submit" loading={busy} className={styles.submit}>
          Submit
        </Button>
        {showFaqLink && (
          <Button to="/faq" variant="link" icon="arrow-right" className={styles.faq}>
            View FAQ
          </Button>
        )}
      </div>
    </form>
  );
}
