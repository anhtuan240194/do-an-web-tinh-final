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
          Giảm<span> 20%</span>
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
          <img src="${dataProducts[id - 1].image[0]}" alt="${
      dataProducts[id - 1].name
    }" />
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

  $(".total_price strong").text(total.toLocaleString()+"đ");
  return total;
}

async function countCart() {
  const dataCarts = JSON.parse(localStorage.getItem("cart")).items;
  let total = dataCarts.reduce((total, cart) => {
    return total + cart.quantity;
  }, 0);
  return $(".header_cart_count").text(total);
}
