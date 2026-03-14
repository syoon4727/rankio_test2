// ==================== ROUTER ====================
// js/router.js

let currentPage = 'home';
let currentBrand = null;
let adminSection = 'admin-dashboard';

/**
 * 페이지 전환
 * @param {string} page - 페이지 ID
 * @param {Object|null} data - 페이지에 전달할 데이터 (예: 브랜드 상세)
 */
function showPage(page, data) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('page-' + page);
  if (el) el.classList.add('active');
  currentPage = page;
  window.scrollTo(0, 0);

  if (page === 'brand-detail' && data) {
    currentBrand = data;
    renderBrandDetail(data);
  }
  if (page === 'admin') {
    renderAdmin(adminSection);
  }
}

// ==================== HOME ====================
function initHome() {
  // 업종 카테고리 그리드
  const catGrid = document.getElementById('cat-grid');
  if (catGrid) {
    catGrid.innerHTML = CATEGORIES.map(c => `
      <div class="cat-chip" onclick="showPage('industry')">
        <div class="icon">${c.icon}</div>
        <div>${c.name}</div>
        <div style="font-size:10px;color:var(--text-muted);">${c.count}개</div>
      </div>
    `).join('');
  }

  // 테마 pill
  const pills = document.getElementById('theme-pills');
  if (pills) {
    pills.innerHTML = THEMES.map((t, i) => `
      <div class="theme-pill ${i === 0 ? 'active' : ''}" onclick="switchThemePill(this, '${t.id}')">
        ${t.icon} ${t.name}
      </div>
    `).join('');
    renderThemeBrands('t1');
  }

  // 급상승 브랜드 이미지 섹션
  const rising = document.getElementById('rising-brands-grid');
  if (rising) {
    const risingBrands = BRANDS.filter(b => b.change > 1 || b.isNew).slice(0, 3);
    rising.innerHTML = risingBrands.map(b => `
      <div class="brand-card" onclick="showPage('brand-detail', BRANDS.find(x => x.id === '${b.id}'))">
        <div class="brand-card-cover" style="background:${getBgColor(b.cat)};">
          <span>${b.icon}</span>
          <div class="score-badge">
            <span style="color:var(--up);">▲</span> ${b.change} 상승
          </div>
        </div>
        <div class="brand-card-body">
          <div class="brand-card-name">${b.name}</div>
          <div class="brand-card-meta">${b.catName} · 전국 ${b.stores?.toLocaleString()}개</div>
          <div class="brand-card-tags">
            ${badgeHtml(b.badge)}
            <span class="badge">${b.catName}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // 신규 매물
  const homeListing = document.getElementById('home-listings');
  if (homeListing) {
    homeListing.innerHTML = LISTINGS.slice(0, 3).map(l => renderListingCard(l)).join('');
  }

  // 협력사
  const homePartners = document.getElementById('home-partners');
  if (homePartners) {
    homePartners.innerHTML = PARTNERS.slice(0, 3).map(p => renderPartnerCard(p)).join('');
  }

  // 실시간 랭킹 탭 초기화
  const firstTab = document.querySelector('#home-rank-tabs .tab-btn');
  if (firstTab) switchHomeTab(firstTab, 'realtime_brand');

  injectFooter('footer-placeholder-home');
}

function switchHomeTab(btn, type) {
  document.querySelectorAll('#home-rank-tabs .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const items = RANKINGS[type];
  const entityType = type === 'popular_category' ? 'category' : type === 'popular_region' ? 'region' : 'brand';
  const el = document.getElementById('home-rank-content');
  if (!el) return;
  el.innerHTML = `
    <div>${renderRankList(items.slice(0, 8), entityType)}</div>
    <div style="padding:12px 16px;border-top:1px solid var(--border);text-align:center;">
      <button class="more-btn" style="margin:0 auto;" onclick="showPage('rankings')">전체 랭킹 보기 →</button>
    </div>
  `;
}

function switchThemePill(el, themeId) {
  document.querySelectorAll('#theme-pills .theme-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  renderThemeBrands(themeId);
}

function renderThemeBrands(themeId) {
  const grid = document.getElementById('theme-brand-grid');
  if (!grid) return;
  const filtered = BRANDS.filter(b => b.themes?.includes(themeId)).slice(0, 4);
  grid.innerHTML = filtered.map(b => `
    <div class="brand-card" onclick="showPage('brand-detail', BRANDS.find(x => x.id === '${b.id}'))">
      <div class="brand-card-cover" style="background:${getBgColor(b.cat)};">${b.icon}</div>
      <div class="brand-card-body">
        <div class="brand-card-name">${b.name}</div>
        <div class="brand-card-meta">${b.catName} · ${b.cost_min?.toLocaleString()}~${b.cost_max?.toLocaleString()}만원</div>
        <div class="brand-card-tags">${badgeHtml(b.badge)}<span class="badge">#${b.catName}</span></div>
      </div>
    </div>
  `).join('');
}

// ==================== RANKINGS ====================
function initRankings() {
  const firstTab = document.querySelector('#rank-page-tabs .tab-btn');
  if (firstTab) switchRankTab(firstTab, 'realtime_brand');
  renderDataSources();
  injectFooter('footer-rankings');
}

function switchRankTab(btn, type) {
  document.querySelectorAll('#rank-page-tabs .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const items = RANKINGS[type];
  const entityType = type === 'popular_category' ? 'category' : type === 'popular_region' ? 'region' : 'brand';

  const el = document.getElementById('rank-page-list');
  if (el) el.innerHTML = renderRankList(items, entityType);

  // 점수 분포 차트
  const chartEl = document.getElementById('rank-change-chart');
  if (chartEl) {
    const bars = items.slice(0, 8);
    chartEl.innerHTML = `
      <div style="margin-bottom:8px;font-size:12px;font-weight:600;color:var(--text-muted);">상위 8개 점수 분포</div>
      <div style="display:flex;gap:4px;align-items:flex-end;height:80px;">
        ${bars.map((b, i) => {
          const h = Math.round((b.score / bars[0].score) * 70);
          return `
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
              <div style="height:${h}px;background:${i < 3 ? 'var(--brand)' : 'var(--brand-light)'};border-radius:3px 3px 0 0;width:100%;"></div>
              <div style="font-size:9px;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:40px;text-align:center;">${b.name?.slice(0, 4)}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }
}

function renderDataSources() {
  const el = document.getElementById('data-source-info');
  if (!el) return;
  const sources = [
    { name: '네이버 검색량',    count: '48,200건', status: '정상', time: '14:30' },
    { name: '인스타그램 언급',   count: '12,840건', status: '정상', time: '14:25' },
    { name: '유튜브 조회수',    count: '8,920건',  status: '정상', time: '14:20' },
    { name: '뉴스/기사',       count: '2,340건',  status: '정상', time: '14:15' },
    { name: '커뮤니티 반응',    count: '5,680건',  status: '정상', time: '14:10' },
  ];
  el.innerHTML = sources.map(s => `
    <div class="flex-between" style="padding:8px 0;border-bottom:1px solid var(--border);">
      <div>
        <div style="font-size:12.5px;font-weight:600;">${s.name}</div>
        <div style="font-size:11px;color:var(--text-muted);">수집량: ${s.count}</div>
      </div>
      <div style="text-align:right;">
        <div class="tag tag-up" style="font-size:10px;">${s.status}</div>
        <div style="font-size:10px;color:var(--text-muted);margin-top:2px;">${s.time}</div>
      </div>
    </div>
  `).join('');
}

// ==================== BRANDS LIST ====================
function initBrands() {
  const sel = document.getElementById('brand-cat-filter');
  if (sel) {
    sel.innerHTML = '<option value="">전체 업종</option>' +
      CATEGORIES.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
  }
  const grid = document.getElementById('brands-grid');
  if (grid) {
    grid.innerHTML = BRANDS.map(b => `
      <div class="brand-card" onclick="showPage('brand-detail', BRANDS.find(x => x.id === '${b.id}'))">
        <div class="brand-card-cover" style="background:${getBgColor(b.cat)};">${b.icon}</div>
        <div class="brand-card-body">
          <div class="flex-between mb4">
            <span class="brand-card-name">${b.name}</span>
            <span style="font-family:'Space Mono',monospace;font-size:11px;color:var(--brand);font-weight:700;">#${b.rank}</span>
          </div>
          <div class="brand-card-meta">${b.catName} · ${b.stores?.toLocaleString()}개 매장</div>
          <div class="brand-card-meta mt4">${b.cost_min?.toLocaleString()}~${b.cost_max?.toLocaleString()}만원</div>
          <div class="brand-card-tags mt8">${badgeHtml(b.badge)}<span class="badge">${b.catName}</span></div>
        </div>
      </div>
    `).join('');
  }
  injectFooter('footer-brands');
}

// ==================== BRAND DETAIL ====================
function renderBrandDetail(b) {
  if (!b) return;

  // Hero 섹션
  const hero = document.getElementById('brand-detail-hero');
  if (hero) {
    hero.innerHTML = `
      <div class="brand-hero-logo">${b.icon}</div>
      <div class="brand-hero-info" style="flex:1;">
        <div class="flex-center gap12 mb8">
          <div class="brand-rank-badge">🏆 실시간 ${b.rank}위</div>
          ${badgeHtml(b.badge)}
        </div>
        <div class="brand-hero-title">${b.name}</div>
        <div class="brand-hero-meta">
          <div class="brand-hero-meta-item">📂 ${b.catName}</div>
          <div class="brand-hero-meta-item">🏪 전국 ${b.stores?.toLocaleString()}개</div>
          <div class="brand-hero-meta-item">📅 ${b.founded}년 설립</div>
          <div class="brand-hero-meta-item">💰 ${b.cost_min?.toLocaleString()}~${b.cost_max?.toLocaleString()}만원</div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end;flex-shrink:0;">
        <button class="btn btn-primary" style="padding:10px 20px;">❤️ 관심 브랜드 저장</button>
        <button class="btn btn-outline" style="padding:8px 16px;">가맹 문의하기</button>
      </div>
    `;
  }

  // 창업 정보
  const info = document.getElementById('brand-detail-info');
  if (info) {
    info.innerHTML = `
      <div style="font-size:16px;font-weight:700;margin-bottom:16px;">창업 정보</div>
      <div class="info-grid">
        <div class="info-box"><div class="info-box-label">최소 창업비</div><div class="info-box-value">${b.cost_min?.toLocaleString()}<span style="font-size:12px;font-weight:500;">만원</span></div></div>
        <div class="info-box"><div class="info-box-label">최대 창업비</div><div class="info-box-value">${b.cost_max?.toLocaleString()}<span style="font-size:12px;font-weight:500;">만원</span></div></div>
        <div class="info-box"><div class="info-box-label">전국 매장수</div><div class="info-box-value">${b.stores?.toLocaleString()}<span style="font-size:12px;font-weight:500;">개</span></div></div>
        <div class="info-box"><div class="info-box-label">설립연도</div><div class="info-box-value">${b.founded}</div></div>
      </div>
    `;
  }

  // 브랜드 소개
  const about = document.getElementById('brand-detail-about');
  if (about) {
    about.innerHTML = `
      <div style="font-size:16px;font-weight:700;margin-bottom:12px;">브랜드 소개</div>
      <p style="font-size:14px;line-height:1.8;color:var(--text-secondary);">${b.desc}. 지속적인 메뉴 개발과 마케팅 활동으로 꾸준한 성장세를 이어가고 있습니다. 예비 창업자에게 체계적인 교육과 운영 지원을 제공합니다.</p>
      <div class="separator"></div>
      <div style="font-size:13px;font-weight:700;margin-bottom:8px;color:var(--text-muted);">주요 특징</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        ${['본사 지원 강화','교육 프로그램 완비','마케팅 지원','원재료 공급 안정'].map(f => `<span class="badge">${f}</span>`).join('')}
      </div>
    `;
  }

  // 랭킹 히스토리 차트
  const rankH = document.getElementById('brand-detail-rank-history');
  if (rankH) {
    const mockHistory = [8, 6, 5, 4, 4, 3, 3, 2, 2, 1, 1, b.rank];
    rankH.innerHTML = `
      <div style="font-size:16px;font-weight:700;margin-bottom:16px;">랭킹 추이</div>
      <div style="font-size:11px;color:var(--text-muted);margin-bottom:12px;">최근 12회 수집 기준</div>
      <div style="display:flex;align-items:flex-start;gap:4px;height:100px;margin-bottom:8px;">
        ${mockHistory.map((v, i) => {
          const h = Math.round(((10 - v + 1) / 10) * 100);
          const isLast = i === mockHistory.length - 1;
          return `
            <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;height:100%;position:relative;">
              ${isLast ? `<div style="position:absolute;top:-18px;left:50%;transform:translateX(-50%);font-size:10px;font-weight:800;color:var(--brand);">${v}위</div>` : ''}
              <div style="height:${h}%;background:${isLast ? 'var(--brand)' : 'var(--brand-light)'};border-radius:3px 3px 0 0;"></div>
            </div>
          `;
        }).join('')}
      </div>
      <div style="display:flex;justify-content:space-between;font-size:9px;color:var(--text-muted);">
        <span>12회 전</span><span>현재</span>
      </div>
    `;
  }

  // 연관 테마 + 매물
  const themeEl = document.getElementById('brand-detail-themes');
  if (themeEl) {
    const myThemes = THEMES.filter(t => b.themes?.includes(t.id));
    const relListings = LISTINGS.filter(l => l.brand === b.name).slice(0, 2);
    themeEl.innerHTML = `
      <div style="font-size:16px;font-weight:700;margin-bottom:16px;">연관 테마</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        ${myThemes.map(t => `<div class="theme-pill" onclick="showPage('themes')">${t.icon} ${t.name}</div>`).join('')}
      </div>
      <div class="separator"></div>
      <div style="font-size:16px;font-weight:700;margin-bottom:16px;">연관 매물</div>
      ${relListings.length
        ? relListings.map(l => renderListingCard(l)).join('')
        : '<div style="color:var(--text-muted);font-size:13px;">등록된 매물이 없습니다</div>'
      }
    `;
  }

  injectFooter('footer-brand-detail');
}

// ==================== INDUSTRY ====================
function initIndustry() {
  const chips = document.getElementById('industry-cat-chips');
  if (chips) {
    chips.innerHTML = CATEGORIES.map((c, i) => `
      <div class="cat-chip ${i === 0 ? 'active' : ''}" onclick="switchIndustryCat(this, '${c.id}')">
        <div class="icon">${c.icon}</div>
        <div>${c.name}</div>
      </div>
    `).join('');
  }
  renderIndustryContent('c1');
  injectFooter('footer-industry');
}

function switchIndustryCat(el, catId) {
  document.querySelectorAll('#industry-cat-chips .cat-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  renderIndustryContent(catId);
}

function renderIndustryContent(catId) {
  const cat = CATEGORIES.find(c => c.id === catId);
  const catBrands = BRANDS.filter(b => b.cat === catId);
  const el = document.getElementById('industry-content');
  if (!el || !cat) return;
  el.innerHTML = `
    <div>
      <div class="card" style="padding:20px;margin-bottom:16px;">
        <div style="font-size:24px;margin-bottom:8px;">${cat.icon}</div>
        <div style="font-size:20px;font-weight:800;margin-bottom:8px;">${cat.name} 업종</div>
        <div style="font-size:13px;color:var(--text-secondary);margin-bottom:16px;">현재 ${cat.count}개 등록 브랜드</div>
        <div class="grid-2" style="gap:10px;">
          <div class="info-box"><div class="info-box-label">평균 창업비</div><div class="info-box-value" style="font-size:16px;">5,000<span style="font-size:11px;">만원</span></div></div>
          <div class="info-box"><div class="info-box-label">등록 브랜드</div><div class="info-box-value" style="font-size:16px;">${cat.count}</div></div>
        </div>
      </div>
      <div class="card" style="padding:20px;">
        <div style="font-size:15px;font-weight:700;margin-bottom:12px;">지금 뜨는 키워드</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${['소자본','배달강화','MZ감성','SNS맛집','가성비'].map(k => `<span class="tag tag-up">${k}</span>`).join('')}
        </div>
      </div>
    </div>
    <div>
      <div style="font-size:15px;font-weight:700;margin-bottom:12px;">업종 내 인기 브랜드</div>
      <div class="card">
        ${catBrands.length
          ? renderRankList(catBrands.map((b, i) => ({ ...b, rank: i + 1 })), 'brand')
          : '<div style="padding:24px;text-align:center;color:var(--text-muted);">등록된 브랜드가 없습니다</div>'
        }
      </div>
    </div>
  `;
}

// ==================== THEMES ====================
function initThemes() {
  const pills = document.getElementById('all-theme-pills');
  if (pills) {
    pills.innerHTML = THEMES.map((t, i) => `
      <div class="theme-pill ${i === 0 ? 'active' : ''}" onclick="switchAllTheme(this, '${t.id}')">
        ${t.icon} ${t.name}
      </div>
    `).join('');
    renderAllThemeBrands('t1');
  }
  injectFooter('footer-themes');
}

function switchAllTheme(el, themeId) {
  document.querySelectorAll('#all-theme-pills .theme-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  renderAllThemeBrands(themeId);
}

function renderAllThemeBrands(themeId) {
  const theme = THEMES.find(t => t.id === themeId);
  const grid = document.getElementById('themes-brands-grid');
  if (!grid || !theme) return;
  const filtered = BRANDS.filter(b => b.themes?.includes(themeId));
  grid.innerHTML = `
    <div class="card" style="padding:20px;grid-column:1/-1;display:flex;gap:16px;align-items:center;">
      <div style="font-size:36px;">${theme.icon}</div>
      <div>
        <div style="font-size:18px;font-weight:800;">${theme.name}</div>
        <div style="font-size:13px;color:var(--text-secondary);margin-top:4px;">${theme.desc} · ${filtered.length}개 브랜드</div>
      </div>
    </div>
    ${filtered.map(b => `
      <div class="brand-card" onclick="showPage('brand-detail', BRANDS.find(x => x.id === '${b.id}'))">
        <div class="brand-card-cover" style="background:${getBgColor(b.cat)};">${b.icon}</div>
        <div class="brand-card-body">
          <div class="brand-card-name">${b.name}</div>
          <div class="brand-card-meta">${b.catName} · 랭킹 ${b.rank}위</div>
          <div class="brand-card-tags">${badgeHtml(b.badge)}</div>
        </div>
      </div>
    `).join('')}
  `;
}

// ==================== LISTINGS ====================
function initListings() {
  const grid = document.getElementById('listings-grid');
  if (grid) grid.innerHTML = LISTINGS.map(l => renderListingCard(l)).join('');
  injectFooter('footer-listings');
}

// ==================== MARKET ====================
function initMarket() {
  const list = document.getElementById('region-list');
  if (list) {
    list.innerHTML = REGIONS.map((r, i) => `
      <div class="sidebar-item ${i === 0 ? 'active' : ''}" onclick="switchRegion(this, '${r.id}')"
        style="border-radius:6px;font-size:12.5px;">
        📍 ${r.name}
      </div>
    `).join('');
  }
  renderRegionData('reg1');
  injectFooter('footer-market');
}

function switchRegion(el, regId) {
  document.querySelectorAll('#region-list .sidebar-item').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
  renderRegionData(regId);
}

function renderRegionData(regId) {
  const reg = REGIONS.find(r => r.id === regId);
  if (!reg) return;

  const panel = document.getElementById('region-data-panel');
  if (panel) {
    panel.innerHTML = `
      <div class="card" style="padding:20px;">
        <div style="font-size:16px;font-weight:800;margin-bottom:4px;">📍 ${reg.name}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:16px;">${reg.desc}</div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div class="info-box"><div class="info-box-label">평균 창업비</div><div class="info-box-value" style="font-size:16px;">${reg.avg_invest.toLocaleString()}<span style="font-size:11px;">만원</span></div></div>
          <div class="info-box"><div class="info-box-label">등록 브랜드</div><div class="info-box-value" style="font-size:16px;">${reg.brands}개</div></div>
          <div class="info-box"><div class="info-box-label">현재 매물</div><div class="info-box-value" style="font-size:16px;">${reg.listings}건</div></div>
        </div>
        <div class="separator"></div>
        <div style="font-size:12px;font-weight:700;color:var(--text-muted);margin-bottom:8px;">인기 업종</div>
        <div style="display:flex;flex-wrap:wrap;gap:4px;">
          ${reg.hot_cats.map(c => `<span class="tag tag-brand">${c}</span>`).join('')}
        </div>
        <button class="btn btn-outline w100 mt12" style="font-size:12px;" onclick="showPage('listings')">매물 보기</button>
      </div>
    `;
  }

  const bottom = document.getElementById('market-bottom');
  if (bottom) {
    const relBrands = BRANDS.filter(b => reg.hot_cats.includes(b.catName)).slice(0, 4);
    bottom.innerHTML = `
      <div style="font-size:18px;font-weight:800;margin-bottom:16px;">${reg.name} 인기 브랜드</div>
      <div class="grid-4" style="margin-bottom:40px;">
        ${relBrands.map(b => `
          <div class="brand-card" onclick="showPage('brand-detail', BRANDS.find(x => x.id === '${b.id}'))">
            <div class="brand-card-cover" style="background:${getBgColor(b.cat)};">${b.icon}</div>
            <div class="brand-card-body">
              <div class="brand-card-name">${b.name}</div>
              <div class="brand-card-meta">${b.catName}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

// ==================== PARTNERS ====================
function initPartners() {
  const cats = [...new Set(PARTNERS.map(p => p.cat))];
  const sel = document.getElementById('partner-cat-filter');
  if (sel) {
    sel.innerHTML = '<option value="">전체 카테고리</option>' +
      cats.map(c => `<option>${c}</option>`).join('');
  }
  const grid = document.getElementById('partners-grid');
  if (grid) grid.innerHTML = PARTNERS.map(p => renderPartnerCard(p)).join('');
  injectFooter('footer-partners');
}

// ==================== MYPAGE ====================
function initMypage() {
  const ph = document.getElementById('point-history');
  if (ph) {
    ph.innerHTML = POINT_HISTORY.map(h => `
      <div class="flex-between" style="padding:10px 0;border-bottom:1px solid var(--border);">
        <div>
          <div style="font-size:13px;font-weight:600;">${h.desc}</div>
          <div style="font-size:11px;color:var(--text-muted);">${h.date} · ${h.type}</div>
        </div>
        <div style="font-weight:700;color:var(--up);">+${h.amount}P</div>
      </div>
    `).join('');
  }

  const saved = document.getElementById('saved-brands-list');
  if (saved) {
    saved.innerHTML = BRANDS.slice(0, 5).map(b => `
      <div class="flex-between" style="padding:10px 0;border-bottom:1px solid var(--border);cursor:pointer;"
        onclick="showPage('brand-detail', BRANDS.find(x => x.id === '${b.id}'))">
        <div class="flex-center gap10">
          <div style="font-size:20px;">${b.icon}</div>
          <div>
            <div style="font-size:13px;font-weight:600;">${b.name}</div>
            <div style="font-size:11px;color:var(--text-muted);">${b.catName} · 랭킹 ${b.rank}위</div>
          </div>
        </div>
        <span style="color:var(--brand);font-size:18px;">❤️</span>
      </div>
    `).join('');
  }

  const rv = document.getElementById('recently-viewed-list');
  if (rv) {
    const items = [
      { type: 'brand',   name: '메가커피',           icon: '☕', meta: '카페' },
      { type: 'listing', name: '강남역 카페 양도',    icon: '🏠', meta: '서울 강남구' },
      { type: 'brand',   name: 'BBQ치킨',            icon: '🍗', meta: '치킨' },
      { type: 'region',  name: '성수동 상권 분석',    icon: '🗺️', meta: '서울 성동구' },
    ];
    const typeLabel = { brand: '브랜드', listing: '매물', region: '지역' };
    rv.innerHTML = items.map(i => `
      <div class="flex-center gap10" style="padding:10px 0;border-bottom:1px solid var(--border);">
        <div style="font-size:20px;">${i.icon}</div>
        <div>
          <div style="font-size:13px;font-weight:600;">${i.name}</div>
          <div style="font-size:11px;color:var(--text-muted);">${i.meta} · ${typeLabel[i.type]}</div>
        </div>
      </div>
    `).join('');
  }

  injectFooter('footer-mypage');
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  initHome();
  initRankings();
  initBrands();
  initIndustry();
  initThemes();
  initListings();
  initMarket();
  initPartners();
  initMypage();
  renderAdmin('admin-dashboard');
});
