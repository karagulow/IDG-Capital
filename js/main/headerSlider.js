const header = document.querySelector('.header');
const title = document.querySelector('.header__title');
const text = document.querySelector('.header__text');
const btn = document.querySelector('.header__btn');
const headerTabs = document.querySelectorAll('.header__tabs--btn');

const states = [
	{
		title: 'Where businesses build for the ages',
		text: 'For over 30 years, IDG Capital has stood alongside the founders and teams who dare to build lasting companies — journeying with them each step of the way',
		btnText: 'Our Story',
		btnLink: '#',
		bg: '#F2CECA',
		titleClass: 'header__title_1',
		textClass: 'header__text_1',
	},
	{
		title: 'Where shared success is our common goal',
		text: 'We work with like-minded businesses – because a shared purpose is the secret to successful partnerships',
		btnText: 'Our Value',
		btnLink: '#',
		bg: '#EEEBE7',
		titleClass: 'header__title_2',
		textClass: 'header__text_2',
	},
	{
		title: 'Where global perspective meets local strategy',
		text: 'We put our international track record at the service of your ambitions – wherever they may take you',
		btnText: 'Case Studies',
		btnLink: '#',
		bg: '#E8EBF2',
		titleClass: 'header__title_3',
		textClass: 'header__text_3',
	},
];

let current = 0;

function applyState(index) {
	const state = states[index];

	title.textContent = state.title;
	title.classList.remove(
		'header__title_1',
		'header__title_2',
		'header__title_3',
	);
	title.classList.add(state.titleClass);
	text.classList.remove('header__text_1', 'header__text_2', 'header__text_3');
	text.classList.add(state.textClass);
	text.textContent = state.text;
	btn.textContent = state.btnText;
	btn.href = state.btnLink;

	header.style.backgroundColor = state.bg;

	headerTabs.forEach((tab, i) => {
		tab.classList.toggle('is-active', i === index);
	});

	current = index;
}

headerTabs.forEach(tab => {
	tab.addEventListener('click', () => {
		applyState(Number(tab.dataset.index));
		resetAutoSwitch();
	});
});

let interval = setInterval(nextState, 3000);

function nextState() {
	const next = (current + 1) % states.length;
	applyState(next);
}

function resetAutoSwitch() {
	clearInterval(interval);
	interval = setInterval(nextState, 3000);
}

applyState(0);

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
