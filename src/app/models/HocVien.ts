import { NguoiDung } from './NguoiDung';
import { KhoaHoc } from './KhoaHoc';

export class HocVien extends NguoiDung{

    private _khoaHocDaDK:Array<KhoaHoc> = [];

    public get khoaHocDaDK():Array<KhoaHoc> { return this._khoaHocDaDK}
    public set khoaHocDaDK(a:Array<KhoaHoc>) { this._khoaHocDaDK = a}

    chinhSuaThongTin(){}  //chỉnh sửa thông tin ngừi dùng
    dangKyKhoaHoc(){}      //đăng kí khoá học
    xemDanhSachKH(){}       //xem danh sách đã đăng kí
}
