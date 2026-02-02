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
	},
	{
		title: 'Where shared success is our common goal',
		text: 'We work with like-minded businesses – because a shared purpose is the secret to successful partnerships',
		btnText: 'Our Value',
		btnLink: '#',
		bg: '#EEEBE7',
	},
	{
		title: 'Where global perspective meets local strategy',
		text: 'We put our international track record at the service of your ambitions – wherever they may take you',
		btnText: 'Case Studies',
		btnLink: '#',
		bg: '#E8EBF2',
	},
];

let current = 0;

function applyState(index) {
	const state = states[index];

	title.textContent = state.title;
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

let interval = setInterval(nextState, 15000);

function nextState() {
	const next = (current + 1) % states.length;
	applyState(next);
}

function resetAutoSwitch() {
	clearInterval(interval);
	interval = setInterval(nextState, 15000);
}

applyState(0);
