const swiper = new Swiper('.stats__wrapper', {
	slidesPerView: 1.3,
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

(() => {
	const MIN_WIDTH = 1025;
	const section = document.querySelector('.stats');
	if (!section || !swiper) return;

	let enabled = false;
	let pinned = false;
	let lockScrollY = 0;
	let scrollbarCompensation = 0;
	let lastScrollY = window.scrollY;
	let wheelAcc = 0;
	let lastSlideAt = 0;

	const canEnable = () => window.innerWidth >= MIN_WIDTH;

	const isAtStart = () => swiper.isBeginning;
	const isAtEnd = () => swiper.isEnd;

	const pin = direction => {
		if (pinned) return;

		if (direction > 0) {
			const targetY = section.offsetTop;
			window.scrollTo(0, targetY);
			lockScrollY = targetY;
		} else {
			lockScrollY = window.scrollY;
		}

		const scrollbarWidth =
			window.innerWidth - document.documentElement.clientWidth;
		if (scrollbarWidth > 0) {
			scrollbarCompensation = scrollbarWidth;
			document.body.style.paddingRight = `${scrollbarWidth}px`;
		}

		document.body.style.position = 'fixed';
		document.body.style.top = `-${lockScrollY}px`;
		document.body.style.left = '0';
		document.body.style.right = '0';
		document.body.style.width = '100%';

		pinned = true;
		wheelAcc = 0;
	};

	const unpin = direction => {
		if (!pinned) return;

		document.body.style.position = '';
		document.body.style.top = '';
		document.body.style.left = '';
		document.body.style.right = '';
		document.body.style.width = '';

		if (scrollbarCompensation) {
			document.body.style.paddingRight = '';
			scrollbarCompensation = 0;
		}

		pinned = false;

		if (direction !== 0) {
			const nudge = direction > 0 ? 1 : -1;
			window.scrollTo(0, lockScrollY + nudge);
		} else {
			window.scrollTo(0, lockScrollY);
		}
	};

	const shouldPinOnScroll = direction => {
		const rect = section.getBoundingClientRect();
		const vh = window.innerHeight || document.documentElement.clientHeight || 0;
		const viewportCenter = vh / 2;
		const sectionCenter = rect.top + rect.height / 2;
		const sectionPassedTop = rect.top <= 0 && rect.bottom > 0;

		if (direction > 0) {
			if (!sectionPassedTop) return false;
			return !isAtEnd();
		}

		if (direction < 0) {
			const CENTER_TOLERANCE = rect.height / 4;
			const distance = Math.abs(sectionCenter - viewportCenter);
			if (distance > CENTER_TOLERANCE) return false;
			return !isAtStart();
		}

		return false;
	};

	const onScroll = () => {
		if (!enabled || pinned) return;

		const y = window.scrollY;
		const direction = y > lastScrollY ? 1 : y < lastScrollY ? -1 : 0;
		lastScrollY = y;

		if (shouldPinOnScroll(direction)) pin(direction);
	};

	const onWheel = e => {
		if (!enabled) return;

		if (pinned) {
			e.preventDefault();
			if (swiper.animating) return;

			const delta = e.deltaY;
			wheelAcc += delta;

			const THRESHOLD = 60;
			const COOLDOWN_MS = 250;
			const now = Date.now();

			if (Math.abs(wheelAcc) < THRESHOLD) return;
			if (now - lastSlideAt < COOLDOWN_MS) return;

			const dir = wheelAcc > 0 ? 1 : -1;
			wheelAcc = 0;

			if (dir > 0 && isAtEnd()) {
				unpin(1);
				return;
			}
			if (dir < 0 && isAtStart()) {
				unpin(-1);
				return;
			}

			lastSlideAt = now;
			if (dir > 0) swiper.slideNext(600);
			else swiper.slidePrev(600);
			return;
		}

		const direction = e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0;
		if (direction === 0) return;
		if (shouldPinOnScroll(direction)) {
			e.preventDefault();
			pin(direction);
			wheelAcc += e.deltaY;
		}
	};

	const enable = () => {
		if (enabled) return;
		enabled = true;
		lastScrollY = window.scrollY;

		window.addEventListener('wheel', onWheel, { passive: false });
	};

	const disable = () => {
		if (!enabled) return;
		enabled = false;
		if (pinned) unpin(0);

		window.removeEventListener('wheel', onWheel);
	};

	const sync = () => {
		if (canEnable()) enable();
		else disable();
	};

	window.addEventListener('resize', sync);
	sync();
})();
