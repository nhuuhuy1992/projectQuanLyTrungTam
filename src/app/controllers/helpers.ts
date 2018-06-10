import * as $ from "jquery";
import swal from "sweetalert2";


 function suaKhiClickVaoRow(thisTR, obj ,thisAttr){
	let tr = document.querySelectorAll(thisTR);
	for(let i = 0; i < tr.length; i++){
		tr[i].addEventListener("click", function() {
			if($(event.target).attr("type") === "checkbox" || $(event.target).attr("type") === "button"){
				return false;
			}
			else{
				$($(`#btnSua${obj}_${$(this).attr(thisAttr)}`)).trigger("click");
			}
		})
	}
}
 function resetForm(str){
	if(str === "formKH"){
		$('#MaKhoaHoc').val('');
		$('#TenKhoaHoc').val('');
		$('#MoTa').froalaEditor('html.set','');
		$('#HinhAnh').val('');
		$('#LuotXem').val('')
		$('#NguoiTao').val('');
		$('#MaKhoaHoc').attr('disabled',false);
	}
	else if(str === "formND"){
		$("#TaiKhoanND").val("");
		$("#MatKhauND").val("");
		$("#HoTenND").val("");
		$("#EmailND").val("");
		$("#SoDTND").val("");
	}
}
 function alertSuccess(noti){
	return swal({
		type:  'success',
		title: `${noti}`,
	})
}
 function alertFail(noti){
	return swal({
		type: 'error',
		title: `${noti}`,
	})
}
 function alertDangXuat(){
	return swal({
		title: '<strong>Bạn Muốn Đăng Xuất?</strong>',
		type: 'warning',
		showCloseButton: true,
		showCancelButton: true,
		focusConfirm: false,
		confirmButtonText:
		'<i class="fa fa-thumbs-up"></i>Yes!',
		cancelButtonText:
		'<i class="fa fa-thumbs-down"></i> No!',
		cancelButtonAriaLabel: 'Thumbs down',
	})
}

 function alertXoa(noti){
	return swal({
		title:                 `<strong>Bạn Có Muốn Xoá ${noti}?</strong>`,
		type:                  'warning',
		showCloseButton:       true,
		showCancelButton:      true,
		focusConfirm:          false,
		confirmButtonText:
		'<i class="fa fa-thumbs-up"></i>Yes!',
		cancelButtonText:
		'<i class="fa fa-thumbs-down"></i> No!',
		cancelButtonAriaLabel: 'Thumbs down',
	})
}

export { alertXoa, alertDangXuat, alertFail, alertSuccess, resetForm, suaKhiClickVaoRow }

