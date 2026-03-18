const buttons = document.querySelectorAll(".strategies__btn");

const strategyElement = document.querySelector(".strategy");
const title = document.querySelector(".strategy__title");
const text = document.querySelector(".strategy__text");

const advItems = document.querySelectorAll(".strategy__adv-item");
const advTitles = document.querySelectorAll(".strategy__adv-item--title");
const advTexts = document.querySelectorAll(".strategy__adv-item--text");

const caseBlock = document.querySelector(".strategy__case");
const caseText = document.querySelector(".strategy__case--text");
const teamTags = document.querySelector(".strategy__team--tags");
const teamText = document.querySelector(".strategy__team--text");
const caseLink = document.querySelector(".strategy__case--link");
let isAnimating = false;

const strategiesData = [
  {
    title: "우리는 혁신을 근본부터 지원합니다",
    text: "우리는 귀사가 있는 곳에서 함께 견고하고 확장 가능한 기업을 만들어 갑니다",
    advantages: [
      {
        title: "혁신",
        text: "우리의 벤처캐피탈 사업은 기업 구축 생애주기 전반에 걸친 혁신을 지원합니다",
      },
      {
        title: "전략적 기회 발굴",
        text: "우리는 기업가들이 전략적 기회를 찾고 그들의 포부를 실현하도록 돕습니다 — 이 모든 것은 장기적인 가치관의 일치에 기반합니다",
      },
      {
        title: "글로벌 관점",
        text: "우리의 글로벌 관점과 현지 전문성은 창업자들이 시장을 개척하고, 성장을 가속화하며, 출구 계획에 앞서 탁월한 기업을 구축하도록 돕습니다",
      },
    ],
    caseText:
      "2024년 상하이 신약 혁신 인큐베이터를 어떻게 설립했는지 확인해 보세요 — 현재 파이프라인에 10개 이상의 제약 후보 물질이 있습니다",
    popupId: "popup-incubator",
    teamTags: "귀사의 벤처캐피탈 팀",
    team: "9+ 투자자<br>15+ 펀드",
  },
  {
    title: "우리는 귀사의 성공에 함께합니다",
    text: "우리는 공동의 탁월함에 대한 헌신을 바탕으로 한 장기적인 전략적 파트너십을 추구합니다",
    advantages: [
      {
        title: "중점 산업",
        text: "우리의 투자는 기술, 헬스케어, 소비재, 첨단 제조 및 클린테크 분야를 아우릅니다",
      },
      {
        title: "가치 창출",
        text: "우리의 접근 방식은 자본에 그치지 않습니다 — 글로벌 시장 확장, 운영, 브랜딩, 재무, 법률, 인재 개발 등 전략적 지원을 통해 기업의 성장 여정에 깊이 참여합니다",
      },
      {
        title: "투자 단계",
        text: "우리는 성장 단계부터 바이아웃 단계까지 투자하여 지속적인 가치를 창출하고 최적의 출구 경로를 설계합니다",
      },
    ],
    caseText: "Moncler가 중국 본토에서 0개 매장에서 100개로 확장하도록 어떻게 도왔는지 확인해 보세요",
    popupId: "popup-Moncler",
    teamTags: "귀사의 사모펀드 팀",
    team: "13+ 투자자<br>20+ 펀드",
  },
  {
    title: "우리는 세컨더리 시장을 연결합니다",
    text: "우리는 유동성과 새로운 투자 기회를 창출하기 위해 사모펀드 지분의 매매를 촉진합니다",
    advantages: [
      {
        title: "유동성 솔루션",
        text: "우리는 세컨더리 시장 전략을 통해 투자자와 포트폴리오 기업에 유동성 솔루션을 제공합니다",
      },
      {
        title: "장기 가치",
        text: "우리는 장기적 가치와 유연성에 집중하여 이해관계자들이 투자 기간을 최적화하고 신흥 기회를 위한 자본을 확보할 수 있도록 합니다",
      },
    ],
    teamTags: "귀사의 세컨더리 마켓 팀",
    team: "5+ 투자자",
  },
  {
    title: "우리는 전략적 성과를 창출합니다",
    text: "우리는 전략적 이해관계의 일치를 바탕으로 복잡한 바이아웃과 기업 합병을 실행합니다",
    advantages: [
      {
        title: "M&A 자문",
        text: "우리의 M&A 자문은 가치 평가, 실사, 협상, 실행을 포함한 엔드투엔드 딜 프로세스를 관리합니다 — 기업이 인수를 통해 확장하거나 소유권을 원활하게 이전할 수 있도록 이해관계자의 이익을 조율합니다",
      },
    ],
    caseText:
      "LAKRIDS BY BÜLOW 및 Yoplait China를 포함한 최근 거래는 국제 및 중국 내 바이아웃 거래 실행 역량을 보여줍니다",
    teamTags: "귀사의 M&A 팀",
    team: "10+ 투자자<br>5+ 산업",
  },
  {
    title: "우리는 사모와 공개 시장을 연결합니다",
    text: "우리는 규율 있고 장기적인 관점으로 상장 주식과 하이브리드 자산을 운용합니다",
    advantages: [
      {
        title: "자본 시장",
        text: "우리는 IPO와 IPO 후 자금 조달을 통해 기업이 자본 시장에 접근할 수 있도록 지원합니다 — 투자자에게는 유동성을, 기업에게는 지속적인 성장 동력을 제공합니다",
      },
      {
        title: "생애주기 지원",
        text: "우리는 이러한 투자에 총체적인 접근 방식을 취하여 벤처 및 사모펀드 전략과 원활하게 통합되어 포괄적인 생애주기 지원을 제공합니다",
      },
    ],
    teamTags: "귀사의 공개 시장 팀",
    team: "8+ 투자자<br>운용 자산 150억 달러",
  },
];

function applyStrategyContent(index) {
  const data = strategiesData[index];

  if (!data) return;

  buttons.forEach((btn) => btn.classList.remove("active"));
  buttons[index].classList.add("active");

  title.innerHTML = data.title;
  text.innerHTML = data.text;

  advItems.forEach((item, i) => {
    const adv = data.advantages[i];

    item.classList.remove("has-border");

    if (adv) {
      advTitles[i].innerHTML = adv.title;
      advTexts[i].innerHTML = adv.text;
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });

  const visibleItems = [...advItems].filter(
    (item) => item.style.display !== "none",
  );

  visibleItems.slice(0, -1).forEach((item) => {
    item.classList.add("has-border");
  });

  if (data.caseText) {
    caseBlock.style.display = "";
    caseText.innerHTML = data.caseText;
    if (data.popupId) {
      caseLink.setAttribute("data-popup-open", data.popupId);
      caseLink.style.display = "";
    } else {
      caseLink.style.display = "none";
    }
  } else {
    caseBlock.style.display = "none";
  }

  teamTags.innerHTML = data.teamTags;
  teamText.innerHTML = data.team;
}

function setStrategy(index, { animate } = { animate: true }) {
  if (!strategyElement || !title || !text) {
    applyStrategyContent(index);
    return;
  }

  if (!animate) {
    applyStrategyContent(index);
    return;
  }

  if (isAnimating) {
    return;
  }

  isAnimating = true;

  const handleFadeOutEnd = (event) => {
    if (event.target !== strategyElement) return;

    strategyElement.removeEventListener("transitionend", handleFadeOutEnd);

    applyStrategyContent(index);

    void strategyElement.offsetWidth;

    strategyElement.classList.remove("strategy--fade-out");
    strategyElement.classList.add("strategy--fade-in");

    const handleFadeInEnd = (e) => {
      if (e.target !== strategyElement) return;

      strategyElement.removeEventListener("transitionend", handleFadeInEnd);
      strategyElement.classList.remove("strategy--fade-in");
      isAnimating = false;
    };

    strategyElement.addEventListener("transitionend", handleFadeInEnd);
  };

  requestAnimationFrame(() => {
    strategyElement.addEventListener("transitionend", handleFadeOutEnd);
    strategyElement.classList.add("strategy--fade-out");
  });
}

buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => setStrategy(index));
});

setStrategy(0, { animate: false });
