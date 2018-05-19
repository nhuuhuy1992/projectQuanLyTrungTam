$(function() {
    $('[data-toggle="tooltip"]').tooltip();
    window.onload = function() {
        $(".table-hover tbody tr").click(function() {
            console.log("ata");
            $(this).toggleClass("choose");
            if ($(".table-hover tbody tr").hasClass("choose")) {
                $("#btnXoaNhieuND").removeClass("disabled");
                $("#btnXoaNhieuND").attr("disabled", false);
            } else {
                $("#btnXoaNhieuND").addClass("disabled");
                $("#btnXoaNhieuND").attr("disabled", true);
            }
        })
    }

})