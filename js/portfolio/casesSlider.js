const swiper = new Swiper('.cases__wrapper', {
	slidesPerView: 1,
	spaceBetween: 16,

	breakpoints: {
		0: {
			slidesPerView: 1,
		},
		640: {
			slidesPerView: 2,
		},
		1024: {
			slidesPerView: 3,
		},
	},

	navigation: {
		nextEl: '.cases__arrow-btn_next',
		prevEl: '.cases__arrow-btn_prev',
		disabledClass: 'cases__arrow-btn_disabled',
	},
});
