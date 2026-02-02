const navBurger = document.querySelector('.nav__burger');
const navList = document.querySelector('.nav__list');

navBurger.addEventListener('click', () => {
	navList.classList.toggle('active');
	navBurger.classList.toggle('active');
});
