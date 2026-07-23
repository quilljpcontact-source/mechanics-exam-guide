/* ============================================
   インタラクティブ物理アニメーション
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
  "central-force": "中心力：力は常に中心を向く（または中心から放射状）。距離で強さが変わる様子。",
  "vortex": "F=(−y, x, 0) の渦。ぐるぐる回す力＝回転(rot)がゼロでない＝保存力ではない。",
  "ladder": "壁に立てかけたはしご。人が上に登るほど、壁からの抗力 R と必要な摩擦が増えていく。",
  "spring": "バネの復元力＋周期的な外力（強制振動）。外からのリズムに合わせて揺れる。",
  "beats": "振動数の近い2つの波の重ね合わせ＝うなり。ゆっくりした包絡線（点線）が現れる。",
  "kepler": "太陽を焦点とする楕円軌道。近日点（太陽に近い）ほど速く動く＝面積速度一定。",
  "collision1d": "弾性衝突。軽いAが重いBにぶつかって跳ね返り、Bが動き出す。",
  "fall-terminal": "空気抵抗を受けて落下。速度はやがて終端速度で一定に（v-tグラフが飽和）。",
  "earth-tunnel": "地球を貫くトンネル内の単振動。端から落とすと中心を通り反対端へ（約42分）。",
  "damped": "減衰振動。揺れながら少しずつ振幅が小さくなっていく。",
  "collision2d": "2次元の弾性衝突。AとBが入射方向をはさんで上下に飛び散る。",
  "rod-string": "糸で吊るした棒の下端を水平力Fで引く。Fが大きいほど棒は大きく傾く。",
  "projectile-drag": "空気抵抗つきの投げ上げ。上昇→最高点→下降し、v-tグラフは0を横切る。"
};

/* ---------- 共通ヘルパー ---------- */
function animThemeColors() {
  const dark = document.documentElement.getAttribute("data-theme") === "dark";
  return dark
    ? { bg: "#141b24", panel: "#1a2531", fg: "#e9eff4", accent: "#22d3ee", accent2: "#60a5fa",
        muted: "#94a3b0", good: "#34d399", warn: "#fbbf24", line: "#2b3a48", red: "#fb7185", earth: "#3b5b7a" }
    : { bg: "#f5fafc", panel: "#ffffff", fg: "#14202b", accent: "#0891b2", accent2: "#2563eb",
        muted: "#66737e", good: "#10b981", warn: "#d97706", line: "#cfdde6", red: "#e11d48", earth: "#7fa8c9" };
}

function arrow(ctx, x0, y0, x1, y1, color, w) {
  const a = Math.atan2(y1 - y0, x1 - x0);
  const len = Math.hypot(x1 - x0, y1 - y0);
  if (len < 0.5) return;
  const hl = 7 + w * 1.5;
  ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = w;
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x1, y1);
  ctx.lineTo(x1 - hl * Math.cos(a - 0.42), y1 - hl * Math.sin(a - 0.42));
  ctx.lineTo(x1 - hl * Math.cos(a + 0.42), y1 - hl * Math.sin(a + 0.42));
  ctx.closePath(); ctx.fill();
}

function label(ctx, x, y, text, color, size) {
  ctx.fillStyle = color;
  ctx.font = `600 ${size || 13}px "Noto Sans JP", sans-serif`;
  ctx.fillText(text, x, y);
}

/* rAF ループ管理。step({ctx,t,dt,W,H,C,playing}) を毎フレーム呼ぶ。
   クリック/タップで再生・一時停止。 */
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
    ctx.fillStyle = "rgba(0,0,0,0.28)";
    ctx.fillRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2, r = 30;
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.accent;
    ctx.beginPath();
    ctx.moveTo(cx - 9, cy - 13); ctx.lineTo(cx - 9, cy + 13); ctx.lineTo(cx + 15, cy); ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.font = '600 13px "Noto Sans JP", sans-serif';
    ctx.textAlign = "center";
    ctx.fillText(everPlayed ? "タップで再開" : "タップで動かす", cx, cy + r + 22);
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

  /* ---- 中心力：放射状の力ベクトル＋動く質点 ---- */
  "central-force"(canvas) {
    let phase = 0;
    return runAnim(canvas, ({ ctx, dt, W, H, C }) => {
      const cx = W / 2, cy = H / 2;
      phase += dt;
      // 放射状の薄い矢印
      for (let k = 0; k < 12; k++) {
        const a = (k / 12) * Math.PI * 2;
        const r0 = 34, r1 = 34 + 46 + 10 * Math.sin(phase * 2 + k);
        arrow(ctx, cx + r0 * Math.cos(a), cy + r0 * Math.sin(a),
          cx + r1 * Math.cos(a), cy + r1 * Math.sin(a), C.line, 2);
      }
      // 中心（力の源）
      ctx.fillStyle = C.warn;
      ctx.beginPath(); ctx.arc(cx, cy, 14, 0, Math.PI * 2); ctx.fill();
      // 質点：半径が伸び縮み
      const R = 90 + 45 * Math.sin(phase * 1.3);
      const px = cx + R, py = cy;
      arrow(ctx, px, py, px + 38, py, C.accent, 3.5); // 外向きの力
      ctx.fillStyle = C.accent2;
      ctx.beginPath(); ctx.arc(px, py, 11, 0, Math.PI * 2); ctx.fill();
      label(ctx, cx - 24, cy - 22, "中心", C.warn, 13);
      label(ctx, px - 6, py - 18, "F", C.accent, 15);
    });
  },

  /* ---- 渦の力場 F=(-y,x,0) ---- */
  "vortex"(canvas) {
    let ang = 0;
    return runAnim(canvas, ({ ctx, dt, W, H, C }) => {
      const cx = W / 2, cy = H / 2;
      ang += dt * 0.9;
      // 接線方向の矢印グリッド
      for (let ix = -2; ix <= 2; ix++) {
        for (let iy = -1; iy <= 1; iy++) {
          const gx = cx + ix * 58, gy = cy + iy * 58;
          const vx = -(gy - cy), vy = (gx - cx);
          const m = Math.hypot(vx, vy) || 1;
          const s = 26;
          arrow(ctx, gx, gy, gx + vx / m * s, gy + vy / m * s, C.line, 2);
        }
      }
      // 円軌道を回る粒子
      const R = 78;
      const px = cx + R * Math.cos(ang), py = cy + R * Math.sin(ang);
      const vx = -Math.sin(ang), vy = Math.cos(ang);
      arrow(ctx, px, py, px + vx * 40, py + vy * 40, C.accent, 3.5);
      ctx.fillStyle = C.accent2;
      ctx.beginPath(); ctx.arc(px, py, 10, 0, Math.PI * 2); ctx.fill();
      // 回転記号
      ctx.strokeStyle = C.warn; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(cx, cy, 20, 0.3, Math.PI * 1.7); ctx.stroke();
      arrow(ctx, cx + 20 * Math.cos(1.7 * Math.PI), cy + 20 * Math.sin(1.7 * Math.PI),
        cx + 20 * Math.cos(1.7 * Math.PI) + 8, cy + 20 * Math.sin(1.7 * Math.PI) - 6, C.warn, 2.5);
      label(ctx, cx - 46, cy - 30, "∇×F ≠ 0", C.warn, 14);
    });
  },

  /* ---- はしご：人が登る＋力ベクトル ---- */
  "ladder"(canvas) {
    let ph = 0;
    return runAnim(canvas, ({ ctx, dt, W, H, C }) => {
      ph += dt * 0.5;
      const pad = 46;
      const wallX = pad + 4;
      const Oy = H - pad;
      const Ox = pad + Math.min(W * 0.42, 200);   // 下端O（地面上、壁から離す）
      const topX = wallX, topY = pad + 24;          // 壁の接点（上端）
      // 壁と地面
      ctx.strokeStyle = C.muted; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(wallX, pad); ctx.lineTo(wallX, Oy); ctx.lineTo(W - pad, Oy); ctx.stroke();
      // はしごの方向・垂直方向
      const dx = topX - Ox, dy = topY - Oy, len = Math.hypot(dx, dy);
      const ux = dx / len, uy = dy / len;          // はしご方向
      const nx = -uy, ny = ux;                      // 垂直方向
      // はしご
      ctx.strokeStyle = C.fg; ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(Ox, Oy); ctx.lineTo(topX, topY); ctx.stroke();
      // 横木（はしごに垂直な短い線）
      ctx.lineWidth = 2; ctx.strokeStyle = C.muted;
      for (let i = 1; i < 6; i++) {
        const f = i / 6;
        const rx = Ox + dx * f, ry = Oy + dy * f;
        ctx.beginPath(); ctx.moveTo(rx - nx * 5, ry - ny * 5); ctx.lineTo(rx + nx * 5, ry + ny * 5); ctx.stroke();
      }
      // 人：0→1を往復（はしごの上を移動）
      const climb = (Math.sin(ph) * 0.5 + 0.5) * 0.82 + 0.08;
      const hx = Ox + dx * climb, hy = Oy + dy * climb;
      ctx.fillStyle = C.accent2;
      ctx.beginPath(); ctx.arc(hx, hy, 8, 0, Math.PI * 2); ctx.fill();
      // 力ベクトル
      arrow(ctx, Ox, Oy, Ox, Oy - 48, C.good, 3);            // N 上
      label(ctx, Ox + 8, Oy - 40, "N", C.good, 13);
      arrow(ctx, Ox, Oy, Ox + 44, Oy, C.warn, 3);            // f 摩擦
      label(ctx, Ox + 20, Oy + 18, "f", C.warn, 13);
      arrow(ctx, topX, topY, topX + 44, topY, C.red, 3);     // R 壁
      label(ctx, topX + 20, topY - 8, "R", C.red, 13);
      const midX = (Ox + topX) / 2, midY = (Oy + topY) / 2;
      arrow(ctx, midX, midY, midX, midY + 36, C.muted, 2.5); // Mg
      label(ctx, midX + 8, midY + 32, "Mg", C.muted, 12);
      arrow(ctx, hx, hy, hx, hy + 30, C.accent, 3);          // mg 人
      label(ctx, hx + 10, hy + 24, "mg", C.accent, 12);
      // Rは登るほど増える（右上のバー）
      const barX = W - pad - 24, barY = pad + 6, barH = 90;
      ctx.strokeStyle = C.line; ctx.lineWidth = 2;
      ctx.strokeRect(barX, barY, 12, barH);
      ctx.fillStyle = C.red;
      ctx.fillRect(barX, barY + barH - barH * climb, 12, barH * climb);
      label(ctx, barX - 4, barY - 8, "R", C.red, 12);
    });
  },

  /* ---- 強制振動：バネ＋質点＋外力 ---- */
  "spring"(canvas) {
    return runAnim(canvas, ({ ctx, t, W, H, C }) => {
      const wallX = 44, cy = H / 2 - 10;
      const A = 46, drive = 14;
      const x = A * Math.sin(t * 2.4) + drive * Math.sin(t * 2.4);
      const mx = W / 2 + x;
      // 壁
      ctx.strokeStyle = C.muted; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(wallX, cy - 40); ctx.lineTo(wallX, cy + 40); ctx.stroke();
      // バネ（ジグザグ）
      ctx.strokeStyle = C.accent; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(wallX, cy);
      const coils = 12, span = mx - 24 - wallX;
      for (let i = 0; i <= coils; i++) {
        const px = wallX + (span * i) / coils;
        const py = cy + (i % 2 === 0 ? 0 : (i === 0 || i === coils ? 0 : -12));
        ctx.lineTo(px, py);
      }
      ctx.lineTo(mx - 24, cy); ctx.stroke();
      // 質点
      ctx.fillStyle = C.accent2;
      ctx.fillRect(mx - 24, cy - 22, 44, 44);
      // 外力矢印（周期的）
      const F = 30 * Math.sin(t * 2.4);
      arrow(ctx, mx, cy, mx + F, cy, C.warn, 3);
      label(ctx, mx + 26, cy - 30, "外力", C.warn, 12);
      // 平衡線
      ctx.strokeStyle = C.line; ctx.setLineDash([4, 4]); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(W / 2, cy - 46); ctx.lineTo(W / 2, cy + 46); ctx.stroke();
      ctx.setLineDash([]);
      // 波形履歴（下部）
      drawTrace(ctx, W, H, C, t, (tt) => (A + drive) * Math.sin(tt * 2.4) / (A + drive));
    });
  },

  /* ---- うなり：2波の重ね合わせ ---- */
  "beats"(canvas) {
    return runAnim(canvas, ({ ctx, t, W, H, C }) => {
      const cy = H / 2, amp = H * 0.28;
      const w1 = 0.13, w2 = 0.15, sp = 60;
      ctx.lineWidth = 2.5; ctx.strokeStyle = C.accent;
      ctx.beginPath();
      for (let px = 20; px < W - 20; px++) {
        const x = px - 20 + t * sp;
        const y = cy - amp * (Math.sin(w1 * x) + Math.sin(w2 * x)) / 2;
        px === 20 ? ctx.moveTo(px, y) : ctx.lineTo(px, y);
      }
      ctx.stroke();
      // 包絡線（うなり）
      ctx.strokeStyle = C.warn; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.6;
      for (const sgn of [1, -1]) {
        ctx.beginPath();
        for (let px = 20; px < W - 20; px++) {
          const x = px - 20 + t * sp;
          const env = Math.abs(Math.cos((w1 - w2) / 2 * x));
          const y = cy - sgn * amp * env;
          px === 20 ? ctx.moveTo(px, y) : ctx.lineTo(px, y);
        }
        ctx.stroke();
      }
      ctx.setLineDash([]);
      label(ctx, 20, 22, "うなり（包絡線 = 点線）", C.warn, 13);
    });
  },

  /* ---- ケプラー楕円軌道（面積速度一定） ---- */
  "kepler"(canvas) {
    let phi = 0; const trail = [];
    return runAnim(canvas, ({ ctx, dt, W, H, C }) => {
      const cx = W / 2 + 20, cy = H / 2;
      const a = Math.min(W * 0.32, 130), b = a * 0.72;
      const c = Math.sqrt(a * a - b * b);
      const sunX = cx - c, sunY = cy;
      const pos = (p) => [cx + a * Math.cos(p), cy + b * Math.sin(p)];
      // 面積速度一定：dphi/dt = k / r^2
      let [px, py] = pos(phi);
      const r = Math.hypot(px - sunX, py - sunY);
      phi += dt * (a * b * 1.1) / (r * r);
      [px, py] = pos(phi);
      // 軌道
      ctx.strokeStyle = C.line; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.ellipse(cx, cy, a, b, 0, 0, Math.PI * 2); ctx.stroke();
      // 太陽
      ctx.fillStyle = C.warn;
      ctx.beginPath(); ctx.arc(sunX, sunY, 13, 0, Math.PI * 2); ctx.fill();
      label(ctx, sunX - 16, sunY + 30, "太陽", C.warn, 12);
      // 動径
      ctx.strokeStyle = C.accent; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(sunX, sunY); ctx.lineTo(px, py); ctx.stroke();
      // 軌跡
      trail.push([px, py]); if (trail.length > 60) trail.shift();
      ctx.strokeStyle = C.accent2; ctx.lineWidth = 2;
      ctx.beginPath();
      trail.forEach((p, i) => i === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]));
      ctx.stroke();
      // 惑星
      ctx.fillStyle = C.accent2;
      ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2); ctx.fill();
      label(ctx, 16, 22, "近日点ほど速い（面積速度一定）", C.muted, 12);
    });
  },

  /* ---- 1次元弾性衝突 ---- */
  "collision1d"(canvas) {
    // A(質量1)が右へ、B(質量3+2√2≈5.83)に弾性衝突
    const mA = 1, mB = 3 + 2 * Math.sqrt(2);
    let xA = 0, xB = 0, vA = 0, vB = 0, started = false;
    const reset = (W) => {
      xA = W * 0.18; xB = W * 0.62; vA = 150; vB = 0; started = false;
    };
    let initW = 0;
    return runAnim(canvas, ({ ctx, dt, W, H, C }) => {
      if (!initW || Math.abs(initW - W) > 1) { initW = W; reset(W); }
      const cy = H / 2 + 20, rA = 15, rB = 15 * Math.cbrt(mB);
      // 地面
      ctx.strokeStyle = C.muted; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(20, cy + rB + 6); ctx.lineTo(W - 20, cy + rB + 6); ctx.stroke();
      // 更新
      xA += vA * dt; xB += vB * dt;
      if (!started && xA + rA >= xB - rB) {
        // 弾性衝突の公式
        const u = vA;
        vA = ((mA - mB) / (mA + mB)) * u;
        vB = ((2 * mA) / (mA + mB)) * u;
        started = true;
      }
      if (xB + rB > W - 24) { vB = -Math.abs(vB) * 0.0; } // Bは壁で止める演出なし
      if (xA - rA < 24 && vA < 0) reset(W);
      if (xB - rB > W - 24) reset(W);
      // B
      ctx.fillStyle = C.warn;
      ctx.beginPath(); ctx.arc(xB, cy, rB, 0, Math.PI * 2); ctx.fill();
      label(ctx, xB - 6, cy + 4, "B", "#fff", 13);
      // A
      ctx.fillStyle = C.accent2;
      ctx.beginPath(); ctx.arc(xA, cy, rA, 0, Math.PI * 2); ctx.fill();
      label(ctx, xA - 5, cy + 4, "A", "#fff", 12);
      // 速度矢印
      if (Math.abs(vA) > 1) arrow(ctx, xA, cy - rA - 8, xA + vA * 0.18, cy - rA - 8, C.accent, 2.5);
      if (Math.abs(vB) > 1) arrow(ctx, xB, cy - rB - 8, xB + vB * 0.14, cy - rB - 8, C.red, 2.5);
      label(ctx, 16, 22, started ? "衝突後：Aは跳ね返り、Bが動く" : "衝突前：Aが近づく", C.muted, 12);
    });
  },

  /* ---- 終端速度落下 ---- */
  "fall-terminal"(canvas) {
    let y = 0, v = 0; const g = 260, vt = 190; let initH = 0;
    const graph = [];
    return runAnim(canvas, ({ ctx, dt, W, H, C }) => {
      if (!initH) { initH = H; y = 30; v = 0; }
      // 物理：dv/dt = g(1 - v²/vt²)  → tanh的
      v += (g * (1 - (v * v) / (vt * vt))) * dt;
      y += v * dt;
      const laneX = W * 0.28;
      if (y > H - 30) { y = 30; v = 0; graph.length = 0; }
      graph.push(v / vt); if (graph.length > 120) graph.shift();
      // 落下する物体
      ctx.fillStyle = C.accent2;
      ctx.beginPath(); ctx.arc(laneX, y, 13, 0, Math.PI * 2); ctx.fill();
      arrow(ctx, laneX, y, laneX, y + 20 + v * 0.06, C.accent, 3); // 速度
      // 抵抗矢印（上向き、速いほど大）
      arrow(ctx, laneX + 20, y, laneX + 20, y - v * 0.08, C.warn, 2.5);
      label(ctx, laneX + 26, y - 4, "抵抗", C.warn, 11);
      // v-t グラフ
      const gx = W * 0.5, gy = 30, gw = W * 0.42, gh = H - 70;
      ctx.strokeStyle = C.line; ctx.lineWidth = 1.5;
      ctx.strokeRect(gx, gy, gw, gh);
      // 終端速度ライン
      ctx.strokeStyle = C.warn; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(gx, gy + 12); ctx.lineTo(gx + gw, gy + 12); ctx.stroke();
      ctx.setLineDash([]);
      label(ctx, gx + 4, gy + 10, "終端速度", C.warn, 10);
      // 曲線
      ctx.strokeStyle = C.accent; ctx.lineWidth = 2.5;
      ctx.beginPath();
      graph.forEach((val, i) => {
        const gxp = gx + (gw * i) / 120;
        const gyp = gy + gh - (gh - 14) * Math.min(val, 1);
        i === 0 ? ctx.moveTo(gxp, gyp) : ctx.lineTo(gxp, gyp);
      });
      ctx.stroke();
      label(ctx, gx + 4, gy + gh + 16, "v–t（速度は一定値に飽和）", C.muted, 11);
    });
  },

  /* ---- 地球トンネル（単振動） ---- */
  "earth-tunnel"(canvas) {
    let ph = 0;
    return runAnim(canvas, ({ ctx, dt, W, H, C }) => {
      ph += dt * 1.1;
      const cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.36;
      // 地球
      ctx.fillStyle = C.earth;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
      // トンネル（縦の直線）
      ctx.strokeStyle = C.bg; ctx.lineWidth = 6;
      ctx.beginPath(); ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke();
      // 中心
      ctx.fillStyle = C.warn;
      ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();
      label(ctx, cx + 8, cy + 4, "O", C.warn, 12);
      // 単振動する物体：y = -R cos(ph)（端から落下）
      const py = cy - R * Math.cos(ph);
      const v = R * Math.sin(ph);
      ctx.fillStyle = C.accent2;
      ctx.beginPath(); ctx.arc(cx, py, 10, 0, Math.PI * 2); ctx.fill();
      // 速度矢印（中心で最速）
      arrow(ctx, cx + 18, py, cx + 18, py + v * 0.05, C.accent, 2.5);
      label(ctx, 16, 22, "端から落下→中心を通過→反対端（単振動）", C.muted, 12);
    });
  },

  /* ---- 減衰振動 ---- */
  "damped"(canvas) {
    return runAnim(canvas, ({ ctx, t, W, H, C }) => {
      const cy = H / 2, wallY = 40;
      const cx = W * 0.26;
      const env = Math.exp(-t * 0.35);
      const x = 70 * env * Math.cos(t * 3.2);
      const my = cy + x;
      // 天井
      ctx.strokeStyle = C.muted; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(cx - 40, wallY); ctx.lineTo(cx + 40, wallY); ctx.stroke();
      // バネ
      ctx.strokeStyle = C.accent; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(cx, wallY);
      const coils = 10, span = my - 22 - wallY;
      for (let i = 0; i <= coils; i++) {
        const py = wallY + (span * i) / coils;
        const px = cx + (i % 2 === 0 ? 0 : 12);
        ctx.lineTo(px, py);
      }
      ctx.lineTo(cx, my - 22); ctx.stroke();
      // おもり
      ctx.fillStyle = C.accent2;
      ctx.fillRect(cx - 22, my - 22, 44, 44);
      // 平衡線
      ctx.strokeStyle = C.line; ctx.setLineDash([4, 4]); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx - 60, cy); ctx.lineTo(cx + 60, cy); ctx.stroke();
      ctx.setLineDash([]);
      // 減衰グラフ
      const gx = W * 0.52, gy = 34, gw = W * 0.42, gh = H - 70;
      ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.strokeRect(gx, gy, gw, gh);
      ctx.strokeStyle = C.warn; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.3;
      for (const sgn of [1, -1]) {
        ctx.beginPath();
        for (let i = 0; i <= gw; i++) {
          const tt = i / 40;
          const e = Math.exp(-tt * 0.35);
          const yy = gy + gh / 2 - sgn * (gh / 2 - 6) * e;
          i === 0 ? ctx.moveTo(gx + i, yy) : ctx.lineTo(gx + i, yy);
        }
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.strokeStyle = C.accent; ctx.lineWidth = 2.2;
      ctx.beginPath();
      for (let i = 0; i <= gw; i++) {
        const tt = i / 40;
        const yy = gy + gh / 2 - (gh / 2 - 6) * Math.exp(-tt * 0.35) * Math.cos(tt * 3.2);
        i === 0 ? ctx.moveTo(gx + i, yy) : ctx.lineTo(gx + i, yy);
      }
      ctx.stroke();
      label(ctx, gx + 4, gy + gh + 16, "振幅が指数的に減衰", C.muted, 11);
    });
  },

  /* ---- 2次元弾性衝突 ---- */
  "collision2d"(canvas) {
    let xA, yA, phase, initW = 0;
    const th = Math.atan(3), phi = Math.PI / 4; // A上, B下
    const reset = (W, H) => { xA = 30; yA = H / 2; phase = 0; };
    return runAnim(canvas, ({ ctx, dt, W, H, C }) => {
      if (!initW || Math.abs(initW - W) > 1) { initW = W; reset(W, H); }
      const cx = W * 0.46, cy = H / 2;
      const uA = 120, uB = 95;
      if (phase === 0) {
        xA += 130 * dt;
        if (xA >= cx) { xA = cx; phase = 1; }
        yA = cy;
        // 入射
        ctx.fillStyle = C.accent2;
        ctx.beginPath(); ctx.arc(xA, yA, 12, 0, Math.PI * 2); ctx.fill();
        label(ctx, xA - 5, yA + 4, "A", "#fff", 12);
        arrow(ctx, xA - 30, yA, xA - 8, yA, C.accent, 2.5);
      } else {
        phase += dt;
        const d = Math.min(phase * 120, W * 0.4);
        const ax = cx + d * Math.cos(-th), ay = cy - d * Math.sin(th) * 0.9;
        const bx = cx + (d * 0.8) * Math.cos(phi), by = cy + (d * 0.8) * Math.sin(phi) * 0.9;
        // 静止B（灰）＋衝突点
        ctx.fillStyle = C.muted; ctx.globalAlpha = 0.3;
        ctx.beginPath(); ctx.arc(cx, cy, 16, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
        // 入射方向の点線
        ctx.strokeStyle = C.line; ctx.setLineDash([4, 4]); ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(30, cy); ctx.lineTo(W - 20, cy); ctx.stroke(); ctx.setLineDash([]);
        // A（上へ）
        ctx.fillStyle = C.accent2;
        ctx.beginPath(); ctx.arc(ax, ay, 12, 0, Math.PI * 2); ctx.fill();
        label(ctx, ax - 5, ay + 4, "A", "#fff", 12);
        // B（下へ、質量3m→大きい）
        ctx.fillStyle = C.warn;
        ctx.beginPath(); ctx.arc(bx, by, 17, 0, Math.PI * 2); ctx.fill();
        label(ctx, bx - 6, by + 4, "B", "#fff", 12);
        label(ctx, cx - 10, cy + 42, "θ (A) 上 / 45° (B) 下", C.muted, 11);
        if (d >= W * 0.4) reset(W, H);
      }
      label(ctx, 16, 22, "2次元弾性衝突：上下に飛び散る", C.muted, 12);
    });
  },

  /* ---- 棒と糸：Fで傾く ---- */
  "rod-string"(canvas) {
    let ph = 0;
    return runAnim(canvas, ({ ctx, dt, W, H, C }) => {
      ph += dt * 0.8;
      const ceilY = 34, cx = W / 2;
      // Fを0〜大へ変化 → φ変化（tanφ=2tanθ, ここでは見た目で）
      const drive = (Math.sin(ph) * 0.5 + 0.5); // 0..1
      const phi = drive * 0.9;      // 棒の傾き
      const theta = Math.atan(Math.tan(phi) / 2); // 糸の傾き
      const anchorX = cx, anchorY = ceilY;
      const L1 = 46; // 糸
      const Px = anchorX + L1 * Math.sin(theta), Py = anchorY + L1 * Math.cos(theta);
      const L2 = 120; // 棒
      const Bx = Px + L2 * Math.sin(phi), By = Py + L2 * Math.cos(phi);
      // 天井
      ctx.strokeStyle = C.muted; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(cx - 70, ceilY); ctx.lineTo(cx + 70, ceilY); ctx.stroke();
      // 糸
      ctx.strokeStyle = C.good; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(anchorX, anchorY); ctx.lineTo(Px, Py); ctx.stroke();
      label(ctx, (anchorX + Px) / 2 - 18, (anchorY + Py) / 2, "糸 f", C.good, 12);
      // 棒
      ctx.strokeStyle = C.fg; ctx.lineWidth = 6;
      ctx.beginPath(); ctx.moveTo(Px, Py); ctx.lineTo(Bx, By); ctx.stroke();
      // P点
      ctx.fillStyle = C.accent; ctx.beginPath(); ctx.arc(Px, Py, 5, 0, Math.PI * 2); ctx.fill();
      label(ctx, Px + 8, Py, "P", C.accent, 12);
      // 重力（中点）
      const mx = (Px + Bx) / 2, my = (Py + By) / 2;
      arrow(ctx, mx, my, mx, my + 32, C.muted, 2.5);
      label(ctx, mx + 6, my + 28, "mg", C.muted, 11);
      // F（下端、水平）
      const Flen = 20 + 40 * drive;
      arrow(ctx, Bx, By, Bx + Flen, By, C.warn, 3.5);
      label(ctx, Bx + Flen * 0.4, By + 18, "F", C.warn, 14);
      label(ctx, 16, 22, "Fが大きいほど棒は大きく傾く", C.muted, 12);
    });
  },

  /* ---- 投げ上げ＋空気抵抗 ---- */
  "projectile-drag"(canvas) {
    let y = 0, v = 0, initH = 0; const g = 260, vt = 200;
    const graph = [];
    return runAnim(canvas, ({ ctx, dt, W, H, C }) => {
      if (!initH) { initH = H; y = H - 40; v = -300; graph.length = 0; }
      // dv/dt = -g - (g/vt) v  （上向き正、v>0上昇）
      v += (-g - (g / vt) * v) * dt;
      y += -v * dt; // 画面yは下向き正
      const laneX = W * 0.26;
      if (y > H - 30 && v < 0) { y = H - 40; v = -300; graph.length = 0; }
      graph.push(v / 300); if (graph.length > 130) graph.shift();
      // 地面
      ctx.strokeStyle = C.muted; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(20, H - 28); ctx.lineTo(W * 0.46, H - 28); ctx.stroke();
      // 物体
      ctx.fillStyle = C.accent2;
      ctx.beginPath(); ctx.arc(laneX, y, 12, 0, Math.PI * 2); ctx.fill();
      // 速度矢印
      arrow(ctx, laneX, y, laneX, y - v * 0.06, C.accent, 3);
      // v-t グラフ（0を横切る）
      const gx = W * 0.52, gy = 30, gw = W * 0.42, gh = H - 66, zero = gy + gh * 0.42;
      ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.strokeRect(gx, gy, gw, gh);
      ctx.strokeStyle = C.muted; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(gx, zero); ctx.lineTo(gx + gw, zero); ctx.stroke();
      label(ctx, gx + 4, zero - 4, "v=0（最高点）", C.muted, 10);
      ctx.strokeStyle = C.accent; ctx.lineWidth = 2.4;
      ctx.beginPath();
      graph.forEach((val, i) => {
        const gxp = gx + (gw * i) / 130;
        const gyp = zero - val * (gh * 0.4);
        i === 0 ? ctx.moveTo(gxp, gyp) : ctx.lineTo(gxp, gyp);
      });
      ctx.stroke();
      label(ctx, 16, 22, "上昇→最高点→下降（抵抗あり）", C.muted, 12);
    });
  }
};

/* 波形履歴を下部に描く共通ヘルパー（spring用） */
function drawTrace(ctx, W, H, C, t, fn) {
  const gx = 30, gw = W - 60, gy = H - 30, amp = 16;
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
