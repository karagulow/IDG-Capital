document.addEventListener('DOMContentLoaded', function () {
	const cityData = {
		hongkong: {
			name: 'Hong Kong',
			address:
				"Room 5505, 55 Floor, The Center<br>99 Queen's Road Central, Hong Kong<br>Tel: 852-3903 1333<br>Fax: 852-3905 5000",
			image: 'images/offices/hong-kong.jpg',
		},
		barcelona: {
			name: 'Barcelona',
			address: 'Avinguda Diagonal 640, P6, 08017 Barcelona',
			image: 'images/offices/barcelona.jpg',
		},
		beijing: {
			name: 'Beijing',
			address:
				'6 Floor, Tower A, COFCO Plaza<br/>8 Jianguomennei Ave.<br/>Beijing, 100005<br/>Tel: 86-10-8590-1800<br/>Fax: 86-10-6526-0700',
			image: 'images/offices/beijing.jpg',
		},
		boston: {
			name: 'Boston',
			address:
				'Boston University Innovate@BU<br/>730 Commonwealth Ave.<br/>Brookline, MA 02446',
			image: 'images/offices/boston.jpg',
		},
		cayman: {
			name: 'Cayman',
			address:
				'Suite 15, The Grand Pavilion<br/> Commercial Centre, 802 West Bay<br/> Road, Cayman Islands KY1-1206',
			image: 'images/offices/cayman.jpg',
		},
		guangzhou: {
			name: 'Guangzhou',
			address:
				'34 Floor, South Tower, Poly International Plaza<br/>1 East Pazhoudadao Guangzhou, 510308<br/>Tel: 86-20-8412 0331<br/>Fax: 86-20-8412 0490',
			image: 'images/offices/guangzhou.jpg',
		},
		muscat: {
			name: 'Muscat',
			address: 'HCXF+RG4, Muscat, Oman',
			image: 'images/offices/muscat.jpg',
		},
		newyork: {
			name: 'New York',
			address:
				'1345 Avenue of Americas 33rd Floor,<br/> New York, NY 10105<br/>Tel:212-337-5200',
			image: 'images/offices/new-york.jpg',
		},
		seoul: {
			name: 'Seoul',
			address:
				'Signature Tower #1018, 100,<br/> Cheonggyecheon-ro, Jung-gu,<br/>Seoul, Korea<br/>Tel: +82 (0)2-558-2488<br/>Fax: +82 (0)2-6929-4284',
			image: 'images/offices/seoul.jpg',
		},
		shanghai: {
			name: 'Shanghai',
			address:
				'41F, Tower 2, Jing An Kerry Center 1539<br/> West Nanjing Road,Shanghai 200040<br/>Tel: 86-21-8033-6533<br/>Fax: 86-21-6237-5899',
			image: 'images/offices/shanghai.jpg',
		},
		shenzhen: {
			name: 'Shenzhen',
			address:
				'63 Gao Xin Nan Shi Dao (High-Tech Zone<br/> Union Tower) FL 43F<br/>Nanshan District<br/>Shenzhen, China<br/>Tel: 86-755-6669-8886<br/>Fax: 86-755-8280-5475',
			image: 'images/offices/shenzhen.jpg',
		},
		singapore: {
			name: 'Singapore',
			address:
				'83 Amoy Street, #01-01<br/>Singapore 069902<br/>Tel: +65 – 6974 1320',
			image: 'images/offices/singapore.jpg',
		},
	};

	const cityItems = document.querySelectorAll('.addresses__item');
	const cityNameElement = document.querySelector('.addresses__card--city');
	const cityAddressElement = document.querySelector(
		'.addresses__card--address',
	);
	const cityImageElement = document.querySelector('.addresses__card--img');
	const cityCardElement = document.querySelector('.addresses__card');

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

				console.log('Прокрутка к карточке выполнена');
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

	function updateCardId(cityId) {
		Array.from(cityCardElement.attributes).forEach(attr => {
			if (attr.name.startsWith('data-city')) {
				cityCardElement.removeAttribute(attr.name);
			}
		});

		cityCardElement.setAttribute('data-city', cityId);
		console.log('ID на карточке обновлен:', cityId);
	}

	function updateCityContent(cityId) {
		const data = cityData[cityId];

		if (data) {
			cityNameElement.textContent = data.name;
			cityAddressElement.innerHTML = data.address;
			cityImageElement.src = data.image;
			cityImageElement.alt = `${data.name} Office`;

			updateActiveItem(cityId);
			updateCardId(cityId);

			console.log('Обновлен город:', data.name);
			return true;
		} else {
			console.log('Данные для города не найдены:', cityId);
			return false;
		}
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
			console.log('Клик по городу:', cityId);

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

	loadCityFromUrl();
});
