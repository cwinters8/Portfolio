$(document).foundation();

const goHome = document.querySelector('.gohome');
if (goHome) {
    goHome.addEventListener('click', () => {
        window.location = '/';
    });
}