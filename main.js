
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
    // 한식
    { name: '치킨', eng: 'fried chicken', message: '오늘 저녁은 바삭한 치킨 어떠세요? 스트레스가 확 풀릴 거예요!' },
    { name: '피자', eng: 'pizza', message: '친구들과 함께 즐기는 피자! 오늘 저녁은 파티 타임!' },
    { name: '떡볶이', eng: 'tteokbokki', message: '매콤달콤한 떡볶이로 오늘 하루의 피로를 날려보세요.' },
    { name: '김치찌개', eng: 'kimchi stew', message: '역시 한국인은 김치찌개! 뜨끈한 국물에 밥 한 공기 뚝딱!' },
    { name: '된장찌개', eng: 'doenjang jjigae', message: '구수한 된장찌개로 든든한 저녁 식사를 즐겨보세요.' },
    { name: '부대찌개', eng: 'budae jjigae', message: '다양한 햄과 사리가 가득! 푸짐한 부대찌개 어떠세요?' },
    { name: '삼겹살', eng: 'samgyeopsal', message: '지글지글 익어가는 삼겹살과 함께하는 즐거운 저녁!' },
    { name: '갈비찜', eng: 'galbi jjim', message: '특별한 날, 달콤짭짤한 소갈비찜으로 행복을 더하세요.' },
    { name: '불고기', eng: 'bulgogi', message: '남녀노소 누구나 좋아하는 달달한 불고기!' },
    { name: '비빔밥', eng: 'bibimbap', message: '신선한 채소와 함께 건강하고 맛있는 비빔밥 한 그릇!' },
    { name: '잡채', eng: 'japchae', message: '잔칫날 빠질 수 없는 다채로운 맛의 잡채!' },
    { name: '순두부찌개', eng: 'sundubu jjigae', message: '얼큰하고 부드러운 순두부찌개로 속을 확 풀어보세요.' },
    { name: '제육볶음', eng: 'jeyuk bokkeum', message: '매콤한 제육볶음과 쌈 채소의 완벽한 조화!' },
    { name: '닭갈비', eng: 'dak galbi', message: '춘천의 명물, 매콤한 닭갈비를 집에서 즐겨보세요.' },
    { name: '보쌈', eng: 'bossam', message: '야들야들한 수육과 아삭한 김치의 환상적인 궁합, 보쌈!' },
    { name: '족발', eng: 'jokbal', message: '콜라겐 가득! 쫀득쫀득한 족발 야식 어떠세요?' },
    { name: '감자탕', eng: 'gamja tang', message: '진한 국물과 부드러운 등뼈가 일품인 감자탕!' },
    { name: '해물파전', eng: 'haemul pajeon', message: '비 오는 날엔 역시, 막걸리와 함께 즐기는 해물파전!' },
    { name: '설렁탕', eng: 'seolleongtang', message: '뽀얀 국물이 매력적인 설렁탕으로 든든하게 속을 채워보세요.' },
    { name: '갈비탕', eng: 'galbi tang', message: '맑고 깊은 국물 맛이 일품인 갈비탕으로 원기 회복!' },
    { name: '냉면', eng: 'naengmyeon', message: '더운 여름, 시원한 냉면 한 그릇으로 더위를 싹!' },
    { name: '김밥', eng: 'gimbap', message: '간편하지만 든든한 한 끼, 맛있는 김밥!' },
    { name: '수제비', eng: 'sujebi', message: '정성 가득, 쫀득한 수제비로 따뜻한 저녁을.' },
    { name: '칼국수', eng: 'kalguksu', message: '시원한 국물의 바지락 칼국수, 마음까지 따뜻해져요.' },

    // 중식
    { name: '짜장면', eng: 'jjajangmyeon', message: '오늘은 내가 짜장면 요리사! 온 가족이 좋아하는 짜장면!' },
    { name: '짬뽕', eng: 'jjamppong', message: '얼큰한 국물과 풍성한 해물이 가득한 짬뽕!' },
    { name: '탕수육', eng: 'tangsuyuk', message: '찍먹? 부먹? 어떻게 먹어도 맛있는 탕수육!' },
    { name: '마파두부', eng: 'mapa tofu', message: '부드러운 두부와 매콤한 소스의 조화, 마파두부 덮밥!' },
    { name: '양꼬치', eng: 'lamb skewers', message: '칭따오와 함께 즐기는 고소한 양꼬치!' },
    { name: '훠궈', eng: 'hot pot', message: '다 함께 둘러앉아 즐기는 중국식 샤브샤브, 훠궈!' },
    { name: '동파육', eng: 'dongpo pork', message: '입에서 살살 녹는 부드러운 동파육, 어떠세요?' },
    { name: '깐풍기', eng: 'kkanpunggi', message: '매콤새콤달콤한 소스의 바삭한 깐풍기!' },
    { name: '유린기', eng: 'youring', message: '상큼한 소스와 아삭한 양상추가 매력적인 유린기!' },
    { name: '고추잡채', eng: 'gochu japchae', message: '꽃빵에 싸 먹는 재미가 있는 고추잡채!' },

    // 일식
    { name: '초밥', eng: 'sushi', message: '신선한 초밥으로 입안 가득 바다의 맛을 느껴보세요.' },
    { name: '라멘', eng: 'ramen', message: '진한 국물과 쫄깃한 면발, 일본 라멘 한 그릇!' },
    { name: '돈까스', eng: 'tonkatsu', message: '바삭바삭한 일본식 돈까스로 든든한 한 끼!' },
    { name: '우동', eng: 'udon', message: '따끈한 국물과 통통한 면발, 겨울엔 역시 우동!' },
    { name: '소바', eng: 'soba', message: '시원한 쯔유에 푹 찍어먹는 메밀 소바!' },
    { name: '오코노미야끼', eng: 'okonomiyaki', message: '내 맘대로 토핑 추가! 일본식 부침개 오코노미야끼.' },
    { name: '타코야끼', eng: 'takoyaki', message: '길거리 간식의 왕! 문어가 쫄깃하게 씹히는 타코야끼.' },
    { name: '규동', eng: 'gyudon', message: '달콤짭짤한 소고기 덮밥, 규동으로 든든하게!' },
    { name: '가츠동', eng: 'katsudon', message: '돈까스와 계란, 소스가 어우러진 환상의 맛, 가츠동!' },
    { name: '스키야키', eng: 'sukiyaki', message: '달콤한 간장 소스에 끓여 먹는 일본식 전골, 스키야키!' },
    { name: '야키토리', eng: 'yakitori', message: '숯불 향 가득한 일본식 닭꼬치, 야키토리!' },

    // 양식
    { name: '스테이크', eng: 'steak', message: '특별한 날, 분위기 있게 스테이크를 즐겨보세요.' },
    { name: '파스타', eng: 'pasta', message: '부드러운 크림 파스타, 혹은 상큼한 토마토 파스타로 기분 전환!' },
    { name: '리조또', eng: 'risotto', message: '쌀알이 살아있는 꾸덕한 리조또의 매력!' },
    { name: '햄버거', eng: 'hamburger', message: '육즙 가득한 패티가 일품인 수제 햄버거!' },
    { name: '감바스', eng: 'gambas al ajillo', message: '바게트 빵을 올리브 오일에 푹! 스페인 요리 감바스.' },
    { name: '샐러드', eng: 'salad', message: '신선한 채소로 가볍고 건강한 한 끼, 시저 샐러드!' },
    { name: '에그 베네딕트', eng: 'eggs benedict', message: '브런치의 황제, 수란이 톡 터지는 에그 베네딕트.' },
    { name: '라자냐', eng: 'lasagna', message: '치즈와 소스가 겹겹이 쌓인 이탈리아의 맛, 라자냐.' },
    { name: '필라프', eng: 'pilaf', message: '고슬고슬한 밥과 다양한 재료가 어우러진 필라프.' },
    { name: '바비큐', eng: 'barbecue', message: '캠핑 분위기 물씬! 정통 아메리칸 바비큐.' },

    // 동남아/기타
    { name: '쌀국수', eng: 'pho', message: '따뜻한 국물과 향긋한 고수가 매력적인 베트남 쌀국수.' },
    { name: '분짜', eng: 'bun cha', message: '새콤달콤한 느억맘 소스에 찍어 먹는 분짜!' },
    { name: '팟타이', eng: 'pad thai', message: '태국의 대표 볶음 쌀국수, 팟타이를 즐겨보세요.' },
    { name: '나시고랭', eng: 'nasi goreng', message: '세계에서 가장 맛있는 음식 2위! 인도네시아 볶음밥 나시고랭.' },
    { name: '카레', eng: 'curry', message: '향긋한 향신료의 풍미가 가득한 인도 카레!' },
    { name: '탄두리 치킨', eng: 'tandoori chicken', message: '화덕에 구워 기름기는 쏙 빠지고 맛은 두 배!' },
    { name: '타코', eng: 'taco', message: '다양한 재료를 넣어 나만의 스타일로 즐기는 멕시칸 타코!' },
    { name: '브리또', eng: 'burrito', message: '하나만 먹어도 든든한 멕시코 음식, 브리또!' },
    { name: '케밥', eng: 'kebab', message: '간편하게 즐기는 터키의 맛, 케밥!' },

    // 분식/간편식
    { name: '라면', eng: 'ramyeon', message: '세상에서 가장 맛있는 라면은 남이 끓여준 라면!' },
    { name: '김치볶음밥', eng: 'kimchi fried rice', message: '실패할 수 없는 조합! 김치볶음밥에 계란후라이 추가요!' },
    { name: '주먹밥', eng: 'rice ball', message: '간단하게 만드는 든든한 한 끼, 주먹밥!' },
    { name: '샌드위치', eng: 'sandwich', message: '피크닉 가는 날, 정성 가득 담은 샌드위치!' },
    { name: '토스트', eng: 'toast', message: '바쁜 아침, 간편하지만 맛있는 길거리 토스트.' },
    { name: '만두', eng: 'dumplings', message: '속이 꽉 찬 찐만두, 혹은 바삭한 군만두?' },
    { name: '순대', eng: 'sundae', message: '떡볶이의 영원한 단짝, 쫄깃한 순대!' },
    { name: '어묵탕', eng: 'fish cake soup', message: '쌀쌀한 날, 몸을 녹여주는 따끈한 어묵탕.' },
    { name: '핫도그', eng: 'hot dog', message: '설탕과 케첩, 머스타드의 완벽한 조화, 핫도그!' },
    
    // 디저트
    { name: '빙수', eng: 'bingsu', message: '더운 여름, 시원한 팥빙수 한 그릇!' },
    { name: '케이크', eng: 'cake', message: '달콤한 케이크로 특별한 날을 기념하세요.' },
    { name: '와플', eng: 'waffle', message: '겉은 바삭, 속은 촉촉! 벨기에 와플.' },
    { name: '마카롱', eng: 'macaron', message: '쫀득하고 달콤한 프랑스 디저트, 마카롱.' },
    { name: '아이스크림', eng: 'ice cream', message: '식사 후엔 역시 달콤한 아이스크림!' },
    { name: '호떡', eng: 'hotteok', message: '겨울철 최고의 간식, 꿀이 뚝뚝 떨어지는 호떡.' },
    { name: '붕어빵', eng: 'bungeoppang', message: '머리부터? 꼬리부터? 팥이 가득한 붕어빵.' },
    { name: '도넛', eng: 'doughnut', message: '커피와 함께 즐기는 달콤한 도넛.' },
    
    // 추가 메뉴
    { name: '곱창', eng: 'gopchang', message: '고소한 곱이 가득! 곱창구이 어떠세요?' },
    { name: '대창', eng: 'daechang', message: '기름진 고소함의 끝판왕, 대창구이!' },
    { name: '막창', eng: 'makchang', message: '씹을수록 고소한 막창, 오늘 저녁 안주로 추천!' },
    { name: '닭발', eng: 'chicken feet', message: '스트레스 받을 땐 매운 닭발이 최고!' },
    { name: '아귀찜', eng: 'agujjim', message: '아삭한 콩나물과 통통한 아귀의 조화, 매콤한 아귀찜!' },
    { name: '해물찜', eng: 'haemul jjim', message: '다양한 해산물이 가득! 푸짐한 해물찜.' },
    { name: '간장게장', eng: 'ganjang gejang', message: '밥도둑 간장게장 하나면 밥 두 공기는 기본!' },
    { name: '양념게장', eng: 'yangnyeom gejang', message: '매콤달콤한 양념게장, 입맛 없을 때 최고!' },
    { name: '육회', eng: 'yukhoe', message: '신선한 육회에 고소한 노른자를 톡!' },
    { name: '물회', eng: 'mulhoe', message: '시원하고 새콤달콤한 육수가 일품인 물회!' },
    { name: '추어탕', eng: 'chueotang', message: '몸보신에 좋은 추어탕으로 건강을 챙겨보세요.' },
    { name: '매운탕', eng: 'maeun tang', message: '얼큰하고 시원한 국물의 생선 매운탕.' }
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
        menuImage.src = 'https://via.placeholder.com/400x400?text=이미지+로딩중...';
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
        menuImage.src = 'https://via.placeholder.com/400x400?text=이미지+불러오기+실패'; 
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
