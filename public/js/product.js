const thumbnail = new Swiper(".product_image_thumb", {
  // Optional parameters
  direction: "horizontal",
  slidesPerView: 5,
  spaceBetween: 7,
  watchSlidesProgress: true,
  breakpoints: {
    320: {
      slidesPerView: 5,
      direction: "horizontal",
    },
    768: {
      slidesPerView: 4,
      direction: "horizontal",
    },
    992: {
      slidesPerView: 4,
      direction: "vertical",
    },
  },
});

const largeImg = new Swiper(".product_image_large", {
  // Optional parameters
  direction: "horizontal",
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: thumbnail,
  },
});

const relatedProduct = new Swiper(".product_relate_list", {
  // Optional parameters
  direction: "horizontal",
  slidesPerView: 3,
  spaceBetween: 10,
  watchSlidesProgress: true,
  breakpoints: {
    320: {
      slidesPerView: 2,
      direction: "horizontal",
    },
    768: {
      slidesPerView: 3,
      direction: "horizontal",
    },
    1200: {
      slidesPerView: 3,
      direction: "vertical",
    },
  },
});

const swiperVoucher = new Swiper(".swiper_voucher", {
  // Optional parameters
  direction: "horizontal",
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  breakpoints: {
    992: {
      direction: "horizontal",
      slidesPerView: 3,
    },
    1200: {
      direction: "vertical",
      slidesPerView: 3,
    },
  },
});

//Quantity cart right
//click
$(".quantity-pluss , .quantity-reduce").on("click", function () {
  let $quantity = $(this).siblings(".number_quantity");
  let currentQuantity = parseInt($quantity.val());
  if ($(this).attr("class").includes("quantity-pluss")) {
    $quantity.val(currentQuantity + 1);
  } else {
    $quantity.val(currentQuantity - 1);
    //Set giá trị min
    if ($quantity.val() < 1) {
      $quantity.val(1);
    }
  }
});

//Input change
$(".number_quantity").on("input", function () {
  if ($(this).val() < 1) {
    $(this).val(1);
  }
});
