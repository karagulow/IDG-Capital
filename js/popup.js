const popup = document.getElementById('popup');

document.addEventListener('click', e => {
	if (e.target.closest('[data-popup-open]')) {
		openPopup();
	}

	if (e.target.closest('[data-popup-close]')) {
		closePopup();
	}
});

document.addEventListener('keydown', e => {
	if (e.key === 'Escape') {
		closePopup();
	}
});

function openPopup() {
	popup.classList.add('is-open');
	popup.setAttribute('aria-hidden', 'false');
	document.body.style.overflow = 'hidden';
	document.documentElement.style.overflow = 'hidden';

	updatePopupLayout();
}

function closePopup() {
	popup.classList.remove('is-open', 'is-scrollable');
	popup.setAttribute('aria-hidden', 'true');
	document.body.style.overflow = '';
	document.documentElement.style.overflow = '';
}

function updatePopupLayout() {
	const viewportHeight = window.innerHeight;
	const popupHeight = popup.scrollHeight;

	if (popupHeight > viewportHeight) {
		popup.classList.add('is-scrollable');
	} else {
		popup.classList.remove('is-scrollable');
	}
}

window.addEventListener('resize', updatePopupLayout);
