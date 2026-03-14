// ==================== MOCK DATA ====================
// data/mockData.js — 실제 서비스에서는 API 응답으로 대체

const CATEGORIES = [
  { id: 'c1', name: '치킨',     slug: 'chicken',  icon: '🍗', count: 48 },
  { id: 'c2', name: '카페',     slug: 'cafe',      icon: '☕', count: 62 },
  { id: 'c3', name: '디저트',   slug: 'dessert',   icon: '🍰', count: 35 },
  { id: 'c4', name: '한식',     slug: 'korean',    icon: '🍚', count: 54 },
  { id: 'c5', name: '분식',     slug: 'bunsik',    icon: '🍜', count: 29 },
  { id: 'c6', name: '고기집',   slug: 'meat',      icon: '🥩', count: 41 },
  { id: 'c7', name: '주점',     slug: 'bar',       icon: '🍺', count: 23 },
  { id: 'c8', name: '배달전문', slug: 'delivery',  icon: '🛵', count: 37 },
  { id: 'c9', name: '소매/서비스', slug: 'retail', icon: '🛍️', count: 18 },
];

const THEMES = [
  { id: 't1', name: '소자본 창업',  slug: 'small-capital',   icon: '💡', desc: '3천만원 이하로 시작 가능한 브랜드' },
  { id: 't2', name: '급성장 브랜드', slug: 'fast-growing',   icon: '🚀', desc: '최근 6개월 매장 수 급증' },
  { id: 't3', name: '안정형 브랜드', slug: 'stable',         icon: '🛡️', desc: '10년 이상 운영된 검증 브랜드' },
  { id: 't4', name: 'MZ 타겟',     slug: 'mz-target',       icon: '✨', desc: 'MZ세대 선호도 높은 브랜드' },
  { id: 't5', name: '배달 강세',    slug: 'delivery-strong', icon: '📦', desc: '배달 매출 비중 60% 이상' },
  { id: 't6', name: '신규 유망',    slug: 'new-promising',   icon: '🌱', desc: '창업 후 3년 이내 신진 브랜드' },
];

const BRANDS = [
  { id: 'b1',  name: '메가커피',    slug: 'mega-coffee',   cat: 'c2', catName: '카페',   icon: '☕', rank: 1,  score: 9420, change: 2,  isNew: false, badge: '급상승',   cost_min: 2500, cost_max: 5000,  stores: 2800, founded: 2015, desc: '합리적인 가격의 대형 커피 전문점 프랜차이즈', themes: ['t2','t4'] },
  { id: 'b2',  name: '컴포즈커피',  slug: 'compose-coffee', cat: 'c2', catName: '카페',  icon: '🧋', rank: 2,  score: 8810, change: 0,  isNew: false, badge: '안정형',   cost_min: 3000, cost_max: 6000,  stores: 2400, founded: 2014, desc: '저렴한 원두로 승부하는 저가 커피 프랜차이즈', themes: ['t1','t2'] },
  { id: 'b3',  name: 'BBQ치킨',     slug: 'bbq-chicken',   cat: 'c1', catName: '치킨',  icon: '🍗', rank: 3,  score: 8200, change: 1,  isNew: false, badge: '안정형',   cost_min: 7000, cost_max: 12000, stores: 1800, founded: 1995, desc: '국내 대표 치킨 프랜차이즈, 30년 역사', themes: ['t3'] },
  { id: 'b4',  name: '탐앤탐스',    slug: 'tomntoms',      cat: 'c2', catName: '카페',   icon: '🫖', rank: 4,  score: 7650, change: -1, isNew: false, badge: '',         cost_min: 5000, cost_max: 9000,  stores: 420,  founded: 2001, desc: '프리미엄 커피와 베이커리의 조화', themes: ['t3'] },
  { id: 'b5',  name: '노랑통닭',    slug: 'noryong',       cat: 'c1', catName: '치킨',  icon: '🐔', rank: 5,  score: 7200, change: 3,  isNew: false, badge: '급상승',   cost_min: 3500, cost_max: 7000,  stores: 1200, founded: 2010, desc: '착한 가격의 통닭 전문 프랜차이즈', themes: ['t1','t5'] },
  { id: 'b6',  name: '빽다방',      slug: 'paik',          cat: 'c2', catName: '카페',   icon: '🥤', rank: 6,  score: 6980, change: 2,  isNew: false, badge: '',         cost_min: 2000, cost_max: 4500,  stores: 1900, founded: 2006, desc: '백종원의 저가 커피 브랜드', themes: ['t1','t2'] },
  { id: 'b7',  name: '또래오래',    slug: 'ttolae',        cat: 'c1', catName: '치킨',  icon: '🍖', rank: 7,  score: 6500, change: -2, isNew: false, badge: '',         cost_min: 4000, cost_max: 8000,  stores: 980,  founded: 2003, desc: '친구들과 함께하는 치킨 전문점', themes: ['t3'] },
  { id: 'b8',  name: '봉구스밥버거', slug: 'bongbus',      cat: 'c5', catName: '분식',   icon: '🍙', rank: 8,  score: 6200, change: 5,  isNew: true,  badge: '신규진입', cost_min: 1500, cost_max: 3000,  stores: 560,  founded: 2012, desc: '소형 매장 특화 분식 프랜차이즈', themes: ['t1','t6'] },
  { id: 'b9',  name: '한솥도시락',  slug: 'hansot',        cat: 'c4', catName: '한식',  icon: '🍱', rank: 9,  score: 6000, change: 1,  isNew: false, badge: '',         cost_min: 5000, cost_max: 8500,  stores: 740,  founded: 1993, desc: '30년 전통의 도시락 전문 프랜차이즈', themes: ['t3','t5'] },
  { id: 'b10', name: '요아정',      slug: 'yoajung',       cat: 'c3', catName: '디저트', icon: '🍦', rank: 10, score: 5800, change: 7,  isNew: true,  badge: '신규진입', cost_min: 2000, cost_max: 4000,  stores: 180,  founded: 2022, desc: '요거트 아이스크림 전문 신흥 브랜드', themes: ['t4','t6'] },
  { id: 'b11', name: '굽네치킨',    slug: 'goobne',        cat: 'c1', catName: '치킨',  icon: '🔥', rank: 11, score: 5600, change: 0,  isNew: false, badge: '',         cost_min: 5500, cost_max: 10000, stores: 1100, founded: 2001, desc: '오븐구이 치킨 선두 브랜드', themes: ['t3','t5'] },
  { id: 'b12', name: '이디야커피',  slug: 'ediya',         cat: 'c2', catName: '카페',   icon: '🫗', rank: 12, score: 5400, change: -1, isNew: false, badge: '',         cost_min: 3500, cost_max: 7000,  stores: 3400, founded: 2001, desc: '국내 최다 매장의 중저가 커피 프랜차이즈', themes: ['t1','t3'] },
];

const RANKINGS = {
  realtime_brand:   BRANDS.slice(0, 10).map((b, i) => ({ ...b, rank: i + 1 })),
  rising_brand:     [...BRANDS].sort((a, b) => b.change - a.change).slice(0, 10).map((b, i) => ({ ...b, rank: i + 1 })),
  popular_category: CATEGORIES.map((c, i) => ({ ...c, rank: i + 1, score: Math.round(9500 - i * 700), change: i % 3 === 0 ? 2 : i % 3 === 1 ? -1 : 0, badge: i < 2 ? '급상승' : '' })),
  popular_region: [
    { id: 'r1', name: '서울 강남구', rank: 1,  score: 9200, change: 1,  badge: '인기',  icon: '🗺️' },
    { id: 'r2', name: '서울 성수동', rank: 2,  score: 8800, change: 3,  badge: '급상승', icon: '🗺️' },
    { id: 'r3', name: '서울 마포구', rank: 3,  score: 8100, change: 0,  badge: '',      icon: '🗺️' },
    { id: 'r4', name: '부산 해운대', rank: 4,  score: 7500, change: 2,  badge: '',      icon: '🗺️' },
    { id: 'r5', name: '경기 판교',   rank: 5,  score: 7100, change: -1, badge: '',      icon: '🗺️' },
    { id: 'r6', name: '서울 홍대',   rank: 6,  score: 6900, change: 1,  badge: '',      icon: '🗺️' },
    { id: 'r7', name: '대구 동성로', rank: 7,  score: 6200, change: 0,  badge: '',      icon: '🗺️' },
    { id: 'r8', name: '인천 송도',   rank: 8,  score: 5800, change: 4,  badge: '신규',  icon: '🗺️' },
    { id: 'r9', name: '서울 잠실',   rank: 9,  score: 5500, change: -1, badge: '',      icon: '🗺️' },
    { id: 'r10', name: '수원 영통',  rank: 10, score: 5100, change: 2,  badge: '',      icon: '🗺️' },
  ],
  new_interest: [...BRANDS].filter(b => b.isNew || b.change > 2).concat(BRANDS.slice(0, 6)).slice(0, 10).map((b, i) => ({ ...b, rank: i + 1 })),
};

const LISTINGS = [
  { id: 'l1', title: '강남역 카페 양도',    brand: '메가커피',    cat: '카페', region: '서울 강남구', invest: 8000,  deposit: 3000, rent: 280, area: '33㎡', date: '2025.01.14', hot: true  },
  { id: 'l2', title: '홍대 치킨집 점포',    brand: 'BBQ치킨',     cat: '치킨', region: '서울 마포구', invest: 12000, deposit: 5000, rent: 320, area: '50㎡', date: '2025.01.13', hot: false },
  { id: 'l3', title: '판교 분식 점포 양도', brand: '봉구스밥버거', cat: '분식', region: '경기 판교',   invest: 2800,  deposit: 1500, rent: 180, area: '20㎡', date: '2025.01.13', hot: true  },
  { id: 'l4', title: '성수 카페 베이커리',  brand: '',            cat: '카페', region: '서울 성동구', invest: 15000, deposit: 6000, rent: 450, area: '66㎡', date: '2025.01.12', hot: false },
  { id: 'l5', title: '수원 한식당 양도',    brand: '',            cat: '한식', region: '경기 수원',   invest: 5500,  deposit: 2000, rent: 200, area: '40㎡', date: '2025.01.12', hot: false },
  { id: 'l6', title: '부산 해운대 카페',    brand: '빽다방',      cat: '카페', region: '부산 해운대', invest: 6500,  deposit: 2500, rent: 240, area: '28㎡', date: '2025.01.11', hot: false },
];

const PARTNERS = [
  { id: 'p1', name: '창업공간연구소',      cat: '상가 부동산',  region: '서울', icon: '🏢', desc: '서울·경기 상권 전문 부동산 중개' },
  { id: 'p2', name: '스타트인테리어',      cat: '인테리어',     region: '전국', icon: '🔨', desc: '카페·음식점 특화 인테리어 전문' },
  { id: 'p3', name: '키오스크플러스',      cat: 'POS/키오스크', region: '전국', icon: '🖥️', desc: '외식업 전문 POS·키오스크 공급' },
  { id: 'p4', name: '그로스마케팅',        cat: '마케팅',       region: '서울', icon: '📱', desc: 'SNS·배달앱 마케팅 전문 에이전시' },
  { id: 'p5', name: '창업세무법인',        cat: '세무/노무',    region: '전국', icon: '📋', desc: '창업 초기 세무·노무 원스톱 서비스' },
  { id: 'p6', name: '프랜차이즈컨설팅그룹', cat: '컨설팅',      region: '서울', icon: '💼', desc: '프랜차이즈 가맹 전 전문 컨설팅' },
  { id: 'p7', name: '매장설비닥터',        cat: 'POS/키오스크', region: '전국', icon: '⚙️', desc: '주방설비·냉장장비 전문' },
  { id: 'p8', name: '로컬브랜딩',          cat: '마케팅',       region: '서울', icon: '🎨', desc: '소상공인 브랜드 아이덴티티 제작' },
  { id: 'p9', name: '입지분석센터',        cat: '상가 부동산',  region: '전국', icon: '📍', desc: '빅데이터 기반 입지 분석 서비스' },
];

const REGIONS = [
  { id: 'reg1', name: '서울 강남구', desc: '강남구 일대',       hot_cats: ['카페','치킨','한식'],  brands: 8, listings: 12, avg_invest: 9500  },
  { id: 'reg2', name: '서울 성수동', desc: '성수 트렌디 상권',  hot_cats: ['카페','디저트','소매'], brands: 6, listings: 8,  avg_invest: 12000 },
  { id: 'reg3', name: '서울 마포구', desc: '홍대·합정 상권',   hot_cats: ['주점','카페','분식'],   brands: 7, listings: 10, avg_invest: 7500  },
  { id: 'reg4', name: '부산 해운대', desc: '해운대 관광 상권',  hot_cats: ['한식','카페','고기'],   brands: 5, listings: 6,  avg_invest: 8000  },
  { id: 'reg5', name: '경기 판교',   desc: '판교 테크노밸리 상권', hot_cats: ['카페','분식','한식'], brands: 4, listings: 5, avg_invest: 6500  },
];

const POINT_HISTORY = [
  { type: '출석',      amount: 30,  date: '2025.01.15', desc: '일일 출석 체크' },
  { type: '출석',      amount: 30,  date: '2025.01.14', desc: '일일 출석 체크' },
  { type: '이벤트',    amount: 100, date: '2025.01.13', desc: '신규 매물 등록 이벤트' },
  { type: '출석',      amount: 30,  date: '2025.01.12', desc: '일일 출석 체크' },
  { type: '관리자지급', amount: 50,  date: '2025.01.10', desc: '시스템 오류 보상' },
];
