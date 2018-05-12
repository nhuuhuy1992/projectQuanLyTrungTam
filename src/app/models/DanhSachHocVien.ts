import { HocVien } from './HocVien';

export class DanhSachHocVien {
    DSHV:Array<HocVien> = [];
    themHocVien(hv:HocVien){
        this.DSHV.push(hv);
    }
}














