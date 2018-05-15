//bootstrap
import * as $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//font-awesome
import "font-awesome/css/font-awesome.min.css";
import "./../../assets/scss/admin.scss";
import "./../../assets/js/app_admin.js";
import swal from "sweetalert2";

import { NguoiDung } from "./../models/NguoiDung";
import { DanhSachNguoiDungServices } from "./../services/NguoiDungServices";
import { DanhSachNguoiDung } from "./../models/DanhSachNguoiDung";

let DSNguoiDung:DanhSachNguoiDung = new DanhSachNguoiDung();
let DSNDService:any = new DanhSachNguoiDungServices();

let getid = el => document.getElementById(el);
let getInputId = el => <HTMLInputElement>document.getElementById(el);




function showDSND(DSND:Array<NguoiDung>, divLoad){
	let data:string = "";
	for(let i:number = 0; i < DSNguoiDung.DSND.length; i++){
		let motNguoiDung = DSNguoiDung.DSND[i];
		data += `
		<tr TaiKhoan="${motNguoiDung._TaiKhoan}"  HoTen="${motNguoiDung._HoTen}" Email="${motNguoiDung._Email}" SoDT=${motNguoiDung._SoDT} MaLoaiNguoiDung="${motNguoiDung._MaLoaiNguoiDung}" matkhau="${motNguoiDung._MatKhau}">
			<td>${i+1}</td>
			<td>${motNguoiDung._TaiKhoan}</td>
			<td>${motNguoiDung._MatKhau}</td>
			<td>${motNguoiDung._HoTen}</td>
			<td>${motNguoiDung._Email}</td>
			<td>${motNguoiDung._SoDT}</td>
			<td>${motNguoiDung._MaLoaiNguoiDung}</td>
			<td class="d-flex justify-content-center border-0">
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
  				console.log(err);
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
								console.log(DSNguoiDung.DSND);
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
								     //      if((<HTMLSelectElement>document.getElementById(`${nd.getAttribute("taikhoan")}`)).value === "hv"){
								     //      	modalSua += `
												
													// <option value="HV" selected>HV</option>
													// <option value="GV">GV</option>
								     //      	`;
								     //      }
								     //      else if((<HTMLSelectElement>document.getElementById(`${nd.getAttribute("taikhoan")}`)).value === "GV"){
								     //      	modalSua += `
													// <option value="HV">HV</option>
													// <option value="GV" selected>GV</option>
												
								     //      	`;
								     //      }
							            
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
		let maNDCN = (<HTMLSelectElement>document.getElementById("maCapNhatND")).value;
	  	let MatKhauNDCN = getInputId("MatKhauCapNhatND").value;

	  	let NDCapNhat = new NguoiDung(TaiKhoanCN, MatKhauNDCN, HoTenCN, SoDTCN, EmailCN, maNDCN);
	  	//chuyển về chuỗi json
	  	let jsonNDCapNhat = JSON.stringify(NDCapNhat);
	  	DSNDService.suaNguoiDungService(jsonNDCapNhat)
	  			.done(function(res){
	  				console.log("thanh cong");
	  				// window.location.reload();
	  			})
	  			.fail(function(err){
	  				console.log(err);
	  			});
	})
}
























