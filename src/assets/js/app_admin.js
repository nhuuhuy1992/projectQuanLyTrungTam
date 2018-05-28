
$(function() {
    $('[data-toggle="tooltip"]').tooltip();
    // window.onload = function() {
    //     $(".table-hover tbody tr").click(function() {
    //         console.log("ata");
    //         $(this).toggleClass("choose");
    //         if ($(".table-hover tbody tr").hasClass("choose")) {
    //             $("#btnXoaNhieuND").removeClass("disabled");
    //             $("#btnXoaNhieuND").attr("disabled", false);
    //         } else {
    //             $("#btnXoaNhieuND").addClass("disabled");
    //             $("#btnXoaNhieuND").attr("disabled", true);
    //         }
    //     })
    // }


    // $('#MoTa').CKEDITOR();
    $(".sidebar__item").click( () => {
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