export class HocVien {
     TaiKhoan:string;
     MatKhau:string;
     HoTen:string;
    Email:string;
     SoDT:number;
    
     MaLoaiNguoiDung:string;
    TenLoaiNguoiDung:string;    

    // public get TaiKhoan():string{return this._TaiKhoan}
    // public set TaiKhoan(a:string){this._TaiKhoan = a}

    // public get MatKhau():string{return this._MatKhau}
    // public set MatKhau(a:string){this._MatKhau = a}

    // public get HoTen():string{return this._HoTen}
    // public set HoTen(a:string){this._HoTen = a}

    // public get Email():string{return this._Email}
    // public set Email(a:string){this._Email = a}

    // public get SoDT():number{return this._SoDT}
    // public set SoDT(a:number){this._SoDT = a}

    // public get Email():string{return this._Email}
    // public set Email(a:string){this._Email = a}

    // public get MaLoaiNguoiDung():string{return this._MaLoaiNguoiDung}
    // public set MaLoaiNguoiDung(a:string){this._MaLoaiNguoiDung = a}
    
    // public get TenLoaiNguoiDung():string{return this._TenLoaiNguoiDung}
    // public set TenLoaiNguoiDung(a:string){this._TenLoaiNguoiDung = a}

    
    constructor(TaiKhoan:string, MatKhau:string, HoTen:string, SoDT:number, Email:string, MaLoaiNguoiDung:string, TenLoaiNguoiDung:string){
        this.TaiKhoan = TaiKhoan;
        this.MatKhau = MatKhau;
        this.HoTen = HoTen;
        this.SoDT = SoDT;
        this.Email = Email;
        this.MaLoaiNguoiDung = MaLoaiNguoiDung;
        this.TenLoaiNguoiDung = TenLoaiNguoiDung;
    }
}