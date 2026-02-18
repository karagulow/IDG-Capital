const businesses = [
	{
		name: 'Acne Studios',
		logo: 'images/businesses/1.svg',
		sector: 'CONSUMER',
		region: 'EUROPE',
	},
	{
		name: 'Aiko Solar',
		logo: 'images/businesses/2.svg',
		sector: 'CONSUMER TECHNOLOGY',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'Andon Health',
		logo: 'images/businesses/3.png',
		sector: 'HEALTHCARE',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'Anker Innovations',
		logo: 'images/businesses/4.png',
		sector: 'CONSUMER TECHNOLOGY',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'Baidu',
		logo: 'images/businesses/5.svg',
		sector: 'CONSUMER TECHNOLOGY',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'BAMA TEA',
		logo: 'images/businesses/6.png',
		sector: 'CONSUMER',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'Bambu Lab',
		logo: 'images/businesses/7.png',
		sector: 'CONSUMER TECHNOLOGY',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'Biotyx Medical',
		logo: 'images/businesses/8.png',
		sector: 'CONSUMER TECHNOLOGY',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'ByteDance',
		logo: 'images/businesses/9.png',
		sector: 'CONSUMER TECHNOLOGY',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'Chery',
		logo: 'images/businesses/10.png',
		sector: 'CONSUMER TECHNOLOGY',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'Chi Forest',
		logo: 'images/businesses/11.png',
		sector: 'CONSUMER',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'Chiral Quest',
		logo: 'images/businesses/12.png',
		sector: 'HEALTHCARE',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'Circle',
		logo: 'images/businesses/13.svg',
		sector: 'CONSUMER TECHNOLOGY',
		region: 'AMERICAS',
	},
	{
		name: 'CNANO',
		logo: 'images/businesses/14.png',
		sector: 'CONSUMER TECHNOLOGY',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'Coinbase',
		logo: 'images/businesses/15.png',
		sector: 'CONSUMER TECHNOLOGY',
		region: 'AMERICAS',
	},
	{
		name: 'Ctrip',
		logo: 'images/businesses/16.png',
		sector: 'CONSUMER TECHNOLOGY',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'ECOVACS Robotics',
		logo: 'images/businesses/17.png',
		sector: 'CONSUMER TECHNOLOGY',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'Foxconn Industrial Internet',
		logo: 'images/businesses/18.png',
		sector: 'CONSUMER TECHNOLOGY',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'Gentle Monster',
		logo: 'images/businesses/19.png',
		sector: 'CONSUMER',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'HEYTEA',
		logo: 'images/businesses/20.png',
		sector: 'CONSUMER',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'H World Group',
		logo: 'images/businesses/21.png',
		sector: 'CONSUMER',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'Insta360',
		logo: 'images/businesses/22.svg',
		sector: 'CONSUMER TECHNOLOGY',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'Kanghui Medical',
		logo: 'images/businesses/23.png',
		sector: 'HEALTHCARE',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'Kelun-Biotech',
		logo: 'images/businesses/24.png',
		sector: 'HEALTHCARE',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'lakrids by bülow',
		logo: 'images/businesses/25.svg',
		sector: 'CONSUMER',
		region: 'EUROPE',
	},
	{
		name: 'Legendary Entertainment',
		logo: 'images/businesses/26.svg',
		sector: 'CONSUMER',
		region: 'AMERICAS',
	},
	{
		name: 'Light Chaser Animation Studios',
		logo: 'images/businesses/27.png',
		sector: 'CONSUMER',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'Lilith Games',
		logo: 'images/businesses/28.png',
		sector: 'CONSUMER',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'Luckin Coffee',
		logo: 'images/businesses/29.png',
		sector: 'CONSUMER',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'Meituan',
		logo: 'images/businesses/30.png',
		sector: 'CONSUMER TECHNOLOGY',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'Moncler',
		logo: 'images/businesses/31.svg',
		sector: 'CONSUMER',
		region: 'EUROPE',
	},
	{
		name: 'Opera',
		logo: 'images/businesses/32.svg',
		sector: 'CONSUMER TECHNOLOGY',
		region: 'EUROPE',
	},
	{
		name: 'Ping An Good Doctor',
		logo: 'images/businesses/33.png',
		sector: 'HEALTHCARE',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'Pony.ai',
		logo: 'images/businesses/34.png',
		sector: 'CONSUMER TECHNOLOGY',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'R&G / Nors Group',
		logo: 'images/businesses/35.png',
		sector: 'HEALTHCARE',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'Razer',
		logo: 'images/businesses/36.png',
		sector: 'CONSUMER',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'Rossignol',
		logo: 'images/businesses/37.svg',
		sector: 'CONSUMER',
		region: 'EUROPE',
	},
	{
		name: 'Super Sports Media',
		logo: 'images/businesses/38.png',
		sector: 'CONSUMER',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'Swiss Education Group',
		logo: 'images/businesses/39.png',
		sector: 'CONSUMER',
		region: 'EUROPE',
	},
	{
		name: 'Tencent',
		logo: 'images/businesses/40.png',
		sector: 'CONSUMER TECHNOLOGY',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'Three Squirrels',
		logo: 'images/businesses/41.png',
		sector: 'CONSUMER',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'United Solar',
		logo: 'images/businesses/42.png',
		sector: 'CONSUMER TECHNOLOGY',
		region: 'AMERICAS',
	},
	{
		name: 'Xiaomi',
		logo: 'images/businesses/43.png',
		sector: 'CONSUMER TECHNOLOGY',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'XPeng',
		logo: 'images/businesses/44.png',
		sector: 'CONSUMER TECHNOLOGY',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'Yao Hu Town',
		logo: 'images/businesses/45.png',
		sector: 'CONSUMER TECHNOLOGY',
		region: 'ASIA PACIFIC',
	},
	{
		name: 'Yoplait',
		logo: 'images/businesses/46.png',
		sector: 'CONSUMER',
		region: 'EUROPE',
	},
	{
		name: 'Zoox',
		logo: 'images/businesses/47.png',
		sector: 'AMERICAS',
		region: 'AMERICAS',
	},
];

const listEl = document.querySelector('.businesses__list');

function renderList(items) {
	listEl.innerHTML = '';

	if (!items.length) {
		listEl.innerHTML = '<li class="caption">No results</li>';
		return;
	}

	items.forEach(({ name, logo, sector, region }) => {
		const li = document.createElement('li');
		li.className = 'businesses__item';

		li.innerHTML = `
      <img class="businesses__item--logo" src="${logo}" alt="${name}" />
      <div class="businesses__item--tags">
        <p class="caption businesses__item--tag">${region.toUpperCase()}</p>
        <p class="caption businesses__item--tag">${sector.toUpperCase()}</p>
      </div>
    `;

		listEl.appendChild(li);
	});
}

const filters = {
	search: '',
	sector: 'all',
	region: 'all',
};

function applyFilters() {
	const filtered = businesses.filter(item => {
		const matchSearch = item.name.toLowerCase().includes(filters.search);

		const matchSector =
			filters.sector === 'all' ||
			item.sector.trim().toLowerCase() === filters.sector;

		const matchRegion =
			filters.region === 'all' ||
			item.region.trim().toLowerCase() === filters.region;

		return matchSearch && matchSector && matchRegion;
	});

	renderList(filtered);
}

const searchInput = document.querySelector('.businesses__search');

searchInput.addEventListener('input', e => {
	filters.search = e.target.value.trim().toLowerCase();
	applyFilters();
});

const filterGroups = document.querySelectorAll('.filter');

filterGroups.forEach(group => {
	const buttons = group.querySelectorAll('.filter__btn');
	const title = group.querySelector('.filter__title').textContent.toLowerCase();

	buttons.forEach(btn => {
		btn.addEventListener('click', () => {
			buttons.forEach(b => b.classList.remove('active'));
			btn.classList.add('active');

			const value = btn.dataset.value;

			if (title === 'sector') filters.sector = value;
			if (title === 'region') filters.region = value;

			applyFilters();
		});
	});
});

renderList(businesses);
