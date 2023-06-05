$(document).ready(function () {
  $(".cart_item_remove").on("click", function () {
    $(this).parents(".cart_item").remove();
    if ($(".cart_item_remove").length == 0) {
      $(".title_page").append(
        `<p class="mt-3">Bạn không có sản phẩm nào trong giỏ hàng</p>`
      );
    }
  });

  const swiperVoucher = new Swiper(".swiper_voucher", {
    // Optional parameters
    direction: "horizontal",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });
});
