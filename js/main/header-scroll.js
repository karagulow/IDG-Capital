document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".nav");
  const hero =
    document.querySelector(".header") || document.querySelector(".contact-us");

  if (!header || !hero) return;

  function handleScroll() {
    const heroBottom = hero.offsetHeight;
    const scrollTop = window.scrollY || window.pageYOffset;

    if (scrollTop >= heroBottom) {
      header.classList.add("header-scroll");
      header.classList.remove("header-pre-scroll");
    } else if (scrollTop >= 10 && scrollTop < heroBottom) {
      header.classList.add("header-pre-scroll");
      header.classList.remove("header-scroll");
    } else {
      header.classList.remove("header-scroll");
      header.classList.remove("header-pre-scroll");
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
});
