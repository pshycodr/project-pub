   // Timer Settings
   const TIMER_MODES = {
    FOCUS: { minutes: 25, seconds: 0, label: 'Focus' },
    SHORT_BREAK: { minutes: 5, seconds: 0, label: 'Short Break' },
    LONG_BREAK: { minutes: 15, seconds: 0, label: 'Long Break' }
};

// DOM Elements
const elements = {
    timer: document.querySelector(".TStimer"),
    startButton: document.querySelector(".countDodown-start-button"),
    endButton: document.querySelector(".countDodown-end-button"),
    settingsIcon: document.querySelector(".settings-icon"),
    minutesInput: document.querySelector("#minutesInput"),
    secondsInput: document.querySelector("#secondsInput"),
    timerSettingsModal: document.querySelector(".TStimerInputContainer"),
    todoInput: document.querySelector("#Todo"),
    todoList: document.querySelector(".AllTodoUl"),
    todoModal: document.querySelector(".todoInputContainer"),
    addTaskButton: document.querySelector(".AddTaskButton"),
    modeBtns: document.querySelectorAll(".TSnav > div:not(.settings-icon)")
};

// Timer State
let timerState = {
    minutes: TIMER_MODES.FOCUS.minutes,
    seconds: TIMER_MODES.FOCUS.seconds,
    isRunning: false,
    intervalId: null,
    currentMode: 'FOCUS'
};

// Format time to display
function formatTime(minutes, seconds) {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Update timer display
function updateTimerDisplay() {
    elements.timer.textContent = formatTime(timerState.minutes, timerState.seconds);
}

// Timer control functions
function startTimer() {
    if (timerState.isRunning) return;

    timerState.isRunning = true;
    elements.startButton.textContent = "Pause";
    elements.endButton.style.display = "inline";

    timerState.intervalId = setInterval(() => {
        if (timerState.seconds === 0) {
            if (timerState.minutes === 0) {
                handleTimerComplete();
                return;
            }
            timerState.minutes--;
            timerState.seconds = 59;
        } else {
            timerState.seconds--;
        }
        updateTimerDisplay();
    }, 1000);
}

function pauseTimer() {
    if (!timerState.isRunning) return;

    clearInterval(timerState.intervalId);
    timerState.isRunning = false;
    elements.startButton.textContent = "Resume";
}

function stopTimer() {
    clearInterval(timerState.intervalId);
    timerState.isRunning = false;
    elements.startButton.textContent = "Start";
    elements.endButton.style.display = "none";

    // Reset to current mode's default time
    resetTimer();
}

function resetTimer() {
    timerState.minutes = TIMER_MODES[timerState.currentMode].minutes;
    timerState.seconds = TIMER_MODES[timerState.currentMode].seconds;
    updateTimerDisplay();
}

function handleTimerComplete() {
    stopTimer();
    // Play notification sound or show notification here
    alert("Timer completed!");
}

// Mode switching
function switchMode(mode) {
    timerState.currentMode = mode;
    stopTimer();
    resetTimer();

    // Update UI
    elements.modeBtns.forEach(btn => {
        btn.classList.remove('focus');
        if (btn.textContent === TIMER_MODES[mode].label) {
            btn.classList.add('focus');
        }
    });
}

// Timer Settings Modal
function showTimerSettings() {
    elements.minutesInput.value = timerState.minutes;
    elements.secondsInput.value = timerState.seconds;
    elements.timerSettingsModal.style.display = "flex";
}

function applyTimerSettings() {
    const minutes = parseInt(elements.minutesInput.value) || 0;
    const seconds = parseInt(elements.secondsInput.value) || 0;

    if (minutes >= 0 && seconds >= 0 && seconds < 60) {
        timerState.minutes = minutes;
        timerState.seconds = seconds;
        updateTimerDisplay();
    }

    elements.timerSettingsModal.style.display = "none";
}

// Todo functionality
function addTodo(text) {
    if (text.trim() === "") return;

    const newTodo = document.createElement("li");
    newTodo.className = "todo-item";
    const checkboxId = `task-${Date.now()}`;

    newTodo.innerHTML = `
<input type="checkbox" id="${checkboxId}">
<label for="${checkboxId}">${text}</label>
`;

    elements.todoList.appendChild(newTodo);
}

// Event Listeners
elements.startButton.addEventListener('click', () => {
    if (!timerState.isRunning) {
        startTimer();
    } else {
        pauseTimer();
    }
});

elements.endButton.addEventListener('click', stopTimer);

elements.settingsIcon.addEventListener('click', showTimerSettings);

// Mode switching listeners
elements.modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const mode = btn.textContent.toUpperCase().replace('-', '_');
        if (TIMER_MODES[mode]) {
            switchMode(mode);
        }
    });
});

// Timer Settings Modal
document.querySelector(".apply").addEventListener('click', (e) => {
    e.preventDefault();
    applyTimerSettings();
});

document.querySelector(".cancel").addEventListener('click', () => {
    elements.timerSettingsModal.style.display = "none";
});

// Todo Modal
elements.addTaskButton.addEventListener("click", () => {
    elements.todoModal.style.display = "flex";
    elements.todoInput.focus();
});

document.querySelector(".TododInputSubmit").addEventListener('click', () => {
    addTodo(elements.todoInput.value);
    elements.todoInput.value = "";
    elements.todoModal.style.display = "none";
});

document.querySelector(".TododInputCancel").addEventListener('click', () => {
    elements.todoModal.style.display = "none";
});

// Handle enter key in todo input
elements.todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo(elements.todoInput.value);
        elements.todoInput.value = "";
        elements.todoModal.style.display = "none";
    }
});

// Modal outside click handlers
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Initialize the app
updateTimerDisplay();