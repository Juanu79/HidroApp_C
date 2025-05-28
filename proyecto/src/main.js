import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

// Variables de estado
let dailyCount = 0;
let dailyGoal = 8;
let interval = 2; // horas
let startTime = "07:00";
let endTime = "22:00";
let history = [];

// Elementos del DOM
const dailyCountEl = document.getElementById('dailyCount');
const dailyGoalEl = document.getElementById('dailyGoal');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const addWaterBtn = document.getElementById('addWaterBtn');
const showHistoryBtn = document.getElementById('showHistoryBtn');
const showSettingsBtn = document.getElementById('showSettingsBtn');
const testNotificationBtn = document.getElementById('testNotificationBtn');
const nextReminderEl = document.getElementById('nextReminder');
const intervalDisplay = document.getElementById('intervalDisplay');

// Modales
const settingsModal = document.getElementById('settingsModal');
const historyModal = document.getElementById('historyModal');
const confirmModal = document.getElementById('confirmModal');
const notification = document.getElementById('notification');

// Inputs de configuración
const goalInput = document.getElementById('goalInput');
const intervalInput = document.getElementById('intervalInput');
const startTimeInput = document.getElementById('startTimeInput');
const endTimeInput = document.getElementById('endTimeInput');

// Botones de los modales
const cancelSettingsBtn = document.getElementById('cancelSettingsBtn');
const saveSettingsBtn = document.getElementById('saveSettingsBtn');
const closeHistoryBtn = document.getElementById('closeHistoryBtn');
const closeConfirmBtn = document.getElementById('closeConfirmBtn');

// Actualiza la UI
function updateUI() {
  dailyCountEl.textContent = dailyCount;
  dailyGoalEl.textContent = dailyGoal;
  let percent = Math.min(100, Math.round((dailyCount / dailyGoal) * 100));
  progressFill.style.width = percent + "%";
  progressText.textContent = `${percent}% completado`;
  intervalDisplay.textContent = `${interval} horas`;
}

// Agregar vaso
addWaterBtn.addEventListener('click', () => {
  dailyCount++;
  history.push(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
  updateUI();
  showModal(confirmModal);
});

// Mostrar historial
showHistoryBtn.addEventListener('click', () => {
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = history.length
    ? history.map(time => `<div>${time}</div>`).join('')
    : `<div style="text-align: center; color: #6B7280; padding: 20px;">No hay registros aún</div>`;
  showModal(historyModal);
});

// Mostrar configuración
showSettingsBtn.addEventListener('click', () => {
  goalInput.value = dailyGoal;
  intervalInput.value = interval;
  startTimeInput.value = startTime;
  endTimeInput.value = endTime;
  showModal(settingsModal);
});

// Guardar configuración
saveSettingsBtn.addEventListener('click', () => {
  dailyGoal = parseInt(goalInput.value, 10);
  interval = parseFloat(intervalInput.value);
  startTime = startTimeInput.value;
  endTime = endTimeInput.value;
  updateUI();
  closeModal(settingsModal);
});

// Cancelar configuración
cancelSettingsBtn.addEventListener('click', () => closeModal(settingsModal));

// Cerrar historial
closeHistoryBtn.addEventListener('click', () => closeModal(historyModal));

// Cerrar confirmación
closeConfirmBtn.addEventListener('click', () => closeModal(confirmModal));

// Probar notificación
testNotificationBtn.addEventListener('click', () => showNotification("¡Es hora de beber agua! 💧"));

// Modal helpers
function showModal(modal) {
  modal.style.display = 'flex';
}
function closeModal(modal) {
  modal.style.display = 'none';
}

// Notificación
function showNotification(msg) {
  notification.style.display = 'block';
  document.getElementById('notificationText').textContent = msg;
  setTimeout(() => {
    notification.style.display = 'none';
  }, 2000);
}

// Inicializa la UI
updateUI();
