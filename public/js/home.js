const blogSection = document.querySelector('.section__posts');

db.collection("blogs").get().then((blogs) => {
    blogs.forEach(blog => {
        if (blog.id != decodeURI(location.pathname.split("/").pop())) {
            createBlog(blog);
        }
    })
})

const createBlog = (blog) => {
    let data = blog.data();
    blogSection.innerHTML += `
    <div class="blog-card">
  <img src="${data.bannerImage}" class="blog-image" alt="" />
  <div class="card__content">
    <time class="card__date">${data.publishedAt}</time>
    <span class="card__title">${data.title}<span>
    <a href="/${blog.id}" class="section__posts--card--button btn dark">read</a>
  </div>
</div>
    `;
}