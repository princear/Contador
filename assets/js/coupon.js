var base_url = document.getElementById('base_url').value;

function CouponDashboardAjax() {
	$('#coupon-table-tab').DataTable({
        'processing': false,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url': base_url + 'coupon/coupon_dashboard_ajax',
            'type': 'POST',
            'data': {
            	'id': 1
            },
            beforeSend: function () {
                openLoading();
            },
            complete: function (msg) {
                closeLoading();
            }
        },
        'columns': [
            {data: 'coupon_code', className:'dt-body-nowrap'},
            {data: 'brand_name', className:'dt-body-nowrap'},
            {data: 'coupon_type', className:'dt-body-nowrap'},
            {data: 'coupon_name', className:'dt-body-nowrap'},
            {data: 'coupon_description', className:'dt-body-nowrap'},
            {data: 'start_day', className:'dt-body-nowrap'},
            {data: 'expire_day', className:'dt-body-nowrap'},
            {data: 'action', className:'dt-body-nowrap'}
        ],
        "columnDefs": [
            { searchable: true, "targets": 0 },
            { searchable: true, "targets": 1 },
            { searchable: true, "targets": 2 },
            { searchable: true, "targets": 3 },
            { searchable: true, "targets": 4 },
            { searchable: true, "targets": 7 }
          ]
    });
}

function open_coupons_modal(modal_type , coupon_id = '') {
    $.ajax({
        type: 'POST',
        url: base_url + 'coupon/add_coupon_modal',
        data: {
            modal_type: modal_type,
            coupon_id: coupon_id
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            $('#add-coupon-modal').html(result).modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });
}

function get_office_brand_for_coupon(brand_id , office_id = '', form = '') {
    if (brand_id != '') {
        $.ajax({
            type: "POST",
            data: {
                brand_id: brand_id
            },
            url: base_url + 'lead_management/home/get_office_brand',
            dataType: "html",
            success: function (result) {
                var office = document.getElementById('office');
                office.innerHTML = "";
                if (form == 'invite') {
                    $("#office").chosen();
                    $("#office").chosen('destroy');
                }
                if (result != 0) {
                    var office_list = JSON.parse(result);
                    office.options[office.options.length] = new Option("Select an option", "");
                    for (var i = 0; i < office_list.length; i++) {
                        office.options[office.options.length] = new Option(office_list[i].name, office_list[i].id);
                    }
                    if (office_id != '') {
                        $("#office").val(office_id);
                    }
                } else {
                    office.options[office.options.length] = new Option("Select an option", "");
                }
                if (form == 'invite') {
                    $("#office").chosen();
                }
            },
            beforeSend: function () {
                openLoading();
            },
            complete: function (msg) {
                closeLoading();
            }
        });
    } else {
        $.ajax({
            type: "GET",
            url: base_url + 'coupon/get_office_list',
            dataType: "html",
            success: function (result) {
                var office = document.getElementById('office');
                office.innerHTML = "";
                if (form == 'invite') {
                    $("#office").chosen();
                    $("#office").chosen('destroy');
                }
                if (result != 0) {
                    var office_list = JSON.parse(result);
                    office.options[office.options.length] = new Option("Select an option", "");
                    for (var i = 0; i < office_list.length; i++) {
                        office.options[office.options.length] = new Option(office_list[i].name, office_list[i].id);
                    }
                    if (office_id != '') {
                        $("#office").val(office_id);
                    }
                } else {
                    office.options[office.options.length] = new Option("Select an option", "");
                }
                if (form == 'invite') {
                    $("#office").chosen();
                }
            },
            beforeSend: function () {
                openLoading();
            },
            complete: function (msg) {
                closeLoading();
            }
        });
    }
}

function get_service_list_by_category_id(category_id , service_ids = '') {
    if (category_id != '') {
        $.ajax({
            type: "POST",
            data: {
                category_id: category_id
            },
            url: base_url + 'coupon/get_service_list_by_category_id',
            dataType: "html",
            success: function (result) {
                var service_id = document.getElementById('service_id');
                service_id.innerHTML = "";
                $("#service_id").chosen();
                $("#service_id").chosen('destroy');
                if (result != 0) {
                    var service = JSON.parse(result);
                    service_id.options[service_id.options.length] = new Option("Select an option", "");
                    for (var i = 0; i < service.length; i++) {
                        service_id.options[service_id.options.length] = new Option(service[i].description, service[i].id);
                    }
                    if (service_ids != '') {
                        var service_arr = service_ids.split(',');
                        $("#service_id").val(service_arr);
                    }
                    $("#service_id").chosen();
                } else {
                    service_id.options[service_id.options.length] = new Option("Select an option", "");
                    $("#service_id").chosen();
                }
            },
            beforeSend: function () {
                openLoading();
            },
            complete: function (msg) {
                closeLoading();
            }
        });
    } else {
        get_coupon_service_list();
    }
}

function get_coupon_service_list(coupon_type = '' , service_id = '' , from = '') {
    if (from != 'on_load') {
        $("#category_id").val('');
    }
    
    if (coupon_type == '') {
        coupon_type = $("#coupon_type").val();
    }
    $.ajax({
        type: "POST",
        data: {
            coupon_type: coupon_type,
            service_id: service_id
        },
        url: base_url + 'coupon/get_coupon_service_list',
        dataType: "html",
        success: function (result) {
            $("#coupon_service_div").html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function add_new_coupons() {
    if (!requiredValidation('add_new_coupon_form')) {
        return false;
    }
    
    var form_data = new FormData(document.getElementById('add_new_coupon_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'coupon/add_new_coupons',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            if (result.trim() == 1) {
                swal("Success!", "Successfully Added Coupon!", "success");
                window.location.reload();
            } else if (result.trim() == 2) {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            }
        }
    });
}

function edit_coupons() {
    if (!requiredValidation('edit_coupon_form')) {
        return false;
    }
    
    var form_data = new FormData(document.getElementById('edit_coupon_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'coupon/add_new_coupons',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            if (result.trim() == 1) {
                swal("Success!", "Successfully Edited Coupon!", "success");
                window.location.reload();
            } else if (result.trim() == 2) {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            }
        }
    });
}

function delete_coupon(coupon_id) {
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this coupon!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
    function () {
        $.ajax({
            type: 'POST',
            url: base_url + 'coupon/delete_coupon',
            data: {
                coupon_id: coupon_id
            },
            success: function (result) {
                if (result.trim() == 1) {
                    swal({
                        title: "Success!",
                        "text": "Coupon been deleted successfully!",
                        "type": "success"
                    }, function () {
                            window.location.reload();
                    });
                } else {
                    swal("ERROR!", "Unable to delete this coupon", "error");
                }
            }
        });
    });
}

function copy_coupon_code(coupon_code) {
    navigator.clipboard.writeText(coupon_code);
    swal("Code Copied!");
}

function get_discount(value , discount = '') {
    $.ajax({
        type: 'POST',
        url: base_url + 'coupon/get_discount',
        data: {
            discount_type: value,
            discount: discount
        },
        success: function (result) {
            $("#discount_div").html(result);
        }
    });
}

function open_invite_coupon_modal(modal_type) {
    $.ajax({
        type: 'POST',
        url: base_url + 'coupon/invite_coupon_modal',
        data: {
            modal_type: modal_type
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            $('#invite-coupon-modal').html(result).modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });
}

function get_coupon_details() {
    var coupon_id = $("#coupon").val();
    $.ajax({
        type: 'POST',
        url: base_url + 'coupon/get_coupon_details',
        data: {
            coupon_id: coupon_id
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            $("#coupon_details").html(result);
        }
    });
}

function send_coupon_invitation() {
    if (!requiredValidation('coupon_invitation_form')) {
        return false;
    }
    
    var form_data = new FormData(document.getElementById('coupon_invitation_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'coupon/send_coupon_invitation',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            // console.log(result);return false;
            if (result.trim() == 1) {
                swal("Success!", "Invitation Send Successfully!", "success");
                window.location.reload();
            } else if (result.trim() == 2) {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            }
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}