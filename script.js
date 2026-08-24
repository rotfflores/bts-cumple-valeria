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
  playButton.textContent = '❚❚';
  playButton.setAttribute('aria-label', 'Pausar');
});

audio.addEventListener('pause', () => {
  playButton.textContent = '▶';
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

document.querySelector('#rsvpButton').addEventListener('click', () => {
  document.querySelector('#rsvpStatus').textContent = '¡Gracias! Tu confirmación quedó registrada ♥';
});
