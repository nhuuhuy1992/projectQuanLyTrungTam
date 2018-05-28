
$(function() {
    $('[data-toggle="tooltip"]').tooltip();
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

// CKEDITOR.replace('#MoTa', {
//     plugins: [ Essentials, Paragraph, Bold, Italic ],
//     toolbar: [ 'bold', 'italic' ]
// } )
// .then( editor => {
//     console.log( 'Editor was initialized', editor );
// } )
// .catch( error => {
//     console.error( error.stack );
// });
//     // $('#MoTa').CKEDITOR();
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