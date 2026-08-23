export default function Home() {
  return (
    <main className="invitation-page">
      <section className="invitation-hero" aria-label="Invitación de cumpleaños de Valeria">
        <img className="hero-image" src="/bts-birthday-hero.png" alt="Siete personajes frente a un corazón luminoso en un concierto morado" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="invitation-copy">
          <h1 className="birthday-name">Valeria</h1>
        </div>
        <section className="date-card date-card--hero" aria-label="Fecha de la celebración">
          <time dateTime="2026-11-14">
            <span>14</span><i aria-hidden="true">•</i><span>Noviembre</span><i aria-hidden="true">•</i><span>2026</span>
          </time>
        </section>
      </section>
    </main>
  );
}
