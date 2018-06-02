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
//obj
import { paginate, renderTable, compareValues, pageOnClick }  from "../../assets/js/table.js";
import { KhoaHoc } from "../models/KhoaHoc";
import { KhoaHocServices } from '../services/KhoaHocServices';
import { DanhSachKhoaHoc } from "../models/DanhSachKhoaHoc";
//DI
import { suaKhiClickVaoRow, alertFail, alertSuccess, resetForm } from "./../models/dependInjection";
// services
let DSKHService: any = new KhoaHocServices();
// let DSKhoaHoc = new DanhSachKhoaHoc();
let getid = el => document.getElementById(el);
let getInputId = el => <HTMLInputElement>document.getElementById(el);
let showEntriesKH = $('#showEntriesKH');
$('#showEntriesKH').change(function(){
	renderTable(danhSachKhoaHoc.DSKH,'#showEntriesKH','#tableKhoaHoc',showKH);
})
// Khoa Hoc
let danhSachKhoaHoc = new DanhSachKhoaHoc();
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
function showKH(DSKH:Array<KhoaHoc>, divLoad, entry = 0){
	let data:string = "";
	let table = $(divLoad).find('tbody')
	table.html('');
	for(let i:number = 0; i < DSKH.length; i++){
		let khoahoc = DSKH[i];
		data += `
		<tr MaKhoaHoc="${khoahoc.MaKhoaHoc}"  class="trKhoaHoc">
			<td>${entry+ i+1}</td>
			<td>${khoahoc.MaKhoaHoc}</td>
			<td>${khoahoc.TenKhoaHoc}</td>
			<td>${khoahoc.NguoiTao}</td>
			<td>${khoahoc.LuotXem}</td>
			<td class="d-flex justify-content-center">
				<button type="button" class="icon icon-peach rounded-circle text-danger border-0 fa fa-trash mr-3 btnXoaKH" style="width: 30px;height: 30px" data-id="${khoahoc.MaKhoaHoc}" id="btnXoaKH_${khoahoc.MaKhoaHoc}">
				</button>
				<button class="icon icon-blue rounded-circle border-0  fa fa-pencil btnSuaKH" style="width: 30px;height: 30px" data-id="${khoahoc.MaKhoaHoc}" id="btnSuaKH_${khoahoc.MaKhoaHoc}">
				</button>
			</td>
		</tr>
		`;
	}
	table.html(data);
	suaKhiClickVaoRow(".trKhoaHoc","KH", "makhoahoc");
}
DSKHService.layKhoaHocService()
	.done(res =>{
		danhSachKhoaHoc.DSKH = res.map(kh =>{
			let khObject = new KhoaHoc(kh.MaKhoaHoc, kh.TenKhoaHoc,kh.MoTa,kh.HinhAnh,kh.LuotXem,kh.NguoiTao)
			return khObject;
		});
		renderTable(danhSachKhoaHoc.DSKH,'#showEntriesKH','#tableKhoaHoc',showKH);
	})
	.fail(err => console.log(err))
$('#btnModalKhoaHoc').click(() =>{
	resetForm("formKH");
	let modal_title = 'Thêm Khoa Hoc';
	$("#modalKhoaHoc .modal-title").html(modal_title);
	let modal_footer = `
	<button class="btn btn-danger" data-dismiss="modal">Close</button>
	<button class="btn btn-success" data-dismiss="modal" id="btnThemKhoaHoc">Thêm</button>
	`
	$("#modalKhoaHoc .modal-footer").html(modal_footer);
})
$('body').delegate('#btnThemKhoaHoc','click',function(){
	let MaKhoaHoc:string = $('#MaKhoaHoc').val();
	let TenKhoaHoc: string = $('#TenKhoaHoc').val();
	let MoTa: string =  $('#MoTa').froalaEditor('html.get');
	let HinhAnh: string = $('#HinhAnh').val();
	let LuotXem: number = parseFloat($('#LuotXem').val());
	let NguoiTao: string = $('#NguoiTao').val();
	let khoahoc = new KhoaHoc(MaKhoaHoc,TenKhoaHoc,MoTa,HinhAnh,LuotXem,NguoiTao);
	DSKHService.themKhoaHocService(khoahoc)
	.done(function(res){
		alertSuccess("Thêm Thành Công!").then(()=>{
			danhSachKhoaHoc.themKhoaHoc(khoahoc);
			renderTable(danhSachKhoaHoc.DSKH,'#showEntriesKH','#tableKhoaHoc',showKH);
		})
	})
	.fail(function(err){
		alertFail("Thêm Thất Bại!")
	});

})

$('body').delegate('.btnSuaKH','click',function(){
	let idKH = $(this).attr('data-id');
	DSKHService.layCTKHService(idKH)
	.done(
		res =>{
			let modal_title = 'Cap Nhat Khoa Hoc';
			$("#modalKhoaHoc .modal-title").html(modal_title);
			let modal_footer = `
			<button class="btn btn-danger" data-dismiss="modal">Close</button>
			<button class="btn btn-success" data-dismiss="modal" id="btnCapNhatKH">Capnhat</button>
			`
			$("#modalKhoaHoc .modal-footer").html(modal_footer);
			$('#MaKhoaHoc').val(res.MaKhoaHoc);
			$('#MaKhoaHoc').attr('disabled','disabled');
			$('#TenKhoaHoc').val(res.TenKhoaHoc);
			$('#MoTa').froalaEditor('html.set',res.MoTa);
			$('#HinhAnh').val(res.HinhAnh);
			$('#LuotXem').val(res.LuotXem)
			$('#NguoiTao option').each((e)=>{
				let self =  $('#NguoiTao option').eq(e)
				if(res.NguoiTao === self.html() )
				{
					self.attr('selected','true')

				}
			})
			$('#modalKhoaHoc').modal()
		})
	.fail();
})
$('body').delegate('.btnXoaKH','click',function(){
	let idKH = $(this).attr('data-id');
	swal({
		title:`Bạn có muốn xoá khoá học ${idKH}`,
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Xoá',
		cancelButtonText:'Không'
	}).then( result => {
		if(result.value){
			DSKHService.xoaKhoaHocService(idKH).
			done((res)=>{
				alertSuccess("Xoá Thành Công!").then(()=>{
						danhSachKhoaHoc.xoaKhoaHoc(idKH);
						paginate( danhSachKhoaHoc.DSKH,showEntriesKH, '#tableKhoaHoc',showKH);
					})
				})
			.fail((err)=>{
				alertFail("Không Thể Xoá Khoá Học Này!")
			})
		}
	})

})
$("#timKH").keyup(function(){
	let key:string = $(this).val().trim().toLowerCase();
	let DSKHCanTim = danhSachKhoaHoc.timKhoaHocTheoTen(key);
	let data = "";
	if(key === "" || DSKHCanTim.DSKH.length == 0){
		$("#dataTimKiemKhoaHoc").html("");
		$("#tableTimKiemKhoaHoc").removeClass("active");
	}
	else{
		for(let i:number = 0; i < DSKHCanTim.DSKH.length; i++){
			let khTimKiem = DSKHCanTim.DSKH[i];
			data += `
			<tr MaKhoaHoc=${khTimKiem.MaKhoaHoc} class="trKhoaHocTimKiem" data-choose="tr_${khTimKiem.MaKhoaHoc}">
				<td>${i+1}</td>
				<td>${khTimKiem.MaKhoaHoc}</td>
				<td>${khTimKiem.TenKhoaHoc}</td>
				<td>
					<button style="background: transparent; font-size: 25px; cursor: pointer" class="border-0 fa fa-trash text-danger mr-2 iconTimKiem xoaTimKiemKH" MaKhoaHoc="${khTimKiem.MaKhoaHoc}" id="">
					</button>
					<button style="background: transparent; font-size: 22px; cursor: pointer" class="border-0 fa fa-pencil text-primary iconTimKiem suaTimKiemKH" MaKhoaHoc="${khTimKiem.MaKhoaHoc}" id="">
					</button>
				</td>
			</tr>
			`;
		}
		$("#dataTimKiemKhoaHoc").html(data);
		$("#tableTimKiemKhoaHoc").addClass("active");
	}
})
$("body").delegate(".xoaTimKiemKH", "click", function(){
	let objCanXoa = $(this).attr("MaKhoaHoc");
	$(`#btnXoaKH_${objCanXoa}`).trigger("click");
	console.log($(`#btnXoaKH_${objCanXoa}`));
})
$("body").delegate(".suaTimKiemKH", "click", function(){
	let objCanXoa = $(this).attr("MaKhoaHoc");
	$(`#btnSuaKH_${objCanXoa}`).trigger("click");
})
$('body').delegate('#btnCapNhatKH','click',()=>{
	let MaKhoaHoc:string = $('#MaKhoaHoc').val();
	let TenKhoaHoc: string = $('#TenKhoaHoc').val();
	let MoTa: string = $('#MoTa').froalaEditor('html.get');
	let HinhAnh: string = $('#HinhAnh').val();
	let LuotXem: number = parseFloat($('#LuotXem').val());
	let NguoiTao: string = $('#NguoiTao').val();
	let khoahoc = new KhoaHoc(MaKhoaHoc,TenKhoaHoc,MoTa,HinhAnh,LuotXem,NguoiTao);
	DSKHService.capNhatKhoaHocService(khoahoc)
	.done(function(res){
		alertSuccess("Cập Nhật Thành Công!").then(()=>{
			danhSachKhoaHoc.suaKhoaHoc(khoahoc);
			renderTable(danhSachKhoaHoc.DSKH,'#showEntriesKH','#tableKhoaHoc',showKH);

		})
	})
	.fail(function(err){alertFail('Cập Nhật Thất Bại!');});
})

$('body').delegate('#btnGhiDanh','click',function(){
	let makh:string = $('#listKHoaHocDK').val();
	let taikhoan:string = $('#TaiKhoanNDCN').val();
	DSKHService.ghiDanhKH(makh,taikhoan)
	.done(
		res =>{
			if(res === 'Sucessfully'){
				alertSuccess("Thêm Thành Công!").then(() => {
					showDSKHDK(taikhoan);
				})
			}
		}
		)
	.fail()
})
$('#tableKhoaHoc th').click(function(){
	let key = $(this).data('sort');
	if(key){
		if($(this).hasClass('asc')){
			$(this).removeClass('asc');
			$(this).addClass('desc');
			danhSachKhoaHoc.DSKH.sort(compareValues(key,'desc'))
		}else{
			$(this).removeClass('desc');
			$(this).addClass('asc');
			danhSachKhoaHoc.DSKH.sort(compareValues(key))
		}
		$('#tableKhoaHoc').next('.pagination').find('.page-item.active > .page-link').click();
	}

})
