import * as $ from "jquery";
import swal from "sweetalert2";

import { NguoiDung } from "../models/NguoiDung";
import { DanhSachNguoiDung } from "../models/DanhSachNguoiDung";
import { DanhSachNguoiDungServices } from "./../services/NguoiDungServices";

import { KhoaHoc } from "../models/KhoaHoc";
import { KhoaHocServices } from '../services/KhoaHocServices';
import { DanhSachKhoaHoc } from "../models/DanhSachKhoaHoc";

const DSKhoaHoc = new DanhSachKhoaHoc();
const DSKHService: any = new KhoaHocServices();
const DSNDServices:any = new DanhSachNguoiDungServices();
const DSNguoiDung = new DanhSachNguoiDung();

export function getDataNDServices(){
	return DSNDServices.layDSNDService()
				.done( function(res) {
					for(let person of res){
						let personObj:  NguoiDung = new NguoiDung(person.TaiKhoan,  person.MatKhau, person.HoTen, person.SoDT,  person.Email, person.MaLoaiNguoiDung);
						DSNguoiDung.themNguoiDung(personObj);
					}
				})
				.fail();
}
export function getDataKHServices(){
	return DSKHService.layKhoaHocService()
	.done(res =>{
		for(let kh of res){
				let khOBJ:  KhoaHoc = new KhoaHoc(kh.MaKhoaHoc, kh.TenKhoaHoc, kh.MoTa, kh.HinhAnh, kh.LuotXem, kh.NguoiTao);
				DSKhoaHoc.themKhoaHoc(khOBJ);
			}
	})
	.fail()
}
export function nhanNDServices(){
	return getDataNDServices().responseJSON;
}
export function nhanKHServices(){
	return getDataKHServices().responseJSON;
}
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
export function alertSuccess(noti){
	return swal({
		type:  'success',
		title: `${noti}`,
	})
}
export function alertFail(noti){
	return swal({
		type: 'error',
		title: `${noti}`,
	})
}
export function alertDangXuat(){
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

export function alertXoa(noti){
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


