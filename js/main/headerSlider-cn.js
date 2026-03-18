const header = document.querySelector(".header");
const headerTabs = document.querySelectorAll(".header__tabs--btn");
const TRANSITION_DURATION = 200;

const states = [
  {
    title: "企业构建永恒的未\n 来",
    text: "30多年来，IDG资本一直与那些敢于建立持久公司的创始 \n 人和团队并肩作战，陪伴他们走过每一步旅程",
    btn: {
      text: "我们的故事",
      href: "./about-us-ch.html#story",
    },
    bg: "#F2CECA",
    titleClass: "header__title_1",
    textClass: "header__text_1",
  },
  {
    title: "共同成功是我们的共同目标",
    text: "我们与志同道合的企业合作——因为共同的目标是成功合作的秘诀",
    btn: {
      text: "我们的价值",
      href: "./about-us-cn.html#values",
    },
    bg: "#EEEBE7",
    titleClass: "header__title_2",
    textClass: "header__text_2",
  },
  {
    title: "全球视野与本地战略的结合",
    text: "我们将国际成功的记录服务于您的雄心——无论它们将带您去哪里",
    btn: {
      text: "案例研究",
      href: "./portfolio-ch.html",
    },
    bg: "#E8EBF2",
    titleClass: "header__title_3",
    textClass: "header__text_3",
  },
];

let current = 0;

function createHeaderTitle({ title, titleClass }) {
  const h1 = document.createElement("h1");
  h1.className = `accent header__title ${titleClass}`;
  h1.innerHTML = title.replace(/\r?\n/g, "<br />");
  return h1;
}

function createHeaderText({ text, textClass }) {
  const p = document.createElement("p");
  p.className = `body-l header__text ${textClass}`;
  p.innerHTML = text.replace(/\r?\n/g, "<br />");
  return p;
}

function createHeaderBtn({ text, href, class: extraClass }) {
  const a = document.createElement("a");
  a.href = href;
  a.textContent = text;
  a.className = `button header__btn ${extraClass || ""}`;
  return a;
}

function applyState(index) {
  const state = states[index];

  const oldTitle = document.querySelector(".header__title");
  const oldText = document.querySelector(".header__text");
  const oldBtn = document.querySelector(".header__btn");

  oldTitle.classList.add("is-changing");
  oldText.classList.add("is-changing");
  oldBtn.classList.add("is-changing");

  setTimeout(() => {
    // title
    const newTitle = createHeaderTitle(state);
    newTitle.classList.add("is-changing");
    oldTitle.replaceWith(newTitle);

    // text
    const newText = createHeaderText(state);
    newText.classList.add("is-changing");
    oldText.replaceWith(newText);

    // button
    const newBtn = createHeaderBtn(state.btn);
    newBtn.classList.add("is-changing");
    oldBtn.replaceWith(newBtn);

    newTitle.offsetHeight;
    newText.offsetHeight;
    newBtn.offsetHeight;

    // bg
    header.style.backgroundColor = state.bg;

    // tabs
    headerTabs.forEach((tab, i) => {
      tab.classList.toggle("is-active", i === index);
    });

    requestAnimationFrame(() => {
      newTitle.classList.remove("is-changing");
      newText.classList.remove("is-changing");
      newBtn.classList.remove("is-changing");
    });

    current = index;
  }, TRANSITION_DURATION);
}

headerTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    applyState(Number(tab.dataset.index));
    resetAutoSwitch();
  });
});

let interval = setInterval(nextState, 6000);

function nextState() {
  const next = (current + 1) % states.length;
  applyState(next);
}

function resetAutoSwitch() {
  clearInterval(interval);
  interval = setInterval(nextState, 6000);
}

applyState(0);

let touchStartX = 0;
let touchEndX = 0;
const SWIPE_THRESHOLD = 50;

header.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].clientX;
  },
  { passive: true },
);

header.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) < SWIPE_THRESHOLD) return;

  if (diff > 0) {
    nextState();
  } else {
    prevState();
  }

  resetAutoSwitch();
}

function prevState() {
  const prev = (current - 1 + states.length) % states.length;
  applyState(prev);
}
