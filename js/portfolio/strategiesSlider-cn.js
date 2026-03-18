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
    title: "我们从根本上支持创新",
    text: "我们在您所在的位置与您共同创造稳固、可扩展的企业",
    advantages: [
      {
        title: "创新",
        text: "我们的风险投资业务支持整个公司建设生命周期的创新",
      },
      {
        title: "找到战略机会",
        text: "我们帮助企业家找到战略机会，然后扩展到他们的雄心——所有这些都植根于长期价值观的一致性",
      },
      {
        title: "全球视角",
        text: "我们的全球视角和本土专业知识帮助创始人驾驭市场、加速增长，并在退出计划之前建立卓越的公司",
      },
    ],
    caseText:
      "查看我们如何在2024年建立上海药物创新孵化器，目前管道中有10多个制药候选项目",
    popupId: "popup-incubator",
    teamTags: "您的风险投资团队",
    team: "9+ 投资者<br>15+ 基金",
  },
  {
    title: "我们与您的成功保持一致",
    text: "我们追求以共同卓越承诺为基础的长期战略合作伙伴关系",
    advantages: [
      {
        title: "重点行业",
        text: "我们的投资涵盖科技、医疗保健、消费、先进制造和清洁技术领域",
      },
      {
        title: "价值创造",
        text: "我们的方法不仅限于资本——我们深度融入公司的成长旅程，在全球市场扩张、运营、品牌、财务、法律和人才发展方面提供战略支持",
      },
      {
        title: "投资阶段",
        text: "我们从成长阶段到收购阶段进行投资，旨在释放持续价值并制定最优退出路径",
      },
    ],
    caseText: "查看我们如何帮助Moncler在中国大陆从0扩展到100家门店",
    popupId: "popup-Moncler",
    teamTags: "您的私募股权团队",
    team: "13+ 投资者<br>20+ 基金",
  },
  {
    title: "我们连接二级市场",
    text: "我们促进私募股权份额的买卖，以释放流动性和新的投资机会",
    advantages: [
      {
        title: "流动性解决方案",
        text: "我们通过二级市场策略提供流动性解决方案，赋能我们的投资者和投资组合公司",
      },
      {
        title: "长期价值",
        text: "我们专注于长期价值和灵活性，使利益相关者能够优化投资期限，同时确保为新兴机会释放资本",
      },
    ],
    teamTags: "您的二级市场团队",
    team: "5+ 投资者",
  },
  {
    title: "我们创造战略成果",
    text: "我们执行基于战略利益一致的复杂收购和企业并购",
    advantages: [
      {
        title: "并购顾问",
        text: "我们的并购顾问管理端到端的交易流程，包括估值、尽职调查、谈判和执行——在使公司能够通过收购扩大规模或顺利转移所有权的同时，协调利益相关者的利益",
      },
    ],
    caseText:
      "最近的交易，包括LAKRIDS BY BÜLOW和Yoplait中国，展示了我们在国际和中国执行收购交易的能力",
    teamTags: "您的并购团队",
    team: "10+ 投资者<br>5+ 行业",
  },
  {
    title: "我们架起私募和公共市场的桥梁",
    text: "我们以纪律严明、长期视角管理上市股权和混合资产",
    advantages: [
      {
        title: "资本市场",
        text: "我们通过IPO和IPO后融资支持公司进入资本市场——为投资者提供流动性，为企业提供持续增长动力",
      },
      {
        title: "生命周期支持",
        text: "我们对这些投资采取整体方法，确保它们与我们的风险和私募股权策略无缝整合，以提供全面的生命周期支持",
      },
    ],
    teamTags: "您的公共市场团队",
    team: "8+ 投资者<br>管理资金150亿美元",
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
