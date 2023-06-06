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
