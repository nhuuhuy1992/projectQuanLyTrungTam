import * as $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import swal from "sweetalert2";
import "./../vendors/animate.css";
import "./../../assets/scss/admin.scss";
import "./../vendors/animsition.min.js"
import "./../vendors/Chart.bundle.min.js"
import "./../../assets/js/dashboard.js";
import "./../../assets/js/app_admin.js";

import { NguoiDung } from "./../models/NguoiDung";
import { DanhSachNguoiDungServices } from "./../services/NguoiDungServices";
import { DanhSachNguoiDung } from "./../models/DanhSachNguoiDung";
import { KhoaHoc } from "../models/KhoaHoc";
import { KhoaHocServices } from '../services/KhoaHocServices';
import { DanhSachKhoaHoc } from "../models/DanhSachKhoaHoc";

import { getDataNDServices, getDataKHServices } from "./dependInjection";

const DSNguoiDung = new DanhSachNguoiDung();
for(let person of getDataNDServices().responseJSON){
	let personObj:  NguoiDung = new NguoiDung(person.TaiKhoan, person.MatKhau, person.HoTen, person.SoDT, person.Email, person.MaLoaiNguoiDung);
	DSNguoiDung.themNguoiDung(personObj);
}
$("#mountND").html(DSNguoiDung.slNguoiDung());
DSNguoiDung.timHocVien();
$("#mountHV").html(DSNguoiDung.slHocVien());

const DSKhoaHoc = new DanhSachKhoaHoc();
for(let kh of getDataKHServices().responseJSON){
	let khOBJ:  KhoaHoc = new KhoaHoc(kh.MaKhoaHoc, kh.TenKhoaHoc, kh.MoTa, kh.HinhAnh, kh.LuotXem, kh.NguoiTao);
	DSKhoaHoc.themKhoaHoc(khOBJ);
}
$("#mountKH").html(DSKhoaHoc.slKhoaHoc());
$("#mountView").html(DSKhoaHoc.soView());
