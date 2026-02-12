const header = document.querySelector('.header');
let titleEl = document.querySelector('.header__title');
let textEl = document.querySelector('.header__text');
let btnEl = document.querySelector('.header__btn');
const headerTabs = document.querySelectorAll('.header__tabs--btn');

const states = [
	{
		title: 'Where businesses build for the ages',
		text: 'For over 30 years, IDG Capital has stood alongside the founders and teams who dare to build lasting companies — journeying with them each step of the way',
		btn: {
			text: 'Our Story',
			href: '#',
		},
		bg: '#F2CECA',
		titleClass: 'header__title_1',
		textClass: 'header__text_1',
	},
	{
		title: 'Where shared success is our common goal',
		text: 'We work with like-minded businesses – because a shared purpose is the secret to successful partnerships',
		btn: {
			text: 'Our Value',
			href: '#',
		},
		bg: '#EEEBE7',
		titleClass: 'header__title_2',
		textClass: 'header__text_2',
	},
	{
		title: 'Where global perspective meets local strategy',
		text: 'We put our international track record at the service of your ambitions – wherever they may take you',
		btn: {
			text: 'Case Studies',
			href: '#',
		},
		bg: '#E8EBF2',
		titleClass: 'header__title_3',
		textClass: 'header__text_3',
	},
];

let current = 0;
let pendingTimeout = null;
const TRANSITION_MS = 350;

function updateContent(state) {
	titleEl.className = `accent header__title ${state.titleClass}`;
	titleEl.textContent = state.title;

	textEl.className = `body-l header__text ${state.textClass}`;
	textEl.textContent = state.text;

	btnEl.textContent = state.btn.text;
	btnEl.href = state.btn.href;
}

function applyState(index, { immediate = false } = {}) {
	const state = states[index];

	if (pendingTimeout) clearTimeout(pendingTimeout);

	const applyShared = () => {
		header.style.backgroundColor = state.bg;

		headerTabs.forEach((tab, i) => {
			tab.classList.toggle('is-active', i === index);
		});

		current = index;
	};

	if (immediate) {
		updateContent(state);
		applyShared();
		return;
	}

	if (index === current) return;

	[titleEl, textEl, btnEl].forEach(el => el && el.classList.add('is-changing'));

	pendingTimeout = setTimeout(() => {
		updateContent(state);
		applyShared();

		requestAnimationFrame(() => {
			[titleEl, textEl, btnEl].forEach(
				el => el && el.classList.remove('is-changing'),
			);
		});
	}, TRANSITION_MS);
}

headerTabs.forEach(tab => {
	tab.addEventListener('click', () => {
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

applyState(0, { immediate: true });

let touchStartX = 0;
let touchEndX = 0;
const SWIPE_THRESHOLD = 50;

header.addEventListener(
	'touchstart',
	e => {
		touchStartX = e.changedTouches[0].clientX;
	},
	{ passive: true },
);

header.addEventListener('touchend', e => {
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
