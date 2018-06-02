import * as $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import swal from "sweetalert2";
import 'froala-editor';
import "./../../assets/js/froalaEditor.js";
import "../vendors/animate.css";
import "./../../assets/scss/admin.scss";
import "./../../assets/js/app_admin.js";
import { paginate, renderTable, compareValues, pageOnClick }  from "../../assets/js/table.js";
import { NguoiDung } from "./../models/NguoiDung";
import { DanhSachNguoiDungServices } from "./../services/NguoiDungServices";
import { DanhSachNguoiDung } from "./../models/DanhSachNguoiDung";
import { KhoaHoc } from "../models/KhoaHoc";
import { KhoaHocServices } from '../services/KhoaHocServices';
import { DanhSachKhoaHoc } from "../models/DanhSachKhoaHoc";

import { suaKhiClickVaoRow, alertFail, alertSuccess, resetForm } from "./../models/dependInjection";


let getid = el => document.getElementById(el);
let getInputId = el => <HTMLInputElement>document.getElementById(el);


let DSNguoiDung:DanhSachNguoiDung = new DanhSachNguoiDung();
let danhSachKhoaHoc = new DanhSachKhoaHoc();
let DSNDService:any = new DanhSachNguoiDungServices();
let DSKHService: any = new KhoaHocServices();


function showDSKHDK(taikhoan:string){
	DSKHService.layThongTinKH(taikhoan)
	.done(
		res =>{
			let khoahocdk:string ='';
			let khChuaDk: string ='';
			let danhSachKhoaHocDK = new DanhSachKhoaHoc();
			if( typeof res !== 'string'){

				res.forEach((khoahoc)=>{
					khoahocdk+= `<li class="list-group-item">${khoahoc.TenKhoaHoc}</li>`
				})

				danhSachKhoaHocDK.DSKH = danhSachKhoaHoc.DSKH.filter(kh1 => res.some(kh2 => kh1.MaKhoaHoc !== kh2.MaKhoaHoc))

			}else{
				khoahocdk = 'Chưa có khoá học';
				danhSachKhoaHocDK.DSKH = danhSachKhoaHoc.DSKH
			}

			$('#listKhoaHoc').html(khoahocdk);

			danhSachKhoaHocDK.DSKH.forEach((khoahoc:KhoaHoc)=>{
				khChuaDk +=`<option value="${khoahoc.MaKhoaHoc}">${khoahoc.TenKhoaHoc}</option>`
			})
			$('#listKHoaHocDK').html(khChuaDk);
		}
		)
	.fail(err => console.log(err))
}
DSKHService.layKhoaHocService()
	.done(res =>{
		danhSachKhoaHoc.DSKH = res.map(kh =>{
			let khObject = new KhoaHoc(kh.MaKhoaHoc, kh.TenKhoaHoc,kh.MoTa,kh.HinhAnh,kh.LuotXem,kh.NguoiTao)
			return khObject;
		})
		// renderTable(danhSachKhoaHoc.DSKH,'#showEntriesKH','#tableKhoaHoc',showKH);
	})
	.fail();
let showEntriesUser = $('#showEntriesUser');
$('#showEntriesUser').change(function(){
	renderTable(DSNguoiDung.DSND,'#showEntriesUser','#tableNguoiDung',showDSND);
})

function showDSND(DSND:Array<NguoiDung>, divLoad, entry = 0){
	let data:string = "";
	let table = $(divLoad).find('tbody');
	table.html();
	for(let i:number = 0; i < DSND.length; i++){
		let motNguoiDung = DSND[i];
		data += `
		<tr
		TaiKhoan="${motNguoiDung._TaiKhoan}"
		HoTen="${motNguoiDung._HoTen}"
		Email="${motNguoiDung._Email}"
		SoDT=${motNguoiDung._SoDT}
		MaLoaiNguoiDung="${motNguoiDung._MaLoaiNguoiDung}"
		matkhau="${motNguoiDung._MatKhau}"
		id="tr_${motNguoiDung._TaiKhoan}"
		class="trNguoiDung">
		<td>
		<input type="checkbox" class="cbxNguoiDung" TaiKhoan="${motNguoiDung._TaiKhoan}" />
		</td>
		<td>${entry+i+1}</td>
		<td>${motNguoiDung._TaiKhoan}</td>
		<td>${motNguoiDung._HoTen}</td>
		<td>${motNguoiDung._Email}</td>
		<td>${motNguoiDung._SoDT}</td>
		<td>${motNguoiDung._MaLoaiNguoiDung}</td>
		<td class="d-flex justify-content-center">
		<button type="button" class="icon icon-peach rounded-circle border-0 fa fa-trash text-danger mr-3 btnXoaTungND" style="width: 30px;height: 30px" id="btnXoa_${motNguoiDung._TaiKhoan}"></button>
		<button type="button" class="icon icon-blue rounded-circle border-0  fa fa-pencil btnCapNhatND" style="width: 30px;height: 30px" data-toggle="modal" data-target="#modalCapNhatND" data-id="${motNguoiDung._TaiKhoan}" id="btnSua_${motNguoiDung._TaiKhoan}">
		</button>
		</td>
		</tr>
		`;
	}
	table.html(data);
	xoaNguoiDungAPI(".btnXoaTungND");
	suaKhiClickVaoRow(".trNguoiDung","", "taikhoan",);
}
DSNDService.layDSNDService()
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
		renderTable(DSNguoiDung.DSND,'#showEntriesUser','#tableNguoiDung',showDSND);
		hienThiDSGV(DSNguoiDung);
	})
	.fail(function(err){console.log(err);});

$("#btnThemNguoiDung").click(function(){
	let HoTen:string     = $("#HoTenND").val();
	let TaiKhoan:string     = $("#TaiKhoanND").val();
	let Email:string     = $("#EmailND").val();
	let SoDT:number     = Number($("#SoDTND").val());
	let maND:string     = $("#maND").val();
	let MatKhauND:string     = $("#MatKhauND").val();
	let nd:         NguoiDung = new NguoiDung(TaiKhoan, MatKhauND, HoTen, SoDT, Email, maND);
	DSNDService.themNguoiDungService(nd)
	.done(function(res){
		if(typeof(res) === "string"){
			alertFail("Tài Khoản Đã Tồn Tại!")
		}
		else if(typeof(res) === "object"){
			alertSuccess("Thêm Thành Công!")
				.then(() => {
				DSNguoiDung.themNguoiDung(nd);
				renderTable(DSNguoiDung.DSND,'#showEntriesUser','#tableNguoiDung',showDSND);
			})
		}
	})
	.fail();
})
//xoá người dùng api
function xoaNguoiDungAPI(btns){
	let Arrbtn = document.querySelectorAll(btns);
	for(let i:number = 0; i < Arrbtn.length; i++){
		Arrbtn[i].addEventListener("click", function(){
			let taiKhoan = (this.id.split("_"))[1];
			swal({
				title:                 '<strong>Bạn Có Chắc Xoá Người Dùng Này?</strong>',
				type:                  'warning',
				showCloseButton:       true,
				showCancelButton:      true,
				focusConfirm:          false,
				confirmButtonText:
				'<i class="fa fa-thumbs-up"></i>Yes!',
				cancelButtonText:
				'<i class="fa fa-thumbs-down"></i> No!',
				cancelButtonAriaLabel: 'Thumbs down',
			}).then(function(result){
				if(result.value){
					DSNDService.xoaNguoiDungService(taiKhoan)
					.done(function(res){
						alertSuccess("Xoá Thành Công!")
								.then((result)=>{
								let rowCanXoa = $(`#btnXoa_${taiKhoan}`).closest("tr");
								rowCanXoa.addClass("animated fadeOutDown")
										.css({"animationDuration":".8s"})
										.one("webkitAnimationEnd", function(){
										DSNguoiDung.xoaNguoiDungTheoTk(taiKhoan);
										renderTable(DSNguoiDung.DSND,'#showEntriesUser','#tableNguoiDung',showDSND);
								});
							})
						})
					.fail(function(err){alertFail("Người Dùng Không Thể Xoá!")});
				}
			})

		})
	}
}

$('#btnCapNhatND').click(function(){
	let HoTenCN     = $('#HoTenNDCN').val();
	let TaiKhoanCN  = $('#TaiKhoanNDCN').val();
	let EmailCN     = $('#EmailNDCN').val();
	let SoDTCN      = $('#SoDTNDCN').val();
	let maNDCN      = $('#maNDCN').val();
	let MatKhauNDCN = $('#MatKhauNDCN').val();

	let NDCapNhat = new NguoiDung(TaiKhoanCN, MatKhauNDCN, HoTenCN, SoDTCN, EmailCN, maNDCN);
	  //chuyển về chuỗi json
	  DSNDService.suaNguoiDungService(NDCapNhat)
	  .done(function(res){
	  			alertSuccess('Cập Nhật Thành Công!')
				  .then(()=>{
					DSNguoiDung.suaNguoiDung(NDCapNhat);
					renderTable(DSNguoiDung.DSND,'#showEntriesUser','#tableNguoiDung',showDSND);

				  })
			  })
	  .fail(function(err){
	  	alertFail("Thông Tin Không Thể Thay Đổi")
	  });
	})

$('body').delegate('.btnCapNhatND','click',function(){
	let id:string = $(this).attr('data-id');
	let nguoidung:NguoiDung = DSNguoiDung.DSND.find(user => user._TaiKhoan === id );
	$('#TaiKhoanNDCN').val(nguoidung._TaiKhoan);
	$('#MatKhauNDCN').val(nguoidung._MatKhau);
	$('#HoTenNDCN').val(nguoidung._HoTen);
	$('#EmailNDCN').val(nguoidung._Email);
	$('#SoDTNDCN').val(nguoidung._SoDT);

	if(nguoidung._MaLoaiNguoiDung === 'GV'){
		$('#modalCapNhatND .modal-dialog').removeClass('modal-lg');
		$('#maNDCN option[value="HV"]').removeAttr('selected');
		$('#maNDCN option[value="GV"]').attr('selected','selected');
		$('.khoahocHV').hide();

	}else{
		$('#modalCapNhatND .modal-dialog').addClass('modal-lg');
		$('#maNDCN option[value="GV"]').removeAttr('selected');
		$('#maNDCN option[value="HV"]').attr('selected','selected');
		$('.khoahocHV').show();
		showDSKHDK(nguoidung._TaiKhoan);
	}
})
$("#btnXoaNhieuND").click(function(){
	event.preventDefault();
	let cbx = $(".cbxNguoiDung");
	if(!cbx.is(":checked")){
		swal({
			type: 'error',
			title: 'Xin Chọn Người Dùng Cần Xoá!',
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 2000
		})
		return false;
	}
	for(let i = 0; i < cbx.length; i++){
		if($(cbx[i]).is(":checked")){
			let ndCanXoa = $(cbx[i]).attr("taikhoan");
			swal({
				title:                 '<strong>Bạn Có Chắc Xoá Người Dùng Này?</strong>',
				type:                  'warning',
				showCloseButton:       true,
				showCancelButton:      true,
				focusConfirm:          false,
				confirmButtonText:
				'<i class="fa fa-thumbs-up"></i>Yes!',
				cancelButtonText:
				'<i class="fa fa-thumbs-down"></i> No!',
				cancelButtonAriaLabel: 'Thumbs down',
			}).then(res => {
				if(res.value){
					DSNDService.xoaNguoiDungService(ndCanXoa)
					.done(res => {
						alertSuccess("Xoá Thành Công!")
						.then(res => {
								DSNguoiDung.xoaNguoiDungTheoTk($(cbx[i]).attr("taikhoan"));
								showDSND(DSNguoiDung.DSND, "#dataNguoiDung");
								console.log(DSNguoiDung.DSND);
							})

						})
					.fail(err => {
						alertFail("Không Thể Xoá Người Dùng Này!")
					})
				}
			})
		}
	}

})


//tìm kiếm ngừi dùng
$("#timND").keyup(function(){
	let key:string = $(this).val().trim().toLowerCase();
	let DSNDCanTimKiem = DSNguoiDung.timNguoiDungTheoTen(key);
	let data = "";
	if(key === "" || key === " " || DSNDCanTimKiem.DSND.length == 0){
		$("#dataTimKiemNguoiDung").html("");
		$("#tableTimKiemNguoiDung").removeClass("active");
	}
	else{
		for(let i:number = 0; i < DSNDCanTimKiem.DSND.length; i++){
			let ndTimKiem = DSNDCanTimKiem.DSND[i];
			data += `
			<tr taikhoan=${ndTimKiem._TaiKhoan} class="trNguoiDungTimKiem" data-choose="tr_${ndTimKiem._TaiKhoan}">
				<td>${i+1}</td>
				<td>${ndTimKiem._TaiKhoan}</td>
				<td>${ndTimKiem._HoTen}</td>
				<td>
					<button style="background: transparent; font-size: 25px; cursor: pointer" class="border-0 fa fa-trash text-danger mr-2 iconTimKiem xoaTimKiem" taikhoan="${ndTimKiem._TaiKhoan}" id="">
					</button>
					<button style="background: transparent; font-size: 22px; cursor: pointer" class="border-0 fa fa-pencil text-primary iconTimKiem suaTimKiem" taikhoan="${ndTimKiem._TaiKhoan}" id="">
					</button>
				</td>
			</tr>
			`;
		}
		$("#dataTimKiemNguoiDung").html(data);
		$("#tableTimKiemNguoiDung").addClass("active");
	}
})
// $("body").delegate(".xoaTimKiem", "click", function(){
// 	xoaNguoiDungAPI(".xoaTimKiem");
// })
// $("body").delegate(".suaTimKiem", "click", function(){
// 	let tkCanXoa = $(this).attr("taikhoan");
// 	$(`#btnSua_${tkCanXoa}`).trigger("click");
// })

$('#tableNguoiDung th').click(function(){
	let key = $(this).data('sort');
	if(key){
		if($(this).hasClass('asc')){
			$(this).removeClass('asc');
			$(this).addClass('desc');
			DSNguoiDung.DSND.sort(compareValues(key,'desc'))

		}else{
			$(this).removeClass('desc');
			$(this).addClass('asc');
			DSNguoiDung.DSND.sort(compareValues(key))
		}
		$('#tableNguoiDung').next('.pagination').find('.page-item.active > .page-link').click();
	}

})
function hienThiDSGV(dsnd:DanhSachNguoiDung){
	let dsGV:Array<NguoiDung> = dsnd.locNguoiDung('GV').DSND;
	let data:string = ''
	dsGV.forEach(gv =>{
		data+=`
		<option value="${gv._TaiKhoan}">${gv._HoTen}</option>
		`
	})
	$('#NguoiTao').html(data)
}
