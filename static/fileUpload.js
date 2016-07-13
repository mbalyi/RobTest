function fileUploadTest(eventId){
    var sendData=$(".executionSelector").find(":selected").attr('data-dbid')+"/"+eventId;
    $.get("/fileProperty/"+sendData,function(data,status){
        if(status){
            $("[data-popname='uploadPop'][data-dbid='"+eventId+"']").popover({content: data, html:true});
            $("[data-popname='uploadPop'][data-dbid='"+eventId+"']").popover('show');
        }
    });
}

function cancelFileTest(stepId){
    $("[data-popname='uploadPop'][data-dbid='"+stepId+"']").popover('hide');
}

var fileTypes = ['jpg', 'jpeg', 'png'];

function saveFileTest(stepexeId){
    var title = "file"+stepexeId;
    var fileName = document.getElementById(title).files[0].name;
    var extension = fileName.split('.').pop().toLowerCase();
    var isSuccess = fileTypes.indexOf(extension) > -1;
    var file = document.getElementById(title).files[0];
    var reader = new FileReader();
    if(isSuccess)
        reader.readAsDataURL(file);
    else
        reader.readAsText(file, 'UTF-8');
    reader.onload = shipOff.bind(null,stepexeId);
}

function shipOff(id,event){
    var result=event.target.result;
    var title = "file"+id;
    var fileName = document.getElementById(title).files[0].name;
    $.post("/upload_file_test/"+id,{ name: fileName, context: result },function(data,status){
        if(status){
            $(".fileStep[data-stepexeid="+id+"]").append(data);
        }
    }).fail(function() {
    alert( "error" );
  });
}

function deleteFileTest(id){
    $.get("/deleteFileTest/"+id,function(data,status){
        if(status){
            $("[data-fileid="+id+"]").remove();
        }
    });
}