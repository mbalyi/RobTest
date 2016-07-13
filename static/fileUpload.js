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
    var file = new FormData(document.getElementById(stepexeId));
    $.post("/upload_file",file,function(data,status){
        if(status){
            $(".fileStep[data-stepexeid="+stepexeId+"]").append(data);
        }
    }).fail(function() {
    alert( "error" );
  });
}