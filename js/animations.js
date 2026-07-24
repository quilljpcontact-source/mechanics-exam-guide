/* ============================================
   インタラクティブ物理アニメーション（改良版）
   canvas 2D + requestAnimationFrame
   クリック/タップで再生・一時停止
   ============================================ */

/* 問題IDごとに使うアニメーションの種類 */
const ANIM_BY_ID = {
  // 2023年度
  "1-1": "central-force", "1-4": "vortex",
  "2-1": "ladder", "2-2": "ladder", "2-3": "ladder", "2-4": "ladder",
  "3-1": "spring", "3-2": "spring", "3-3": "spring", "3-4": "spring", "3-5": "spring", "3-6": "beats",
  "4-1": "kepler", "4-2": "kepler", "4-3": "kepler", "4-4": "kepler", "4-5": "kepler", "4-6": "kepler",
  "5-1": "collision1d", "5-2": "collision1d", "5-3": "collision1d", "5-4": "collision1d",
  "6-1": "fall-terminal", "6-2": "fall-terminal", "6-3": "fall-terminal", "6-4": "fall-terminal",
  // 2025年度
  "25-1-1": "earth-tunnel", "25-1-2": "earth-tunnel", "25-1-3": "earth-tunnel",
  "25-2-1": "kepler", "25-2-2": "kepler", "25-2-3": "kepler", "25-2-4": "kepler",
  "25-3-1": "damped", "25-3-2": "damped", "25-3-3": "damped", "25-3-4": "damped", "25-3-5": "damped",
  "25-4-1": "collision2d", "25-4-2": "collision2d", "25-4-3": "collision2d", "25-4-4": "collision2d",
  "25-5-1": "rod-string", "25-5-2": "rod-string", "25-5-3": "rod-string", "25-5-4": "rod-string",
  "25-6-1": "vortex", "25-6-4": "central-force",
  "25-7-1": "projectile-drag", "25-7-2": "projectile-drag", "25-7-3": "projectile-drag", "25-7-4": "projectile-drag"
};

const ANIM_CAPTION = {
  "central-force": "中心力：力の矢印は常に中心を向く。近いほど強く、その力で天体のように軌道を描く。",
  "vortex": "F=(−y, x, 0) の渦。ぐるぐる回す力＝回転(rot)が0でない＝保存力ではない（反時計回り）。",
  "ladder": "壁に立てかけたはしご。人が上に登るほど、壁の抗力 R と、それを支える摩擦 f が増える。",
  "spring": "バネの復元力＋周期的な外力（強制振動）。外からのリズムに合わせて揺れ続ける。",
  "beats": "振動数の近い2つの波の重ね合わせ＝うなり。ゆっくりした包絡線（点線）が現れる。",
  "kepler": "太陽を焦点とする楕円軌道。近日点（太陽に近い）ほど速く動く＝面積速度が一定。",
  "collision1d": "弾性衝突。軽いAが重いBにぶつかって跳ね返り、Bが押し出される。",
  "fall-terminal": "空気抵抗を受けて落下。速くなるほど抵抗が増し、やがて終端速度で一定に（v-tグラフが飽和）。",
  "earth-tunnel": "地球を貫くトンネル内の単振動。端から落とすと中心を最速で通過し反対端へ（約42分）。",
  "damped": "減衰振動。揺れながら振幅が指数的に小さくなっていく。",
  "collision2d": "2次元の弾性衝突。静止したBにAが当たり、入射方向をはさんで上下に飛び散る。",
  "rod-string": "糸で吊るした棒の下端を水平力Fで引く。Fが大きいほど棒も糸も大きく傾く。",
  "projectile-drag": "空気抵抗つきの投げ上げ。上昇→最高点→下降し、v-tグラフは0を横切って終端速度へ。"
};

/* ---------- 共通ヘルパー ---------- */
function animIsDark() {
  return document.documentElement.getAttribute("data-theme") === "dark";
}
function animThemeColors() {
  return animIsDark()
    ? { bg: "#141b24", panel: "#1a2531", fg: "#e9eff4", accent: "#22d3ee", accent2: "#60a5fa",
        muted: "#9aa7b5", good: "#34d399", warn: "#fbbf24", line: "#33455680", red: "#fb7185",
        earth: "#3b5b7a", grid: "#22303e", tagbg: "rgba(20,27,36,0.82)" }
    : { bg: "#f5fafc", panel: "#ffffff", fg: "#14202b", accent: "#0e7fa6", accent2: "#2563eb",
        muted: "#5a6773", good: "#0f9d6f", warn: "#d97706", line: "#b9cbd7", red: "#e11d48",
        earth: "#8fb4d4", grid: "#e3edf3", tagbg: "rgba(255,255,255,0.85)" };
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function arrow(ctx, x0, y0, x1, y1, color, w) {
  const a = Math.atan2(y1 - y0, x1 - x0);
  const len = Math.hypot(x1 - x0, y1 - y0);
  if (len < 0.5) return;
  const hl = 8 + w * 1.6;
  ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = w;
  ctx.lineCap = "round";
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1 - Math.cos(a) * hl * 0.5, y1 - Math.sin(a) * hl * 0.5); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x1, y1);
  ctx.lineTo(x1 - hl * Math.cos(a - 0.4), y1 - hl * Math.sin(a - 0.4));
  ctx.lineTo(x1 - hl * Math.cos(a + 0.4), y1 - hl * Math.sin(a + 0.4));
  ctx.closePath(); ctx.fill();
  ctx.lineCap = "butt";
}

/* 下地つきラベル（読みやすさ向上）。align:"left"|"center" */
function tag(ctx, x, y, text, color, size, align) {
  const C = animThemeColors();
  size = size || 12.5;
  ctx.font = `700 ${size}px "Noto Sans JP", sans-serif`;
  const tw = ctx.measureText(text).width;
  const px = align === "center" ? x - tw / 2 : x;
  ctx.fillStyle = C.tagbg;
  roundRect(ctx, px - 5, y - size - 1, tw + 10, size + 7, 5); ctx.fill();
  ctx.fillStyle = color;
  ctx.fillText(text, px, y);
}

/* 図の左上に見出しチップ */
function title(ctx, text, C) { tag(ctx, 16, 24, text, C.fg, 13, "left"); }

/* rAF ループ管理。step({ctx,t,dt,W,H,C,playing}) を毎フレーム呼ぶ。 */
function runAnim(canvas, step) {
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let W = 0, H = 0, playing = false, t = 0, last = 0, raf = null, everPlayed = false;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = Math.max(rect.width, 10); H = Math.max(rect.height, 10);
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function overlay(C) {
    if (playing) return;
    ctx.save();
    ctx.fillStyle = "rgba(6,12,20,0.34)";
    ctx.fillRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2, r = 32;
    ctx.fillStyle = "rgba(255,255,255,0.94)";
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.accent;
    ctx.beginPath();
    ctx.moveTo(cx - 9, cy - 14); ctx.lineTo(cx - 9, cy + 14); ctx.lineTo(cx + 16, cy); ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.font = '700 13px "Noto Sans JP", sans-serif';
    ctx.textAlign = "center";
    ctx.fillText(everPlayed ? "タップで再開" : "タップで動かす", cx, cy + r + 24);
    ctx.textAlign = "left";
    ctx.restore();
  }
  function frame(ts) {
    if (!last) last = ts;
    let dt = (ts - last) / 1000; last = ts;
    if (dt > 0.05) dt = 0.05;
    if (playing) t += dt;
    const C = animThemeColors();
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, W, H);
    step({ ctx, t, dt: playing ? dt : 0, W, H, C, playing });
    overlay(C);
    raf = requestAnimationFrame(frame);
  }
  function toggle() { playing = !playing; if (playing) everPlayed = true; last = 0; }

  canvas.addEventListener("click", toggle);
  resize();
  window.addEventListener("resize", resize);
  raf = requestAnimationFrame(frame);

  return {
    stop() {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", toggle);
    }
  };
}

/* ============================================
   各アニメーション定義
   ============================================ */
const ANIMATIONS = {

  /* ---- 中心力：力は常に中心向き＋その力で軌道運動 ---- */
  "central-force"(canvas) {
    let phi = 0; const trail = [];
    return runAnim(canvas, ({ ctx, dt, W, H, C }) => {
      const cx = W / 2, cy = H / 2;
      const a = Math.min(W * 0.3, 130), b = a * 0.62;
      const c = Math.sqrt(Math.max(a * a - b * b, 1));
      const cenX = cx, cenY = cy;                 // 力の中心
      // 放射状の力場（中心向き、近いほど長い＝強い）
      for (let k = 0; k < 16; k++) {
        const ang = (k / 16) * Math.PI * 2;
        for (const rr of [58, 92]) {
          const ox = cenX + rr * Math.cos(ang), oy = cenY + rr * Math.sin(ang);
          const L = 900 / rr;                      // 近いほど長い
          arrow(ctx, ox, oy, ox - (L) * Math.cos(ang), oy - (L) * Math.sin(ang), C.line, 1.6);
        }
      }
      // 軌道（楕円、中心が焦点）
      const ecx = cenX + c;                        // 楕円中心（焦点=力の中心）
      ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.ellipse(ecx, cenY, a, b, 0, 0, Math.PI * 2); ctx.stroke();
      // 面積速度一定で回る質点
      const pos = (p) => [ecx + a * Math.cos(p), cenY + b * Math.sin(p)];
      let [px, py] = pos(phi);
      const r = Math.hypot(px - cenX, py - cenY);
      phi += dt * (a * b * 1.0) / (r * r);
      [px, py] = pos(phi);
      trail.push([px, py]); if (trail.length > 46) trail.shift();
      ctx.strokeStyle = C.accent2; ctx.lineWidth = 2;
      ctx.beginPath();
      trail.forEach((p, i) => i === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]));
      ctx.stroke();
      // 中心
      ctx.fillStyle = C.warn;
      ctx.beginPath(); ctx.arc(cenX, cenY, 13, 0, Math.PI * 2); ctx.fill();
      // 質点に働く力（常に中心向き、太い矢印）
      const dx = cenX - px, dy = cenY - py, d = Math.hypot(dx, dy);
      arrow(ctx, px, py, px + dx / d * 42, py + dy / d * 42, C.accent, 3.5);
      ctx.fillStyle = C.accent2;
      ctx.beginPath(); ctx.arc(px, py, 9, 0, Math.PI * 2); ctx.fill();
      tag(ctx, px + 12, py - 6, "F（中心向き）", C.accent, 12, "left");
      tag(ctx, cenX, cenY + 30, "中心", C.warn, 12, "center");
      title(ctx, "力は常に中心を向く（中心力）", C);
    });
  },

  /* ---- 渦の力場 F=(-y,x,0)（数学座標＝y上向きで反時計回り） ---- */
  "vortex"(canvas) {
    let ang = 0;
    return runAnim(canvas, ({ ctx, dt, W, H, C }) => {
      const cx = W / 2, cy = H / 2;
      ang += dt * 0.8;
      // グリッドの力ベクトル（数学座標: screenY = cy - mathY）
      for (let ix = -2; ix <= 2; ix++) {
        for (let iy = -1; iy <= 1; iy++) {
          const mx = ix * 60, my = iy * 60;
          if (mx === 0 && my === 0) continue;
          const sx = cx + mx, sy = cy - my;         // 画面座標
          const Fx = -my, Fy = mx;                  // F=(-y, x)
          const m = Math.hypot(Fx, Fy) || 1, s = 24;
          arrow(ctx, sx, sy, sx + Fx / m * s, sy - Fy / m * s, C.line, 1.8);
        }
      }
      // 反時計回りに回る粒子（数学座標）
      const R = 80;
      const px = cx + R * Math.cos(ang), py = cy - R * Math.sin(ang);
      const Fx = -Math.sin(ang), Fy = Math.cos(ang); // 接線=F方向
      arrow(ctx, px, py, px + Fx * 40, py - Fy * 40, C.accent, 3.5);
      ctx.fillStyle = C.accent2;
      ctx.beginPath(); ctx.arc(px, py, 10, 0, Math.PI * 2); ctx.fill();
      // 中央の回転記号（反時計回り）
      ctx.strokeStyle = C.warn; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(cx, cy, 22, Math.PI * 0.15, Math.PI * 1.55); ctx.stroke();
      const ea = Math.PI * 1.55;
      arrow(ctx, cx + 22 * Math.cos(ea), cy - 22 * Math.sin(ea) * -1,
        cx + 22 * Math.cos(ea) - 9, cy - 22 * Math.sin(ea) * -1 - 7, C.warn, 2.5);
      title(ctx, "渦を作る力 → ∇×F ≠ 0（保存力でない）", C);
      tag(ctx, cx, cy + 46, "反時計回り", C.warn, 12, "center");
    });
  },

  /* ---- はしご：人が登る＋力ベクトル（摩擦は壁向き＝左） ---- */
  "ladder"(canvas) {
    let ph = 0;
    return runAnim(canvas, ({ ctx, dt, W, H, C }) => {
      ph += dt * 0.5;
      const pad = 48;
      const wallX = pad + 4;
      const Oy = H - pad;
      const Ox = pad + Math.min(W * 0.42, 210);
      const topX = wallX, topY = pad + 28;
      // 壁と地面
      ctx.strokeStyle = C.muted; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(wallX, pad - 4); ctx.lineTo(wallX, Oy); ctx.lineTo(W - pad + 10, Oy); ctx.stroke();
      // ハッチング（壁・地面）
      ctx.strokeStyle = C.line; ctx.lineWidth = 1;
      for (let i = 0; i < 10; i++) { const yy = pad + i * ((Oy - pad) / 10); ctx.beginPath(); ctx.moveTo(wallX - 8, yy + 8); ctx.lineTo(wallX, yy); ctx.stroke(); }
      const dx = topX - Ox, dy = topY - Oy, len = Math.hypot(dx, dy);
      const nx = -dy / len, ny = dx / len;
      // はしご
      ctx.strokeStyle = C.fg; ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(Ox, Oy); ctx.lineTo(topX, topY); ctx.stroke();
      ctx.lineWidth = 2; ctx.strokeStyle = C.muted;
      for (let i = 1; i < 6; i++) {
        const f = i / 6, rx = Ox + dx * f, ry = Oy + dy * f;
        ctx.beginPath(); ctx.moveTo(rx - nx * 5, ry - ny * 5); ctx.lineTo(rx + nx * 5, ry + ny * 5); ctx.stroke();
      }
      // 人
      const climb = (Math.sin(ph) * 0.5 + 0.5) * 0.8 + 0.1;
      const hx = Ox + dx * climb, hy = Oy + dy * climb;
      ctx.fillStyle = C.accent2;
      ctx.beginPath(); ctx.arc(hx, hy, 8, 0, Math.PI * 2); ctx.fill();
      // 力ベクトル
      arrow(ctx, Ox, Oy, Ox, Oy - 50, C.good, 3);            // N 上
      tag(ctx, Ox + 6, Oy - 50, "N", C.good, 13, "left");
      arrow(ctx, Ox, Oy, Ox - 48, Oy, C.warn, 3);            // f 摩擦（壁向き＝左）★修正
      tag(ctx, Ox - 74, Oy + 20, "f 摩擦", C.warn, 12, "left");
      arrow(ctx, topX, topY, topX + 48, topY, C.red, 3);     // R 壁（右）
      tag(ctx, topX + 22, topY - 6, "R", C.red, 13, "left");
      const midX = (Ox + topX) / 2, midY = (Oy + topY) / 2;
      arrow(ctx, midX, midY, midX, midY + 38, C.muted, 2.5); // Mg
      tag(ctx, midX - 40, midY + 34, "Mg", C.muted, 12, "left");
      arrow(ctx, hx, hy, hx, hy + 32, C.accent, 3);          // mg 人
      tag(ctx, hx + 12, hy + 30, "mg", C.accent, 12, "left");
      // Rゲージ（登るほど増える）
      const barX = W - pad - 6, barY = pad + 4, barH = 96;
      ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.strokeRect(barX, barY, 13, barH);
      ctx.fillStyle = C.red; ctx.fillRect(barX, barY + barH - barH * climb, 13, barH * climb);
      tag(ctx, barX - 20, barY - 6, "R", C.red, 12, "left");
      tag(ctx, W - pad - 84, Oy - 6, "高いほどR大", C.muted, 11, "left");
      title(ctx, "f と R はつり合う（f = R）", C);
    });
  },

  /* ---- 強制振動：バネ＋質点＋外力 ---- */
  "spring"(canvas) {
    return runAnim(canvas, ({ ctx, t, W, H, C }) => {
      const wallX = 46, cy = H / 2 - 6;
      const amp = 54;
      const x = amp * Math.sin(t * 2.3);
      const mx = W * 0.52 + x;
      ctx.strokeStyle = C.muted; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(wallX, cy - 44); ctx.lineTo(wallX, cy + 44); ctx.stroke();
      ctx.strokeStyle = C.accent; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(wallX, cy);
      const coils = 14, span = mx - 26 - wallX;
      for (let i = 0; i <= coils; i++) {
        const px = wallX + (span * i) / coils;
        const py = cy + (i === 0 || i === coils ? 0 : (i % 2 ? -12 : 12));
        ctx.lineTo(px, py);
      }
      ctx.lineTo(mx - 26, cy); ctx.stroke();
      ctx.fillStyle = C.accent2;
      roundRect(ctx, mx - 26, cy - 24, 48, 48, 6); ctx.fill();
      // 外力
      const F = 34 * Math.sin(t * 2.3);
      arrow(ctx, mx, cy, mx + F, cy, C.warn, 3.5);
      tag(ctx, mx + 30, cy - 34, "外力", C.warn, 12, "left");
      ctx.strokeStyle = C.line; ctx.setLineDash([4, 4]); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(W * 0.52, cy - 50); ctx.lineTo(W * 0.52, cy + 50); ctx.stroke();
      ctx.setLineDash([]);
      tag(ctx, W * 0.52, cy + 66, "平衡位置", C.muted, 11, "center");
      drawTrace(ctx, W, H, C, t, (tt) => Math.sin(tt * 2.3));
      title(ctx, "強制振動（外力で揺すられる）", C);
    });
  },

  /* ---- うなり ---- */
  "beats"(canvas) {
    return runAnim(canvas, ({ ctx, t, W, H, C }) => {
      const cy = H / 2, amp = H * 0.26;
      const w1 = 0.13, w2 = 0.15, sp = 55;
      ctx.strokeStyle = C.warn; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.6;
      for (const sgn of [1, -1]) {
        ctx.beginPath();
        for (let px = 18; px < W - 18; px++) {
          const x = px - 18 + t * sp;
          const y = cy - sgn * amp * Math.abs(Math.cos((w1 - w2) / 2 * x));
          px === 18 ? ctx.moveTo(px, y) : ctx.lineTo(px, y);
        }
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.lineWidth = 2.5; ctx.strokeStyle = C.accent;
      ctx.beginPath();
      for (let px = 18; px < W - 18; px++) {
        const x = px - 18 + t * sp;
        const y = cy - amp * (Math.sin(w1 * x) + Math.sin(w2 * x)) / 2;
        px === 18 ? ctx.moveTo(px, y) : ctx.lineTo(px, y);
      }
      ctx.stroke();
      title(ctx, "うなり：2つの波の重ね合わせ", C);
      tag(ctx, W - 150, H - 16, "点線＝包絡線", C.warn, 11, "left");
    });
  },

  /* ---- ケプラー楕円軌道 ---- */
  "kepler"(canvas) {
    let phi = 0; const trail = [];
    return runAnim(canvas, ({ ctx, dt, W, H, C }) => {
      const cx = W / 2 + 16, cy = H / 2 + 6;
      const a = Math.min(W * 0.3, 128), b = a * 0.72;
      const c = Math.sqrt(a * a - b * b);
      const sunX = cx - c, sunY = cy;
      const pos = (p) => [cx + a * Math.cos(p), cy + b * Math.sin(p)];
      let [px, py] = pos(phi);
      const r = Math.hypot(px - sunX, py - sunY);
      phi += dt * (a * b * 1.05) / (r * r);
      [px, py] = pos(phi);
      ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.ellipse(cx, cy, a, b, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = C.warn;
      ctx.beginPath(); ctx.arc(sunX, sunY, 13, 0, Math.PI * 2); ctx.fill();
      tag(ctx, sunX, sunY + 30, "太陽（焦点）", C.warn, 12, "center");
      ctx.strokeStyle = C.accent; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(sunX, sunY); ctx.lineTo(px, py); ctx.stroke();
      trail.push([px, py]); if (trail.length > 55) trail.shift();
      ctx.strokeStyle = C.accent2; ctx.lineWidth = 2;
      ctx.beginPath();
      trail.forEach((p, i) => i === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]));
      ctx.stroke();
      ctx.fillStyle = C.accent2;
      ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2); ctx.fill();
      // 近日点・遠日点マーク
      const near = pos(Math.PI), far = pos(0);
      ctx.fillStyle = C.good;
      ctx.beginPath(); ctx.arc(near[0], near[1], 3.5, 0, Math.PI * 2); ctx.fill();
      tag(ctx, near[0] - 4, near[1] - 10, "近日点(速)", C.good, 10.5, "left");
      title(ctx, "楕円軌道：近日点ほど速い（面積速度一定）", C);
    });
  },

  /* ---- 1次元弾性衝突 ---- */
  "collision1d"(canvas) {
    const mA = 1, mB = 3 + 2 * Math.sqrt(2);
    let xA = 0, xB = 0, vA = 0, vB = 0, started = false, flash = 0, initW = 0;
    const reset = (W) => { xA = W * 0.16; xB = W * 0.6; vA = 150; vB = 0; started = false; flash = 0; };
    return runAnim(canvas, ({ ctx, dt, W, H, C }) => {
      if (!initW || Math.abs(initW - W) > 1) { initW = W; reset(W); }
      const cy = H / 2 + 26, rA = 15, rB = 15 * Math.cbrt(mB);
      ctx.strokeStyle = C.muted; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(16, cy + rB + 6); ctx.lineTo(W - 16, cy + rB + 6); ctx.stroke();
      xA += vA * dt; xB += vB * dt;
      if (!started && xA + rA >= xB - rB) {
        const u = vA;
        vA = ((mA - mB) / (mA + mB)) * u;
        vB = ((2 * mA) / (mA + mB)) * u;
        started = true; flash = 1;
      }
      if (flash > 0) flash -= dt * 2.5;
      if (xA - rA < 16 && vA < 0) reset(W);
      if (xB - rB > W - 16) reset(W);
      // 衝突フラッシュ
      if (flash > 0) {
        ctx.fillStyle = `rgba(251,191,36,${flash * 0.5})`;
        ctx.beginPath(); ctx.arc((xA + xB) / 2, cy, 30 * (1.4 - flash), 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = C.warn;
      ctx.beginPath(); ctx.arc(xB, cy, rB, 0, Math.PI * 2); ctx.fill();
      tag(ctx, xB, cy + 4, "B (重)", "#fff", 12, "center");
      ctx.fillStyle = C.accent2;
      ctx.beginPath(); ctx.arc(xA, cy, rA, 0, Math.PI * 2); ctx.fill();
      tag(ctx, xA, cy + 4, "A", "#fff", 11, "center");
      if (Math.abs(vA) > 1) arrow(ctx, xA, cy - rA - 10, xA + vA * 0.2, cy - rA - 10, C.accent, 2.5);
      if (Math.abs(vB) > 1) arrow(ctx, xB, cy - rB - 10, xB + vB * 0.16, cy - rB - 10, C.red, 2.5);
      title(ctx, started ? "衝突後：Aは跳ね返り、Bが進む" : "衝突前：軽いAが重いBへ近づく", C);
    });
  },

  /* ---- 終端速度落下 ---- */
  "fall-terminal"(canvas) {
    let y = 0, v = 0; const g = 260, vt = 175; let initH = 0;
    const graph = [];
    return runAnim(canvas, ({ ctx, dt, W, H, C }) => {
      if (!initH) { initH = H; y = 34; v = 0; }
      v += (g * (1 - (v * v) / (vt * vt))) * dt;
      y += v * dt;
      const laneX = W * 0.26;
      if (y > H - 30) { y = 34; v = 0; graph.length = 0; }
      graph.push(v / vt); if (graph.length > 120) graph.shift();
      // 物体
      ctx.fillStyle = C.accent2;
      ctx.beginPath(); ctx.arc(laneX, y, 13, 0, Math.PI * 2); ctx.fill();
      arrow(ctx, laneX, y + 4, laneX, y + 20 + v * 0.07, C.accent, 3);   // 速度（下）
      tag(ctx, laneX - 54, y + 20, "速度 v", C.accent, 11, "left");
      arrow(ctx, laneX + 18, y - 4, laneX + 18, y - 18 - v * 0.09, C.warn, 2.5); // 抵抗（上）
      tag(ctx, laneX + 26, y - 8, "抵抗", C.warn, 11, "left");
      // v-t グラフ
      const gx = W * 0.5, gy = 34, gw = W * 0.44, gh = H - 74;
      ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.strokeRect(gx, gy, gw, gh);
      ctx.strokeStyle = C.warn; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(gx, gy + 12); ctx.lineTo(gx + gw, gy + 12); ctx.stroke();
      ctx.setLineDash([]);
      tag(ctx, gx + 6, gy + 12, "終端速度", C.warn, 10.5, "left");
      ctx.strokeStyle = C.accent; ctx.lineWidth = 2.5;
      ctx.beginPath();
      graph.forEach((val, i) => {
        const gxp = gx + (gw * i) / 120, gyp = gy + gh - (gh - 14) * Math.min(val, 1);
        i === 0 ? ctx.moveTo(gxp, gyp) : ctx.lineTo(gxp, gyp);
      });
      ctx.stroke();
      tag(ctx, gx + 6, gy + gh - 6, "v–t（一定値に飽和）", C.muted, 11, "left");
      title(ctx, "空気抵抗で落下 → 終端速度へ", C);
    });
  },

  /* ---- 地球トンネル ---- */
  "earth-tunnel"(canvas) {
    let ph = 0;
    return runAnim(canvas, ({ ctx, dt, W, H, C }) => {
      ph += dt * 1.05;
      const cx = W / 2, cy = H / 2 + 6, R = Math.min(W, H) * 0.34;
      ctx.fillStyle = C.earth;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
      ctx.strokeStyle = C.bg; ctx.lineWidth = 6;
      ctx.beginPath(); ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke();
      ctx.fillStyle = C.warn;
      ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();
      tag(ctx, cx + 10, cy + 5, "中心 O", C.warn, 11, "left");
      const py = cy - R * Math.cos(ph);
      const v = R * Math.sin(ph);
      // 速度矢印
      if (Math.abs(v) > 4) arrow(ctx, cx + 20, py, cx + 20, py + Math.sign(v) * (14 + Math.abs(v) * 0.04), C.accent, 2.5);
      ctx.fillStyle = C.accent2;
      ctx.beginPath(); ctx.arc(cx, py, 10, 0, Math.PI * 2); ctx.fill();
      // 端の目印
      ctx.fillStyle = C.good;
      ctx.beginPath(); ctx.arc(cx, cy - R, 4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy + R, 4, 0, Math.PI * 2); ctx.fill();
      tag(ctx, cx + 10, cy - R + 4, "端", C.good, 10.5, "left");
      title(ctx, "地球トンネルの単振動（中心で最速）", C);
    });
  },

  /* ---- 減衰振動 ---- */
  "damped"(canvas) {
    let tt = 0;
    return runAnim(canvas, ({ ctx, dt, W, H, C }) => {
      tt += dt; if (tt > 14) tt = 0;               // 自動リセットで見やすく
      const cy = H / 2, wallY = 38, cx = W * 0.24;
      const env = Math.exp(-tt * 0.35);
      const x = 72 * env * Math.cos(tt * 3.2);
      const my = cy + x;
      ctx.strokeStyle = C.muted; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(cx - 42, wallY); ctx.lineTo(cx + 42, wallY); ctx.stroke();
      ctx.strokeStyle = C.accent; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(cx, wallY);
      const coils = 11, span = my - 24 - wallY;
      for (let i = 0; i <= coils; i++) {
        const py = wallY + (span * i) / coils;
        const px = cx + (i === 0 || i === coils ? 0 : (i % 2 ? 12 : -12));
        ctx.lineTo(px, py);
      }
      ctx.lineTo(cx, my - 24); ctx.stroke();
      ctx.fillStyle = C.accent2;
      roundRect(ctx, cx - 24, my - 24, 48, 48, 6); ctx.fill();
      ctx.strokeStyle = C.line; ctx.setLineDash([4, 4]); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx - 62, cy); ctx.lineTo(cx + 62, cy); ctx.stroke();
      ctx.setLineDash([]);
      // グラフ
      const gx = W * 0.5, gy = 34, gw = W * 0.44, gh = H - 74, mid = gy + gh / 2;
      ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.strokeRect(gx, gy, gw, gh);
      ctx.strokeStyle = C.warn; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.3;
      for (const sgn of [1, -1]) {
        ctx.beginPath();
        for (let i = 0; i <= gw; i++) {
          const T = i / 34, yy = mid - sgn * (gh / 2 - 6) * Math.exp(-T * 0.35);
          i === 0 ? ctx.moveTo(gx + i, yy) : ctx.lineTo(gx + i, yy);
        }
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.strokeStyle = C.accent; ctx.lineWidth = 2.2;
      ctx.beginPath();
      for (let i = 0; i <= gw; i++) {
        const T = i / 34, yy = mid - (gh / 2 - 6) * Math.exp(-T * 0.35) * Math.cos(T * 3.2);
        i === 0 ? ctx.moveTo(gx + i, yy) : ctx.lineTo(gx + i, yy);
      }
      ctx.stroke();
      // 進行マーカー
      const mi = Math.min(tt * 34, gw);
      ctx.fillStyle = C.accent2;
      ctx.beginPath(); ctx.arc(gx + mi, mid - (gh / 2 - 6) * env * Math.cos(tt * 3.2), 4, 0, Math.PI * 2); ctx.fill();
      tag(ctx, gx + 6, gy + gh - 6, "振幅が指数的に減衰", C.muted, 11, "left");
      title(ctx, "減衰振動", C);
    });
  },

  /* ---- 2次元弾性衝突（的Bを最初から表示） ---- */
  "collision2d"(canvas) {
    let xA, phase, flash, initW = 0;
    const th = Math.atan(3), phi = Math.PI / 4;
    const reset = (W) => { xA = 40; phase = 0; flash = 0; };
    return runAnim(canvas, ({ ctx, dt, W, H, C }) => {
      if (!initW || Math.abs(initW - W) > 1) { initW = W; reset(W); }
      const cx = W * 0.46, cy = H / 2 + 6;
      // 入射方向の点線（常に表示）
      ctx.strokeStyle = C.line; ctx.setLineDash([4, 4]); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(24, cy); ctx.lineTo(W - 18, cy); ctx.stroke(); ctx.setLineDash([]);
      // 的B（静止、常に表示）
      const bDrawn = phase === 0;
      if (bDrawn) {
        ctx.fillStyle = C.warn;
        ctx.beginPath(); ctx.arc(cx, cy, 17, 0, Math.PI * 2); ctx.fill();
        tag(ctx, cx, cy + 4, "B", "#fff", 12, "center");
        tag(ctx, cx - 6, cy + 40, "静止した B (3m)", C.muted, 11, "left");
      }
      if (phase === 0) {
        xA += 135 * dt;
        if (xA >= cx - 28) { phase = 0.001; flash = 1; }
        ctx.fillStyle = C.accent2;
        ctx.beginPath(); ctx.arc(xA, cy, 12, 0, Math.PI * 2); ctx.fill();
        tag(ctx, xA, cy + 4, "A", "#fff", 12, "center");
        arrow(ctx, xA - 34, cy, xA - 12, cy, C.accent, 2.5);
        tag(ctx, 24, cy - 14, "速さ v で入射", C.muted, 11, "left");
      } else {
        phase += dt;
        if (flash > 0) flash -= dt * 2.5;
        const d = Math.min((phase) * 115, W * 0.36);
        const ax = cx + d * Math.cos(th), ay = cy - d * Math.sin(th);
        const bx = cx + (d * 0.55) * Math.cos(phi), by = cy + (d * 0.55) * Math.sin(phi);
        if (flash > 0) {
          ctx.fillStyle = `rgba(251,191,36,${flash * 0.5})`;
          ctx.beginPath(); ctx.arc(cx, cy, 26 * (1.4 - flash), 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = C.accent2;
        ctx.beginPath(); ctx.arc(ax, ay, 12, 0, Math.PI * 2); ctx.fill();
        tag(ctx, ax, ay + 4, "A", "#fff", 12, "center");
        tag(ctx, ax + 8, ay - 12, "θ 上へ", C.accent, 11, "left");
        ctx.fillStyle = C.warn;
        ctx.beginPath(); ctx.arc(bx, by, 17, 0, Math.PI * 2); ctx.fill();
        tag(ctx, bx, by + 4, "B", "#fff", 12, "center");
        tag(ctx, bx + 10, by + 18, "45° 下へ", C.warn, 11, "left");
        if (d >= W * 0.36) reset(W);
      }
      title(ctx, "2次元弾性衝突：上下に飛び散る", C);
    });
  },

  /* ---- 棒と糸 ---- */
  "rod-string"(canvas) {
    let ph = 0;
    return runAnim(canvas, ({ ctx, dt, W, H, C }) => {
      ph += dt * 0.8;
      const ceilY = 36, cx = W / 2 - 20;
      const drive = (Math.sin(ph) * 0.5 + 0.5);
      const phi = drive * 0.85;
      const theta = Math.atan(Math.tan(phi) / 2);
      const anchorX = cx, anchorY = ceilY, L1 = 48;
      const Px = anchorX + L1 * Math.sin(theta), Py = anchorY + L1 * Math.cos(theta);
      const L2 = Math.min(H * 0.5, 130);
      const Bx = Px + L2 * Math.sin(phi), By = Py + L2 * Math.cos(phi);
      // 天井
      ctx.strokeStyle = C.muted; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(cx - 80, ceilY); ctx.lineTo(cx + 80, ceilY); ctx.stroke();
      ctx.strokeStyle = C.line; ctx.lineWidth = 1;
      for (let i = 0; i < 12; i++) { const xx = cx - 76 + i * 14; ctx.beginPath(); ctx.moveTo(xx, ceilY); ctx.lineTo(xx - 7, ceilY - 8); ctx.stroke(); }
      // 糸
      ctx.strokeStyle = C.good; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(anchorX, anchorY); ctx.lineTo(Px, Py); ctx.stroke();
      tag(ctx, (anchorX + Px) / 2 - 34, (anchorY + Py) / 2, "糸(張力f)", C.good, 11, "left");
      // 棒
      ctx.strokeStyle = C.fg; ctx.lineWidth = 6;
      ctx.beginPath(); ctx.moveTo(Px, Py); ctx.lineTo(Bx, By); ctx.stroke();
      ctx.fillStyle = C.accent; ctx.beginPath(); ctx.arc(Px, Py, 5, 0, Math.PI * 2); ctx.fill();
      tag(ctx, Px + 8, Py - 2, "P", C.accent, 12, "left");
      // 重力
      const mmx = (Px + Bx) / 2, mmy = (Py + By) / 2;
      arrow(ctx, mmx, mmy, mmx, mmy + 34, C.muted, 2.5);
      tag(ctx, mmx + 8, mmy + 30, "mg", C.muted, 11, "left");
      // F
      const Flen = 22 + 46 * drive;
      arrow(ctx, Bx, By, Bx + Flen, By, C.warn, 3.5);
      tag(ctx, Bx + Flen + 4, By + 4, "F（強いほど傾く）", C.warn, 12, "left");
      title(ctx, "糸で吊るした棒を水平力Fで引く", C);
    });
  },

  /* ---- 投げ上げ＋空気抵抗（初速は上向き） ---- */
  "projectile-drag"(canvas) {
    let y = 0, v = 0, initH = 0; const g = 250, vt = 190;
    const graph = []; let apexY = null;
    return runAnim(canvas, ({ ctx, dt, W, H, C }) => {
      if (!initH) { initH = H; y = H - 44; v = 330; graph.length = 0; apexY = null; } // 上向き正、初速+
      const prevV = v;
      v += (-g - (g / vt) * v) * dt;   // dv/dt = -g -(g/vt)v
      y += -v * dt;                    // 画面yは下向き正
      if (prevV > 0 && v <= 0 && apexY === null) apexY = y;   // 最高点
      const laneX = W * 0.26;
      if (y > H - 44 && v < 0) { y = H - 44; v = 330; graph.length = 0; apexY = null; }
      graph.push(v / 330); if (graph.length > 130) graph.shift();
      // 地面
      ctx.strokeStyle = C.muted; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(16, H - 30); ctx.lineTo(W * 0.46, H - 30); ctx.stroke();
      // 最高点マーク
      if (apexY !== null) {
        ctx.strokeStyle = C.good; ctx.setLineDash([4, 3]); ctx.lineWidth = 1.3;
        ctx.beginPath(); ctx.moveTo(laneX - 40, apexY); ctx.lineTo(laneX + 40, apexY); ctx.stroke();
        ctx.setLineDash([]);
        tag(ctx, laneX + 22, apexY - 4, "最高点 H", C.good, 10.5, "left");
      }
      // 物体
      ctx.fillStyle = C.accent2;
      ctx.beginPath(); ctx.arc(laneX, y, 12, 0, Math.PI * 2); ctx.fill();
      arrow(ctx, laneX, y, laneX, y - v * 0.05, C.accent, 3);       // 速度（上昇中は上）
      tag(ctx, laneX + 16, y - 2, v > 0 ? "上昇" : "下降", C.accent, 11, "left");
      // v-t グラフ
      const gx = W * 0.5, gy = 32, gw = W * 0.44, gh = H - 66, zero = gy + gh * 0.4;
      ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.strokeRect(gx, gy, gw, gh);
      ctx.strokeStyle = C.good; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(gx, zero); ctx.lineTo(gx + gw, zero); ctx.stroke();
      tag(ctx, gx + 6, zero - 4, "v=0（最高点）", C.good, 10, "left");
      ctx.strokeStyle = C.accent; ctx.lineWidth = 2.4;
      ctx.beginPath();
      graph.forEach((val, i) => {
        const gxp = gx + (gw * i) / 130, gyp = zero - val * (gh * 0.4);
        i === 0 ? ctx.moveTo(gxp, gyp) : ctx.lineTo(gxp, gyp);
      });
      ctx.stroke();
      title(ctx, "投げ上げ＋空気抵抗：上昇→最高点→下降", C);
    });
  }
};

/* 波形履歴を下部に描く共通ヘルパー（spring用） */
function drawTrace(ctx, W, H, C, t, fn) {
  const gx = 30, gw = W - 60, gy = H - 28, amp = 15;
  ctx.strokeStyle = C.line; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + gw, gy); ctx.stroke();
  ctx.strokeStyle = C.accent; ctx.lineWidth = 1.8;
  ctx.beginPath();
  for (let i = 0; i <= gw; i++) {
    const tt = t - (gw - i) / 60;
    const y = gy - amp * fn(tt);
    i === 0 ? ctx.moveTo(gx + i, y) : ctx.lineTo(gx + i, y);
  }
  ctx.stroke();
}
