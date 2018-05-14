import { NguoiDung } from './NguoiDung';
import { HocVien } from './HocVien';

export class DanhSachNguoiDung{

	DSND:Array<NguoiDung> = [];
	DSHV:Array<HocVien> = [];

	showDSND(DSND:Array<NguoiDung>, divLoad){
		let data:string = "";
		for(let i:number = 0; i < this.DSND.length; i++){
			let motNguoiDung:NguoiDung = DSND[i];
			data += `
			<tr TaiKhoan="${motNguoiDung.TaiKhoan}"  HoTen="${motNguoiDung.HoTen}" Email="${motNguoiDung.Email}" SoDT=${motNguoiDung.SoDT} MaLoaiNguoiDung="${motNguoiDung.MaLoaiNguoiDung}" TenLoaiNguoiDung="${motNguoiDung.TenLoaiNguoiDung}">
				<td>${i+1}</td>
				<td>${motNguoiDung.TaiKhoan}</td>
				<td>${motNguoiDung.MatKhau}</td>
				<td>${motNguoiDung.HoTen}</td>
				<td>${motNguoiDung.Email}</td>
				<td>${motNguoiDung.SoDT}</td>
				<td>${motNguoiDung.MaLoaiNguoiDung}</td>
				<td>${motNguoiDung.TenLoaiNguoiDung}</td>
				<td class="d-flex justify-content-center">
				<button class="icon icon-info rounded-circle border-0 fa fa-times mr-3" style="width: 30px;height: 30px" id="btnXoa_${motNguoiDung.TaiKhoan}" data-toggle="tooltip" title="Xoá"></button>
				<button class="icon icon-rainbow rounded-circle border-0  fa fa-pencil" style="width: 30px;height: 30px" id="btnSua_${motNguoiDung.TaiKhoan}" data-toggle="tooltip" title="Sửa"></button>
				</td>
			</tr>
			`;
		}
		divLoad.innerHTML = data;
	}
	themNguoiDung(){}
	xoaNguoiDung(){}
	suaNguoiDung(){}
	ghiDanhKhoaHoc(){}
}




