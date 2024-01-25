var base_url = document.getElementById('base_url').value;

function add_main_cat() {
    if (!requiredValidation('add-main-cat-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('add-main-cat-form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'training_materials/insert_training_materials_category',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Main Category Successfully Added!", type: "success"}, function () {
                    goURL(base_url + 'training_materials/training_materials_category');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Main Category", "error");
            } else {
                swal("ERROR!", "Main Category Already Exists", "error");
            }
        }
    });
}

function edit_main_cat() {
    if (!requiredValidation('edit-main-cat-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('edit-main-cat-form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'training_materials/update_training_materials_category',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Main Category Successfully Updated!", type: "success"}, function () {
                    goURL(base_url + 'training_materials/training_materials_category');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Update Main Category", "error");
            } else {
                swal("ERROR!", "Main Category Already Exists", "error");
            }
        }
    });
}

function delete_main_cat(cat_id) {
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
                    url: base_url + 'training_materials/delete_training_materials_category',
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
                                goURL(base_url + 'training_materials/training_materials_category');
                            });
                        } else {
                            swal("ERROR!", "Unable to delete this Main Category!!", "error");
                        }
                    }
                });
            });
}

function add_sub_cat() {
    if (!requiredValidation('add-sub-cat-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('add-sub-cat-form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'training_materials/insert_training_materials_subcategory',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Sub Category Successfully Added!", type: "success"}, function () {
                    goURL(base_url + 'training_materials/training_materials_subcategory');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Sub Category", "error");
            } else {
                swal("ERROR!", "Sub Category Already Exists", "error");
            }
        }
    });
}

function edit_sub_cat() {
    if (!requiredValidation('edit-sub-cat-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('edit-sub-cat-form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'training_materials/update_training_materials_subcategory',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Sub Category Successfully Updated!", type: "success"}, function () {
                    goURL(base_url + 'training_materials/training_materials_subcategory');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Update Sub Category", "error");
            } else {
                swal("ERROR!", "Sub Category Already Exists", "error");
            }
        }
    });
}

function delete_sub_cat(cat_id) {
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
                    url: base_url + 'training_materials/delete_training_materials_subcategory',
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
                                goURL(base_url + 'training_materials/training_materials_subcategory');
                            });
                        } else {
                            swal("ERROR!", "Unable to delete this Sub Category!!", "error");
                        }
                    }
                });
            });
}

function get_sub_cats() {
    var main_cat = $("#main_cat option:selected").val();
    $.ajax({
        type: 'POST',
        url: base_url + 'training_materials/get_subcat_by_maincat',
        data: {
            main_cat: main_cat
        },
        success: function (result) {
            $(".subcat").html(result);
        }
    });
}

function add_videos_training(visible_by) {
    if (!requiredValidation('form_add_training_videos')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('form_add_training_videos'));
    if (visible_by == '') {
        visible_by = '2';
    }
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'training_materials/insert_training_materials',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Training Materials Successfully Added!", type: "success"}, function () {
                    goURL(base_url + 'training_materials/index/' + visible_by);
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Training Materials", "error");
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

function load_videos(title, keywords, main_cat, sub_cat, visible_by) {
    $.ajax({
        type: 'POST',
        url: base_url + 'training_materials/load_videos',
        data: {
            title: title,
            keywords: title,
            main_cat: main_cat,
            sub_cat: sub_cat,
            visible_by: visible_by
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

function update_videos_training() {
    if (!requiredValidation('form_edit_training_videos')) {
        return false;
    }
    var visible_by = '2';
    var form_data = new FormData(document.getElementById('form_edit_training_videos'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'training_materials/update_training_materials',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Training Materials Successfully Updated!", type: "success"}, function () {
                    goURL(base_url + 'training_materials/index/' + visible_by);
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Update Training Materials", "error");
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

function cancel_videos_training() {
    goURL(base_url + 'training_materials');
}

function delete_training_materials(id) {
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
                    url: base_url + 'training_materials/delete_training_materials',
                    data: {
                        id: id
                    },
                    success: function (result) {
                        if (result == "1") {
                            swal({
                                title: "Success!",
                                "text": "Training Material been deleted successfully!",
                                "type": "success"
                            }, function () {
                                goURL(base_url + 'training_materials');
                            });
                        } else {
                            swal("ERROR!", "Unable to delete this Training Material!!", "error");
                        }
                    }
                });
            });
}

function count_views(training_material_id) {
    $.ajax({
        type: 'POST',
        url: base_url + 'training_materials/count_views',
        data: {
            training_material_id: training_material_id
        },
        success: function (result) {
            console.log(result);
            $(".no_of_views" + training_material_id).html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}