//bootstrap
import * as $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//font-awesome
import "font-awesome/css/font-awesome.min.css";
import "./../../assets/scss/user.scss";

import { NguoiDung } from "./../models/NguoiDung";
import { DanhSachNguoiDungServices } from "./../services/NguoiDungServices";
import { KhoaHoc } from "../models/KhoaHoc";
import { KhoaHocServices } from '../services/KhoaHocServices';
import { AuthService } from '../services/AuthService';
import { DanhSachKhoaHoc } from "../models/DanhSachKhoaHoc";
let userAuthService = new AuthService();
let khoaHocService = new KhoaHocServices();
let danhSachKhoaHoc = new DanhSachKhoaHoc();
userAuthService.dangNhapService('nguyentuan','12345')
.done(res => {
    let person    = res[0];
    let HoTen     = person.HoTen
    let TaiKhoan  = person.TaiKhoan;
    let Email     = person.Email;
    let SoDT      = person.SoDT;
    let maND      = person.MaLoaiNguoiDung
    let MatKhauND = person.MatKhau;
    let personObj:  NguoiDung = new NguoiDung(TaiKhoan, MatKhauND, HoTen, SoDT, Email, maND);
    showProfile(personObj);
    khoaHocService.layThongTinKH(personObj._TaiKhoan)
    .done(
        res => {
            for(let course of res){
                khoaHocService.layCTKHService(course.MaKhoaHoc)
                .done(
                    khoahoc =>{
                        let makh:        string = khoahoc.MaKhoaHoc;
                        let tenkh:       string = khoahoc.TenKhoaHoc;
                        let mota:        string = khoahoc.MoTa;
                        let hinhanh:     string = khoahoc.HinhAnh;
                        let luotxem:     number = parseFloat(khoahoc.LuotXem);
                        let nguoitao:    string = khoahoc.NguoiTao;
                        console.log(makh);
                        let objKHoaHoc = new KhoaHoc(makh, tenkh,mota,hinhanh,luotxem,nguoitao)
                        danhSachKhoaHoc.themKhoaHoc(khoahoc)
                        showKhoaHoc(danhSachKhoaHoc.DSKH);
                    }
                    )
                .fail(err => console.log(err))
            }
        }
        )
    .fail(err => console.log(err))
} )
.fail(err => console.log(err))

function showProfile(hocvien:NguoiDung){
    $('.user-account').html(hocvien._TaiKhoan)
    $('.profile__infor').html(`
        <h4 class = "profile__name">${hocvien._HoTen}</h4>
        <p class  = "profile__email"><span>Email:         </span>${hocvien._Email}</p>
        <p class  = "profile__phone"><span>Số điện thoại: </span>${hocvien._SoDT}</p>
        `)

}

function showKhoaHoc(danhSachKhoaHoc){
    let course = '';
    for(let khoahoc of danhSachKhoaHoc.DSKH){
        course +=`
        <div class="col-lg-3 col-md-6">
        <div class="card">
        <img class="card-img-top" src="${khoahoc.HinhAnh}" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">${khoahoc.TenKhoaHoc}</h5>
        </div>
        </div>
        </div>
        `
    }
    
    $('.course__list').html(course)
}

function getExcerpt( str:string, limit:number ){
    let shortText = str;
    shortText = shortText.substr( 0, shortText.lastIndexOf( ' ', limit ) ) + '...';
    return shortText;
}