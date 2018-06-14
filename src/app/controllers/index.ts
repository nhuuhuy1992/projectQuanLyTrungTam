import * as $ from "jquery";
import validate from "jquery-validation";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import swal from "sweetalert2";
import "font-awesome/css/font-awesome.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel";
import "./../../assets/scss/index.scss";
import "particles.js";
import "./../../assets/js/validation";	
import "./../vendors/animate.css";
import "./../../assets/js/sidebar.js"
import "./../../assets/js/app_index.js";
import { DanhSachNguoiDungServices } from "./../services/NguoiDungServices";
import { KhoaHoc } from "./../models/KhoaHoc";
import { DanhSachNguoiDung } from "./../models/DanhSachNguoiDung";
import { DanhSachKhoaHoc } from "./../models/DanhSachKhoaHoc";
import { KhoaHocServices } from "./../services/KhoaHocServices";

import { DangNhapNguoiDung, DangKiNguoiDung, luuNguoiDK, ktNguoiDungDN, xoaNguoiDungLocal, DangXuatNguoiDung } from "./authentication";

const DSKhoaHoc = new DanhSachKhoaHoc();
const DSKHServices = new KhoaHocServices();

//lấy danh sách người dùng và khoá học

DSKHServices.layKhoaHocService()
.done(res =>{
	DSKhoaHoc.DSKH =  res.map( kh => new KhoaHoc(kh.MaKhoaHoc, kh.TenKhoaHoc, kh.MoTa, kh.HinhAnh, kh.LuotXem, kh.NguoiTao));
})
.fail()
DangNhapNguoiDung();
DangKiNguoiDung();
ktNguoiDungDN();
DangXuatNguoiDung();
// showThongTinNguoiDung();
//Tìm kiếm khoá học
(function timKiemTatCaKH(){
	$("#inputTimKiem").keyup(function(){
		let tukhoa = $(this).val().toLowerCase().trim();
		let DSKHCanTimKiem = DSKhoaHoc.timKhoaHocTheoTen(tukhoa);
		let dataKH = "";
		if(tukhoa === ""){
			$(".block-kh").html("");
			$(".block-kh").removeClass("active");
		}
		else{
			dataKH += `
				<h2 class="resultFind">Kết Quả Tìm Kiếm: ${DSKHCanTimKiem.slKhoaHoc()} Khoá Học</h2> 
			`;
			for(let i = 0; i < DSKHCanTimKiem.slKhoaHoc(); i++){
				let khCantim:KhoaHoc = DSKHCanTimKiem.DSKH[i];
				dataKH += `
					<div class="one-block-kh">
						<div class="info-left">
							<img src="${khCantim.HinhAnh}" class="img-fluid" alt="">
						</div>
						<div class="info-right">
							<h2 class="tenKhoaTim">${khCantim.TenKhoaHoc}</h2>
							<div class="khoaHoc__type indigo-color">
								<h5>Lâp Trình - Thiết Kế Website</h5>
							</div>
						</div>
					</div>
				`;
			}
			$(".block-kh").html(dataKH);
			$(".block-kh").addClass("active");
		}
	})
}());
//reset khi modal form đóng
(function reset(){
	$(".modalForm").on("hidden.bs.modal", function(){
		$(".txt").val("");
		$(".input__field--jiro").closest("span.input").removeClass("input--filled");
	})
	$("#FormTimKiem").on("hidden.bs.modal", function () {
		$(".block-kh").html("");
		$(".block-kh").removeClass("active");
	});
	$("#modal-video").on("hidden.bs.modal", function(){
		$("video").trigger("pause");
	})
}());



