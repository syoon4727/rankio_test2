// ==================== ADMIN ====================
// js/admin.js

/**
 * 관리자 섹션 전환
 * @param {HTMLElement} el - 클릭된 사이드바 항목
 * @param {string} section - 섹션 ID
 */
function switchAdmin(el, section) {
  document.querySelectorAll('.admin-sidebar .sidebar-item').forEach(i => i.classList.remove('active'));
  if (el) el.classList.add('active');
  adminSection = section;
  renderAdmin(section);
}

/**
 * 관리자 섹션 렌더링
 * @param {string} section - 섹션 ID
 */
function renderAdmin(section) {
  const el = document.getElementById('admin-content');
  if (!el) return;
  const renders = {
    'admin-dashboard':     renderAdminDashboard,
    'admin-brands':        renderAdminBrands,
    'admin-categories':    renderAdminCategories,
    'admin-themes':        renderAdminThemes,
    'admin-listings':      renderAdminListings,
    'admin-partners':      renderAdminPartners,
    'admin-charts':        renderAdminCharts,
    'admin-users':         renderAdminUsers,
    'admin-points':        renderAdminPoints,
    'admin-banners':       renderAdminBanners,
    'admin-ranking-logs':  renderAdminRankingLogs,
    'admin-data-sources':  renderAdminDataSources,
  };
  const fn = renders[section] || renderAdminDashboard;
  el.innerHTML = fn();
}

// ── 대시보드 ──
function renderAdminDashboard() {
  return `
    <h2 style="font-size:22px;font-weight:800;margin-bottom:24px;">관리자 대시보드</h2>
    <div class="grid-4" style="margin-bottom:24px;">
      <div class="stat-card"><div class="stat-label">총 브랜드</div><div class="stat-value">124</div><div class="stat-sub">활성 102개</div></div>
      <div class="stat-card"><div class="stat-label">등록 매물</div><div class="stat-value">48</div><div class="stat-sub">오늘 신규 3건</div><div class="stat-change up">↑ 3건</div></div>
      <div class="stat-card"><div class="stat-label">총 회원수</div><div class="stat-value">2,840</div><div class="stat-sub">이번달 +124명</div><div class="stat-change up">↑ 124명</div></div>
      <div class="stat-card"><div class="stat-label">랭킹 수집</div><div class="stat-value" style="color:var(--up);">정상</div><div class="stat-sub">마지막 수집 14:32</div></div>
    </div>
    <div class="grid-2" style="gap:20px;">
      <div class="card" style="padding:20px;">
        <div style="font-size:15px;font-weight:700;margin-bottom:16px;">최근 수집 배치</div>
        <table class="data-table">
          <thead><tr><th>소스</th><th>상태</th><th>수집량</th><th>완료시간</th></tr></thead>
          <tbody>
            <tr><td>네이버 검색량</td><td><span class="tag tag-up">성공</span></td><td>48,200</td><td>14:32</td></tr>
            <tr><td>인스타그램</td><td><span class="tag tag-up">성공</span></td><td>12,840</td><td>14:28</td></tr>
            <tr><td>유튜브</td><td><span class="tag tag-up">성공</span></td><td>8,920</td><td>14:25</td></tr>
            <tr><td>뉴스 크롤링</td><td><span class="tag tag-stable">대기</span></td><td>—</td><td>—</td></tr>
          </tbody>
        </table>
      </div>
      <div class="card" style="padding:20px;">
        <div style="font-size:15px;font-weight:700;margin-bottom:16px;">빠른 작업</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <button class="btn btn-primary" style="text-align:left;">⚡ 랭킹 즉시 재계산</button>
          <button class="btn btn-outline" style="text-align:left;" onclick="switchAdmin(null,'admin-brands')">🏪 브랜드 새로 등록</button>
          <button class="btn btn-outline" style="text-align:left;">📢 공지사항 등록</button>
          <button class="btn btn-outline" style="text-align:left;" onclick="switchAdmin(null,'admin-banners')">🖼️ 배너 관리</button>
        </div>
      </div>
    </div>
  `;
}

// ── 브랜드 관리 ──
function renderAdminBrands() {
  return `
    <div class="flex-between mb24">
      <h2 style="font-size:22px;font-weight:800;">브랜드 관리</h2>
      <button class="btn btn-primary">+ 브랜드 등록</button>
    </div>
    <div class="filter-bar mb16">
      <div class="search-box" style="max-width:220px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input type="text" placeholder="브랜드명 검색...">
      </div>
      <select class="filter-select">
        <option>전체 업종</option>
        ${CATEGORIES.map(c => `<option>${c.name}</option>`).join('')}
      </select>
      <select class="filter-select"><option>전체 상태</option><option>활성</option><option>비활성</option></select>
    </div>
    <table class="data-table">
      <thead><tr><th>브랜드명</th><th>업종</th><th>매장수</th><th>랭킹</th><th>상태</th><th>메인노출</th><th>작업</th></tr></thead>
      <tbody>
        ${BRANDS.slice(0, 8).map(b => `
          <tr>
            <td><div class="flex-center gap8"><span style="font-size:18px;">${b.icon}</span><strong>${b.name}</strong></div></td>
            <td><span class="badge">${b.catName}</span></td>
            <td>${b.stores?.toLocaleString()}개</td>
            <td><span style="font-family:'Space Mono',monospace;color:var(--brand);font-weight:700;">#${b.rank}</span></td>
            <td><span class="tag tag-up">활성</span></td>
            <td><div class="toggle on" onclick="this.classList.toggle('on')"></div></td>
            <td><div style="display:flex;gap:4px;">
              <button class="action-btn action-edit">수정</button>
              <button class="action-btn action-del">삭제</button>
            </div></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// ── 카테고리 관리 ──
function renderAdminCategories() {
  return `
    <div class="flex-between mb24">
      <h2 style="font-size:22px;font-weight:800;">카테고리 관리</h2>
      <button class="btn btn-primary">+ 카테고리 추가</button>
    </div>
    <table class="data-table">
      <thead><tr><th>아이콘</th><th>이름</th><th>슬러그</th><th>브랜드수</th><th>정렬순서</th><th>상태</th><th>작업</th></tr></thead>
      <tbody>
        ${CATEGORIES.map((c, i) => `
          <tr>
            <td style="font-size:22px;">${c.icon}</td>
            <td><strong>${c.name}</strong></td>
            <td style="font-family:'Space Mono',monospace;font-size:12px;color:var(--text-muted);">${c.slug}</td>
            <td>${c.count}개</td>
            <td><input type="number" value="${i + 1}" style="width:50px;border:1px solid var(--border);border-radius:5px;padding:4px 6px;font-size:12px;"></td>
            <td><div class="toggle on" onclick="this.classList.toggle('on')"></div></td>
            <td><div style="display:flex;gap:4px;">
              <button class="action-btn action-edit">수정</button>
              <button class="action-btn action-del">삭제</button>
            </div></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// ── 테마 관리 ──
function renderAdminThemes() {
  return `
    <div class="flex-between mb24">
      <h2 style="font-size:22px;font-weight:800;">테마 관리</h2>
      <button class="btn btn-primary">+ 테마 추가</button>
    </div>
    <table class="data-table">
      <thead><tr><th>아이콘</th><th>테마명</th><th>설명</th><th>연결 브랜드</th><th>상태</th><th>작업</th></tr></thead>
      <tbody>
        ${THEMES.map(t => `
          <tr>
            <td style="font-size:22px;">${t.icon}</td>
            <td><strong>${t.name}</strong></td>
            <td style="font-size:12px;color:var(--text-secondary);">${t.desc}</td>
            <td>${BRANDS.filter(b => b.themes?.includes(t.id)).length}개</td>
            <td><div class="toggle on" onclick="this.classList.toggle('on')"></div></td>
            <td><div style="display:flex;gap:4px;">
              <button class="action-btn action-edit">수정</button>
              <button class="action-btn action-del">삭제</button>
            </div></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// ── 매물 관리 ──
function renderAdminListings() {
  return `
    <div class="flex-between mb24">
      <h2 style="font-size:22px;font-weight:800;">매물 관리</h2>
      <button class="btn btn-primary">+ 매물 등록</button>
    </div>
    <table class="data-table">
      <thead><tr><th>매물명</th><th>브랜드</th><th>지역</th><th>투자금</th><th>등록일</th><th>HOT</th><th>상태</th><th>작업</th></tr></thead>
      <tbody>
        ${LISTINGS.map(l => `
          <tr>
            <td><strong>${l.title}</strong></td>
            <td>${l.brand || '—'}</td>
            <td>${l.region}</td>
            <td>${l.invest?.toLocaleString()}만원</td>
            <td style="font-size:12px;">${l.date}</td>
            <td><div class="toggle ${l.hot ? 'on' : ''}" onclick="this.classList.toggle('on')"></div></td>
            <td><span class="tag tag-up">활성</span></td>
            <td><div style="display:flex;gap:4px;">
              <button class="action-btn action-edit">수정</button>
              <button class="action-btn action-del">삭제</button>
            </div></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// ── 협력사 관리 ──
function renderAdminPartners() {
  return `
    <div class="flex-between mb24">
      <h2 style="font-size:22px;font-weight:800;">협력사 관리</h2>
      <button class="btn btn-primary">+ 협력사 등록</button>
    </div>
    <table class="data-table">
      <thead><tr><th>협력사명</th><th>카테고리</th><th>지역</th><th>추천노출</th><th>상태</th><th>작업</th></tr></thead>
      <tbody>
        ${PARTNERS.map(p => `
          <tr>
            <td><div class="flex-center gap8"><span style="font-size:18px;">${p.icon}</span><strong>${p.name}</strong></div></td>
            <td><span class="badge">${p.cat}</span></td>
            <td>${p.region}</td>
            <td><div class="toggle on" onclick="this.classList.toggle('on')"></div></td>
            <td><span class="tag tag-up">활성</span></td>
            <td><div style="display:flex;gap:4px;">
              <button class="action-btn action-edit">수정</button>
              <button class="action-btn action-del">삭제</button>
            </div></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// ── 차트 탭 관리 ──
function renderAdminCharts() {
  const tabs = [
    { label: '실시간 인기 브랜드', code: 'realtime_brand',   visible: true,  order: 1 },
    { label: '급상승 브랜드',      code: 'rising_brand',     visible: true,  order: 2 },
    { label: '인기 업종',          code: 'popular_category', visible: true,  order: 3 },
    { label: '인기 창업 지역',      code: 'popular_region',   visible: true,  order: 4 },
    { label: '신규 관심도',         code: 'new_interest',     visible: false, order: 5 },
  ];
  return `
    <div class="flex-between mb24">
      <h2 style="font-size:22px;font-weight:800;">차트 탭 관리</h2>
      <div style="font-size:13px;color:var(--text-muted);">순서를 조정하고 노출을 제어하세요</div>
    </div>
    <div class="card" style="padding:20px;">
      <table class="data-table">
        <thead><tr><th>순서</th><th>탭 이름</th><th>코드</th><th>노출</th><th>작업</th></tr></thead>
        <tbody>
          ${tabs.map(t => `
            <tr>
              <td style="font-family:'Space Mono',monospace;font-weight:700;">${t.order}</td>
              <td><strong>${t.label}</strong></td>
              <td style="font-family:'Space Mono',monospace;font-size:11px;color:var(--text-muted);">${t.code}</td>
              <td><div class="toggle ${t.visible ? 'on' : ''}" onclick="this.classList.toggle('on')"></div></td>
              <td><button class="action-btn action-edit">수정</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// ── 사용자 관리 ──
function renderAdminUsers() {
  const users = [
    { nick: '예비창업자123', email: 'user1@ex.com',    role: 'user',  status: 'active',  join: '2024.08.01', points: 2430 },
    { nick: '치킨러버',      email: 'user2@ex.com',    role: 'user',  status: 'active',  join: '2024.09.15', points: 1200 },
    { nick: '카페사장님',    email: 'user3@ex.com',    role: 'user',  status: 'blocked', join: '2024.10.01', points: 80   },
    { nick: 'admin',        email: 'admin@rankio.kr', role: 'admin', status: 'active',  join: '2024.07.01', points: 0    },
  ];
  return `
    <div class="flex-between mb24">
      <h2 style="font-size:22px;font-weight:800;">사용자 관리</h2>
      <div style="font-size:13px;color:var(--text-muted);">총 2,840명</div>
    </div>
    <table class="data-table">
      <thead><tr><th>닉네임</th><th>이메일</th><th>권한</th><th>상태</th><th>포인트</th><th>가입일</th><th>작업</th></tr></thead>
      <tbody>
        ${users.map(u => `
          <tr>
            <td><strong>${u.nick}</strong></td>
            <td style="font-size:12px;color:var(--text-muted);">${u.email}</td>
            <td><span class="badge" style="${u.role === 'admin' ? 'background:var(--brand-light);color:var(--brand);' : ''}">${u.role}</span></td>
            <td><span class="tag ${u.status === 'active' ? 'tag-up' : 'tag-down'}">${u.status}</span></td>
            <td style="font-weight:700;">${u.points.toLocaleString()}P</td>
            <td style="font-size:12px;">${u.join}</td>
            <td><div style="display:flex;gap:4px;">
              <button class="action-btn action-edit">수정</button>
              <button class="action-btn action-del">${u.status === 'blocked' ? '활성화' : '차단'}</button>
            </div></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// ── 포인트 정책 ──
function renderAdminPoints() {
  const policies = [
    { label: '일일 출석 포인트',        val: 30  },
    { label: '7일 연속 출석 보너스',     val: 100 },
    { label: '30일 연속 출석 보너스',    val: 500 },
  ];
  return `
    <h2 style="font-size:22px;font-weight:800;margin-bottom:24px;">포인트 정책 관리</h2>
    <div class="grid-2" style="gap:20px;">
      <div class="card" style="padding:24px;">
        <div style="font-size:16px;font-weight:700;margin-bottom:20px;">출석 체크 포인트 설정</div>
        <div style="display:flex;flex-direction:column;gap:14px;">
          ${policies.map(p => `
            <div class="flex-between" style="padding:12px;background:var(--bg);border-radius:8px;">
              <div style="font-size:13.5px;font-weight:600;">${p.label}</div>
              <div class="flex-center gap8">
                <input type="number" value="${p.val}" style="width:70px;border:1px solid var(--border);border-radius:6px;padding:6px 8px;font-size:13px;font-family:inherit;">
                <span style="font-size:13px;color:var(--text-muted);">P</span>
              </div>
            </div>
          `).join('')}
        </div>
        <button class="btn btn-primary w100 mt16">저장</button>
      </div>
      <div class="card" style="padding:24px;">
        <div style="font-size:16px;font-weight:700;margin-bottom:20px;">포인트 수동 지급</div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div>
            <div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:6px;">대상 사용자</div>
            <input type="text" placeholder="이메일 또는 닉네임" style="width:100%;border:1px solid var(--border);border-radius:7px;padding:8px 12px;font-size:13px;font-family:inherit;">
          </div>
          <div>
            <div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:6px;">지급 포인트</div>
            <input type="number" placeholder="포인트 수량" style="width:100%;border:1px solid var(--border);border-radius:7px;padding:8px 12px;font-size:13px;font-family:inherit;">
          </div>
          <div>
            <div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:6px;">사유</div>
            <input type="text" placeholder="지급 사유 입력" style="width:100%;border:1px solid var(--border);border-radius:7px;padding:8px 12px;font-size:13px;font-family:inherit;">
          </div>
          <button class="btn btn-primary">지급하기</button>
        </div>
      </div>
    </div>
  `;
}

// ── 배너 관리 ──
function renderAdminBanners() {
  const banners = [
    { title: '출석 체크 배너',      type: 'attendance', active: true,  start: '상시' },
    { title: '신규 매물 프로모션',   type: 'promo',      active: true,  start: '2025.01.10~1.20' },
    { title: '파트너 배너 A',       type: 'partner',    active: false, start: '2025.02.01~' },
  ];
  return `
    <div class="flex-between mb24">
      <h2 style="font-size:22px;font-weight:800;">배너 관리</h2>
      <button class="btn btn-primary">+ 배너 등록</button>
    </div>
    <table class="data-table">
      <thead><tr><th>배너명</th><th>타입</th><th>기간</th><th>노출</th><th>작업</th></tr></thead>
      <tbody>
        ${banners.map(b => `
          <tr>
            <td><strong>${b.title}</strong></td>
            <td><span class="badge">${b.type}</span></td>
            <td style="font-size:12px;">${b.start}</td>
            <td><div class="toggle ${b.active ? 'on' : ''}" onclick="this.classList.toggle('on')"></div></td>
            <td><div style="display:flex;gap:4px;">
              <button class="action-btn action-edit">수정</button>
              <button class="action-btn action-del">삭제</button>
            </div></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// ── 랭킹 수집 로그 ──
function renderAdminRankingLogs() {
  const logs = [
    { time: '14:32', type: 'realtime_brand',   count: 12, status: '성공', top: '메가커피(9,420)' },
    { time: '14:22', type: 'rising_brand',     count: 12, status: '성공', top: '요아정(+7)' },
    { time: '14:12', type: 'popular_category', count: 9,  status: '성공', top: '카페(8,200)' },
    { time: '14:02', type: 'popular_region',   count: 10, status: '성공', top: '강남구(9,200)' },
    { time: '13:52', type: 'realtime_brand',   count: 12, status: '성공', top: '메가커피(9,380)' },
    { time: '13:42', type: 'rising_brand',     count: 12, status: '실패', top: '—' },
  ];
  return `
    <div class="flex-between mb24">
      <h2 style="font-size:22px;font-weight:800;">랭킹 수집 로그</h2>
      <button class="btn btn-primary">⚡ 즉시 재계산</button>
    </div>
    <table class="data-table">
      <thead><tr><th>수집시간</th><th>랭킹 타입</th><th>항목수</th><th>상태</th><th>TOP 1</th></tr></thead>
      <tbody>
        ${logs.map(l => `
          <tr>
            <td style="font-family:'Space Mono',monospace;font-size:12px;">${l.time}</td>
            <td style="font-size:12px;color:var(--text-muted);">${l.type}</td>
            <td>${l.count}개</td>
            <td><span class="tag ${l.status === '성공' ? 'tag-up' : 'tag-down'}">${l.status}</span></td>
            <td style="font-size:12px;">${l.top}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// ── 데이터 소스 ──
function renderAdminDataSources() {
  const sources = [
    { name: '네이버 검색량 API',  status: '연결됨', interval: '10분',  last: '14:32', count: '48,200건' },
    { name: '인스타그램 크롤러', status: '연결됨', interval: '15분',  last: '14:25', count: '12,840건' },
    { name: '유튜브 데이터 API', status: '연결됨', interval: '20분',  last: '14:20', count: '8,920건'  },
    { name: '뉴스 RSS 수집기',   status: '오류',   interval: '30분',  last: '13:50', count: '—'       },
    { name: '커뮤니티 크롤러',   status: '연결됨', interval: '30분',  last: '14:10', count: '5,680건'  },
    { name: '구글 트렌드 API',   status: '준비중', interval: '1시간', last: '—',     count: '—'       },
  ];
  const statusCls = { '연결됨': 'tag-up', '오류': 'tag-down', '준비중': 'tag-stable' };
  return `
    <div class="flex-between mb24">
      <h2 style="font-size:22px;font-weight:800;">데이터 소스 관리</h2>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px;">
      ${sources.map(s => `
        <div class="card" style="padding:16px 20px;display:flex;align-items:center;gap:16px;">
          <div style="flex:1;">
            <div style="font-size:14px;font-weight:700;">${s.name}</div>
            <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">수집 주기: ${s.interval} · 마지막 수집: ${s.last}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:12px;font-weight:600;margin-bottom:4px;">${s.count}</div>
            <span class="tag ${statusCls[s.status] || 'tag-stable'}">${s.status}</span>
          </div>
          <button class="action-btn action-edit">설정</button>
        </div>
      `).join('')}
    </div>
  `;
}
