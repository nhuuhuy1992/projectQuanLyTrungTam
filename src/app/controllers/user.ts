//bootstrap
import * as $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./../../assets/scss/user.scss";
import swal from "sweetalert2";
import "./../../assets/js/app_user.js";
import "./../../assets/js/validation.js";
import "./../vendors/animate.css";
import { NguoiDung } from "./../models/NguoiDung";
import { DanhSachNguoiDungServices } from "./../services/NguoiDungServices";
import { KhoaHoc } from "../models/KhoaHoc";
import { KhoaHocServices } from '../services/KhoaHocServices';
// import { AuthService } from '../services/AuthService';
import {luuNguoiDK} from './authentication';
import { DanhSachKhoaHoc } from "../models/DanhSachKhoaHoc";

import { alertSuccess } from "./helpers";

let danhSachKhoaHoc = new DanhSachKhoaHoc();
// let DSNguoiDung = new DanhSachNguoiDung();
let DSNguoiDungServices:any = new DanhSachNguoiDungServices();
let khoaHocService = new KhoaHocServices();

function layNguoiDungDN(){
	if(localStorage.getItem("NguoiDung")){													
		let dataND = JSON.parse(localStorage.getItem("NguoiDung"));
		DSNguoiDungServices.dangNhap(dataND.TaiKhoan, dataND.MatKhau)
		.done(function(res){
			let nguoiDangNhap = res[0];
			
			let thisUser: NguoiDung = new NguoiDung(nguoiDangNhap.TaiKhoan, dataND.MatKhau, nguoiDangNhap.HoTen, nguoiDangNhap.SoDT, nguoiDangNhap.Email, nguoiDangNhap.MaLoaiNguoiDung);
			layInfoND(thisUser);
			$("#btnCapNhatProfile").click(function(){
				event.preventDefault();
				let tenTKCN = $("#inputTKEdit").val();
				let tenCN = $("#inputTenEdit").val();
				let tenEmailCN = $("#inputEmailEdit").val();
				let tenSDTCN = $("#inputSdtEdit").val();
				let tenMKCN = $("#inputReMKMoi").val();
				if(tenMKCN === ""){
					let ObjCapNhat = new NguoiDung(tenTKCN, thisUser._MatKhau, tenCN, tenSDTCN, tenEmailCN, "HV");
					capNhatInfo(ObjCapNhat);
				}
				else{
					if($("#inputMKMoi").val() === $("#inputReMKMoi").val()){
						let ObjCapNhat = new NguoiDung(tenTKCN, tenMKCN, tenCN, tenSDTCN, tenEmailCN, "HV");
						capNhatInfo(ObjCapNhat);
					}
					else{
						swal({
							type: 'error',
							title: 'Mật Khẩu Xác Nhận Không Đúng!',
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 1000
						})
						return false;
					}
				}
			})
			$("#inputXacNhanMatKhau").keyup(function(){
				if($(this).val() === thisUser._MatKhau){
					$("#inputMKMoi").prop("disabled", false);
					$("#inputReMKMoi").prop("disabled", false);
					$("#inputMKMoi").css({"cursor" : "auto"});
					$("#inputReMKMoi").css({"cursor" : "auto"});
				}
				else{
					$("#inputMKMoi").attr("disabled", "disabled");
					$("#inputReMKMoi").attr("disabled", "disabled");
					$("#inputMKMoi").css({"cursor" : "not-allowed"});
					$("#inputReMKMoi").css({"cursor" : "not-allowed"});
				}
			})

			if(nguoiDangNhap.MaLoaiNguoiDung === 'HV'){
				khoaHocService.layThongTinKH(thisUser._TaiKhoan)
				.done( res => {
					for(let kh of res){
						khoaHocService.layCTKHService(kh.MaKhoaHoc)
						.done( argKH => {
							let ObjKH = new KhoaHoc(argKH.MaKhoaHoc, argKH.TenKhoaHoc, argKH.MoTa,argKH.HinhAnh,Number(argKH.LuotXem),argKH.NguoiTao);
							danhSachKhoaHoc.themKhoaHoc(ObjKH);
							showKH(danhSachKhoaHoc.DSKH);
						})
						.fail( () => {
							$(".ListKhoaHoc").html(`<h5 class="noti-kh">Bạn Chưa Có Khoá Học Nào!!</h5>`)
						});
					}
				})
				.fail();
			}
			showProfile(thisUser);
		}).fail();
	}else{	
		window.location.href = "/"
	}
}
function showProfile(hocVien:NguoiDung){
	$(".userName").html(hocVien._HoTen);
	// $("#userName").html(hocVien._HoTen);
	// $("#emailND").html(hocVien._Email);
	// $("#sdt").html(hocVien._SoDT);
}
function showKH(dskh){
	let dataKH = "";
 	for(let kh of dskh){
 		dataKH += `
			<div class="col-md-4 col-12 mb-5 p-md-4 p-1">
                   <div class="khoaHoc__one-block card w-100">
                       <div class="card-img-top z-depth-1-half">
                           <img src="${kh.HinhAnh}" class="img-fluid" alt="" style="min-width: 100%">
                       </div>
                       <div class="card-body text-center z-depth-2">
                           <div class="card-title khoaHoc__ten black-color">
                               <h3>${kh.TenKhoaHoc}</h3>
                           </div>
                           <div class="khoaHoc__type indigo-color">
                               <h5>Lâp Trình - Thiết Kế Website</h5>
                           </div>
                           <div class="khoaHoc__giangVien">
                               <p>Giảng Viên: Lê Quang Song</p>
                           </div>
                           <div class="khoaHoc__prize">
                               <code id="prize">${kh.LuotXem}</code>
                               <small>Lượt Xem</small>
                           </div>
                           <a href="#" class="btn aqua-gradient text-white border-0">
                               <i class="fa fa-pencil"></i> Xem Chi Tiết
                           </a>
                       </div>
                   </div>
               </div>
 		`;
 	}
 	$(".ListKhoaHoc").html(dataKH);
}
function xoaNguoiDungLocal(){
	localStorage.removeItem("NguoiDung");
}
$("#DangXuatND").click(function(){
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
	}).then((res) => {
		if(res.value){
			xoaNguoiDungLocal();
			window.location.href = "/";
		}
	})
})
layNguoiDungDN();

function layInfoND(infoND:NguoiDung){
	$("#inputTKEdit").val(infoND._TaiKhoan);
	$("#inputTenEdit").val(infoND._HoTen);
	$("#inputEmailEdit").val(infoND._Email);
	$("#inputSdtEdit").val(infoND._SoDT);
	$(".txt").closest("span.input").addClass("input--filled");
}

function capNhatInfo(obj:NguoiDung){
	xoaNguoiDungLocal();

	return DSNguoiDungServices.capNhatThongTinNguoiDung(obj)
					.done(res => {
						// console.log(res);
						luuNguoiDK(res);
						alertSuccess('Cập Nhật Thành Công!')
						.then(() => {
							$("#modalInfoUser").modal("hide");
							showProfile(obj);
							
							resetComfirmPassForm();
						})
					})
					.fail();
}
function resetComfirmPassForm(){
	$("#tabMatKhau .txt").val("");
	$("#inputMKMoi").attr("disabled", "disabled");
	$("#inputReMKMoi").attr("disabled", "disabled");
	$("#inputMKMoi").css({"cursor" : "not-allowed"});
	$("#inputReMKMoi").css({"cursor" : "not-allowed"});
}

export { layNguoiDungDN }