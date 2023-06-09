$(document).ready(function () {
  //Quantity cart right
  //click
  $(
    ".product_numberorder .quantity-pluss , .product_numberorder .quantity-reduce"
  ).on("click", function () {
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

  //Event copy voucher
  $(".voucher_copy").on("click", function(){
    alert("Bạn đã sao chép mã thành công")
  });

  //Input change
  $(".product_numberorder .number_quantity").on("input", function () {
    if ($(this).val() < 1) {
      $(this).val(1);
    }
  });

  //update html product
  async function updateHtmlProduct() {
    //Lấy id của product
    const id = localStorage.getItem("productId");
    const dataProduct = (await getProducts())[id - 1];
    const nameProduct = dataProduct.name;
    const checkSold = await heartSold(dataProduct);
    const arrImg = dataProduct.image;
    const objVariants = dataProduct.variant;
    //Update images product
    arrImg.forEach((img) => {
      $(".product_image_large .swiper-wrapper").append(`
      <div class="swiper-slide">
        <img src="${img}" alt="${nameProduct}" />
      </div>
      `);
      $(".product_image_thumb .swiper-wrapper").append(`
      <div class="swiper-slide">
        <img src="${img}" alt="${nameProduct}" />
      </div>
      `);
    });

    //Update infor product
    $(".last_breadcrum").text(nameProduct);
    $("h1.product_name").text(nameProduct);
    $(".product_type").html(`<b>Loại: </b>${dataProduct.type}`);
    $(".product_sku").html(`<b>Mã: </b>${dataProduct.sku}`);
    if (checkSold == 1) {
      //update sold out
      $(".product_quantity").html(`<b>Tình trạng: </b><span>Hết hàng</span>`);
    } else {
      $(".product_quantity").html(`<b>Tình trạng: </b><span>Còn hàng</span>`);
    }

    //update price
    $(".product_price .price").text(dataProduct.price.toLocaleString() + "đ");
    $(".product_price .old-pridce").text(
      dataProduct.oldprice.toLocaleString() + "đ"
    );

    //Update variants
    for (variants in objVariants) {
      let i = 1;
      if (variants == "color") {
        objVariants[variants].forEach(function (variant, index) {
          $(".product_variants_color .variants_options").append(`
          <div class="option position-relative d-inline-block mb-2 me-2">
            <input class="color position-absolute" type="radio" id="color${i}" data-color-variant="${variant}" name="optioncolor">
            <div class="variant_label position-relative d-inline-block">
              <div class="img position-absolute"></div>
              <label for="color${i}">Màu ${variant}</label>
            </div>
          </div>
          `);
          i++;
        });
      } else {
        objVariants[variants].forEach(function (variant, index) {
          $(".product_variants_size .variants_options").append(`
          <div class="option position-relative d-inline-block mb-2 me-2">
            <input class="size position-absolute" type="radio" id="size${variant}" name="optionsize" />
              <div class="variant_label position-relative d-inline-block">
                <label for="size${variant}">Size ${variant}</label>
              </div>
          </div>
          `);
        });
      }
    }

    //Auto checked for variant
    $(".product_variants_size .option input")[0].checked = true;
    $(".product_variants_color .option input")[0].checked = true;
  }
  updateHtmlProduct();

  //Update product related
  async function updateRelatedProducts() {
    const id = localStorage.getItem("productId");
    const dataProduct = await getProducts();
    const collections = dataProduct[id - 1].collections;
    collections.forEach((collection) => {
      dataProduct.forEach((product) => {
        if (product.collections.includes(collection)) {
          (async function () {
            //Đặt hàm vô danh để gọi luôn hàm
            const width = await heartSold(product); //async nó chỉ await được trong hàm async
            const urlParam = await diacritics(product.name);
            $(".product_relate_list .swiper-wrapper").append(`
            <div class="swiper-slide">
              <div class="product_item-related mb-2 pb-2" data-product-id="${product.id}">
                <a href="/product.html?${urlParam}" class="product_item_img position-relative d-block" href="">
                  <div class="product_img">
                    <img src="${product.image[0]}"
                      alt="" />
                  </div>
                </a>
              <div class="product_item_info">
                <div class="product_name"><a class="d-block" href="/product.html?${urlParam}">${product.name}</a></div>
                <div class="item_pricebox">
                  <div class="item_price">${product.price}</div>
                  <div class="old_price">${product.oldprice}</div>
                </div>
                <div class="heart_sale">
                  <div class="heart_sale_info position-relative">
                    <img alt="Tuli design" src="image/hotsale.gif" />
                    <span>Đã bán <b class="sale_sold">${product.sold}</b>
                      <div class="sale_sold_sp">sản phẩm</div>
                    </span>
                    <div class="heart_sale_sold position-absolute" style="width: ${width};"></div>
                  </div>
                </div>
               </div>
              </div>
             </div>
          `);
          })();
        }
      });
    });
    $(document).on(
      "click",
      ".product_relate_list .product_item_img, .product_relate_list .product_name",
      function () {
        const productId = $(this)
          .parents(".product_item-related")
          .data("productId");
        localStorage.setItem("productId", productId);
      }
    );
  }

  //Khởi tạo các swiper sau khi render HTML xong
  async function initializeSwiper() {
    await updateRelatedProducts();
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
        1200: {
          slidesPerView: 3,
          direction: "vertical",
        },
        1400: {
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
  }
  initializeSwiper();
  //Event click add cart
  $(".button_addcart, .buttonpayment ").on("click", function () {
    const productId = JSON.parse(localStorage.getItem("productId"));
    const carts = JSON.parse(localStorage.getItem("cart"));
    const value = $(".product_numberorder .number_quantity").val();
    if (carts) {
      //Đã có local storage hay chưa
      const itemCart = carts.items.find(function (cart) {
        return cart.id == productId;
      });
      if (itemCart) {
        //Nếu có id item này rồi thì tăng
        itemCart.quantity += parseInt(value);
      } else {
        //Nếu chưa thì đẩy mới
        carts.items.push({ id: productId, quantity: value });
      }
      localStorage.setItem("cart", JSON.stringify(carts));
    } else {
      //Chưa có local storage
      localStorage.setItem(
        "cart",
        JSON.stringify({ items: [{ id: productId, quantity: value }] })
      );
    } 
    updateCartRight(); //Cập nhật cart right
    updateTotalPrice(); //Cập nhật tổng giá
    countCart(); //cập nhật rổng số lượng
  });
  $(".button_addcart ").on("click", function () {
    setTimeout(function () {
      //Mở popup thêm giỏ hàng
      $(".header_main .header_cart_icon").trigger("click");
    }, 50);
  });
});
