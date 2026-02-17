document.addEventListener('scroll', () => {
	const items = document.querySelectorAll('.history__item');
	const windowHeight = window.innerHeight;

	items.forEach((item, index) => {
		const rect = item.getBoundingClientRect();
		const middleOfScreen = windowHeight / 2;

		if (rect.top < middleOfScreen && rect.bottom > middleOfScreen) {
			setActiveItem(index);
		}
	});
});

function setActiveItem(activeIndex) {
	const items = document.querySelectorAll('.history__item');

	items.forEach((item, index) => {
		item.classList.remove('active');
	});

	items[activeIndex].classList.add('active');
}
