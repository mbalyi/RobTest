exeForm="<div class='exeHeader'><table style='width:100%'><tr><th>Name:</th><th>";
exeForm+="<input type='text' name='title' class='form-control' value='Name' readonly></th></tr>";
exeForm+="<tr><th>Date:</th><th><input type='date' name='priority' class='form-control' readonly></th></tr>";
exeForm+="<tr><th>Test Object:</th><th class='objectDD'></th></tr></table>";
exeForm+="<p>Included Cases</p><div class='incCases' style='height: 300px; background-color: #777;'></div></div>";

exeBtn="<table><tr><td class='newExe' style='width:50px'><a class='btn btn-default btn-sm' href='#' role='button' id='newExe'>New</a></td>";
exeBtn+="<td class='saveExe' style='width:53px'><a class='btn btn-default btn-sm disabled' href='#' role='button' id='saveExe'>Save</a></td>";
exeBtn+="<td class='cancelExe' style='width:50px'><a class='btn btn-default btn-sm' href='#' role='button' id='cancelExe'>Cancel</a></td><td style='width:50px'></td>"
exeBtn+="<td style='width: 20px'></td><td class='deleteExe'><td></tr></table><hr>"

newExeDis="<a class='btn btn-default btn-sm disabled' href='#' role='button' id='newExe'>New</a>"
saveExeEn="<a class='btn btn-default btn-sm' href='#' role='button' id='saveExe'>Save</a>"