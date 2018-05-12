//particles effect
particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 80
        },
        "color": {
            "value": "#fff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 1,
                "color": "#fff"
            }
        },
        "move": {
            "enable": true,
            "speed": 2,
            "random": true,
            "out_mode": "bounce",
            "direction": "random",
            "traight": false
        },
        "opacity": {
            "value": 0.4,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1
            }
        },
        "size": {
            "value": 3,
            "random": false,
            "anim": {
                "enable": true,
                "speed": 20
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 100,
            "color": "#b1b1b1",
            "opacity": 0.6,
            "width": 2
        }
    },
    "interactivity": {
        "events": {
            "onhover": {
                "enable": false
            },
            "onclick": {
                "enable": false
            },
            "resize": {
                "enable": true
            }
        }
    }
});
(function(window) {

    'use strict';

    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }
    //hiệu ứng form
    var hasClass, addClass, removeClass;

    if ('classList' in document.documentElement) {
        hasClass = function(elem, c) {
            return elem.classList.contains(c);
        };
        addClass = function(elem, c) {
            elem.classList.add(c);
        };
        removeClass = function(elem, c) {
            elem.classList.remove(c);
        };
    } else {
        hasClass = function(elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function(elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function(elem, c) {
            elem.className = elem.className.replace(classReg(c), ' ');
        };
    }

    function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }

    // var classie = {
    //     // full names
    //     hasClass: hasClass,
    //     addClass: addClass,
    //     removeClass: removeClass,
    //     toggleClass: toggleClass,
    //     // short names
    //     has: hasClass,
    //     add: addClass,
    //     remove: removeClass,
    //     toggle: toggleClass
    // };

    // if (typeof define === 'function' && define.amd) { define(classie); } else { window.classie = classie; }

})(window);
(function() {
    if (!String.prototype.trim) {
        (function() {
            var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            String.prototype.trim = function() {
                return this.replace(rtrim, '');
            };
        })();
    }

    [].slice.call(document.querySelectorAll('input.input__field')).forEach(function(inputEl) {
        // in case the input is already filled..
        if (inputEl.value.trim() !== '') {
            classie.add(inputEl.parentNode, 'input--filled');
        }

        // events:
        inputEl.addEventListener('focus', onInputFocus);
        inputEl.addEventListener('blur', onInputBlur);
    });

    function onInputFocus(ev) {
        classie.add(ev.target.parentNode, 'input--filled');
    }

    function onInputBlur(ev) {
        if (ev.target.value.trim() === '') {
            classie.remove(ev.target.parentNode, 'input--filled');
        }
    }
})();


//carousel
$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    navText: ["<i class='fa fa-angle-left fa-3x text-light arrow-prev arrow'></i>", "<i class='fa fa-angle-right arrow-next arrow fa-3x text-light'></i>"],
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        }
    }
})


//XỬ LÍ HIỆU ỨNG KHI CLICK VÀO CÁC NÚT LINK ĐIỀU HƯỚNG Ở NAVBAR
$(".sidebar__link").click(function() {
    event.preventDefault();
    $("html,body").animate({ scrollTop: ($(this.hash).offset().top) }, 1500);
    $(".sidebar").removeClass("active");
    $(".burger-icon").removeClass("active");
    $(".burger-icon").removeClass("active");
});

$(window).scroll(function() {});


// Xử lí khi click vào nút burger - icon
var sideBar = document.querySelector(".sidebar");
var burger_icon = document.querySelector(".burger-icon");
burger_icon.addEventListener("click", function() {
    burger_icon.classList.toggle("active");
    sideBar.classList.toggle("active");
})