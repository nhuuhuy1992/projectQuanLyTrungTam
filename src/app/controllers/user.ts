//bootstrap
import * as $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./../../assets/scss/user.scss";
import swal from "sweetalert2";
import "./../../assets/js/validation.js";
import { NguoiDung } from "./../models/NguoiDung";
import { DanhSachNguoiDung } from "./../models/DanhSachNguoiDung";
import { DanhSachNguoiDungServices } from "./../services/NguoiDungServices";
import { KhoaHoc } from "../models/KhoaHoc";
import { KhoaHocServices } from '../services/KhoaHocServices';
import { AuthService } from '../services/AuthService';
import { DanhSachKhoaHoc } from "../models/DanhSachKhoaHoc";
let DSNguoiDung = new DanhSachNguoiDung();
let DSNguoiDungServices:any = new DanhSachNguoiDungServices();
let khoaHocService = new KhoaHocServices();
let danhSachKhoaHoc = new DanhSachKhoaHoc();

function layNguoiDungDN(){
	if(localStorage.getItem("NguoiDung")){
		let dataND = JSON.parse(localStorage.getItem("NguoiDung"));
		DSNguoiDungServices.thongTinNguoiDung(dataND.TaiKhoan)
		.done( res => {
			let nguoiDangNhap = res[0];
			let HoTen         = nguoiDangNhap.HoTen
			let TaiKhoan      = nguoiDangNhap.TaiKhoan;
			let Email         = nguoiDangNhap.Email;
			let SoDT          = nguoiDangNhap.SoDT;
			let maND          = nguoiDangNhap.MaLoaiNguoiDung
			let MatKhauND     = nguoiDangNhap.MatKhau;
			let Obj:            NguoiDung = new NguoiDung(TaiKhoan, MatKhauND, HoTen, SoDT, Email, maND);
			khoaHocService.layThongTinKH(Obj._TaiKhoan)
				.done( res => {
					for(let kh of res){
						khoaHocService.layCTKHService(kh.MaKhoaHoc)
						.done( argKH => {
							let maKH:string = argKH.MaKhoaHoc;
							let LuotXem:number = Number(argKH.LuotXem);
							let moTaKH:string = argKH.MoTa;
							let nguoiTaoKH:string = argKH.NguoiTao;
							let tenKH:string = argKH.TenKhoaHoc;
							let hinhanhKH:string = argKH.HinhAnh;

							let ObjKH = new KhoaHoc(maKH, tenKH, moTaKH,hinhanhKH,LuotXem,nguoiTaoKH);
							danhSachKhoaHoc.themKhoaHoc(argKH);
							showKH(danhSachKhoaHoc.DSKH);
						})
						.fail( () => {
							$("#listKH").html(`<h5 class="noti-kh">Bạn Chưa Có Khoá Học Nào!!</h5>`)
						});
					}
				})
				.fail();
			showProfile(Obj);
		})
		.fail();

	}
}
function showProfile(hocVien:NguoiDung){
	$("#TaiKhoan").html(hocVien._TaiKhoan);
	$("#userName").html(hocVien._HoTen);
	$("#emailND").html(hocVien._Email);
	$("#sdt").html(hocVien._SoDT);
}
function showKH(dskh){
	let dataKH = "";

 	for(let kh of dskh){
 		dataKH += `
			<div class="col-md-6 col-12 mb-5 p-md-4 p-1">
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
 	$("#listKH").html(dataKH);
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
			window.location.href = "/index.html";
		}
	})
})
layNguoiDungDN();

function layDSNDService(){
	DSNguoiDungServices.layDSNDService()
					.done( res => {
						for(let nd of res){
							let ten = nd.HoTen;
							let tenTK = nd.TaiKhoan;
							let Email = nd.Email;
							let MaLoaiNguoiDung = nd.MaLoaiNguoiDung;
							let MatKhau = nd.MatKhau;
							let SoDT = nd.SoDT;
							let TenLoaiNguoiDung = nd.TenLoaiNguoiDung;
							let objND = new NguoiDung(tenTK, MatKhau, ten, SoDT, Email, MaLoaiNguoiDung);
							DSNguoiDung.themNguoiDung(objND);
						}
						let dataND = JSON.parse(localStorage.getItem("NguoiDung"));
						let indexND = DSNguoiDung.timNguoiDungTheoTK(dataND.TaiKhoan);
						let thisUser = DSNguoiDung.DSND[indexND];
						$("#btnCapNhat").click(layInfoND(thisUser));
						$("#btnXacNhanCapNhat").click(function(){
							let tenTKCN = $("#inputTenTKCapNhat").val();
							let tenCN = $("#inputTenCapNhap").val();
							let tenEmailCN = $("#inputEmailCapNhat").val();
							let tenSDTCN = $("#inputSDTCapNhat").val();
							let tenMKCN = $("#inputMKCapNhat").val();
							let ObjCapNhat = new NguoiDung(tenTKCN, tenMKCN, tenCN, tenSDTCN, tenEmailCN, "HV");
							DSNguoiDungServices.capNhatThongTinNguoiDung(ObjCapNhat)
											.done(res => {
												$("#modalCapNhatND").modal("hide");
												swal({
													type: 'success',
													title: 'Cập Nhật Thành Công!',
												}).then(() => {
													showProfile(ObjCapNhat);
												})
											})
											.fail();
						})
					})
					.fail();
}
layDSNDService();
//cập nhật thông tin
function layInfoND(infoND:NguoiDung){
	$("#inputTenTKCapNhat").val(infoND._TaiKhoan);
	$("#inputTenCapNhap").val(infoND._HoTen);
	$("#inputEmailCapNhat").val(infoND._Email);
	$("#inputSDTCapNhat").val(infoND._SoDT);
	$("#inputMKCapNhat").val(infoND._MatKhau);
	$(".txt").closest("span.input").addClass("input--filled");
}


// function getExcerpt( str:string, limit:number ){
//     let shortText = str;
//     shortText = shortText.substr( 0, shortText.lastIndexOf( ' ', limit ) ) + '...';
//     return shortText;
// }