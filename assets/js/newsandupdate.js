function get_dept_office(val, dept_ofc = '') {
    
    $.ajax({
        type: "POST",
        data: {type_val: val}, //add_new_action
        url: base_url + 'news/get_dept_office_dd',
        dataType: "html",
        success: function (result) {
            $('#dept_div').html(result);
            var id_arr = dept_ofc.split(',');
            $('#department').val(id_arr);
            rev_chk();
            $('#assigned_type').val(val);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function request_create_newandupdate() {
    if (!requiredValidation('form_save_news')) {
        return false;
    }
    var form_data = new FormData(document.getElementById("form_save_news"));
    $.ajax({
        type: "POST",
        data: form_data, //add_new_action
        url: base_url + 'news/request_create_newsandupdate',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({
                    title: "Success!",
                    text: "Data Successfully Added!",
                    type: "success"
                }, function () {
                    goURL(base_url + 'news');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Data", "error");
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
function request_save_newandupdate() {
    if (!requiredValidation('form_save_news')) {
        return false;
    }
    var form_data = new FormData(document.getElementById("form_save_news"));
    $.ajax({
        type: "POST",
        data: form_data, //add_new_action
        url: base_url + 'news/request_save_newsandupdate',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({
                    title: "Success!",
                    text: "Data Successfully Updated!",
                    type: "success"
                }, function () {
                    goURL(base_url + 'news');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Update Data", "error");
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
function loadNewsUpdateDashboard() {
    $.ajax({
        type: "POST",
        url: base_url + 'news/dashboard_ajax',
        success: function (news_result) {
            var data = JSON.parse(news_result);
            $("#new_update_dashboard_div").html(data.result);
            $("[data-toggle=popover]").popover();
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function getNewsDetailsModal(news_id, user_type, user_id) {
    $.ajax({
        type: "POST",
        data: {news_id: news_id},
        url: base_url + 'modal/ajax_news_details',
        success: function (news_result) {
            $("#new_details_div").html(news_result);
            $("#newsDetailsModal").modal();
            if (user_type != '1') {
                $.ajax({
                    type: "POST",
                    url: base_url + 'news/update_read',
                    data: {user_id: user_id, news_id: news_id},
                    success: function (result) {
                        if (result.trim() == "1") {
                            $("#text-link-"+news_id).prop('class','label-read');
                            // $('#del-container-' + data_arr[1]).html('<a href="javascript:void(0);" onclick="delNews(' + data_arr[0] + ',' + data_arr[1] + ')" class=" text-white"><i class="fa fa-times"></i></a>');
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

        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function getCreateNewsModal(news_id = '') {
    $.ajax({
        type: "POST",
        data: {news_id: news_id},
        url: base_url + 'modal/ajax_manage_news',
        success: function (news_result) {

            $("#newsModal").html(news_result);
            $("#newsModal").modal();

        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function delNews(user_id, news_id) { // when user deletes news or updates
    $("#collapse-id").removeClass('collapse-link');
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this news or update!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: true
    },
    function(isConfirm){
        if (isConfirm){
            $.ajax({
                type: "POST",
                url: base_url + 'news/delete_news_update',
                data: {user_id: user_id, news_id: news_id},
                success: function (result) {
                    if (result.trim() == "1") {
                        $('#news-content-' + news_id).remove();
                        $("#collapse-id").addClass('collapse-link');
                    }
                },
            });
        } else {
            $("#collapse-id").addClass('collapse-link');
        }
    });
}
function delNewsAdmin(news_id) {
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this news or update!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: true
    },
    function () {
        $.ajax({
            type: "POST",
            url: base_url + 'news/delete_news_admin',
            data: {news_id: news_id},
            success: function (result) {
                if (result.trim() == "1") {

                    $('#news-admin-content-' + news_id).remove();
                }
            },
            beforeSend: function () {
                openLoading();
            },
            complete: function (msg) {
                closeLoading();
            }
        });
    });
}
// function delNewsAdmin(news_id) {
//     swal({
//         title: "Are you sure want to delete?",
//         text: "Your will not be able to recover this news or update!!",
//         type: "warning",
//         showCancelButton: true,
//         confirmButtonClass: "btn-danger",
//         confirmButtonText: "Yes, delete it!",
//         closeOnConfirm: true
//     },
//     function () {
//         $.ajax({
//             type: "POST",
//             url: base_url + 'news/delete_news_admin',
//             data: {news_id: news_id},
//             success: function (result) {
//                 if (result.trim() == "1") {
//                     $('#news-admin-content-' + news_id).remove();
//                 }
//             },
//             beforeSend: function () {
//                 openLoading();
//             },
//             complete: function (msg) {
//                 closeLoading();
//             }
//         });
//     });
// }
function delNewsNotificationAdmin(news_id) {
    $.ajax({
        type: "POST",
        url: base_url + 'news/delete_news_notification_admin',
        data: {news_id: news_id},
        success: function (result) {
            if (result.trim() == "1") {
                $('#news-notification-' + news_id).remove();
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
function delNewsNotification(news_id, user_id) {
    $.ajax({
        type: "POST",
        url: base_url + 'news/delete_news_notification',
        data: {news_id: news_id, user_id: user_id},
        success: function (result) {
            if (result.trim() == "1") {
                $('#news-notification-' + news_id).remove();
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
$(document).on('click', '.filter-status', function () {
    var news = null;
    var update = null;
    $('.filter-status').each(function (i) {
        if ($(this).is(':checked') == true) {
            if ($(this).val() == 'news') {
                news = $(this).val();
            } else if ($(this).val() == 'update') {
                update = $(this).val();
            }
        }
    });
    $.ajax({
        type: "POST",
        data: {news: news, update: update, filter: 1},
        url: base_url + 'news/dashboard_ajax',
        success: function (news_result) {
            var data = JSON.parse(news_result);
            $("#new_update_dashboard_div").html(data.result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
});
$(document).on('click', '#chk_all', function () {
    var is_chk = $(this).is(':checked');
    $('#no_val').prop('selected', false);
    if (is_chk) {
        $("#department").find("option").each(function () {
            if ($(this).val() != '') {
                $(this).prop('selected', true);
            }
        });
    } else {
        $("#department").find("option").each(function () {
            $(this).prop('selected', false);
        });
    }
});
function rev_chk() {
    var select_option_count = $('#department').find("option:selected").length;
    var option_count = parseInt($('#department').find("option").length) - 1;
    if (select_option_count == option_count) {
        $('#chk_all').prop('checked', true);
    } else {
        $('#chk_all').prop('checked', false);
    }
}
function newsFilter() {
    var form_data = new FormData(document.getElementById('filter-form'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'news/dashboard_ajax',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            var data = JSON.parse(result);
            $("#new_update_dashboard_div").html(data.result);
            $("[data-toggle=popover]").popover();
            $("#clear_filter").show();
            $('#btn_clear_filter').show();
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function read_news_or_update(user_id,news_id){
    $.ajax({
        type: "POST",
        url: base_url + 'news/update_read',
        data : { user_id:user_id,news_id:news_id },
        success: function (result) {
            if (result == '1') {
                $("#unread_news").show();
                $("#unread_news").replaceWith('<a href="javascript:void(0)" class="btn btn-primary" style="width:80px">READ</a>');
            }            
        },
    });
}

function show_news_staff(news_id){
    $.ajax({
        type: "POST",
        url: base_url + 'news/show_read_or_unread_users',
        data : { news_id:news_id },
        success: function (result) {
            $('#usersModal').html(result).modal({
                backdrop: 'static',
                keyboard: false
            });            
        },
    });
}