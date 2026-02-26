const buttons = document.querySelectorAll('.strategies__btn');

const title = document.querySelector('.strategy__title');
const text = document.querySelector('.strategy__text');

const advItems = document.querySelectorAll('.strategy__adv-item');
const advTitles = document.querySelectorAll('.strategy__adv-item--title');
const advTexts = document.querySelectorAll('.strategy__adv-item--text');

const caseText = document.querySelector('.strategy__case--text');
const teamTags = document.querySelector('.strategy__team--tags');
const teamText = document.querySelector('.strategy__team--text');

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
		caseText: '[quote from 吴挺&信华&羿焜 ]TEXT NEEDED',
		teamTags: 'Your public markets team',
		team: '8+ Investors<br>$15 Billion under management',
	},
];

function createStrategy(index) {
	const data = strategiesData[index];
	if (!data) return null;

	const hasCase = Boolean(data.caseText);

	const wrapper = document.createElement('div');
	wrapper.className = 'strategy__inner';
	wrapper.dataset.index = index;

	wrapper.innerHTML = `
		<h2 class="h2 strategy__title">${data.title}</h2>
		<p class="body-m strategy__text">${data.text}</p>

		<div class="strategy__content">
			<ul class="strategy__adv-list">
				${data.advantages
					.map(
						(item, i) => `
						<li class="strategy__adv-item ${
							i < data.advantages.length - 1 ? 'has-border' : ''
						}">
							<p class="tags strategy__adv-item--title">${item.title}</p>
							<p class="body-m strategy__adv-item--text">${item.text}</p>
						</li>
					`,
					)
					.join('')}
			</ul>

			<div class="strategy__right">
				${
					hasCase
						? `
					<div class="strategy__case">
						<p class="h3 strategy__case--text">${data.caseText}</p>
						<button class="strategy__case--link" type="button" data-popup-open>
							<p class="button">See case study</p>
							<svg
								width="16"
								height="14"
								viewBox="0 0 16 14"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M1 6.5C0.723858 6.5 0.5 6.72386 0.5 7C0.5 7.27614 0.723858 7.5 1 7.5V7V6.5ZM15.3536 7.35355C15.5488 7.15829 15.5488 6.84171 15.3536 6.64645L12.1716 3.46447C11.9763 3.2692 11.6597 3.2692 11.4645 3.46447C11.2692 3.65973 11.2692 3.97631 11.4645 4.17157L14.2929 7L11.4645 9.82843C11.2692 10.0237 11.2692 10.3403 11.4645 10.5355C11.6597 10.7308 11.9763 10.7308 12.1716 10.5355L15.3536 7.35355ZM1 7V7.5H15V7V6.5H1V7Z"
									fill="#26292F"
								/>
							</svg>
						</button>
					</div>
				`
						: ''
				}

				<div class="strategy__team">
					<p class="tags strategy__team--tags">${data.teamTags}</p>
					<p class="h3 strategy__team--text">${data.team}</p>
				</div>
			</div>
		</div>
	`;

	return wrapper;
}

const strategyContainer = document.querySelector('.strategy');

function setStrategy(index) {
	const newStrategy = createStrategy(index);
	if (!newStrategy) return;

	const oldStrategy = strategyContainer.querySelector('.strategy__inner');

	newStrategy.classList.add('is-changing');
	strategyContainer.appendChild(newStrategy);

	newStrategy.offsetHeight;

	requestAnimationFrame(() => {
		newStrategy.classList.remove('is-changing');
	});

	if (oldStrategy) {
		oldStrategy.classList.add('is-changing');
		oldStrategy.addEventListener('transitionend', () => oldStrategy.remove(), {
			once: true,
		});
	}

	buttons.forEach(btn => btn.classList.remove('active'));
	buttons[index].classList.add('active');
}

buttons.forEach((btn, index) => {
	btn.addEventListener('click', () => setStrategy(index));
});

setStrategy(0);
