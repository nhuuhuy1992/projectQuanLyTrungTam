import * as $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import swal from "sweetalert2";
import "font-awesome/css/font-awesome.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel";
import "./../../assets/scss/index.scss";
import "particles.js";
import "./../../assets/js/validation.js";
import "./../../assets/scss/vendors/animate.css";
import "./../../assets/js/app_index.js";
import * as WOW from "wow.js";
import { DanhSachNguoiDungServices } from "./../services/NguoiDungServices";
import { KhoaHoc } from "./../models/KhoaHoc";
import { NguoiDung } from "./../models/NguoiDung";
import { DanhSachNguoiDung } from "./../models/DanhSachNguoiDung";
import { DanhSachKhoaHoc } from "./../models/DanhSachKhoaHoc";
import { KhoaHocServices } from "./../services/KhoaHocServices";

new WOW().init();

function alert(alert:string, time:number){
	swal({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: time,
		type: 'success',
		title: alert
	})
}

const DSNDServices:any = new DanhSachNguoiDungServices();
const DSNguoiDung = new DanhSachNguoiDung();
const DSKhoaHoc = new DanhSachKhoaHoc();
const DSKHServices = new KhoaHocServices();

//đăng kí
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
			swal({
				type: 'success',
				title: 'Đăng Kí Thành Công!',
			}).then(() => {
				$("#formDangKy").modal("hide");
				$(".btn-dangnhap").trigger("click");
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
})
function luuNguoiDK(nd){
	let json = JSON.stringify(nd);
	localStorage.setItem("NguoiDung", json);
}
function ktNguoiDungDN(){
	if(localStorage.getItem("NguoiDung")){
		let json = JSON.parse(localStorage.getItem("NguoiDung"));
		DSNDServices.dangNhap(json.TaiKhoan, json.MatKhau)
		.done(function(res){
			let nguoiDangNhap = res[0];
			let HoTen         = nguoiDangNhap.HoTen
			let TaiKhoan      = nguoiDangNhap.TaiKhoan;
			let Email         = nguoiDangNhap.Email;
			let SoDT          = nguoiDangNhap.SoDT;
			let maND          = nguoiDangNhap.MaLoaiNguoiDung
			let MatKhauND     = nguoiDangNhap.MatKhau;
			let Obj:            NguoiDung =  new NguoiDung(TaiKhoan, MatKhauND, HoTen, SoDT, Email, maND);
			$(".btn-dangky").remove();
			$(".btn-dangnhap").remove();
			$("#formDangNhap").modal("hide");
			$(".block-btn-form").append(`
				<a href="#" class="btn-showInfo btn-contact" taikhoan="${json.TaiKhoan}">
				<span>Thông Tin</span>
				<span class="fa fa-user icon icon-info rounded-circle"></span>
				</a>

				<a href="#" class="btn-dangXuat btn-contact">
				<span>Đăng Xuất</span>
				<span class="fa fa-sign-out icon icon-info rounded-circle"></span>
				</a>
				`);
		})
		.fail();
	}
}
function xoaNguoiDungLocal(){
	localStorage.removeItem("NguoiDung");
}
//lấy Danh sách  Người dùng
DSNDServices.layDSNDService()
.done(function(res){
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
.fail(function(err){console.log(err);});
//lấy danh sách khoá học
DSKHServices.layKhoaHocService()
		.done( res => {
			for(let kh of res){
				let maKH = kh.MaKhoaHoc;
				let hinhAnhKH = kh.HinhAnh;
				let LuotXemKH = kh.LuotXem;
				let motaKH = kh.MoTa;
				let nguoiTaoKH = kh.NguoiTao;
				let tenKH = kh.TenKhoaHoc;
				let ObjKhoaHoc:KhoaHoc = new KhoaHoc(maKH, tenKH,motaKH,hinhAnhKH,LuotXemKH,nguoiTaoKH);
				DSKhoaHoc.themKhoaHoc(ObjKhoaHoc);
			}
		})
		.fail( err => console.log(err));


//Tìm kiếm khoá học
$("#inputTimKiem").keyup(function(){
	let tukhoa = $(this).val().toLowerCase().trim();
	let DSKHCanTimKiem = DSKhoaHoc.timKhoaHocTheoTen(tukhoa);
	let dataKH = "";
	if(tukhoa === ""){
		$(".block-kh").html("");
		$(".block-kh").removeClass("active");
	}
	else{
		dataKH += `
			<h2 class="resultFind">Kết Quả Tìm Kiếm: ${DSKHCanTimKiem.slKhoaHoc()} Khoá Học</h2> 
		`;
		for(let i = 0; i < DSKHCanTimKiem.slKhoaHoc(); i++){
			let khCantim:KhoaHoc = DSKHCanTimKiem.DSKH[i];
			dataKH += `
				<div class="one-block-kh">
	                   <div class="info-left">
	                       <img src="${khCantim.HinhAnh}" class="img-fluid" alt="">
	                   </div>
	                   <div class="info-right">
	                       <h2 class="tenKhoaTim">${khCantim.TenKhoaHoc}</h2>
	                       <div class="khoaHoc__type indigo-color">
	                           <h5>Lâp Trình - Thiết Kế Website</h5>
	                       </div>
	                   </div>
	               </div>
			`;
		}
		$(".block-kh").html(dataKH);
		$(".block-kh").addClass("active");
	}
})

$(".modalForm").on("hidden.bs.modal", function(){
	$(".txt").val("");
	$(".input__field--jiro").closest("span.input").removeClass("input--filled");
})
$("#FormTimKiem").on("hidden.bs.modal", function () {
	$(".block-kh").html("");
	$(".block-kh").removeClass("active");
});
$("#modal-video").on("hidden.bs.modal", function(){
	$("video").trigger("pause");
})
//đăng Nhập
$("#sign-up-form").submit(function(){
	if($("#sign-up-form").valid()){
		let TKDN:string = $("#inputTKDN").val();
		let passDN:string = $("#inputPassDN").val();
		DSNDServices.dangNhap(TKDN, passDN)
		.done(res => {
			let nguoiDangNhap = res[0];
			let HoTen         = nguoiDangNhap.HoTen
			let TaiKhoan      = nguoiDangNhap.TaiKhoan;
			let Email         = nguoiDangNhap.Email;
			let SoDT          = nguoiDangNhap.SoDT;
			let maND          = nguoiDangNhap.MaLoaiNguoiDung
			let MatKhauND     = nguoiDangNhap.MatKhau;
			let Obj:            NguoiDung = new NguoiDung(TaiKhoan, MatKhauND, HoTen, SoDT, Email, maND);
			if(Obj._MaLoaiNguoiDung == "HV"){
				swal({
					type: 'success',
					title: 'Đăng Nhập Thành Công!',
				}).then(() => {
					luuNguoiDK(Obj);//luu nguoi dung vao local
					ktNguoiDungDN();
					alert(`Xin Chào <span style="font-size: 20px; color: red; font-weight: bold;">${Obj._HoTen}</span>`, 3000);
				})
			}
			else if(Obj._MaLoaiNguoiDung == "GV"){
				swal({
					type: 'success',
					title: 'Đăng Nhập Thành Công!',
				}).then(() => {
					window.location.href = "/admin.html"
				})
			}
			else{
				swal({
					type: 'warning',
					title: 'Sai Mật Khẩu Hoặc Tên Tài Khoản! Xin Đăng Nhập Lại',
				})
			}
			
		})
		.fail(function(err){console.log(err);});
	}
	event.preventDefault();
})


$("body").delegate(".btn-dangXuat", "click", function(){
	event.preventDefault();
	swal({
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
	}).then(() => {
		xoaNguoiDungLocal();
		window.location.reload();
	})

})
$("body").delegate(".btn-showInfo", "click", function(){
	console.log($(this).attr("taikhoan"));
	let taiKhoan:string = $(this).attr("taikhoan");
	DSNDServices.thongTinNguoiDung(taiKhoan)
	.done(function(res){
		window.location.href = "/user.html";
	})
	.fail(function(err){console.log(err);});
})
ktNguoiDungDN();











