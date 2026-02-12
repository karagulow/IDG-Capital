const swiper = new Swiper('.stats__wrapper', {
	slidesPerView: 1.3,
	spaceBetween: 16,
	speed: 600,

	breakpoints: {
		0: {
			allowTouchMove: true,
			slidesPerView: 1.3,
		},
		480: {
			slidesPerView: 2,
		},
		1024: {
			slidesPerView: 3,
			allowTouchMove: false,
		},
	},

	navigation: {
		nextEl: '.stats__arrow-btn_next',
		prevEl: '.stats__arrow-btn_prev',
		disabledClass: 'stats__arrow-btn_disabled',
	},
});

if (window.innerWidth > 1024) {
	gsap.registerPlugin(ScrollTrigger);

	const slidesCount = swiper.slides.length;
	const scrollLength = slidesCount * window.innerHeight * 0.6;

	ScrollTrigger.create({
		trigger: '.stats',
		start: 'center center',
		end: `+=${scrollLength}`,
		pin: true,
		scrub: 0.1,
		snap: 1 / (slidesCount - 1),

		onUpdate(self) {
			swiper.setProgress(self.progress);
		},
	});
}
