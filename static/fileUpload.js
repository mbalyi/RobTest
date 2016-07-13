function fileUploadTest(eventId){
    var sendData=$(".executionSelector").find(":selected").attr('data-dbid')+"/"+eventId;
    $.get("/fileProperty/"+sendData,function(data,status){
        if(status){
            $("[data-popname='uploadPop'][data-dbid='"+eventId+"']").popover({content: data, html:true});
            $("[data-popname='uploadPop'][data-dbid='"+eventId+"']").popover('toggle');
        }
    });
}