// ---------- Get elements from the HTML page ----------
var heightInput = document.getElementById("height");
var weightInput = document.getElementById("weight");
var calcBtn = document.getElementById("calcBtn");
var resetBtn = document.getElementById("resetBtn");
var errorText = document.getElementById("error");
var resultBox = document.getElementById("result");
var bmiValue = document.getElementById("bmiValue");
var categoryText = document.getElementById("category");
var messageText = document.getElementById("message");
var card = document.querySelector(".card");

// The four boxes of the BMI scale
var scaleUnder = document.getElementById("underweight");
var scaleNormal = document.getElementById("normal");
var scaleOver = document.getElementById("overweight");
var scaleObese = document.getElementById("obese");

// ---------- Function to calculate BMI ----------
function calculateBMI() {
  // Read values typed by the user
  var heightCm = parseFloat(heightInput.value);
  var weightKg = parseFloat(weightInput.value);

  // Clear old error and old scale highlight
  errorText.textContent = "";
  clearScale();

  // ---------- Input validation ----------
  if (heightInput.value === "" || weightInput.value === "") {
    showError("Please enter both height and weight.");
    return;
  }

  if (isNaN(heightCm) || isNaN(weightKg)) {
    showError("Please enter valid numbers only.");
    return;
  }

  if (heightCm <= 0 || weightKg <= 0) {
    showError("Height and weight must be greater than zero.");
    return;
  }

  if (heightCm < 50 || heightCm > 300) {
    showError("Please enter a realistic height (50 - 300 cm).");
    return;
  }

  if (weightKg > 500) {
    showError("Please enter a realistic weight (up to 500 kg).");
    return;
  }

  // ---------- BMI formula ----------
  var heightM = heightCm / 100; // convert cm to meters
  var bmi = weightKg / (heightM * heightM);
  bmi = bmi.toFixed(1); // keep 1 digit after decimal

  // ---------- Find category using if-else ----------
  var category = "";
  var message = "";
  var colorClass = "";

  if (bmi < 18.5) {
    category = "Underweight";
    message = "You are a little below the healthy range. Eat nutritious food and stay strong! 🍎";
    colorClass = "color-under";
    scaleUnder.classList.add("active");
  } else if (bmi < 25) {
    category = "Normal Weight";
    message = "Great job! You are in the healthy range. Keep up the good habits! 🎉";
    colorClass = "color-normal";
    scaleNormal.classList.add("active");
  } else if (bmi < 30) {
    category = "Overweight";
    message = "You are slightly above the healthy range. Regular exercise and a balanced diet can help! 🚶";
    colorClass = "color-over";
    scaleOver.classList.add("active");
  } else {
    category = "Obese";
    message = "Your BMI is high. Consider talking to a doctor about a healthy plan. 💪";
    colorClass = "color-obese";
    scaleObese.classList.add("active");
  }

  // ---------- Show the result on the page ----------
  bmiValue.textContent = bmi;
  categoryText.textContent = category;
  messageText.textContent = message;

  // Remove old color class, then add the new one
  categoryText.className = "category " + colorClass;

  // Show the result box (replay the animation each time)
  resultBox.classList.remove("hidden");
  resultBox.style.animation = "none";
  resultBox.offsetHeight; // forces the browser to restart the animation
  resultBox.style.animation = "";
}

// ---------- Function to show an error message ----------
function showError(text) {
  errorText.textContent = "⚠️ " + text;
  resultBox.classList.add("hidden"); // hide old result

  // Shake animation on the card
  card.classList.remove("shake");
  card.offsetHeight; // restart animation
  card.classList.add("shake");
}

// ---------- Function to remove highlight from the scale ----------
function clearScale() {
  scaleUnder.classList.remove("active");
  scaleNormal.classList.remove("active");
  scaleOver.classList.remove("active");
  scaleObese.classList.remove("active");
}

// ---------- Function to reset everything ----------
function resetAll() {
  heightInput.value = "";
  weightInput.value = "";
  errorText.textContent = "";
  resultBox.classList.add("hidden");
  clearScale();
  heightInput.focus();
}

// ---------- Event listeners ----------
calcBtn.addEventListener("click", calculateBMI);
resetBtn.addEventListener("click", resetAll);

// Pressing Enter key also calculates BMI
document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    calculateBMI();
  }
});