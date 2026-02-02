const swiper = new Swiper('.stats__wrapper', {
	slidesPerView: 1,
	spaceBetween: 16,

	breakpoints: {
		480: {
			slidesPerView: 2,
		},
		1024: {
			slidesPerView: 3,
		},
	},

	navigation: {
		nextEl: '.stats__arrow-btn_next',
		prevEl: '.stats__arrow-btn_prev',
		disabledClass: 'stats__arrow-btn_disabled',
	},
});
