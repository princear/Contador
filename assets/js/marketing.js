var base_url = document.getElementById('base_url').value;

function add_marketing_main_cat() {
    if (!requiredValidation('add-marketing-main-cat-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('add-marketing-main-cat-form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'marketing_materials/insert_marketing_materials_category',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Main Category Successfully Added!", type: "success"}, function () {
                    goURL(base_url + 'marketing_materials/marketing_materials_category');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Main Category", "error");
            } else {
                swal("ERROR!", "Main Category Already Exists", "error");
            }
        }
    });
}

function edit_marketing_main_cat() {
    if (!requiredValidation('edit-marketing-main-cat-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('edit-marketing-main-cat-form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'marketing_materials/update_marketing_materials_category',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Main Category Successfully Updated!", type: "success"}, function () {
                    goURL(base_url + 'marketing_materials/marketing_materials_category');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Update Main Category", "error");
            } else {
                swal("ERROR!", "Main Category Already Exists", "error");
            }
        }
    });
}

function delete_marketing_main_cat(cat_id) {
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this lead type!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
            function () {
                $.ajax({
                    type: 'POST',
                    url: base_url + 'marketing_materials/delete_marketing_materials_category',
                    data: {
                        cat_id: cat_id
                    },
                    success: function (result) {
                        if (result == "1") {
                            swal({
                                title: "Success!",
                                "text": "Main Category been deleted successfully!",
                                "type": "success"
                            }, function () {
                                goURL(base_url + 'marketing_materials/marketing_materials_category');
                            });
                        } else {
                            swal("ERROR!", "Unable to delete this Main Category!!", "error");
                        }
                    }
                });
            });
}

function add_to_cart(id) {
    var quantity = $("#item-quantity-" + id).val();
    if(typeof quantity == 'undefined'){
        quantity = $("#price-quantity-"+id+' option:selected').text();
        if(quantity=='Select an option'){
            quantity=0;
        }
    }
    //alert(quantity); return false;
    var lang = [];

    $.each($('input[name="lang_check'+id+'[]"]:checked'), function(){            

        lang.push($(this).val());

    });
    if (typeof lang !== 'undefined' && lang.length > 0 && quantity!=0) {
        $.ajax({
        type: 'POST',
        url: base_url + 'marketing_materials/add_to_cart',
        data: {
            id: id,
            quantity: quantity,
            lang: lang
        },
        success: function (result) {
            //alert(result); return false;
            swal({
                title: "Success!",
                "text": "Marketing Material has been successfully added to cart!",
                "type": "success"
            }, function () {
                $(".span-cart").html(result.trim());
            });
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
      });
    }else{
        swal("ERROR!", "Please select language/quantity", "error");
    }    
}

function change_quantity(id, quantity) {
    //var quantity = $("#item-quantity-"+id).val();
    $.ajax({
        type: 'POST',
        url: base_url + 'marketing_materials/change_quantity',
        data: {
            id: id,
            quantity: quantity
        },
        success: function (result) {
            //console.log(result);
            var jsonval = JSON.parse(result);
//                    swal({
//                        title: "Success!",
//                        "text": "Marketing Material's quantity has been successfully updated!",
//                        "type": "success"
//                    }, function () {
            $("#price-cart-" + id).html('$' + jsonval.total_item_price);
            $("#cart-total").html('$' + jsonval.total_cart_price);
            //});
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function cancel_pay_with_paypal() {
    goURL(base_url + 'marketing_materials/view_cart');
}


function pay_with_paypal() {
    if (!requiredValidation('form_checkout_marketing_materials')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('form_checkout_marketing_materials'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'marketing_materials/pay_with_paypal',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            $(".response-data").html(result);
        },
        beforeSend: function () {
            $(".save_btn").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function (msg) {
//            $(".save_btn").removeAttr('disabled').html('Save Changes');
            closeLoading();
        }
    });
}


function remove_from_cart(id) {
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this cart item!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
            function () {
                $.ajax({
                    type: 'POST',
                    url: base_url + 'marketing_materials/remove_from_cart',
                    data: {
                        id: id
                    },
                    success: function (result) {
                        swal({
                            title: "Success!",
                            "text": "Marketing Material been removed successfully!",
                            "type": "success"
                        }, function () {
                            var item_count = $(".item-count").html();
                            var new_count = item_count - 1;
                            if (new_count == 0) {
                                $(".item-count").html(new_count);
                                $(".cart-item-class").remove();
                                $(".cart-th-class").remove();
                                $("#cart-main-id").removeClass('col-md-9');
                                $("#cart-main-id").addClass('col-md-12');
                                $(".items-ibox").append('<div class="ibox-content">Currently you have no items in your cart. <a href="' + base_url + 'marketing_materials/">Continue Shopping</a></div>');
                                $(".checkout-ibox").remove();
                            } else {
                                $("#cart-item-" + id).remove();
                                $(".item-count").html(new_count);
                                var total_price = '$' + result.trim();
                                $("#cart-total").html(total_price);
                            }
                        });
                    }
                });
            });
}

function delete_marketing_materials(id) {
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this lead type!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
            function () {
                $.ajax({
                    type: 'POST',
                    url: base_url + 'marketing_materials/delete_marketing_materials',
                    data: {
                        id: id
                    },
                    success: function (result) {
                        if (result == "1") {
                            swal({
                                title: "Success!",
                                "text": "Marketing Material been deleted successfully!",
                                "type": "success"
                            }, function () {
                                goURL(base_url + 'marketing_materials');
                            });
                        } else {
                            swal("ERROR!", "Unable to delete this Marketing Material!!", "error");
                        }
                    }
                });
            });
}

function cancel_marketing_materials() {
    goURL(base_url + 'marketing_materials');
}

function update_marketing_materials() {
    if (!requiredValidation('form_edit_training_videos')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('form_edit_training_videos'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'marketing_materials/update_marketing_materials',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Marketing Materials Successfully Updated!", type: "success"}, function () {
                    goURL(base_url + 'marketing_materials/');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Update Marketing Materials", "error");
            }
        },
        beforeSend: function () {
            $(".save_btn").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function (msg) {
//            $(".save_btn").removeAttr('disabled').html('Save Changes');
            closeLoading();
        }
    });
}

function load_marketing_materials(main_cat, sub_cat) {
    $.ajax({
        type: 'POST',
        url: base_url + 'marketing_materials/load_marketing_materials',
        data: {
            main_cat: main_cat,
            sub_cat: sub_cat
        },
        success: function (result) {
//            console.log(result);
            $("#load_data").html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function add_marketing_materials() {
    if (!requiredValidation('form_add_training_videos')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('form_add_training_videos'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'marketing_materials/insert_marketing_materials',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Marketing Materials Successfully Added!", type: "success"}, function () {
                    goURL(base_url + 'marketing_materials/');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Marketing Materials", "error");
            }
        },
        beforeSend: function () {
            $(".save_btn").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function (msg) {
//            $(".save_btn").removeAttr('disabled').html('Save Changes');
            closeLoading();
        }
    });
}

function get_marketing_sub_cats() {
    var main_cat = $("#main_cat option:selected").val();
    $.ajax({
        type: 'POST',
        url: base_url + 'marketing_materials/get_subcat_by_maincat',
        data: {
            main_cat: main_cat
        },
        success: function (result) {
            $(".subcat").html(result);
        }
    });
}

function delete_marketing_sub_cat(cat_id) {
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this lead type!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
            function () {
                $.ajax({
                    type: 'POST',
                    url: base_url + 'marketing_materials/delete_marketing_materials_subcategory',
                    data: {
                        cat_id: cat_id
                    },
                    success: function (result) {
                        if (result == "1") {
                            swal({
                                title: "Success!",
                                "text": "Sub Category been deleted successfully!",
                                "type": "success"
                            }, function () {
                                goURL(base_url + 'marketing_materials/marketing_materials_subcategory');
                            });
                        } else {
                            swal("ERROR!", "Unable to delete this Sub Category!!", "error");
                        }
                    }
                });
            });
}

function edit_markting_sub_cat() {
    if (!requiredValidation('edit-sub-cat-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('edit-sub-cat-form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'marketing_materials/update_marketing_materials_subcategory',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Sub Category Successfully Updated!", type: "success"}, function () {
                    goURL(base_url + 'marketing_materials/marketing_materials_subcategory');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Update Sub Category", "error");
            } else {
                swal("ERROR!", "Sub Category Already Exists", "error");
            }
        }
    });
}

function add_markting_sub_cat() {
    if (!requiredValidation('add-sub-cat-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('add-sub-cat-form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'marketing_materials/insert_marketing_materials_subcategory',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Sub Category Successfully Added!", type: "success"}, function () {
                    goURL(base_url + 'marketing_materials/marketing_materials_subcategory');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Sub Category", "error");
            } else {
                swal("ERROR!", "Sub Category Already Exists", "error");
            }
        }
    });
}

function change_purchase_status(id, status) {
    $("#changePurchaseStatus #rowid").val(id);
    $("#changePurchaseStatus #rad" + status).attr('checked', 'checked');
    $('#changePurchaseStatus').modal({
        backdrop: 'static',
        keyboard: false
    });
}

function updatePurchaseStatus() {
    var status = $('input[name=radio]:checked').val();
    var id = $("#rowid").val();
    $.ajax({
        type: 'POST',
        url: base_url + 'marketing_materials/updatePurchaseStatus',
        data: {
            status: status,
            id: id
        },
        success: function (result) {
            if (result == "1") {
                swal({
                    title: "Success!",
                    "text": "Changed status successfully!",
                    "type": "success"
                }, function () {
                    goURL(base_url + 'marketing_materials/marketing_materials_purchase_list');
                });
            } else {
                swal("ERROR!", "Unable to change status!!", "error");
            }
        },
        beforeSend: function () {
            $(".save_btn").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function (msg) {
            //            $(".save_btn").removeAttr('disabled').html('Save Changes');
            closeLoading();
        }
    });
}

function updateSuggestionStatus(type) {
    var status = $('input[name=radio]:checked').val();
    var id = $("#rowid").val();
    $.ajax({
        type: 'POST',
        url: base_url + 'marketing_materials/updateSuggestionStatus',
        data: {
            status: status,
            id: id
        },
        success: function (result) {
            if (result == "1") {
                swal({
                    title: "Success!",
                    "text": "Changed status successfully!",
                    "type": "success"
                }, function () {
                    if (type == 1) {
                        goURL(base_url + 'training_materials/training_materials_suggestions');
                    } else {
                        goURL(base_url + 'marketing_materials/marketing_materials_suggestions');
                    }
                });
            } else {
                swal("ERROR!", "Unable to change status!!", "error");
            }
        },
        beforeSend: function () {
            $(".save_btn").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function (msg) {
            //            $(".save_btn").removeAttr('disabled').html('Save Changes');
            closeLoading();
        }
    });
}


function get_marketing_subcat(main_cat_id) {
    $.ajax({
        type: 'POST',
        url: base_url + 'marketing_materials/get_marketing_subcat',
        data: {
            main_cat_id: main_cat_id
        },
        success: function (result) {
            $("#marketing_sub_cat").html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function show_marketing_notes(id) {
    $.ajax({
        type: 'POST',
        url: base_url + 'modal/show_marketing_notes',
        data: {
            id: id
        },
        success: function (result) {
            $('#showNotes #notes-modal-body').html(result);
            $("#showNotes #marketingid").val(id);
            openModal('showNotes');
        }
    });
}