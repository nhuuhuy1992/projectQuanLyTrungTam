import * as $ from "jquery";

$(function(){
	$(".header-tab-item").click(function(){
		event.preventDefault();
		let tabActive = $(`#${$(this).data("id")}`)

		$(".header-tab-item").removeClass("active");
		$(this).addClass("active");

		$(".data-tab").removeClass("active");
		$(tabActive).addClass("active");

		//XỬ LÍ HIỆU ỨNG KHI CLICK VÀO CÁC NÚT LINK ĐIỀU HƯỚNG Ở NAVBAR
		$(".nav-link").click(function(){
			event.preventDefault();
			$("html,body").animate({ scrollTop: ($(this.hash).offset().top) }, 1500);
		});
		$(window).scroll(function(){
			console.log($(this).scrollTop());
			// if(){
			// 	alert('header just passed.');
			// 	// instead of alert you can use to show your ad
			// 	// something like $('#footAd').slideup();
			// }
		});
	})
})
