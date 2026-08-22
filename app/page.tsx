export default function Home() {
  return (
    <main className="invitation-hero">
      <div className="hero-shade" aria-hidden="true" />
      <section className="invitation-copy" aria-labelledby="birthday-title">
        <p className="bts-mark" aria-label="BTS">&#x25e2;&#x25e3;</p>
        <h1 id="birthday-title">Cumpleaños</h1>
        <p className="birthday-name">Valeria</p>
      </section>
      <section className="date-card" aria-label="Fecha de la celebración">
        <span className="date-label">Celebremos juntos</span>
        <time dateTime="2026-11-14">
          <strong>14</strong><span className="date-divider" aria-hidden="true" />
          <span className="date-month">Noviembre</span><span className="date-year">2026</span>
        </time>
      </section>
    </main>
  );
}
