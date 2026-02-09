const header = document.querySelector('.header');
const title = document.querySelector('.header__title');
const text = document.querySelector('.header__text');
const btn = document.querySelector('.header__btn');
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

function createHeaderTitle({ title, titleClass }) {
	const h1 = document.createElement('h1');
	h1.className = `accent header__title ${titleClass}`;
	h1.textContent = title;
	return h1;
}

function createHeaderText({ text, textClass }) {
	const p = document.createElement('p');
	p.className = `body-m header__text ${textClass}`;
	p.textContent = text;
	return p;
}

function createHeaderBtn({ text, href, class: extraClass }) {
	const a = document.createElement('a');
	a.href = href;
	a.textContent = text;
	a.className = `button header__btn ${extraClass || ''}`;
	return a;
}

function applyState(index) {
	const state = states[index];

	const oldTitle = document.querySelector('.header__title');
	const oldText = document.querySelector('.header__text');
	const oldBtn = document.querySelector('.header__btn');

	oldTitle.classList.add('is-changing');
	oldText.classList.add('is-changing');
	oldBtn.classList.add('is-changing');

	setTimeout(() => {
		// title
		const newTitle = createHeaderTitle(state);
		oldTitle.replaceWith(newTitle);

		// text
		const newText = createHeaderText(state);
		oldText.replaceWith(newText);

		// button
		const newBtn = createHeaderBtn(state.btn);
		oldBtn.replaceWith(newBtn);

		// bg
		header.style.backgroundColor = state.bg;

		// tabs
		headerTabs.forEach((tab, i) => {
			tab.classList.toggle('is-active', i === index);
		});

		title.classList.remove('is-changing');
		text.classList.remove('is-changing');

		current = index;
	}, 200);
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
