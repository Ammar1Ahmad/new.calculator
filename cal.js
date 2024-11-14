function showCalculator(calculatorType) {
    const standardCalculator = document.getElementById('standard');
    const birthdateCalculator = document.getElementById('birthdate');
    const tabButtons = document.querySelectorAll('.tab-button');

    // Hide all sections and remove active class
    standardCalculator.classList.remove('active');
    birthdateCalculator.classList.remove('active');
    tabButtons.forEach(button => button.classList.remove('active'));

    // Show selected calculator and add active class
    if (calculatorType === 'standard') {
        standardCalculator.classList.add('active');
        tabButtons[0].classList.add('active');
    } else {
        birthdateCalculator.classList.add('active');
        tabButtons[1].classList.add('active');
    }
}

function insert(value) {
    document.getElementById("display").value += value;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function backspace() {
    let display = document.getElementById("display").value;
    document.getElementById("display").value = display.slice(0, -1);
}

function calculate() {
    let display = document.getElementById("display").value;
    try {
        display = display.replace(/√/g, "Math.sqrt").replace(/sin/g, "Math.sin")
            .replace(/cos/g, "Math.cos").replace(/tan/g, "Math.tan")
            .replace(/log/g, "Math.log10").replace(/\^/g, "**");
        document.getElementById("display").value = eval(display);
    } catch (error) {
        document.getElementById("display").value = "Error";
    }
}

function calculateAge() {
    const birthdate = document.getElementById("birthdate-input").value;
    if (!birthdate) {
        document.getElementById("age-output").textContent = "Please enter a valid date.";
        return;
    }

    const birthDateObj = new Date(birthdate);
    const now = new Date();
    let years = now.getFullYear() - birthDateObj.getFullYear();
    let months = now.getMonth() - birthDateObj.getMonth();
    let days = now.getDate() - birthDateObj.getDate();
    let hours = now.getHours() - birthDateObj.getHours();
    let minutes = now.getMinutes() - birthDateObj.getMinutes();
    let seconds = now.getSeconds() - birthDateObj.getSeconds();

    if (seconds < 0) { seconds += 60; minutes -= 1; }
    if (minutes < 0) { minutes += 60; hours -= 1; }
    if (hours < 0) { hours += 24; days -= 1; }
    if (days < 0) { months -= 1; const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0); days += previousMonth.getDate(); }
    if (months < 0) { months += 12; years -= 1; }

    document.getElementById("age-output").textContent = 
        `Age: ${years} Years, ${months} Months, ${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`;
}
