export class KhoaHoc {
    private _MaKhoaHoc:string;
    private _TenKhoaHoc: string;
    private _MoTa: string;
    private _HinhAnh: string;
    private _LuotXem: number;
    private _NguoiTao: string;

    public get MaKhoaHoc():string{return this._MaKhoaHoc}
    public set MaKhoaHoc(a:string){this._MaKhoaHoc = a}

    public get TenKhoaHoc():string{return this._TenKhoaHoc}
    public set TenKhoaHoc(a:string){this._TenKhoaHoc = a}

    public get MoTa():string{return this._MoTa}
    public set MoTa(a:string){this._MoTa = a}

    public get HinhAnh():string{return this._HinhAnh}
    public set HinhAnh(a:string){this._HinhAnh = a}

    public get LuotXem():number{return this._LuotXem}
    public set LuotXem(a:number){this._LuotXem = a}

    public get NguoiTao():string{return this._NguoiTao}
    public set NguoiTao(a:string){this._NguoiTao = a}

    constructor(makhoahoc:string, tenkhoahoc:string,mota:string,hinhanh:string,luotxem:number,nguoitao:string){
        this.MaKhoaHoc = makhoahoc;
        this.TenKhoaHoc = tenkhoahoc;
        this.MoTa = mota;
        this.HinhAnh = hinhanh;
        this.LuotXem = luotxem;
        this.NguoiTao= nguoitao
    }
}