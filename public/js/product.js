/* product left start */
var productLargeImage = new Swiper(".product_image_large", {
  spaceBetween: 0,
  direction: "horizontal",
  loopedSlides: 5,
  navigation: {
    nextEl: ".product_image_large .swiper-button-next",
    prevEl: ".product_image_large .swiper-button-prev",
  },
  resizeObserver: true,
});
var productThumbs = new Swiper(".product_image_thumb", {
  spaceBetween: 10,
  slideToClickedSlide: true,
  direction: "horizontal",
  slidesPerView: 3,
  loopedSlides: 5,
  breakpoints: {
    768: {
      direction: "vertical",
      slidesPerView: 3,
    },
  },
});
productLargeImage.controller.control = productThumbs;
productThumbs.controller.control = productLargeImage;
/* 	product left end */
