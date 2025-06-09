let display = document.getElementById('display');
let history = document.getElementById('history');
let memory = 0;

function flashDisplay() {
  display.classList.add('flash');
  setTimeout(() => display.classList.remove('flash'), 150);
}

function appendValue(value) {
  flashDisplay();
  if (display.textContent === '0' || display.textContent === 'Error') {
    display.textContent = value;
  } else {
    display.textContent += value;
  }
}

function clearDisplay() {
  flashDisplay();
  display.textContent = '0';
}

function calculate() {
  flashDisplay();
  try {
    let result = eval(display.textContent);
    history.innerHTML += `<div>${display.textContent} = ${result}</div>`;
    history.scrollTop = history.scrollHeight;
    display.textContent = result;
  } catch (e) {
    display.textContent = 'Error';
  }
}

function memoryStore() {
  flashDisplay();
  memory = parseFloat(display.textContent) || 0;
}

function memoryRecall() {
  flashDisplay();
  display.textContent = memory.toString();
}

function memoryClear() {
  flashDisplay();
  memory = 0;
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

document.addEventListener('keydown', function(event) {
  const key = event.key;
  if ((/\d/.test(key)) || ['+', '-', '*', '/', '.', '(', ')'].includes(key)) {
    appendValue(key);
  } else if (key === 'Enter') {
    event.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    display.textContent = display.textContent.slice(0, -1) || '0';
  } else if (key.toLowerCase() === 'c') {
    clearDisplay();
  }
});
