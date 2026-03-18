document.addEventListener("DOMContentLoaded", function () {
  const cityData = {
    hongkong: {
      name: "香港",
      address:
        "香港中环皇后大道中99号<br>中心大厦5505室<br>电话：852-3903 1333<br>传真：852-3905 5000",
      image: "images/offices/hong-kong.jpg",
      imageMobile: "images/offices/hong-kong-mobile.jpg",
    },
    barcelona: {
      name: "巴塞罗那",
      address: "Avinguda Diagonal 640, P6, 08017 Barcelona",
      image: "images/offices/barcelona.jpg",
      imageMobile: "images/offices/barcelona-mobile.jpg",
    },
    beijing: {
      name: "北京",
      address:
        "中国北京建国门内大街8号中粮广场A座6层，100005<br>电话：86-10-8590-1800<br>传真：86-10-6526-0700",
      image: "images/offices/beijing.jpg",
      imageMobile: "images/offices/beijing-mobile.jpg",
    },
    boston: {
      name: "波士顿",
      address:
        "波士顿大学 Innovate@BU<br>730联邦大道<br>布鲁克林，MA 02446",
      image: "images/offices/boston.jpg",
      imageMobile: "images/offices/boston-mobile.jpg",
    },
    cayman: {
      name: "开曼",
      address:
        "Suite 15, The Grand Pavilion<br>Commercial Centre, 802 West Bay Road<br>Cayman Islands KY1-1206",
      image: "images/offices/cayman.jpg",
      imageMobile: "images/offices/cayman-mobile.jpg",
    },
    guangzhou: {
      name: "广州",
      address:
        "广州市保利国际广场南塔34层，510308<br>电话：86-20-8412 0331<br>传真：86-20-8412 0490",
      image: "images/offices/guangzhou.jpg",
      imageMobile: "images/offices/guangzhou-mobile.jpg",
    },
    muscat: {
      name: "马斯喀特",
      address: "HCXF+RG4, Muscat, Oman",
      image: "images/offices/muscat.jpg",
      imageMobile: "images/offices/muscat-mobile.jpg",
    },
    newyork: {
      name: "纽约",
      address:
        "1345美洲大道33楼<br>纽约，NY 10105<br>电话：212-337-5200",
      image: "images/offices/new-york.jpg",
      imageMobile: "images/offices/new-york-mobile.jpg",
    },
    seoul: {
      name: "首尔",
      address:
        "韩国首尔中区清溪川路100号<br>Signature Tower #1018<br>电话：+82 (0)2-558-2488<br>传真：+82 (0)2-6929-4284",
      image: "images/offices/seoul.jpg",
      imageMobile: "images/offices/seoul-mobile.jpg",
    },
    shanghai: {
      name: "上海",
      address:
        "上海南京西路1539号<br>静安凯瑞中心2号楼41层<br>邮政编码：200040<br>电话：86-21-8033-6533<br>传真：86-21-6237-5899",
      image: "images/offices/shanghai.jpg",
      imageMobile: "images/offices/shanghai-mobile.jpg",
    },
    shenzhen: {
      name: "深圳",
      address:
        "中国深圳南山区高新南十道63号<br>高科技区联合大厦43层<br>电话：86-755-6669-8886<br>传真：86-755-8280-5475",
      image: "images/offices/shenzhen.jpg",
      imageMobile: "images/offices/shenzhen-mobile.jpg",
    },
    singapore: {
      name: "新加坡",
      address:
        "新加坡阿莫伊街83号，#01-01<br>邮政编码：069902<br>电话：+65 – 6974 1320",
      image: "images/offices/singapore.jpg",
      imageMobile: "images/offices/singapore-mobile.jpg",
    },
  };

  const cityItems = document.querySelectorAll(".addresses__item");
  const cityNameElement = document.querySelector(".addresses__card--city");
  const cityAddressElement = document.querySelector(
    ".addresses__card--address",
  );
  const cityImageElement = document.querySelector(".addresses__card--img");
  const cityCardElement = document.querySelector(".addresses__card");
  let isAnimating = false;

  function isMobile() {
    return window.innerWidth < 640;
  }

  function getImagePath(data) {
    return isMobile() ? data.imageMobile : data.image;
  }

  function updateCityContent(cityId) {
    const data = cityData[cityId];

    if (data) {
      cityNameElement.textContent = data.name;
      cityAddressElement.innerHTML = data.address;
      cityImageElement.src = getImagePath(data);
      cityImageElement.alt = `${data.name} 办公室`;

      updateActiveItem(cityId);
      updateCardId(cityId);

      return true;
    } else {
      return false;
    }
  }

  function changeCityWithAnimation(cityId, { animate } = { animate: true }) {
    if (
      !cityCardElement ||
      !cityNameElement ||
      !cityAddressElement ||
      !cityImageElement
    ) {
      return;
    }

    if (!animate) {
      updateCityContent(cityId);
      return;
    }

    if (isAnimating) {
      return;
    }

    isAnimating = true;

    const data = cityData[cityId];
    if (!data) {
      isAnimating = false;
      return;
    }

    const newImagePath = getImagePath(data);

    const finishAnimation = () => {
      cityCardElement.classList.remove("addresses__card--fade-out");
      isAnimating = false;
    };

    setTimeout(() => {
      requestAnimationFrame(() => {
        cityNameElement.textContent = data.name;
        cityAddressElement.innerHTML = data.address;
        cityImageElement.alt = `${data.name} 办公室`;

        updateActiveItem(cityId);
        updateCardId(cityId);

        cityImageElement.src = "";
        cityImageElement.src = newImagePath;

        setTimeout(finishAnimation, 130);
      });
    }, 128);

    cityCardElement.classList.add("addresses__card--fade-out");
  }

  function handleResize() {
    const currentCityId = getCityIdFromUrl();
    const data = cityData[currentCityId];

    if (data && cityImageElement) {
      cityImageElement.src = getImagePath(data);
    }
  }

  function scrollToCard() {
    if (cityCardElement) {
      cityCardElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }

  function hasCityIdInUrl() {
    return window.location.hash.length > 1;
  }

  function getCityIdFromUrl() {
    const hash = window.location.hash.substring(1);
    return hash || "hongkong";
  }

  function updateUrl(cityId) {
    const newUrl = `${window.location.pathname}#${cityId}`;
    history.pushState({ cityId: cityId }, "", newUrl);
  }

  function updateActiveItem(cityId) {
    cityItems.forEach((item) => {
      if (item.dataset.city === cityId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  function updateCardId(cityId) {
    Array.from(cityCardElement.attributes).forEach((attr) => {
      if (attr.name.startsWith("data-city")) {
        cityCardElement.removeAttribute(attr.name);
      }
    });

    cityCardElement.setAttribute("data-city", cityId);
  }

  function loadCityFromUrl() {
    const cityId = getCityIdFromUrl();
    const success = updateCityContent(cityId);

    if (!success && cityId !== "hongkong") {
      updateUrl("hongkong");
      updateCityContent("hongkong");
    }

    if (hasCityIdInUrl()) {
      scrollToCard();
    }
  }

  cityItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      const cityId = this.dataset.city;

      updateUrl(cityId);
      changeCityWithAnimation(cityId);

      scrollToCard();
    });
  });

  window.addEventListener("popstate", function (event) {
    const cityId = getCityIdFromUrl();
    changeCityWithAnimation(cityId);

    if (hasCityIdInUrl()) {
      scrollToCard();
    }
  });

  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 150);
  });

  loadCityFromUrl();
});
