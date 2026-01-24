
const generatorBtn = document.getElementById('generator-btn');
const numbersContainer = document.querySelector('.numbers-container');
const themeToggleBtn = document.getElementById('theme-toggle-btn');

generatorBtn.addEventListener('click', () => {
  generateLottoNumbers();
});

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  updateToggleButtonText();
});

function generateLottoNumbers() {
  numbersContainer.innerHTML = '';
  const numbers = new Set();

  while (numbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }

  const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

  sortedNumbers.forEach((number, index) => {
    setTimeout(() => {
      const numberDiv = document.createElement('div');
      numberDiv.classList.add('number');
      numberDiv.textContent = number;
      numbersContainer.appendChild(numberDiv);
    }, index * 200); // Stagger the animation
  });
}

function updateToggleButtonText() {
  const isDarkMode = document.body.classList.contains('dark-mode');
  themeToggleBtn.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
}
updateToggleButtonText();

// Initial generation
generateLottoNumbers();
