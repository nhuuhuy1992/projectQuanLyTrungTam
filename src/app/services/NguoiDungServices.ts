import * as $ from "jquery";
import { NguoiDung } from "./../models/NguoiDung";
const url = "http://sv.myclass.vn/api/QuanLyTrungTam";

export class DanhSachNguoiDungServices {


	layDSNDService():Array<NguoiDung>{
		return $.ajax({
			async:false,
			url : `${url}/DanhSachNguoiDung`,
			type : "GET",
			dataType : "json"
		});
	}
	themNguoiDungService(nd:NguoiDung){
		return $.ajax({
			url : `${url}/ThemNguoiDung`,
			type : "POST",
			data : nd
		});
	}
	xoaNguoiDungService(tk:string){
		return $.ajax({
			url : `${url}/XoaNguoiDung/${tk}`,
			type : "DELETE"
		});
	}
	suaNguoiDungService(nd:NguoiDung){
		let ngJSON = JSON.stringify(nd);
		return $.ajax({
			url : `${url}/CapNhatThongTinNguoiDung`,
			type : "PUT",
			data : nd
		});
	}
	dangKy(nd:NguoiDung){
		return $.ajax({
			url : `${url}/DangKy`,
			type : "POST",
			data : nd
		});
	}

	dangNhap(tk:string, pass:string){
		return $.ajax({
			url : `${url}/DangNhap?taikhoan=${tk}&matkhau=${pass}`,
			type : "GET"
		});
	}
	thongTinNguoiDung(tk:string){
		return $.ajax({
			url : `${url}/ThongTinNguoiDung?taikhoan=${tk}`,
			type : "GET"
		});
	}
	capNhatThongTinNguoiDung(nd:NguoiDung){
		let ngJSON = JSON.stringify(nd);
		return $.ajax({
			url : `${url}/CapNhatThongTinNguoiDung`,
			data : nd,
			type : "PUT"
		});
	}
}




