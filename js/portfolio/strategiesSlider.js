const buttons = document.querySelectorAll('.strategies__btn');

const strategyElement = document.querySelector('.strategy');
const title = document.querySelector('.strategy__title');
const text = document.querySelector('.strategy__text');

const advItems = document.querySelectorAll('.strategy__adv-item');
const advTitles = document.querySelectorAll('.strategy__adv-item--title');
const advTexts = document.querySelectorAll('.strategy__adv-item--text');

const caseBlock = document.querySelector('.strategy__case');
const caseText = document.querySelector('.strategy__case--text');
const teamTags = document.querySelector('.strategy__team--tags');
const teamText = document.querySelector('.strategy__team--text');
let isAnimating = false;

const strategiesData = [
	{
		title: 'We back innovation from the ground up',
		text: 'We meet you where you are to co-create solid, scalable businesses',
		advantages: [
			{
				title: 'Innovation',
				text: 'Our venture capital practice supports innovation across the company building lifecycle',
			},
			{
				title: 'find their strategic opening',
				text: 'We help entrepreneurs with find their strategic opening and then scale to their ambition – all rooted in long-term alignment of values',
			},
			{
				title: 'global perspective',
				text: 'Our global perspective and local expertise helps founders navigate markets, accelerate growth, and build exceptional companies ahead of their exit plans',
			},
		],
		caseText:
			'See how we established the Shanghai drug-innovation incubator from 2024, with 10+ pharmaceutical candidates in the current pipeline',
		teamTags: 'Your venture capital team',
		team: '9+ investors<br>15+ funds',
	},
	{
		title: 'We align to your success',
		text: 'We pursue long-term, strategic partnerships grounded in a shared commitment to excellence',
		advantages: [
			{
				title: 'Focus Sectors',
				text: 'Our investments span technology, healthcare, consumer, advanced manufacturing, and clean tech sectors.',
			},
			{
				title: 'Value Creation',
				text: 'Our approach goes beyond capital - we embed ourselves deeply into companies’ growth journeys, providing strategic support in global market expansion, operations, branding, finance, legal, and talent development.',
			},
			{
				title: 'Investment Stages',
				text: 'We invest from growth to buyout stages, aiming to unlock sustained value and craft optimal exit paths.',
			},
		],
		caseText:
			'See how we helped Moncler expand from 0 to 100 stores in Mainland China',
		teamTags: 'Your private equity team',
		team: '13+ investors<br>20+ funds',
	},
	{
		title: 'We connect the secondary markets',
		text: 'We facilitate the buying and selling of private equity stakes to unlock liquidity and new investment opportunities',
		advantages: [
			{
				title: 'Liquidity Solutions',
				text: 'We offer liquidity solutions through secondary market strategies that empower our investors and portfolio companies.',
			},
			{
				title: 'Long-Term Value',
				text: 'Our focus is on long-term value and flexibility, enabling stakeholders to optimise investment durations while ensuring capital is freed up for emerging opportunities.',
			},
		],
		// caseText: 'TEXT NEEDED',
		teamTags: 'Your Secondary Market team',
		team: '5+ investors',
	},
	{
		title: 'We create strategic outcomes',
		text: 'We execute on complex buyouts and corporate mergers rooted in a strategic alignment of interests',
		advantages: [
			{
				title: 'M&A Advisory',
				text: 'Our M&A advisory manages end-to-end deal processes including valuation, due diligence, negotiation, and execution - aligning stakeholder interests while enabling firms to scale via acquisitions or transition ownership smoothly.',
			},
		],
		caseText:
			'Recent transactions, including LAKRIDS BY BÜLOW and Yoplait China, demonstrate out capability to execute buyout transactions both internationally and in China.',
		teamTags: 'Your M&A team',
		team: '10+ investors<br>5+ industries',
	},
	{
		title: 'We bridge private and public markets',
		text: 'We take a disciplined, long-term view to managing listed equities and hybrid assets',
		advantages: [
			{
				title: 'Capital Markets',
				text: 'We support companies in accessing capital markets throughIPOs and post-IPO funding - enabling liquidity for investors and sustained growth momentum for businesses.',
			},
			{
				title: 'Lifecycle Support',
				text: 'We take a holistic approach to these investments, ensuring they integrate seamlessly with our venture and private equity strategies to provide comprehensive lifecycle support.',
			},
		],
		// caseText: '[quote from 吴挺&信华&羿焜 ]TEXT NEEDED',
		teamTags: 'Your public markets team',
		team: '8+ Investors<br>$15 Billion under management',
	},
];

function applyStrategyContent(index) {
	const data = strategiesData[index];

	if (!data) return;

	buttons.forEach(btn => btn.classList.remove('active'));
	buttons[index].classList.add('active');

	title.innerHTML = data.title;
	text.innerHTML = data.text;

	advItems.forEach((item, i) => {
		const adv = data.advantages[i];

		item.classList.remove('has-border');

		if (adv) {
			advTitles[i].innerHTML = adv.title;
			advTexts[i].innerHTML = adv.text;
			item.style.display = '';
		} else {
			item.style.display = 'none';
		}
	});

	const visibleItems = [...advItems].filter(
		item => item.style.display !== 'none',
	);

	visibleItems.slice(0, -1).forEach(item => {
		item.classList.add('has-border');
	});

	if (data.caseText) {
		caseBlock.style.display = '';
		caseText.innerHTML = data.caseText;
	} else {
		caseBlock.style.display = 'none';
	}

	teamTags.innerHTML = data.teamTags;
	teamText.innerHTML = data.team;
}

function setStrategy(index, { animate } = { animate: true }) {
	if (!strategyElement || !title || !text) {
		applyStrategyContent(index);
		return;
	}

	if (!animate) {
		applyStrategyContent(index);
		return;
	}

	if (isAnimating) {
		return;
	}

	isAnimating = true;

	const handleFadeOutEnd = event => {
		if (event.target !== strategyElement) return;

		strategyElement.removeEventListener('transitionend', handleFadeOutEnd);

		applyStrategyContent(index);

		void strategyElement.offsetWidth;

		strategyElement.classList.remove('strategy--fade-out');
		strategyElement.classList.add('strategy--fade-in');

		const handleFadeInEnd = e => {
			if (e.target !== strategyElement) return;

			strategyElement.removeEventListener('transitionend', handleFadeInEnd);
			strategyElement.classList.remove('strategy--fade-in');
			isAnimating = false;
		};

		strategyElement.addEventListener('transitionend', handleFadeInEnd);
	};

	requestAnimationFrame(() => {
		strategyElement.addEventListener('transitionend', handleFadeOutEnd);
		strategyElement.classList.add('strategy--fade-out');
	});
}

buttons.forEach((btn, index) => {
	btn.addEventListener('click', () => setStrategy(index));
});

setStrategy(0, { animate: false });
