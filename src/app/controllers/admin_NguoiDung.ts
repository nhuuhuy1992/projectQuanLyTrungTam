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
import "./../../assets/js/validation.js";
import {  renderTable, compareValues}  from "../../assets/js/table.js";
import { NguoiDung } from "./../models/NguoiDung";
import { DanhSachNguoiDungServices } from "./../services/NguoiDungServices";
import { DanhSachNguoiDung } from "./../models/DanhSachNguoiDung";
import {showDSKHDK} from './admin_KhoaHoc';

import { suaKhiClickVaoRow, alertFail, alertSuccess,  alertXoa } from "./helpers";
import { layNguoiDungDN } from './user';

layNguoiDungDN();
//instance
let DSNguoiDung:DanhSachNguoiDung = new DanhSachNguoiDung();
let DSNDService:any = new DanhSachNguoiDungServices();
// let DSKHService: any = new KhoaHocServices();
const DSNDServices:any = new DanhSachNguoiDungServices();

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

function showDSND(DSND:Array<NguoiDung>, divLoad, entry = 0){
	let data:string = "";
	let table = $(divLoad).find('tbody');
	table.html('');
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
		<button type="button" class="icon icon-peach rounded-circle border-0 fa fa-trash text-danger mr-3 btnXoaTungND" style="width: 30px;height: 30px" data-id="${motNguoiDung._TaiKhoan}" id="btnXoa_${motNguoiDung._TaiKhoan}"></button>
		<button type="button" class="icon icon-blue rounded-circle border-0  fa fa-pencil btnCapNhatND" style="width: 30px;height: 30px" data-toggle="modal" data-target="#modalCapNhatND" data-id="${motNguoiDung._TaiKhoan}" id="btnSua_${motNguoiDung._TaiKhoan}">
		</button>
		</td>
		</tr>
		`;
	}
	table.html(data);
	suaKhiClickVaoRow(".trNguoiDung","", "taikhoan",);
	$("#mountND").html(DSNguoiDung.slNguoiDung());
	$("#mountHV").html(DSNguoiDung.slHocVien());

}

function createModalSuaND(That){
	let id:string = That.attr('data-id');
	let nguoidung:NguoiDung = DSNguoiDung.DSND.find(user => user._TaiKhoan === id );
	$('#TaiKhoanNDCN').val(nguoidung._TaiKhoan);
	$('#MatKhauNDCN').val(nguoidung._MatKhau);
	$('#HoTenNDCN').val(nguoidung._HoTen);
	$('#EmailNDCN').val(nguoidung._Email);
	$('#SoDTNDCN').val(nguoidung._SoDT);
	$('.big-err').html('');
	$("#btnXoaNDEdit").attr("data-id", id);
	if(nguoidung._MaLoaiNguoiDung === 'GV'){
		$('#modalCapNhatND .modal-dialog').removeClass('modal-lg');
		$('#maNDCN option[value="HV"]').removeAttr('selected');
		$('#maNDCN option[value="GV"]').attr('selected','selected');
		$("#btnXoaNDEdit").css({"display" : "none"});
		$('.khoahocHV').hide();
	}else{
		$('#modalCapNhatND .modal-dialog').addClass('modal-lg');
		$('#maNDCN option[value="GV"]').removeAttr('selected');
		$('#maNDCN option[value="HV"]').attr('selected','selected');
		$('.khoahocHV').show();
		$("#btnXoaNDEdit").css({"display" : "block"});
		showDSKHDK(nguoidung._TaiKhoan);
	}
}


DSNDServices.layDSNDService()
.done( function(res) {
	DSNguoiDung.DSND = res.map(person => new NguoiDung(person.TaiKhoan,  person.MatKhau, person.HoTen,person.SoDT,  person.Email, person.MaLoaiNguoiDung) );
	renderTable(DSNguoiDung.DSND,'#showEntriesUser','#tableNguoiDung',showDSND);
	hienThiDSGV(DSNguoiDung);
})
.fail(err => console.log(err));



$('#showEntriesUser').change(function(){
	renderTable(DSNguoiDung.DSND,'#showEntriesUser','#tableNguoiDung',showDSND);
})


$("body").delegate(".btnXoaTungND", "click", function(){
	event.preventDefault();
	xoaNguoiDungAPI($(this));
})

$("#btnThemNguoiDung").click(function(){
		if($("#formThemNguoiDung").valid()){
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
						$("#modalNguoiDung").modal("hide");
						renderTable(DSNguoiDung.DSND,'#showEntriesUser','#tableNguoiDung',showDSND);
					})
				}
			})
			.fail();
		}
		
	})

//xoá người dùng api
function xoaNguoiDungAPI(btns){
	let idND = $(btns).attr('data-id');
	let rowCanXoa = $(`tr#tr_${idND}`);
	alertXoa("Người Dùng Này").then( result => {
		if(result.value){
			DSNDService.xoaNguoiDungService(idND)
			.done(function(res){
				alertSuccess("Xoá Thành Công!")
						.then((result)=>{
							if(result.value){
								$("#modalCapNhatND").modal("hide");
								rowCanXoa.addClass("animated fadeOutDown")
										.css({"animationDuration":".8s"})
										.one("webkitAnimationEnd", function(){
										DSNguoiDung.xoaNguoiDungTheoTk(idND);
										renderTable(DSNguoiDung.DSND,'#showEntriesUser','#tableNguoiDung',showDSND);
										$("#timND").val("");
								});
							}
						
					})
				})
			.fail(function(err){alertFail("Người Dùng Không Thể Xoá!")});
		}
	})
}


$('#btnCapNhatND').click(function(){
let HoTenCN     = $('#HoTenNDCN').val();
let TaiKhoanCN  = $('#TaiKhoanNDCN').val();
let EmailCN     = $('#EmailNDCN').val();
let SoDTCN      = Number($('#SoDTNDCN').val());
let maNDCN      = $('#maNDCN').val();
let MatKhauNDCN = $('#MatKhauNDCN').val();
if($("#formCapNhatND").valid()){
	let NDCapNhat = new NguoiDung(TaiKhoanCN, MatKhauNDCN, HoTenCN, SoDTCN, EmailCN, maNDCN);
	DSNDService.suaNguoiDungService(NDCapNhat)
	.done(function(res){
				alertSuccess('Cập Nhật Thành Công!')
				.then(()=>{
					$("#modalCapNhatND").modal("hide");
					DSNguoiDung.suaNguoiDung(NDCapNhat);
					renderTable(DSNguoiDung.DSND,'#showEntriesUser','#tableNguoiDung',showDSND);
				})
			})
	.fail(function(err){
		alertFail("Thông Tin Không Thể Thay Đổi")
	});
}
})


$('body').delegate('.btnCapNhatND','click',function(){
	// event.preventDefault();
	createModalSuaND($(this))
})


$("body").delegate(".trNguoiDungTimKiem", "click",function(){
	event.preventDefault();
	createModalSuaND($(this));
	$(".tableTimKiem").removeClass("active");
})

$("body").delegate("#btnXoaNDEdit", "click", function(){
	event.preventDefault();
	xoaNguoiDungAPI($(this));
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
			alertXoa("Người Dùng Này").then(res => {
				if(res.value){
					DSNDService.xoaNguoiDungService(ndCanXoa)
					.done(res => {
						alertSuccess("Xoá Thành Công!")
						.then(res => {
								DSNguoiDung.xoaNguoiDungTheoTk($(cbx[i]).attr("taikhoan"));
								showDSND(DSNguoiDung.DSND, "#dataNguoiDung");
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
				<tr taikhoan=${ndTimKiem._TaiKhoan} data-target="#modalCapNhatND" data-toggle="modal" class="trNguoiDungTimKiem" data-id="${ndTimKiem._TaiKhoan}">
					<td>${i+1}</td>
					<td>${ndTimKiem._TaiKhoan}</td>
					<td>${ndTimKiem._HoTen}</td>
				</tr>
			`;
		}
		$("#dataTimKiemNguoiDung").html(data);
		$("#tableTimKiemNguoiDung").addClass("active");
	}
})



$('#tableNguoiDung th').click(function(){
	let key = $(this).data('sort');
	
	if(key){
		$('#tableNguoiDung th[data-sort]').addClass('both');

		$(this).removeClass('both');
		if($(this).hasClass('asc')){
			$(this).removeClass('asc');
			$(this).addClass('desc');
			DSNguoiDung.DSND.sort(compareValues(key,'desc'));

		}else{
			$(this).removeClass('desc');
			$(this).addClass('asc');
			DSNguoiDung.DSND.sort(compareValues(key))
		}
		$('#tableNguoiDung').parent().next('.pagination').find('.page-item.active > .page-link').click();
	}

})


