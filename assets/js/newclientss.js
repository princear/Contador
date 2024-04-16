function get_azzure_file_list(brand='',franchise='',client_type='',client_id='',file_list_url='',folder_name='',status='') {
    //  console.log(brand+'/'+franchise+'/'+client_type+'/'+client_id+'-'+file_list_url);
    //  console.log(folder_name); return false;
    file_list_url = atob(file_list_url);
    var client_data = { "brand":brand,'franchise':franchise,'client_type':client_type,'client_id':client_id,'file_list_url':file_list_url };
    client_data = JSON.stringify(client_data);
    /*$.ajax({
        type: "POST",*/
        // url: "https://localhost:9099/Api/SharePoint/GetFileList",
        /*url: "https://dev2.taxleaf.com:9099/Api/SharePoint/GetFileList",
        async: true,
        data: client_data,
        contentType: "application/json",
        dataType: "json",        
        cache:false,
        success: function (result) {*/
            // console.log(result);
            // result = JSON.stringify(result.Files);
            var result = null;
            $.ajax({
                type: 'POST',
                url: base_url + 'guest/guest/get_files_folderwise',
                data: { file_details:result,other:client_data,folder_name:folder_name,status:status },
                success: function (res) {
                    $("#azzure-file-list-div").show();
                    $("#azzure-file-list-div").html(res.trim());     
                },
                beforeSend: function () {
                    openLoading();
                },
                complete: function (msg) {
                    closeLoading();
                    jumpDiv();
                }
            });
        /*},
        beforeSend: function () {
            openLoading();
        }
    });*/
}

async function upload_file_at_azzure_from_service(brand='',franchise='',client_type='',client_id='',counter='',section='',section_id='',reference='',reference_sub_type='',pagefrom='') {
    var new_redirection_url = window.location.href;
    var arrival_date =null;
    var priority = null;
    var priority_text = null;
    var government_agency = null;
    var government_agency_text = null;
    var state = null;
    var state_text = null;
    var frequency = null;
    var frequency_text = null;
    var period = null;
    var period_text = null;
    var year = null;
    var year_text = null;
    var bank_name = null;
    var bank_name_text = null;
    var account_last_4 = null;
    var description = null;
    var main_document_type =null;
    var main_sub_document_type =null;
    if (counter == '') {
        console.log(pagefrom);
        if(pagefrom=='clientfilecabinet')
        {
            if (!requiredValidation('azzure_doc_form')) {
                swal({
                        title: "Error!",
                        text: "Please fill all the details!",
                        type: "error"
                    });
                return false;
            }
            var form_data = new FormData(document.getElementById('azzure_doc_form'));
            var folder_name = $('#folder_name').val();
            var file_list_url = $("#file_list_url").val();
            if(file_list_url=='')
            {
                var file_list_url = $("#document_type option:selected").val();
            }
        }
        else if(pagefrom=='universalfilecabinet')
        {
            if (!requiredValidation('azzure_doc_form')) {
                swal({
                        title: "Error!",
                        text: "Please fill all the details!",
                        type: "error"
                    });
                return false;
            }
            var form_data = new FormData(document.getElementById('azzure_doc_form'));
            
            var file_list_url = $("#document_type option:selected").val();
            var n = file_list_url.lastIndexOf('/');
            var last_folder_name = file_list_url.substring(n + 1);
            var folder_name = (last_folder_name.split("'")[0]);
            console.log(folder_name);
            console.log('indemo');
            
        }
        else if(pagefrom=='filecabinet')
        {
            if (!requiredValidation('file-cabinet-form')) {
                swal({
                        title: "Error!",
                        text: "Please fill all the details!",
                        type: "error"
                    });
                return false;
            }
            var form_data = new FormData(document.getElementById('file-cabinet-form'));
            /*var folder_name = $("#document_type option:selected").text();*/
            var file_list_url = $("#document_type option:selected").val();

            var n = file_list_url.lastIndexOf('/');
            var last_folder_name = file_list_url.substring(n + 1);
            var folder_name = (last_folder_name.split("'")[0]);

            var brand = $("#brand").val().trim();
            var franchise = $("#client_office").val().trim();
            var client_type = $(".client_type:checked").val().trim();
            var client_id = $("#client_list_ddl_file_cabinet").val().trim();
        }
        else if(pagefrom=='filecabinetguestuser')
        {
           if (!requiredValidation('file-cabinet-form')) {
                swal({
                        title: "Error!",
                        text: "Please fill all the details!",
                        type: "error"
                    });
                return false;
            } 
            var form_data = new FormData(document.getElementById('file-cabinet-form'));
            //var folder_name = $("#document_type option:selected").text();
            var file_list_url = $("#document_type option:selected").val();

            var n = file_list_url.lastIndexOf('/');
            var last_folder_name = file_list_url.substring(n + 1);
            var folder_name = (last_folder_name.split("'")[0]);

            var brand = $("#brand").val().trim();
            var franchise = $("#client_office").val().trim();
            var client_type = $("#client_type").val().trim();
            var client_id = $("#client_list_ddl_file_cabinet").val().trim();
        }
        else
        {
            if (!requiredValidation('file-upload-form-service')) {
                swal({
                        title: "Error!",
                        text: "Please fill all the details!",
                        type: "error"
                    });
                return false;
            }
            var form_data = new FormData(document.getElementById('file-upload-form-service'));
            //var folder_name = $("#document_type option:selected").text();
            var file_list_url = $("#document_type option:selected").val();
            var n = file_list_url.lastIndexOf('/');
            var last_folder_name = file_list_url.substring(n + 1);
            var folder_name = (last_folder_name.split("'")[0]);
        }
        
        var filename = $("#doc_file").val();
        var filetype = filename.split('.').pop();
        if(filetype=='') 
            { 
                 swal({
                    title: "Error!",
                    text: "Please fill all the details!",
                    type: "error"
                });
                 return false; 
            }

        var document_sub_type = $("#document_sub_type option:selected").text();
        var document_sub_type_id = $("#document_sub_type option:selected").val();
        var document_name = $("#doc_file").val().replace(/C:\\fakepath\\/i, '');
        
        var sub_document_type = $("#sub_document_type option:selected").text();

        var arrival_date = $("#arrival_date").val();
        var priority = $("#prioritydiv").val();
        var priority_text = $("#prioritydiv").text();
        var government_agency = $("#government_agencydiv option:selected").val();
        var government_agency_text = $("#government_agencydiv option:selected").text();
        var state = $("#statediv").val();
        var state_text = $("#statediv").text();
        var frequency = $("#frequencydiv option:selected").val();
        var frequency_text = $("#frequencydiv option:selected").text();
        var period = $("#perioddiv option:selected").val();
        var period_text = $("#perioddiv option:selected").text();
        var year = $("#yeardiv option:selected").val();
        var year_text = $("#yeardiv option:selected").text();
        var bank_name = $("#bank_namediv option:selected").val();
        var bank_name_text = $("#bank_namediv option:selected").text();
        var account_last_4 = $("#account_last_4").val();
        var description = $("#description").val();
        var name = $("#name").val();
        var uploaded_file = $("#uploaded_file option:selected").val();
        var employeeinfoid = $("#employeeinfoid").val();
    } else {
        //console.log('file-upload-form-service'+counter); return false;
        if (!requiredValidation('file-upload-form-service'+counter)) {
            swal({
                    title: "Error!",
                    text: "Please fill all the details!",
                    type: "error"
                });
            return false;
        }

        var filename = $("#doc_file"+counter).val();
        var filetype = filename.split('.').pop();

        if(filetype=='') 
            { 
                 swal({
                    title: "Error!",
                    text: "Please fill all the details!",
                    type: "error"
                });
                 return false; 
            }

        var form_data = new FormData(document.getElementById('file-upload-form-service'+counter));
        var folder_name_id = 'document_type'+counter;
        var sub_folder_name_id = 'document_sub_type'+counter;
        //var folder_name = $("#"+folder_name_id+" option:selected").text();
        var document_sub_type = $("#"+sub_folder_name_id+" option:selected").text();
        var document_sub_type_id =  $("#document_sub_type"+counter+" option:selected").val();
        var document_name = $("#doc_file"+counter).val().replace(/C:\\fakepath\\/i, '');
        var file_list_url = $("#"+folder_name_id+" option:selected").val();

        var sub_document_type = $("#sub_document_type"+counter+" option:selected").text();

        var n = file_list_url.lastIndexOf('/');
        var last_folder_name = file_list_url.substring(n + 1);
        var folder_name = (last_folder_name.split("'")[0]);

        var arrival_date = $("#arrival_date"+counter).val();
        var priority = $("#prioritydiv"+counter).val();
        var priority_text = $("#prioritydiv"+counter).text();
        var government_agency = $("#government_agencydiv"+counter+" option:selected").val();
        var government_agency_text = $("#government_agencydiv"+counter+" option:selected").text();
        var state = $("#statediv"+counter).val();
        var state_text = $("#statediv"+counter).text();
        var frequency = $("#frequencydiv"+counter+" option:selected").val();
        var frequency_text = $("#frequencydiv"+counter+" option:selected").text();
        var period = $("#perioddiv"+counter+" option:selected").val();
        var period_text = $("#perioddiv"+counter+" option:selected").text();
        var year = $("#yeardiv"+counter+" option:selected").val();
        var year_text = $("#yeardiv"+counter+" option:selected").text();
        var bank_name = $("#bank_namediv"+counter+" option:selected").val();
        var bank_name_text = $("#bank_namediv"+counter+" option:selected").text();
        var account_last_4 = $("#account_last_4"+counter).val();
        var description = $("#description"+counter).val();
        var name = $("#name"+counter).val();
        var uploaded_file = $("#uploaded_file"+counter+" option:selected").val();
        var employeeinfoid = $("#employeeinfoid"+counter).val();
    }

    /*console.log(counter);
    console.log(employeeinfoid);
    return false;*/

    if (document_sub_type !== undefined) {
        var main_document_type = document_sub_type.trim();
        document_sub_type_text = document_sub_type.replace(/ /g,"_").toLowerCase().trim();
    }
    var staff_id = $("#staff_id").val();
    if (folder_name !== undefined) {
        folder_name = folder_name.trim();
        folder_name_lower_case = folder_name.replace(/ /g,"_").toLowerCase();
    }
    if (file_list_url !== undefined) {
        file_list_url = file_list_url.trim();
    }
    console.log(file_list_url); console.log('demo');
    
    /*return false;*/
    if(sub_document_type!==undefined) {
        var main_sub_document_type =sub_document_type.trim();
        sub_document_type = sub_document_type.replace(/ /g,"_").toLowerCase().trim();
    }

    var api_data = '',file_name = '',statement = '';

    if(typeof period != 'undefined') { period=period.trim(); }
    if(typeof frequency != 'undefined') { frequency=frequency.trim(); }
    if(typeof account_last_4 != 'undefined') { account_last_4=account_last_4.trim(); }
    if(typeof bank_name_text != 'undefined') { bank_name_text=bank_name_text.trim(); }
    
    //console.log(document_sub_type_id); return false;
    // console.log(client_info);
    api_data = JSON.stringify(api_data);

    var last_inserted_id = await save_local_reference_for_sharepointfile(brand,franchise,client_type,client_id,section,section_id,reference,reference_sub_type,file_name,filetype,staff_id,folder_name,main_document_type,api_data,uploaded_file,employeeinfoid,arrival_date,priority,priority_text,government_agency,government_agency_text,state,state_text,frequency,frequency_text,period,period_text,year,year_text,bank_name,bank_name_text,account_last_4,description,main_sub_document_type,document_sub_type_id);
    var last_inserted_id =last_inserted_id.trim();
    var uploaded_insert_id=null;
    // alert(last_inserted_id);
    // console.log(last_inserted_id);
    // return false;
    if(last_inserted_id==0)
    {
        swal({
                title: "Error!",
                text: "Something Went wrong, Please try again!",
                type: "error"
            }, function () {
                window.location.reload();
        });
    }
    
    //console.log(last_inserted_id);
    var converted_last_inserted_id = JSON.parse(last_inserted_id);
    var uploaded_file_count = converted_last_inserted_id['count_files'];
    var uploaded_insert_id = converted_last_inserted_id['insert_id'];
    var uploaded_new_file_name = converted_last_inserted_id['file_name'];

    if(uploaded_file_count=='no_file')
    {
        swal({
                title: "Error!",
                text: "Please add naming convention in this document type.",
                type: "error"
            }, function () {
                window.location.reload();
        });
        return false;
    }

    console.log(uploaded_new_file_name);
    /*if(uploaded_file_count!='initial_file')
        {
            file_name = uploaded_new_file_name+'-'+uploaded_file_count+'.'+filetype;
        }
    else
        {
            file_name = uploaded_new_file_name+'.'+filetype;
        }*/

    file_name = uploaded_new_file_name+'.'+filetype;

    /*console.log(brand+'/'+franchise+'/'+client_type+'/'+client_id+'/'+folder_name+'/'+file_list_url+'/'+file_name+'/'+api_data);*/
    var client_info = {"brand":brand,"franchise":franchise,"client_type":client_type,"client_id":client_id,"file_list_url":file_list_url,"folder_name":folder_name,"file_name":file_name,"api_data":api_data };
    client_info = JSON.stringify(client_info);
    /*console.log(client_info);return false;*/
    form_data.append('client_info',client_info);
    form_data.append('api_data',api_data);
    form_data.append('brand',brand);
    form_data.append('franchise',franchise);
    form_data.append('client_type',client_type);
    form_data.append('client_id',client_id);
    form_data.append('file_name',file_name);
    form_data.append('folder_name',folder_name);
    form_data.append('file_list_url',file_list_url);
    $.ajax({
        async: true,
        // crossDomain: true,
        type: "POST",
        data: form_data,
        // url: "https://localhost:44310/api/SharePoint/UploadFileAsync",
        // url: "https://dev2.taxleaf.com:9099/api/SharePoint/UploadFileAsync",
        url: base_url + 'sharepoint/file_upload.php',
        dataType: "html",
        processData: false,
        contentType: false,
        mimeType: 'multipart/form-data',
        cache: false,
        success: function (result) {
            /*console.log(result);*/
            if (result == 1) {
                $('#azureuploadfile').modal('hide');
                $('#azureuploadfile_other').modal('hide');
                swal({
                    title: "Success!",
                    text: "File Uploaded Successfully!",
                    type: "success"
                }, function () {
                        //window.location.reload();
                        window.location =new_redirection_url;
                });
            } else {
                $.ajax({
                    type: "POST",
                    data: {
                        id: uploaded_insert_id
                    },
                    url: base_url + "client/delete_local_reference",
                    dataType: "html",
                    success: function (result1) {
                        swal({
                            title: "Error!",
                            text: "Something went wrong, Please try again!",
                            type: "error"
                        }, function () {
                            //window.location.reload();
                            window.location =new_redirection_url;
                        });
                    }
                });
            }
        },
        error: function (result) {
                $.ajax({
                    type: "POST",
                    data: {
                        id: uploaded_insert_id
                    },
                    url: base_url + "client/delete_local_reference",
                    dataType: "html",
                    success: function (result1) {
                        swal({
                            title: "Error!",
                            text: "Something went wrong, Please try again!",
                            type: "error"
                        }, function () {
                            //window.location.reload();
                            window.location =new_redirection_url;
                        });
                    }
                });
            },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function save_local_reference_for_sharepointfile(brand='',franchise='',client_type='',client_id='',
    section='',section_id='',reference='',reference_sub_type='',
    file_name='',filetype='',staff_id='',folder_name='',main_document_type='',api_data='',uploaded_file='',employeeinfoid='',
    arrival_date='',priority='',priority_text='',government_agency='',government_agency_text='',state='',state_text='',frequency=''
    ,frequency_text='',period='',period_text='',year='',year_text='',bank_name='',bank_name_text='',account_last_4='',description='',main_sub_document_type='',document_sub_type_id='')
{
    return $.ajax({
        type: "POST",
        data: {
                brand: brand,
                franchise: franchise,
                client_type:client_type,
                client_id:client_id,
                section:section,
                section_id:section_id,
                reference:reference,
                reference_sub_type:reference_sub_type,
                file_name:file_name,
                filetype:filetype,
                staff_id:staff_id,
                folder_name:folder_name,
                statement:main_document_type,
                api_data:api_data,
                uploaded_file:uploaded_file,
                employeeinfoid:employeeinfoid,
                arrival_date:arrival_date,
                priority:priority,
                priority_text:priority_text,
                government_agency:government_agency,
                government_agency_text:government_agency_text,
                state:state,
                state_text:state_text,
                frequency:frequency,
                frequency_text:frequency_text,
                period:period,
                period_text:period_text,
                year:year,
                year_text:year_text,
                bank_name:bank_name,
                bank_name_text:bank_name_text,
                account_last_4:account_last_4,
                description:description,
                main_sub_document_type:main_sub_document_type,
                document_sub_type_id:document_sub_type_id
            },
            url: base_url + "client/save_local_reference",
            dataType: "html",
            success: function (result) {
                
            }
        });
}


function view_azure_file(brand,franchise,client_type,client_id,folder_name,file_name,popup='') {
    if(popup=='hidepopup') {
        $('#showFiles').modal('hide');
    }
    //console.log('test');
    $.ajax({
            type: 'POST',
            //url: 'https://dev2.taxleaf.com:9099/api/SharePoint/DeleteFile?url_brand='+brand+'&url_franchise='+franchise+'&url_client_type='+client_type+'&url_client_id='+client_id+'&folder_name='+folder_name+'&file_name='+file_name+'',
            url: base_url + 'sharepoint/view_file.php',
            data: {
                    brand: brand,
                    franchise: franchise,
                    client_type: client_type,
                    client_id: client_id,
                    folder_name: folder_name,
                    file_name: file_name
                },
            success: function (result) {
                console.log(result)
                if(result!='') {
                    $.ajax({
                        type: "POST",
                        url: base_url + 'modal/view_azure_file_modal',
                        data: {
                            file_details: result
                        },
                        enctype: 'multipart/form-data',
                        cache: false,
                        success: function (result) {
                            /*if(popup=='hidepopup') {
                                $('#azure_file_view_form'+client_id).html(result).modal({
                                    backdrop: 'static',
                                    keyboard: false
                                });
                            }
                            else {*/
                                $('#azure_file_view_form').html(result).modal({
                                    backdrop: 'static',
                                    keyboard: false
                                });
                            /*}*/
                        },
                        beforeSend: function () {
                            openLoading();
                        },
                        complete: function (msg) {
                            closeLoading();
                        }
                    });
                } else {
                    swal("ERROR!", "Someting Went Wrong! Try Again.", "error");
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

function closeviewfilepopup(file_name) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/azure_file_unlink",
    data: {
        file_name: file_name
    },
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
        if(result==1){
            $('#azure_file_view_form').modal('hide');
        } else {
            swal("ERROR!", "File not found", "error");
        }
    },
  });
}

function download_azure_file(brand,franchise,client_type,client_id,folder_name,file_name) {
    $.ajax({
            type: 'POST',
            //url: 'https://dev2.taxleaf.com:9099/api/SharePoint/DeleteFile?url_brand='+brand+'&url_franchise='+franchise+'&url_client_type='+client_type+'&url_client_id='+client_id+'&folder_name='+folder_name+'&file_name='+file_name+'',
            url: base_url + 'sharepoint/download_file.php',
            data: {
                    brand: brand,
                    franchise: franchise,
                    client_type: client_type,
                    client_id: client_id,
                    folder_name: folder_name,
                    file_name: file_name
                },
            success: function (result) {
                if(result==0) {
                    swal("ERROR!", "Someting Went Wrong! Try Again.", "error");
                } else {
                    console.log(result);
                    var redirection_url = base_url+'sharepoint/final_download_file.php?file='+result;
                    window.open(redirection_url, '_blank');
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
