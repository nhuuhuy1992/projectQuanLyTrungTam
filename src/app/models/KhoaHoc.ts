export class KhoaHoc {
    public MaKhoaHoc:string;
    public TenKhoaHoc: string;
    public MoTa: string;
    public HinhAnh: string;
    public LuotXem: number;
    public NguoiTao: string;

    constructor(makhoahoc:string, tenkhoahoc:string,mota:string,hinhanh:string,luotxem:number,nguoitao:string){
        this.MaKhoaHoc = makhoahoc;
        this.TenKhoaHoc = tenkhoahoc;
        this.MoTa = mota;
        this.HinhAnh = hinhanh;
        this.LuotXem = luotxem;
        this.NguoiTao= nguoitao
    }
}