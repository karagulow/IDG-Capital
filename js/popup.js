let activePopup = null;

document.addEventListener('click', e => {
	const openTrigger = e.target.closest('[data-popup-open]');
	if (openTrigger) {
		const popupId = openTrigger.getAttribute('data-popup-open');
		openPopup(popupId);
	}

	const closeTrigger = e.target.closest('[data-popup-close]');
	if (closeTrigger) {
		closePopup(closeTrigger.closest('.popup'));
	}

	// Close on overlay click
	if (e.target.classList.contains('popup') && e.target.classList.contains('is-open')) {
		closePopup(e.target);
	}
});

document.addEventListener('keydown', e => {
	if (e.key === 'Escape' && activePopup) {
		closePopup(activePopup);
	}
});

function openPopup(popupId) {
	const popup = document.getElementById(popupId);
	if (!popup) return;

	activePopup = popup;
	popup.classList.add('is-open');
	popup.setAttribute('aria-hidden', 'false');
	document.body.style.overflow = 'hidden';
	document.documentElement.style.overflow = 'hidden';

	updatePopupLayout(popup);
}

function closePopup(popup) {
	if (!popup) return;

	popup.classList.remove('is-open', 'is-scrollable');
	popup.setAttribute('aria-hidden', 'true');
	activePopup = null;
	document.body.style.overflow = '';
	document.documentElement.style.overflow = '';
}

function updatePopupLayout(popup) {
	const viewportHeight = window.innerHeight;
	const popupHeight = popup.scrollHeight;

	if (popupHeight > viewportHeight) {
		popup.classList.add('is-scrollable');
	} else {
		popup.classList.remove('is-scrollable');
	}
}

window.addEventListener('resize', () => {
	if (activePopup) {
		updatePopupLayout(activePopup);
	}
});
