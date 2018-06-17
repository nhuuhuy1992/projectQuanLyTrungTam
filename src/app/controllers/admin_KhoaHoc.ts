import * as $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import 'froala-editor';
import "./../../assets/js/froalaEditor.js";
import "../vendors/animate.css";
import "./../../assets/scss/admin.scss";
import "./../../assets/js/app_admin.js";
import "./../../assets/js/validation.js";
//obj
import { renderTable, compareValues }  from "../../assets/js/table.js";
import { KhoaHoc } from "../models/KhoaHoc";
import { KhoaHocServices } from '../services/KhoaHocServices';
import { DanhSachKhoaHoc } from "../models/DanhSachKhoaHoc";
//DI
import { suaKhiClickVaoRow, alertFail, alertSuccess, resetForm, alertXoa } from "./helpers";
// services
let DSKHService: any = new KhoaHocServices();

$('#showEntriesKH').change(function(){
	renderTable(danhSachKhoaHoc.DSKH,'#showEntriesKH','#tableKhoaHoc',showKH);
})
// Khoa Hoc
let danhSachKhoaHoc = new DanhSachKhoaHoc();

DSKHService.layKhoaHocService()
	.done(res =>{
		danhSachKhoaHoc.DSKH =  res.map( kh => new KhoaHoc(kh.MaKhoaHoc, kh.TenKhoaHoc, kh.MoTa, kh.HinhAnh, kh.LuotXem, kh.NguoiTao));
		renderTable(danhSachKhoaHoc.DSKH,'#showEntriesKH','#tableKhoaHoc',showKH);
	})
	.fail()



function showDSKHDK(taikhoan:string){
	DSKHService.layThongTinKH(taikhoan)
	.done(
		res =>{
			let khoahocdk:string ='';
			let khChuaDk: string ='';
			let danhSachKhoaHocDK = new DanhSachKhoaHoc();
			if( typeof res !== 'string'){
				res.forEach((khoahoc)=>{
					khoahocdk+= `<li class="list-group-item"><i class="fa fa-minus" style="color:#1641B5"></i>  ${khoahoc.TenKhoaHoc}</li>`
				})
				danhSachKhoaHocDK.DSKH = danhSachKhoaHoc.DSKH.filter(kh1 => res.every(kh2 => kh1.MaKhoaHoc !== kh2.MaKhoaHoc))

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
	.fail()
}
function showKH(DSKH:Array<KhoaHoc>, divLoad, entry = 0){
	let data:string = "";
	let table = $(divLoad).find('tbody')
	table.html('');
	for(let i:number = 0; i < DSKH.length; i++){
		let khoahoc = DSKH[i];
		data += `
		<tr MaKhoaHoc="${khoahoc.MaKhoaHoc}" id="tr_${khoahoc.MaKhoaHoc}"  class="trKhoaHoc">
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


//   Gán sự kiện thêm khoá học

$('body').delegate('#btnThemKhoaHoc','click',function(){
	let MaKhoaHoc:string = $('#MaKhoaHoc').val();
	let TenKhoaHoc: string = $('#TenKhoaHoc').val();
	let MoTa: string =  $('#MoTa').froalaEditor('html.get');
	let HinhAnh: string = $('#HinhAnh').val();
	let LuotXem: number = parseFloat($('#LuotXem').val());
	let NguoiTao: string = $('#NguoiTao').val();
	if($("#formThemKH").valid()){
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
	}
});
// Gán sự kiện gọi Modal Thêm Kh

$('#btnModalKhoaHoc').click(() =>{
	resetForm("formKH");
	$("#modalKhoaHoc .modal-title").html('<h3 class="modal-heading">Thêm Khoá học</h3>');
	let modal_footer = `
	<button class="btn btn-outline-danger" data-dismiss="modal">Đóng</button>
	<button class="btn btn-outline-success" data-dismiss="modal" id="btnThemKhoaHoc">Thêm</button>
	`;
	$("#modalKhoaHoc .modal-footer").html(modal_footer);
});

function createModalSuaKH(That){
	let idKH = $(That).attr('data-id');
	$('.big-err').html('');

	DSKHService.layCTKHService(idKH)
	.done(
		res =>{
			$("#modalKhoaHoc .modal-title").html('<h3 class="modal-heading">Cập Nhật Khoá Học</h3>');
			$("#btnXoaKHEdit").attr("makhoahoc", idKH);
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
			});
			let modal_footer = `
			<button class="btn btn-outline-success" id="btnCapNhatKH">Cập Nhật</button>
			<button class="btn btn-outline-danger" data-dismiss="modal">Đóng</button>
			<button class="btn btn-outline-warning" id="btnXoaKHEdit">Xoá Khoá Học</button>
			`;
			$("#modalKhoaHoc .modal-footer").html(modal_footer);
			$('#modalKhoaHoc').modal();
		})
	.fail();
};
// Gán sự kiện tìm khoá học

	

function xoaKhoaHoc(btn){
	let idKH = $(btn).attr('data-id');
	let rowCanXoa = $(`tr#tr_${idKH}`);
	alertXoa(`khoá học ${idKH}`).then( result => {
		if(result.value){
			DSKHService.xoaKhoaHocService(idKH).
			done((res)=>{
				alertSuccess("Xoá Thành Công!")
					.then((result)=>{
						if(result.value){	
							$("#modalKhoaHoc").modal("hide");
							rowCanXoa.addClass("animated fadeOutDown")
									.css({"animationDuration":".8s"})
									.one("webkitAnimationEnd", function(){
									danhSachKhoaHoc.xoaKhoaHoc(idKH);
									renderTable(danhSachKhoaHoc.DSKH,'#showEntriesKH','#tableKhoaHoc',showKH);
									$("#timKH").val("");
							});
						}
					})
				})
			.fail((err)=>{
				alertFail("Không Thể Xoá Khoá Học Này!")
			})
		}
	})
}
// Gán sự kiện xoá khoá học
$("body").delegate(".btnXoaKH", "click", function(){
	xoaKhoaHoc($(this));
})


$('body').delegate('.btnSuaKH','click',function(){
	event.preventDefault();
	createModalSuaKH($(this));
})	

$("body").delegate("#btnXoaKHEdit", "click", function(){
	event.preventDefault();
	xoaKhoaHoc($(this));
})

$("body").delegate(".trKhoaHocTimKiem","click", function(){
	event.preventDefault();
	$(".tableTimKiem").removeClass("active");
	createModalSuaKH($(this));
})


$('body').delegate('#btnCapNhatKH','click',()=>{
	let MaKhoaHoc:string = $('#MaKhoaHoc').val();
	let TenKhoaHoc: string = $('#TenKhoaHoc').val();
	let MoTa: string = $('#MoTa').froalaEditor('html.get');
	let HinhAnh: string = $('#HinhAnh').val();
	let LuotXem: number = parseFloat($('#LuotXem').val());
	let NguoiTao: string = $('#NguoiTao').val();
	if($("#formThemKH").valid()){
		let khoahoc = new KhoaHoc(MaKhoaHoc,TenKhoaHoc,MoTa,HinhAnh,LuotXem,NguoiTao);
		DSKHService.capNhatKhoaHocService(khoahoc)
		.done(function(res){
			alertSuccess("Cập Nhật Thành Công!").then((result)=>{
				if(result.value){
					$("#modalKhoaHoc").modal("hide");
					danhSachKhoaHoc.suaKhoaHoc(khoahoc);
					renderTable(danhSachKhoaHoc.DSKH,'#showEntriesKH','#tableKhoaHoc',showKH);
				}
			})
		})
		.fail(function(err){alertFail('Cập Nhật Thất Bại!');});
	}
	
})



$('body').delegate('#btnGhiDanh','click',function(){
	event.preventDefault();
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
		$('#tableKhoaHoc th[data-sort]').addClass('both');
		$(this).removeClass('both');

		if($(this).hasClass('asc')){
			$(this).removeClass('asc');
			$(this).addClass('desc');
			danhSachKhoaHoc.DSKH.sort(compareValues(key,'desc'))
		}else{
			$(this).removeClass('desc');
			$(this).addClass('asc');
			danhSachKhoaHoc.DSKH.sort(compareValues(key))
		}
		$('#tableKhoaHoc').parent().next('.pagination').find('.page-item.active > .page-link').click();
	}

})

$("#mountKH").html(danhSachKhoaHoc.slKhoaHoc());
$("#mountView").html(danhSachKhoaHoc.soView());

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
			<tr MaKhoaHoc=${khTimKiem.MaKhoaHoc} class="trKhoaHocTimKiem" data-id="${khTimKiem.MaKhoaHoc}">
				<td>${i+1}</td>
				<td>${khTimKiem.MaKhoaHoc}</td>
				<td>${khTimKiem.TenKhoaHoc}</td>
			</tr>
			`;
		}
		$("#dataTimKiemKhoaHoc").html(data);
		$("#tableTimKiemKhoaHoc").addClass("active");
	}
})

export { showDSKHDK }