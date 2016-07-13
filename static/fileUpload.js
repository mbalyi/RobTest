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

function saveFileTest(stepexeId){
    var title = "file"+stepexeId;
    var file = document.getElementById(title).files[0];
    var reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = shipOff.bind(null,stepexeId);
}

function shipOff(id,event){
    var result=event.target.result;
    var title = "file"+id;
    var fileName = document.getElementById(title).files[0].name;
    $.post("/upload_file/"+id,{ name: fileName, context: result },function(data,status){
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