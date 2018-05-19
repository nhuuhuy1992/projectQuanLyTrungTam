import { KhoaHoc } from "./KhoaHoc";

export class DanhSachKhoaHoc{
    DSKH:Array<KhoaHoc> =[];

    themKhoaHoc(khoahoc:KhoaHoc){
        this.DSKH.push(khoahoc);
    }   
    xoaKhoaHoc(){}
    suaKhoaHoc(){}

}