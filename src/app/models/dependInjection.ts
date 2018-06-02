import * as $ from "jquery";
import swal from "sweetalert2";

import { NguoiDung } from "./NguoiDung";
import { DanhSachNguoiDung } from "./DanhSachNguoiDung";
import { DanhSachNguoiDungServices } from "./../services/NguoiDungServices";

import { KhoaHoc } from "./KhoaHoc";
import { KhoaHocServices } from '../services/KhoaHocServices';
import { DanhSachKhoaHoc } from "./DanhSachKhoaHoc";


export function getDataNDServices(){
	const DSNDServices:any = new DanhSachNguoiDungServices();
	const DSNguoiDung = new DanhSachNguoiDung();
	return DSNDServices.layDSNDService()
				.done( function(res) {
					for(let person of res){
						let HoTen     = person.HoTen
						let TaiKhoan  = person.TaiKhoan;
						let Email     = person.Email;
						let SoDT      = person.SoDT;
						let maND      = person.MaLoaiNguoiDung
						let MatKhauND = person.MatKhau;
						let personObj:  NguoiDung = new NguoiDung(TaiKhoan, MatKhauND, HoTen, SoDT, Email, maND);
						DSNguoiDung.themNguoiDung(personObj);
					}
				})
				.fail();
}
export function getDataKHServices(){
	const DSKhoaHoc = new DanhSachKhoaHoc();
	const DSKHService: any = new KhoaHocServices();
	return DSKHService.layKhoaHocService()
	.done(res =>{
		for(let kh of res){
				let khOBJ:  KhoaHoc = new KhoaHoc(kh.MaKhoaHoc, kh.TenKhoaHoc, kh.MoTa, kh.HinhAnh, kh.LuotXem, kh.NguoiTao);
				DSKhoaHoc.themKhoaHoc(khOBJ);
			}
	})
	.fail()
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
