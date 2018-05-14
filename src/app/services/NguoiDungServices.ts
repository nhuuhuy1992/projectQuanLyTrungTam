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
			data : nd,
			// dataType : "application/json",
			// contentType: 'application/json; charset=utf-8',
		});
	}
}




