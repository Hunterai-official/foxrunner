// ui.js — управляет элементами интерфейса (прелоадер, кнопка, экран)

export function initUI(startCallback) {
  const loader = document.getElementById('loader');
  const startBtn = document.getElementById('startBtn');

  // Показываем кнопку после загрузки
  if (startBtn) {
    startBtn.style.display = 'block';

    startBtn.addEventListener('click', () => {
      loader.style.display = 'none';
      startBtn.style.display = 'none';

      if (startCallback && typeof startCallback === 'function') {
        startCallback(); // запускаем игру
      }
    });
  }
}
