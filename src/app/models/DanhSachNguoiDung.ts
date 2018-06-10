import { NguoiDung } from './NguoiDung';
export class DanhSachNguoiDung{
	DSND:Array<NguoiDung> = [];
	DSHV:Array<NguoiDung> = [];

	timHocVien(){
		for(let i:number = 0; i < this.slNguoiDung(); i++){
			let ND:NguoiDung = this.DSND[i];
			if(ND._MaLoaiNguoiDung === "HV"){
				this.themHocVien(ND);
			}
		}
	}

	themNguoiDung(nd:NguoiDung){
		this.DSND.push(nd);
	}
	themHocVien(nd:NguoiDung){
		this.DSHV.push(nd);
	}
	timNguoiDungTheoTK(tk:string):number{
		let indexND = -1;
		for(let i:number = 0; i < this.slNguoiDung(); i++){
			let ND = this.DSND[i];
			if(ND._TaiKhoan === tk){
				indexND = i;
				break;
			}
		}
		return indexND;
	}
	slNguoiDung():number{
		return this.DSND.length;
	}
	slHocVien():number{
		// return this.DSHV.length;
		return this.DSND.filter((nd:NguoiDung)=> nd._MaLoaiNguoiDung === "HV" ).length;
	}
	timNguoiDungTheoTen(tuKhoaTen:string):DanhSachNguoiDung{
		let DSNDCanTim:DanhSachNguoiDung = new DanhSachNguoiDung();
		for(let i = 0; i < this.slNguoiDung(); i++){
			let ndCanTim = this.DSND[i];
			if(ndCanTim._HoTen.toLowerCase().trim().search(tuKhoaTen) !== -1){
				DSNDCanTim.themNguoiDung(ndCanTim);
			}
		}
		return DSNDCanTim;
	}
	locNguoiDung(maloaind:string){
		let dsLoaiND = new DanhSachNguoiDung();
		dsLoaiND.DSND = this.DSND.filter( nd => nd._MaLoaiNguoiDung === maloaind)
		return dsLoaiND;
	}
	xoaNguoiDungTheoTk(tk:string){
		let indexNguoiDungCanXoa = this.timNguoiDungTheoTK(tk);
		if(indexNguoiDungCanXoa >= 0){
			this.DSND.splice(indexNguoiDungCanXoa, 1);
		}
	}
	suaNguoiDung(nd:NguoiDung){
		let viTriNguoiDung:number = this.timNguoiDungTheoTK(nd._TaiKhoan);
		let nguoiDungChinhSua:NguoiDung = this.DSND[viTriNguoiDung];
		nguoiDungChinhSua._MatKhau = nd._MatKhau;
		nguoiDungChinhSua._TaiKhoan = nd._TaiKhoan;
		nguoiDungChinhSua._HoTen = nd._HoTen;
		nguoiDungChinhSua._Email = nd._Email;
		nguoiDungChinhSua._MaLoaiNguoiDung = nd._MaLoaiNguoiDung;
	}
}




