var base_url = document.getElementById('base_url').value;

     function insert_visit(){
        if (!requiredValidation('add_visit_form')) {
        return false;
       }

        var form_data = new FormData(document.getElementById('add_visit_form'));
           $.ajax({
              type: 'POST',
              url: base_url + 'visitation/Visitation_home/insert_visit',
              data: form_data,
              enctype: 'multipart/form-data',
              cache: false,
              contentType: false,
              processData: false,
              success: function (result) {
                  // alert(result);return false;
                  if(result == 1 ){
                      swal("Success!", "Successfully added visitation!", "success");
                      $("#visitation-form-modal").modal('hide');
                      visitation_dashboard();
                   }else{
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


      function visitation_dashboard(){
         $.ajax({
            type: 'POST',
             url: base_url + 'visitation/Visitation_home/visitation_dashboard',
             success: function(res){
                 // $(".ajaxdiv").show();
                $(".ajaxdiv").html(res);
             },
              beforeSend: function () {
                  openLoading();
              },
              complete: function (msg) {
                  closeLoading();
              }
         });

      }


      function update_visit(id){
         // alert(id);return false;
          var form_data = new FormData(document.getElementById('update_visit_form'));
           $.ajax({
              type: 'POST',
              url: base_url + 'visitation/Visitation_home/update_visit/'+ id,
              data: form_data,
              enctype: 'multipart/form-data',
              cache: false,
              contentType: false,
              processData: false,
              success: function (result) {
                   //console.log(result);return false;
                  if(result.trim() == 1 ){
                      swal("Success!", "Successfully updated visitation!", "success");
                      $("#visitation-form-modal").modal('hide');
                      visitation_dashboard();
                   }else{
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

      function update_visitation_notes(){
    var formData = new FormData(document.getElementById('modal_note_form_update'));
    //var actionid = $("#modal_note_form_update #actionid").val();
    $.ajax({
                type: 'POST',
                url: base_url + 'visitation/Visitation_home/update_visit_Notes',
                data: formData,
                enctype: 'multipart/form-data',
                cache: false,
                contentType: false,
                processData: false,
                success: function (result) {
                   swal({title: "Success!", text: "Successfully Updated!", type: "success"}, function () {
                        document.getElementById("modal_note_form_update").reset(); 
                        $('#visitation-note-modal').modal('hide');
                    });
                },
                beforeSend: function () {
                    $("#update_note").prop('disabled', true).html('Processing...');
                    openLoading();
                },
                complete: function (msg) {
                    $("#update_note").removeAttr('disabled').html('Save Note');
                    closeLoading();
                }
            });
     }


    function add_visitation_notes(){
    var formData = new FormData(document.getElementById('modal_note_form'));
    var visitation_id = $("#modal_note_form #visitation_id").val();
    $.ajax({
                type: 'POST',
                url: base_url + 'visitation/Visitation_home/add_visit_Notesmodal',
                data: formData,
                enctype: 'multipart/form-data',
                cache: false,
                contentType: false,
                processData: false,
                success: function (result) {
                   swal({title: "Success!", text: "Successfully Saved!", type: "success"}, function () {
                       // if(result!='0'){
                       //      var prevnotecount = $("#notecount-"+visitation_id).text();
                       //     var notecount = parseInt(prevnotecount)+parseInt(result);
                       //     $("#notecount-"+visitation_id).text(notecount);
                       // }
                       //$("#notecount-"+visitation_id).removeClass('label label-warning').addClass('label label-danger');
                         visitation_dashboard();
                        document.getElementById("modal_note_form").reset(); 
                        $(".removenoteselector").trigger('click');
                        $('#visitation-note-modal').modal('hide');
                    });
                },
                beforeSend: function () {
                    $("#save_note").prop('disabled', true).html('Processing...');
                    openLoading();
                },
                complete: function (msg) {
                    $("#save_note").removeAttr('disabled').html('Save Note');
                    closeLoading();
                }
            });

       }



    function show_visit_files_modal(id) {
        $.ajax({
            type: 'POST',
            url: base_url + 'visitation/Visitation_home/show_visit_files_modal',
            data: {
                id: id
            },
            success: function (result) {
                $('#showvisitFiles #files-modal-body').html(result);
                openModal('showvisitFiles');
            }
        });
  }

  var fileupload_visitation = () => {
    // alert("Hello");return false;
    if (!requiredValidation('file_upload_action_modal')) {
        return false;
    }
    var form_data = new FormData(document.getElementById("file_upload_action_modal"));
    var action_id = $("#visit_id").val();
    // console.log(form_data);return false;
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'visitation/Visitation_home/fileupload_visitation',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            visitation_dashboard();
            if (result.trim() == 0) {
                swal("ERROR!", "Unable To Add File", "error");
            } else {
                swal({title: "Success!", text: "Successfully Saved!", type: "success"}, function () {
                    // var oldactionfilecount = $("#actionfile" + action_id).attr('count');
                    // var newactionfilecount = parseInt(oldactionfilecount) + parseInt(result.trim());
                    // //alert(newactionfilecount);
                    // $("#actionfilespan" + action_id).html('<a class="label label-danger" href="javascript:void(0)" onclick="show_action_files(' + action_id + ')"><b>' + newactionfilecount + '</b></a>');
                });
            }
            document.getElementById("file_upload_action_modal").reset();
            $("#showvisitFiles").modal('hide');
        },
        beforeSend: function () {
            $(".upload-file-butt").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}


function get_office_list_forstaff(office_id, selected="") {        
    $.ajax({
        type: "POST",
        data: {
            office_id: office_id,
            selected: selected
        },
        url: base_url + 'visitation/Visitation_home/get_office_list_forstaff',
        dataType: "html",
        success: function (result) {
           $("#manager").html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function updateStatusVisitation(){

    var status = $('input[name=radio]:checked').val();
        // alert(status);return false;
        var id = $("#visit_id").val();
         // alert(id);return false;
        $.ajax({
            type: 'POST',
            url: base_url + '/visitation/Visitation_home/update_visitation_status',
            data: {
                status: status,
                id: id
            },
            success: function (result) {
                // alert(result);return false;
                
                if (result == "1") {
                    swal({title: "Success!", text: "Successfully Saved!", type: "success"});
                   $("#changeStatusVisitation").modal('hide');
                    visitation_dashboard();
                    // goURL(base_url + 'visitation/visitation_home');
                    
                } else {
                    swal("ERROR!", "Unable To Update Status", "error");
                }
            },
            beforeSend: function () {
                // $("#visitation-tracking-button").prop('disabled', true).html('Processing...');
                openLoading();
            },
            complete: function (msg) {
                //$("#tracking-button").removeAttr('disabled').html('Save Changes');
                closeLoading();
            }
        });
}

      

       


      

       