var stepFiles=['jpg','jpeg', 'png', 'gif'];
function loadFiles(event,status){
    $(event.target).parent().children("ul").empty();
    for(i=0;i<event.target.files.length;i++){
        $(event.target).parent().children("ul").append("<li> <-pic-"+status+"-"+i.toString()+"-> "+event.target.files[i].name);
    }
}

function updateFilesToStep(stepIds){
    for(j=0;j<stepIds.length;j++){
        for(i=0;i<document.getElementsByName("fileToUploadStepAction")[j].files.length;i++){
            var fileName = document.getElementsByName("fileToUploadStepAction")[j].files[i].name;
            var extension = fileName.split('.').pop().toLowerCase();
            var isSuccess = stepFiles.indexOf(extension) > -1;
            var file = document.getElementsByName("fileToUploadStepAction")[j].files[i];
            var reader = new FileReader();
            if(isSuccess)
                reader.readAsDataURL(file);
            else
                alert("Unsupported type!")
            data=[stepIds[j][0],document.getElementsByName("fileToUploadStepAction")[j].files[i].name,"action","<-pic-action-"+i.toString()+"->"]
            reader.onload = shipOffStep.bind(null,data);
        }
        for(i=0;i<document.getElementsByName("fileToUploadStepResult")[j].files.length;i++){
            var fileName = document.getElementsByName("fileToUploadStepResult")[j].files[i].name;
            var extension = fileName.split('.').pop().toLowerCase();
            var isSuccess = stepFiles.indexOf(extension) > -1;
            var file = document.getElementsByName("fileToUploadStepResult")[j].files[i];
            var reader = new FileReader();
            if(isSuccess)
                reader.readAsDataURL(file);
            else
                alert("Unsupported type!")
            data=[stepIds[j][0],document.getElementsByName("fileToUploadStepResult")[j].files[i].name,"result","<-pic-result-"+i.toString()+"->"]
            reader.onload = shipOffStep.bind(null,data);
        }
    }
}

function shipOffStep(data,event){
    var result=event.target.result;
    var fileName = data[1];
    $.post("/upload_step_files/"+data[0]+"/"+data[2]+"/"+data[3],{ name: fileName, context: result },function(datas,status){}
    ).fail(function() {
    alert( "error" );
  });
}

function deleteFileCase(id){
    $.get("/deleteFiles/"+id+"/step",function(data,status){
        if(status){
            $("[data-fileid="+id+"]").remove();
        }
    });
}

function fileUpdateOnStep(stepId,childId){
    for(i=0;i<document.getElementById("fileUploadCase").files.length;i++){
        var fileName = document.getElementById("fileUploadCase").files[i].name;
        var extension = fileName.split('.').pop().toLowerCase();
        var isSuccess = fileTypes.indexOf(extension) > -1;
        var isDoc = docType.indexOf(extension) > -1;
        var file = document.getElementById("fileUploadCase").files[i];
        var reader = new FileReader();
        if(isSuccess)
            reader.readAsDataURL(file);
        if(isDoc || !isSuccess)
            reader.readAsText(file, 'UTF-8');
        data=[stepId,document.getElementById("fileUploadCase").files[i].name]
        reader.onload = shipOffStepUpdate.bind(null,data);
    }
}

function shipOffStepUpdate(data,event){
    var result=event.target.result;
    var fileName = data[1];
    $.post("/upload_file_update/"+data[0]+"/step",{ name: fileName, context: result },function(datas,status){
        if(fileTypes.indexOf(data[1].split('.').pop().toLowerCase()) >-1 ||  docType.indexOf(data[1].split('.').pop().toLowerCase()) > -1){
            $(".imgFiles").append(datas);
        }
        else{
            $(".stepFiles").append(datas);
        }
    }).fail(function() {
    alert( "error" );
  });
}