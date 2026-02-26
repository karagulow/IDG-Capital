document.addEventListener('DOMContentLoaded', function () {
	const cityData = {
		hongkong: {
			name: 'Hong Kong',
			address:
				"Room 5505, 55 Floor, The Center<br>99 Queen's Road Central, Hong Kong<br>Tel: 852-3903 1333<br>Fax: 852-3905 5000",
			image: 'images/offices/hong-kong.jpg',
			imageMobile: 'images/offices/hong-kong-mobile.jpg',
		},
		barcelona: {
			name: 'Barcelona',
			address: 'Avinguda Diagonal 640, P6, 08017 Barcelona',
			image: 'images/offices/barcelona.jpg',
			imageMobile: 'images/offices/barcelona-mobile.jpg',
		},
		beijing: {
			name: 'Beijing',
			address:
				'6 Floor, Tower A, COFCO Plaza<br/>8 Jianguomennei Ave.<br/>Beijing, 100005<br/>Tel: 86-10-8590-1800<br/>Fax: 86-10-6526-0700',
			image: 'images/offices/beijing.jpg',
			imageMobile: 'images/offices/beijing-mobile.jpg',
		},
		boston: {
			name: 'Boston',
			address:
				'Boston University Innovate@BU<br/>730 Commonwealth Ave.<br/>Brookline, MA 02446',
			image: 'images/offices/boston.jpg',
			imageMobile: 'images/offices/boston-mobile.jpg',
		},
		cayman: {
			name: 'Cayman',
			address:
				'Suite 15, The Grand Pavilion<br/> Commercial Centre, 802 West Bay<br/> Road, Cayman Islands KY1-1206',
			image: 'images/offices/cayman.jpg',
			imageMobile: 'images/offices/cayman-mobile.jpg',
		},
		guangzhou: {
			name: 'Guangzhou',
			address:
				'34 Floor, South Tower, Poly International Plaza<br/>1 East Pazhoudadao Guangzhou, 510308<br/>Tel: 86-20-8412 0331<br/>Fax: 86-20-8412 0490',
			image: 'images/offices/guangzhou.jpg',
			imageMobile: 'images/offices/guangzhou-mobile.jpg',
		},
		muscat: {
			name: 'Muscat',
			address: 'HCXF+RG4, Muscat, Oman',
			image: 'images/offices/muscat.jpg',
			imageMobile: 'images/offices/muscat-mobile.jpg',
		},
		newyork: {
			name: 'New York',
			address:
				'1345 Avenue of Americas 33rd Floor,<br/> New York, NY 10105<br/>Tel:212-337-5200',
			image: 'images/offices/new-york.jpg',
			imageMobile: 'images/offices/new-york-mobile.jpg',
		},
		seoul: {
			name: 'Seoul',
			address:
				'Signature Tower #1018, 100,<br/> Cheonggyecheon-ro, Jung-gu,<br/>Seoul, Korea<br/>Tel: +82 (0)2-558-2488<br/>Fax: +82 (0)2-6929-4284',
			image: 'images/offices/seoul.jpg',
			imageMobile: 'images/offices/seoul-mobile.jpg',
		},
		shanghai: {
			name: 'Shanghai',
			address:
				'41F, Tower 2, Jing An Kerry Center 1539<br/> West Nanjing Road,Shanghai 200040<br/>Tel: 86-21-8033-6533<br/>Fax: 86-21-6237-5899',
			image: 'images/offices/shanghai.jpg',
			imageMobile: 'images/offices/shanghai-mobile.jpg',
		},
		shenzhen: {
			name: 'Shenzhen',
			address:
				'63 Gao Xin Nan Shi Dao (High-Tech Zone<br/> Union Tower) FL 43F<br/>Nanshan District<br/>Shenzhen, China<br/>Tel: 86-755-6669-8886<br/>Fax: 86-755-8280-5475',
			image: 'images/offices/shenzhen.jpg',
			imageMobile: 'images/offices/shenzhen-mobile.jpg',
		},
		singapore: {
			name: 'Singapore',
			address:
				'83 Amoy Street, #01-01<br/>Singapore 069902<br/>Tel: +65 – 6974 1320',
			image: 'images/offices/singapore.jpg',
			imageMobile: 'images/offices/singapore-mobile.jpg',
		},
	};

	function createCityCard(cityId) {
		const data = cityData[cityId];

		const card = document.createElement('div');
		card.className = 'addresses__card-inner';
		card.dataset.city = cityId;

		card.innerHTML = `
		<div class="addresses__card--content">
			<h1 class="h1 addresses__card--city">${data.name}</h1>
			<p class="body-m addresses__card--address">
				${data.address}
			</p>
		</div>
		<img
			class="addresses__card--img"
			src="${getImagePath(data)}"
			alt="${data.name} Office"
		/>
	`;

		return card;
	}

	const cityItems = document.querySelectorAll('.addresses__item');
	const cityCardElement = document.querySelector('.addresses__card');

	function isMobile() {
		return window.innerWidth < 640;
	}

	function getImagePath(data) {
		return isMobile() ? data.imageMobile : data.image;
	}

	function updateCityContent(cityId) {
		const data = cityData[cityId];
		if (!data) return false;

		const oldCard = cityCardElement.querySelector('.addresses__card-inner');
		const newCard = createCityCard(cityId);

		newCard.classList.add('is-changing');
		cityCardElement.appendChild(newCard);

		newCard.offsetHeight;

		requestAnimationFrame(() => {
			newCard.classList.remove('is-changing');
		});

		if (oldCard) {
			oldCard.classList.add('is-changing');

			oldCard.addEventListener('transitionend', () => oldCard.remove(), {
				once: true,
			});
		}

		updateActiveItem(cityId);

		return true;
	}

	function handleResize() {
		const card = cityCardElement.querySelector('.addresses__card-inner');
		if (!card) return;

		const cityId = card.dataset.city;
		const img = card.querySelector('.addresses__card--img');

		if (img && cityData[cityId]) {
			img.src = getImagePath(cityData[cityId]);
		}
	}

	function scrollToCard() {
		if (cityCardElement) {
			setTimeout(() => {
				cityCardElement.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
					inline: 'nearest',
				});

				setTimeout(() => {
					cityCardElement.style.boxShadow = 'none';
				}, 2000);
			}, 300);
		}
	}

	function hasCityIdInUrl() {
		return window.location.hash.length > 1;
	}

	function getCityIdFromUrl() {
		const hash = window.location.hash.substring(1);
		return hash || 'hongkong';
	}

	function updateUrl(cityId) {
		const newUrl = `${window.location.pathname}#${cityId}`;
		history.pushState({ cityId: cityId }, '', newUrl);
	}

	function updateActiveItem(cityId) {
		cityItems.forEach(item => {
			if (item.dataset.city === cityId) {
				item.classList.add('active');
			} else {
				item.classList.remove('active');
			}
		});
	}

	function loadCityFromUrl() {
		const cityId = getCityIdFromUrl();
		const success = updateCityContent(cityId);

		if (!success && cityId !== 'hongkong') {
			updateUrl('hongkong');
			updateCityContent('hongkong');
		}

		if (hasCityIdInUrl()) {
			scrollToCard();
		}
	}

	cityItems.forEach(item => {
		item.addEventListener('click', function (e) {
			const cityId = this.dataset.city;

			updateUrl(cityId);
			updateCityContent(cityId);

			scrollToCard();
		});
	});

	window.addEventListener('popstate', function (event) {
		const cityId = getCityIdFromUrl();
		updateCityContent(cityId);

		if (hasCityIdInUrl()) {
			scrollToCard();
		}
	});

	let resizeTimeout;
	window.addEventListener('resize', function () {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(handleResize, 150);
	});

	loadCityFromUrl();
});
