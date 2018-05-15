export class NguoiDung {
    private TaiKhoan:string;
    private MatKhau:string;
    private HoTen:string;
    private Email:string;
    private SoDT:number;
    private MaLoaiNguoiDung:string;
    // private _TenLoaiNguoiDung:string;    

    public get _TaiKhoan():string{return this.TaiKhoan}
    public set _TaiKhoan(a:string){this.TaiKhoan = a}

    public get _MatKhau():string{return this.MatKhau}
    public set _MatKhau(a:string){this.MatKhau = a}

    public get _HoTen():string{return this.HoTen}
    public set _HoTen(a:string){this.HoTen = a}

    public get _SoDT():number{return this.SoDT}
    public set _SoDT(a:number){this.SoDT = a}

    public get _Email():string{return this.Email}
    public set _Email(a:string){this.Email = a}

    public get _MaLoaiNguoiDung():string{return this.MaLoaiNguoiDung}
    public set _MaLoaiNguoiDung(a:string){this.MaLoaiNguoiDung = a}
    
    // public get TenLoaiNguoiDung():string{return this._TenLoaiNguoiDung}
    // public set TenLoaiNguoiDung(a:string){this._TenLoaiNguoiDung = a}
    
    constructor(TaiKhoan:string, MatKhau:string, HoTen:string, SoDT:number, Email:string, MaLoaiNguoiDung:string){
        this._TaiKhoan = TaiKhoan;
        this._MatKhau = MatKhau;
        this._HoTen = HoTen;
        this._SoDT = SoDT;
        this._Email = Email;
        this._MaLoaiNguoiDung = MaLoaiNguoiDung;
        // this.TenLoaiNguoiDung = TenLoaiNguoiDung;
    }
}