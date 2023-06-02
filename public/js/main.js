$(document).ready(function () {
  $(".header_right_search").on("click", function () {
    $(".header_box_search").addClass("sticky");
  });
  $(".modal_search ").on("click", function () {
    $(".header_box_search").removeClass("sticky");
  });

  //Sự kiện click vào giỏ hàng
  $(".header_box_search .header_cart_icon").on("click", function () {
    $(".header_main .header_cart_icon").trigger("click");
  });

  //price item cart right

  // price total cart right
  function updateTotalPrice() {
    let total = 0;
    var listPrice = $(".cart_right_list .cart_right_item .price_item");
    Array.from(listPrice).forEach(function (price) {
      total += parseInt($(price).text().replace(/\./g, ""));
    });

    $(".total_price strong").text(total.toLocaleString());
  }
  updateTotalPrice();

  //Quantity cart right
  //click
  $(".quantity-pluss , .quantity-reduce").on("click", function () {
    let $quantity = $(this).siblings(".cart_item_number_quantity");
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
  $(".cart_item_number_quantity").on("input", function () {
    if ($(this).val() < 1) {
      $(this).val(1);
    }
  });

  //Remove item product cart right
  $(".cart_remove").on("click", function () {
    $(this).closest(".cart_right_item").remove();
  });
});
