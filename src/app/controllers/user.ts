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
<<<<<<< HEAD
userAuthService.dangNhapService('nguyentuan','12345')
.done(res => {
    let person    = res[0];
    let HoTen     = person.HoTen
    let TaiKhoan  = person.TaiKhoan;
    let Email     = person.Email;
    let SoDT      = person.SoDT;
    let maND      = person.MaLoaiNguoiDung
    let MatKhauND = person.MatKhau;
    let personObj:  NguoiDung = new NguoiDung(TaiKhoan, MatKhauND, HoTen, SoDT, Email, maND);
    showProfile(personObj);
    khoaHocService.layThongTinKH(personObj._TaiKhoan)
    .done(
        res => {
            for(let course of res){
                khoaHocService.layCTKHService(course.MaKhoaHoc)
                .done(
                    khoahoc =>{
                        let makh:        string = khoahoc.MaKhoaHoc;
                        let tenkh:       string = khoahoc.TenKhoaHoc;
                        let mota:        string = khoahoc.MoTa;
                        let hinhanh:     string = khoahoc.HinhAnh;
                        let luotxem:     number = parseFloat(khoahoc.LuotXem);
                        let nguoitao:    string = khoahoc.NguoiTao;
                        console.log(makh);
                        let objKHoaHoc = new KhoaHoc(makh, tenkh,mota,hinhanh,luotxem,nguoitao)
                        danhSachKhoaHoc.themKhoaHoc(khoahoc)
                        showKhoaHoc(danhSachKhoaHoc.DSKH);
                    }
                    )
                .fail(err => console.log(err))
            }
        }
        )
    .fail(err => console.log(err))
} )
.fail(err => console.log(err))

function showProfile(hocvien:NguoiDung){
    $('.user-account').html(hocvien._TaiKhoan)
    $('.profile__infor').html(`
        <h4 class = "profile__name">${hocvien._HoTen}</h4>
        <p class  = "profile__email"><span>Email:         </span>${hocvien._Email}</p>
        <p class  = "profile__phone"><span>Số điện thoại: </span>${hocvien._SoDT}</p>
        `)
=======

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
>>>>>>> e3d99b5ffa484c42d6186b6822d22f7423568d9b

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

<<<<<<< HEAD
function showKhoaHoc(danhSachKhoaHoc){
    let course = '';
    for(let khoahoc of danhSachKhoaHoc.DSKH){
        course +=`
        <div class="col-lg-3 col-md-6">
        <div class="card">
        <img class="card-img-top" src="${khoahoc.HinhAnh}" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">${khoahoc.TenKhoaHoc}</h5>
        </div>
        </div>
        </div>
        `
    }
    
    $('.course__list').html(course)
=======
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
>>>>>>> e3d99b5ffa484c42d6186b6822d22f7423568d9b
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