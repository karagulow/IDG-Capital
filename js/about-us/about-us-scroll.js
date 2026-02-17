document.addEventListener('scroll', () => {
	const paragraphs = document.querySelectorAll('.about-us__text');
	const windowHeight = window.innerHeight;

	paragraphs.forEach((paragraph, index) => {
		const rect = paragraph.getBoundingClientRect();
		const middleOfScreen = windowHeight / 2;

		if (rect.top < middleOfScreen && rect.bottom > middleOfScreen) {
			setActiveParagraph(index);
		}
	});
});

function setActiveParagraph(activeIndex) {
	const paragraphs = document.querySelectorAll('.about-us__text');

	paragraphs.forEach((paragraph, index) => {
		paragraph.classList.remove(
			'active',
			'near-active',
			'far-active',
			'furthest-active',
		);

		if (index === activeIndex) {
			paragraph.classList.add('active');
		} else if (index === activeIndex - 1 || index === activeIndex + 1) {
			paragraph.classList.add('near-active');
		} else if (index === activeIndex - 2 || index === activeIndex + 2) {
			paragraph.classList.add('far-active');
		} else {
			paragraph.classList.add('furthest-active');
		}
	});
}
