import * as $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel";
import "./../../assets/scss/index.scss";
import "particles.js";
import swal from "sweetalert2";
import "./../../assets/js/validation.js";
import "./../../assets/js/app_index.js";

import { DanhSachNguoiDungServices } from "./../services/NguoiDungServices";
import { NguoiDung } from "./../models/NguoiDung";
import { DanhSachNguoiDung } from "./../models/DanhSachNguoiDung";



const DSNDServices:any = new DanhSachNguoiDungServices();
const DSNguoiDung:DanhSachNguoiDung = new DanhSachNguoiDung();
const getInputId = el => <HTMLInputElement>document.getElementById(el);

const formDK = <HTMLFormElement>document.getElementById("register-form");
const formDN = <HTMLFormElement>document.getElementById("sign-up-form");

//đăng kí
formDK.addEventListener("submit", function(){
	let HoTenDK:string = getInputId("inputHoTenDK").value;
	let TenTKDK:string = getInputId("inputTenTKDK").value;
	let EmailDK:string = getInputId("inputEmailDK").value;
	let SDTDK:number = parseInt(getInputId("inputSDTDK").value);
	let PassDK:string = getInputId("inputPASSDK").value;

	let ndDK = new NguoiDung(TenTKDK, PassDK, HoTenDK, SDTDK, EmailDK, "HV");



	if($(this).valid()){
		DSNDServices.dangKy(ndDK)
		.done(function(res){
			swal({
				type: 'success',
				title: 'Đăng Kí Thành Công!',
			}).then(() => {
				window.location.reload();
			})
		})
		.fail(function(err){
			swal({
				type: 'warning',
				title: 'Tên Tài Khoản Đã Được Đăng Kí !',
			})
		})
	}
	event.preventDefault();
});

//lấy Danh sách 
DSNDServices.layDSNDService()
			  .done(function(res){
				for(let person of res){
					let HoTen =  person.HoTen
					let TaiKhoan = person.TaiKhoan;
					let Email =person.Email;
					let SoDT = person.SoDT;
					let maND =person.MaLoaiNguoiDung
					let MatKhauND = person.MatKhau;
		  			let personObj:NguoiDung = new NguoiDung(TaiKhoan, MatKhauND, HoTen, SoDT, Email, maND);
					DSNguoiDung.themNguoiDung(personObj);
				}
			})
			.fail(function(err){console.log(err);});



//đăng Nhập
formDN.addEventListener("submit", function(){

	let TKDN:string = getInputId("inputTKDN").value;
	let passDN:string = getInputId("inputPassDN").value;


	DSNDServices.dangNhap(TKDN, passDN)
			  .done(function(res){
			  	console.log(DSNguoiDung.DSND);
			  	console.log(DSNguoiDung.timNguoiDungTheoTK(TKDN));
			  	console.log(DSNguoiDung.DSND[DSNguoiDung.timNguoiDungTheoTK(TKDN)]._MaLoaiNguoiDung);
			  	let nguoiDangNhap = DSNguoiDung.DSND[DSNguoiDung.timNguoiDungTheoTK(TKDN)];

			  	if(nguoiDangNhap._MaLoaiNguoiDung == "HV"){
			  		console.log("chuyển sang trang hv");
			  	}
			  	else if(nguoiDangNhap._MaLoaiNguoiDung == "GV"){
			  		window.location.reload();
			  		window.open("http://localhost:9000/admin.html","_blank");
			  	}
			  })
			  .fail(function(err){
			  	console.log(err);
			  });

	event.preventDefault();
})















