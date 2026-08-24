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

const audio = document.querySelector('#birthdayAudio');
const playButton = document.querySelector('#playButton');
const audioProgress = document.querySelector('#audioProgress');

function renderAudioProgress() {
  const progress = Number.isFinite(audio.duration) && audio.duration > 0 ? (audio.currentTime / audio.duration) * 100 : 0;
  audioProgress.value = String(progress);
  audioProgress.style.setProperty('--progress', `${progress}%`);
}

playButton.addEventListener('click', async () => {
  if (audio.paused) {
    await audio.play();
  } else {
    audio.pause();
  }
});

audio.addEventListener('play', () => {
  playButton.classList.add('is-playing');
  playButton.setAttribute('aria-label', 'Pausar');
});

audio.addEventListener('pause', () => {
  playButton.classList.remove('is-playing');
  playButton.setAttribute('aria-label', 'Reproducir');
});

audio.addEventListener('timeupdate', renderAudioProgress);
audio.addEventListener('loadedmetadata', renderAudioProgress);
audio.addEventListener('ended', renderAudioProgress);

audioProgress.addEventListener('input', () => {
  if (Number.isFinite(audio.duration)) audio.currentTime = (Number(audioProgress.value) / 100) * audio.duration;
  renderAudioProgress();
});

document.querySelector('#restartButton').addEventListener('click', () => {
  audio.currentTime = 0;
  renderAudioProgress();
});

document.querySelector('#forwardButton').addEventListener('click', () => {
  if (Number.isFinite(audio.duration)) audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
  renderAudioProgress();
});

document.querySelector('#songForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const value = document.querySelector('#songInput').value.trim();
  document.querySelector('#songStatus').textContent = value ? '¡Canción guardada! ♥' : 'Escribe una canción primero.';
});

const rsvpCard = document.querySelector('.rsvp-card');
const rsvpButton = document.querySelector('#rsvpButton');
const rsvpForm = document.querySelector('#rsvpForm');
const rsvpFormPanel = document.querySelector('#rsvpFormPanel');
const rsvpStatus = document.querySelector('#rsvpStatus');

rsvpButton.addEventListener('click', () => {
  const expanded = rsvpCard.classList.toggle('is-expanded');
  rsvpButton.setAttribute('aria-expanded', String(expanded));
  rsvpButton.querySelector('span').textContent = expanded ? 'Cerrar formulario' : 'Confirmar asistencia';
  rsvpFormPanel.style.maxHeight = expanded ? `${rsvpFormPanel.scrollHeight + 24}px` : '0px';
  rsvpFormPanel.style.opacity = expanded ? '1' : '0';
  rsvpFormPanel.style.transform = expanded ? 'translateY(0)' : 'translateY(-10px)';
  rsvpStatus.textContent = '';
  if (expanded) setTimeout(() => document.querySelector('#guestName').focus(), 360);
});

rsvpForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#guestName').value.trim();
  const response = document.querySelector('#attendance').value;
  rsvpStatus.textContent = name ? `¡Gracias, ${name}! Registramos: ${response} ♥` : 'Escribe tu nombre para confirmar.';
});

const galleryLightbox = document.querySelector('#galleryLightbox');
const lightboxImage = document.querySelector('#lightboxImage');
const lightboxClose = document.querySelector('#lightboxClose');
let lightboxTimer;

function openGalleryImage(button) {
  clearTimeout(lightboxTimer);
  const preview = button.querySelector('img');
  lightboxImage.src = button.dataset.gallerySrc;
  lightboxImage.alt = preview.alt;
  galleryLightbox.classList.remove('is-closing');
  galleryLightbox.classList.add('is-open');
  galleryLightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
  lightboxClose.focus();
}

function closeGalleryImage() {
  if (!galleryLightbox.classList.contains('is-open')) return;
  galleryLightbox.classList.remove('is-open');
  galleryLightbox.classList.add('is-closing');
  galleryLightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
  lightboxTimer = setTimeout(() => {
    galleryLightbox.classList.remove('is-closing');
    lightboxImage.src = '';
  }, 420);
}

document.querySelectorAll('[data-gallery-src]').forEach((button) => {
  button.addEventListener('click', () => openGalleryImage(button));
});

lightboxClose.addEventListener('click', closeGalleryImage);
galleryLightbox.addEventListener('click', (event) => {
  if (event.target === galleryLightbox) closeGalleryImage();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeGalleryImage();
});
