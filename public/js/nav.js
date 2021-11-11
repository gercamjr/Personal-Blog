const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');
const navContainer = document.querySelector('.nav__list');

auth.onAuthStateChanged((user) => {
    if (user) {
        //user is logged in
        navContainer.innerHTML += `<li class="nav__item"><a href="/admin" class="nav__link">Dashboard</a></li>
        <li class="nav__item"><a href="#" onclick="logoutUser()" class="nav__link">Logout</a></li>`
    } else {
        navContainer.innerHTML += `<li class="nav__item"><a href="/admin" class="nav__link">Login</a></li>`
    }
})

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
});