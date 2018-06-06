
//particles effect
particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 100
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
