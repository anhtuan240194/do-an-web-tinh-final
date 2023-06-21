const swiperVoucher = new Swiper(".swiper_voucher", {
  // Optional parameters
  direction: "horizontal",
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
});
$(document).ready(async function () {
  const total = await updateTotalPrice();
  updateBill(total);
  localStorage.removeItem("voucher");
});

//Render cart
async function renderCart() {
  if (
    localStorage.getItem("cart") == null ||
    JSON.parse(localStorage.getItem("cart")).items.length == 0
  ) {
    $(".cart_list").append(`<p>Bạn không có sản phẩm nào trong giỏ hàng</p>`);
  } else {
    const dataProducts = await getProducts();
    const dataCarts = JSON.parse(localStorage.getItem("cart")).items;
    const $carts = $.map(dataCarts, (cart) => {
      const product = dataProducts[cart.id - 1];
      const price = product.price * cart.quantity;
      const $cart = $(`
    <div class="cart_item d-flex gap-2 justify-content-between pb-3 align-items-center mb-3" data-product-id="${
      cart.id
    }">
      <img class="cart_item_img rounded-2 " src="${product.image[0]}" alt="${
        product.name
      }">
      <div class="cart_item_infor">
          <h3 class="cart_item_nameproduct fw-bold mb-1">
              ${product.name}
          </h3>
          <span class="cart_item_variant d-inline-block mb-1">Size S</span>
          <div class="cart_item_quantity">
              <button class="quantity-reduce" onclick="changeQuantityCart(this)">-</button>
              <input class="item_cart_number_quantity text-center" type="number" value="${
                cart.quantity
              }">
              <button class="quantity-pluss" onclick="changeQuantityCart(this)">+</button>
          </div>
      </div>
      <div class="cart_item_action text-end">
          <div class="cart_item_price fw-bold mb-3">${price.toLocaleString()}đ</div>
          <div class="cart_item_remove d-inline-block rounded-2">
              Xóa
          </div>
      </div>
      </div>
    `);
      return $cart;
    });
    $(".cart_list").empty().append($carts);
  }
}
renderCart();

//Hàm update giá từng item cart
async function updatePriceItemCart(id, value, m) {
  const data = await getProducts();
  const price = data[id - 1].price;
  const totalPriceItem = (price * value).toLocaleString();
  m.closest(".cart_item_infor")
    .siblings(".cart_item_action")
    .find(".cart_item_price")
    .text(totalPriceItem);
}

//Update giá đơn hàng cuối cùng
function updateBill(total) {
  const voucher = JSON.parse(localStorage.getItem("voucher"));
  const carts = JSON.parse(localStorage.getItem("cart"));
  let bill;
  if (carts.items.length == 0) {
    $(".final_price").text("0đ");
  } else if (voucher) {
    bill = (total - voucher + 30000).toLocaleString() + "đ";
  } else {
    bill = (total + 30000).toLocaleString() + "đ";
  }
  $(".final_price").text(bill);
}

//Apply voucher
$(".voucher_copy").on("click", async function () {
  const discount = $(this).data("voucher");
  await discountMoney(discount);
});

async function discountMoney(discount) {
  const total = await updateTotalPrice();
  if (total >= 1500000) {
    localStorage.setItem("voucher", discount);
    updateBill(total);
    $(".discount").text(discount.toLocaleString() + "đ");
  } else if (total < 1500000 && discount == 50000) {
    alert(
      "Mã này áp dụng cho đơn hàng trên 1500k, hãy mua thêm sản phẩm để sử dụng được mã voucher này nha <3"
    );
  } else if (total >= 1000000 && discount == 50000) {
    alert(
      "Mã này áp dụng cho đơn hàng trên 1500k, hãy mua thêm sản phẩm để sử dụng được mã voucher này nha <3"
    );
  } else if (total >= 1000000 && discount < 50000) {
    localStorage.setItem("voucher", discount);
    $(".discount").text(discount.toLocaleString() + "đ");
    updateBill(total);
  } else if (total < 1000000 && discount == 30000) {
    alert(
      "Mã này áp dụng cho đơn hàng trên 1000k, hãy mua thêm sản phẩm để sử dụng được mã voucher này nha <3"
    );
  } else if (total > 500000 && discount == 20000) {
    localStorage.setItem("voucher", discount);
    $(".discount").text(discount.toLocaleString() + "đ");
    updateBill(total);
  } else {
    alert(
      "Mã này áp dụng cho đơn hàng trên 500k, hãy mua thêm sản phẩm để sử dụng được mã voucher này nha <3"
    );
  }
}
//Event + - cart
async function changeQuantityCart(event) {
  const $quantity = $(event).siblings(".item_cart_number_quantity");
  const productId = $(event).parents(".cart_item").data("product-id");
  const currentQuantity = parseInt($quantity.val());
  if ($(event).attr("class").includes("quantity-pluss")) {
    $quantity.val(currentQuantity + 1);
    updateLocalStorage(productId, false);
  } else {
    $quantity.val(currentQuantity - 1);
    if ($quantity.val() < 1) {
      $quantity.val(1);
    }
    updateLocalStorage(productId, true);
    //update tổng tiền
  }
  updatePriceItemCart(productId, $quantity.val(), $(event));
  const total = await updateTotalPrice();
  updateBill(total);
}

//Event change Input item cart
$(".cart_list").on("input", ".item_cart_number_quantity", async function () {
  if ($(this).val() < 1) {
    $(this).val(1);
  }
  const value = parseInt($(this).val());
  const id = $(this).closest(".cart_item").data("product-id");
  const query = $(this);
  const dataCarts = JSON.parse(localStorage.getItem("cart"));
  const cart = dataCarts.items.find((cart) => {
    return cart.id == id;
  });
  cart.quantity = value;
  localStorage.setItem("cart", JSON.stringify(dataCarts));

  //Update tổng tiền trong cart right
  updatePriceItemCart(id, value, query);
  const total = await updateTotalPrice();
  updateBill(total);
});

$(".cart_list").on("click", ".cart_item_remove", async function () {
  // remove item cart
  $(this).parents(".cart_item").remove();
  if ($(".cart_item_remove").length == 0) {
    $(".cart_list").append(`<p>Bạn không có sản phẩm nào trong giỏ hàng</p>`);
    $(".discount").text("0đ"); //Set lại giá trị trong giỏ hàng
  }
  const id = $(this).closest(".cart_item").data("product-id");
  const dataCarts = JSON.parse(localStorage.getItem("cart")).items;
  function checkId(cart) {
    return cart.id == id; //tạo hàm check id
  }
  dataCarts.splice(dataCarts.findIndex(checkId), 1);

  //cập nhật lại local Storage
  localStorage.setItem("cart", JSON.stringify({ items: dataCarts }));
  const total = await updateTotalPrice();
  updateBill(total);
});

$("#form-payment").submit(function (event) {
  event.preventDefault();
});
//Sự kiện click thanh toán
$(".payment").on("click", function () {
  $(".submit_payment").trigger("click"); //Thực hiện submit form
  const form = document.querySelector("#form-payment");
  if (form.checkValidity()) {
    //Check form
    const name = $("#form-payment #name").val();
    const province = $("#province option:selected").text();
    const district = $("#district option:selected").text();
    const ward = $("#ward option:selected").text();
    const total = $(".final_price").text();
    $(".name_order").html(`<b>Người đặt: </b>${name}`);
    $(".address_order").html(
      `<b>Địa chỉ: </b>${province}, ${district}, ${ward}`
    );
    $(".order_total").html(`<b>Số tiền thanh toán: </b>${total}`);

    //show item product
    const carts = $(".cart_item");
    $orders = $.map(carts, function (cart) {
      const nameProduct = $(cart).find(".cart_item_nameproduct").text();
      const quantityProduct = $(cart).find(".item_cart_number_quantity").val();
      const $order = $(`
        <tr>
          <td>${nameProduct}</td>
          <td>${quantityProduct}</td>
        </tr>
      `);
      return $order;
    });
    $(".information_order tbody").append($orders);
    $(".box_order_success").addClass("show_class"); //hiển thị box success
  }
});
 
//Event close order
$(".close_order_success, .close_order span").on("click", function () {
  $(".box_order_success").removeClass("show_class");
});
