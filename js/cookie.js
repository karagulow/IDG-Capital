const banner = document.getElementById('cookie-banner');
const acceptBtn = document.getElementById('cookie-accept');

const consent = localStorage.getItem('cookie_consent');

if (!consent) {
	banner.style.display = 'flex';
}

acceptBtn.addEventListener('click', () => {
	localStorage.setItem('cookie_consent', 'accepted');
	banner.remove();
});
