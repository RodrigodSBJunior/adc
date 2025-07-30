document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.overlay');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    
    hamburgerMenu.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        hamburgerIcon.classList.toggle('active');
    });
    
    overlay.addEventListener('click', function() {
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        hamburgerIcon.classList.remove('active');
    });
});