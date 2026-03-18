const tabs = document.querySelectorAll(".locations__tabs button");
const map = document.querySelector("#locations-map");
const list = document.querySelector("#locations-list");
const listBlock = document.querySelector("#locations-list-block");
const locationsSection = document.querySelector(".locations");

const locations = [
  {
    id: "new-york",
    region: "americas",
    title: "뉴욕",
    text: "1345 Avenue of Americas 33층, 뉴욕, NY 10105<br />전화: 212-337-5200",
  },
  {
    id: "boston",
    region: "americas",
    title: "보스턴",
    text: "Boston University Innovate@BU<br />730 Commonwealth Ave.<br />Brookline, MA 02446",
  },
  {
    id: "cayman",
    region: "americas",
    title: "케이맨",
    text: "Suite 15, The Grand Pavilion Commercial Centre, 802 West Bay Road, Cayman Islands KY1-1206",
  },
  {
    id: "barcelona",
    region: "europe",
    title: "바르셀로나",
    text: "Avinguda Diagonal 640, P6, 08017 Barcelona",
  },
  {
    id: "hong-kong",
    region: "asia",
    title: "홍콩",
    text: "홍콩 센트럴 퀸즈 로드 99번지<br />더 센터 5505호<br />전화: 852-3903 1333<br />팩스: 852-3905 5000",
  },
  {
    id: "beijing",
    region: "asia",
    title: "베이징",
    text: "중국 베이징 젠궈먼네이다제 8번지<br />COFCO 플라자 A동 6층, 100005<br />전화: 86-10-8590-1800<br />팩스: 86-10-6526-0700",
  },
  {
    id: "guangzhou",
    region: "asia",
    title: "광저우",
    text: "광저우 폴리 인터내셔널 플라자 남쪽 타워 34층, 510308<br />전화: 86-20-8412 0331<br />팩스: 86-20-8412 0490",
  },
  {
    id: "hanoi",
    region: "asia",
    title: "하노이",
    text: "베트남 하노이 하이바쯩구<br />파탐가 125-127 V빌딩 5층 502호<br />전화: (84-4) 2220-0348<br />팩스: (84-4) 2220-0349",
  },
  {
    id: "muscat",
    region: "asia",
    title: "호치민",
    text: "베트남 호치민시 3군 응우옌티민카이가 72-74번지<br />Centec빌딩 4층 025E호<br />전화: (84-8) 3827-8888<br />팩스: (84-8) 3827-8899",
  },
  {
    id: "seoul",
    region: "asia",
    title: "서울",
    text: "서울특별시 중구 청계천로 100<br />시그니처타워 #1018<br />전화: +82 (0)2-558-2488<br />팩스: +82 (0)2-6929-4284",
  },
  {
    id: "shanghai",
    region: "asia",
    title: "상하이",
    text: "상하이 난징서로 1539번지<br />징안 케리 센터 2호관 41층<br />우편번호: 200040<br />전화: 86-21-8033-6533<br />팩스: 86-21-6237-5899",
  },
  {
    id: "shenzhen",
    region: "asia",
    title: "선전",
    text: "중국 선전 난산구 가오신난스다오 63번지<br />하이테크존 유니온 타워 43층<br />전화: 86-755-6669-8886<br />팩스: 86-755-8280-5475",
  },
  {
    id: "singapore",
    region: "asia",
    title: "싱가포르",
    text: "83 Amoy Street, #01-01<br />Singapore 069902<br />전화: +65 – 6974 1320",
  },
  {
    id: "muscat",
    region: "asia",
    title: "무스카트",
    text: "HCXF+RG4, Muscat, Oman",
  },
];

tabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabs.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const tab = btn.dataset.tab;

    if (tab === "global") {
      locationsSection.classList.add("locations--global");
      map.hidden = false;
      listBlock.hidden = true;
      renderMap();
    } else {
      locationsSection.classList.remove("locations--global");
      map.hidden = true;
      listBlock.hidden = false;
      renderList(tab);
    }
  });
});

function renderList(region) {
  const filtered = locations.filter((l) => l.region === region);

  list.innerHTML = filtered
    .map(
      (l) => `
    <div class="locations__item">
      <h3 class="h3 locations__item--title">${l.title}</h3>
      <p class="body-s locations__item--text">${l.text}</p>
    </div>
  `,
    )
    .join("");
}

let tooltip;

fetch("components/map.html")
  .then((r) => r.text())
  .then((html) => {
    document.querySelector("#locations-map").innerHTML = html;
    tooltip = document.querySelector(".map-tooltip");
    initMap();
  });

const isMobile = window.matchMedia("(max-width: 768px)").matches;

function initMap() {
  document.querySelectorAll(".map-dot").forEach((dot) => {
    if (isMobile) {
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        showTooltip(dot.dataset.id, e.pageX, e.pageY);
      });
    } else {
      dot.addEventListener("mouseenter", (e) => {
        showTooltip(dot.dataset.id, e.pageX, e.pageY);
      });

      dot.addEventListener("mouseleave", hideTooltip);
    }
  });
}

function showTooltip(id, x, y) {
  const location = locations.find((l) => l.id === id);
  if (!location) return;

  tooltip.innerHTML = `
		<p class="tags tooltip-title">${location.title}</p>
		<p class="caption tooltip-text">${location.text}</p>
	`;

  tooltip.hidden = false;

  const tooltipRect = tooltip.getBoundingClientRect();
  const padding = 16;

  let left = x + 8;
  let top = y + 8;

  if (left + tooltipRect.width > window.innerWidth) {
    left = x - tooltipRect.width - 8;
  }

  if (top + tooltipRect.height > window.innerHeight) {
    top = y - tooltipRect.height - 8;
  }

  if (left < padding) {
    left = padding;
  }

  if (top < padding) {
    top = padding;
  }

  tooltip.style.left = left + "px";
  tooltip.style.top = top + "px";
}

function hideTooltip() {
  tooltip.hidden = true;
}

document.addEventListener("click", (e) => {
  if (!tooltip || tooltip.hidden) return;

  const isDot = e.target.closest(".map-dot");
  const isTooltip = e.target.closest(".map-tooltip");

  if (!isDot && !isTooltip) {
    hideTooltip();
  }
});
