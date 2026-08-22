export default function Home() {
  return (
    <main className="invitation-page">
      <section className="invitation-hero" aria-label="Invitación de cumpleaños de Valeria">
        <img className="hero-image" src="/bts-birthday-hero.png" alt="Siete personajes frente a un corazón luminoso en un concierto morado" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="invitation-copy">
          <h1 className="birthday-name">Valeria</h1>
        </div>
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
