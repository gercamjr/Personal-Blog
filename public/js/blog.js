let slug = decodeURI(location.pathname.split("/").pop());

let docRef = db.collection("blogs").doc(slug);

docRef.get().then((doc) => {
    if (doc.exists) {
        setupBlog(doc.data());
    } else {
        location.replace("/");
    }
})

const setupBlog = (data) => {
    const banner = document.querySelector('.banner');
    const blogTitle = document.querySelector('.blog__published--title');
    const titleTag = document.querySelector('title');
    const publish = document.querySelector('.blog__published--date');

    banner.style.backgroundImage = `url(${data.bannerImage})`;

    titleTag.innerHTML += blogTitle.innerHTML = data.title;
    publish.innerHTML += data.publishedAt;
    publish.innerHTML += `-- ${data.author}`;

    auth.onAuthStateChanged((user) => {
        if (user) {
            let editBtn = document.getElementById('edit-blog-btn');
            editBtn.style.display = "inline";
            editBtn.href = `${slug}/editor`;

        } else {

        }

    })

    const article = document.querySelector('.blog__published--article');
    addArticle(article, data.article);
}

const addArticle = (ele, data) => {
    data = data.split("\n").filter(item => item.length);
    // console.log(data);

    data.forEach(item => {
        // check for heading
        if (item[0] == '#') {
            let hCount = 0;
            let i = 0;
            while (item[i] == '#') {
                hCount++;
                i++;
            }
            let tag = `h${hCount}`;
            ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`
        }
        //checking for image format
        else if (item[0] == "!" && item[1] == "[") {
            let seperator;

            for (let i = 0; i <= item.length; i++) {
                if (item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")") {
                    seperator = i;
                }
            }

            let alt = item.slice(2, seperator);
            let src = item.slice(seperator + 2, item.length - 1);
            ele.innerHTML += `
            <img src="${src}" alt="${alt}" class="blog__published--article--image">
            `;
        } else {
            ele.innerHTML += `<p>${item}</p>`;
        }
    })
}

docRef.on("child_added", function(snapshot) {
    var newPost = snapshot.val();
    $(".comments__published").prepend('<div class="comment">' +
        '<h4>' + escapeHtml(newPost.name) + '</h4>' +
        '<div class="profile-image"><img src="http://www.gravatar.com/avatar/' + escapeHtml(newPost.md5Email) + '?s=100&d=retro"/></div> ' +
        '' + moment(newPost.postedAt).fromNow() + '<p>' + escapeHtml(newPost.message) + '</p></div>');
});

document.getElementbyId("comment").submit(function() {
    docRef.push().set({
        name: $("#comment__name").val(),
        message: $("#comment__message").val(),
        md5Email: md5($("#comment__email").val()),
        postedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    $("input[type=text], textarea").val("");
    return false;
});

function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}