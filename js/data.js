/* ============================================
   問題データ — 力学 期末試験
   2023年度(28問) + 2025年度(28問)
   各問題: 問題文 / 意味 / ヒント / 解説 の4部構成
   数式は KaTeX ($...$ インライン, $$...$$ ディスプレイ)
   ============================================ */

const PROBLEMS_2023 = [

  /* ===================== 大問1 ベクトル解析 ===================== */
  {
    id: "1-1",
    chapter: "大問1",
    number: "(1)",
    title: "ポテンシャル U=1/rⁿ から力を求める",
    tags: ["勾配", "保存力", "中心力"],
    difficulty: 3,
    formula: String.raw`$U(\mathbf{r}) = \dfrac{1}{r^n}$ のとき $\mathbf{F}(\mathbf{r})$ は？`,
    statement: String.raw`
      <p>位置ベクトルを $\mathbf{r} = (x, y, z)$ とする。位置 $\mathbf{r}$ におけるポテンシャルが $U(\mathbf{r}) = \dfrac{1}{r^n}$ と与えられるとき、この位置にある物体に働く力 $\mathbf{F}(\mathbf{r})$ を求めよ。ただし $r = |\mathbf{r}| = \sqrt{x^2+y^2+z^2}$、$n$ は定数である。</p>`,
    meaning: String.raw`
      <p>「ポテンシャル（位置エネルギー）$U$ が分かっているとき、そこから力 $\mathbf{F}$ を逆算せよ」という問題です。</p>
      <p>力と位置エネルギーの間には <b>「力 = ポテンシャルの下り坂の向き」</b> という関係があります。ボールが坂道を転がり落ちるとき、坂が急なほど強い力がかかりますよね。それを数式にしたのが下の公式です。</p>
      <div class="term-note"><b>📖 力とポテンシャルの関係</b><br>
      $$\mathbf{F} = -\nabla U = -\left(\frac{\partial U}{\partial x},\ \frac{\partial U}{\partial y},\ \frac{\partial U}{\partial z}\right)$$
      $\nabla$（ナブラ）は「各方向にどれだけ傾いているか」を並べたベクトル。マイナスが付くのは「力はポテンシャルが<b>低くなる向き</b>に働く」から。<br>
      今回は $U$ が $r$ だけの関数（中心力）なので、合成関数の微分で $\dfrac{\partial r}{\partial x} = \dfrac{x}{r}$ を使うのがカギです。</div>`,
    hints: [
      String.raw`$U = r^{-n}$ とみなして、まず $r$ で微分する。$\dfrac{dU}{dr} = -n\,r^{-n-1}$。`,
      String.raw`合成関数の微分：$\dfrac{\partial U}{\partial x} = \dfrac{dU}{dr}\cdot\dfrac{\partial r}{\partial x}$。ここで $\dfrac{\partial r}{\partial x} = \dfrac{x}{r}$（$r=\sqrt{x^2+y^2+z^2}$ を $x$ で微分）。`,
      String.raw`3成分をまとめると $(x,y,z) = \mathbf{r}$ が出てくる。最後に $\mathbf{F} = -\nabla U$ のマイナスを忘れずに。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>r による微分を準備する</h5>
        <p>$U = r^{-n}$ なので、$r$ での微分は $\dfrac{dU}{dr} = -n\,r^{-n-1}$。</p>
        <p>また $r = \sqrt{x^2+y^2+z^2}$ を $x$ で微分すると $\dfrac{\partial r}{\partial x} = \dfrac{x}{r}$（$y, z$ も同様）。</p>
      </div>
      <div class="sol-step" data-step="2">
        <h5>各成分の偏微分を計算する</h5>
        <div class="math-display">$$\frac{\partial U}{\partial x} = \frac{dU}{dr}\cdot\frac{\partial r}{\partial x} = -n\,r^{-n-1}\cdot\frac{x}{r} = -n\,\frac{x}{r^{n+2}}$$</div>
        <p>$y, z$ 成分も同じ形。まとめると $\nabla U = -\dfrac{n}{r^{n+2}}(x, y, z) = -\dfrac{n}{r^{n+2}}\mathbf{r}$。</p>
      </div>
      <div class="sol-step" data-step="3">
        <h5>マイナスを掛けて力にする</h5>
        <div class="math-display">$$\mathbf{F} = -\nabla U = \frac{n}{r^{n+2}}\,\mathbf{r}$$</div>
        <p>力は位置ベクトル $\mathbf{r}$ と同じ向き（$n>0$ なら中心から外向き）の<b>中心力</b>だと分かります。大きさは $|\mathbf{F}| = \dfrac{n}{r^{n+1}}$。</p>
      </div>`,
    answer: String.raw`$\mathbf{F}(\mathbf{r}) = \dfrac{n}{r^{n+2}}\,\mathbf{r} \quad\left(\text{大きさ } \dfrac{n}{r^{n+1}}\right)$`
  },
  {
    id: "1-2",
    chapter: "大問1",
    number: "(2)",
    title: "保存力からポテンシャルを逆算する",
    tags: ["保存力", "積分", "ポテンシャル"],
    difficulty: 3,
    formula: String.raw`$\mathbf{F} = ((x-z)^2,\ 0,\ -(x-z)^2)$ の $U$ は？`,
    statement: String.raw`
      <p>位置 $\mathbf{r}$ で物体に保存力 $\mathbf{F}(\mathbf{r}) = \big((x-z)^2,\ 0,\ -(x-z)^2\big)$ が働くとき、その力を与えるポテンシャル $U(\mathbf{r})$ を求めよ。ただし基準点は原点とする。</p>`,
    meaning: String.raw`
      <p>前問の逆で、今度は「力 $\mathbf{F}$ から位置エネルギー $U$ を求めよ」という問題です。$\mathbf{F} = -\nabla U$ を <b>積分でほどく</b> イメージ。</p>
      <p>「基準点は原点」とは、$U(0,0,0) = 0$ となるように積分定数を決めなさい、という意味です（位置エネルギーは基準の取り方で定数分ずれるので、どこをゼロにするか指定される）。</p>
      <div class="term-note"><b>📖 やり方</b><br>
      $\dfrac{\partial U}{\partial x} = -F_x$、$\dfrac{\partial U}{\partial y} = -F_y$、$\dfrac{\partial U}{\partial z} = -F_z$ を1つずつ積分して、つじつまの合う $U$ を組み立てます。1変数で積分すると「他の変数だけの関数」が積分定数として残るので、それを別の式で決めていくのがコツ。</div>`,
    hints: [
      String.raw`$-F_x = -(x-z)^2$ を $x$ で積分してみよう。$\int -(x-z)^2\,dx = -\dfrac{1}{3}(x-z)^3 + (\text{$y,z$の関数})$。`,
      String.raw`得られた候補 $U = -\dfrac{1}{3}(x-z)^3$ を $z$ で偏微分して、$-F_z = (x-z)^2$ と一致するか確認する。`,
      String.raw`$F_y = 0$ とも矛盾しないことを確認。最後に原点で $U=0$ になっているかチェック。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>x 成分から U の候補を作る</h5>
        <p>$\dfrac{\partial U}{\partial x} = -F_x = -(x-z)^2$。これを $x$ で積分します:</p>
        <div class="math-display">$$U = -\int (x-z)^2\,dx = -\frac{1}{3}(x-z)^3 + g(y,z)$$</div>
        <p>$g(y,z)$ は「$x$ で積分したとき消える、$y,z$ だけの未知関数」です。</p>
      </div>
      <div class="sol-step" data-step="2">
        <h5>z 成分で g を決める</h5>
        <p>いま得た $U$ を $z$ で偏微分:</p>
        <div class="math-display">$$\frac{\partial U}{\partial z} = -\frac{1}{3}\cdot 3(x-z)^2\cdot(-1) + \frac{\partial g}{\partial z} = (x-z)^2 + \frac{\partial g}{\partial z}$$</div>
        <p>これは $-F_z = (x-z)^2$ に等しくなるべき。よって $\dfrac{\partial g}{\partial z} = 0$。同様に $-F_y = 0$ から $\dfrac{\partial g}{\partial y}=0$。つまり $g$ は定数。</p>
      </div>
      <div class="sol-step" data-step="3">
        <h5>基準点で定数を決める</h5>
        <p>$U = -\dfrac{1}{3}(x-z)^3 + C$。原点 $(0,0,0)$ で $U=0$ より $-\dfrac{1}{3}(0)^3 + C = 0$、つまり $C=0$。</p>
        <div class="math-display">$$U(\mathbf{r}) = -\frac{1}{3}(x-z)^3$$</div>
      </div>`,
    answer: String.raw`$U(\mathbf{r}) = -\dfrac{1}{3}(x-z)^3$`
  },
  {
    id: "1-3",
    chapter: "大問1",
    number: "(3)",
    title: "回転（rot）の成分表示",
    tags: ["回転", "rot", "定義"],
    difficulty: 2,
    formula: String.raw`$\nabla \times \mathbf{F}$ を成分で表す`,
    statement: String.raw`
      <p>ベクトル $\mathbf{F}(\mathbf{r})$ に対する回転 $\nabla \times \mathbf{F}(\mathbf{r})$ を、$\mathbf{F}(\mathbf{r})$ の成分 $F_x, F_y, F_z$ を用いて表せ。</p>`,
    meaning: String.raw`
      <p>「回転（ローテーション、rot または curl）」の定義式を書くだけの問題です。丸暗記でもよいですが、成り立ちを知っておくと忘れません。</p>
      <p>回転はベクトル場の「渦の強さと向き」を表します。水面に葉っぱを浮かべたとき、その場所で葉っぱがクルクル回るなら回転が0でない、というイメージ。結果は<b>ベクトル</b>になります。</p>
      <div class="term-note"><b>📖 覚え方：行列式</b><br>
      $$\nabla \times \mathbf{F} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ \dfrac{\partial}{\partial x} & \dfrac{\partial}{\partial y} & \dfrac{\partial}{\partial z} \\ F_x & F_y & F_z \end{vmatrix}$$
      この「形式的な行列式」を展開すると各成分が出ます。「次の文字へ →（x→y→z→x）」の巡回で符号を覚えるのがコツ。</div>`,
    hints: [
      String.raw`各成分は「2つ隣の偏微分の引き算」。x成分は $y,z$ が、y成分は $z,x$ が、z成分は $x,y$ が関わる。`,
      String.raw`x成分 $= \dfrac{\partial F_z}{\partial y} - \dfrac{\partial F_y}{\partial z}$。あとは x→y→z→x の巡回で文字を1つずつずらすだけ。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>定義を書き下す</h5>
        <p>回転は次の3成分を持つベクトルです:</p>
        <div class="math-display">$$\nabla \times \mathbf{F} = \left(\ \frac{\partial F_z}{\partial y} - \frac{\partial F_y}{\partial z},\ \ \frac{\partial F_x}{\partial z} - \frac{\partial F_z}{\partial x},\ \ \frac{\partial F_y}{\partial x} - \frac{\partial F_x}{\partial y}\ \right)$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>巡回のパターンを確認</h5>
        <p>各成分は「添字が $x\to y\to z\to x$ と循環」しています。第1成分は $(y,z)$、第2成分は $(z,x)$、第3成分は $(x,y)$。前の文字で後ろの成分を微分したものから、逆順を引きます。この規則さえ覚えれば導出不要です。</p>
      </div>`,
    answer: String.raw`$\nabla \times \mathbf{F} = \left(\dfrac{\partial F_z}{\partial y} - \dfrac{\partial F_y}{\partial z},\ \dfrac{\partial F_x}{\partial z} - \dfrac{\partial F_z}{\partial x},\ \dfrac{\partial F_y}{\partial x} - \dfrac{\partial F_x}{\partial y}\right)$`
  },
  {
    id: "1-4",
    chapter: "大問1",
    number: "(4)",
    title: "回転を計算して保存力か判定する",
    tags: ["回転", "保存力の判定"],
    difficulty: 3,
    formula: String.raw`$\mathbf{F} = (-y,\ x,\ 0)$ は保存力か？`,
    statement: String.raw`
      <p>位置 $\mathbf{r}$ で物体に力 $\mathbf{F}(\mathbf{r}) = (-y,\ x,\ 0)$ が働くとき、回転 $\nabla \times \mathbf{F}(\mathbf{r})$ の値を書け。また、これが保存力かどうか判定せよ。</p>`,
    meaning: String.raw`
      <p>(3)で書いた回転の定義を、実際の力 $\mathbf{F} = (-y, x, 0)$ に当てはめて計算し、その結果から「保存力かどうか」を判定します。</p>
      <div class="term-note"><b>📖 保存力の判定条件</b><br>
      力が保存力（＝ポテンシャルで書ける、経路によらず仕事が決まる力）である必要十分条件は、
      $$\nabla \times \mathbf{F} = \mathbf{0}$$
      「回転がゼロなら保存力、ゼロでなければ非保存力」。$\mathbf{F} = (-y, x, 0)$ は原点まわりにぐるぐる回る渦のような力なので、直感的にも「渦あり＝回転≠0＝非保存力」と予想できます。</div>`,
    hints: [
      String.raw`$F_x = -y$、$F_y = x$、$F_z = 0$。これを (3) の定義式に代入するだけ。`,
      String.raw`z成分 $\dfrac{\partial F_y}{\partial x} - \dfrac{\partial F_x}{\partial y} = \dfrac{\partial x}{\partial x} - \dfrac{\partial(-y)}{\partial y}$ を計算してみよう。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>各成分を代入する</h5>
        <p>$F_x = -y,\ F_y = x,\ F_z = 0$。回転の各成分:</p>
        <div class="math-display">$$\begin{aligned}
        x\text{成分} &= \frac{\partial F_z}{\partial y} - \frac{\partial F_y}{\partial z} = 0 - 0 = 0 \\
        y\text{成分} &= \frac{\partial F_x}{\partial z} - \frac{\partial F_z}{\partial x} = 0 - 0 = 0 \\
        z\text{成分} &= \frac{\partial F_y}{\partial x} - \frac{\partial F_x}{\partial y} = \frac{\partial x}{\partial x} - \frac{\partial(-y)}{\partial y} = 1 - (-1) = 2
        \end{aligned}$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>回転ベクトルをまとめる</h5>
        <div class="math-display">$$\nabla \times \mathbf{F} = (0,\ 0,\ 2)$$</div>
      </div>
      <div class="sol-step" data-step="3">
        <h5>保存力か判定する</h5>
        <p>回転が $\mathbf{0}$ ではない（$z$ 成分が $2$）ので、この力は<b>保存力ではありません</b>。$xy$ 平面内を反時計回りに回転させる「渦」の力になっています。</p>
      </div>`,
    answer: String.raw`$\nabla \times \mathbf{F} = (0, 0, 2) \neq \mathbf{0}$ なので<b>保存力ではない</b>。`
  },

  /* ===================== 大問2 はしご（剛体のつりあい） ===================== */
  {
    id: "2-1",
    chapter: "大問2",
    number: "(1)",
    title: "はしご：鉛直方向のつりあい",
    tags: ["剛体", "力のつりあい"],
    difficulty: 2,
    formula: String.raw`鉛直方向の力のつりあい`,
    statement: String.raw`
      <p>質量 $M$、長さ $L$ のはしごが摩擦のある地面に対して $\theta$ の角度で壁に立てかけられている。はしごと壁の間には摩擦はないとする。質量 $m$ の人がこのはしごを $x$ だけ登ったとき、はしごが壁と地面から受ける垂直抗力をそれぞれ $R$、$N$、はしごと地面の間の摩擦力を $f$、重力加速度を $g$ とする。<br><b>鉛直方向の力のつりあいの式を求めよ。</b></p>`,
    meaning: String.raw`
      <p>壁に立てかけたはしごが倒れずに静止している状況です。まず「上下方向（鉛直方向）」の力がつりあう式を立てます。</p>
      <p>登場する力を整理しましょう:<br>
      ・地面からの垂直抗力 $N$（上向き）<br>
      ・壁からの垂直抗力 $R$（水平向き＝壁は摩擦なしなので水平にしか押さない）<br>
      ・地面の摩擦力 $f$（水平向き）<br>
      ・はしごの重力 $Mg$、人の重力 $mg$（ともに下向き）</p>
      <div class="term-note"><b>📖 力のつりあい</b><br>
      静止している物体では、働く力のベクトル和がゼロ。方向ごとに分けて「上向きの力の合計 = 下向きの力の合計」を書きます。鉛直方向に関係するのは $N$（上）と2つの重力（下）だけ。$R$ と $f$ は水平なので鉛直の式には出てきません。</div>`,
    hints: [
      String.raw`鉛直方向に成分を持つ力だけ拾う。上向きは地面の垂直抗力 $N$ のみ。`,
      String.raw`下向きははしごの重力 $Mg$ と人の重力 $mg$。「上 = 下」で式を作る。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>鉛直方向の力を拾い出す</h5>
        <p>上向き：地面からの垂直抗力 $N$。<br>下向き：はしごの重力 $Mg$ と人の重力 $mg$。<br>（壁の抗力 $R$ と摩擦 $f$ は水平方向なのでここには入りません）</p>
      </div>
      <div class="sol-step" data-step="2">
        <h5>つりあいの式を立てる</h5>
        <div class="math-display">$$N = Mg + mg = (M+m)g$$</div>
        <p>地面がはしごと人の全重量を支えている、という自然な式になります。</p>
      </div>`,
    answer: String.raw`$N = (M + m)g$`
  },
  {
    id: "2-2",
    chapter: "大問2",
    number: "(2)",
    title: "はしご：水平方向のつりあい",
    tags: ["剛体", "力のつりあい"],
    difficulty: 2,
    formula: String.raw`水平方向の力のつりあい`,
    statement: String.raw`
      <p>（問2の設定で）<b>水平方向の力のつりあいの式を求めよ。</b></p>`,
    meaning: String.raw`
      <p>今度は「左右方向（水平方向）」の力のつりあいです。水平方向に働くのは2つだけ:<br>
      ・壁からの垂直抗力 $R$（壁がはしごを押し返す、水平向き）<br>
      ・地面の摩擦力 $f$（はしごの下端が滑らないように踏ん張る、水平向き）</p>
      <p>この2つが逆向きに引っ張り合ってつりあっています。壁が押す力と地面が踏ん張る力が同じ大きさ、というわけです。</p>`,
    hints: [
      String.raw`水平方向の力は $R$（壁）と $f$（摩擦）の2つだけ。`,
      String.raw`壁ははしごを部屋の内側へ押し、摩擦はそれと逆向きに働く。大きさが等しいとして式を作る。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>水平方向の力を拾い出す</h5>
        <p>壁からの垂直抗力 $R$ は、はしごを壁から離す向き（水平）に働きます。地面の摩擦力 $f$ はその反対向きに、はしごの下端が滑るのを防ぎます。</p>
      </div>
      <div class="sol-step" data-step="2">
        <h5>つりあいの式</h5>
        <div class="math-display">$$f = R$$</div>
        <p>これだけです。摩擦力の大きさは壁からの抗力に等しくなります。</p>
      </div>`,
    answer: String.raw`$f = R$`
  },
  {
    id: "2-3",
    chapter: "大問2",
    number: "(3)",
    title: "はしご：点Oまわりのモーメントのつりあい",
    tags: ["剛体", "力のモーメント"],
    difficulty: 4,
    formula: String.raw`点O（下端）まわりのモーメント`,
    statement: String.raw`
      <p>（問2の設定で）<b>点 O のまわりの力のモーメントのつりあいの式を求めよ。</b>はしごに働く重力は、はしごの中心に働く大きさ $Mg$ の力と同等と考えてよい。（点 O ははしごの下端＝地面との接点）</p>`,
    meaning: String.raw`
      <p>力のつりあいだけでは「はしごが回転して倒れないか」までは分かりません。そこで<b>力のモーメント（回転させる能力）</b>のつりあいを考えます。</p>
      <p>回転の中心を下端 O にとると、そこで働く $N$ と $f$ は「腕の長さ0」なのでモーメントに効きません（計算から消せる）。効くのは3つ:<br>
      ・壁の抗力 $R$（上端で水平）<br>
      ・はしごの重力 $Mg$（中心 = O から $L/2$）<br>
      ・人の重力 $mg$（O から $x$ の位置）</p>
      <div class="term-note"><b>📖 力のモーメント</b><br>
      $$\text{モーメント} = (\text{力}) \times (\text{回転中心から力の作用線までの垂直距離})$$
      「てこ」と同じ。回転中心から遠いほど、また力が大きいほど回そうとする効果が強い。時計回りと反時計回りがつりあえば回転しません。<br>
      斜め $\theta$ のはしごでは、鉛直な力（重力）の腕は<b>水平距離</b>（$\cos\theta$ が付く）、水平な力（$R$）の腕は<b>高さ</b>（$\sin\theta$ が付く）になる点に注意。</div>`,
    hints: [
      String.raw`O を回転中心にすると、O で働く $N, f$ はモーメント0（腕がゼロ）で消える。残るのは $R, Mg, mg$。`,
      String.raw`重力（鉛直下向き）の腕は「水平距離」。中心の水平距離は $\frac{L}{2}\cos\theta$、人は $x\cos\theta$。`,
      String.raw`壁の抗力 $R$（水平）の腕は「高さ」。上端の高さは $L\sin\theta$。倒す向き（$Mg, mg$）と起こす向き（$R$）でつりあわせる。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>回転中心 O を決めてモーメントに効く力を選ぶ</h5>
        <p>O（下端）を中心にとると、そこに作用する $N$ と $f$ は腕の長さが $0$ なのでモーメントを作りません。効くのは $R$、$Mg$、$mg$ の3つです。</p>
      </div>
      <div class="sol-step" data-step="2">
        <h5>各力のモーメントを計算する</h5>
        <p>はしごを「倒す向き」に回すのは2つの重力（下向き、腕は水平距離）:</p>
        <div class="math-display">$$Mg\cdot\frac{L}{2}\cos\theta \quad(\text{はしご自身}), \qquad mg\cdot x\cos\theta \quad(\text{人})$$</div>
        <p>逆に「支える向き」に回すのは壁の抗力 $R$（水平、腕は上端の高さ $L\sin\theta$）:</p>
        <div class="math-display">$$R\cdot L\sin\theta$$</div>
      </div>
      <div class="sol-step" data-step="3">
        <h5>つりあいの式</h5>
        <p>両向きのモーメントが等しい:</p>
        <div class="math-display">$$R\,L\sin\theta = Mg\,\frac{L}{2}\cos\theta + mg\,x\cos\theta$$</div>
      </div>`,
    answer: String.raw`$R\,L\sin\theta = \dfrac{1}{2}MgL\cos\theta + mgx\cos\theta$`
  },
  {
    id: "2-4",
    chapter: "大問2",
    number: "(4)",
    title: "はしご：登りきるための tanθ の範囲",
    tags: ["剛体", "摩擦", "不等式"],
    difficulty: 5,
    formula: String.raw`$\mu = \frac{1}{2}$ で登りきれる $\tan\theta$ の範囲`,
    statement: String.raw`
      <p>（問2の設定で）地面とはしごの静止摩擦係数が $\mu = \dfrac{1}{2}$ のとき、はしごが倒れずに人がはしごを<b>登りきる</b>ための $\tan\theta$ の範囲を求めよ。</p>`,
    meaning: String.raw`
      <p>(1)〜(3)で作った式を連立して、「人が一番上（$x = L$）まで登っても滑らない条件」を求めます。</p>
      <p>ポイントは「いつが一番危ないか」。人が上に行くほど壁の抗力 $R$ が大きくなり、必要な摩擦力 $f=R$ も大きくなります。摩擦には上限 $f \leq \mu N$ があるので、<b>一番上（$x=L$）で滑らなければ、途中はすべて大丈夫</b>。だから $x=L$ を代入して条件を作ります。</p>
      <div class="term-note"><b>📖 静止摩擦の条件</b><br>
      $$f \leq \mu N$$
      静止摩擦力は「必要なだけ出る」が、上限 $\mu N$ を超えると滑り出す。この不等式を満たしていれば静止を保てます。</div>`,
    hints: [
      String.raw`(3)の式で $x = L$（登りきる瞬間、最も厳しい）を代入して $R$ を求める。$R = \dfrac{(M/2 + m)g}{\tan\theta}$ になる。`,
      String.raw`(2)より $f = R$、(1)より $N=(M+m)g$。滑らない条件 $f \leq \mu N$ に代入。`,
      String.raw`$\mu = \frac{1}{2}$ を入れて $\tan\theta$ について解く。不等号の向きに注意（$\tan\theta$ は分母にいる）。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>最も厳しい x = L を代入</h5>
        <p>人が上に行くほど $R$（＝必要な摩擦）が増えるので、登りきる瞬間 $x=L$ が最も滑りやすい。(3)に代入:</p>
        <div class="math-display">$$R\,L\sin\theta = \frac{1}{2}MgL\cos\theta + mgL\cos\theta \;\Rightarrow\; R = \frac{\left(\frac{1}{2}M + m\right)g\cos\theta}{\sin\theta} = \frac{\left(\frac{M}{2}+m\right)g}{\tan\theta}$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>滑らない条件に代入する</h5>
        <p>(2) $f = R$、(1) $N = (M+m)g$、静止条件 $f \leq \mu N$ より:</p>
        <div class="math-display">$$\frac{\left(\frac{M}{2}+m\right)g}{\tan\theta} \leq \mu (M+m)g = \frac{1}{2}(M+m)g$$</div>
      </div>
      <div class="sol-step" data-step="3">
        <h5>tanθ について解く</h5>
        <p>両辺を $g$ で割り、$\tan\theta$ を移項します（$\tan\theta>0$ なので不等号の向きに注意）:</p>
        <div class="math-display">$$\frac{M}{2}+m \leq \frac{1}{2}(M+m)\tan\theta \;\Rightarrow\; \tan\theta \geq \frac{\frac{M}{2}+m}{\frac{1}{2}(M+m)} = \frac{M + 2m}{M + m}$$</div>
      </div>
      <div class="warn-box">💭 <b>チェック:</b> 人がいない（$m=0$）なら $\tan\theta \geq 1$、つまり $\theta \geq 45°$。急に立てるほど滑りにくいという直感に合います。人が重い($m$大)ほど右辺が大きくなり、より立てないと登りきれません。</div>`,
    answer: String.raw`$\tan\theta \geq \dfrac{M + 2m}{M + m}$`
  },

  /* ===================== 大問3 強制振動 ===================== */
  {
    id: "3-1",
    chapter: "大問3",
    number: "(1)",
    title: "強制振動：運動方程式を立てる",
    tags: ["振動", "運動方程式"],
    difficulty: 2,
    formula: String.raw`復元力 $-kx$ + 外力 $mf\sin(\omega_0 t)$`,
    statement: String.raw`
      <p>質量 $m$ の質点に、変位 $x$ に比例する復元力 $-kx$、および周期的外力 $mf\sin(\omega_0 t)$ が働いている（ただし $k, f, \omega_0$ は正の定数）。<b>質点の運動方程式を書け。</b></p>`,
    meaning: String.raw`
      <p>バネ（復元力 $-kx$）につながれたおもりを、外から周期的に揺すっている状況です。ブランコを一定のリズムで押すイメージ。これが<b>強制振動</b>です。</p>
      <p>運動方程式は毎度おなじみ $ma = F$（力の合計）。働く力は「バネの復元力」＋「外から加える周期的な力」の2つ。それを足すだけです。</p>
      <div class="term-note"><b>📖 ニュートンの運動方程式</b><br>
      $$m\frac{d^2x}{dt^2} = (\text{働く力の合計})$$
      加速度 $\dfrac{d^2x}{dt^2}$ は $x$ を時間で2回微分したもの。右辺に力を全部足し込むのが基本です。</div>`,
    hints: [
      String.raw`働く力は2つ：復元力 $-kx$ と外力 $mf\sin(\omega_0 t)$。単純に足す。`,
      String.raw`左辺は $m\ddot{x}$（$m \times$ 加速度）。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>力を足し合わせる</h5>
        <p>質点に働く力の合計は $-kx + mf\sin(\omega_0 t)$。これを $ma$ と等しいと置きます:</p>
        <div class="math-display">$$m\frac{d^2x}{dt^2} = -kx + mf\sin(\omega_0 t)$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>見やすい形に整える（任意）</h5>
        <p>両辺を $m$ で割り、固有角振動数 $\omega^2 = \dfrac{k}{m}$ を導入すると、後の問題で扱いやすくなります:</p>
        <div class="math-display">$$\frac{d^2x}{dt^2} + \frac{k}{m}x = f\sin(\omega_0 t)$$</div>
      </div>`,
    answer: String.raw`$m\dfrac{d^2x}{dt^2} = -kx + mf\sin(\omega_0 t)$`
  },
  {
    id: "3-2",
    chapter: "大問3",
    number: "(2)",
    title: "強制振動：特解を求める",
    tags: ["振動", "特解"],
    difficulty: 4,
    formula: String.raw`特解 $x_0 = C_0\sin(\omega_0 t + \delta_0)$`,
    statement: String.raw`
      <p>(1) の方程式の特解を $x_0 = C_0\sin(\omega_0 t + \delta_0)$ とおいて、定数 $C_0$、$\delta_0$ を求めよ。</p>`,
    meaning: String.raw`
      <p>強制振動の解には2つの部分があります。ここで求める<b>特解</b>は「外力に合わせて同じリズム $\omega_0$ で揺れ続ける定常的な振動」の部分です。外力に引きずられた"強制された揺れ"だと思ってください。</p>
      <p>やり方は<b>代入法</b>。「答えはきっと外力と同じ角振動数 $\omega_0$ の $\sin$ だろう」と仮定して方程式に放り込み、つじつまが合うように振幅 $C_0$ と位相 $\delta_0$ を決めます。</p>`,
    hints: [
      String.raw`$x_0 = C_0\sin(\omega_0 t + \delta_0)$ を2回微分すると $\ddot{x}_0 = -\omega_0^2 x_0$。方程式 $\ddot{x} + \frac{k}{m}x = f\sin\omega_0 t$ に代入。`,
      String.raw`左辺は $\left(\frac{k}{m} - \omega_0^2\right)C_0\sin(\omega_0 t+\delta_0)$。これが $f\sin\omega_0 t$ と等しくなるには位相が揃う必要がある → $\delta_0 = 0$。`,
      String.raw`位相を揃えたら振幅を比較：$\left(\frac{k}{m}-\omega_0^2\right)C_0 = f$。$C_0$ について解く。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>仮定した解を代入する</h5>
        <p>$x_0 = C_0\sin(\omega_0 t+\delta_0)$ を2回微分すると $\ddot{x}_0 = -\omega_0^2 C_0\sin(\omega_0 t+\delta_0)$。方程式 $\ddot{x} + \dfrac{k}{m}x = f\sin\omega_0 t$ に入れると:</p>
        <div class="math-display">$$\left(\frac{k}{m} - \omega_0^2\right)C_0\sin(\omega_0 t + \delta_0) = f\sin(\omega_0 t)$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>位相 δ₀ を決める</h5>
        <p>両辺が全ての $t$ で等しくなるには、$\sin$ の中身（位相）が一致しなければなりません。よって $\delta_0 = 0$。</p>
      </div>
      <div class="sol-step" data-step="3">
        <h5>振幅 C₀ を決める</h5>
        <p>$\delta_0=0$ を入れると両辺 $\sin\omega_0 t$ の係数比較:</p>
        <div class="math-display">$$\left(\frac{k}{m} - \omega_0^2\right)C_0 = f \;\Rightarrow\; C_0 = \frac{f}{\frac{k}{m} - \omega_0^2} = \frac{mf}{k - m\omega_0^2}$$</div>
      </div>
      <div class="warn-box">⚠️ <b>共振:</b> $\omega_0 \to \sqrt{k/m}$（外力の振動数が固有振動数に近づく）と分母が0になり $C_0 \to \infty$。これが「共振（共鳴）」で、ブランコが同じリズムの押しでどんどん大きく揺れる現象です。</div>`,
    answer: String.raw`$\delta_0 = 0,\quad C_0 = \dfrac{mf}{k - m\omega_0^2}\ \left(= \dfrac{f}{\frac{k}{m}-\omega_0^2}\right)$`
  },
  {
    id: "3-3",
    chapter: "大問3",
    number: "(3)",
    title: "強制振動：x₁ の満たす方程式",
    tags: ["振動", "線形性", "同次方程式"],
    difficulty: 3,
    formula: String.raw`$x = x_0 + x_1$ のとき $x_1$ の方程式`,
    statement: String.raw`
      <p>(2) の $x_0$ で (1) の方程式の解を $x = x_0 + x_1$ と表すとき、$x_1$ の満たす方程式を書け。</p>`,
    meaning: String.raw`
      <p>全体の解 $x$ を「特解 $x_0$（強制された揺れ）」＋「残り $x_1$」に分けたとき、$x_1$ が何の方程式に従うかを調べます。</p>
      <p>結論を先に言うと、$x_1$ は<b>外力を取り除いた（右辺を0にした）方程式</b>＝<b>同次方程式</b>を満たします。これはバネ本来の自由な振動を表します。</p>
      <div class="term-note"><b>📖 線形微分方程式の重ね合わせ</b><br>
      $x$ と $x_0$ の両方が方程式を満たすとき、その差 $x_1 = x - x_0$ を作って引き算すると、外力の項 $f\sin\omega_0 t$ がきれいに打ち消し合って消えます。残るのは「右辺ゼロ」の同次方程式。これが線形方程式の便利な性質です。</div>`,
    hints: [
      String.raw`$x = x_0 + x_1$ を (1) の方程式に代入する。`,
      String.raw`$x_0$ 自身も方程式を満たす（特解だから）ので、その分を引くと外力項が消える。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>x = x₀ + x₁ を代入する</h5>
        <p>方程式 $\ddot{x} + \dfrac{k}{m}x = f\sin\omega_0 t$ に代入:</p>
        <div class="math-display">$$(\ddot{x}_0 + \ddot{x}_1) + \frac{k}{m}(x_0 + x_1) = f\sin\omega_0 t$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>特解の分を引く</h5>
        <p>$x_0$ は特解なので $\ddot{x}_0 + \dfrac{k}{m}x_0 = f\sin\omega_0 t$ を満たします。上の式からこれを引くと、右辺の外力が消えて:</p>
        <div class="math-display">$$\ddot{x}_1 + \frac{k}{m}x_1 = 0$$</div>
        <p>$x_1$ は外力なしの単振動の方程式（同次方程式）を満たします。</p>
      </div>`,
    answer: String.raw`$\dfrac{d^2 x_1}{dt^2} + \dfrac{k}{m}x_1 = 0$`
  },
  {
    id: "3-4",
    chapter: "大問3",
    number: "(4)",
    title: "強制振動：固有角振動数 ω",
    tags: ["振動", "単振動"],
    difficulty: 2,
    formula: String.raw`$x_1 = C_1\sin(\omega t + \delta)$ の $\omega$`,
    statement: String.raw`
      <p>(3) の方程式の解を $x_1 = C_1\sin(\omega t + \delta)$ とおいて、定数 $\omega$ を求めよ。</p>`,
    meaning: String.raw`
      <p>(3)で得た同次方程式 $\ddot{x}_1 + \dfrac{k}{m}x_1 = 0$ は、単純な<b>単振動</b>の方程式です。その振動の速さ（角振動数 $\omega$）を求めます。</p>
      <p>これは外力に関係なく、バネと質量だけで決まる「そのバネ本来の揺れの速さ」＝<b>固有角振動数</b>です。</p>`,
    hints: [
      String.raw`$x_1 = C_1\sin(\omega t+\delta)$ を代入すると $\ddot{x}_1 = -\omega^2 x_1$。`,
      String.raw`$-\omega^2 + \frac{k}{m} = 0$ から $\omega$ が決まる。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>解を代入する</h5>
        <p>$\ddot{x}_1 = -\omega^2 C_1\sin(\omega t+\delta) = -\omega^2 x_1$。方程式に入れると:</p>
        <div class="math-display">$$-\omega^2 x_1 + \frac{k}{m}x_1 = 0 \;\Rightarrow\; \left(\frac{k}{m} - \omega^2\right)x_1 = 0$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>ω を求める</h5>
        <p>$x_1$ は恒等的に0ではないので、係数が0:</p>
        <div class="math-display">$$\omega^2 = \frac{k}{m} \;\Rightarrow\; \omega = \sqrt{\frac{k}{m}}$$</div>
      </div>`,
    answer: String.raw`$\omega = \sqrt{\dfrac{k}{m}}$`
  },
  {
    id: "3-5",
    chapter: "大問3",
    number: "(5)",
    title: "強制振動：初期条件で C₁, δ を決める",
    tags: ["振動", "初期条件"],
    difficulty: 4,
    formula: String.raw`$x(0)=0,\ \dot{x}(0)=0$ での $C_1, \delta$`,
    statement: String.raw`
      <p>初期条件 $x(0) = 0$、$\dfrac{d}{dt}x(0) = 0$ の場合について、(4) の定数 $C_1$、$\delta$ を求めよ。</p>`,
    meaning: String.raw`
      <p>「最初 $t=0$ で、位置も速度もゼロ（静止した状態から外力で揺すり始める）」という具体的な状況を与えて、まだ決まっていない定数 $C_1$ と $\delta$ を確定させます。</p>
      <p>全体解 $x = x_0 + x_1 = C_0\sin\omega_0 t + C_1\sin(\omega t + \delta)$ に、位置の条件と速度の条件を代入して連立方程式を解く、というのが流れです。</p>`,
    hints: [
      String.raw`全体解は $x = C_0\sin(\omega_0 t) + C_1\sin(\omega t + \delta)$（$\delta_0=0$）。まず $x(0)=0$ を代入。`,
      String.raw`$x(0) = C_1\sin\delta = 0$ → $\delta = 0$。次に速度 $\dot{x}(0)=0$ を使う。`,
      String.raw`$\dot{x} = C_0\omega_0\cos\omega_0 t + C_1\omega\cos(\omega t+\delta)$。$t=0,\ \delta=0$ を入れて $C_1$ を求める。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>位置の条件 x(0)=0</h5>
        <p>全体解 $x = C_0\sin(\omega_0 t) + C_1\sin(\omega t+\delta)$ に $t=0$:</p>
        <div class="math-display">$$x(0) = C_0\cdot 0 + C_1\sin\delta = C_1\sin\delta = 0$$</div>
        <p>$C_1 \neq 0$ なら $\sin\delta = 0$、よって $\delta = 0$。</p>
      </div>
      <div class="sol-step" data-step="2">
        <h5>速度の条件 ẋ(0)=0</h5>
        <p>速度は $\dot{x} = C_0\omega_0\cos(\omega_0 t) + C_1\omega\cos(\omega t+\delta)$。$t=0$、$\delta=0$ を代入:</p>
        <div class="math-display">$$\dot{x}(0) = C_0\omega_0 + C_1\omega = 0 \;\Rightarrow\; C_1 = -\frac{\omega_0}{\omega}C_0$$</div>
      </div>
      <div class="sol-step" data-step="3">
        <h5>まとめ</h5>
        <p>$C_0 = \dfrac{mf}{k-m\omega_0^2}$、$\omega=\sqrt{k/m}$ を使うと:</p>
        <div class="math-display">$$\delta = 0, \qquad C_1 = -\frac{\omega_0}{\omega}\cdot\frac{mf}{k - m\omega_0^2}$$</div>
      </div>`,
    answer: String.raw`$\delta = 0,\quad C_1 = -\dfrac{\omega_0}{\omega}C_0 = -\dfrac{\omega_0}{\omega}\cdot\dfrac{mf}{k-m\omega_0^2}$`
  },
  {
    id: "3-6",
    chapter: "大問3",
    number: "(6)",
    title: "強制振動：うなりの形に整理して A, B を求める",
    tags: ["振動", "うなり", "和積公式"],
    difficulty: 5,
    formula: String.raw`$x(t) = A\sin(\cdots)\cos(\cdots) + B\sin(\cdots)\cos(\cdots)$`,
    statement: String.raw`
      <p>(2), (5) で求めた定数を用いて表される解 $x(t)$ を<br>
      $$x(t) = x_0 + x_1 = A\sin\!\left(\frac{\omega-\omega_0}{2}t\right)\cos\!\left(\frac{\omega+\omega_0}{2}t\right) + B\sin\!\left(\frac{\omega+\omega_0}{2}t\right)\cos\!\left(\frac{\omega-\omega_0}{2}t\right)$$<br>
      と表したとき、定数 $A$、$B$ を求めよ。ただし $\omega \neq \omega_0$ とする。</p>`,
    meaning: String.raw`
      <p>ここまでで解は $x(t) = C_0\sin\omega_0 t - \dfrac{\omega_0}{\omega}C_0\sin\omega t$、つまり<b>2つの異なる振動数の $\sin$ の重ね合わせ</b>になっています。</p>
      <p>これを「和 → 積」の形に書き直すと、周波数の近い2つの波が干渉して生まれる<b>うなり（ビート）</b>の構造が見えてきます。ゆっくりした振幅の波（$\frac{\omega-\omega_0}{2}$）が、速い振動（$\frac{\omega+\omega_0}{2}$）を包み込む形です。</p>
      <div class="term-note"><b>📖 積和の公式</b><br>
      $$\sin P\cos Q = \frac{1}{2}\big[\sin(P+Q) + \sin(P-Q)\big]$$
      与えられた右辺（積の形）にこの公式を使って $\sin\omega t$ と $\sin\omega_0 t$ に展開し直し、元の解と係数比較すれば $A, B$ が求まります。</div>`,
    hints: [
      String.raw`まず解を整理：$x = C_0\sin\omega_0 t - \frac{\omega_0}{\omega}C_0\sin\omega t$。`,
      String.raw`右辺の各項に積和公式を適用。第1項 $A\sin(\frac{\omega-\omega_0}{2}t)\cos(\frac{\omega+\omega_0}{2}t) = \frac{A}{2}[\sin\omega t - \sin\omega_0 t]$。`,
      String.raw`第2項 $B\sin(\frac{\omega+\omega_0}{2}t)\cos(\frac{\omega-\omega_0}{2}t) = \frac{B}{2}[\sin\omega t + \sin\omega_0 t]$。$\sin\omega t$ と $\sin\omega_0 t$ の係数を元の解と比較して連立。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>解を2つの sin の和にまとめる</h5>
        <p>(2)(5)より $\delta=\delta_0=0$、$C_1 = -\dfrac{\omega_0}{\omega}C_0$ なので:</p>
        <div class="math-display">$$x(t) = C_0\sin(\omega_0 t) - \frac{\omega_0}{\omega}C_0\sin(\omega t)$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>右辺を積和公式で展開する</h5>
        <p>目標の式の各項に $\sin P\cos Q = \frac{1}{2}[\sin(P+Q)+\sin(P-Q)]$ を適用。$P\pm Q$ を計算すると $\omega t$ と $\pm\omega_0 t$ が出ます:</p>
        <div class="math-display">$$A\sin\!\tfrac{\omega-\omega_0}{2}t\,\cos\!\tfrac{\omega+\omega_0}{2}t = \frac{A}{2}(\sin\omega t - \sin\omega_0 t)$$</div>
        <div class="math-display">$$B\sin\!\tfrac{\omega+\omega_0}{2}t\,\cos\!\tfrac{\omega-\omega_0}{2}t = \frac{B}{2}(\sin\omega t + \sin\omega_0 t)$$</div>
        <p>合計すると $\dfrac{A+B}{2}\sin\omega t + \dfrac{B-A}{2}\sin\omega_0 t$。</p>
      </div>
      <div class="sol-step" data-step="3">
        <h5>係数を比較して連立を解く</h5>
        <p>元の解 $-\dfrac{\omega_0}{\omega}C_0\sin\omega t + C_0\sin\omega_0 t$ と係数比較:</p>
        <div class="math-display">$$\frac{A+B}{2} = -\frac{\omega_0}{\omega}C_0, \qquad \frac{B-A}{2} = C_0$$</div>
        <p>下の式から $B - A = 2C_0$、上の式から $A+B = -\dfrac{2\omega_0}{\omega}C_0$。足し引きして:</p>
        <div class="math-display">$$A = -\frac{\omega+\omega_0}{\omega}C_0, \qquad B = \frac{\omega-\omega_0}{\omega}C_0$$</div>
      </div>
      <div class="warn-box">🎵 $A$ と $B$ の中の $C_0 = \dfrac{mf}{k-m\omega_0^2}$ を入れれば完成。$\omega \approx \omega_0$ のとき $\frac{\omega-\omega_0}{2}$ がとても小さくなり、ゆっくり大きくなったり小さくなったりする「うなり」が現れます。</div>`,
    answer: String.raw`$A = -\dfrac{\omega+\omega_0}{\omega}C_0,\quad B = \dfrac{\omega-\omega_0}{\omega}C_0$（$C_0 = \dfrac{mf}{k-m\omega_0^2}$）`
  },

  /* ===================== 大問4 ケプラー運動 ===================== */
  {
    id: "4-1",
    chapter: "大問4",
    number: "(1)",
    title: "万有引力とポテンシャル",
    tags: ["万有引力", "ポテンシャル"],
    difficulty: 2,
    formula: String.raw`距離 $r$ での $F(r)$ と $U(r)$`,
    statement: String.raw`
      <p>質量 $m$ の惑星が質量 $M$ の太陽を焦点とする楕円軌道に沿って運動する。この楕円の長軸半径を $a$、短軸半径を $b$ とする。太陽は静止しているとし、惑星の（太陽のまわりの）角運動量の大きさを $l$、重力定数を $G$ とする。<br>惑星と太陽の距離が $r$ のとき、それらの間に働く力の大きさ $F(r)$ および無限遠を基準としたポテンシャルエネルギー $U(r)$ はそれぞれどのように表されるか。</p>`,
    meaning: String.raw`
      <p>惑星と太陽の間に働く<b>万有引力</b>と、その位置エネルギーを書く問題です。これは公式そのものなので、確実に覚えておきたいところ。</p>
      <div class="term-note"><b>📖 万有引力の法則</b><br>
      $$F(r) = \frac{GMm}{r^2} \qquad U(r) = -\frac{GMm}{r}$$
      力は距離の2乗に反比例（引力）。ポテンシャルは「無限遠を基準（$U(\infty)=0$）」にとるとマイナスになります。これは $F = -\dfrac{dU}{dr}$ の関係（$-\dfrac{d}{dr}\left(-\dfrac{GMm}{r}\right) = -\dfrac{GMm}{r^2}$、大きさ $\dfrac{GMm}{r^2}$）とも整合します。</div>`,
    hints: [
      String.raw`力は万有引力の法則 $F = \dfrac{GMm}{r^2}$。`,
      String.raw`ポテンシャルは $U(r) = -\int_\infty^r F\,dr'$ を計算するか、公式 $U = -\dfrac{GMm}{r}$ を思い出す。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>万有引力の大きさ</h5>
        <p>質量 $M$ と $m$ が距離 $r$ 離れているときの引力:</p>
        <div class="math-display">$$F(r) = \frac{GMm}{r^2}$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>ポテンシャルを積分で求める</h5>
        <p>無限遠を基準にすると、$U(r) = -\displaystyle\int_\infty^r \left(-\frac{GMm}{r'^2}\right)dr'$（引力なので中心向き＝負）。計算すると:</p>
        <div class="math-display">$$U(r) = -\frac{GMm}{r}$$</div>
        <p>遠いほど $U$ は0に近づき（負で絶対値が小さい）、近いほど深い谷（大きな負）になります。</p>
      </div>`,
    answer: String.raw`$F(r) = \dfrac{GMm}{r^2},\qquad U(r) = -\dfrac{GMm}{r}$`
  },
  {
    id: "4-2",
    chapter: "大問4",
    number: "(2)",
    title: "近日点・遠日点の速度（角運動量保存）",
    tags: ["角運動量保存", "ケプラー"],
    difficulty: 4,
    formula: String.raw`$v_0$（最短距離）と $v_1$（最遠点）`,
    statement: String.raw`
      <p>惑星と太陽の最短距離を $c$ とし、そのときの惑星の速度を $v_0$ とし、太陽から最も遠い点での惑星の速度を $v_1$ とする。$v_0$、$v_1$ をそれぞれ $l, m, a, c$ を用いて表せ。</p>`,
    meaning: String.raw`
      <p>楕円軌道で太陽に一番近い点（近日点、距離 $c$）と一番遠い点（遠日点）での速さを求めます。使う武器は<b>角運動量保存</b>です。</p>
      <p>近日点と遠日点では、惑星の速度が動径（太陽への線）と<b>垂直</b>になります。このとき角運動量 $l = mvr$ という簡単な形になるのがポイント。</p>
      <div class="term-note"><b>📖 角運動量保存と楕円の幾何</b><br>
      角運動量：速度が動径に垂直な点では $l = m v r$。<br>
      楕円の幾何：長軸の全長は $2a$ で、これは「近日点距離 + 遠日点距離」に等しい。だから遠日点距離 $= 2a - c$。<br>
      この2つを組み合わせます。</div>`,
    hints: [
      String.raw`近日点では速度⊥動径なので $l = m v_0 c$。ここから $v_0$ が出る。`,
      String.raw`遠日点距離は長軸 $2a$ から近日点距離 $c$ を引いて $2a - c$。同様に $l = m v_1(2a-c)$。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>近日点での角運動量</h5>
        <p>最短距離 $c$ の点では速度が動径に垂直。角運動量の大きさは $l = m v_0 c$。よって:</p>
        <div class="math-display">$$v_0 = \frac{l}{mc}$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>遠日点距離を求める</h5>
        <p>楕円の長軸の全長 $2a$ は「近日点距離 + 遠日点距離」。近日点距離が $c$ なので遠日点距離は $2a - c$。</p>
      </div>
      <div class="sol-step" data-step="3">
        <h5>遠日点での速度</h5>
        <p>遠日点でも速度⊥動径なので $l = m v_1(2a-c)$:</p>
        <div class="math-display">$$v_1 = \frac{l}{m(2a-c)}$$</div>
      </div>`,
    answer: String.raw`$v_0 = \dfrac{l}{mc},\qquad v_1 = \dfrac{l}{m(2a-c)}$`
  },
  {
    id: "4-3",
    chapter: "大問4",
    number: "(3)",
    title: "エネルギー保存から角運動量 l を求める",
    tags: ["力学的エネルギー保存", "角運動量"],
    difficulty: 5,
    formula: String.raw`$l$ を $G, m, M, a, c$ で表す`,
    statement: String.raw`
      <p>(2) の結果と力学的エネルギーの保存から、$l$ を $G, m, M, a, c$ を用いて表せ。</p>`,
    meaning: String.raw`
      <p>近日点と遠日点で<b>力学的エネルギー（運動エネルギー＋位置エネルギー）が等しい</b>という式を立て、(2)で求めた速度を代入して角運動量 $l$ を求めます。計算は少し長いですが、因数分解が気持ちよく決まります。</p>
      <div class="term-note"><b>📖 力学的エネルギー保存</b><br>
      $$\frac{1}{2}mv^2 - \frac{GMm}{r} = (\text{一定})$$
      軌道上のどの点でも「運動エネルギー + 万有引力のポテンシャル」の合計は変わりません。近日点（$r=c,\ v=v_0$）と遠日点（$r=2a-c,\ v=v_1$）で等しいと置きます。</div>`,
    hints: [
      String.raw`近日点と遠日点でエネルギー保存：$\frac{1}{2}mv_0^2 - \frac{GMm}{c} = \frac{1}{2}mv_1^2 - \frac{GMm}{2a-c}$。`,
      String.raw`(2)の $v_0 = \frac{l}{mc}$、$v_1 = \frac{l}{m(2a-c)}$ を代入。$l^2$ の項と $GMm$ の項をそれぞれ左右に集める。`,
      String.raw`両辺に共通因子 $(a-c)$ が現れる。約分すると $l^2 = \frac{GMm^2 c(2a-c)}{a}$ が出る（$c(2a-c)=b^2$ でもある）。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>エネルギー保存の式を立てる</h5>
        <div class="math-display">$$\frac{1}{2}mv_0^2 - \frac{GMm}{c} = \frac{1}{2}mv_1^2 - \frac{GMm}{2a-c}$$</div>
        <p>(2)より $v_0 = \dfrac{l}{mc}$、$v_1 = \dfrac{l}{m(2a-c)}$ を代入:</p>
        <div class="math-display">$$\frac{l^2}{2mc^2} - \frac{GMm}{c} = \frac{l^2}{2m(2a-c)^2} - \frac{GMm}{2a-c}$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>l² の項と GMm の項を整理する</h5>
        <div class="math-display">$$\frac{l^2}{2m}\left(\frac{1}{c^2} - \frac{1}{(2a-c)^2}\right) = GMm\left(\frac{1}{c} - \frac{1}{2a-c}\right)$$</div>
        <p>それぞれ通分すると、左の括弧は $\dfrac{4a(a-c)}{c^2(2a-c)^2}$、右の括弧は $\dfrac{2(a-c)}{c(2a-c)}$。共通因子 $(a-c)$ を約分できます（$a\neq c$）。</p>
      </div>
      <div class="sol-step" data-step="3">
        <h5>l について解く</h5>
        <div class="math-display">$$\frac{l^2}{2m}\cdot\frac{4a}{c^2(2a-c)^2} = GMm\cdot\frac{2}{c(2a-c)}$$</div>
        <p>整理すると:</p>
        <div class="math-display">$$l^2 = \frac{GMm^2\,c(2a-c)}{a} \;\Rightarrow\; l = m\sqrt{\frac{GM\,c(2a-c)}{a}}$$</div>
      </div>
      <div class="warn-box">✨ <b>豆知識:</b> 楕円では $c(2a-c) = b^2$（短軸半径の2乗）が成り立つので、$l = mb\sqrt{\dfrac{GM}{a}}$ とも書けます。この形は(6)の周期の計算で効いてきます。</div>`,
    answer: String.raw`$l = m\sqrt{\dfrac{GM\,c(2a-c)}{a}}\quad\left(l^2 = \dfrac{GMm^2 c(2a-c)}{a}\right)$`
  },
  {
    id: "4-4",
    chapter: "大問4",
    number: "(4)",
    title: "媒介変数表示から速度ベクトルを求める",
    tags: ["媒介変数", "速度ベクトル"],
    difficulty: 3,
    formula: String.raw`$\mathbf{r} = ((a-c)+a\cos\phi)\mathbf{i} + b\sin\phi\,\mathbf{j}$`,
    statement: String.raw`
      <p>惑星の軌道を媒介変数 $\phi$ を用いて太陽を原点として $\mathbf{r} = \big((a-c)+a\cos\phi\big)\mathbf{i} + b\sin\phi\,\mathbf{j}$ で表す（$\mathbf{i}, \mathbf{j}$ はそれぞれ $x, y$ 方向の単位ベクトル）。このとき、惑星の速度ベクトル $\mathbf{v}$ を求めよ。</p>`,
    meaning: String.raw`
      <p>惑星の位置を「角度パラメータ $\phi$」で表した式（楕円の媒介変数表示）が与えられています。速度は<b>位置を時間 $t$ で微分</b>したものですが、位置は $\phi$ の式なので、<b>合成関数の微分（連鎖律）</b>を使います。</p>
      <div class="term-note"><b>📖 連鎖律で速度を出す</b><br>
      $$\mathbf{v} = \frac{d\mathbf{r}}{dt} = \frac{d\mathbf{r}}{d\phi}\cdot\frac{d\phi}{dt}$$
      「$\phi$ で微分」してから「$\dfrac{d\phi}{dt}$（角度の変化する速さ）」を掛けます。$\dfrac{d\phi}{dt}$ はこの段階では未知のまま残しておいてOK（次の(5)で決めます）。</div>`,
    hints: [
      String.raw`$\mathbf{r}$ を $\phi$ で微分：$\frac{d\mathbf{r}}{d\phi} = (-a\sin\phi)\mathbf{i} + (b\cos\phi)\mathbf{j}$。定数 $(a-c)$ は消える。`,
      String.raw`これに $\frac{d\phi}{dt}$ を掛けたものが速度ベクトル。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>位置を φ で微分する</h5>
        <p>$x$ 成分 $(a-c)+a\cos\phi$ の $\phi$ 微分は $-a\sin\phi$（定数 $(a-c)$ は消える）。$y$ 成分 $b\sin\phi$ の微分は $b\cos\phi$:</p>
        <div class="math-display">$$\frac{d\mathbf{r}}{d\phi} = (-a\sin\phi)\,\mathbf{i} + (b\cos\phi)\,\mathbf{j}$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>連鎖律で時間微分にする</h5>
        <div class="math-display">$$\mathbf{v} = \frac{d\mathbf{r}}{d\phi}\cdot\frac{d\phi}{dt} = \frac{d\phi}{dt}\Big[(-a\sin\phi)\,\mathbf{i} + (b\cos\phi)\,\mathbf{j}\Big]$$</div>
      </div>`,
    answer: String.raw`$\mathbf{v} = \dfrac{d\phi}{dt}\big[(-a\sin\phi)\,\mathbf{i} + (b\cos\phi)\,\mathbf{j}\big]$`
  },
  {
    id: "4-5",
    chapter: "大問4",
    number: "(5)",
    title: "角運動量から dφ/dt を求める",
    tags: ["角運動量", "外積"],
    difficulty: 4,
    formula: String.raw`$\dfrac{d\phi}{dt}$ を $l,m,a,b,c,\phi$ で表す`,
    statement: String.raw`
      <p>(4) のとき、惑星の（太陽のまわりの）角運動量 $\mathbf{L} = \mathbf{r} \times m\mathbf{v}$ の大きさが $l$ であることから、$\dfrac{d\phi}{dt}$ を $l, m, a, b, c, \phi$ を用いて表せ。</p>`,
    meaning: String.raw`
      <p>(4)で速度に残った未知の $\dfrac{d\phi}{dt}$ を、角運動量が $l$ で一定という条件から決めます。</p>
      <p>角運動量 $\mathbf{L} = \mathbf{r}\times m\mathbf{v}$ を外積で計算すると、その大きさが $\dfrac{d\phi}{dt}$ を含む式になります。それを $l$ と等しいと置けば $\dfrac{d\phi}{dt}$ が求まります。</p>
      <div class="term-note"><b>📖 2次元の外積（z成分）</b><br>
      $\mathbf{r} = (r_x, r_y)$、$\mathbf{v} = (v_x, v_y)$ のとき、$\mathbf{r}\times\mathbf{v}$ は $z$ 成分だけを持ち、
      $$(\mathbf{r}\times\mathbf{v})_z = r_x v_y - r_y v_x$$
      これに $m$ を掛けたものが角運動量の大きさです。</div>`,
    hints: [
      String.raw`$\mathbf{r} = ((a-c)+a\cos\phi,\ b\sin\phi)$、$\mathbf{v} = \dot\phi(-a\sin\phi,\ b\cos\phi)$。外積のz成分 $r_x v_y - r_y v_x$ を計算。`,
      String.raw`$\sin^2\phi + \cos^2\phi = 1$ を使うと項がまとまって $\dot\phi\, b[a + (a-c)\cos\phi]$ になる。`,
      String.raw`$L = m\dot\phi\, b[a+(a-c)\cos\phi] = l$ を $\dot\phi = \frac{d\phi}{dt}$ について解く。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>外積のz成分を計算する</h5>
        <p>$\dot\phi = \dfrac{d\phi}{dt}$ と略記。$r_x v_y - r_y v_x$ を計算します:</p>
        <div class="math-display">$$\big[(a-c)+a\cos\phi\big]\dot\phi\, b\cos\phi - b\sin\phi\cdot\dot\phi(-a\sin\phi)$$</div>
        <div class="math-display">$$= \dot\phi\, b\Big[(a-c)\cos\phi + a\cos^2\phi + a\sin^2\phi\Big]$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>三角関数を整理する</h5>
        <p>$a\cos^2\phi + a\sin^2\phi = a$ にまとまるので:</p>
        <div class="math-display">$$= \dot\phi\, b\big[a + (a-c)\cos\phi\big]$$</div>
        <p>よって角運動量の大きさは $L = m\dot\phi\,b[a+(a-c)\cos\phi]$。</p>
      </div>
      <div class="sol-step" data-step="3">
        <h5>L = l として dφ/dt を求める</h5>
        <div class="math-display">$$m\,b\big[a+(a-c)\cos\phi\big]\frac{d\phi}{dt} = l \;\Rightarrow\; \frac{d\phi}{dt} = \frac{l}{mb\big[a + (a-c)\cos\phi\big]}$$</div>
      </div>`,
    answer: String.raw`$\dfrac{d\phi}{dt} = \dfrac{l}{mb\big[a + (a-c)\cos\phi\big]}$`
  },
  {
    id: "4-6",
    chapter: "大問4",
    number: "(6)",
    title: "公転周期 T（ケプラーの第三法則）",
    tags: ["公転周期", "積分", "ケプラー"],
    difficulty: 4,
    formula: String.raw`公転周期 $T$ を $l, m, a, b$ で表す`,
    statement: String.raw`
      <p>(5) の結果を用いて、惑星の公転周期 $T$ を $l, m, a, b$ を用いて表せ。</p>`,
    meaning: String.raw`
      <p>惑星が軌道を1周するのにかかる時間（公転周期 $T$）を求めます。$\phi$ を $0$ から $2\pi$ まで動かせば1周。(5)で得た $\dfrac{d\phi}{dt}$ をひっくり返して積分します。</p>
      <div class="term-note"><b>📖 周期は「時間」の積分</b><br>
      $$T = \int_0^T dt = \int_0^{2\pi}\frac{dt}{d\phi}\,d\phi = \int_0^{2\pi}\frac{1}{\ \dfrac{d\phi}{dt}\ }\,d\phi$$
      「1周分の $\phi$」を「角度あたりにかかる時間 $\frac{dt}{d\phi}$」で積分すれば総時間。$\cos\phi$ を1周積分すると $0$ になるのがミソです。</div>`,
    hints: [
      String.raw`$\frac{dt}{d\phi}$ は (5) の逆数 $= \frac{mb[a+(a-c)\cos\phi]}{l}$。これを $0$ から $2\pi$ まで積分。`,
      String.raw`$\int_0^{2\pi}\cos\phi\,d\phi = 0$、$\int_0^{2\pi}d\phi = 2\pi$。定数項 $a$ だけが残る。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>dt/dφ を積分する形にする</h5>
        <p>(5)の逆数をとって $\phi$ で積分:</p>
        <div class="math-display">$$T = \int_0^{2\pi}\frac{dt}{d\phi}\,d\phi = \int_0^{2\pi}\frac{mb\big[a+(a-c)\cos\phi\big]}{l}\,d\phi$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>積分を実行する</h5>
        <p>$\displaystyle\int_0^{2\pi}a\,d\phi = 2\pi a$、$\displaystyle\int_0^{2\pi}(a-c)\cos\phi\,d\phi = 0$（$\cos$ を1周積分すると0）:</p>
        <div class="math-display">$$T = \frac{mb}{l}\big(2\pi a + 0\big) = \frac{2\pi m a b}{l}$$</div>
      </div>
      <div class="warn-box">🌍 <b>ケプラーの第三法則との一致:</b> (3)の $l = mb\sqrt{GM/a}$ を代入すると $T = \dfrac{2\pi mab}{mb\sqrt{GM/a}} = 2\pi\sqrt{\dfrac{a^3}{GM}}$。「周期の2乗は長半径の3乗に比例（$T^2 \propto a^3$）」というケプラーの第三法則そのものです！</div>`,
    answer: String.raw`$T = \dfrac{2\pi m a b}{l}$`
  },

  /* ===================== 大問5 衝突 ===================== */
  {
    id: "5-1",
    chapter: "大問5",
    number: "(1)",
    title: "衝突直前のAの速さ",
    tags: ["エネルギー保存", "衝突"],
    difficulty: 2,
    formula: String.raw`高さ $h$ から落ちた A の速さ`,
    statement: String.raw`
      <p>図のように、高さ $h$ から質量 $m$ の物体 A が転がり下りてきて、下にある静止した物体 B に弾性衝突し、はね返されて高さ $\dfrac{h}{2}$ まで登った。重力加速度の大きさを $g$ とする。<br><b>A が B に衝突する直前の A の速さを求めよ。</b></p>`,
    meaning: String.raw`
      <p>高さ $h$ の斜面を滑り下りてきた物体が、一番下でどれだけの速さになっているかを求めます。摩擦の話は出てこないので、<b>力学的エネルギー保存</b>を使えば一発です。</p>
      <div class="term-note"><b>📖 力学的エネルギー保存</b><br>
      $$mgh = \frac{1}{2}mv^2$$
      「最初に持っていた位置エネルギー $mgh$」が、下ではすべて「運動エネルギー $\frac{1}{2}mv^2$」に変わる。高さのエネルギーが速さのエネルギーに化ける、という定番の式です。</div>`,
    hints: [
      String.raw`高さ $h$ の位置エネルギー $mgh$ が、底での運動エネルギー $\frac{1}{2}mv^2$ に等しい。`,
      String.raw`$mgh = \frac{1}{2}mv^2$ を $v$ について解く。質量 $m$ は消える。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>エネルギー保存を書く</h5>
        <div class="math-display">$$mgh = \frac{1}{2}mv^2$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>v について解く</h5>
        <p>両辺の $m$ が消えて:</p>
        <div class="math-display">$$v^2 = 2gh \;\Rightarrow\; v = \sqrt{2gh}$$</div>
      </div>`,
    answer: String.raw`$v = \sqrt{2gh}$`
  },
  {
    id: "5-2",
    chapter: "大問5",
    number: "(2)",
    title: "衝突直後のAの速さ",
    tags: ["エネルギー保存", "衝突"],
    difficulty: 2,
    formula: String.raw`$\frac{h}{2}$ まで戻った A の速さ`,
    statement: String.raw`
      <p>（問5の設定で）<b>衝突した直後の A の速さを求めよ。</b></p>`,
    meaning: String.raw`
      <p>衝突ではね返った A は高さ $\dfrac{h}{2}$ まで登りました。この「登った高さ」から、はね返った瞬間の速さを逆算します。(1)と同じくエネルギー保存ですが、今度は「速さ → 高さ」の向きに使います。</p>`,
    hints: [
      String.raw`はね返り直後の速さ $v'$ の運動エネルギーが、高さ $\frac{h}{2}$ の位置エネルギーに変わる。`,
      String.raw`$\frac{1}{2}mv'^2 = mg\cdot\frac{h}{2}$ を解く。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>登った高さからエネルギー保存</h5>
        <p>はね返り直後の速さを $v'$ とすると、その運動エネルギーが高さ $\frac{h}{2}$ の位置エネルギーになります:</p>
        <div class="math-display">$$\frac{1}{2}mv'^2 = mg\cdot\frac{h}{2}$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>v′ について解く</h5>
        <div class="math-display">$$v'^2 = gh \;\Rightarrow\; v' = \sqrt{gh}$$</div>
        <p>(1)の $\sqrt{2gh}$ より遅くなっています（$\frac{1}{\sqrt2}$ 倍）。衝突で運動が B に一部渡ったためです。</p>
      </div>`,
    answer: String.raw`$v' = \sqrt{gh}$`
  },
  {
    id: "5-3",
    chapter: "大問5",
    number: "(3)",
    title: "衝突後のBの速さ（弾性衝突）",
    tags: ["反発係数", "弾性衝突"],
    difficulty: 4,
    formula: String.raw`衝突後の B の速さ $V_B$`,
    statement: String.raw`
      <p>（問5の設定で）<b>衝突後の B の速さを求めよ。</b></p>`,
    meaning: String.raw`
      <p>弾性衝突（反発係数 $e = 1$）という条件を使って、B が衝突後どれだけの速さで動き出すかを求めます。</p>
      <p>ここで大事なのが<b>反発係数の定義</b>。弾性衝突では「衝突後に離れていく速さ」＝「衝突前に近づいてくる速さ」になります。B の質量が分からなくても、この関係だけで B の速さが決まります。</p>
      <div class="term-note"><b>📖 反発係数 e</b><br>
      $$e = \frac{\text{衝突後の相対速度（離れる速さ）}}{\text{衝突前の相対速度（近づく速さ）}}$$
      弾性衝突は $e = 1$。「ぶつかる前に近づく速さ」と「ぶつかった後に離れる速さ」が等しい、という意味です。<br>
      A は衝突後<b>はね返る＝逆向き</b>になっている点に注意（速度の符号が反転）。</div>`,
    hints: [
      String.raw`衝突前：A は $\sqrt{2gh}$ で B に近づく、B は静止。近づく相対速度 = $\sqrt{2gh}$。`,
      String.raw`衝突後：A は逆向きに $\sqrt{gh}$（跳ね返り）、B は前向きに $V_B$。離れる相対速度 = $V_B - (-\sqrt{gh}) = V_B + \sqrt{gh}$。`,
      String.raw`弾性衝突 $e=1$：離れる速さ = 近づく速さ。$V_B + \sqrt{gh} = \sqrt{2gh}$ を解く。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>近づく相対速度（衝突前）</h5>
        <p>A は速さ $\sqrt{2gh}$ で B に向かい、B は静止。近づく相対速度は $\sqrt{2gh}$。</p>
      </div>
      <div class="sol-step" data-step="2">
        <h5>離れる相対速度（衝突後）</h5>
        <p>A ははね返って逆向きに $\sqrt{gh}$（速度としては $-\sqrt{gh}$）、B は前向きに $V_B$。離れる相対速度は $V_B - (-\sqrt{gh}) = V_B + \sqrt{gh}$。</p>
      </div>
      <div class="sol-step" data-step="3">
        <h5>弾性衝突 e = 1 を使う</h5>
        <p>「離れる速さ = 近づく速さ」なので:</p>
        <div class="math-display">$$V_B + \sqrt{gh} = \sqrt{2gh} \;\Rightarrow\; V_B = \sqrt{2gh} - \sqrt{gh} = (\sqrt{2}-1)\sqrt{gh}$$</div>
      </div>`,
    answer: String.raw`$V_B = (\sqrt{2} - 1)\sqrt{gh}$`
  },
  {
    id: "5-4",
    chapter: "大問5",
    number: "(4)",
    title: "Bの質量（運動量保存）",
    tags: ["運動量保存", "衝突"],
    difficulty: 4,
    formula: String.raw`B の質量 $M_B$`,
    statement: String.raw`
      <p>（問5の設定で）<b>B の質量を求めよ。</b></p>`,
    meaning: String.raw`
      <p>最後は<b>運動量保存</b>を使って B の質量を求めます。衝突の前後で、A と B を合わせた運動量（質量×速度の合計）は変化しません。</p>
      <p>A の速度（前・後）と B の速度（後）はすべて分かっているので、運動量保存の式に入れれば未知の $M_B$ が解けます。</p>
      <div class="term-note"><b>📖 運動量保存の法則</b><br>
      $$m_A v_A + m_B v_B = m_A v_A' + m_B v_B'$$
      衝突では外力（重力は衝突の一瞬では無視できる）がないので、運動量の合計は保存。<b>向き（符号）を正しく扱う</b>のが最重要ポイントです。</div>`,
    hints: [
      String.raw`前向きを正とする。衝突前：A $= +m\sqrt{2gh}$、B $= 0$。衝突後：A $= -m\sqrt{gh}$（逆向き）、B $= +M_B V_B$。`,
      String.raw`$m\sqrt{2gh} = -m\sqrt{gh} + M_B V_B$ を $M_B$ について解く。$V_B = (\sqrt2-1)\sqrt{gh}$ を代入。`,
      String.raw`$\frac{\sqrt2+1}{\sqrt2-1}$ を有理化すると $(\sqrt2+1)^2 = 3+2\sqrt2$ が出る。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>運動量保存の式を立てる</h5>
        <p>前向きを正とする。A の質量は $m$、B の質量を $M_B$:</p>
        <div class="math-display">$$\underbrace{m\sqrt{2gh}}_{\text{前:A}} + \underbrace{0}_{\text{前:B}} = \underbrace{-m\sqrt{gh}}_{\text{後:A(逆向き)}} + \underbrace{M_B V_B}_{\text{後:B}}$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>M_B について整理する</h5>
        <div class="math-display">$$M_B V_B = m\sqrt{2gh} + m\sqrt{gh} = m(\sqrt{2}+1)\sqrt{gh}$$</div>
        <p>(3)より $V_B = (\sqrt2 - 1)\sqrt{gh}$ を代入:</p>
        <div class="math-display">$$M_B = \frac{m(\sqrt2+1)\sqrt{gh}}{(\sqrt2-1)\sqrt{gh}} = m\cdot\frac{\sqrt2+1}{\sqrt2-1}$$</div>
      </div>
      <div class="sol-step" data-step="3">
        <h5>有理化する</h5>
        <p>分母分子に $(\sqrt2+1)$ を掛けます。分母は $(\sqrt2-1)(\sqrt2+1) = 2-1 = 1$:</p>
        <div class="math-display">$$M_B = m(\sqrt2+1)^2 = m(2 + 2\sqrt2 + 1) = (3 + 2\sqrt2)\,m$$</div>
      </div>`,
    answer: String.raw`$M_B = (3 + 2\sqrt{2})\,m \approx 5.83\,m$`
  },

  /* ===================== 大問6 空気抵抗のある落下 ===================== */
  {
    id: "6-1",
    chapter: "大問6",
    number: "(1)",
    title: "空気抵抗つき落下の運動方程式",
    tags: ["運動方程式", "空気抵抗"],
    difficulty: 3,
    formula: String.raw`重力 + 空気抵抗 $\frac{m}{a}v^2$`,
    statement: String.raw`
      <p>空気中で質量 $m$ の物体を初速度 $0$ で落下させた。鉛直上向きを正にとり、時刻 $t$ における速度を $v(t)$ とする。物体には、重力および空気抵抗 $\dfrac{m}{a}v^2$ が働くとする。ただし $a$ は正の定数である。重力加速度の大きさを $g$ として、<b>物体の運動方程式を書け。</b></p>`,
    meaning: String.raw`
      <p>空気抵抗を受けながら落ちる物体の運動方程式を立てます。ポイントは<b>符号（向き）</b>。「上向きを正」と決められているので、落ちる物体の速度 $v$ は負（下向き）になります。</p>
      <p>働く力は2つ:<br>
      ・重力：常に下向き → $-mg$<br>
      ・空気抵抗：運動と逆向き。落下中（$v<0$）は上向き → $+\dfrac{m}{a}v^2$</p>
      <div class="term-note"><b>📖 空気抵抗の向きの扱い</b><br>
      空気抵抗は「運動を妨げる向き」に働きます。物体が下向きに落ちているとき抵抗は上向き（正）。大きさは速さの2乗に比例する $\dfrac{m}{a}v^2$ で、$v^2$ は常に正なので、この項は「上向き（正）」として素直に $+$ で書けます。</div>`,
    hints: [
      String.raw`上向き正。重力は下向きなので $-mg$。`,
      String.raw`落下中は $v<0$ で抵抗は上向き。大きさ $\frac{m}{a}v^2$ を正の符号で加える。$m\dot v = -mg + \frac{m}{a}v^2$。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>力を向きに注意して書く</h5>
        <p>上向きを正とする。重力は下向きで $-mg$。空気抵抗は落下（下向き運動）を妨げる上向きで $+\dfrac{m}{a}v^2$。</p>
      </div>
      <div class="sol-step" data-step="2">
        <h5>運動方程式にまとめる</h5>
        <div class="math-display">$$m\frac{dv}{dt} = -mg + \frac{m}{a}v^2$$</div>
        <p>両辺を $m$ で割ると扱いやすい形:</p>
        <div class="math-display">$$\frac{dv}{dt} = -g + \frac{v^2}{a}$$</div>
      </div>`,
    answer: String.raw`$m\dfrac{dv}{dt} = -mg + \dfrac{m}{a}v^2\quad\left(\dfrac{dv}{dt} = -g + \dfrac{v^2}{a}\right)$`
  },
  {
    id: "6-2",
    chapter: "大問6",
    number: "(2)",
    title: "終端速度（つり合いの速度）",
    tags: ["終端速度", "つりあい"],
    difficulty: 2,
    formula: String.raw`十分時間後の落下速度 $v_f$`,
    statement: String.raw`
      <p>（問6の設定で）重力と空気抵抗のつり合いから、十分時間がたった後の落下速度 $v_f$ を求めよ。</p>`,
    meaning: String.raw`
      <p>落ち始めはどんどん加速しますが、速くなるほど空気抵抗が強くなり、やがて重力とつり合って<b>加速しなくなります</b>。そのときの一定速度が<b>終端速度</b>です。パラシュートや雨粒が一定速度で落ちるのがこれ。</p>
      <p>「加速しない」＝「$\dfrac{dv}{dt} = 0$」を運動方程式に入れるだけで求まります。</p>`,
    hints: [
      String.raw`終端速度では加速度ゼロ：$\frac{dv}{dt}=0$ を (1) に代入。`,
      String.raw`$0 = -g + \frac{v_f^2}{a}$ から $v_f^2 = ag$。落下なので向きは下（負）。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>加速度をゼロにする</h5>
        <p>十分時間後は速度一定＝加速度0。運動方程式 $\dfrac{dv}{dt} = -g + \dfrac{v^2}{a}$ に $\dfrac{dv}{dt}=0$:</p>
        <div class="math-display">$$0 = -g + \frac{v_f^2}{a} \;\Rightarrow\; v_f^2 = ag$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>向きを考えて答える</h5>
        <p>落下しているので下向き（負）。上向き正の約束なので:</p>
        <div class="math-display">$$v_f = -\sqrt{ag}\quad(\text{速さは }\sqrt{ag})$$</div>
      </div>`,
    answer: String.raw`$v_f = -\sqrt{ag}$（下向きに速さ $\sqrt{ag}$）`
  },
  {
    id: "6-3",
    chapter: "大問6",
    number: "(3)",
    title: "速度 v(t) を求める（双曲線関数）",
    tags: ["微分方程式", "双曲線関数", "変数分離"],
    difficulty: 5,
    formula: String.raw`$v(t)$ を求める`,
    statement: String.raw`
      <p>（問6の設定で）(1) の運動方程式から速度 $v(t)$ を求めよ。ただし双曲線関数 $\sinh x = \frac{1}{2}(e^x - e^{-x})$、$\cosh x = \frac{1}{2}(e^x + e^{-x})$、$\tanh x = \frac{\sinh x}{\cosh x}$ について、$\frac{d}{dx}\sinh x = \cosh x$、$\frac{d}{dx}\cosh x = \sinh x$、$\cosh^2 x - \sinh^2 x = 1$ 等の公式を用いてよい。</p>`,
    meaning: String.raw`
      <p>運動方程式 $\dfrac{dv}{dt} = -g + \dfrac{v^2}{a}$ を解いて、速度が時間とともにどう変化するかを求めます。これは<b>変数分離形の微分方程式</b>で、答えには $\tanh$（双曲線正接）が登場します。</p>
      <div class="term-note"><b>📖 なぜ tanh が出るのか</b><br>
      $\tanh$ は「最初は直線的に増え、やがて一定値に飽和する」S字カーブ。まさに「落下速度が終端速度 $\sqrt{ag}$ に近づいていく」振る舞いにぴったり。<br>
      公式 $\dfrac{d}{dx}\tanh x = 1 - \tanh^2 x$（$=\text{sech}^2 x$）を使うと、解が方程式を満たすことを確認できます。</div>`,
    hints: [
      String.raw`答えの形を予想：終端速度 $\sqrt{ag}$ に近づくので $v(t) = -\sqrt{ag}\tanh(\beta t)$ とおいてみる。$\beta$ は未知定数。`,
      String.raw`これを $\frac{dv}{dt} = -g + \frac{v^2}{a}$ に代入。$\frac{d}{dt}\tanh(\beta t) = \beta(1-\tanh^2)$ を使う。`,
      String.raw`両辺を比較すると $\beta = \sqrt{g/a}$。初期条件 $v(0)=0$ も $\tanh 0 = 0$ で自動的に満たされる。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>解の形を仮定する</h5>
        <p>終端速度 $\sqrt{ag}$ に飽和する振る舞いから、$v(t) = -\sqrt{ag}\,\tanh(\beta t)$ と予想（$\beta$ は後で決める定数）。初速 $v(0) = -\sqrt{ag}\tanh 0 = 0$ で初期条件を満たします。</p>
      </div>
      <div class="sol-step" data-step="2">
        <h5>運動方程式に代入する</h5>
        <p>左辺：$\dfrac{dv}{dt} = -\sqrt{ag}\,\beta\,(1 - \tanh^2\beta t)$。<br>
        右辺：$-g + \dfrac{v^2}{a} = -g + \dfrac{ag\tanh^2\beta t}{a} = -g(1 - \tanh^2\beta t)$。</p>
        <div class="math-display">$$-\sqrt{ag}\,\beta\,(1-\tanh^2\beta t) = -g\,(1-\tanh^2\beta t)$$</div>
      </div>
      <div class="sol-step" data-step="3">
        <h5>β を決めて完成</h5>
        <p>両辺の係数を比較：$\sqrt{ag}\,\beta = g$、よって $\beta = \dfrac{g}{\sqrt{ag}} = \sqrt{\dfrac{g}{a}}$:</p>
        <div class="math-display">$$v(t) = -\sqrt{ag}\,\tanh\!\left(\sqrt{\frac{g}{a}}\;t\right)$$</div>
        <p>$t\to\infty$ で $\tanh\to 1$ となり、$v \to -\sqrt{ag}$（終端速度）に近づきます。(2)と一致！</p>
      </div>`,
    answer: String.raw`$v(t) = -\sqrt{ag}\,\tanh\!\left(\sqrt{\dfrac{g}{a}}\,t\right)$`
  },
  {
    id: "6-4",
    chapter: "大問6",
    number: "(4)",
    title: "ある距離だけ落下したときの速度 V",
    tags: ["速度と距離", "変数分離"],
    difficulty: 5,
    formula: String.raw`距離 $a\log\sqrt{1+\frac{v_0^2}{ag}}$ 落下後の $V$`,
    statement: String.raw`
      <p>（問6の設定で）距離 $a\log\sqrt{1 + \dfrac{v_0^2}{ag}}$ だけ落下したときの速度 $V$ を求めよ。ただし $v_0$ は定数。</p>`,
    meaning: String.raw`
      <p>今度は「時間」ではなく「落下した<b>距離</b>」と速度の関係を求めます。時間を経由せず、速度と位置を直接結ぶには、$\dfrac{dv}{dt}$ を $v\dfrac{dv}{dx}$ に変換するテクニックを使います。</p>
      <div class="term-note"><b>📖 時間を消す変形</b><br>
      $$\frac{dv}{dt} = \frac{dv}{dx}\cdot\frac{dx}{dt} = v\frac{dv}{dx}$$
      これで運動方程式が「速度 $v$ と位置 $x$ だけの式」になり、変数分離して積分できます。与えられた落下距離を代入すれば $V$ が求まります。</div>`,
    hints: [
      String.raw`$\frac{dv}{dt} = v\frac{dv}{dx}$ を使うと $v\frac{dv}{dx} = -g + \frac{v^2}{a} = \frac{v^2 - ag}{a}$。変数分離して $\frac{a\,v\,dv}{v^2-ag} = dx$。`,
      String.raw`左辺を積分：$\int\frac{a v\,dv}{v^2-ag} = \frac{a}{2}\log|v^2-ag|$。落下距離 $D$ だけ下がる間、$v$ は $0$ から $V$ へ。`,
      String.raw`$\frac{a}{2}\log\frac{ag-V^2}{ag} = -D$。与えられた $D = \frac{a}{2}\log(1+\frac{v_0^2}{ag})$ を代入して $V$ を解く。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>時間を消して変数分離する</h5>
        <p>$\dfrac{dv}{dt} = v\dfrac{dv}{dx}$ を運動方程式に使うと:</p>
        <div class="math-display">$$v\frac{dv}{dx} = \frac{v^2 - ag}{a} \;\Rightarrow\; \frac{a\,v\,dv}{v^2 - ag} = dx$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>両辺を積分する</h5>
        <p>落下距離を $D$ とし、速度は $0 \to V$、位置は $D$ だけ下がる（上向き正なので変位は $-D$）。左辺は $\dfrac{a}{2}\log|v^2-ag|$:</p>
        <div class="math-display">$$\frac{a}{2}\Big[\log|v^2 - ag|\Big]_0^V = -D \;\Rightarrow\; \frac{a}{2}\log\left|\frac{V^2 - ag}{-ag}\right| = -D$$</div>
        <p>$V^2 < ag$（終端速度未満）なので中身は $\dfrac{ag - V^2}{ag} = 1 - \dfrac{V^2}{ag} > 0$。</p>
      </div>
      <div class="sol-step" data-step="3">
        <h5>落下距離を代入して V を解く</h5>
        <p>与えられた距離 $D = a\log\sqrt{1+\frac{v_0^2}{ag}} = \dfrac{a}{2}\log\left(1+\dfrac{v_0^2}{ag}\right)$ を代入:</p>
        <div class="math-display">$$\frac{a}{2}\log\left(1 - \frac{V^2}{ag}\right) = -\frac{a}{2}\log\left(1 + \frac{v_0^2}{ag}\right) = \frac{a}{2}\log\frac{1}{1+\frac{v_0^2}{ag}}$$</div>
        <p>$\log$ の中身を等しいと置く:</p>
        <div class="math-display">$$1 - \frac{V^2}{ag} = \frac{ag}{ag + v_0^2} \;\Rightarrow\; \frac{V^2}{ag} = \frac{v_0^2}{ag + v_0^2}$$</div>
        <div class="math-display">$$V^2 = \frac{ag\,v_0^2}{ag + v_0^2} \;\Rightarrow\; V = -v_0\sqrt{\frac{ag}{ag + v_0^2}}$$</div>
        <p>（落下なので下向き＝負）</p>
      </div>`,
    answer: String.raw`$V = -v_0\sqrt{\dfrac{ag}{ag + v_0^2}}\quad\left(V^2 = \dfrac{ag\,v_0^2}{ag+v_0^2}\right)$`
  }
];


/* ========================================================================
   2025年度 力学 期末試験 2025.08.04
   ======================================================================== */

const PROBLEMS_2025 = [

  /* ===================== 大問1 地球トンネル（一様球の重力） ===================== */
  {
    id: "25-1-1",
    chapter: "大問1",
    number: "(1)",
    title: "GM を g と R で表す",
    tags: ["万有引力", "重力加速度"],
    difficulty: 2,
    formula: String.raw`$GM$ を $g, R$ で表す`,
    statement: String.raw`
      <p>地球を半径 $R$ で質量密度が一様な球とする。地球の地表での重力加速度の大きさを $g$ として、以下の問いに答えよ。<br><b>万有引力定数 $G$ と地球の質量 $M$ の積 $GM$ を、$g$ と $R$ を用いて表せ。</b></p>`,
    meaning: String.raw`
      <p>「地表での重力加速度 $g$」と「万有引力の式」を結びつける問題です。地表（地球の中心から距離 $R$）に置いた物体には、$mg$ という重力（重さ）と、万有引力 $\dfrac{GMm}{R^2}$ の2通りの書き方があります。これらは同じ力なので等しい、というだけ。</p>
      <div class="term-note"><b>📖 2つの「重力」の表し方</b><br>
      $$mg = \frac{GMm}{R^2}$$
      左辺は「重力加速度 $\times$ 質量」、右辺は「万有引力の法則」。同じ地表の重力を2通りに書いただけなので、等号で結べます。ここから $GM$ が出ます。</div>`,
    hints: [
      String.raw`地表の物体に働く重力は $mg$ とも $\dfrac{GMm}{R^2}$ とも書ける。この2つを等しいと置く。`,
      String.raw`$mg = \dfrac{GMm}{R^2}$ の両辺から $m$ を消して $GM$ について解く。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>2通りの重力を等号で結ぶ</h5>
        <p>地表にある質量 $m$ の物体の重力は、$mg$（重力加速度から）と $\dfrac{GMm}{R^2}$（万有引力から）の両方で書けます:</p>
        <div class="math-display">$$mg = \frac{GMm}{R^2}$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>GM について解く</h5>
        <p>両辺の $m$ が消えて:</p>
        <div class="math-display">$$g = \frac{GM}{R^2} \;\Rightarrow\; GM = gR^2$$</div>
        <p>この関係は以降の問題でも繰り返し使う超重要式です。</p>
      </div>`,
    answer: String.raw`$GM = gR^2$`
  },
  {
    id: "25-1-2",
    chapter: "大問1",
    number: "(2)",
    title: "地球トンネル内で働く力",
    tags: ["一様球", "殻定理", "復元力"],
    difficulty: 4,
    formula: String.raw`中心から距離 $r$ での力`,
    statement: String.raw`
      <p>地球の中心 O を通って地球の両極を結ぶ直線トンネルがあるとする。このトンネル内で中心 O から距離 $r$ の点にある質量 $m$ の物体に働く力を求めよ。</p>`,
    meaning: String.raw`
      <p>地球を貫くトンネルの中に物体を置いたとき、その物体に働く重力を求めます。ポイントは「地球の内部では、外側の部分の引力は打ち消し合ってゼロになる」という<b>殻定理</b>です。</p>
      <p>つまり、中心から距離 $r$ にいる物体を引っ張るのは「半径 $r$ より内側の球の部分」だけ。外側の分厚い殻からの引力は、全方向から引っ張られて完全に相殺されます。</p>
      <div class="term-note"><b>📖 一様球の内部の重力</b><br>
      半径 $r$ の内側の質量は、密度一定なら体積比で $M_{\text{内}} = M\dfrac{r^3}{R^3}$。これが距離 $r$ から物体を引くので、力は
      $$F = \frac{G M_{\text{内}}\, m}{r^2}$$
      $r^3$ と $r^2$ で $r$ が1つ残り、力は $r$ に<b>比例</b>する（中心に近いほど弱い）。これはバネと同じ「復元力」の形です。</div>`,
    hints: [
      String.raw`効くのは半径 $r$ より内側の質量だけ（殻定理）。一様密度なら $M_{\text{内}} = M\frac{r^3}{R^3}$。`,
      String.raw`力は $F = \frac{GM_{\text{内}}m}{r^2}$。$M_{\text{内}}$ を代入すると $r$ の1次に。`,
      String.raw`(1)の $GM = gR^2$ を使って $G, M$ を消すと、きれいな形 $\frac{mg}{R}r$ になる。中心向き。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>効く質量を求める（殻定理）</h5>
        <p>距離 $r$ の物体を引くのは半径 $r$ 内側の球のみ。一様密度なので体積比で:</p>
        <div class="math-display">$$M_{\text{内}} = M\cdot\frac{\frac{4}{3}\pi r^3}{\frac{4}{3}\pi R^3} = M\frac{r^3}{R^3}$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>万有引力を計算する</h5>
        <div class="math-display">$$F = \frac{G M_{\text{内}}\,m}{r^2} = \frac{G m}{r^2}\cdot M\frac{r^3}{R^3} = \frac{GMm}{R^3}\,r$$</div>
      </div>
      <div class="sol-step" data-step="3">
        <h5>GM = gR² で整理する</h5>
        <p>(1)の $GM = gR^2$ を代入:</p>
        <div class="math-display">$$F = \frac{gR^2 m}{R^3}\,r = \frac{mg}{R}\,r \quad(\text{中心 O 向き})$$</div>
        <p>中心からの距離 $r$ に比例し、常に中心へ引き戻す<b>復元力</b>です。符号付きでは $F = -\dfrac{mg}{R}r$。</p>
      </div>`,
    answer: String.raw`$F = \dfrac{mg}{R}\,r$（中心 O 向きの復元力）`
  },
  {
    id: "25-1-3",
    chapter: "大問1",
    number: "(3)",
    title: "トンネルを通り抜ける時間",
    tags: ["単振動", "周期"],
    difficulty: 3,
    formula: String.raw`一端から反対端までの時間`,
    statement: String.raw`
      <p>(2) のトンネルの一端から質量 $m$ の物体を自由落下させたとき、中心 O を通って反対の端に着くまでの時間を求めよ。</p>`,
    meaning: String.raw`
      <p>(2)で「力が距離に比例する復元力」だと分かりました。これは<b>単振動</b>そのもの！ バネにつないだおもりと同じ運動をします。トンネルの端から落とすと、中心を通り越して反対端まで行き、また戻ってくる…という往復運動になります。</p>
      <p>「一端から反対端まで」は、単振動でいえば<b>ちょうど半周期</b>にあたります。</p>
      <div class="term-note"><b>📖 単振動の周期</b><br>
      運動方程式が $m\ddot{x} = -kx$ の形なら角振動数 $\omega = \sqrt{k/m}$、周期 $T = \dfrac{2\pi}{\omega} = 2\pi\sqrt{\dfrac{m}{k}}$。<br>
      端から端まで（片道）は半周期 $\dfrac{T}{2}$ です。</div>`,
    hints: [
      String.raw`(2)より $m\ddot{x} = -\frac{mg}{R}x$。これは $k = \frac{mg}{R}$ の単振動。`,
      String.raw`角振動数 $\omega = \sqrt{k/m} = \sqrt{g/R}$、周期 $T = 2\pi\sqrt{R/g}$。`,
      String.raw`端から端（片道）は半周期。求める時間は $\frac{T}{2} = \pi\sqrt{R/g}$。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>単振動の方程式にする</h5>
        <p>(2)の力を使うと運動方程式は $m\ddot{x} = -\dfrac{mg}{R}x$。両辺 $m$ で割って:</p>
        <div class="math-display">$$\ddot{x} = -\frac{g}{R}x$$</div>
        <p>これは角振動数 $\omega = \sqrt{\dfrac{g}{R}}$ の単振動です。</p>
      </div>
      <div class="sol-step" data-step="2">
        <h5>周期を求める</h5>
        <div class="math-display">$$T = \frac{2\pi}{\omega} = 2\pi\sqrt{\frac{R}{g}}$$</div>
      </div>
      <div class="sol-step" data-step="3">
        <h5>片道は半周期</h5>
        <p>一端から反対端までは振動の半分。求める時間は:</p>
        <div class="math-display">$$\frac{T}{2} = \pi\sqrt{\frac{R}{g}}$$</div>
        <p>面白いことに、この時間は地球すれすれを周回する人工衛星の周期の半分（約42分）と同じになります。</p>
      </div>`,
    answer: String.raw`$\dfrac{T}{2} = \pi\sqrt{\dfrac{R}{g}}$`
  },

  /* ===================== 大問2 楕円軌道への打ち上げ ===================== */
  {
    id: "25-2-1",
    chapter: "大問2",
    number: "(1)",
    title: "距離2Rで静止する初速度 v₀",
    tags: ["エネルギー保存", "万有引力"],
    difficulty: 4,
    formula: String.raw`地点Bで静止する $v_0$`,
    statement: String.raw`
      <p>地上の点 A から鉛直上方へ質量 $m$ の物体を打ち上げる。地球の質量を $M$、地球の半径を $R$、地表での重力加速度の大きさを $g$ とする。<br>地球の中心からの距離が $2R$ の地点 B で、ちょうど静止するために必要な初速度の大きさ $v_0$ を、$M, R, g$ のうち必要な記号を使って表せ。</p>`,
    meaning: String.raw`
      <p>地表（中心から $R$）から真上に打ち上げて、中心から $2R$ の地点でちょうど速度ゼロになる初速を求めます。<b>力学的エネルギー保存</b>を使います。</p>
      <p>打ち上げ時の運動エネルギー＋位置エネルギーが、到達点（静止＝運動エネルギー0）の位置エネルギーに等しい、という式です。万有引力のポテンシャルが $-\dfrac{GMm}{r}$ である点に注意。</p>`,
    hints: [
      String.raw`エネルギー保存：地表($r=R$, 速さ$v_0$) と B点($r=2R$, 速さ0)。$\frac{1}{2}mv_0^2 - \frac{GMm}{R} = 0 - \frac{GMm}{2R}$。`,
      String.raw`整理すると $\frac{1}{2}v_0^2 = \frac{GM}{R} - \frac{GM}{2R} = \frac{GM}{2R}$。`,
      String.raw`$GM = gR^2$ を使えば $M$ が消えて $v_0 = \sqrt{gR}$。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>エネルギー保存を立てる</h5>
        <p>地表（$r=R$、速さ $v_0$）と地点 B（$r=2R$、静止）でエネルギー保存:</p>
        <div class="math-display">$$\frac{1}{2}mv_0^2 - \frac{GMm}{R} = 0 - \frac{GMm}{2R}$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>v₀ について解く</h5>
        <div class="math-display">$$\frac{1}{2}v_0^2 = \frac{GM}{R} - \frac{GM}{2R} = \frac{GM}{2R} \;\Rightarrow\; v_0^2 = \frac{GM}{R}$$</div>
      </div>
      <div class="sol-step" data-step="3">
        <h5>GM = gR² で書き換える</h5>
        <p>問題は $M, R, g$ で表せとのこと。$GM = gR^2$ を使うと:</p>
        <div class="math-display">$$v_0^2 = \frac{gR^2}{R} = gR \;\Rightarrow\; v_0 = \sqrt{gR}$$</div>
      </div>`,
    answer: String.raw`$v_0 = \sqrt{gR}$`
  },
  {
    id: "25-2-2",
    chapter: "大問2",
    number: "(2)",
    title: "水平方向に速さvを与えたときの角運動量 L",
    tags: ["角運動量"],
    difficulty: 2,
    formula: String.raw`角運動量 $L$`,
    statement: String.raw`
      <p>(1) で物体が静止した瞬間に、水平方向に速さ $v$ を与えた。このときの物体の角運動量の大きさ $L$ を求めよ。</p>`,
    meaning: String.raw`
      <p>地点 B（中心から距離 $2R$）で、水平方向に速さ $v$ を与えたときの角運動量を求めます。角運動量は $L = mvr_\perp$ ですが、水平方向の速度は動径（中心への線＝鉛直）と<b>垂直</b>なので、単純に $L = m v \times (\text{距離})$ になります。</p>
      <div class="term-note"><b>📖 角運動量</b><br>
      $$L = m v r_\perp$$
      速度が動径に垂直なとき、$r_\perp$ は中心からの距離そのもの。ここでは距離が $2R$ なので $L = mv(2R)$。「回転の勢い」を表す量で、中心力のもとでは保存します。</div>`,
    hints: [
      String.raw`B点は中心から $2R$。水平方向の速度は動径（鉛直）に垂直。`,
      String.raw`$L = m \times v \times 2R$。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>角運動量を計算する</h5>
        <p>物体は中心から $2R$ の位置にあり、与えた速さ $v$ は動径に垂直（水平）。よって:</p>
        <div class="math-display">$$L = m v \cdot 2R = 2mRv$$</div>
      </div>`,
    answer: String.raw`$L = 2mRv$`
  },
  {
    id: "25-2-3",
    chapter: "大問2",
    number: "(3)",
    title: "面積速度 Ṡ を求める",
    tags: ["面積速度", "角運動量保存", "エネルギー保存"],
    difficulty: 5,
    formula: String.raw`面積速度 $\dot{S} = \frac{1}{2m}L$`,
    statement: String.raw`
      <p>(2) のとき、物体は地球の中心に最も近い距離が $2R$、最も遠い距離が $4R$ の楕円軌道を描くようになった。このときの物体の面積速度 $\dot{S} = \dfrac{1}{2m}L$ を、$M, R, g$ のうち必要な記号を使って表せ。</p>`,
    meaning: String.raw`
      <p>面積速度とは「単位時間に動径が掃く面積」で、$\dot{S} = \dfrac{L}{2m}$ と角運動量で書けます（ケプラーの第二法則で一定）。$L = 2mRv$ を入れると $\dot{S} = Rv$ になりますが、$v$ が残ってしまいます。</p>
      <p>そこで「最近 $2R$・最遠 $4R$ の楕円になる」という条件から $v$ を決めます。近地点と遠地点で<b>角運動量保存</b>と<b>エネルギー保存</b>を連立させるのが核心です。</p>`,
    hints: [
      String.raw`$\dot{S} = \frac{L}{2m} = \frac{2mRv}{2m} = Rv$。あとは $v$ を決めればよい。`,
      String.raw`近地点$2R$(速さ$v$)と遠地点$4R$(速さ$v_a$)で角運動量保存：$mv(2R) = mv_a(4R)$ → $v_a = v/2$。`,
      String.raw`エネルギー保存で $v$ を求める：$\frac{1}{2}v^2 - \frac{GM}{2R} = \frac{1}{2}v_a^2 - \frac{GM}{4R}$。$GM=gR^2$ を使い $v^2 = \frac{2gR}{3}$。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>面積速度を L で書く</h5>
        <p>$\dot{S} = \dfrac{L}{2m}$、(2)の $L = 2mRv$ より:</p>
        <div class="math-display">$$\dot{S} = \frac{2mRv}{2m} = Rv$$</div>
        <p>あとは $v$ を軌道条件から決めます。</p>
      </div>
      <div class="sol-step" data-step="2">
        <h5>角運動量保存で遠地点の速さを出す</h5>
        <p>近地点（$2R$, 速さ $v$）と遠地点（$4R$, 速さ $v_a$）で角運動量保存:</p>
        <div class="math-display">$$mv(2R) = mv_a(4R) \;\Rightarrow\; v_a = \frac{v}{2}$$</div>
      </div>
      <div class="sol-step" data-step="3">
        <h5>エネルギー保存で v を決める</h5>
        <div class="math-display">$$\frac{1}{2}v^2 - \frac{GM}{2R} = \frac{1}{2}\left(\frac{v}{2}\right)^2 - \frac{GM}{4R}$$</div>
        <p>整理すると $\dfrac{3}{8}v^2 = \dfrac{GM}{4R}$、つまり $v^2 = \dfrac{2GM}{3R}$。$GM=gR^2$ より $v^2 = \dfrac{2gR}{3}$:</p>
        <div class="math-display">$$v = \sqrt{\frac{2gR}{3}}$$</div>
      </div>
      <div class="sol-step" data-step="4">
        <h5>面積速度を仕上げる</h5>
        <div class="math-display">$$\dot{S} = Rv = R\sqrt{\frac{2gR}{3}} = \sqrt{\frac{2gR^3}{3}}$$</div>
      </div>`,
    answer: String.raw`$\dot{S} = R\sqrt{\dfrac{2gR}{3}} = \sqrt{\dfrac{2gR^3}{3}}$`
  },
  {
    id: "25-2-4",
    chapter: "大問2",
    number: "(4)",
    title: "楕円運動の周期 T",
    tags: ["面積速度", "周期", "ケプラー"],
    difficulty: 4,
    formula: String.raw`楕円運動の周期 $T$`,
    statement: String.raw`
      <p>(3) の結果から、物体の楕円運動の周期 $T$ を求めよ。</p>`,
    meaning: String.raw`
      <p>面積速度が一定なので、「楕円の全面積 ÷ 面積速度 = 1周の時間（周期）」で求められます。楕円の面積は $\pi a b$（長半径 $a$ × 短半径 $b$ × $\pi$）。</p>
      <p>近地点 $2R$・遠地点 $4R$ から楕円の $a$ と $b$ を求めるのがポイントです。</p>
      <div class="term-note"><b>📖 面積速度と周期</b><br>
      $$T = \frac{\text{楕円の面積}}{\dot{S}} = \frac{\pi a b}{\dot{S}}$$
      長軸 $2a = $ 近地点＋遠地点 $= 2R + 4R = 6R$ なので $a = 3R$。短半径は $b = \sqrt{r_{\min}r_{\max}} = \sqrt{2R\cdot 4R}$ の関係で求まります。</div>`,
    hints: [
      String.raw`長軸 $2a = 2R+4R = 6R$ → $a = 3R$。短半径は $b = \sqrt{r_{\min}r_{\max}} = \sqrt{2R\cdot4R} = 2\sqrt2 R$。`,
      String.raw`楕円面積 $= \pi ab = \pi\cdot3R\cdot2\sqrt2 R = 6\sqrt2\pi R^2$。`,
      String.raw`$T = \frac{\pi ab}{\dot S}$ に (3) の $\dot S$ を代入。ケプラー第三法則 $T = 2\pi\sqrt{a^3/GM}$ でも検算できる。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>楕円の a, b を求める</h5>
        <p>長軸 $2a = 2R + 4R = 6R$ より $a = 3R$。短半径は $b^2 = r_{\min}r_{\max} = 2R\cdot4R = 8R^2$ より $b = 2\sqrt2\,R$。</p>
      </div>
      <div class="sol-step" data-step="2">
        <h5>楕円の面積</h5>
        <div class="math-display">$$\pi ab = \pi\cdot 3R\cdot 2\sqrt2\,R = 6\sqrt2\,\pi R^2$$</div>
      </div>
      <div class="sol-step" data-step="3">
        <h5>面積速度で割って周期を出す</h5>
        <p>(3)の $\dot S = R\sqrt{\dfrac{2gR}{3}}$ を使うと:</p>
        <div class="math-display">$$T = \frac{6\sqrt2\,\pi R^2}{R\sqrt{\frac{2gR}{3}}} = 6\sqrt3\,\pi\sqrt{\frac{R}{g}}$$</div>
        <p>途中で $\dfrac{\sqrt2}{\sqrt{2/3}} = \sqrt3$ を使いました。</p>
      </div>
      <div class="warn-box">🌍 <b>ケプラー第三法則で検算:</b> $T = 2\pi\sqrt{\dfrac{a^3}{GM}} = 2\pi\sqrt{\dfrac{27R^3}{gR^2}} = 2\pi\cdot3\sqrt3\sqrt{\dfrac{R}{g}} = 6\sqrt3\,\pi\sqrt{\dfrac{R}{g}}$ ✓ ぴったり一致！</div>`,
    answer: String.raw`$T = 6\sqrt{3}\,\pi\sqrt{\dfrac{R}{g}}$`
  },

  /* ===================== 大問3 減衰振動 ===================== */
  {
    id: "25-3-1",
    chapter: "大問3",
    number: "(1)",
    title: "減衰振動の運動方程式",
    tags: ["減衰振動", "運動方程式"],
    difficulty: 2,
    formula: String.raw`復元力 $-kx$ + 抵抗 $-2mRv$`,
    statement: String.raw`
      <p>質量 $m$ の質点に、変位 $x$ に比例する復元力 $-kx$、速度 $v\left(=\dfrac{dx}{dt}\right)$ に比例する抵抗力 $-2mRv$ が働いている。ここで、$k, R$ は正の定数で、$\dfrac{k}{m} > R^2$ のとき、以下の問いに答えよ。<br><b>質点の運動に対する運動方程式を書け。</b></p>`,
    meaning: String.raw`
      <p>バネの復元力に加えて、空気抵抗のような「速度に比例するブレーキ」が働く運動です。これを<b>減衰振動</b>と呼びます。揺れながら少しずつ振幅が小さくなっていく運動（実際の振り子やバネはこれ）です。</p>
      <p>運動方程式は $ma = F$。力は「復元力 $-kx$」＋「抵抗力 $-2mRv$」の2つを足すだけです。</p>`,
    hints: [
      String.raw`力は復元力 $-kx$ と抵抗力 $-2mRv = -2mR\dot x$ の2つ。`,
      String.raw`$m\ddot x = -kx - 2mR\dot x$。整理して $\ddot x + 2R\dot x + \frac{k}{m}x = 0$ の形にしてもよい。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>力を足し合わせる</h5>
        <p>復元力 $-kx$ と抵抗力 $-2mR\dot{x}$ の合計が $m\ddot{x}$:</p>
        <div class="math-display">$$m\frac{d^2x}{dt^2} = -kx - 2mR\frac{dx}{dt}$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>標準形に整える</h5>
        <p>両辺を $m$ で割って移項:</p>
        <div class="math-display">$$\frac{d^2x}{dt^2} + 2R\frac{dx}{dt} + \frac{k}{m}x = 0$$</div>
      </div>`,
    answer: String.raw`$m\ddot{x} = -kx - 2mR\dot{x}\quad\left(\ddot{x} + 2R\dot{x} + \dfrac{k}{m}x = 0\right)$`
  },
  {
    id: "25-3-2",
    chapter: "大問3",
    number: "(2)",
    title: "特性方程式（λの満たす式）",
    tags: ["減衰振動", "特性方程式"],
    difficulty: 3,
    formula: String.raw`$x = Ae^{\lambda t}$ を代入`,
    statement: String.raw`
      <p>(1) の方程式に $x = Ae^{\lambda t}$ を代入して、定数 $\lambda$ の満たす方程式を求めよ。ただし $A$ は定数である。</p>`,
    meaning: String.raw`
      <p>定数係数の線形微分方程式を解く定石です。「解はきっと指数関数 $e^{\lambda t}$ の形だろう」と仮定して代入すると、微分方程式が $\lambda$ についての<b>ただの2次方程式（特性方程式）</b>に化けます。</p>
      <div class="term-note"><b>📖 特性方程式</b><br>
      $x = Ae^{\lambda t}$ を代入すると、微分するたびに $\lambda$ が1つずつ降りてきます（$\dot x = \lambda Ae^{\lambda t}$、$\ddot x = \lambda^2 Ae^{\lambda t}$）。全体を $Ae^{\lambda t}$ で割ると $\lambda$ の代数方程式になります。</div>`,
    hints: [
      String.raw`$\dot x = \lambda Ae^{\lambda t}$、$\ddot x = \lambda^2 Ae^{\lambda t}$ を (1) に代入。`,
      String.raw`共通因子 $Ae^{\lambda t}$（$\neq 0$）で割ると $\lambda$ の2次方程式が残る。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>微分を代入する</h5>
        <p>$x = Ae^{\lambda t}$ なら $\dot x = \lambda Ae^{\lambda t}$、$\ddot x = \lambda^2 Ae^{\lambda t}$。方程式 $\ddot x + 2R\dot x + \dfrac{k}{m}x = 0$ に入れると:</p>
        <div class="math-display">$$\left(\lambda^2 + 2R\lambda + \frac{k}{m}\right)Ae^{\lambda t} = 0$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>共通因子で割る</h5>
        <p>$Ae^{\lambda t} \neq 0$ なので括弧の中身が0:</p>
        <div class="math-display">$$\lambda^2 + 2R\lambda + \frac{k}{m} = 0$$</div>
      </div>`,
    answer: String.raw`$\lambda^2 + 2R\lambda + \dfrac{k}{m} = 0$`
  },
  {
    id: "25-3-3",
    chapter: "大問3",
    number: "(3)",
    title: "振動の角振動数 ω",
    tags: ["減衰振動", "複素数解"],
    difficulty: 3,
    formula: String.raw`$x = Ce^{-Rt}\sin(\omega t + \delta)$ の $\omega$`,
    statement: String.raw`
      <p>(1) の運動方程式の解を $x(t) = Ce^{-Rt}\sin(\omega t + \delta)$ の形（$C, \delta$ は任意定数）に書くときの定数 $\omega$ を求めよ。</p>`,
    meaning: String.raw`
      <p>(2)の特性方程式を解きます。条件 $\dfrac{k}{m} > R^2$ のおかげで、$\lambda$ は<b>複素数</b>になります。複素数解は「$e^{-Rt}$（減衰）× 三角関数（振動）」に翻訳できて、これが減衰振動の正体です。求める $\omega$ は複素数解の虚部にあたります。</p>
      <div class="term-note"><b>📖 複素数解 → 減衰振動</b><br>
      特性方程式の解が $\lambda = -R \pm i\omega$ の形なら、一般解は
      $$x = e^{-Rt}(C_1\cos\omega t + C_2\sin\omega t) = Ce^{-Rt}\sin(\omega t + \delta)$$
      実部 $-R$ が「減衰の速さ」、虚部 $\omega$ が「振動の速さ」を決めます。</div>`,
    hints: [
      String.raw`解の公式：$\lambda = \frac{-2R \pm\sqrt{4R^2 - 4k/m}}{2} = -R \pm\sqrt{R^2 - \frac{k}{m}}$。`,
      String.raw`$\frac{k}{m} > R^2$ なのでルートの中は負。$\sqrt{R^2 - \frac{k}{m}} = i\sqrt{\frac{k}{m} - R^2}$（虚数）。`,
      String.raw`虚部が角振動数 $\omega = \sqrt{\frac{k}{m} - R^2}$。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>特性方程式を解く</h5>
        <p>(2)の $\lambda^2 + 2R\lambda + \dfrac{k}{m} = 0$ を解の公式で:</p>
        <div class="math-display">$$\lambda = \frac{-2R \pm \sqrt{4R^2 - 4\frac{k}{m}}}{2} = -R \pm \sqrt{R^2 - \frac{k}{m}}$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>複素数解にする</h5>
        <p>条件 $\dfrac{k}{m} > R^2$ よりルート内は負。虚数単位 $i$ を使って:</p>
        <div class="math-display">$$\lambda = -R \pm i\sqrt{\frac{k}{m} - R^2}$$</div>
      </div>
      <div class="sol-step" data-step="3">
        <h5>ω を読み取る</h5>
        <p>解 $x = Ce^{-Rt}\sin(\omega t+\delta)$ の「減衰 $e^{-Rt}$」は実部 $-R$、「振動 $\omega$」は虚部に対応:</p>
        <div class="math-display">$$\omega = \sqrt{\frac{k}{m} - R^2}$$</div>
      </div>`,
    answer: String.raw`$\omega = \sqrt{\dfrac{k}{m} - R^2}$`
  },
  {
    id: "25-3-4",
    chapter: "大問3",
    number: "(4)",
    title: "初期条件で C, δ を決める",
    tags: ["減衰振動", "初期条件"],
    difficulty: 4,
    formula: String.raw`$x(0)=x_0,\ v(0)=0$ での $C, \delta$`,
    statement: String.raw`
      <p>初期条件が $x(0) = x_0$、$v(0) = 0$ のとき、(3) の $C, \delta$ を求めよ。</p>`,
    meaning: String.raw`
      <p>「最初 $t=0$ で位置 $x_0$、速度0（引っ張って手を離す）」という条件から、解に含まれる定数 $C$（振幅）と $\delta$（位相）を確定させます。位置の式と、それを微分した速度の式に $t=0$ を代入して連立します。</p>`,
    hints: [
      String.raw`$x(0) = C\sin\delta = x_0$。速度 $v = C e^{-Rt}[-R\sin(\omega t+\delta) + \omega\cos(\omega t+\delta)]$。`,
      String.raw`$v(0) = C[-R\sin\delta + \omega\cos\delta] = 0$ → $\tan\delta = \frac{\omega}{R}$。`,
      String.raw`$\tan\delta = \omega/R$ から $\sin\delta = \frac{\omega}{\sqrt{\omega^2+R^2}}$。$\omega^2 + R^2 = \frac{k}{m}$ に注意して $C = \frac{x_0}{\sin\delta}$。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>位置の条件</h5>
        <p>$x(0) = Ce^{0}\sin\delta = C\sin\delta = x_0$。</p>
      </div>
      <div class="sol-step" data-step="2">
        <h5>速度の条件</h5>
        <p>速度は $v = \dot x = Ce^{-Rt}\big[-R\sin(\omega t+\delta) + \omega\cos(\omega t+\delta)\big]$。$t=0$ で:</p>
        <div class="math-display">$$v(0) = C(-R\sin\delta + \omega\cos\delta) = 0 \;\Rightarrow\; \tan\delta = \frac{\omega}{R}$$</div>
      </div>
      <div class="sol-step" data-step="3">
        <h5>C を求める</h5>
        <p>$\tan\delta = \dfrac{\omega}{R}$ より $\sin\delta = \dfrac{\omega}{\sqrt{\omega^2 + R^2}}$。ここで $\omega^2 + R^2 = \dfrac{k}{m}$（(3)より）なので $\sin\delta = \dfrac{\omega}{\sqrt{k/m}}$。よって:</p>
        <div class="math-display">$$C = \frac{x_0}{\sin\delta} = \frac{x_0\sqrt{k/m}}{\omega} = x_0\sqrt{\frac{k}{k - mR^2}}$$</div>
      </div>`,
    answer: String.raw`$\delta = \arctan\dfrac{\omega}{R},\quad C = \dfrac{x_0\sqrt{k/m}}{\omega}$（$\omega=\sqrt{k/m-R^2}$）`
  },
  {
    id: "25-3-5",
    chapter: "大問3",
    number: "(5)",
    title: "速度を v=Be⁻ᴿᵗsin(ωt) と表す",
    tags: ["減衰振動", "速度"],
    difficulty: 5,
    formula: String.raw`$v(t) = Be^{-Rt}\sin(\omega t)$ の $B$`,
    statement: String.raw`
      <p>(4) で質点の速度を $v(t) = Be^{-Rt}\sin(\omega t)$ と表したときの定数 $B$ を求めよ。</p>`,
    meaning: String.raw`
      <p>速度の式を微分・展開すると一般には $\sin$ と $\cos$ の両方が出ますが、(4)の初期条件 $v(0)=0$ のおかげで $\cos\omega t$ の項がきれいに消え、$\sin\omega t$ だけの形になります。その係数 $B$ を求めます。</p>
      <div class="term-note"><b>📖 なぜ sin だけになるか</b><br>
      速度の一般形は $v = Ce^{-Rt}[(\cdots)\sin\omega t + (\cdots)\cos\omega t]$。$\cos\omega t$ の係数はちょうど「$v(0)=0$ の条件」に一致するのでゼロになります。残った $\sin\omega t$ の係数が $B$ です。</div>`,
    hints: [
      String.raw`$v = Ce^{-Rt}[-R\sin(\omega t+\delta) + \omega\cos(\omega t+\delta)]$ を加法定理で $\sin\omega t, \cos\omega t$ に展開。`,
      String.raw`$\cos\omega t$ の係数は $C(-R\sin\delta + \omega\cos\delta) = 0$（v(0)=0の条件）で消える。`,
      String.raw`$\sin\omega t$ の係数が $B = -C(R\cos\delta + \omega\sin\delta)$。$\cos\delta = R/\sqrt{k/m}$、$\sin\delta = \omega/\sqrt{k/m}$ を代入すると簡単になる。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>速度を展開する</h5>
        <p>$v = Ce^{-Rt}[-R\sin(\omega t+\delta) + \omega\cos(\omega t+\delta)]$ を加法定理で開くと、$\sin\omega t$ と $\cos\omega t$ の係数はそれぞれ:</p>
        <div class="math-display">$$\cos\omega t\text{ の係数}: C(-R\sin\delta + \omega\cos\delta),\qquad \sin\omega t\text{ の係数}: -C(R\cos\delta + \omega\sin\delta)$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>cos項が消えることを確認</h5>
        <p>$\cos\omega t$ の係数 $C(-R\sin\delta + \omega\cos\delta)$ は、まさに (4) の $v(0)=0$ の条件でゼロ。だから $v = Be^{-Rt}\sin\omega t$ の形になります。</p>
      </div>
      <div class="sol-step" data-step="3">
        <h5>B を計算する</h5>
        <p>$B = -C(R\cos\delta + \omega\sin\delta)$。$\cos\delta = \dfrac{R}{\sqrt{k/m}}$、$\sin\delta = \dfrac{\omega}{\sqrt{k/m}}$ を代入すると:</p>
        <div class="math-display">$$R\cos\delta + \omega\sin\delta = \frac{R^2 + \omega^2}{\sqrt{k/m}} = \frac{k/m}{\sqrt{k/m}} = \sqrt{\frac{k}{m}}$$</div>
        <p>よって $B = -C\sqrt{\dfrac{k}{m}}$。(4)の $C = \dfrac{x_0\sqrt{k/m}}{\omega}$ を入れて:</p>
        <div class="math-display">$$B = -\frac{x_0\sqrt{k/m}}{\omega}\cdot\sqrt{\frac{k}{m}} = -\frac{x_0\,k}{m\omega}$$</div>
      </div>
      <div class="warn-box">🔎 <b>符号の意味:</b> $B<0$。$x_0>0$ から静かに手を離すと、質点はまず負の向き（原点へ戻る向き）に動き出すので、速度が負から始まるのは自然です。</div>`,
    answer: String.raw`$B = -\dfrac{x_0\,k}{m\omega} = -\dfrac{x_0 k}{m\sqrt{k/m - R^2}}$`
  },

  /* ===================== 大問4 2次元弾性衝突 ===================== */
  {
    id: "25-4-1",
    chapter: "大問4",
    number: "(1)",
    title: "運動量保存（x成分）",
    tags: ["運動量保存", "2次元衝突"],
    difficulty: 2,
    formula: String.raw`x方向の運動量保存`,
    statement: String.raw`
      <p>質量 $m$、速さ $v$ の粒子 A が、質量 $3m$ の静止した粒子 B に弾性衝突した。衝突後、粒子 B は粒子 A の入射方向（$x$ 軸方向）から角度 $\varphi = 45°$ の方向に飛んだ。粒子 A の散乱角を $\theta$、衝突後の粒子 A, B の速さをそれぞれ $u_A, u_B$ とする。<br><b>運動量保存則の式の $x$ 成分を書け。</b></p>`,
    meaning: String.raw`
      <p>2次元（平面内）の衝突です。衝突後、A と B は入射方向（$x$ 軸）に対してそれぞれ上下に角度をつけて飛び散ります。運動量はベクトルなので、$x$ 方向と $y$ 方向に分けて保存則を書きます。ここでは<b>$x$ 成分</b>です。</p>
      <div class="term-note"><b>📖 運動量の x 成分</b><br>
      速さ $u$ で $x$ 軸から角度 $\alpha$ に飛ぶ粒子の運動量 $x$ 成分は $mu\cos\alpha$。衝突前は A だけが $x$ 方向に $mv$ を持ち、B は静止。衝突後は A（角度 $\theta$）と B（角度 $\varphi$）の $x$ 成分を足します。</div>`,
    hints: [
      String.raw`衝突前の x 運動量：A が $mv$、B は 0。`,
      String.raw`衝突後の x 運動量：A が $mu_A\cos\theta$、B が $3m u_B\cos\varphi$。これらが等しい。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>衝突前後の x 成分を書く</h5>
        <p>衝突前：A の $x$ 運動量 $mv$、B は静止で 0。衝突後：A は角度 $\theta$ で $mu_A\cos\theta$、B は角度 $\varphi$ で $3mu_B\cos\varphi$。保存則:</p>
        <div class="math-display">$$mv = mu_A\cos\theta + 3mu_B\cos\varphi$$</div>
        <p>$\varphi = 45°$ を入れると $mv = mu_A\cos\theta + 3mu_B\cos45°$。</p>
      </div>`,
    answer: String.raw`$mv = mu_A\cos\theta + 3mu_B\cos\varphi\quad(\varphi = 45°)$`
  },
  {
    id: "25-4-2",
    chapter: "大問4",
    number: "(2)",
    title: "運動量保存（y成分）",
    tags: ["運動量保存", "2次元衝突"],
    difficulty: 2,
    formula: String.raw`y方向の運動量保存`,
    statement: String.raw`
      <p>（問4の設定で）<b>運動量保存則の式の $y$ 成分を書け。</b></p>`,
    meaning: String.raw`
      <p>今度は $y$ 方向（入射方向に垂直な方向）の運動量保存です。衝突前は誰も $y$ 方向に動いていない（$y$ 運動量ゼロ）。衝突後、A と B は $x$ 軸をはさんで<b>反対側</b>に飛ぶので、$y$ 成分は逆符号になり、足すとゼロになります。</p>`,
    hints: [
      String.raw`衝突前の y 運動量は 0（全員 x 方向）。`,
      String.raw`衝突後：A は上側 $+mu_A\sin\theta$、B は下側 $-3mu_B\sin\varphi$（逆向き）。合計が 0。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>y 成分の保存則</h5>
        <p>衝突前の $y$ 運動量は0。衝突後、A と B は $x$ 軸の反対側に飛ぶので符号が逆:</p>
        <div class="math-display">$$0 = mu_A\sin\theta - 3mu_B\sin\varphi$$</div>
        <p>$\varphi=45°$ なら $0 = mu_A\sin\theta - 3mu_B\sin45°$。</p>
      </div>`,
    answer: String.raw`$0 = mu_A\sin\theta - 3mu_B\sin\varphi\quad(\varphi = 45°)$`
  },
  {
    id: "25-4-3",
    chapter: "大問4",
    number: "(3)",
    title: "力学的エネルギー保存（弾性衝突）",
    tags: ["エネルギー保存", "弾性衝突"],
    difficulty: 2,
    formula: String.raw`運動エネルギーの保存`,
    statement: String.raw`
      <p>（問4の設定で）<b>力学的エネルギー保存則の式を書け。</b></p>`,
    meaning: String.raw`
      <p>「弾性衝突」＝運動エネルギーが保存される衝突です。衝突の前後で「$\frac{1}{2}mv^2$ の合計」が変わらない、という式を書きます。位置エネルギーは関係ない（同じ高さ）ので、運動エネルギーだけを比べます。</p>`,
    hints: [
      String.raw`衝突前の運動エネルギー：A が $\frac{1}{2}mv^2$、B は 0。`,
      String.raw`衝突後：A が $\frac{1}{2}mu_A^2$、B が $\frac{1}{2}(3m)u_B^2$。前後で等しい。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>弾性衝突のエネルギー保存</h5>
        <p>衝突前は A のみ運動エネルギーを持ち、衝突後は A と B が分け合う:</p>
        <div class="math-display">$$\frac{1}{2}mv^2 = \frac{1}{2}mu_A^2 + \frac{1}{2}(3m)u_B^2$$</div>
        <p>両辺 $\dfrac{m}{2}$ で割ると $v^2 = u_A^2 + 3u_B^2$。</p>
      </div>`,
    answer: String.raw`$\dfrac{1}{2}mv^2 = \dfrac{1}{2}mu_A^2 + \dfrac{1}{2}(3m)u_B^2\quad(v^2 = u_A^2 + 3u_B^2)$`
  },
  {
    id: "25-4-4",
    chapter: "大問4",
    number: "(4)",
    title: "tanθ, u_A, u_B を求める",
    tags: ["連立方程式", "2次元衝突"],
    difficulty: 5,
    formula: String.raw`$\tan\theta,\ u_A,\ u_B$`,
    statement: String.raw`
      <p>（問4の設定で）$\tan\theta,\ u_A,\ u_B$ を求めよ。</p>`,
    meaning: String.raw`
      <p>(1)(2)(3)で立てた3つの式を連立して、3つの未知数 $\theta, u_A, u_B$ を求めます。$\varphi = 45°$（$\cos45° = \sin45° = \frac{1}{\sqrt2}$）を使い、うまく文字を消していくのがポイントです。</p>
      <div class="term-note"><b>📖 解き方の方針</b><br>
      $x$ 式と $y$ 式から $u_A\cos\theta$ と $u_A\sin\theta$ を作り、2乗して足すと $u_A^2$ が出ます（$\cos^2+\sin^2=1$）。これをエネルギー式と組み合わせると $u_B$ が、続いて $u_A$ が、最後に $\tan\theta = \frac{u_A\sin\theta}{u_A\cos\theta}$ が求まります。</div>`,
    hints: [
      String.raw`$\varphi=45°$ を代入：x式 $u_A\cos\theta = v - \frac{3u_B}{\sqrt2}$、y式 $u_A\sin\theta = \frac{3u_B}{\sqrt2}$。`,
      String.raw`2式を2乗して足すと $u_A^2 = v^2 - \frac{6}{\sqrt2}vu_B + 9u_B^2$。エネルギー式 $u_A^2 = v^2 - 3u_B^2$ と等置。`,
      String.raw`$u_B$ が出たら $u_A$、そして $\tan\theta = \frac{u_A\sin\theta}{u_A\cos\theta} = \frac{3u_B/\sqrt2}{v - 3u_B/\sqrt2}$。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>φ=45° を入れて式を整理</h5>
        <p>$\cos45°=\sin45°=\dfrac{1}{\sqrt2}$。(1)(2)より:</p>
        <div class="math-display">$$u_A\cos\theta = v - \frac{3u_B}{\sqrt2}\quad\text{(i)},\qquad u_A\sin\theta = \frac{3u_B}{\sqrt2}\quad\text{(ii)}$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>2乗和で u_A² を作り、エネルギー式と比較</h5>
        <p>(i)²+(ii)²：$u_A^2 = \left(v - \dfrac{3u_B}{\sqrt2}\right)^2 + \left(\dfrac{3u_B}{\sqrt2}\right)^2 = v^2 - \dfrac{6}{\sqrt2}vu_B + 9u_B^2$。</p>
        <p>これを(3)の $u_A^2 = v^2 - 3u_B^2$ と等置:</p>
        <div class="math-display">$$v^2 - 3u_B^2 = v^2 - \frac{6}{\sqrt2}vu_B + 9u_B^2 \;\Rightarrow\; \frac{6}{\sqrt2}vu_B = 12u_B^2$$</div>
      </div>
      <div class="sol-step" data-step="3">
        <h5>u_B と u_A を求める</h5>
        <p>$u_B\neq0$ で割ると $\dfrac{6}{\sqrt2}v = 12u_B$、よって $u_B = \dfrac{v}{2\sqrt2} = \dfrac{\sqrt2}{4}v$。</p>
        <p>$u_A^2 = v^2 - 3u_B^2 = v^2 - 3\cdot\dfrac{v^2}{8} = \dfrac{5}{8}v^2$、よって $u_A = \dfrac{\sqrt{10}}{4}v$。</p>
      </div>
      <div class="sol-step" data-step="4">
        <h5>tanθ を求める</h5>
        <p>$\dfrac{3u_B}{\sqrt2} = \dfrac{3}{\sqrt2}\cdot\dfrac{v}{2\sqrt2} = \dfrac{3v}{4}$。よって (ii) より $u_A\sin\theta = \dfrac{3v}{4}$、(i) より $u_A\cos\theta = v - \dfrac{3v}{4} = \dfrac{v}{4}$:</p>
        <div class="math-display">$$\tan\theta = \frac{u_A\sin\theta}{u_A\cos\theta} = \frac{3v/4}{v/4} = 3$$</div>
      </div>`,
    answer: String.raw`$\tan\theta = 3,\quad u_A = \dfrac{\sqrt{10}}{4}v,\quad u_B = \dfrac{\sqrt{2}}{4}v$`
  },

  /* ===================== 大問5 棒と糸（剛体のつりあい） ===================== */
  {
    id: "25-5-1",
    chapter: "大問5",
    number: "(1)",
    title: "棒と糸：水平・鉛直方向のつりあい",
    tags: ["剛体", "力のつりあい"],
    difficulty: 3,
    formula: String.raw`水平・鉛直の力のつりあい`,
    statement: String.raw`
      <p>質量 $m$、長さ $l$ の一様な棒が、その一端にとりつけられた糸によって天井からつるされている。この棒の下端に水平方向の力 $F$ を加えたところ、図のような状態で静止した。糸の引く力を $f$、重力加速度の大きさを $g$ とする。糸が鉛直となす角を $\theta$、棒が鉛直となす角を $\varphi$ とする。<br><b>水平、および鉛直方向の力のつりあいの式を立てよ。</b></p>`,
    meaning: String.raw`
      <p>棒の上端を糸でつるし、下端を水平に力 $F$ で引いた状態のつりあいです。棒に働く力は3つ:<br>
      ・糸の張力 $f$（糸に沿った向き、鉛直から角度 $\theta$）<br>
      ・重力 $mg$（棒の中心、真下）<br>
      ・水平力 $F$（下端、水平）</p>
      <p>張力を水平・鉛直成分に分けて、それぞれの方向でつりあいを書きます。</p>
      <div class="term-note"><b>📖 張力の成分分解</b><br>
      糸が鉛直から角度 $\theta$ 傾いているとき、張力 $f$ の鉛直成分は $f\cos\theta$、水平成分は $f\sin\theta$。<br>
      鉛直方向：張力の鉛直成分が重力を支える。水平方向：張力の水平成分が $F$ とつり合う。</div>`,
    hints: [
      String.raw`張力 $f$ を分解：鉛直成分 $f\cos\theta$、水平成分 $f\sin\theta$。`,
      String.raw`鉛直：$f\cos\theta = mg$（張力の縦が重力を支える）。`,
      String.raw`水平：$f\sin\theta = F$（張力の横が水平力とつり合う）。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>鉛直方向のつりあい</h5>
        <p>上向きは張力の鉛直成分 $f\cos\theta$、下向きは重力 $mg$:</p>
        <div class="math-display">$$f\cos\theta = mg$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>水平方向のつりあい</h5>
        <p>張力の水平成分 $f\sin\theta$ と、加えた水平力 $F$ がつり合う:</p>
        <div class="math-display">$$f\sin\theta = F$$</div>
      </div>`,
    answer: String.raw`鉛直：$f\cos\theta = mg$ ／ 水平：$f\sin\theta = F$`
  },
  {
    id: "25-5-2",
    chapter: "大問5",
    number: "(2)",
    title: "棒と糸：点Pまわりのモーメント",
    tags: ["剛体", "力のモーメント"],
    difficulty: 4,
    formula: String.raw`点P（上端）まわりのモーメント`,
    statement: String.raw`
      <p>（問5の設定で）<b>点 P のまわりの力のモーメントのつりあいの式を立てよ。</b>（点 P は糸と棒の接続点＝棒の上端）</p>`,
    meaning: String.raw`
      <p>点 P（棒の上端、糸との接続点）を回転中心にしてモーメントのつりあいを考えます。P で働く張力 $f$ は腕がゼロなので消え、効くのは<b>重力 $mg$</b> と<b>水平力 $F$</b> の2つだけになります。</p>
      <div class="term-note"><b>📖 傾いた棒でのモーメントの腕</b><br>
      棒が鉛直から $\varphi$ 傾いているとき、P から距離 $d$ の点にある力の腕は:<br>
      ・鉛直な力（重力）→ 腕は水平距離 $d\sin\varphi$<br>
      ・水平な力（$F$）→ 腕は鉛直距離 $d\cos\varphi$<br>
      重力は中心（$d=l/2$）、$F$ は下端（$d=l$）に働きます。</div>`,
    hints: [
      String.raw`P を中心にすると張力 $f$ はモーメント0。効くのは重力 $mg$（中心、Pから$l/2$）と $F$（下端、Pから$l$）。`,
      String.raw`重力の腕は水平距離 $\frac{l}{2}\sin\varphi$、$F$ の腕は鉛直距離 $l\cos\varphi$。`,
      String.raw`重力が棒を回す向きと $F$ が回す向きは逆。$mg\cdot\frac{l}{2}\sin\varphi = F\cdot l\cos\varphi$。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>効く力を選ぶ</h5>
        <p>点 P を回転中心にとると、そこに作用する張力 $f$ は腕ゼロで消える。効くのは重力 $mg$ と水平力 $F$。</p>
      </div>
      <div class="sol-step" data-step="2">
        <h5>各モーメントを書く</h5>
        <p>重力 $mg$（中心、P から $l/2$、鉛直下向き）の腕は水平距離 $\dfrac{l}{2}\sin\varphi$。<br>
        水平力 $F$（下端、P から $l$）の腕は鉛直距離 $l\cos\varphi$。両者は逆回りでつり合う:</p>
        <div class="math-display">$$mg\cdot\frac{l}{2}\sin\varphi = F\cdot l\cos\varphi$$</div>
      </div>`,
    answer: String.raw`$mg\cdot\dfrac{l}{2}\sin\varphi = F\,l\cos\varphi$`
  },
  {
    id: "25-5-3",
    chapter: "大問5",
    number: "(3)",
    title: "tanφ を tanθ で表す",
    tags: ["剛体", "三角比"],
    difficulty: 3,
    formula: String.raw`$\tan\varphi$ を $\tan\theta$ で`,
    statement: String.raw`
      <p>（問5の設定で）$\tan\varphi$ を $\tan\theta$ で表せ。</p>`,
    meaning: String.raw`
      <p>(1)と(2)で得た式を組み合わせて、棒の傾き $\varphi$ と糸の傾き $\theta$ の関係を導きます。(1)から $\dfrac{F}{mg}$ が $\tan\theta$ で書け、(2)から $\dfrac{F}{mg}$ が $\tan\varphi$ で書けるので、2つを結びつけます。</p>`,
    hints: [
      String.raw`(1)の2式を割ると $\frac{F}{mg} = \frac{f\sin\theta}{f\cos\theta} = \tan\theta$。`,
      String.raw`(2)を整理すると $\frac{mg}{2}\sin\varphi = F\cos\varphi$ → $\tan\varphi = \frac{2F}{mg}$。`,
      String.raw`$\frac{F}{mg} = \tan\theta$ を代入すると $\tan\varphi = 2\tan\theta$。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>(1)から F/mg を作る</h5>
        <p>(1)の水平式 $\div$ 鉛直式:</p>
        <div class="math-display">$$\frac{f\sin\theta}{f\cos\theta} = \frac{F}{mg} \;\Rightarrow\; \tan\theta = \frac{F}{mg}$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>(2)を整理する</h5>
        <p>(2)の両辺を $l$ で割ると $\dfrac{mg}{2}\sin\varphi = F\cos\varphi$、よって:</p>
        <div class="math-display">$$\tan\varphi = \frac{2F}{mg}$$</div>
      </div>
      <div class="sol-step" data-step="3">
        <h5>結びつける</h5>
        <p>$\dfrac{F}{mg} = \tan\theta$ を代入:</p>
        <div class="math-display">$$\tan\varphi = 2\tan\theta$$</div>
        <p>棒は糸の2倍傾く、という関係です。</p>
      </div>`,
    answer: String.raw`$\tan\varphi = 2\tan\theta$`
  },
  {
    id: "25-5-4",
    chapter: "大問5",
    number: "(4)",
    title: "F=mg/2 のとき φ と f を求める",
    tags: ["剛体", "具体値"],
    difficulty: 3,
    formula: String.raw`$F=\frac{mg}{2}$ での $\varphi, f$`,
    statement: String.raw`
      <p>（問5の設定で）$F = \dfrac{mg}{2}$ のとき、$\varphi$ を求め、$f$ を $mg$ で表せ。</p>`,
    meaning: String.raw`
      <p>具体的に $F = \dfrac{mg}{2}$ という値を入れて、棒の傾き $\varphi$ と糸の張力 $f$ を求めます。(3)で得た関係と(1)の式を使うだけです。</p>`,
    hints: [
      String.raw`(1)より $\tan\theta = \frac{F}{mg} = \frac{1}{2}$。(3)より $\tan\varphi = 2\tan\theta = 1$ → $\varphi = 45°$。`,
      String.raw`(1)の鉛直式 $f\cos\theta = mg$ から $f = \frac{mg}{\cos\theta}$。$\tan\theta=\frac12$ なら $\cos\theta = \frac{2}{\sqrt5}$。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>φ を求める</h5>
        <p>(1)より $\tan\theta = \dfrac{F}{mg} = \dfrac{1}{2}$。(3)より $\tan\varphi = 2\tan\theta = 2\cdot\dfrac{1}{2} = 1$:</p>
        <div class="math-display">$$\varphi = 45°$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>f を求める</h5>
        <p>$\tan\theta = \dfrac{1}{2}$ より、直角三角形の辺の比は「縦1・横2・斜辺$\sqrt5$」。よって $\cos\theta = \dfrac{2}{\sqrt5}$。(1)の鉛直式 $f\cos\theta = mg$ から:</p>
        <div class="math-display">$$f = \frac{mg}{\cos\theta} = \frac{mg}{2/\sqrt5} = \frac{\sqrt5}{2}mg$$</div>
      </div>`,
    answer: String.raw`$\varphi = 45°,\quad f = \dfrac{\sqrt{5}}{2}mg$`
  },

  /* ===================== 大問6 ベクトル解析（湯川ポテンシャル） ===================== */
  {
    id: "25-6-1",
    chapter: "大問6",
    number: "(1)",
    title: "回転 ∇×F の成分",
    tags: ["回転", "rot", "定義"],
    difficulty: 2,
    formula: String.raw`$\nabla\times\mathbf{F}$ の $x,y,z$ 成分`,
    statement: String.raw`
      <p>位置ベクトルを $\mathbf{r} = (x, y, z)$ として、以下の問いに答えよ。<br><b>ベクトル $\mathbf{F}(\mathbf{r}) = (F_x, F_y, F_z)$ の回転 $\nabla \times \mathbf{F}(\mathbf{r})$ の $x, y, z$ 成分を書け。</b></p>`,
    meaning: String.raw`
      <p>回転（rot）の定義を成分で書く問題です（2023年度の問1(3)と同じ）。「渦の強さ」を表すベクトル演算で、各成分は偏微分の引き算で作ります。</p>
      <div class="term-note"><b>📖 回転の定義</b><br>
      $$\nabla\times\mathbf{F} = \left(\frac{\partial F_z}{\partial y}-\frac{\partial F_y}{\partial z},\ \frac{\partial F_x}{\partial z}-\frac{\partial F_z}{\partial x},\ \frac{\partial F_y}{\partial x}-\frac{\partial F_x}{\partial y}\right)$$
      添字が $x\to y\to z\to x$ と巡回するパターンで覚えます。</div>`,
    hints: [
      String.raw`各成分は「隣の2文字の偏微分の引き算」。x成分は $\frac{\partial F_z}{\partial y} - \frac{\partial F_y}{\partial z}$。`,
      String.raw`あとは x→y→z→x の巡回で文字をずらす。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>定義を書き下す</h5>
        <div class="math-display">$$\nabla\times\mathbf{F} = \left(\frac{\partial F_z}{\partial y}-\frac{\partial F_y}{\partial z},\ \ \frac{\partial F_x}{\partial z}-\frac{\partial F_z}{\partial x},\ \ \frac{\partial F_y}{\partial x}-\frac{\partial F_x}{\partial y}\right)$$</div>
        <p>第1成分は $(y,z)$、第2成分は $(z,x)$、第3成分は $(x,y)$ が関わる巡回構造です。</p>
      </div>`,
    answer: String.raw`$\nabla\times\mathbf{F} = \left(\dfrac{\partial F_z}{\partial y}-\dfrac{\partial F_y}{\partial z},\ \dfrac{\partial F_x}{\partial z}-\dfrac{\partial F_z}{\partial x},\ \dfrac{\partial F_y}{\partial x}-\dfrac{\partial F_x}{\partial y}\right)$`
  },
  {
    id: "25-6-2",
    chapter: "大問6",
    number: "(2)",
    title: "保存力になる定数 a, b を決める",
    tags: ["保存力", "回転"],
    difficulty: 3,
    formula: String.raw`$\mathbf{F} = (y,\ ax+bz,\ 2z)$ が保存力`,
    statement: String.raw`
      <p>力 $\mathbf{F}(\mathbf{r}) = (F_x, F_y, F_z) = (y,\ ax+bz,\ 2z)$ が保存力となるように、定数 $a, b$ を決定せよ。</p>`,
    meaning: String.raw`
      <p>力が保存力であるための条件は<b>回転がゼロ</b>（$\nabla\times\mathbf{F} = \mathbf{0}$）。(1)の定義に $\mathbf{F} = (y, ax+bz, 2z)$ を代入し、各成分がゼロになるように $a, b$ を決めます。</p>`,
    hints: [
      String.raw`$F_x = y$、$F_y = ax+bz$、$F_z = 2z$。回転の各成分を計算してすべて0と置く。`,
      String.raw`x成分 $\frac{\partial F_z}{\partial y} - \frac{\partial F_y}{\partial z} = 0 - b = -b = 0$ → $b=0$。`,
      String.raw`z成分 $\frac{\partial F_y}{\partial x} - \frac{\partial F_x}{\partial y} = a - 1 = 0$ → $a=1$。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>回転の各成分を計算する</h5>
        <p>$F_x = y,\ F_y = ax+bz,\ F_z = 2z$:</p>
        <div class="math-display">$$\begin{aligned}
        x\text{成分} &= \frac{\partial F_z}{\partial y} - \frac{\partial F_y}{\partial z} = 0 - b = -b \\
        y\text{成分} &= \frac{\partial F_x}{\partial z} - \frac{\partial F_z}{\partial x} = 0 - 0 = 0 \\
        z\text{成分} &= \frac{\partial F_y}{\partial x} - \frac{\partial F_x}{\partial y} = a - 1
        \end{aligned}$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>すべてゼロにする</h5>
        <p>保存力条件 $\nabla\times\mathbf{F} = \mathbf{0}$ より $-b = 0$ かつ $a-1 = 0$:</p>
        <div class="math-display">$$a = 1,\qquad b = 0$$</div>
      </div>`,
    answer: String.raw`$a = 1,\quad b = 0$`
  },
  {
    id: "25-6-3",
    chapter: "大問6",
    number: "(3)",
    title: "ポテンシャル U(r) を求める",
    tags: ["保存力", "ポテンシャル", "積分"],
    difficulty: 3,
    formula: String.raw`$\mathbf{F} = (y, x, 2z)$ の $U$`,
    statement: String.raw`
      <p>(2) で求めた $a, b$ に対して $\mathbf{F}(\mathbf{r})$ のポテンシャル $U(\mathbf{r})$ を求めよ。ただし原点が基準点で $U(0) = 0$ とする。</p>`,
    meaning: String.raw`
      <p>(2)で $a=1,\ b=0$ と決まったので、力は $\mathbf{F} = (y,\ x,\ 2z)$。この力を与えるポテンシャルを $\mathbf{F} = -\nabla U$ から積分で逆算します。原点で $U=0$ となるよう定数を決めます。</p>`,
    hints: [
      String.raw`$-\frac{\partial U}{\partial x} = y$ を $x$ で積分：$U = -xy + g(y,z)$。`,
      String.raw`$-\frac{\partial U}{\partial y} = x$ と照合すると $g$ は $y$ を含まない。$-\frac{\partial U}{\partial z} = 2z$ から $z^2$ の項。`,
      String.raw`まとめて $U = -xy - z^2 + C$。原点で $U=0$ より $C=0$。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>x 成分から積分</h5>
        <p>$-\dfrac{\partial U}{\partial x} = y$ を $x$ で積分:</p>
        <div class="math-display">$$U = -xy + g(y, z)$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>y, z 成分で g を決める</h5>
        <p>$-\dfrac{\partial U}{\partial y} = x$：上の $U$ から $-\dfrac{\partial U}{\partial y} = x - \dfrac{\partial g}{\partial y} = x$ なので $\dfrac{\partial g}{\partial y}=0$。<br>
        $-\dfrac{\partial U}{\partial z} = 2z$：$-\dfrac{\partial g}{\partial z} = 2z$ なので $g = -z^2 + C$。</p>
      </div>
      <div class="sol-step" data-step="3">
        <h5>基準点で定数を決める</h5>
        <p>$U = -xy - z^2 + C$。原点で $U(0)=C=0$:</p>
        <div class="math-display">$$U(\mathbf{r}) = -xy - z^2$$</div>
      </div>`,
    answer: String.raw`$U(\mathbf{r}) = -xy - z^2$`
  },
  {
    id: "25-6-4",
    chapter: "大問6",
    number: "(4)",
    title: "湯川型ポテンシャルから力を求める",
    tags: ["勾配", "中心力", "湯川ポテンシャル"],
    difficulty: 4,
    formula: String.raw`$U = A\dfrac{e^{-\kappa r}}{r}$ から $\mathbf{F}$`,
    statement: String.raw`
      <p>ポテンシャル $U(\mathbf{r}) = A\dfrac{e^{-\kappa r}}{r}$ から力 $\mathbf{F}(\mathbf{r}) = (F_x, F_y, F_z)$ を求めよ。ただし $r = \sqrt{x^2+y^2+z^2}$、$A$ と $\kappa$ は正の定数である。</p>`,
    meaning: String.raw`
      <p>これは物理で有名な<b>湯川ポテンシャル</b>（核力を説明する形）です。$\mathbf{F} = -\nabla U$ を計算しますが、$U$ が $r$ だけの関数なので、2023年度の問1(1)と同じく合成関数の微分 $\dfrac{\partial r}{\partial x} = \dfrac{x}{r}$ を使います。指数関数の微分に注意が必要です。</p>
      <div class="term-note"><b>📖 積の微分に注意</b><br>
      $U = A\dfrac{e^{-\kappa r}}{r} = A e^{-\kappa r}r^{-1}$ を $r$ で微分するとき、積の微分で2項出ます:
      $$\frac{dU}{dr} = A\left(-\kappa e^{-\kappa r}\cdot\frac{1}{r} + e^{-\kappa r}\cdot\left(-\frac{1}{r^2}\right)\right)$$
      これを $\dfrac{\partial r}{\partial x}=\dfrac{x}{r}$ と組み合わせます。</div>`,
    hints: [
      String.raw`$U = Ae^{-\kappa r}r^{-1}$ を $r$ で微分（積の微分）：$\frac{dU}{dr} = -Ae^{-\kappa r}\frac{\kappa r + 1}{r^2}$。`,
      String.raw`$\frac{\partial U}{\partial x} = \frac{dU}{dr}\cdot\frac{x}{r}$。3成分まとめると $\mathbf{r}=(x,y,z)$ が出る。`,
      String.raw`$\mathbf{F} = -\nabla U$ のマイナスで符号が反転し、$\mathbf{F} = A(1+\kappa r)\frac{e^{-\kappa r}}{r^3}\mathbf{r}$。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>U を r で微分する</h5>
        <p>$U = Ae^{-\kappa r}r^{-1}$。積の微分:</p>
        <div class="math-display">$$\frac{dU}{dr} = A\left[-\kappa e^{-\kappa r}\cdot\frac{1}{r} - e^{-\kappa r}\cdot\frac{1}{r^2}\right] = -A e^{-\kappa r}\frac{\kappa r + 1}{r^2}$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>合成関数の微分で偏微分にする</h5>
        <p>$\dfrac{\partial r}{\partial x} = \dfrac{x}{r}$ を使うと:</p>
        <div class="math-display">$$\frac{\partial U}{\partial x} = \frac{dU}{dr}\cdot\frac{x}{r} = -A e^{-\kappa r}\frac{(\kappa r+1)x}{r^3}$$</div>
        <p>$y, z$ 成分も同様。まとめると $\nabla U = -A e^{-\kappa r}\dfrac{\kappa r+1}{r^3}(x,y,z)$。</p>
      </div>
      <div class="sol-step" data-step="3">
        <h5>力にする</h5>
        <div class="math-display">$$\mathbf{F} = -\nabla U = A(1+\kappa r)\frac{e^{-\kappa r}}{r^3}\,\mathbf{r}$$</div>
        <p>大きさは $|\mathbf{F}| = A(1+\kappa r)\dfrac{e^{-\kappa r}}{r^2}$。$\kappa=0$ とすると $\dfrac{A}{r^2}$（クーロン・万有引力型）に戻ります。</p>
      </div>`,
    answer: String.raw`$\mathbf{F} = A(1+\kappa r)\dfrac{e^{-\kappa r}}{r^3}\,\mathbf{r}\quad\left(\text{大きさ }A(1+\kappa r)\dfrac{e^{-\kappa r}}{r^2}\right)$`
  },

  /* ===================== 大問7 空気抵抗（速度比例）での上投げ ===================== */
  {
    id: "25-7-1",
    chapter: "大問7",
    number: "(1)",
    title: "運動方程式（速度比例抵抗）",
    tags: ["運動方程式", "空気抵抗"],
    difficulty: 2,
    formula: String.raw`重力 + 抵抗 $-\frac{m}{\tau}v$`,
    statement: String.raw`
      <p>空気中で質量 $m$ の物体を初速度 $v_0$ で鉛直上方に投げた。鉛直上向きに $y$ 軸をとり、時刻 $t$ における物体の速度を $v(t)$ とする。物体には、重力および速度に依存した空気抵抗 $-\dfrac{m}{\tau}v$ が働くとする（$\tau$ は正の定数）。重力加速度の大きさを $g$ として、以下の問いに答えよ。<br><b>物体の運動方程式を書け。</b></p>`,
    meaning: String.raw`
      <p>速度に比例する空気抵抗（今回は $v$ の1乗に比例）を受けながら、真上に投げ上げた物体の運動方程式です。抵抗力は $-\dfrac{m}{\tau}v$ と、$v$ の符号に応じて自動的に運動と逆向きになるよう書かれています（上昇中 $v>0$ なら抵抗は下向き、下降中 $v<0$ なら上向き）。</p>
      <div class="term-note"><b>📖 符号込みの抵抗</b><br>
      $-\dfrac{m}{\tau}v$ という形は、$v$ の正負にかかわらず「運動と逆向き」を自動で表す便利な書き方。重力は常に下向き $-mg$。この2つを足すだけです。</div>`,
    hints: [
      String.raw`重力 $-mg$（常に下向き）と抵抗 $-\frac{m}{\tau}v$ を足す。`,
      String.raw`$m\frac{dv}{dt} = -mg - \frac{m}{\tau}v$。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>力を足す</h5>
        <p>重力 $-mg$ と速度比例抵抗 $-\dfrac{m}{\tau}v$ の合計:</p>
        <div class="math-display">$$m\frac{dv}{dt} = -mg - \frac{m}{\tau}v$$</div>
        <p>両辺 $m$ で割ると $\dfrac{dv}{dt} = -g - \dfrac{v}{\tau}$。</p>
      </div>`,
    answer: String.raw`$m\dfrac{dv}{dt} = -mg - \dfrac{m}{\tau}v\quad\left(\dfrac{dv}{dt} = -g - \dfrac{v}{\tau}\right)$`
  },
  {
    id: "25-7-2",
    chapter: "大問7",
    number: "(2)",
    title: "速度 v(t) を求める",
    tags: ["微分方程式", "変数分離"],
    difficulty: 4,
    formula: String.raw`$v(t)$`,
    statement: String.raw`
      <p>（問7の設定で）$v(t)$ を求めよ。</p>`,
    meaning: String.raw`
      <p>運動方程式 $\dfrac{dv}{dt} = -g - \dfrac{v}{\tau}$ を解いて速度の時間変化を求めます。これは<b>変数分離形</b>の微分方程式。今回は $v$ の1乗なので、答えは指数関数 $e^{-t/\tau}$ で表せます（2023年の $v^2$ 抵抗の $\tanh$ とは違う点に注目）。</p>
      <div class="term-note"><b>📖 変数分離で解く</b><br>
      $\dfrac{dv}{dt} = -\dfrac{v + g\tau}{\tau}$ と変形し、$\dfrac{dv}{v+g\tau} = -\dfrac{dt}{\tau}$ の形にして両辺積分。初速 $v(0)=v_0$ で定数を決めます。</div>`,
    hints: [
      String.raw`右辺を $-\frac{1}{\tau}(v + g\tau)$ とまとめる。変数分離：$\frac{dv}{v+g\tau} = -\frac{dt}{\tau}$。`,
      String.raw`両辺積分：$\log(v+g\tau) = -\frac{t}{\tau} + C$。$v+g\tau = De^{-t/\tau}$。`,
      String.raw`初期条件 $v(0)=v_0$ より $D = v_0 + g\tau$。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>変数分離する</h5>
        <p>$\dfrac{dv}{dt} = -g - \dfrac{v}{\tau} = -\dfrac{v + g\tau}{\tau}$ を分離:</p>
        <div class="math-display">$$\frac{dv}{v + g\tau} = -\frac{dt}{\tau}$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>両辺を積分する</h5>
        <div class="math-display">$$\log|v + g\tau| = -\frac{t}{\tau} + C \;\Rightarrow\; v + g\tau = De^{-t/\tau}$$</div>
      </div>
      <div class="sol-step" data-step="3">
        <h5>初期条件で D を決める</h5>
        <p>$v(0) = v_0$ より $v_0 + g\tau = D$:</p>
        <div class="math-display">$$v(t) = (v_0 + g\tau)e^{-t/\tau} - g\tau$$</div>
        <p>$t\to\infty$ で $v \to -g\tau$（終端速度、下向き）に近づきます。</p>
      </div>`,
    answer: String.raw`$v(t) = (v_0 + g\tau)e^{-t/\tau} - g\tau$`
  },
  {
    id: "25-7-3",
    chapter: "大問7",
    number: "(3)",
    title: "位置 y(t) を求める",
    tags: ["積分", "位置"],
    difficulty: 3,
    formula: String.raw`$y(t)$（$y(0)=0$）`,
    statement: String.raw`
      <p>（問7の設定で）時刻 $t$ における物体の位置 $y(t)$ を求めよ。ただし $y(0) = 0$ とする。</p>`,
    meaning: String.raw`
      <p>速度 $v(t)$ を時間で積分すれば位置 $y(t)$ が得られます（$y = \int v\,dt$）。(2)で求めた $v(t)$ を積分し、初期条件 $y(0)=0$ で積分定数を決めます。</p>`,
    hints: [
      String.raw`$y = \int v\,dt = \int[(v_0+g\tau)e^{-t/\tau} - g\tau]dt$。`,
      String.raw`$\int e^{-t/\tau}dt = -\tau e^{-t/\tau}$。$y = -(v_0+g\tau)\tau e^{-t/\tau} - g\tau t + C$。`,
      String.raw`$y(0)=0$ より $C = (v_0+g\tau)\tau$。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>速度を積分する</h5>
        <div class="math-display">$$y = \int\big[(v_0+g\tau)e^{-t/\tau} - g\tau\big]dt = -(v_0+g\tau)\tau e^{-t/\tau} - g\tau t + C$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>初期条件で C を決める</h5>
        <p>$y(0) = -(v_0+g\tau)\tau + C = 0$ より $C = (v_0+g\tau)\tau$:</p>
        <div class="math-display">$$y(t) = (v_0+g\tau)\tau\left(1 - e^{-t/\tau}\right) - g\tau t$$</div>
      </div>`,
    answer: String.raw`$y(t) = (v_0+g\tau)\tau\left(1 - e^{-t/\tau}\right) - g\tau t$`
  },
  {
    id: "25-7-4",
    chapter: "大問7",
    number: "(4)",
    title: "最高点の時刻 T・高さ H とグラフ",
    tags: ["最高点", "漸近線", "グラフ"],
    difficulty: 5,
    formula: String.raw`最高点の $T, H$ とグラフ`,
    statement: String.raw`
      <p>（問7の設定で）(2), (3) の結果から、物体が最高点に達した時刻 $T$ とその高さ $H$ を求め、横軸を $t$ にとって $v(t)$ と $y(t)$ それぞれについて、漸近線に注意してグラフを描け。</p>`,
    meaning: String.raw`
      <p>最高点は「速度がゼロになる瞬間」です。$v(T)=0$ から時刻 $T$ を求め、それを $y(t)$ に代入して高さ $H$ を出します。最後にグラフの概形を、時間が経ったときの振る舞い（漸近線）に注意して描きます。</p>
      <div class="term-note"><b>📖 グラフの漸近線</b><br>
      $v(t)$：$t\to\infty$ で $v\to -g\tau$（水平な漸近線）。上昇→減速→$T$で0→下降→終端速度に飽和。<br>
      $y(t)$：$t\to\infty$ で $e^{-t/\tau}\to0$ となり $y \approx -g\tau\,t + (v_0+g\tau)\tau$（傾き $-g\tau$ の直線に漸近）。$T$ で最大 $H$ をとる山型。</div>`,
    hints: [
      String.raw`最高点は $v(T)=0$：$(v_0+g\tau)e^{-T/\tau} = g\tau$ から $T = \tau\log\frac{v_0+g\tau}{g\tau} = \tau\log(1+\frac{v_0}{g\tau})$。`,
      String.raw`$H = y(T)$。$1 - e^{-T/\tau} = \frac{v_0}{v_0+g\tau}$ を使うと第1項が $v_0\tau$ に簡約。`,
      String.raw`$H = v_0\tau - g\tau^2\log(1+\frac{v_0}{g\tau})$。グラフは v が $-g\tau$ に、y が傾き $-g\tau$ の直線に漸近。`
    ],
    solution: String.raw`
      <div class="sol-step" data-step="1">
        <h5>最高点の時刻 T</h5>
        <p>$v(T)=0$:</p>
        <div class="math-display">$$(v_0+g\tau)e^{-T/\tau} = g\tau \;\Rightarrow\; e^{-T/\tau} = \frac{g\tau}{v_0+g\tau}$$</div>
        <div class="math-display">$$T = \tau\log\frac{v_0+g\tau}{g\tau} = \tau\log\left(1 + \frac{v_0}{g\tau}\right)$$</div>
      </div>
      <div class="sol-step" data-step="2">
        <h5>最高点の高さ H</h5>
        <p>$H = y(T)$。$1 - e^{-T/\tau} = 1 - \dfrac{g\tau}{v_0+g\tau} = \dfrac{v_0}{v_0+g\tau}$ を代入すると第1項が簡約:</p>
        <div class="math-display">$$(v_0+g\tau)\tau\cdot\frac{v_0}{v_0+g\tau} = v_0\tau$$</div>
        <div class="math-display">$$H = v_0\tau - g\tau\,T = v_0\tau - g\tau^2\log\left(1 + \frac{v_0}{g\tau}\right)$$</div>
      </div>
      <div class="sol-step" data-step="3">
        <h5>グラフの概形（漸近線に注意）</h5>
        <p><b>$v(t)$:</b> $t=0$ で $v_0$（正）から出発し単調に減少、$t=T$ で $0$、その後負に。$t\to\infty$ で $v\to -g\tau$ の<b>水平漸近線</b>に近づきます。</p>
        <p><b>$y(t)$:</b> 原点から出発して増加、$t=T$ で最大値 $H$ の<b>山型</b>。その後減少し、$t\to\infty$ で傾き $-g\tau$ の直線 $y = -g\tau\,t + (v_0+g\tau)\tau$ に漸近します。</p>
      </div>`,
    answer: String.raw`$T = \tau\log\left(1+\dfrac{v_0}{g\tau}\right),\quad H = v_0\tau - g\tau^2\log\left(1+\dfrac{v_0}{g\tau}\right)$`
  }
];


/* 2023年度・2025年度を結合。各問題に year を付与して1つの配列に。 */
const PROBLEMS = [
  ...PROBLEMS_2023.map(p => ({ ...p, year: "2023" })),
  ...PROBLEMS_2025.map(p => ({ ...p, year: "2025" }))
];
