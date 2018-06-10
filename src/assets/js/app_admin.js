$(function() {
    $('[data-toggle="tooltip"]').tooltip();

    $(".sidebar__item").click(() => {
        let This = event.currentTarget;
        // console.log($(This).attr("data-tab"));
        let dataActive = $(`#${$(This).data("tab")}`);
        $(".sidebar__item").removeClass("active");
        $(This).addClass("active");

        $(".divData").removeClass("active");
        $(dataActive).addClass("active");
        event.preventDefault();
    });






})