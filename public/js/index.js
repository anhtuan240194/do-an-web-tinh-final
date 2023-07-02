$(document).ready(function () {
  //update product for module flash sale
  updateProducts("Áo", ".flashsale_mainproduct .swiper-wrapper");
  //upodate product for module tab product
  //tab 1
  updateProducts("Hàng mới về", "#pills-product_tab1 .swiper-wrapper");
  //tab 2
  updateProducts("Thời trang hè", "#pills-product_tab2 .swiper-wrapper");
  //tab 3
  updateProducts("Bikini", "#pills-product_tab3 .swiper-wrapper");
  //tab 2
  updateProducts("Xả hàng giảm sốc", "#pills-product_tab4 .swiper-wrapper");

  //Update blogs index
  async function UpdateBlogs() {
    const dataBlogs = await getBlogs();
    const $blogs = $.map(dataBlogs, function (blog) {
      const articleParam = diacritics(blog.title);
      const $blog = $(`
      <div class="swiper-slide blog_item">
      <a class="d-inline-block position-relative" data-blog-id="${blog.id}" href="/article.html?${articleParam}" class="blog_image">
        <img src="${blog.image}"
          alt="${blog.title}" />
        <div class="blog_posttime position-absolute">
          <p class="postime_date">10</p>
          <p class="postime_month">Tháng 7</p>
        </div>
      </a>
      <div class="blog_info">
        <h3 class="blog_item_title" data-blog-id="${blog.id}">
        <a href="/article.html?${articleParam}">${blog.title}</a>
        </h3>
        <span class="blog_item_author">Đăng bởi: ${blog.author}</span>
        <p class="blog_item_summary">
        ${blog.summary}
        </p>
      </div>
      </div>
      `);
      return $blog;
    });
    $(".blog_swiper .swiper-wrapper").append($blogs);

    //Event click blog
    $(".blog_item").on("click", async function () {
      const id = $(this).find(".blog_item_title").data("blog-id");
      localStorage.setItem("blogId", JSON.stringify(id));
    });
  }
  UpdateBlogs();

  const swiperSlide = new Swiper(".slider .swiper", {
    direction: "horizontal",
    loop: true,
    autoplay: true,
    pagination: {
      el: ".slider .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".slider .swiper-button-next",
      prevEl: ".slider .swiper-button-prev",
    },
  });

  const swiperCollection = new Swiper(".collections .swiper", {
    direction: "horizontal",
    loop: true,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      375: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 8,
        spaceBetween: 10,
      },
    },
    navigation: {
      nextEl: ".collections .swiper-button-next",
      prevEl: ".collections .swiper-button-prev",
    },
  });

  const swiperFlashsale = new Swiper(".flashsale_mainproduct", {
    direction: "horizontal",
    loop: true,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      375: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 15,
      },
    },
    navigation: {
      nextEl: ".flashsale_mainproduct .swiper-button-next",
      prevEl: ".flashsale_mainproduct .swiper-button-prev",
    },
  });

  const swiperProductTab1 = new Swiper(
    "#pills-product_tab1 .main_product_tab",
    {
      direction: "horizontal",
      grid: {
        rows: 2,
        fill: "row",
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        375: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
      },
      navigation: {
        nextEl: "#pills-product_tab1 .main_product_tab.swiper-button-next",
        prevEl: "#pills-product_tab1 .main_product_tab .swiper-button-prev",
      },
    }
  );

  const swiperProductTab2 = new Swiper(
    "#pills-product_tab2 .main_product_tab",
    {
      direction: "horizontal",
      grid: {
        rows: 2,
        fill: "row",
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        375: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
      },
      navigation: {
        nextEl: "#pills-product_tab2 .main_product_tab.swiper-button-next",
        prevEl: "#pills-product_tab2 .main_product_tab .swiper-button-prev",
      },
    }
  );

  const swiperProductTab3 = new Swiper(
    "#pills-product_tab3 .main_product_tab",
    {
      direction: "horizontal",
      grid: {
        rows: 2,
        fill: "row",
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        375: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
      },
      navigation: {
        nextEl: "#pills-product_tab3 .main_product_tab.swiper-button-next",
        prevEl: "#pills-product_tab3 .main_product_tab .swiper-button-prev",
      },
    }
  );

  const swiperProductTab4 = new Swiper(
    "#pills-product_tab4 .main_product_tab",
    {
      direction: "horizontal",
      grid: {
        rows: 2,
        fill: "row",
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        375: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
      },
      navigation: {
        nextEl: "#pills-product_tab4 .main_product_tab.swiper-button-next",
        prevEl: "#pills-product_tab4 .main_product_tab .swiper-button-prev",
      },
    }
  );

  const swiperBlog = new Swiper(".blog_swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    breakpoints: {
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  //Time flash sale
  //Hàm set thời gian đếm ngược
  function setTimeFlashSale(timeReMaining) {
    const hours = Math.floor(timeReMaining / 3600);
    const minutes = Math.floor((timeReMaining - hours * 3600)/60);
    const seconds = Math.floor(timeReMaining - hours * 3600 - minutes * 60);
    $(".countdown_hours p").text(hours);
    $(".countdown_minutes p").text(minutes);
    $(".countdown_seconds p").text(seconds);
  };

  const deadLine = new Date("2023/07/05 12:00:00");
  const newDate = new Date(); 
  let timeReMaining = Math.floor((deadLine - newDate) / 1000);
  if (timeReMaining > 0) {
    setInterval(function () {
      setTimeFlashSale(timeReMaining);
      timeReMaining--;
    }, 1000);
  } else {
    setTimeFlashSale(0);
  }
});
 