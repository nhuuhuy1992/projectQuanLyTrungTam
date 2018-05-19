export class KhoaHoc {
    public MaKhoaHoc:string;
    public TenKhoaHoc: string;
    public MoTa: string;
    public HinhAnh: string;
    public LuotXem: number;
    public NguoiTao: string;

    // public get _MaKhoaHoc():string{ return this._MaKhoaHoc}
    // public set _MaKhoaHoc(a:string){ this._MaKhoaHoc = a}

    // public get _TenKhoaHoc():string{ return this._TenKhoaHoc}
    // public set _TenKhoaHoc(a:string){ this._TenKhoaHoc = a}

    // public get _MoTa():string{ return this._MoTa}
    // public set _MoTa(a:string){ this._MoTa = a}

    // public get _HinhAnh():string{ return this._HinhAnh}
    // public set _HinhAnh(a:string){ this._HinhAnh = a}
    
    // public get _LuotXem():number{ return this._LuotXem}
    // public set _LuotXem(a:number){ this._LuotXem = a}

    // public get _NguoiTao():string{ return this._NguoiTao}
    // public set _NguoiTao(a:string){ this._NguoiTao = a}

    constructor(makhoahoc:string, tenkhoahoc:string,mota:string,hinhanh:string,luotxem:number,nguoitao:string){
        this.MaKhoaHoc = makhoahoc;
        this.TenKhoaHoc = tenkhoahoc;
        this.MoTa = mota;
        this.HinhAnh = hinhanh;
        this.LuotXem = luotxem;
        this.NguoiTao= nguoitao
    }
}