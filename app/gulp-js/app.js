function fadeOut(el){
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = 'none';
        } else {
            requestAnimationFrame(fade);
        }
    })();
}

function fadeIn(el, display){
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
}

document.addEventListener('DOMContentLoaded', function() {

    // headerScroll();

    const navFull = document.querySelector('.js-nav-full');
    const navFullToggle = document.querySelector('.js-nav-full__toggle');
    if (navFullToggle) {
        navFullToggle.addEventListener('click', function (e) {
            e.preventDefault();
            if (navFullToggle.classList.contains('nav-full__toggle_active')) {
                navFullToggle.classList.remove('nav-full__toggle_active');
                document.body.classList.remove('body-overflow');
                navFull.classList.remove('nav-full_active');
                fadeOut(navFull);
            } else {
                navFullToggle.classList.add('nav-full__toggle_active');
                document.body.classList.add('body-overflow');
                fadeIn(navFull);
                let classTimeout = setTimeout(function () {
                    navFull.classList.add('nav-full_active');
                }, 50);
            }
        });
    }
    const navFullClose = document.querySelector('.js-nav-full__close');
    if (navFullClose) {
        navFullClose.addEventListener('click', function (e) {
            e.preventDefault();
            navFullToggle.classList.remove('nav-full__toggle_active');
            document.body.classList.remove('body_overflow');
            navFull.classList.remove('nav-full_active');
            fadeOut(navFull);
        });
    }
});