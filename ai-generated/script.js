// Calculator Application Logic
document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const resultDisplay = document.getElementById('result-display');
  const expressionDisplay = document.getElementById('expression-display');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const modeToggleBtn = document.getElementById('mode-toggle-btn');
  const historyToggleBtn = document.getElementById('history-toggle-btn');
  const historyDrawer = document.getElementById('history-drawer');
  const closeHistoryBtn = document.getElementById('close-history-btn');
  const clearHistoryBtn = document.getElementById('clear-history-btn');
  const historyList = document.getElementById('history-list');
  const scientificKeypad = document.getElementById('scientific-keypad');
  const degRadBtn = document.getElementById('deg-rad-btn');
  const angleUnitBadge = document.getElementById('angle-unit-badge');
  const memoryBadge = document.getElementById('memory-badge');
  const copyTrigger = document.getElementById('copy-trigger');
  const copyToast = document.getElementById('copy-toast');
  const calcContainer = document.querySelector('.calculator-container');
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');

  // State Variables
  let currentInput = '0';
  let expression = '';
  let memoryValue = 0;
  let isRadian = false;
  let calculationDone = false;
  let history = JSON.parse(localStorage.getItem('calc_history') || '[]');

  // Initialize
  initTheme();
  renderHistory();
  updateMemoryBadge();

  // Event Listeners for Buttons
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const action = button.dataset.action;
      const value = button.dataset.value;
      handleInput(action, value, button);
    });
  });

  // Theme Toggle
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('calc_theme', newTheme);
    updateThemeIcons(newTheme);
  });

  function initTheme() {
    const savedTheme = localStorage.getItem('calc_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);
  }

  function updateThemeIcons(theme) {
    if (theme === 'light') {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    } else {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  }

  // Scientific Mode Toggle
  modeToggleBtn.addEventListener('click', () => {
    scientificKeypad.classList.toggle('hidden');
    calcContainer.classList.toggle('scientific-active');
  });

  // DEG / RAD Toggle
  degRadBtn.addEventListener('click', () => {
    isRadian = !isRadian;
    degRadBtn.textContent = isRadian ? 'RAD' : 'DEG';
    angleUnitBadge.textContent = isRadian ? 'RAD' : 'DEG';
    angleUnitBadge.classList.toggle('hidden', !isRadian && false); // show status
  });

  // History Drawer Toggle
  historyToggleBtn.addEventListener('click', () => {
    historyDrawer.classList.add('open');
  });

  closeHistoryBtn.addEventListener('click', () => {
    historyDrawer.classList.remove('open');
  });

  clearHistoryBtn.addEventListener('click', () => {
    history = [];
    localStorage.removeItem('calc_history');
    renderHistory();
  });

  // Copy Result to Clipboard
  copyTrigger.addEventListener('click', () => {
    if (!resultDisplay.textContent) return;
    navigator.clipboard.writeText(resultDisplay.textContent).then(() => {
      copyToast.classList.add('show');
      setTimeout(() => copyToast.classList.remove('show'), 1800);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  });

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
      handleInput(null, e.key);
    } else if (e.key === '.') {
      handleInput(null, '.');
    } else if (e.key === '+') {
      handleInput('operator', '+');
    } else if (e.key === '-') {
      handleInput('operator', '-');
    } else if (e.key === '*') {
      handleInput('operator', '×');
    } else if (e.key === '/') {
      e.preventDefault();
      handleInput('operator', '÷');
    } else if (e.key === '%') {
      handleInput('operator', '%');
    } else if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      handleInput('calculate');
    } else if (e.key === 'Backspace') {
      handleInput('backspace');
    } else if (e.key === 'Escape') {
      handleInput('clear-all');
    } else if (e.key === '(' || e.key === ')') {
      handleInput('insert', e.key);
    } else if (e.key === '^') {
      handleInput('operator', '^');
    }
  });

  // Input Handler Core Logic
  function handleInput(action, value, buttonEl = null) {
    if (buttonEl) {
      buttonEl.classList.add('active');
      setTimeout(() => buttonEl.classList.remove('active'), 150);
    }

    if (!action && value !== undefined) {
      // Number or Decimal input
      if (calculationDone) {
        currentInput = value === '.' ? '0.' : value;
        expression = '';
        calculationDone = false;
      } else {
        if (value === '.') {
          if (!currentInput.includes('.')) {
            currentInput += '.';
          }
        } else {
          if (currentInput === '0') {
            currentInput = value;
          } else {
            currentInput += value;
          }
        }
      }
      updateDisplay();
      return;
    }

    switch (action) {
      case 'clear-all':
        currentInput = '0';
        expression = '';
        calculationDone = false;
        break;

      case 'backspace':
        if (calculationDone) {
          currentInput = '0';
          expression = '';
          calculationDone = false;
        } else {
          if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
          } else {
            currentInput = '0';
          }
        }
        break;

      case 'negate':
        if (currentInput !== '0') {
          if (currentInput.startsWith('-')) {
            currentInput = currentInput.substring(1);
          } else {
            currentInput = '-' + currentInput;
          }
        }
        break;

      case 'operator':
        if (calculationDone) {
          expression = currentInput + ' ' + value + ' ';
          currentInput = '0';
          calculationDone = false;
        } else {
          if (currentInput !== '0' || expression === '') {
            expression += currentInput + ' ' + value + ' ';
            currentInput = '0';
          } else if (expression.length > 0) {
            // Replace last operator
            expression = expression.trim().replace(/[\+\−\-\×\÷\^%]+$/, value) + ' ';
          }
        }
        break;

      case 'insert':
        if (calculationDone) {
          expression = value;
          currentInput = '0';
          calculationDone = false;
        } else {
          if (currentInput !== '0') {
            expression += currentInput + value;
            currentInput = '0';
          } else {
            expression += value;
          }
        }
        break;

      case 'constant':
        if (value === 'π') {
          currentInput = Math.PI.toString();
        } else if (value === 'e') {
          currentInput = Math.E.toString();
        }
        if (calculationDone) {
          expression = '';
          calculationDone = false;
        }
        break;

      case 'func':
        applyFunction(value);
        break;

      case 'memory':
        handleMemory(value);
        break;

      case 'calculate':
        executeCalculation();
        break;

      case 'deg-rad':
        break;
    }

    updateDisplay();
  }

  // Scientific Functions Handler
  function applyFunction(func) {
    let val = parseFloat(currentInput);
    if (isNaN(val)) return;

    let result = 0;
    let funcSymbol = '';

    switch (func) {
      case 'sin':
        let angleSin = isRadian ? val : (val * Math.PI) / 180;
        result = Math.sin(angleSin);
        funcSymbol = `sin(${val})`;
        break;
      case 'cos':
        let angleCos = isRadian ? val : (val * Math.PI) / 180;
        result = Math.cos(angleCos);
        funcSymbol = `cos(${val})`;
        break;
      case 'tan':
        let angleTan = isRadian ? val : (val * Math.PI) / 180;
        result = Math.tan(angleTan);
        funcSymbol = `tan(${val})`;
        break;
      case 'sqrt':
        if (val < 0) {
          currentInput = 'Error';
          updateDisplay();
          return;
        }
        result = Math.sqrt(val);
        funcSymbol = `√(${val})`;
        break;
      case 'sqr':
        result = Math.pow(val, 2);
        funcSymbol = `sqr(${val})`;
        break;
      case 'ln':
        if (val <= 0) {
          currentInput = 'Error';
          updateDisplay();
          return;
        }
        result = Math.log(val);
        funcSymbol = `ln(${val})`;
        break;
      case 'log':
        if (val <= 0) {
          currentInput = 'Error';
          updateDisplay();
          return;
        }
        result = Math.log10(val);
        funcSymbol = `log(${val})`;
        break;
      case 'fact':
        if (val < 0 || !Number.isInteger(val)) {
          currentInput = 'Error';
          updateDisplay();
          return;
        }
        result = factorial(val);
        funcSymbol = `${val}!`;
        break;
      case 'recip':
        if (val === 0) {
          currentInput = 'Error';
          updateDisplay();
          return;
        }
        result = 1 / val;
        funcSymbol = `1/(${val})`;
        break;
    }

    result = cleanResult(result);
    currentInput = result.toString();
    calculationDone = true;
    saveToHistory(funcSymbol, currentInput);
  }

  function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  }

  // Memory Handlers
  function handleMemory(action) {
    const val = parseFloat(currentInput) || 0;
    switch (action) {
      case 'mc':
        memoryValue = 0;
        break;
      case 'mr':
        currentInput = memoryValue.toString();
        break;
      case 'm+':
        memoryValue += val;
        break;
      case 'm-':
        memoryValue -= val;
        break;
    }
    updateMemoryBadge();
  }

  function updateMemoryBadge() {
    if (memoryValue !== 0) {
      memoryBadge.classList.remove('hidden');
    } else {
      memoryBadge.classList.add('hidden');
    }
  }

  // Calculate Function
  function executeCalculation() {
    let fullExpr = expression + (currentInput !== '0' || expression === '' ? currentInput : '');
    fullExpr = fullExpr.trim();

    if (!fullExpr) return;

    try {
      // Replace display symbols with JS math syntax
      let evalExpr = fullExpr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-')
        .replace(/\^/g, '**');

      // Evaluate safely
      let rawResult = Function(`"use strict"; return (${evalExpr})`)();
      
      if (typeof rawResult === 'number' && !isNaN(rawResult) && isFinite(rawResult)) {
        let formattedResult = cleanResult(rawResult);
        saveToHistory(fullExpr, formattedResult);
        expression = fullExpr + ' =';
        currentInput = formattedResult.toString();
        calculationDone = true;
      } else {
        currentInput = 'Error';
        calculationDone = true;
      }
    } catch (err) {
      currentInput = 'Error';
      calculationDone = true;
    }
    updateDisplay();
  }

  function cleanResult(num) {
    if (Math.abs(num) < 1e-12 && num !== 0) return 0;
    // Round to 10 decimal places to eliminate floating point issues
    let fixed = Number(num.toFixed(10));
    return fixed;
  }

  // Display Updates & Auto Font Scaling
  function updateDisplay() {
    expressionDisplay.textContent = expression;
    resultDisplay.textContent = formatDisplayNumber(currentInput);

    // Dynamic Font Scaling
    const len = resultDisplay.textContent.length;
    if (len > 14) {
      resultDisplay.style.fontSize = '1.3rem';
    } else if (len > 10) {
      resultDisplay.style.fontSize = '1.6rem';
    } else if (len > 7) {
      resultDisplay.style.fontSize = '1.9rem';
    } else {
      resultDisplay.style.fontSize = '2.25rem';
    }
  }

  function formatDisplayNumber(valStr) {
    if (valStr === 'Error') return 'Error';
    if (valStr.endsWith('.')) return valStr;
    const parts = valStr.split('.');
    const integerPart = parts[0];
    const decimalPart = parts.length > 1 ? '.' + parts[1] : '';

    // Add comma separators for large integer parts
    if (!isNaN(integerPart) && integerPart.length <= 15) {
      const formattedInt = Number(integerPart).toLocaleString('en-US');
      return formattedInt + decimalPart;
    }
    return valStr;
  }

  // History Functions
  function saveToHistory(expr, res) {
    const item = { expression: expr, result: res, timestamp: Date.now() };
    history.unshift(item);
    if (history.length > 30) history.pop();
    localStorage.setItem('calc_history', JSON.stringify(history));
    renderHistory();
  }

  function renderHistory() {
    if (history.length === 0) {
      historyList.innerHTML = '<div class="empty-history">No calculations yet</div>';
      return;
    }

    historyList.innerHTML = '';
    history.forEach(item => {
      const el = document.createElement('div');
      el.className = 'history-item';
      el.innerHTML = `
        <div class="history-item-exp">${item.expression}</div>
        <div class="history-item-res">${item.result}</div>
      `;
      el.addEventListener('click', () => {
        currentInput = item.result.toString();
        calculationDone = false;
        updateDisplay();
        historyDrawer.classList.remove('open');
      });
      historyList.appendChild(el);
    });
  }
});
