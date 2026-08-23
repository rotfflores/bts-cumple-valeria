const eventDate = new Date('2026-11-14T19:00:00-06:00');

function updateCountdown() {
  const remaining = Math.max(0, eventDate.getTime() - Date.now());
  const totalMinutes = Math.floor(remaining / 60000);
  document.querySelector('#days').textContent = String(Math.floor(totalMinutes / 1440)).padStart(2, '0');
  document.querySelector('#hours').textContent = String(Math.floor((totalMinutes % 1440) / 60)).padStart(2, '0');
  document.querySelector('#minutes').textContent = String(totalMinutes % 60).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 60000);

document.querySelector('#playButton').addEventListener('click', (event) => {
  const playing = event.currentTarget.dataset.playing === 'true';
  event.currentTarget.dataset.playing = String(!playing);
  event.currentTarget.textContent = playing ? '▶' : '❚❚';
  event.currentTarget.setAttribute('aria-label', playing ? 'Reproducir' : 'Pausar');
});

document.querySelector('#songForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const value = document.querySelector('#songInput').value.trim();
  document.querySelector('#songStatus').textContent = value ? '¡Canción guardada! ♥' : 'Escribe una canción primero.';
});

document.querySelector('#rsvpButton').addEventListener('click', () => {
  document.querySelector('#rsvpStatus').textContent = '¡Gracias! Tu confirmación quedó registrada ♥';
});
