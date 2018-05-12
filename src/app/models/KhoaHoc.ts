export class KhoaHoc {
    MaKhoaHoc:string;
    TenKhoaHoc: string;
    MoTa: string;
    HinhAnh: string;
    LuotXem: number;
    NguoiTao: string;
    constructor(makhoahoc:string, tenkhoahoc:string,mota:string,hinhanh:string,luotxem:number,nguoitao:string){
        this.MaKhoaHoc = makhoahoc;
        this.TenKhoaHoc = tenkhoahoc;
        this.MoTa = mota;
        this.HinhAnh = hinhanh;
        this.NguoiTao= nguoitao
    }
}