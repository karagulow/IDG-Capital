const header = document.querySelector(".header");
const headerTabs = document.querySelectorAll(".header__tabs--btn");
const TRANSITION_DURATION = 200;

const states = [
  {
    title: "기업들이 영원히 성 \n 장하는 곳",
    text: "30년 이상, IDG 캐피탈은 지속 가능한 회사를 만들기 위해 도전하는 창립자와 팀들과 함께 해왔습니다 — 그들과 함께 모든 단계에서 여정을 이어왔습니다.",
    btn: {
      text: "우리의 이야기",
      href: "./about-us-kr.html#story",
    },
    bg: "#F2CECA",
    titleClass: "header__title_1",
    textClass: "header__text_1",
  },
  {
    title: "공유된 성공이 우리의 공동 \n 목표입니다.",
    text: "우리는 같은 생각을 가진 기업들과 협력합니다 – 공유된\n 목적이 성공적인 파트너십의 비결입니다.",
    btn: {
      text: "우리의 가치",
      href: "./about-us-kr.html#values",
    },
    bg: "#EEEBE7",
    titleClass: "header__title_2",
    textClass: "header__text_2",
  },
  {
    title: "글로벌 관점이 지역 전략과 만 \n 나는 곳",
    text: "우리는 당신의 야망이 어디로 가든지 우리의 국제적 실적 \n 을 당신의 서비스에 제공합니다.",
    btn: {
      text: "사례 연구",
      href: "./portfolio-kr.html",
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
