import * as $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./../../assets/scss/khoahoc.scss";
import "./../../assets/js/sidebar.js"
// import "./auth.ts";
import { paginate, renderTable, compareValues, pageOnClick }  from "../../assets/js/table.js";
import { KhoaHoc } from "../models/KhoaHoc";
import { KhoaHocServices } from '../services/KhoaHocServices';
import { DanhSachKhoaHoc } from "../models/DanhSachKhoaHoc";
import { DangNhapNguoiDung, DangKiNguoiDung, DangXuatNguoiDung, ktNguoiDungDN } from "./authentication";
const DSKHService: any = new KhoaHocServices();
let danhSachKhoaHoc = new DanhSachKhoaHoc();

ktNguoiDungDN();
DangNhapNguoiDung();
DangKiNguoiDung();
DangXuatNguoiDung();
// showThongTinNguoiDung();

function showKH(DSKH:Array<KhoaHoc>, divLoad){
	let dataKH = "";
 	for(let kh of DSKH){
 		dataKH += `
			<div class="col-md-4 col-12 mb-5 p-md-4 p-1">
                   <div class="khoaHoc__one-block card w-100">
                       <div class="card-img-top z-depth-1-half">
                           <img src="${kh.HinhAnh}" class="img-fluid" alt="" style="min-width: 100%">
                       </div>
                       <div class="card-body text-center z-depth-2">
                           <div class="card-title khoaHoc__ten black-color">
                               <h3>${kh.TenKhoaHoc}</h3>
                           </div>
                           <div class="khoaHoc__type indigo-color">
                               <h5>Lâp Trình - Thiết Kế Website</h5>
                           </div>
                           <div class="khoaHoc__giangVien">
                               <p>Giảng Viên: Lê Quang Song</p>
                           </div>
                           <div class="khoaHoc__prize">
                               <code id="prize">${kh.LuotXem}</code>
                               <small>Lượt Xem</small>
                           </div>
                           <a href="#" class="btn aqua-gradient text-white border-0">
                               <i class="fa fa-pencil"></i> Xem Chi Tiết
                           </a>
                       </div>
                   </div>
               </div>
 		`;
 	}
 	$(divLoad).html(dataKH);
}

DSKHService.layKhoaHocService()
	.done(res =>{
		danhSachKhoaHoc.DSKH = res.map(kh =>{
			let khObject = new KhoaHoc(kh.MaKhoaHoc, kh.TenKhoaHoc,kh.MoTa,kh.HinhAnh,kh.LuotXem,kh.NguoiTao)
			return khObject;
		});
		renderTable(danhSachKhoaHoc.DSKH,'#showEntriesKH','.ListKhoaHoc',showKH);
	})
    .fail(err => console.log(err))

$('#sortKH').change(function(){
    let keyArr = $(this).val().split('_');
    danhSachKhoaHoc.DSKH.sort(compareValues(keyArr[0],keyArr[1]))
    renderTable(danhSachKhoaHoc.DSKH,'#showEntriesKH','.ListKhoaHoc',showKH);
})

$('#showEntriesKH').change(function(){
	renderTable(danhSachKhoaHoc.DSKH,'#showEntriesKH','.ListKhoaHoc',showKH);
})

