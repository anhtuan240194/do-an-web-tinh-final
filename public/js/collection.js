$(document).ready(function () {
  const bannerCollection = new Swiper(".banner_collection", {
    // Optional parameters
    direction: "horizontal",
    // Navigation arrows
    slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      992: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
    },
  });

  //Click bộ lọc
  $(".show_filter").on("click", function () {
    $(".sidebar_mobile").addClass("showsidebar");
    $(".medal_fade").removeClass("d-none");
    $(this).hide();
  });
  $(".medal_fade, .button_close").on("click", function () {
    $(".sidebar_mobile").removeClass("showsidebar");
    $(this).addClass("d-none");
    $(".show_filter").show();
  });
});
