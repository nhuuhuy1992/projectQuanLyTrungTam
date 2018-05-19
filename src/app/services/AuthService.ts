import * as $ from "jquery";
let url = 'http://sv.myclass.vn/api/QuanLyTrungTam'

export class AuthService {
    dangNhapService(taikhoan:string, matkhau:string){
        return $.ajax({
            url: `${url}/DangNhap?taikhoan=${taikhoan}&matkhau=${matkhau}`,
            type:'GET',
        })
    }
}