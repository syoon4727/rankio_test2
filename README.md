# Rankio — 실시간 창업 트렌드 랭킹 플랫폼

> 검색량 · SNS · 뉴스 · 커뮤니티 데이터 기반 실시간 창업 인사이트 플랫폼

## 📁 프로젝트 구조

```
rankio/
├── index.html          # 메인 HTML (SPA 구조)
├── style.css           # 전체 스타일
├── data/
│   └── mockData.js     # 목업 데이터 (CATEGORIES, BRANDS, LISTINGS 등)
├── js/
│   ├── utils.js        # 공통 유틸 함수 (renderRankList, badgeHtml 등)
│   ├── router.js       # 페이지 라우팅 + 각 페이지 초기화
│   └── admin.js        # 관리자 페이지 렌더링
└── README.md
```

## 🚀 실행 방법

`index.html` 파일을 브라우저에서 바로 열면 됩니다.

```bash
# 로컬 서버 실행 (선택사항)
npx serve .
# 또는
python3 -m http.server 3000
```

## 📄 구현된 페이지

| 페이지 | 경로 (SPA 내부) | 설명 |
|--------|---------------|------|
| 홈 대시보드 | `home` | 실시간 랭킹 탭, 업종/테마 탐색, 급상승 브랜드, 신규 매물, 출석 배너, 협력사 |
| 실시간 랭킹 | `rankings` | 5개 탭 전환 (브랜드/급상승/업종/지역/신규), 데이터 수집 현황 |
| 브랜드 탐색 | `brands` | 브랜드 카드 목록, 업종 필터 |
| 브랜드 상세 | `brand-detail` | 창업 정보, 랭킹 히스토리, 연관 테마, 매물 |
| 업종 탐색 | `industry` | 카테고리별 브랜드 순위 |
| 테마별 브랜드 | `themes` | 테마 필터 + 브랜드 목록 |
| 신규 매물 | `listings` | 매물 리스트, 다중 필터 |
| 상권 분석 | `market` | 지역 선택, 지도 목업, 지역별 데이터 |
| 협력사 검색 | `partners` | 협력사 목록, 카테고리 필터 |
| 마이페이지 | `mypage` | 포인트, 출석, 관심 브랜드, 최근 본 항목 |
| 관리자 | `admin` | 브랜드/카테고리/테마/매물/협력사/사용자/포인트/배너/로그 관리 |

## 🛠 기술 스택 (프로토타입)

- **HTML5** — SPA 구조 (단일 파일)
- **CSS3** — CSS 변수, Flexbox, Grid, 애니메이션
- **Vanilla JS** — 라우팅, 렌더링, 상태 관리
- **Google Fonts** — Pretendard, Space Mono

## 🔮 다음 단계 (실제 개발)

```
Next.js (App Router) + TypeScript + Tailwind CSS
PostgreSQL + Prisma ORM
외부 데이터 수집 배치 (검색량 / SNS / 뉴스)
실시간 랭킹 스코어 계산 엔진
```

## 📊 데이터 구조

모든 데이터는 `data/mockData.js`에 정의되어 있으며,
실제 서비스에서는 API 응답으로 교체됩니다.

```js
// 예시: 브랜드 데이터 구조
{
  id: 'b1',
  name: '메가커피',
  slug: 'mega-coffee',
  cat: 'c2',          // 카테고리 ID
  catName: '카페',
  icon: '☕',
  rank: 1,
  score: 9420,        // 외부 데이터 기반 산정 점수
  change: 2,          // 전 스냅샷 대비 순위 변화
  isNew: false,
  badge: '급상승',
  cost_min: 2500,     // 최소 창업비 (만원)
  cost_max: 5000,
  stores: 2800,
  founded: 2015,
  desc: '...',
  themes: ['t2','t4'] // 연관 테마 ID 배열
}
```
