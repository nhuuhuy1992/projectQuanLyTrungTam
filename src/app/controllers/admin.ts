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
DSNDService.layDSNDService()
		.done(function(res){
			DSNguoiDung.DSND = res;
			DSNguoiDung.showDSND(DSNguoiDung.DSND, getid("dataNguoiDung"));
		})
		.fail(function(err){console.log(err);});

getid("btnThemNguoiDung").addEventListener("click", function(){

  	let HoTen = getInputId("HoTenND").value;
  	let TaiKhoan = getInputId("TaiKhoanND").value;
  	let Email = getInputId("EmailND").value;
  	let SoDT = parseInt(getInputId("SoDTND").value);
  	let maND = getInputId("maND").value;
  	let tenLoaiND = getInputId("tenLoaiND").value;
  	let MatKhauND = getInputId("MatKhauND").value;

  	let nd:NguoiDung = new NguoiDung(TaiKhoan, MatKhauND, HoTen, SoDT, Email, maND, tenLoaiND);

  	DSNDService.themNguoiDungService(nd)
  			.done(function(res){
  				location.reload();
  			})
  			.fail(function(err){
  				console.log(err);
  			});

});

















