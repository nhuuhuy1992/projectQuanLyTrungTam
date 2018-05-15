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
		return $.ajax({
			url : "http://sv.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung",
			type : "PUT"
		});
	}
}




