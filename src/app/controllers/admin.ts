import * as $ from "jquery";
import swal from "sweetalert2";
import "./../models/admin_NguoiDung";
import "./../models/admin_KhoaHoc";
$("#itemDangXuat").click(function(){
	event.preventDefault();
	swal({
		title:`Bạn có muốn đăng xuất?`,
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'có',
		cancelButtonText:'Không'
	}).then( res => {
		if(res.value){
			localStorage.removeItem("NguoiDung");
			window.location.href = "/";
		}
	})

})
