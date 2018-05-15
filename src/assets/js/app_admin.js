$(function () {
	$('[data-toggle="tooltip"]').tooltip();
	$(".table-hover tbody tr").click(function(){
		$(this).toggleClass("choose");
		if($(".table-hover tbody tr").hasClass("choose")){
			$("#btnXoaNhieuND").removeClass("disabled");
		}
		else{
			$("#btnXoaNhieuND").addClass("disabled");
		}
	})
})



