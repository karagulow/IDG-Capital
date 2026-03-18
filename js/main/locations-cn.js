const tabs = document.querySelectorAll(".locations__tabs button");
const map = document.querySelector("#locations-map");
const list = document.querySelector("#locations-list");
const listBlock = document.querySelector("#locations-list-block");
const locationsSection = document.querySelector(".locations");

const locations = [
  {
    id: "new-york",
    region: "americas",
    title: "纽约",
    text: "1345美洲大道33楼，纽约，NY 10105<br />电话：212-337-5200",
  },
  {
    id: "boston",
    region: "americas",
    title: "波士顿",
    text: "波士顿大学 Innovate@BU<br />730联邦大道<br />布鲁克林，MA 02446",
  },
  {
    id: "cayman",
    region: "americas",
    title: "开曼",
    text: "Suite 15, The Grand Pavilion Commercial Centre, 802 West Bay Road, Cayman Islands KY1-1206",
  },
  {
    id: "barcelona",
    region: "europe",
    title: "巴塞罗那",
    text: "Avinguda Diagonal 640, P6, 08017 Barcelona",
  },
  {
    id: "hong-kong",
    region: "asia",
    title: "香港",
    text: "香港中环皇后大道中99号，中心大厦5505室<br />电话：852-3903 1333<br />传真：852-3905 5000",
  },
  {
    id: "beijing",
    region: "asia",
    title: "北京",
    text: "中国北京建国门内大街8号中粮广场A座6层，100005<br />电话：86-10-8590-1800<br />传真：86-10-6526-0700",
  },
  {
    id: "guangzhou",
    region: "asia",
    title: "广州",
    text: "广州市保利国际广场南塔34层，510308<br />电话：86-20-8412 0331<br />传真：86-20-8412 0490",
  },
  {
    id: "hanoi",
    region: "asia",
    title: "河内",
    text: "越南河内市海防区<br /> 巴三街125 - 127号V大厦502单元，5层<br /> 电话：（84-4）2220-0348 <br /> 传真：（84-4）2220-0349",
  },
  {
    id: "muscat",
    region: "asia",
    title: "胡志明市",
    text: "越南胡志明市第三区阮氏明街72-74号<br /> Centec大厦4层025E单元 <br /> 电话：（84-8）3827-8888 <br /> 传真：（84-8）3827-8899",
  },
  {
    id: "seoul",
    region: "asia",
    title: "首尔",
    text: "韩国首尔中区清溪川路100号<br />Signature Tower #1018 <br />电话：+82 (0)2-558-2488 <br />传真：+82 (0)2-6929-4284",
  },
  {
    id: "shanghai",
    region: "asia",
    title: "上海",
    text: "上海南京西路1539号 <br /> 静安凯瑞中心2号楼41层 <br /> 邮政编码：200040 <br /> 电话：86-21-8033-6533 <br /> 传真：86-21-6237-5899",
  },
  {
    id: "shenzhen",
    region: "asia",
    title: "深圳",
    text: "中国深圳南山区高新南十道63号 <br /> 高科技区联合大厦43层 <br /> 电话：86-755-6669-8886 <br /> 传真：86-755-8280-5475",
  },
  {
    id: "singapore",
    region: "asia",
    title: "新加坡",
    text: "新加坡阿莫伊街83号，#01-01 <br />邮政编码：069902 <br />电话：+65 – 6974 1320",
  },
  {
    id: "muscat",
    region: "asia",
    title: "马斯喀特",
    text: "美国纽约，亚美利加大道1345号，33层 <br/> 电话：212-337 - 5200",
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
