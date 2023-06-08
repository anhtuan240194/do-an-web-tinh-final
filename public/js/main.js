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
});

//Lấy dữ liệu từ api
async function getProducts() {
  const resProducts = await fetch("/api/products");
  if (!resProducts.ok) throw new Error("API của products đã bị lỗi");

  //Convert dữ liệu từ dạng chuỗi json sang javascript
  const dataProducts = await resProducts.json();
  return dataProducts;
}

//Update product
async function updateProducts(collection, module) {
  const data = await getProducts();
  data.forEach(function (dataItem) {
    if (dataItem.collections.includes(collection)) {
      showProduct(dataItem, module);
    }
  });

}
//Click product item
$(document).on("click", ".product_item", function () {
  const productId = $(this).data("productId");
  console.log(productId);
  localStorage.setItem("productId", productId);
});

//Calculator heart bar product
async function heartSold(item) {
  return Math.floor((item.sold / item.quantity) * 100) + "%";
}
//Show product item
async function showProduct(item, module) {
  const width = await heartSold(item);
  const urlParam = await diacritics(item.name);
  $(`${module}`).append(`
    <div class="swiper-slide">
      <div class="product_item" data-product-id="${item.id}">
        <a class="product_item_img position-relative d-block" href="/product.html?${urlParam}">
          <div class="product_img">
            <img src="${item.image[0]}" alt="${item.name}">
          </div>
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
        </a>
        <div class="product_item_info">
          <div class="product_name">
           ${item.name}
          </div>
          <div class="item_pricebox">
            <div class="item_price">${item.price}đ</div>
            <div class="old_price">${item.oldprice}đ</div>
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

// //setup param URL
async function diacritics(name) {
  return name
    .toLowerCase()
    .replace(/[êễềếểệeẽèéẹẻ]/g, "e")
    .replace(/[đ]/g, "d")
    .replace(/[ỉĩịìí]/g, "i")
    .replace(/[ãảàáạăẵặằằẳâấầẩẫậ]/g, "a")
    .replace(/[ỷýỹỵỳ]/g, "y")
    .replace(/[uúùủũụưữựừứử]/g, "u")
    .replace(/[ôốồỗộổóòõỏọớờỡởợ]/g, "o")
    .replace(/[?,.,]/g, "").replace(/ /g, "-");
}
