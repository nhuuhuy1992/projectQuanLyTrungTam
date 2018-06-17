import * as $ from "jquery";
import swal from "sweetalert2";
import "./../../assets/js/validation.js";
import { DanhSachNguoiDungServices } from "./../services/NguoiDungServices";
import { KhoaHoc } from "./../models/KhoaHoc";
import { NguoiDung } from "./../models/NguoiDung";
import { DanhSachNguoiDung } from "./../models/DanhSachNguoiDung";
import { DanhSachKhoaHoc } from "./../models/DanhSachKhoaHoc";
import { KhoaHocServices } from "./../services/KhoaHocServices";
import { alertSuccess, alertFail, alertDangXuat } from "./helpers";

const DSNDServices = new DanhSachNguoiDungServices();

 //lưu thông tin người dùng vào local storage
export function luuNguoiDK(nd){									
	let json = JSON.stringify(nd);
	localStorage.setItem("NguoiDung", json);
}
//xoá thông tin người dùng local storage
export function xoaNguoiDungLocal(){
	localStorage.removeItem("NguoiDung");
}
export function ktNguoiDungDN(){
	if(localStorage.getItem("NguoiDung")){
		let json = JSON.parse(localStorage.getItem("NguoiDung"));
		DSNDServices.dangNhap(json.TaiKhoan, json.MatKhau)											
		.done(function(res){
			let nguoiDangNhap = res[0];
			let Obj:            NguoiDung =  new NguoiDung(nguoiDangNhap.TaiKhoan, nguoiDangNhap.MatKhau, nguoiDangNhap.HoTen, nguoiDangNhap.SoDT, nguoiDangNhap.Email, nguoiDangNhap.MaLoaiNguoiDung);
			$(".btn-dangky").remove();
			$(".btn-dangnhap").remove();
			$("#formDangNhap").modal("hide");
			let blockForm = `<a href="#" class="btn-dangXuat btn-contact">
			<span>Đăng Xuất</span>
			<span class="fa fa-sign-out icon icon-info rounded-circle"></span>
			</a>`
			if(Obj._MaLoaiNguoiDung === 'GV'){
				blockForm += `<a href="/admin.html" class="btn-showInfo btn-contact">
				<span>Dashboard</span>
				<span class="fa fa-user icon icon-info rounded-circle"></span>
				</a>`
			} else {
				blockForm += `<a href="#" class="btn-showInfo btn-contact" taikhoan="${json.TaiKhoan}">
				<span>Thông tin</span>
				<span class="fa fa-user icon icon-info rounded-circle"></span>
				</a>`
			}
			$(".block-btn-form").append(blockForm);
		})
		.fail();
	}
}

export function DangNhapNguoiDung(){					
    return $("#sign-up-form").submit(function(){			
		event.preventDefault();						
		if($("#sign-up-form").valid()){	
			let TKDN:string = $("#inputTKDN").val();
			let passDN:string = $("#inputPassDN").val();	
			DSNDServices.dangNhap(TKDN, passDN)					
			.done(res => {																				
				let nguoiDangNhap = res[0];
				let Obj:            NguoiDung = new NguoiDung(nguoiDangNhap.TaiKhoan, passDN, nguoiDangNhap.HoTen, nguoiDangNhap.SoDT, nguoiDangNhap.Email, nguoiDangNhap.MaLoaiNguoiDung);
				if(Obj._MaLoaiNguoiDung == "HV"){
					alertSuccess("Đăng Nhập Thành Công!").then(() => {
						luuNguoiDK(Obj);//luu nguoi dung vao local
						ktNguoiDungDN();
						swal({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 2000,
							type: 'success',
							title: `Xin Chào <span style="font-size: 20px; color: red; font-weight: bold;">${Obj._HoTen}</span>`
						})
					})
				}
				else if(Obj._MaLoaiNguoiDung == "GV"){
					alertSuccess("Đăng Nhập Thành Công!").then(() => {
						luuNguoiDK(Obj);
						ktNguoiDungDN();
						window.location.href = "/admin.html"
					})
				}
				else{
					alertFail('Sai Mật Khẩu Hoặc Tên Tài Khoản! Xin Đăng Nhập Lại')
				}
				
			})
			.fail();
		}
	})
}

export function DangKiNguoiDung(){
	$("#register-form").submit( () => {
		let HoTenDK: string = $("#inputHoTenDK").val();
		let TenTKDK: string = $("#inputTenTKDK").val();
		let EmailDK: string = $("#inputEmailDK").val();
		let SDTDK: number = $("#inputSDTDK").val();
		let PassDK: string = $("#inputPASSDK").val();
		let ndDK = new NguoiDung(TenTKDK, PassDK, HoTenDK, SDTDK, EmailDK, "HV");
	
		if($("#register-form").valid()){
			DSNDServices.dangKy(ndDK)
			.done(function(res){
				alertSuccess("Đăng Ký Thành Công!").then(() => {
					$("#formDangKy").modal("hide");
					$(".btn-dangnhap").trigger("click");
				})
			})
			.fail(function(err){
				alertFail("Tên Tài Khoản Đã Được Đăng Ký !");
			})
		}
		event.preventDefault();
	})
}
export function DangXuatNguoiDung(){
	$("body").delegate(".btn-dangXuat", "click", function(){
		event.preventDefault();
		alertDangXuat().then((res) => {
			if(res.value){
				xoaNguoiDungLocal();
				window.location.reload();
			}
		})
	})
}


