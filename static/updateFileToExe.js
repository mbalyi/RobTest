var docType=['doc','docx', 'csv', 'xlsx', 'xlt', 'xls'];
function updateFilesToExe(exeId){
    for(i=0;i<document.getElementById("fileUploadExe").files.length;i++){
        var fileName = document.getElementById("fileUploadExe").files[i].name;
        var extension = fileName.split('.').pop().toLowerCase();
        var isSuccess = fileTypes.indexOf(extension) > -1;
        var isDoc = docType.indexOf(extension) > -1;
        var file = document.getElementById("fileUploadExe").files[i];
        var reader = new FileReader();
        if(isSuccess || isDoc)
            reader.readAsDataURL(file);
        if(!isDoc && !isSuccess)
            reader.readAsText(file, 'UTF-8');
        data=[exeId,document.getElementById("fileUploadExe").files[i].name]
        reader.onload = shipOffExe.bind(null,data);
    }
}

function shipOffExe(data,event){
    var result=event.target.result;
    var fileName = data[1];
    $.post("/upload_file_test/"+data[0]+"/exe",{ name: fileName, context: result },function(datas,status){
        if(fileTypes.indexOf(data[1].split('.').pop().toLowerCase()) >-1){
            $(".imgFiles").append(datas);
        }
        else{
            $(".exeFiles").append(datas);
        }
    }).fail(function() {
    alert( "error" );
  });
}

function deleteFileExe(id){
    $.get("/deleteFiles/"+id+"/exe",function(data,status){
        if(status){
            $("[data-fileid="+id+"]").remove();
        }
    });
}

function fileUpdateOnExe(exeId){
    for(i=0;i<document.getElementById("fileUploadExe").files.length;i++){
        var fileName = document.getElementById("fileUploadExe").files[i].name;
        var extension = fileName.split('.').pop().toLowerCase();
        var isSuccess = fileTypes.indexOf(extension) > -1;
        var isDoc = docType.indexOf(extension) > -1;
        var file = document.getElementById("fileUploadExe").files[i];
        var reader = new FileReader();
        if(isSuccess)
            reader.readAsDataURL(file);
        if(isDoc || !isSuccess)
            reader.readAsText(file, 'UTF-8');
        data=[exeId,document.getElementById("fileUploadObject").files[i].name]
        reader.onload = shipOffExeUpdate.bind(null,data);
    }
}

function shipOffExeUpdate(data,event){
    var result=event.target.result;
    var fileName = data[1];
    $.post("/upload_file_update/"+data[0]+"/exe",{ name: fileName, context: result },function(datas,status){
        if(fileTypes.indexOf(data[1].split('.').pop().toLowerCase()) >-1 ||  docType.indexOf(data[1].split('.').pop().toLowerCase()) > -1){
            $(".imgFiles").append(datas);
        }
        else{
            $(".exeFiles").append(datas);
        }
    }).fail(function() {
    alert( "error" );
  });
}