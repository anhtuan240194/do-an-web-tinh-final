//Function enabled - disabled button buynow
function enabledBuynowCartright(status, user) {
  if (status) {
    $(".cart_right_payment, .payment, .buttonpayment").removeClass(
      "disabled-click"
    );
    $(".cart_right_payment a").text("Thanh toán");
    $(".payment a").text("THANH TOÁN");
    $(".buttonpayment p").text("MUA NGAY");
    $(".buttonpayment span").text("Giao tận nơi hoặc nhận tại cửa hàng");
    $(".user_register_mb").removeClass("d-block").addClass("d-none");
    $(".user_name_mb").removeClass("d-none").text(user);
    $(".user_logout_mb, .header_account_logout").removeClass("d-none");
    $(".user_login_mb, .header_account").addClass("d-none");
  }
}

$(document).ready(function () {
  $(".header_right_search").on("click", function () {
    $(".header_box_search").slideDown(200, "linear", function () {
      $(".header_box_search").addClass("sticky");
    });
  });
  $(".modal_search ").on("click", function () {
    $(".header_box_search").slideUp(200, "linear", function () {
      $(".header_box_search").removeClass("sticky");
    });
  });

  //Sự kiện click vào giỏ hàng
  $(".header_box_search .header_cart_icon").on("click", function () {
    $(".header_main .header_cart_icon").trigger("click");
  });

  //Show menu
  $(".dropdown_nav_lv0").on("click", function () {
    $(this).siblings(".nav_list_lv0").toggleClass("d-none");
    $(this).children("span").toggleClass("d-none");
    $(this).toggleClass("fw-bold");
  });
  $(".dropdown_nav_lv1 span").on("click", function (event) {
    event.preventDefault();
    $(this).toggleClass("d-none");
    $(this).siblings("span").toggleClass("d-none");
    $(this).parent().siblings(".nav_list_lv1").toggleClass("d-none");
  });

  //Render cart khi KH quay lại web
  const firstLocal = JSON.parse(localStorage.getItem("cart"));
  if (firstLocal) {
    countCart();
    updateTotalPrice();
    updateCartRight();
  } else {
    $(".cart_right_list").append(`
        <span class="d-block no_cart_slogan">Không có sản phẩm nào</span>
    `);
  }

  //Check login disabled - enabled buy now
  let statusLogin = JSON.parse(localStorage.getItem("statusLogin")) || false;
  enabledBuynowCartright(statusLogin.status);
});

//Lấy dữ liệu product từ api
async function getProducts() {
  const resProducts = await fetch("/api/products");
  if (!resProducts.ok) throw new Error("API của products đã bị lỗi");

  //Convert dữ liệu từ dạng chuỗi json sang javascript
  const dataProducts = await resProducts.json();
  return dataProducts;
}

//Lấy dữ liệu blogs từ api
async function getBlogs() {
  const resBlogs = await fetch("/api/posts");
  if (!resBlogs.ok) throw new Error("API của products đã bị lỗi");

  //Convert dữ liệu từ dạng chuỗi json sang javascript
  const dataBlogs = await resBlogs.json();
  return dataBlogs;
}

// //setup param URL
function diacritics(name) {
  return name
    .toLowerCase()
    .replace(/[êễềếểệeẽèéẹẻ]/g, "e")
    .replace(/[đ]/g, "d")
    .replace(/[ỉĩịìí]/g, "i")
    .replace(/[ãảàáạăẵặằằẳâấầẩẫậ]/g, "a")
    .replace(/[ỷýỹỵỳ]/g, "y")
    .replace(/[uúùủũụưữựừứử]/g, "u")
    .replace(/[ôốồỗộổóòõỏọớờỡởợ]/g, "o")
    .replace(/[?,.,]/g, "")
    .replace(/ /g, "-");
}

//Calculator heart bar product
function heartSold(item) {
  return Math.floor((item.sold / item.quantity) * 100) + "%";
}

//Show product item
function showProduct(item, module) {
  const width = heartSold(item);
  const urlParam = diacritics(item.name);
  const price = item.price.toLocaleString();
  const oldPrice = item.oldprice.toLocaleString();
  const discount = Math.round((1 - item.price / item.oldprice) * 100) + "%";
  $(`${module}`).append(`
    <div class="swiper-slide">
      <div class="product_item" data-product-id="${item.id}">
        <div class="product_item_img position-relative d-block" >
        <a class="product_img d-block" href="/product.html?${urlParam}">
          <img src="${item.image[0]}" alt="${item.name}">
        </a>
        <div class="product_item_action position-absolute">
          <div class="product_action product_item_view d-block">
            <img src="/image/view.svg" alt="Xem nhanh">
          </div>

          <div class="product_action product_item_buy d-block">
            <img src="/image/cart.svg" alt="Mua ngay">
          </div>
        </div>
        <div class="tag_sale position-absolute">
          Giảm<span> ${discount}</span>
        </div>
        </div>
        <div class="product_item_info">
        <div class="product_name">
         ${item.name}
        </div>
        <div class="item_pricebox">
          <div class="item_price">${price}đ</div>
          <div class="old_price">${oldPrice}đ</div>
        </div>
        <div class="heart_sale">
          <div class="heart_sale_info position-relative">
            <img alt="Tuli design" src="image/hotsale.gif">
            <span>Đã bán <b class="sale_sold">${item.sold}</b>
             <div class="sale_sold_sp">sản phẩm</div>
            </span>
            <div class="heart_sale_sold position-absolute" style="width: ${width};"></div>
          </div>
        </div>
        </div>
      </div>
    </div>
    `);
}

//Update module product
async function updateProducts(collection, module) {
  const data = await getProducts();
  data.forEach(function (dataItem) {
    if (dataItem.collections.includes(collection)) {
      showProduct(dataItem, module);
    }
  });
}

function updateLocalStorage(productId, status) {
  const cart = JSON.parse(localStorage.getItem("cart")) || {
    items: [],
  };
  const itemCart = cart.items.find(function (item) {
    return item.id == productId;
  });
  if (status) {
    //Giảm
    itemCart.quantity--;
    if (itemCart.quantity < 1) {
      itemCart.quantity = 1;
    }
  } else if (itemCart) {
    //Nếu có thì tăng
    itemCart.quantity++;
  } else {
    //Nếu k có thì đẩy mới
    cart.items.push({ id: productId, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

//Click buy product item to set localStorage
$(document).on("click", ".product_item_buy", function () {
  const productId = $(this).parents(".product_item").data("productId");
  localStorage.setItem("productId", productId);
  setTimeout(function () {
    //Mở popup thêm giỏ hàng
    $(".header_main .header_cart_icon").trigger("click");
  }, 50);
  updateLocalStorage(productId, false);
  updateCartRight();
  updateTotalPrice();
  countCart();
});

$(document).on("click", ".product_item_img", function () {
  const productId = $(this).parents(".product_item").data("product-id");
  localStorage.setItem("productId", productId);
});

//Update cart right
async function updateCartRight() {
  const dataProducts = await getProducts();
  const dataCarts = JSON.parse(localStorage.getItem("cart")).items || [];
  const $carts = $.map(dataCarts, function (cart) {
    const id = cart.id;
    const param = diacritics(dataProducts[id - 1].name);
    const totalPrice = (
      dataProducts[id - 1].price * cart.quantity
    ).toLocaleString();
    const $cart = $(`
      <div class="cart_right_item mb-2 d-flex align-items-center" data-cart-id="${id}">
        <div class="cart_item_img">
          <a href="product.html?${param}"><img src="${
      dataProducts[id - 1].image[0]
    }" alt="${dataProducts[id - 1].name}" /></a>
        </div>
        <div class="cart_item_info ps-2">
        <a href="product.html?${param}" class="cart_item_name mb-2 d-block">${
      dataProducts[id - 1].name
    }
        </a>
        <div class="cart_item_action d-flex justify-content-between">
          <div class="cart_item_quantity">
            <span class="d-block">Số lượng</span>
            <button class="quantity-reduce" onclick ="changeQuantity(this)">-</button>
            <input class="cart_item_number_quantity text-center" type="number" value="${
              cart.quantity
            }" />
            <button class="quantity-pluss" onclick ="changeQuantity(this)">+</button>
          </div>
          <div class="cart_item_price p-2">
            <span class="d-block fw-bold"><strong class="price_item">${totalPrice}</strong>đ</span>
            <a class="cart_remove">Bỏ sản phẩm</a>
          </div>
        </div>
        </div>
        </div>
    `);
    return $cart;
  });

  //Render cart right
  $(".cart_right_list").empty().append($carts);

  //Event click item cart right
  $(".cart_item_name, .cart_item_img").on("click", function () {
    const nextId = $(this).closest(".cart_right_item").data("cart-id");
    localStorage.setItem("productId", JSON.stringify(nextId));
  });

  //Event change Input item cart right
  $(".cart_item_number_quantity").on("input", async function () {
    if ($(this).val() < 1) {
      $(this).val(1);
    }
    const value = parseInt($(this).val());
    const productId = $(this).parents(".cart_right_item").data("cart-id");
    const query = $(this);
    const dataCarts = JSON.parse(localStorage.getItem("cart"));
    const cart = dataCarts.items.find(function (cart) {
      return cart.id == productId;
    });
    cart.quantity = value;
    localStorage.setItem("cart", JSON.stringify(dataCarts));

    //Update tổng tiền trong cart right
    updatePriceItem(productId, value, query);
    updateTotalPrice();
    countCart();
  });

  if ($(".cart_right_list").text() == "") {
    $(".cart_right_list").append(`
        <span class="d-block no_cart_slogan">Không có sản phẩm nào</span>
  `);
  }
}

//Quantity cart right
//Event click + - item cart right
function changeQuantity(event) {
  const $quantity = $(event).siblings(".cart_item_number_quantity");
  const productId = $(event).parents(".cart_right_item").data("cartId");
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
  updatePriceItem(productId, $quantity.val(), $quantity);
  updateTotalPrice();
  countCart();
}

//Remove item product in list cart right
$(".cart_right_list").on("click", ".cart_remove", function () {
  const id = $(this).closest(".cart_right_item").data("cart-id");
  const currentData = JSON.parse(localStorage.getItem("cart")).items;
  //Dùng findIndex tìm id, rồi xóa bỏ phần tử đó trong local storage
  function checkId(item) {
    return item.id == id;
  }
  //Delete item in list cart right
  $(this).closest(".cart_right_item").remove();
  if ($(".cart_right_list").text() == "") {
    $(".cart_right_list").append(`
        <span class="d-block no_cart_slogan">Không có sản phẩm nào</span>
      `);
  }
  //Setup  lại local storage
  currentData.splice(currentData.findIndex(checkId), 1);
  localStorage.setItem("cart", JSON.stringify({ items: currentData }));
  updateTotalPrice();
  countCart();
});

//update price item cart right

async function updatePriceItem(id, value, query) {
  const data = await getProducts();
  const price = data[id - 1].price;
  const totalPriceItem = (price * value).toLocaleString();
  query
    .parents(".cart_item_quantity")
    .siblings(".cart_item_price")
    .find(".price_item")
    .text(totalPriceItem);
}

// price total cart right
async function updateTotalPrice() {
  const dataProducts = await getProducts();
  const dataCarts = JSON.parse(localStorage.getItem("cart")).items;
  let total = dataCarts.reduce((total, cart) => {
    const id = cart.id;
    const quantity = cart.quantity;
    return total + dataProducts[id - 1].price * quantity;
  }, 0);

  $(".total_price strong").text(total.toLocaleString() + "đ");
  return total;
}

async function countCart() {
  const dataCarts = JSON.parse(localStorage.getItem("cart")).items;
  let total = dataCarts.reduce((total, cart) => {
    return total + cart.quantity;
  }, 0); 
  return $(".header_cart_count").text(total);
}

//Event click account
$(".header_account").on("click", function (event) {
  $(".box_account_main").slideDown(200, "linear", function () {
    $(".box_account").addClass("account-sticky");
  });
});

//Ngăn chặn lan truyền sự kiện click vào box-main
$(".box_account_main").on("click", function (event) {
  event.stopPropagation();
});

$(".close_account, .box_account").on("click", function () {
  $(".box_account").removeClass("account-sticky");
  $(".box_account_success").addClass("d-none");
});

// Validate form
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Check validate form
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

//Event register
//Submit => lưu local storage account account:
// {phone: {"user":"user", "phone":"phone", "password":"password"}, phone2: { phone, password},}
$("#register").on("submit", function (event) {
  event.preventDefault();
  //Phải khai báo theo javascript vì function Validity chỉ dùng javascript
  const form = document.querySelector("#register");
  const user = $(this).find("#nameuserregister").val();
  const linkStore = $(this).find("#linkshop").val();
  const phone = $(this).find("#phoneregister").val();
  const password = $(this).find("#passwordregister").val();
  let users = JSON.parse(localStorage.getItem("account"));

  //Tận dụng luôn function checkValidity có sẵn trong boostrap
  if (form.checkValidity()) {
    if (!users) {
      //Đẩy thêm thông tin vào object
      users = { [phone]: { user, phone, password, linkStore } };
      localStorage.setItem("account", JSON.stringify(users));
      localStorage.setItem(
        "statusLogin",
        JSON.stringify({ status: true, user: user })
      );
      $(".box_account_main").slideToggle(200, function () {
        $("box_account_success").slideToggle(200);
        $(".box_account_success").removeClass("d-none");
      });
      enabledBuynowCartright(true, user); //Hiển thị các nút thanh toán
      //Đặt lại value input
      form.reset();
    } else {
      if (phone in users) {
        //Nếu đã có user này rồi
        alert(`Tài khoản ${phone} này đã được đăng ký `);
      } else {
        users[phone] = { user, phone, password, linkStore };
        $(".box_account_main").slideToggle(200, function () {
          $("box_account_success").slideToggle(200);
          $(".box_account_success").removeClass("d-none");
        });
        //Set lại kho account và đặt trạng thái login
        localStorage.setItem("account", JSON.stringify(users));
        localStorage.setItem(
          "statusLogin",
          JSON.stringify({ status: true, user: user })
        );
        enabledBuynowCartright(true, user);
        //Đặt lại value input
        form.reset();
      }
    }
  }
});

// Event login
$("#login").on("submit", function (event) {
  event.preventDefault();
  const form = document.querySelector("#login");
  const users = JSON.parse(localStorage.getItem("account"));
  const currentUser = $(this).find("#phonelogin").val();
  const currentPassword = $(this).find("#password").val();
  if (form.checkValidity()) {
    if (users) {
      //Có user
      if (currentUser in users) {
        //user đã được đăng ký
        if (users[currentUser].password == currentPassword) {
          //login success
          localStorage.setItem(
            "statusLogin",
            JSON.stringify({ status: true, user: users[currentUser].user })
          );
          $(".box_account_main").slideToggle(200, function () {
            $(".box_login_success").removeClass("d-none");
            setTimeout(function () {
              $(".box_login_success").addClass("d-none");
              $(".box_account").trigger("click");
            }, 1000);
          });

          form.reset(); //Xóa các nội dung trên form khi login thành công
          enabledBuynowCartright(true, users[currentUser].user); //Hiển thị các nút mua hàng
        } else {
          alert("Sai mật khẩu");
        }
      } else {
        alert("Tài khoản này chưa được đăng ký");
      }
    } else {
      alert("Tài khoản này chưa được đăng ký");
    }
  }
});

$(".box_account_success").on("click", function (event) {
  event.stopPropagation();
});
//Bấm ok khi đăng ký xong
$(".succes_ok").on("click", function () {
  $(".box_account").trigger("click");
  $(".box_account_success").addClass("d-none");
});

//Event login mobile
$(".user_login_mb").on("click", function () {
  $(".header_account, .btn-close").trigger("click");
});
//event Logout
$(".user_logout_mb, .header_account_logout").on("click", function () {
  localStorage.removeItem("statusLogin");
  $(".header_account_logout").addClass("d-none");
  //Tải lại trang
  location.reload();
});
