let ui = new firebaseui.auth.AuthUI(auth);

let login = document.querySelector('.login');

const blogSection = document.querySelector('.section__posts');

auth.onAuthStateChanged((user) => {
    if (user) {
        login.style.display = "none";
        getUserWrittenBlogs();

    } else {
        setupLoginButton();
    }

})

const setupLoginButton = () => {
    ui.start("#loginUI", {
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectURL) {
                login.style.display = "none";
                console.log(authResult);
                return false;
            }
        },
        signInFlow: "popup",
        signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
    })
}

setupLoginButton();

// fetch blogs written by one star
const getUserWrittenBlogs = () => {
    db.collection("blogs").get().then((blogs) => {
        blogs.forEach((blog) => {
            createBlog(blog);
        })
    }).catch((error) => {
        console.log("Error getting blogs");
    })
}

const createBlog = (blog) => {
    let data = blog.data();
    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="" />
        <div class="card__content">
            <time class="card__date">${data.publishedAt}</time>
            <span class="card__title">${data.title}<span>
            <div class=="card__buttons">
                <a href="/${blog.id}" class="section__posts--card--button btn dark">read</a>
                <a href="/${blog.id}/editor" class="section__posts--card--button btn grey">edit</a>
                <a href="#" onclick="deleteBlog('${blog.id}')" class="section__posts--card--button btn danger">delete</a>
            </div>
        </div>
    </div>
    `;
}

const deleteBlog = (id) => {
    db.collection("blogs").doc(id).delete().then(() => {
            location.reload();
        })
        .catch((error) => {
            console.log("Error deleting the blog");
        })
}