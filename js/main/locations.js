const tabs = document.querySelectorAll('.locations__tabs button');
const map = document.querySelector('#locations-map');
const list = document.querySelector('#locations-list');
const listBlock = document.querySelector('#locations-list-block');
const locationsSection = document.querySelector('.locations');

const locations = [
	{
		id: 'new-york',
		region: 'americas',
		title: 'New York',
		text: '1345 Avenue of Americas 33rd Floor, New York, NY 10105<br />Tel:212-337-5200',
	},
	{
		id: 'boston',
		region: 'americas',
		title: 'Boston',
		text: 'Boston University Innovate@BU<br />730 Commonwealth Ave.<br />Brookline, MA 02446',
	},
	{
		id: 'cayman',
		region: 'americas',
		title: 'Cayman',
		text: 'Boston University Innovate@BU<br />730 Commonwealth Ave.<br />Brookline, MA 02446',
	},
	{
		id: 'milan',
		region: 'europe',
		title: 'Milan',
		text: 'Boston University Innovate@BU<br />730 Commonwealth Ave.<br />Brookline, MA 02446',
	},
	{
		id: 'hong-kong',
		region: 'asia',
		title: 'Hong Kong',
		text: "Room 5505, 55 Floor, The Center<br />99 Queen's Road Central, Hong Kong<br />Tel: 852-3903 1333<br />Fax: 852-3905 5000",
	},
	{
		id: 'beijing',
		region: 'asia',
		title: 'Beijing',
		text: '6 Floor, Tower A, COFCO Plaza<br />8 Jianguomennei Ave.<br />Beijing, 100005<br />Tel: 86-10-8590-1800<br />Fax: 86-10-6526-0700',
	},
	{
		id: 'guangzhou',
		region: 'asia',
		title: 'Guangzhou',
		text: '34 Floor, South Tower, Poly International Plaza<br />1 East Pazhoudadao Guangzhou, 510308<br />Tel: 86-20-8412 0331<br />Fax: 86-20-8412 0490',
	},
	{
		id: 'hanoi',
		region: 'asia',
		title: 'Hanoi',
		text: 'V Building, 5th Floor, Unit 502<br />125-127 Ba Trieu Street, Hai Ba Trung District<br />Hanoi City, Vietnam<br />Tel: (84-4) 2220-0348<br />Fax: (84-4) 2220-0349',
	},
	{
		id: 'ho-chi-minh',
		region: 'asia',
		title: 'Ho Chi Minh',
		text: 'Unit 025E, 4th Floor, Centec Tower<br />72-74 Nguyen Thi Minh Khai Street, Ward 6, District 3<br />Ho Chi Minh city, Vietnam<br />Tel: (84-8) 3827-8888<br />Fax: (84-8) 3827-8899',
	},
	{
		id: 'seoul',
		region: 'asia',
		title: 'Seoul',
		text: 'Signature Tower #1018, 100, Cheonggyecheon-ro, Jung-gu,<br />Seoul, Korea<br />Tel: +82 (0)2-558-2488<br />Fax: +82 (0)2-6929-4284',
	},
	{
		id: 'shanghai',
		region: 'asia',
		title: 'Shanghai',
		text: '41F, Tower 2, Jing An Kerry Center 1539 West Nanjing Road,Shanghai 200040, China<br />Tel: 86-21-8033-6533<br />Fax: 86-21-6237-5899',
	},
	{
		id: 'shenzhen',
		region: 'asia',
		title: 'Shenzhen',
		text: '63 Gao Xin Nan Shi Dao (High-Tech Zone Union Tower) FL 43F<br />Nanshan District<br />Shenzhen, China<br />Tel: 86-755-6669-8886<br />Fax: 86-755-8280-5475',
	},

	{
		id: 'singapore',
		region: 'asia',
		title: 'Singapore',
		text: '83 Amoy Street, #01-01<br />Singapore 069902<br />Tel: +65 – 6974 1320',
	},
	{
		id: 'muscat',
		region: 'asia',
		title: 'Muscat',
		text: '1345 Avenue of Americas 33rd Floor, New York, NY 10105<br />Tel:212-337-5200',
	},
];

tabs.forEach(btn => {
	btn.addEventListener('click', () => {
		tabs.forEach(b => b.classList.remove('active'));
		btn.classList.add('active');

		const tab = btn.dataset.tab;

		if (tab === 'global') {
			map.hidden = false;
			listBlock.hidden = true;
			renderMap();
		} else {
			map.hidden = true;
			listBlock.hidden = false;
			renderList(tab);
		}
	});
});

function renderList(region) {
	const filtered = locations.filter(l => l.region === region);

	list.innerHTML = filtered
		.map(
			l => `
    <div class="locations__item">
      <h3 class="h3 locations__item--title">${l.title}</h3>
      <p class="body-s locations__item--text">${l.text}</p>
    </div>
  `,
		)
		.join('');
}

let tooltip;

fetch('components/map.html')
	.then(r => r.text())
	.then(html => {
		document.querySelector('#locations-map').innerHTML = html;
		tooltip = document.querySelector('.map-tooltip');
		initMap();
	});

const isMobile = window.matchMedia('(max-width: 768px)').matches;

function initMap() {
	document.querySelectorAll('.map-dot').forEach(dot => {
		if (isMobile) {
			dot.addEventListener('click', e => {
				e.stopPropagation();
				showTooltip(dot.dataset.id, e.pageX, e.pageY);
			});
		} else {
			dot.addEventListener('mouseenter', e => {
				showTooltip(dot.dataset.id, e.pageX, e.pageY);
			});

			dot.addEventListener('mouseleave', hideTooltip);
		}
	});
}

function showTooltip(id, x, y) {
	const location = locations.find(l => l.id === id);
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

	tooltip.style.left = left + 'px';
	tooltip.style.top = top + 'px';
}

function hideTooltip() {
	tooltip.hidden = true;
}

document.addEventListener('click', e => {
	if (!tooltip || tooltip.hidden) return;

	const isDot = e.target.closest('.map-dot');
	const isTooltip = e.target.closest('.map-tooltip');

	if (!isDot && !isTooltip) {
		hideTooltip();
	}
});
