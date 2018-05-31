import { KhoaHoc } from "./KhoaHoc";

export class DanhSachKhoaHoc{
	DSKH:Array<KhoaHoc> =[];

	themKhoaHoc(khoahoc:KhoaHoc){
		this.DSKH.push(khoahoc);
	}
	timIndexKHTheoTen(tenKH:string){
		let indexKH:number = -1;
		for(let i:number = 0; i < this.DSKH.length; i++){
			if(this.DSKH[i].TenKhoaHoc === tenKH){
				indexKH = i;
				break;
			}
		}
		return indexKH;
	}
	timKhoaHocTheoTen(ten:string):DanhSachKhoaHoc{
		let DSKHCanTim:DanhSachKhoaHoc = new DanhSachKhoaHoc();
		for(let i = 0; i < this.slKhoaHoc(); i++){
			let khCanTim = this.DSKH[i];
			if(khCanTim.TenKhoaHoc.toLowerCase().trim().search(ten) !== -1){
				DSKHCanTim.themKhoaHoc(khCanTim);
			}
		}
		return DSKHCanTim;
	}
	slKhoaHoc(){
		return this.DSKH.length;
	}
	xoaKhoaHoc(){}
	suaKhoaHoc(){}

}
