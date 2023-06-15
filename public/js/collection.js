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

//Render các sp ra
async function renderProductsCollection() {
  const dataProducts = await getProducts();
  const $products = $.map(dataProducts, (product) => {
    const title = product.title;
    const price = product.price;
    const oldPrice = product.oldprice;
    const discount = Math.round((oldPrice / price) * 100) + "%";
    const $product = $(`
    <div class="col-lg-xl-3 col-lg-4 col-6 col-sm-6 col-md-6">
      <div class="product_item" data-product-id="${product.id}">
          <a class="product_item_img position-relative d-block" href="product.html?${diacritics(
            product.name
          )}">
              <div class="product_img">
                  <img src="${product.image[0]}" alt="${product.name}">
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
                  Giảm<span> ${discount}</span>
              </div>
          </a>
          <div class="product_item_info">
              <div class="product_name">
                  ${product.name}
              </div>
              <div class="item_pricebox">
                  <div class="item_price">${price}</div>
                  <div class="old_price">${oldPrice}</div>
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
  });
  $(".collection_summary + .row").append($products);
}
renderProductsCollection();
