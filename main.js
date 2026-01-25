
const recommendBtn = document.getElementById('recommend-btn');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const menuResult = document.getElementById('menu-result');
const menuName = document.getElementById('menu-name');
const menuImage = document.getElementById('menu-image');
const menuMessage = document.getElementById('menu-message');

const menuItems = [
    {
        name: '치킨',
        image: 'https://img.freepik.com/free-photo/crispy-fried-chicken-plate-with-salad-and-sauce_1339-2023.jpg',
        message: '오늘 저녁은 바삭한 치킨 어떠세요? 스트레스가 확 풀릴 거예요!'
    },
    {
        name: '피자',
        image: 'https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-and-olives_140725-1200.jpg',
        message: '친구들과 함께 즐기는 피자! 오늘 저녁은 파티 타임!'
    },
    {
        name: '떡볶이',
        image: 'https://img.freepik.com/free-photo/tteokbokki-korean-spicy-rice-cakes_1339-12297.jpg',
        message: '매콤달콤한 떡볶이로 오늘 하루의 피로를 날려보세요.'
    },
    {
        name: '스테이크',
        image: 'https://img.freepik.com/free-photo/grilled-beef-steak-with-potatoes-and-vegetables_1339-8681.jpg',
        message: '특별한 날, 분위기 있게 스테이크를 즐겨보세요.'
    },
    {
        name: '초밥',
        image: 'https://img.freepik.com/free-photo/sushi-set-with-tuna-salmon-and-eel_1339-12294.jpg',
        message: '신선한 초밥으로 입안 가득 바다의 맛을 느껴보세요.'
    },
    {
        name: '파스타',
        image: 'https://img.freepik.com/free-photo/spaghetti-with-tomato-sauce-and-basil_140725-8631.jpg',
        message: '부드러운 크림 파스타, 혹은 상큼한 토마토 파스타로 기분 전환!'
    },
    {
        name: '김치찌개',
        image: 'https://img.freepik.com/free-photo/kimchi-jjigae-korean-kimchi-stew_1339-12296.jpg',
        message: '역시 한국인은 김치찌개! 뜨끈한 국물에 밥 한 공기 뚝딱!'
    }
];

function recommendMenu() {
    const randomIndex = Math.floor(Math.random() * menuItems.length);
    const selectedMenu = menuItems[randomIndex];

    menuName.textContent = selectedMenu.name;
    menuImage.src = selectedMenu.image;
    menuMessage.textContent = selectedMenu.message;
}

recommendBtn.addEventListener('click', recommendMenu);

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  updateToggleButtonText();
});

function updateToggleButtonText() {
  const isDarkMode = document.body.classList.contains('dark-mode');
  themeToggleBtn.textContent = isDarkMode ? '라이트 모드' : '다크 모드';
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
}
updateToggleButtonText();

// Initial recommendation
recommendMenu();
