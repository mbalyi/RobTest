var uploadTestPopover=[];
function fileUploadTest(eventId){
    var sendData=$(".executionSelector").find(":selected").attr('data-dbid')+"/"+eventId;
    $.get("/fileProperty/"+sendData,function(data,status){
        if(status){
            if(uploadTestPopover.indexOf(eventId) == -1){
                $("[data-popname='uploadPop'][data-dbid='"+eventId+"']").popover({content: data, html:true});
                $("[data-popname='uploadPop'][data-dbid='"+eventId+"']").popover('show');
                uploadTestPopover.push(eventId);
            }
            else{
                $("[data-popname='uploadPop'][data-dbid='"+eventId+"']").popover('destroy');
                uploadTestPopover.splice(uploadTestPopover.indexOf(eventId),1);
            }
        }
    });
}

function cancelFileTest(stepId){
    $("[data-popname='uploadPop'][data-dbid='"+stepId+"']").popover('destroy');
}

var fileTypes = ['jpg', 'jpeg', 'png'];

function saveFileTest(stepexeId){
    var title = "file"+stepexeId;
    for(i=0;i<document.getElementById(title).files.length;i++){
        var fileName = document.getElementById(title).files[i].name;
        var extension = fileName.split('.').pop().toLowerCase();
        var isSuccess = fileTypes.indexOf(extension) > -1;
        var file = document.getElementById(title).files[i];
        var reader = new FileReader();
        if(isSuccess)
            reader.readAsDataURL(file);
        else
            reader.readAsText(file, 'UTF-8');
        data=[stepexeId,document.getElementById(title).files[i].name]
        reader.onload = shipOff.bind(null,data);
    }
}

function shipOff(data,event){
    var result=event.target.result;
    var title = "file"+data[0];
    var fileName = data[1];
    $.post("/upload_file_test/"+data[0]+"/test",{ name: fileName, context: result },function(datas,status){
            $(".fileStep[data-stepexeid="+data[0]+"]").append(datas);
    }).fail(function() {
    alert( "error" );
  });
}

function deleteFileTest(id){
    $.get("/deleteFiles/"+id+"/test",function(data,status){
        if(status){
            $("[data-fileid="+id+"]").remove();
        }
    });
}