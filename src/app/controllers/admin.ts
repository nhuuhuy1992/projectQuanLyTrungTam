//bootstrap
import * as $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//font-awesome
import "font-awesome/css/font-awesome.min.css";
import "./../../assets/scss/admin.scss";
import "./../../assets/js/app_index.js";

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
		<tr TaiKhoan="${motNguoiDung._TaiKhoan}"  HoTen="${motNguoiDung._HoTen}" Email="${motNguoiDung._Email}" SoDT=${motNguoiDung._SoDT} MaLoaiNguoiDung="${motNguoiDung._MaLoaiNguoiDung}">
			<td>${i+1}</td>
			<td>${motNguoiDung._TaiKhoan}</td>
			<td>${motNguoiDung._MatKhau}</td>
			<td>${motNguoiDung._HoTen}</td>
			<td>${motNguoiDung._Email}</td>
			<td>${motNguoiDung._SoDT}</td>
			<td>${motNguoiDung._MaLoaiNguoiDung}</td>
			<td class="d-flex justify-content-center">
			<button class="icon icon-info rounded-circle border-0 fa fa-times mr-3" style="width: 30px;height: 30px" id="btnXoa_${motNguoiDung._TaiKhoan}" data-toggle="tooltip" title="Xoá"></button>
			<button class="icon icon-rainbow rounded-circle border-0  fa fa-pencil" style="width: 30px;height: 30px" id="btnSua_${motNguoiDung._TaiKhoan}" data-toggle="tooltip" title="Sửa"></button>
			</td>
		</tr>
		`;
	}
	divLoad.innerHTML = data;
}
DSNDService.layDSNDService()
		.done(function(res){
			console.log(res);
			for(let person of res){
				console.log(person)
			let HoTen =  person.HoTen
			let TaiKhoan = person.TaiKhoan;
			let Email =person.Email;
			let SoDT = person.SoDT;
			let maND =person.MaLoaiNguoiDung
			let MatKhauND = person.MatKhau;

  			let personObj:NguoiDung = new NguoiDung(TaiKhoan, MatKhauND, HoTen, SoDT, Email, maND);


				DSNguoiDung.DSND.push(personObj)
			}
			showDSND(DSNguoiDung.DSND, getid("dataNguoiDung"));
		})
		.fail(function(err){console.log(err);});

getid("btnThemNguoiDung").addEventListener("click", function(){

  	let HoTen = getInputId("HoTenND").value;
  	let TaiKhoan = getInputId("TaiKhoanND").value;
  	let Email = getInputId("EmailND").value;
  	let SoDT = parseInt(getInputId("SoDTND").value);
  	let maND = getInputId("maND").value;
  	// let tenLoaiND = getInputId("tenLoaiND").value;
  	let MatKhauND = getInputId("MatKhauND").value;

  	let nd:NguoiDung = new NguoiDung(TaiKhoan, MatKhauND, HoTen, SoDT, Email, maND);
  	DSNDService.themNguoiDungService(nd)
  			.done(function(res){
  				location.reload();
  			})
  			.fail(function(err){
  				console.log(err);
  			});

});

















