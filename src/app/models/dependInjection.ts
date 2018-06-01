import * as $ from "jquery";
import swal from "sweetalert2";

import { KhoaHoc } from "./KhoaHoc";
import { KhoaHocServices } from '../services/KhoaHocServices';
import { DanhSachKhoaHoc } from "./DanhSachKhoaHoc";



export function suaKhiClickVaoRow(thisTR, obj ,thisAttr){
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
export function resetForm(str){
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
export function alertSuccess(...noti){
	return swal({
		type:  'success',
		title: `${noti}`,
	})
}
export function alertFail(...noti){
	return swal({
		type: 'error',
		title: `${noti}`,
	})
}
