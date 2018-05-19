//bootstrap
import * as $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//font-awesome
import "font-awesome/css/font-awesome.min.css";
import "./../../assets/scss/admin.scss";
import 'datatables';
import "./../../assets/js/app_admin.js";
import swal from "sweetalert2";
import 'datatables.net-bs4';

import { NguoiDung } from "./../models/NguoiDung";
import { DanhSachNguoiDungServices } from "./../services/NguoiDungServices";
import { DanhSachNguoiDung } from "./../models/DanhSachNguoiDung";
import { KhoaHoc } from "../models/KhoaHoc";
import { KhoaHocServices } from '../services/KhoaHocServices';
import { DanhSachKhoaHoc } from "../models/DanhSachKhoaHoc";
// services
let DSNguoiDung:DanhSachNguoiDung = new DanhSachNguoiDung();
let DSNDService:any = new DanhSachNguoiDungServices();
let DSKHService: any = new KhoaHocServices();

// 
let getid = el => document.getElementById(el);
let getInputId = el => <HTMLInputElement>document.getElementById(el);



function showDSND(DSND:Array<NguoiDung>, divLoad){
	let data:string = "";
	for(let i:number = 0; i < DSNguoiDung.DSND.length; i++){
		let motNguoiDung = DSNguoiDung.DSND[i];
		data += `
		<tr TaiKhoan="${motNguoiDung._TaiKhoan}"  HoTen="${motNguoiDung._HoTen}" Email="${motNguoiDung._Email}" SoDT=${motNguoiDung._SoDT} MaLoaiNguoiDung="${motNguoiDung._MaLoaiNguoiDung}" matkhau="${motNguoiDung._MatKhau}" id="tr_${motNguoiDung._TaiKhoan}" class="trNguoiDung">
			<td>${i+1}</td>
			<td>${motNguoiDung._TaiKhoan}</td>
			<td>${motNguoiDung._MatKhau}</td>
			<td>${motNguoiDung._HoTen}</td>
			<td>${motNguoiDung._Email}</td>
			<td>${motNguoiDung._SoDT}</td>
			<td>${motNguoiDung._MaLoaiNguoiDung}</td>
			<td class="d-flex justify-content-center">
				<button class="icon icon-info rounded-circle border-0 fa fa-times mr-3 btnXoaTungND" style="width: 30px;height: 30px" id="btnXoa_${motNguoiDung._TaiKhoan}" data-toggle="tooltip" title="Xoá"></button>
				<button class="icon icon-rainbow rounded-circle border-0  fa fa-pencil btnSuaTungND" style="width: 30px;height: 30px" id="btnSua_${motNguoiDung._TaiKhoan}" data-toggle="tooltip" title="Sửa"></button>
			</td>
		</tr>
		`;
	}
	divLoad.innerHTML = data;
	xoaNguoiDungAPI(".btnXoaTungND");
	suaNguoiDungAPI(".btnSuaTungND");
}

let optionTableNguoiDung = {
	// Internationalisation. For more info refer to http://datatables.net/manual/i18n
	"language": {
		"aria": {
			"sortAscending": ": activate to sort column ascending",
			"sortDescending": ": activate to sort column descending"
		},
		"emptyTable": "No data available in table",
		"info": "Showing _START_ to _END_ of _TOTAL_ records",
		"infoEmpty": "No records found",
		"infoFiltered": "(filtered1 from _MAX_ total records)",
		"lengthMenu": "Show _MENU_ records",
		"search": "Search:",
		"zeroRecords": "No matching records found",
		"paginate": {
			"previous": "Prev",
			"next": "Next",
			"last": "Last",
			"first": "First"
		}
	},

	"bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.

	"columns": [{
		"orderable": false
	}, {
		"orderable": true
	}, {
		"orderable": true
	}, {
		"orderable": true
	}, {
		"orderable": true
	}, {
		"orderable": true
	},
	{
		"orderable": true
	},
	{
		"orderable": false
	}
	],
	"lengthMenu": [
		[5, 15, 20, -1],
		[5, 15, 20, "All"] // change per page values here
	],
	// set the initial value
	"pageLength": 5,
	"pagingType": "full_numbers",
	"columnDefs": [{ // set default column settings
		'orderable': false,
		'targets': [0]
	}, {
		"searchable": false,
		"targets": [0]
	}],
	"order": [
			[1, "asc"]
		] // set first column as a default sort by asc
}
//lấy danh sách người dùng api
DSNDService.layDSNDService()
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
			showDSND(DSNguoiDung.DSND, getid("dataNguoiDung"));
			$('#tableNguoiDung').DataTable(optionTableNguoiDung);

			hienThiDSGV(DSNguoiDung);
		})
		.fail(function(err){console.log(err);});

//thêm người dùng vào danh sách người dùng api
getid("btnThemNguoiDung").addEventListener("click", function(){
  	let HoTen = getInputId("HoTenND").value;
  	let TaiKhoan = getInputId("TaiKhoanND").value;
  	let Email = getInputId("EmailND").value;
  	let SoDT = parseInt(getInputId("SoDTND").value);
	let maND = (<HTMLSelectElement>document.getElementById("maND")).value;
  	let MatKhauND = getInputId("MatKhauND").value;

  	let nd:NguoiDung = new NguoiDung(TaiKhoan, MatKhauND, HoTen, SoDT, Email, maND);
  	DSNDService.themNguoiDungService(nd)
  			.done(function(res){
  				swal({
					type: 'success',
					title: 'Thêm Thành Công!',
				}).then(()=>{
  					window.location.reload();
				})
  			})
  			.fail(function(err){
  				// console.log(err);
  				swal({
					type: 'warning',
					title: 'Thêm Thất Bại!',
				})
  			});

});

//xoá người dùng api
function xoaNguoiDungAPI(btns){
	let Arrbtn = document.querySelectorAll(btns);
	for(let i:number = 0; i < Arrbtn.length; i++){
		Arrbtn[i].addEventListener("click", function(){
			let taiKhoan = (this.id.split("_"))[1];
			swal({
				title: '<strong>Bạn Có Chắc Xoá Người Dùng Này?</strong>',
				type: 'warning',
				showCloseButton: true,
				showCancelButton: true,
				focusConfirm: false,
				confirmButtonText:
				'<i class="fa fa-thumbs-up"></i>Yes!',
				cancelButtonText:
				'<i class="fa fa-thumbs-down"></i> No!',
				cancelButtonAriaLabel: 'Thumbs down',
			}).then(function(result){
				if(result.value){
					DSNDService.xoaNguoiDungService(taiKhoan)
							.done(function(res){
								swal(
									'Deleted!',
									'Your file has been deleted.',
									'success'
								).then((result)=>{
									window.location.reload();
								})
							})
							.fail(function(err){
								swal({
									type: 'error',
									title: 'Người Dùng Không Thể Xoá!',
								})
							});

				}
			})

		})
	}
}

//Sửa Thông Tin Người Dùng
function suaNguoiDungAPI(btns){
	let Arrbtn = document.querySelectorAll(btns);
	for(let i:number = 0; i < Arrbtn.length; i++){
		Arrbtn[i].addEventListener("click", function(){
			let taiKhoan = (this.id.split("_"))[1];
			let nd = this.parentNode.parentNode;
			let modalNguoiDung = document.createElement("div");
			modalNguoiDung.setAttribute("id", "modalSuaNguoiDung");
			modalNguoiDung.setAttribute("class", "modal fade");
			document.querySelector("body").appendChild(modalNguoiDung);
			this.setAttribute("data-toggle", "modal");
			this.setAttribute("data-target", "#modalSuaNguoiDung");
			let modalSua = "";
			modalSua += `
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
						    <div class="modal-title">
						        <h3>Sửa Thông Tin Người Dùng</h3>
						    </div>
						    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
							<div class="modal-body container">
							    <form class="row">
							        <div class="col-12">
							            <div class="form-group">
							                <label for="TaiKhoan">Tài Khoản</label>
							                <input type="text" disabled class="form-control" id="TaiKhoanCapNhatND" placeholder="Nhập Vào Tài Khoản" value="${nd.getAttribute("taikhoan")}">
							            </div>
							        </div>
							        <div class="col-12">
							            <div class="form-group">
							                <label for="MatKhauND">Mật Khẩu</label>
							                <input type="text" class="form-control" id="MatKhauCapNhatND" placeholder="Nhập Vào Mật Khẩu" value="${nd.getAttribute("matkhau")}">
							            </div>
							        </div>
							        <div class="col-12">
							            <div class="form-group">
							                <label for="HoTen">Họ Tên</label>
							                <input type="text" class="form-control" id="HoTenCapNhatND" placeholder="Nhập Họ Tên" value="${nd.getAttribute("hoten")}">
							            </div>
							        </div>
							        <div class="col-12">
							            <div class="form-group">
							                <label for="Email">Email</label>
							                <input type="text" class="form-control" id="EmailCapNhatND" placeholder="Nhập Email" value="${nd.getAttribute("email")}">
							            </div>
							        </div>
							        <div class="col-12">
							            <div class="form-group">
							                <label for="SoDT">Số Điện Thoại</label>
							                <input type="text" class="form-control" id="SoDTCapNhatND" placeholder="Nhập Số Điện Thoại" value="${nd.getAttribute("sodt")}">
							            </div>
							        </div>

							        <div class="col-12">
							            <label for="maND">Mã Người Dùng</label>
							            <select class="custom-select" value="${nd.getAttribute("maloainguoidung")}" id="maCapNhatND">
							            `;
								          if(nd.getAttribute("maloainguoidung") === "HV"){
								          	modalSua += `
												
													<option value="HV" selected>HV</option>
													<option value="GV">GV</option>
								          	`;
								          }
								          else if(nd.getAttribute("maloainguoidung") === "GV"){
								          	modalSua += `
													<option value="HV">HV</option>
													<option value="GV" selected>GV</option>
												
								          	`;
								          }
							            
							modalSua += `	
										</select>		
							        </div>
							    </form>
							</div>
							<div class="modal-footer">
							    <button class="btn btn-danger" data-dismiss="modal">Close</button>
							    <button class="btn btn-success" data-dismiss="modal" id="btnSuaNguoiDung_${nd.getAttribute("taikhoan")}">Cập Nhật</button>
							</div>
						</div>
					</div>
			`;
			getid("modalSuaNguoiDung").innerHTML = modalSua;
			xacNhanCapNhatAPI(`btnSuaNguoiDung_${nd.getAttribute("taikhoan")}`);
		})
	}
}
function xacNhanCapNhatAPI(btn){
	document.getElementById(btn).addEventListener("click", function(){
		let HoTenCN = getInputId("HoTenCapNhatND").value;
	  	let TaiKhoanCN = getInputId("TaiKhoanCapNhatND").value;
	  	let EmailCN = getInputId("EmailCapNhatND").value;
	  	let SoDTCN = parseInt(getInputId("SoDTCapNhatND").value);
		// let maNDCN = (<HTMLSelectElement>document.getElementById("maCapNhatND")).value;
	  	let MatKhauNDCN = getInputId("MatKhauCapNhatND").value;

	  	let NDCapNhat = new NguoiDung(TaiKhoanCN, MatKhauNDCN, HoTenCN, SoDTCN, EmailCN, "HV");
	  	//chuyển về chuỗi json
	  	DSNDService.suaNguoiDungService(NDCapNhat)
	  			.done(function(res){
	  				// console.log("thanh cong");
	  				swal({
						type: 'success',
						title: 'Cập Nhật Thành Công!'
					}).then(()=>{
	  					window.location.reload();
					})
	  			})
	  			.fail(function(err){
	  				// console.log(err);
	  				swal({
						type: 'error',
						title: 'Thông Tin Không Thể Thay Đổi!',
					})
	  			});
	})
}

//xoá khi click vào nút xoá nhiều ngừi dùng
getid("btnXoaNhieuND").addEventListener("click", function(){
	let rowNguoiDung = document.querySelectorAll(".trNguoiDung");
	rowNguoiDung.forEach( (el) => {
		if((el.classList[1]) == "choose"){
			let tkSeXoa = el;
			DSNDService.xoaNguoiDungService(tkSeXoa.getAttribute("taikhoan"))
					.done(function(res){
						swal(
							'Deleted!',
							'Your file has been deleted.',
							'success'
						).then((result)=>{
							window.location.reload();
						})
					})
					.fail(function(err){
						swal({
							type: 'error',
							title: 'Người Dùng Không Thể Xoá!',
						})
					});
		}
	});	
});



//tìm kiếm ngừi dùng
getInputId("timND").addEventListener("keyup", function(){
	let key:string = (this.value).trim().toLowerCase();
	let DSNDCanTimKiem = DSNguoiDung.timNguoiDungTheoTen(key);
	showDSND(DSNDCanTimKiem.DSND, getid("dataNguoiDung"));
	console.log(DSNguoiDung.DSND);
	console.log(DSNDCanTimKiem.DSND);
	let data = "";
	if(key === "" || key === " " || DSNDCanTimKiem.DSND.length == 0){
		getid("dataTimKiemNguoiDung").innerHTML = "";
		getid("tableTimKiemNguoiDung").classList.remove("active");
	}
	else{
		for(let i:number = 0; i < DSNDCanTimKiem.DSND.length; i++){
			let ndTimKiem = DSNDCanTimKiem.DSND[i];
			data += `
				<tr taikhoan=${ndTimKiem._TaiKhoan} class="trNguoiDungTimKiem" data-choose="tr_${ndTimKiem._TaiKhoan}">
					<td>${i+1}</td>
					<td>${ndTimKiem._TaiKhoan}</td>
					<td>${ndTimKiem._HoTen}</td>
				</tr>
			`;
		}
		getid("tableTimKiemNguoiDung").classList.add("active");
		getid("dataTimKiemNguoiDung").innerHTML = data;

		let trNDTimKiem = document.querySelectorAll(".trNguoiDungTimKiem");
		for(let i:number = 0; i < trNDTimKiem.length; i++){
			trNDTimKiem[i].addEventListener("click", function(){
				getid("tableTimKiemNguoiDung").classList.remove("active");
				let tkCanTim = getid(this.getAttribute("data-choose"));
				tkCanTim.classList.add("choose");
				window.scroll({
					top: tkCanTim.offsetTop, 
					left: 0, 
					behavior: 'smooth' 
				})
			})
		}
	}
});










// Khoa Hoc
let danhSachKhoaHoc = new DanhSachKhoaHoc();
function showKH(DSKH:Array<KhoaHoc>, divLoad){
	let data:string = "";
	DSKH.forEach((khoahoc:KhoaHoc, i) => {
			data += `
			<tr MaKhoaHoc="${khoahoc.MaKhoaHoc}"  class="trKhoaHoc">
				<td>${i+1}</td>
				<td>${khoahoc.MaKhoaHoc}</td>
				<td>${khoahoc.TenKhoaHoc}</td>
				<td>${khoahoc.NguoiTao}</td>
				<td>${khoahoc.LuotXem}</td>
				<td class="d-flex justify-content-center">
					<button class="icon icon-info rounded-circle border-0 fa fa-times mr-3 btnXoaKH" style="width: 30px;height: 30px"    data-id="${khoahoc.MaKhoaHoc}" data-toggle="tooltip" title="Xoá"></button>
					<button class="icon icon-rainbow rounded-circle border-0  fa fa-pencil btnSuaKH" style="width: 30px;height: 30px"   data-id="${khoahoc.MaKhoaHoc}" data-toggle="tooltip" title="Sửa"></button>
				</td>
			</tr>
			`;
		}
	);
	$(divLoad).html(data);
	// xoaNguoiDungAPI(".btnXoaTungND");
	// suaNguoiDungAPI(".btnSuaTungND");
}

DSKHService.layKhoaHocService()
	.done(res =>{
		danhSachKhoaHoc.DSKH = res.map(kh =>{
			let khObject = new KhoaHoc(kh.MaKhoaHoc, kh.TenKhoaHoc,kh.MoTa,kh.HinhAnh,kh.LuotXem,kh.NguoiTao)
			return khObject;
		})
		console.log(danhSachKhoaHoc)
		showKH(danhSachKhoaHoc.DSKH, '#dataKhoaHoc')

	})
	.fail(
		err => console.log(err)
	)



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
function resetFormKH(){
	$('#MaKhoaHoc').val('');
	$('#TenKhoaHoc').val('');
	$('#MoTa').val('');
	$('#HinhAnh').val('');
	$('#LuotXem').val('')
	$('#NguoiTao').val('');
}


$('#btnModalKhoaHoc').click(() =>{
	resetFormKH();
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
    let MoTa: string = $('#MoTa').val();
    let HinhAnh: string = $('#HinhAnh').val();
    let LuotXem: number = parseFloat($('#LuotXem').val());
	let NguoiTao: string = $('#NguoiTao').val();
	let khoahoc = new KhoaHoc(MaKhoaHoc,TenKhoaHoc,MoTa,HinhAnh,LuotXem,NguoiTao);
	// console.log(khoahoc);
	DSKHService.themKhoaHocService(khoahoc)
	.done(function(res){
		swal({
		  type: 'success',
		  title: 'Thêm Thành Công!',
	  }).then(()=>{
			window.location.reload();
	  })
	})
	.fail(function(err){
		// console.log(err);
		swal({
		  type: 'warning',
		  title: 'Thêm Thất Bại!',
	  })
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
			$('#TenKhoaHoc').val(res.TenKhoaHoc);
			$('#MoTa').html(res.MoTa);
			$('#HinhAnh').val(res.HinhAnh);
			$('#LuotXem').val(res.LuotXem)
			$('#NguoiTao option').each((e)=>{
				let self =  $('#NguoiTao option').eq(e)
				if(res.NguoiTao === self.html() )
				{
					self.attr('selected','true')
					console.log($('#NguoiTao option').eq(e).html());
					
				}
			})
			$('#modalKhoaHoc').modal()
		}
	)
})

$('body').delegate('#btnCapNhatKH','click',()=>{
	let MaKhoaHoc:string = $('#MaKhoaHoc').val();
    let TenKhoaHoc: string = $('#TenKhoaHoc').val();
    let MoTa: string = $('#MoTa').val();
    let HinhAnh: string = $('#HinhAnh').val();
    let LuotXem: number = parseFloat($('#LuotXem').val());
	let NguoiTao: string = $('#NguoiTao').val();
	let khoahoc = new KhoaHoc(MaKhoaHoc,TenKhoaHoc,MoTa,HinhAnh,LuotXem,NguoiTao);
	// console.log(khoahoc);
	DSKHService.capNhatKhoaHocService(khoahoc)
	.done(function(res){
		swal({
		  type: 'success',
		  title: 'Cập Nhật Thành Công!',
	  }).then(()=>{
			window.location.reload();
	  })
	})
	.fail(function(err){
		// console.log(err);
		swal({
		  type: 'warning',
		  title: 'Cập Nhật Thất Bại!',
	  })
	});

})


$('body').delegate('.btnXoaKH','click',function(){
	let idKH = $(this).attr('data-id');
	swal({
		title:`Bạn có muốn xoá khoá học ${idKH}`,
		// text: "It will permanently deleted !",
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Xoá',
		cancelButtonText:'Không'
	  }).then(function() {
		DSKHService.xoaKhoaHocService(idKH).
		done((res)=>{
			swal(
				'Xóa Thành Công'
			  ).then(()=>{
				window.location.reload();
		  })
		})
		.fail((err)=>{
			swal(
				'Xóa thất bại'
			  );
		})
	
	  })
			
})