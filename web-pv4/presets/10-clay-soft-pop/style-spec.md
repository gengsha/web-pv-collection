# 风格构成说明：软陶拟物·粉彩立体 (Claymorphism Soft Pop)

## 1. 风格概述 (Style DNA)

* **核心理念**：把界面捏成一颗软陶。所有元素都有厚度、有回弹、有手感 —— 按下去会陷进去，松手会弹回来。hy4 被拟人化为一颗会思考的软陶团子。
* **视觉情绪**：可爱、亲和、无害、治愈、带点玩具感。
* **适用场景**：儿童/教育产品、消费级 App 官网、社区与社交产品、健康打卡、需要降低心理门槛的 AI 产品。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  --bg: #ede9fe;        /* 薰衣草灰底 */
  --bg-2: #e6e0fb;

  --pink: #ffb4a2;      /* 陶土粉 */
  --mint: #a0e7c8;      /* 薄荷绿 */
  --blue: #a7d8f0;      /* 天青蓝 */
  --yellow: #ffe7a3;    /* 奶油黄 */
  --lilac: #d9c9ff;     /* 淡紫 */

  --ink: #3b3355;       /* 深紫文字 */
  --ink-dim: #6b6288;
  --ink-muted: #9a92b5;

  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  --bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 3. 排版与字体系统 (Typography)

```html
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Quicksand:wght@500;600;700&family=Nunito:wght@600;700&display=swap" rel="stylesheet">
```

* **Display**：`Baloo 2` 700/800（圆头、粗壮、自带亲和力），用于大标题、数值与徽标。
* **正文**：`Quicksand` 500/600，行高 `1.85`，颜色 `#6b6288`。
* **小标签**：`Nunito` 700，大写 + `letter-spacing: .12em`。
* **语气**：文案要软（"戳一戳""揉一揉""弹回来"），避免命令式与生硬术语。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **粘土拟物核心公式**：**零边框 + 双层 inset 阴影 + 大彩色外阴影**。

```css
.clay-card {
  border-radius: 44px;
  background: var(--c);
  box-shadow:
    inset -10px -10px 20px rgba(0,0,0,.10),   /* 右下暗部 */
    inset  10px  10px 20px rgba(255,255,255,.75), /* 左上高光 */
    0 18px 34px rgba(120,110,160,.16);        /* 柔和投影 */
}
```

* **按压态反转**：把两个 inset 的方向对调 + 整体 `translateY(4px) scale(.97)`，就得到"陷进去"的手感。
* **大圆角等级**：按钮 999px，卡片 36–52px，图标容器 18–28px，标签 999px。
* **有机形态**：吉祥物用 `border-radius: 50% 50% 46% 46% / 56% 56% 44% 44%` 做出不规则的软陶轮廓，配 `squish` 挤压动画。
* **柔光背景**：3 团 `blur(70px)` 的粉/蓝/绿 blob，16–20s 缓慢漂移。
* **光标柔光**：240px 白色径向渐变跟随光标（`transition: left/top .35s` 做阻尼延迟），`filter: blur(18px)`。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **弹性曲线**：所有回弹都用 `cubic-bezier(0.34, 1.56, 0.64, 1)`（overshoot），位移用 `--ease`。
* **按压 (Squish)**：`.pressed` 类在 `mousedown` 加上、`mouseup/mouseleave` 移除；按钮用 `:active` 直接实现。
* **拨杆**：54px 圆形把手在凹槽轨道内滑动，`left` 用 `--bounce` 过渡 0.5s，切换时把手与徽章同步变色（粉↔蓝）。
* **挤压呼吸**：吉祥物 4.5s 周期 `scale(1.05,.94) → scale(.97,1.04)`，眼睛 5s 眨一次（`scaleY(.1)`）。
* **气泡弹出**：`pop` 动画 `scale(.9) translateY(10px)` → 归位，450ms，`--bounce`。
* **进度条**：凹槽内的白色渐变条，1.4s 补间。

---

## 6. 页面结构骨架 (hy4 个人网站通用)

| 区块 | 说明 |
| :--- | :--- |
| 背景层 | 3 团柔光 blob + 跟随光标的柔光球 |
| Nav | 粘土方块 logo + 圆角胶囊锚点（激活态为内凹白胶囊）+ 粉红主按钮 |
| Hero | 软陶吉祥物（会眨眼、会挤压、随光标摆动）+ 带投影的椭圆影子 → 双行大标题 → 描述 → 双 CTA → 4 颗彩色数据软糖 |
| 四颗软糖 | 4 张粘土卡，各绑定一个粉彩色 `--c`，支持按压凹陷 |
| 软陶拨杆 | 左：SOFT / DEEP 拨杆（凹槽 + 圆把手）；右：说明、三行清单、Token/时间/步数 |
| 气泡对话 | 全圆角气泡（非对称下圆角）+ 粘土头像 + 内凹输入框 |
| 分数软糖 | 4 组粉彩卡片 + 内凹槽白色进度条 |
| Footer | 粘土方块 logo + 手感署名 |

---

## 7. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【软陶拟物·粉彩立体 (Claymorphism)】风格为 hy4 生成个人官网代码（原生 HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩令牌：薰衣草灰 #EDE9FE 底，陶土粉 #FFB4A2、薄荷绿 #A0E7C8、天青蓝 #A7D8F0、奶油黄 #FFE7A3，深紫文字 #3B3355。
2. 材质构件：粘土拟物（border-radius: 36~56px；双层 inset 内阴影：inset -8px -8px 16px rgba(0,0,0,.12) + inset 8px 8px 16px rgba(255,255,255,.85)，外加 20px 30px 的柔和彩色外阴影）；零边框、零描边，完全依靠光影塑形；柔和的彩色 Blob 光斑背景。
3. 字体排版：Fredoka 或 Baloo 2 700 圆润标题，正文 Quicksand 600，标签 Nunito 等宽替代（可用 JetBrains Mono 圆角化呈现）。
4. 交互与动效：按钮 :active 下沉 squish（scale(0.96) + 内阴影反转），回弹使用 cubic-bezier(0.34,1.56,0.64,1)；卡片 hover 上浮 -8px 且外阴影扩大；跟随光标的柔和光晕 blob（blur 40px，阻尼跟随）。
5. 内容板块：hy4 圆润 Hero（把模型做成一颗软陶吉祥物）、能力矩阵（四块彩色粘土卡）、混合推理（软陶拨杆开关 SOFT / DEEP）、对话终端（气泡全部大圆角）、页脚。
```
