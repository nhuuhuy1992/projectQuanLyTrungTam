import * as $ from "jquery";
import { NguoiDung } from "./../models/NguoiDung";


export class DanhSachNguoiDungServices {


	layDSNDService():Array<NguoiDung>{
		return $.ajax({
			url : " http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
			type : "GET",
			dataType : "json"
		});
	}
	themNguoiDungService(nd:NguoiDung){
		return $.ajax({
			url : " http://sv.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung",
			type : "POST",
			data : nd
		});
	}
	xoaNguoiDungService(tk:string){
		return $.ajax({
			url : `http://sv.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${tk}`,
			type : "DELETE"
		});
	}
	suaNguoiDungService(nd:NguoiDung){
		let ngJSON = JSON.stringify(nd);
		return $.ajax({
			url : "http://sv.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung",
			type : "PUT",
			data : nd
		});
	}
	dangKy(nd:NguoiDung){
		return $.ajax({
			url : "http://sv.myclass.vn/api/QuanLyTrungTam/DangKy",
			type : "POST",
			data : nd
		});
	}

	dangNhap(tk:string, pass:string){
		return $.ajax({
			url : `http://sv.myclass.vn/api/QuanLyTrungTam/DangNhap?taikhoan=${tk}&matkhau=${pass}`,
			type : "GET"
		});
	}


}




