
const recommendBtn = document.getElementById('recommend-btn');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const menuResult = document.getElementById('menu-result');
const menuName = document.getElementById('menu-name');
const menuImage = document.getElementById('menu-image');
const menuMessage = document.getElementById('menu-message');

const shareFacebookBtn = document.getElementById('share-facebook');
const shareTwitterBtn = document.getElementById('share-twitter');
const shareLinkedInBtn = document.getElementById('share-linkedin');

const menuItems = [
    {
        name: '치킨',
        eng: 'fried chicken',
        message: '오늘 저녁은 바삭한 치킨 어떠세요? 스트레스가 확 풀릴 거예요!'
    },
    {
        name: '피자',
        eng: 'pizza',
        message: '친구들과 함께 즐기는 피자! 오늘 저녁은 파티 타임!'
    },
    {
        name: '떡볶이',
        eng: 'tteokbokki',
        message: '매콤달콤한 떡볶이로 오늘 하루의 피로를 날려보세요.'
    },
    {
        name: '스테이크',
        eng: 'steak',
        message: '특별한 날, 분위기 있게 스테이크를 즐겨보세요.'
    },
    {
        name: '초밥',
        eng: 'sushi',
        message: '신선한 초밥으로 입안 가득 바다의 맛을 느껴보세요.'
    },
    {
        name: '파스타',
        eng: 'pasta',
        message: '부드러운 크림 파스타, 혹은 상큼한 토마토 파스타로 기분 전환!'
    },
    {
        name: '김치찌개',
        eng: 'kimchi stew',
        message: '역시 한국인은 김치찌개! 뜨끈한 국물에 밥 한 공기 뚝딱!'
    }
];

let lastRecommendedIndex = -1;
const accessKey = 'joGZtJJ8QjoU1utQHu23VdMkWaEZ4SGsWyyY2TxzXM0';

async function recommendMenu() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * menuItems.length);
    } while (randomIndex === lastRecommendedIndex);

    lastRecommendedIndex = randomIndex;
    const selectedMenu = menuItems[randomIndex];

    menuName.textContent = selectedMenu.name;
    menuMessage.textContent = selectedMenu.message;

    const query = selectedMenu.eng;
    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=20`;

    try {
        menuImage.src = 'https://via.placeholder.com/300x200?text=이미지+로딩중...';
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            // Pick a random image from the search results
            const imageIndex = Math.floor(Math.random() * data.results.length);
            menuImage.src = data.results[imageIndex].urls.regular;
        } else {
            // If no results, try a broader search
            const fallbackUrl = `https://api.unsplash.com/search/photos?query=delicious%20food&client_id=${accessKey}&per_page=20`;
            const fallbackResponse = await fetch(fallbackUrl);
            const fallbackData = await fallbackResponse.json();
            if (fallbackData.results && fallbackData.results.length > 0) {
                const imageIndex = Math.floor(Math.random() * fallbackData.results.length);
                menuImage.src = fallbackData.results[imageIndex].urls.regular;
            } else {
                throw new Error('No images found for this query or fallback.');
            }
        }
    } catch (error) {
        console.error('Error fetching image from Unsplash API:', error);
        // Fallback or placeholder image if API fails
        menuImage.src = 'https://via.placeholder.com/300x200?text=이미지+불러오기+실패'; 
    }
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

function sharePage(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    let shareUrl = '';

    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
            break;
        default:
            console.error('Unknown share platform:', platform);
            return;
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
}

shareFacebookBtn.addEventListener('click', () => sharePage('facebook'));
shareTwitterBtn.addEventListener('click', () => sharePage('twitter'));
shareLinkedInBtn.addEventListener('click', () => sharePage('linkedin'));

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
}
updateToggleButtonText();

// Initial recommendation
recommendMenu();
