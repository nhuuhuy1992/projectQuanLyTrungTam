//hàm lấy id
function getid(el){
	return document.getElementById(el);
}
var input = document.querySelectorAll(".input__field");
var thongBao = document.querySelectorAll(".thongBao");
var btnDangKy = getid("btnDangKy");
console.log(btnDangKy);

// //mảng chứa các thông báo
var mangThongBao = [
	"*Xin nhập vào họ",  //0
	"*Xin nhập vào tên",  //1
	"*Xin nhập email",  //2
	"*Xin nhập số điện thoại",  //3
	"*Xin nhập tên đăng nhập",  //4
	"*Họ chỉ chứa các kí tự",  //5
	"*Tên chỉ chứa các kí tự",  //6
	"*Xin nhập đúng email",   //7
	"*Số điện thoại chỉ chứa số và có ít nhất 8 số và nhiều nhất 15 số",   //8
];

btnDangKy.addEventListener("click", function(){
	event.preventDefault();
	validation();
});

function validation(){
	var result =false;
	//check họ
	var flag_ho = checkEmpty("inputHo", "thongBaoHo", 0);
	if(flag_ho){
		checkLetter("inputHo", "thongBaoHo", 5);
	}
	else{
		checkEmpty("inputHo", "thongBaoHo", 0);
	}
	//check ten
	var flag_ten = checkEmpty("inputTen", "thongBaoTen", 1);
	if(flag_ten){
		checkLetter("inputTen", "thongBaoTen", 6);
	}
	else{
		checkEmpty("inputTen", "thongBaoTen", 1);
	}

	//check email
	var flag_email = checkEmpty("inputEmail", "thongBaoEmail", 2);
	if(flag_email){
		checkEmail("inputEmail", "thongBaoEmail", 7);
	}
	else{
		checkEmpty("inputEmail", "thongBaoEmail", 2);
	}

	// //check phone
	var flag_phone = checkEmpty("inputSDT", "thongBaoSDT", 3);
	if(flag_phone){
		checkPhoneNumber("inputSDT", "thongBaoSDT", 8);
	}
	else{
		checkEmpty("inputSDT", "thongBaoSDT", 3);
	}


	// if((flag_1) && (flag_2) && (flag_3) && (flag_4) && (flag_5) && (flag_6) && (flag_7) && (flag_8)){
	// 	result = true;
	// }
	// else{
	// 	result = false;
	// }
	return result;
}


for(var i = 0; i < input.length; i++){

	//Xử lí khi focus vào input
	input[i].addEventListener("focus", function(){
		var getIdInput = this.getAttribute("id");//lấy id cuả input đó
		if(getIdInput == "inputHo"){   //nếu id trùng thì mính sẽ cho div thông báo tương ứng với thông báo trong mảng
			var flag_ten = focusInput(this, 0);
			if(flag_ten){   //nếu đã có kí tự thì sẽ kiểm tra tiếp kí tự có đúng hay không
				checkLetter("inputHo","thongBaoHo",5);
			}
			else{   //nếu chưa có kí tự thì sẽ báo lỗi
				focusInput(this, 0);
			}
		}
		if(getIdInput == "inputTen"){   //nếu id trùng thì mính sẽ cho div thông báo tương ứng với thông báo trong mảng
			var flag_ten = focusInput(this, 1);
			if(flag_ten){   //nếu đã có kí tự thì sẽ kiểm tra tiếp kí tự có đúng hay không
				checkLetter("inputTen", "thongBaoTen", 6);
			}
			else{   //nếu chưa có kí tự thì sẽ báo lỗi
				focusInput(this, 1);
			}
		}
		else if(getIdInput == "inputEmail"){   //nếu id trùng thì mính sẽ cho div thông báo tương ứng với thông báo trong mảng
			var flag_email = focusInput(this, 2);
			if(flag_email){   //nếu đã có kí tự thì sẽ kiểm tra tiếp kí tự có đúng hay không
				checkEmail("inputEmail", "thongBaoEmail", 7);
			}
			else{   //nếu chưa có kí tự thì sẽ báo lỗi
				focusInput(this, 2);
			}
		}
		else if(getIdInput == "inputSDT"){   //nếu id trùng thì mính sẽ cho div thông báo tương ứng với thông báo trong mảng
			var flag_sdt = focusInput(this, 3);
			if(flag_sdt){   //nếu đã có kí tự thì sẽ kiểm tra tiếp kí tự có đúng hay không
				var flag_number = checkPhoneNumber("inputSDT", "thongBaoSDT", 8);
				if(flag_number){
					checkMinMax("inputSDT", "thongBaoSDT", 8, 15, 8);
				}
				else{
					checkPhoneNumber("inputSDT", "thongBaoSDT", 8);
				}
			}
			else{   //nếu chưa có kí tự thì sẽ báo lỗi
				focusInput(this, 3);
			}
		}
	});


	//Xử lí khi keyup vào input
	input[i].addEventListener("keyup", function(){
		var getIdInput = this.getAttribute("id");
		var thongBao = this.getAttribute("data-thongbao");
		var	idThhongBao = getid(thongBao);
		if(getIdInput.value == "" || getIdInput.value == " "){  //khi input đó rỗng
			if(getIdInput == "inputTen"){
				checkEmpty("inputTen", "thongBaoTen", 1);
			}
			else if(getIdInput == "inputHo"){
				checkEmpty("inputHo", "thongBaoHo", 0);
			}
			else if(getIdInput == "inputEmail"){
				checkEmpty("inputEmail", "thongBaoEmail", 2);
			}
			else if(getIdInput == "inputSDT"){
				checkEmpty("inputSDT", "thongBaoSDT", 3);
			}
		}
		else{  //khi input đó đã có giá trị
			if(getIdInput == "inputHo"){
				checkLetter("inputHo", "thongBaoHo", 5);
			}
			else if(getIdInput == "inputTen"){
				checkLetter("inputTen", "thongBaoTen", 6);
			}
			else if(getIdInput == "inputEmail"){
				checkEmail("inputEmail", "thongBaoEmail", 7);
			}
			else if(getIdInput == "inputSDT"){
				var flag_number = checkPhoneNumber("inputSDT", "thongBaoSDT", 8);
				if(flag_number){
					checkMinMax("inputSDT", "thongBaoSDT", 8, 15, 8);
				}
				else{
					checkPhoneNumber("inputSDT", "thongBaoSDT", 8);
				}
			}
		}
	});
}

// //hàm sẽ được kích hoạt khi focus vào các input
// // 1. Lấy các data-thongbao của các input
// //2. lấy các thẻ có id giống với data-thongbao của input tương ứng
// //3. kiểm tra input có rỗng hay không


function focusInput(thatInput, indexThongBao){
	var flag = true;
	var thongBao = thatInput.getAttribute("data-thongbao");
	var	idThhongBao = getid(thongBao); //lấy thông báo tương ứng với inputField
	if(thatInput.value == "" || thatInput.value == " "){
		idThhongBao.classList.add("err");
		idThhongBao.classList.remove("none_err");
		idThhongBao.innerHTML = mangThongBao[indexThongBao];
		flag = false;    //chưa có ký tự
	}
	else{
		idThhongBao.classList.remove("err");
		idThhongBao.classList.add("none_err");
		flag = true;    //đẫ có kí tự
	}
	return flag;
}
// //hàm kiểm tra rỗng
function checkEmpty(idInput, idThongBao, indexThongBao){
	var flag = true;
	var inputField = getid(idInput).value;
	var thongBao = getid(idThongBao);

	if(inputField == "" || inputField == " "){
		thongBao.classList.add("err");
		thongBao.classList.remove("none_err");
		thongBao.innerHTML = mangThongBao[indexThongBao];
		flag = false;    //chưa có ký tự
	}
	else{  
		thongBao.classList.remove("err");
		thongBao.classList.add("none_err");
		flag = true;    //đẫ có kí tự
	}
	return flag;
}
// //hàm kiểm tra kí tự
function checkLetter(idInput, idThongBao, indexThongBao){
	var flag = true;
	var inputField = getid(idInput).value;
	var RegEx_letter = /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
	var thongBao = getid(idThongBao);

	if(inputField == "" || inputField == "  " || !isNaN(inputField) || (!inputField.match(RegEx_letter))){
		thongBao.classList.add("err");
		thongBao.classList.remove("none_err");
		thongBao.innerHTML = mangThongBao[indexThongBao];
		flag = false;  //đúng kí tự
	}
	else{
		thongBao.classList.remove("err");
		thongBao.classList.add("none_err");
		flag = true;
	}
	return flag;
}
// //hàm kiểm tra min max kí tự nhập
function checkMinMax(idInput, idThongBao, min, max, indexThongBao){
	var flag = true;
	var inputField = getid(idInput).value;
	var thongBao = getid(idThongBao);
	if(inputField.length > max || inputField.length < min){
		thongBao.classList.add("err");
		thongBao.classList.remove("none_err");
		thongBao.innerHTML = mangThongBao[indexThongBao];
		flag = false;
	}
	else{
		thongBao.classList.remove("err");
		thongBao.classList.add("none_err");
		flag = true;
	}
	return flag;
}
// //hàm kiểm tra email
function checkEmail(idInput, idThongBao, indexThongBao){
	var RegEx_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	var flag = true;
	var inputField = getid(idInput).value;
	var thongBao = getid(idThongBao);
	if(inputField.match(RegEx_email)){
		thongBao.classList.remove("err");
		thongBao.classList.add("none_err");
		flag = true;  //nhập đúng email
	}
	else{
		thongBao.classList.add("err");
		thongBao.classList.remove("none_err");
		thongBao.innerHTML = mangThongBao[indexThongBao];
		flag = false;
	}
	return flag;
}
// //hàm kiểm tra số điện thoại
function checkPhoneNumber(idInput, idThongBao, indexThongBao){
	var Reg_phone = /^[0-9\-\+]{9,15}$/;
	var flag = true;
	var inputField = getid(idInput).value;
	var thongBao = getid(idThongBao);
	if(inputField.match(Reg_phone)){
		thongBao.classList.remove("err");
		thongBao.classList.add("none_err");
		flag = true;  //nhập đúng số 
	}
	else{
		thongBao.classList.add("err");
		thongBao.classList.remove("none_err");
		thongBao.innerHTML = mangThongBao[indexThongBao];
		flag = false;  
	}
	return flag;
}





