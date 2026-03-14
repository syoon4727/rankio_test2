// ==================== UTILITIES ====================
// js/utils.js

/**
 * 순위 변화 HTML 반환
 * @param {number} val - 순위 변화 수치
 * @returns {string} HTML string
 */
function changeIcon(val) {
  if (val > 0) return `<span class="rank-change up">▲ ${val}</span>`;
  if (val < 0) return `<span class="rank-change down">▼ ${Math.abs(val)}</span>`;
  return `<span class="rank-change same">—</span>`;
}

/**
 * 배지 HTML 반환
 * @param {string} badge - 배지 텍스트
 * @returns {string} HTML string
 */
function badgeHtml(badge) {
  if (!badge) return '';
  const map = {
    '급상승':  'tag-up',
    '신규진입': 'tag-new',
    '신규':    'tag-new',
    '안정형':  'tag-stable',
    '인기':    'tag-brand',
  };
  const cls = map[badge] || '';
  return cls
    ? `<span class="tag ${cls}">${badge}</span>`
    : `<span class="badge">${badge}</span>`;
}

/**
 * 카테고리별 배경 색상 반환
 * @param {string} catId - 카테고리 ID
 * @returns {string} CSS color
 */
function getBgColor(catId) {
  const colors = {
    c1: '#FFF4E6',
    c2: '#EEF4FB',
    c3: '#FEF0F7',
    c4: '#F0FAF4',
    c5: '#FEFAE0',
    c6: '#FFF0EE',
    c7: '#F0EEFF',
    c8: '#E8F4FE',
    c9: '#F5F5F5',
  };
  return colors[catId] || '#F7F7F5';
}

/**
 * 랭킹 아이템 리스트 HTML 렌더링
 * @param {Array} items - 랭킹 아이템 배열
 * @param {string} entityType - 'brand' | 'category' | 'region'
 * @returns {string} HTML string
 */
function renderRankList(items, entityType) {
  return items.map((item, i) => {
    const clickHandler = entityType === 'brand'
      ? `showPage('brand-detail', BRANDS.find(b => b.id === '${item.id}'))`
      : `showPage('${entityType === 'category' ? 'industry' : 'market'}')`;

    return `
      <div class="rank-item" onclick="${clickHandler}">
        <div class="rank-num ${i < 3 ? 'top' : ''}">${item.rank}</div>
        <div class="rank-logo">${item.icon}</div>
        <div class="rank-info">
          <div class="rank-name">${item.name}</div>
          <div class="rank-meta">${item.catName || item.desc?.slice(0, 20) || ''} ${badgeHtml(item.badge)}</div>
        </div>
        <div style="text-align:right;">
          <div class="rank-score">${(item.score || 0).toLocaleString()}</div>
          ${changeIcon(item.change || 0)}
        </div>
      </div>
    `;
  }).join('');
}

/**
 * 매물 카드 HTML 렌더링
 * @param {Object} l - 매물 객체
 * @returns {string} HTML string
 */
function renderListingCard(l) {
  return `
    <div class="listing-card" onclick="showPage('listings')">
      <div class="listing-top">
        <div>
          <div class="listing-name">${l.title}</div>
          <div class="listing-row mt4">
            ${l.brand ? `<span class="badge">${l.brand}</span>` : ''}
            <span class="badge">${l.cat}</span>
          </div>
        </div>
        ${l.hot ? '<span class="tag tag-up">HOT</span>' : ''}
      </div>
      <div class="listing-info">
        <div class="listing-row">📍 ${l.region}</div>
        <div class="listing-row">📐 ${l.area || '미공개'}</div>
      </div>
      <div class="flex-between">
        <div>
          <div class="listing-price">${l.invest?.toLocaleString()}<span>만원</span></div>
          <div style="font-size:11px;color:var(--text-muted);">보증금 ${l.deposit?.toLocaleString()}만원</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:11px;color:var(--text-muted);">월세 ${l.rent?.toLocaleString()}만원</div>
          <div style="font-size:11px;color:var(--text-muted);">${l.date}</div>
        </div>
      </div>
    </div>
  `;
}

/**
 * 협력사 카드 HTML 렌더링
 * @param {Object} p - 협력사 객체
 * @returns {string} HTML string
 */
function renderPartnerCard(p) {
  return `
    <div class="partner-card" onclick="showPage('partners')">
      <div class="partner-logo">${p.icon}</div>
      <div style="flex:1;min-width:0;">
        <div class="partner-name">${p.name}</div>
        <div class="partner-cat">${p.cat} · ${p.region}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">${p.desc}</div>
      </div>
      <span class="tag tag-brand" style="flex-shrink:0;font-size:10px;">파트너</span>
    </div>
  `;
}

/**
 * 푸터를 지정한 placeholder 요소에 주입
 * @param {string} targetId - placeholder 요소의 id
 */
function injectFooter(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;
  const tpl = document.getElementById('footer-tpl');
  if (!tpl) return;
  target.innerHTML = tpl.innerHTML;
}
