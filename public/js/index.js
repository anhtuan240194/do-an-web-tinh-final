//update product for module flash sale
updateProducts("Áo", ".flashsale_mainproduct .swiper-wrapper");
//upodate product for module tab product
//tab 1
updateProducts("Hàng mới về", "#pills-product_tab1 .swiper-wrapper");
$(document).ready(function () {
  //tab 2
    updateProducts("Thời trang hè", "#pills-product_tab2 .swiper-wrapper");
  //tab 3
    updateProducts("Bikini", "#pills-product_tab3 .swiper-wrapper");
  //tab 2
    updateProducts("Xả hàng giảm sốc", "#pills-product_tab4 .swiper-wrapper");
});

const swiperSlide = new Swiper(".slider .swiper", {
  direction: "horizontal",
  loop: true,
  pagination: {
    el: ".slider .swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".slider .swiper-button-next",
    prevEl: ".slider .swiper-button-prev",
  },
});

const swiperCollection = new Swiper(".collections .swiper", {
  direction: "horizontal",
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    375: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 8,
      spaceBetween: 10,
    },
  },
  navigation: {
    nextEl: ".collections .swiper-button-next",
    prevEl: ".collections .swiper-button-prev",
  },
});

const swiperFlashsale = new Swiper(".flashsale_mainproduct", {
  direction: "horizontal",
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    375: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
  },
  navigation: {
    nextEl: ".flashsale_mainproduct .swiper-button-next",
    prevEl: ".flashsale_mainproduct .swiper-button-prev",
  },
});

const swiperProductTab1 = new Swiper("#pills-product_tab1 .main_product_tab", {
  direction: "horizontal",
  grid: {
    rows: 2,
    fill: "row",
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    375: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
  },
  navigation: {
    nextEl: "#pills-product_tab1 .main_product_tab.swiper-button-next",
    prevEl: "#pills-product_tab1 .main_product_tab .swiper-button-prev",
  },
});

const swiperProductTab2 = new Swiper("#pills-product_tab2 .main_product_tab", {
  direction: "horizontal",
  grid: {
    rows: 2,
    fill: "row",
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    375: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
  },
  navigation: {
    nextEl: "#pills-product_tab2 .main_product_tab.swiper-button-next",
    prevEl: "#pills-product_tab2 .main_product_tab .swiper-button-prev",
  },
});

const swiperProductTab3 = new Swiper("#pills-product_tab3 .main_product_tab", {
  direction: "horizontal",
  grid: {
    rows: 2,
    fill: "row",
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    375: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
  },
  navigation: {
    nextEl: "#pills-product_tab3 .main_product_tab.swiper-button-next",
    prevEl: "#pills-product_tab3 .main_product_tab .swiper-button-prev",
  },
});

const swiperProductTab4 = new Swiper("#pills-product_tab4 .main_product_tab", {
  direction: "horizontal",
  grid: {
    rows: 2,
    fill: "row",
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    375: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
  },
  navigation: {
    nextEl: "#pills-product_tab4 .main_product_tab.swiper-button-next",
    prevEl: "#pills-product_tab4 .main_product_tab .swiper-button-prev",
  },
});
