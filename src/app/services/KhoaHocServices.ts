import * as $ from "jquery";
import { KhoaHoc } from "./../models/KhoaHoc";
let url = 'http://sv.myclass.vn/api/QuanLyTrungTam'
export class KhoaHocServices {
    layKhoaHocService(){
        
        return $.ajax({
            async: false,
            type: 'GET',
            url:`${url}/DanhSachKhoaHoc`,
            dataType:'json'
        })
    }
    themKhoaHocService(khoahoc:KhoaHoc){
        return $.ajax({
            type:'POST',
            url: `${url}/ThemKhoaHoc`,
            data:khoahoc,
            dataType: 'json'
        })
    }
    xoaKhoaHocService(id:string){
        return $.ajax({
            type:'DELETE',
            url: `${url}/XoaKhoaHoc/${id}`,
            dataType:'json'
        })
    }
    capNhatKhoaHocService(khoahoc:KhoaHoc){
        let khoahocJson = JSON.stringify(khoahoc)
        return $.ajax({
            type:'PUT',
            url: `${url}/CapNhatKhoaHoc`,
            dataType:'json',
            contentType:'application/json',
            data: khoahocJson
        })
    }
    layCTKHService(id:string){
        return $.ajax({
            type: 'GET',
            url:`${url}/ChiTietKhoaHoc/${id}`,
        })
    }
    layThongTinKH(taikhoan:string){
        return $.ajax({
            type: 'GET',
            url:`${url}/LayThongtinKhoaHoc?taikhoan=${taikhoan}`,
        })
    }
    ghiDanhKH(makh: string, taikhoan:string){
        let data = JSON.stringify({MaKhoaHoc: makh, TaiKhoan: taikhoan})
        return $.ajax({
            type:'POST',
            url:`${url}/GhiDanhKhoaHoc`,
            dataType:'json',
            contentType:'application/json',
            data: data
        })

    }
}