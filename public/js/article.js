async function updateHTMLBlog() {
  const dataBlogs = await getBlogs();
  const id = JSON.parse(localStorage.getItem("blogId"));
  $(".title_page").text(dataBlogs[id - 1].title);
  $(".article_item_author").text(`Tác giả: ${dataBlogs[id - 1].author}`);
  $(".breadcrum_title").text(dataBlogs[id - 1].title);
  //Cập nhật list article related
  const $blogs = $.map(dataBlogs, (blog) => {
    if (blog.id !== id) {
      const blogId = blog.id;
      const title = blog.title;
      const param = diacritics(dataBlogs[blogId - 1].title);
      const $blog = $(`
          <li class="item_article_related" data-blog-id="${blogId}">
              <a href="article.html?${param}">${title}</a>
          </li>
          `);
      return $blog;
    }
  });
  $(".list_article").append($blogs);

  //Click vào item related article => update local id
  $(".item_article_related").on("click", function () { 
    const blogId = $(this).data("blog-id");
    localStorage.setItem("blogId", blogId);
  });
}
updateHTMLBlog();
