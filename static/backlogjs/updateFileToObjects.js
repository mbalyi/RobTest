var docType=['doc','docx', 'csv', 'xlsx', 'xlt', 'xls'];
function updateFilesToObject(obId){
    for(i=0;i<document.getElementById("fileUploadObject").files.length;i++){
        var fileName = document.getElementById("fileUploadObject").files[i].name;
        var extension = fileName.split('.').pop().toLowerCase();
        var isSuccess = fileTypes.indexOf(extension) > -1;
        var isDoc = docType.indexOf(extension) > -1;
        var file = document.getElementById("fileUploadObject").files[i];
        var reader = new FileReader();
        if(isSuccess || isDoc)
            reader.readAsDataURL(file);
        if(!isDoc && !isSuccess)
            reader.readAsText(file, 'UTF-8');
        data=[obId,document.getElementById("fileUploadObject").files[i].name]
        reader.onload = shipOffObject.bind(null,data);
    }
}

function shipOffObject(data,event){
    var result=event.target.result;
    var fileName = data[1];
    $.post("/upload_file_test/"+data[0]+"/object",{ name: fileName, context: result },function(datas,status){
        if(fileTypes.indexOf(data[1].split('.').pop().toLowerCase()) >-1){
            $(".imgFiles").append(datas);
        }
        else{
            $(".objectFiles").append(datas);
        }
    }).fail(function() {
    alert( "error" );
  });
}

function deleteFileObject(id){
    $.get("/deleteFiles/"+id+"/object",function(data,status){
        if(status){
            $("[data-fileid="+id+"]").remove();
        }
    });
}

function fileUpdateOnObject(obId){
    for(i=0;i<document.getElementById("fileUploadObject").files.length;i++){
        var fileName = document.getElementById("fileUploadObject").files[i].name;
        var extension = fileName.split('.').pop().toLowerCase();
        var isSuccess = fileTypes.indexOf(extension) > -1;
        var isDoc = docType.indexOf(extension) > -1;
        var file = document.getElementById("fileUploadObject").files[i];
        var reader = new FileReader();
        if(isSuccess)
            reader.readAsDataURL(file);
        if(isDoc || !isSuccess)
            reader.readAsText(file, 'UTF-8');
        data=[obId,document.getElementById("fileUploadObject").files[i].name]
        reader.onload = shipOffObjectUpdate.bind(null,data);
    }
}

function shipOffObjectUpdate(data,event){
    var result=event.target.result;
    var fileName = data[1];
    $.post("/upload_file_update/"+data[0]+"/object",{ name: fileName, context: result },function(datas,status){
        if(fileTypes.indexOf(data[1].split('.').pop().toLowerCase()) >-1 ||  docType.indexOf(data[1].split('.').pop().toLowerCase()) > -1){
            $(".imgFiles").append(datas);
        }
        else{
            $(".objectFiles").append(datas);
        }
    }).fail(function() {
    alert( "error" );
  });
}