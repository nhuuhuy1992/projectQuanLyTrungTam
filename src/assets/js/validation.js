import * as $ from "jquery";
import validate from "jquery-validation";
$(function() {
    function notification(...note) {
        return [
            `*Không Được Bỏ Trống ${note}`, //0
            `*Xin Nhập Đúng ${note}`, //1
            `*Tên Tài Khoản Không Nhiều Hơn ${note} Kí Tự`, //2,	
            `*Tên Tài Khoản Phải Nhiều Hơn ${note} Kí Tự`, //3,	
            `*Xin Xác Nhận Lại ${note}`, //4,	
            `*Mật Khẩu Xác Nhận Chưa Đúng`, //5,	
            `*Mật Khẩu Phải Có Ít Nhất ${note} Ký Tự, Gồm Ít Nhất 1 Kí Tự Số `, //6,	
            `*Không Có Khoảng trống`, //7
            `*Chỉ Chứa Các Kí Tự`, //8
            `*Xin Nhập ${note}`, //9
            `*Số Điện Thoại Phải Nhiều Hơn ${note} Số`, //10
            `*Số Điện Thoại Phải ít Hơn ${note} số`, //11
        ];
    }
    $(".txt").on("focus", function() {
        $(this).closest(".input--jiro").addClass("input--filled");
    });
    $(".txt").on("blur", function() {
        if ($(this).val().trim() === "") {
            $(this).closest(".input--jiro").removeClass("input--filled");
        } else {
            $(this).closest(".input--jiro").addClass("input--filled");
        }
    })

    function validFormDK() {
        $.validator.addMethod("lettersonly", function(value, element) {
            return this.optional(element) ||
                /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/i.test(value);
        }, notification()[8]);

        $.validator.addMethod("nowhitespace", function(val, el) {
            return this.optional(el) ||
                /^\S+$/i.test(val);
        }, notification()[8]);

        $.validator.addMethod("strongPass", function(val, el) {
            return this.optional(el) ||
                val.length >= 6 &&
                /\d/.test(val) &&
                /[a-z]/i.test(val);
        }, notification("6")[6]);

        $.validator.setDefaults({
            errorClass: "big-err",
            hightlight: function(el) {
                $(el)
                    .closest(".input--jiro")
                    .addClass("has-error");
            }
        });
        $("#register-form").validate({
            rules: {
                mail: {
                    required: true,
                    email: true
                },
                HoTen: {
                    required: true,
                    lettersonly: true
                },
                tenTaiKhoan: {
                    required: true,
                    maxlength: 20,
                    minlength: 6,
                    nowhitespace: true,
                    // remote : "http://sv.myclass.vn/api/QuanLyTrungTam/DangKy"
                },
                SDT: {
                    required: true,
                    number: true
                },
                matKhau: {
                    required: true,
                    strongPass: true,
                    nowhitespace: true
                },
                reMatKhau: {
                    required: true,
                    equalTo: "#inputPASSDK"
                }
            },
            messages: {
                mail: {
                    required: notification("email")[0],
                    email: notification("email")[1]
                },
                HoTen: {
                    required: notification("họ tên")[0],
                    lettersonly: notification("họ tên")[8]
                },
                tenTaiKhoan: {
                    required: notification("Tên Tài Khoản")[0],
                    maxlength: notification("20")[2],
                    minlength: notification("6")[3],
                },
                SDT: {
                    required: notification("Số Điện Thoại")[0],
                    number: notification("Số Điện Thoại")[1]
                },
                matKhau: {
                    required: notification("Mật Khẩu")[0],
                },
                reMatKhau: {
                    required: notification("Mật Khẩu")[4],
                    equalTo: notification("Mật Khẩu")[5],
                }
            }
        })
    }

    function validFormDN() {
        $.validator.setDefaults({
            errorClass: "big-err",
            hightlight: function(el) {
                $(el)
                    .closest(".input--jiro")
                    .addClass("has-error");
            }
        });
        $("#sign-up-form").validate({
            rules: {
                TKDN: {
                    required: true,
                },
                passwordDN: {
                    required: true
                }
            },
            messages: {
                TKDN: {
                    required: notification("Tài Khoản")[9]
                },
                passwordDN: {
                    required: notification("Mật Khẩu")[9]
                }
            }
        })
    }

    function validFormThemND() {
        $.validator.addMethod("lettersonly", function(value, element) {
            return this.optional(element) ||
                /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/i.test(value);
        }, notification()[8]);
        $.validator.addMethod("nowhitespace", function(val, el) {
            return this.optional(el) ||
                /^\S+$/i.test(val);
        }, notification()[8]);

        $.validator.addMethod("strongPass", function(val, el) {
            return this.optional(el) ||
                val.length >= 6 &&
                /\d/.test(val) &&
                /[a-z]/i.test(val);
        }, notification("6")[6]);
        $.validator.setDefaults({
            errorClass: "big-err",
        });
        $("#formThemNguoiDung").validate({
            rules: {
                emailThem: {
                    required: true,
                    email: true
                },
                tenThem: {
                    required: true,
                    lettersonly: true
                },
                TKThem: {
                    required: true,
                    maxlength: 20,
                    minlength: 6,
                    nowhitespace: true,
                },
                SDTThem: {
                    required: true,
                    number: true
                },
                MKThem: {
                    required: true,
                    strongPass: true,
                    nowhitespace: true
                }
            },
            messages: {
                emailThem: {
                    required: notification("email")[0],
                    email: notification("email")[1]
                },
                tenThem: {
                    required: notification("họ tên")[0],
                },
                TKThem: {
                    required: notification("Tên Tài Khoản")[0],
                    maxlength: notification("20")[2],
                    minlength: notification("6")[3],
                },
                SDTThem: {
                    required: notification("Số Điện Thoại")[0],
                    number: notification("Số Điện Thoại")[1]
                },
                MKThem: {
                    required: notification("Mật Khẩu")[0],
                }
            }
        })
    }

    function validFormCapNhatND() {
        $.validator.addMethod("strongPass", function(val, el) {
            return this.optional(el) ||
                val.length >= 6 &&
                /\d/.test(val) &&
                /[a-z]/i.test(val);
        }, notification("6")[6]);
        $.validator.addMethod("lettersonly", function(value, element) {
            return this.optional(element) ||
                /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/i.test(value);
        }, notification()[8]);
        $.validator.setDefaults({
            errorClass: "big-err",
        });
        $("#formCapNhatND").validate({
            rules: {
                mkCapNhat: {
                    required: true,
                    strongPass: true,
                    nowhitespace: true
                },
                tenCapNhat: {
                    required: true,
                    lettersonly: true
                },
                emailCapNhat: {
                    required: true,
                    email: true
                },
                sdtCapNhat: {
                    required: true,
                }
            },
            messages: {
                mkCapNhat: {
                    required: notification("Tài Khoản")[0]
                },
                tenCapNhat: {
                    required: notification("Họ tên")[0],
                    // maxlength: notification("20")[2],
                    // minlength: notification("6")[3]
                },
                emailCapNhat: {
                    required: notification("email")[0],
                    email: notification("email")[1]
                },
                sdtCapNhat: {
                    required: notification("Số Điện Thoại")[0],
                }
            }
        })
    }

    function validFormThemKH() {
        $("#formThemKH").validate({
            rules: {
                maKH: {
                    required: true,
                },
                tenKH: {
                    required: true,
                },
                MoTa: {
                    required: true,
                },
                hinhKH: {
                    required: true,
                }
            },
            messages: {
                maKH: {
                    required: notification("Mã Khoá Học")[0]
                },
                tenKH: {
                    required: notification("Tên Khoá Học")[0],
                },
                MoTa: {
                    required: notification("Mô Tả")[0],
                },
                hinhKH: {
                    required: notification("Đường Dẫn Hình Ảnh")[0],
                }
            }
        })
    }

    validFormDK();
    validFormThemND();
    validFormDN();
    validFormCapNhatND();
    validFormThemKH();
});