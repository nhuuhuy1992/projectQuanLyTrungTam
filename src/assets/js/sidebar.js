$(".sidebar__link").click(function() {
    event.preventDefault();
    $("html,body").animate({ scrollTop: ($(this.hash).offset().top) }, 1500);
    $(".sidebar").removeClass("active");
    $(".burger-icon").removeClass("active");
    $(".burger-icon").removeClass("active");
})
// Xử lí khi click vào nút burger - icon
var sideBar = document.querySelector(".sidebar");
var burger_icon = document.querySelector(".burger-icon");
burger_icon.addEventListener("click", function() {
    burger_icon.classList.toggle("active");
    sideBar.classList.toggle("active");
})