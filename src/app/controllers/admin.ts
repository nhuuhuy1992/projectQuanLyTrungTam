import * as $ from "jquery";
import swal from "sweetalert2";
import "./admin_NguoiDung";
import "./admin_KhoaHoc";
import "./admin_dashboard";
import { alertDangXuat } from "./helpers";
$("#itemDangXuat").click(function(){
	event.preventDefault();
	alertDangXuat().then( res => {
		if(res.value){
			localStorage.removeItem("NguoiDung");
			window.location.href = "/";
		}
	})

})
