import { useState } from "react";
import {
  Button,
  LinkButton,
  Badge,
  Avatar,
  Icon,
  FormField,
  Card,
  Disclosure,
  Alert,
  tokens,
} from "@kieksme/csp-ui";
export function ComponentPlayground({
  locale,
  download,
}: {
  locale: "de" | "en";
  download: string;
}) {
  const en = locale === "en";
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  return (
    <div className="ui-catalogue">
      <section aria-labelledby="ui-actions">
        <h2 id="ui-actions">
          {en ? "Actions and states" : "Aktionen und Zustände"}
        </h2>
        <div className="ui-demo-row">
          <Button onClick={() => setCount((value) => value + 1)}>
            {en ? "Try button" : "Button ausprobieren"}
          </Button>
          <Button variant="secondary">{en ? "Secondary" : "Sekundär"}</Button>
          <Button variant="light" isDisabled>
            {en ? "Disabled" : "Deaktiviert"}
          </Button>
          <Button isLoading>{en ? "Loading" : "Lädt"}</Button>
          <LinkButton href={download}>
            {en ? "Download package" : "Paket herunterladen"}
          </LinkButton>
        </div>
        <p data-demo-counter>
          {en ? "Clicks" : "Klicks"}: {count}
        </p>
      </section>
      <section aria-labelledby="ui-feedback">
        <h2 id="ui-feedback">
          {en ? "Feedback and identity" : "Rückmeldung und Identität"}
        </h2>
        <div className="ui-demo-row">
          <Badge>Neutral</Badge>
          <Badge tone="accent">CSP</Badge>
          <Badge tone="success">{en ? "Available" : "Verfügbar"}</Badge>
          <Badge tone="warning">{en ? "Pending" : "Ausstehend"}</Badge>
          <Avatar name="Lena Beispiel" />
          <Icon name="contact" label={en ? "Contact" : "Kontakt"} />
        </div>
        <Alert
          title={en ? "A shared design system" : "Ein gemeinsames Designsystem"}
        >
          {en
            ? "React and Astro use the same components and tokens."
            : "React und Astro verwenden dieselben Komponenten und Tokens."}
        </Alert>
      </section>
      <section aria-labelledby="ui-input">
        <h2 id="ui-input">
          {en ? "Accessible fields" : "Zugängliche Eingabefelder"}
        </h2>
        <FormField
          id="demo-name"
          label={en ? "Your name" : "Ihr Name"}
          description={
            en
              ? "This demo sends no data."
              : "Diese Demo versendet keine Daten."
          }
          inputProps={{
            value: name,
            onChange: (event) => setName(event.target.value),
            autoComplete: "off",
          }}
        />
        <FormField
          id="demo-error"
          label={en ? "Example with an error" : "Beispiel mit Fehler"}
          error={
            en
              ? "Please enter a valid value."
              : "Bitte einen gültigen Wert eingeben."
          }
          inputProps={{ defaultValue: "", autoComplete: "off" }}
        />
        <p data-demo-name>
          {name
            ? en
              ? `Hello ${name}`
              : `Hallo ${name}`
            : en
              ? "Enter a name to try the controlled field."
              : "Geben Sie einen Namen ein, um das gesteuerte Feld auszuprobieren."}
        </p>
      </section>
      <section aria-labelledby="ui-composition">
        <h2 id="ui-composition">
          {en ? "Composed components" : "Zusammengesetzte Komponenten"}
        </h2>
        <div className="ui-demo-grid">
          <Card
            icon="kuma"
            title={en ? "Service status" : "Servicestatus"}
            description={
              en
                ? "Synthetic content for this component demo."
                : "Synthetischer Inhalt für diese Komponenten-Demo."
            }
          >
            <Badge tone="success">OK</Badge>
          </Card>
          <Card
            icon="chat"
            title={en ? "Support" : "Support"}
            description={
              en
                ? "Components have no provider or business logic."
                : "Komponenten enthalten keine Provider- oder Geschäftslogik."
            }
          />
        </div>
        <Disclosure
          question={
            en
              ? "Does this disclosure need JavaScript?"
              : "Benötigt dieser Aufklappbereich JavaScript?"
          }
        >
          {en
            ? "No. It uses native details/summary elements."
            : "Nein. Er verwendet native details-/summary-Elemente."}
        </Disclosure>
      </section>
      <section aria-labelledby="ui-tokens">
        <h2 id="ui-tokens">
          {en ? "Corporate identity tokens" : "Corporate-Identity-Tokens"}
        </h2>
        <div className="ui-demo-row">
          {Object.entries(tokens.colors).map(([key, value]) => (
            <div key={key} className="ui-token">
              <span style={{ background: value }}></span>
              <strong>{key}</strong>
              <code>{value}</code>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
