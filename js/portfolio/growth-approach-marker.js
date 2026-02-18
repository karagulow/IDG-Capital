document.addEventListener('DOMContentLoaded', function () {
	const markers = document.querySelectorAll('.growth-approach__text--marker');
	const section = document.querySelector('.growth-approach');

	const options = {
		root: null,
		threshold: 1,
	};

	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				markers[0].classList.add('visible');
				setTimeout(() => {
					markers[1].classList.add('visible');
				}, 1000);
				observer.unobserve(entry.target);
			}
		});
	}, options);

	observer.observe(section);
});
