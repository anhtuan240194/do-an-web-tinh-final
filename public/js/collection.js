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

  //Reset trạng thái lọc khi loading hoặc back page
  $(window).on("pageshow", function (event) {
      $(".filter_option input").prop("checked", false);
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

//Render các sp ra
async function renderProductsCollection(min, max, Fcolor) {
  const dataProducts = await getProducts();
  const $products = $.map(dataProducts, (product) => {
    const price = product.price;
    const oldPrice = product.oldprice;
    const colors = product.variant.color;
    const discount = Math.round((1 - price / oldPrice) * 100) + "%";
    if (max === 0 || (min <= price && price <= max)) {
      //Hoặc all product hoặc có khoảng giá
      if (colors.includes(Fcolor) || Fcolor == 0) {
        //Check có màu tương ứng không
        const $product = $(`
    <div class="col-lg-xl-3 col-lg-4 col-6 col-sm-6 col-md-6">
      <div class="product_item" data-product-id="${product.id}">
          <div class="product_item_img position-relative d-block">
              <a class="product_img d-block" href="product.html?${diacritics(
                product.name
              )}">
                  <img src="${product.image[0]}" alt="${product.name}">
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
                  ${product.name}
              </div>
              <div class="item_pricebox">
                  <div class="item_price">${price.toLocaleString()}đ</div>
                  <div class="old_price">${oldPrice.toLocaleString()}đ</div>
              </div>
              <div class="heart_sale">
                  <div class="heart_sale_info position-relative">
                      <img alt="Tuli design" src="image/hotsale.gif">
                      <span>Đã bán <b class="sale_sold">${product.sold}</b>
                          <div class="sale_sold_sp">sản phẩm</div>
                      </span>
                      <div class="heart_sale_sold position-absolute" style="width: ${heartSold(
                        product
                      )}">
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
        `);
        return $product;
      }
    }
  });
  $(".collection_summary + .row").append($products);
}
renderProductsCollection(0, 0, 0); //Render all product

//Đảm bảo chỉ 1 ô input filter được click
$(".filter-price .filter_option input").on("change", function () {
  if ($(this).is(":checked")) {
    $(".filter-price .filter_option input").not($(this)).prop("checked", false);
  }
});
$(".filter-color .filter_option input").on("change", function () {
  if ($(this).is(":checked")) {
    $(".filter-color .filter_option input").not($(this)).prop("checked", false);
  }
});

//Event filter price
$(".filter-price input").on("change", function () {
  //Check xem có ô input color nào được click k
  const colorChecked = $(".filter-color input:checked");
  let color;
  if (colorChecked.length == 0) {
    color = 0
  } else {
    color = $(colorChecked).data("filter-color");
  }
  if ($(this).is(":checked")) {
    //Nếu ô input được checked
    const min = $(this).data("price-min");
    const max = $(this).data("price-max");
    //Render lại collection
    $(".collections .row").empty();
    renderProductsCollection(min, max, color);

  } else {
    $(".collections .row").empty();
    renderProductsCollection(0, 0, color); //Render all product

  }
});

//Event filter color
$(".filter-color input").on("change", function () {
  //Check xem có ô input price nào được click k
  const priceChecked = $(".filter-price input:checked");
  let min,max;
  if (priceChecked.length == 0) {
    min = 0;
    max = 0
  } else {
    min = $(priceChecked).data("price-min");
    max = $(priceChecked).data("price-max");
  }
  if ($(this).is(":checked")) {
    //Nếu ô input được checked
    const color = $(this).data("filter-color");
    //Render lại collection
    $(".collections .row").empty();
    renderProductsCollection(min, max, color);
  } else {
    $(".collections .row").empty();
    renderProductsCollection(min, max, 0); //Render all product
  }
});
