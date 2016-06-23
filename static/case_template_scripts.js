EditableStepHeader="<div style='width:100%' class='case_header'></div>";

stepBtn="<button name='add_step' id='add_step' class='btn btn-default btn-sm'>Add Step</button>";
stepBtn+="<button name='delete_step' id='delete_step' class='btn btn-default btn-sm'>Delete Step</button>";
stepBtn+="<button name='up_step' id='up_step' class='btn btn-default btn-sm'>Up</button>";
stepBtn+="<button name='down_step' id='down_step' class='btn btn-default btn-sm'>Down</button><div style='width:100%'>";
stepBtn+="<table style='width:100%' class='case_table'>";
stepBtn+="</table>";

caseBtn="<table><tr><td class='newCase' style='width:50px'><a class='btn btn-default btn-sm' href='#' role='button' id='newCase'>New</a></td>";
caseBtn+="<td class='saveCase' id='saveCase' style='width:53px'><a class='btn btn-default btn-sm disabled' id='saveCase' href='#' role='button'>Save</a></td>";
caseBtn+="<td class='cancelCase' style='width:50px'><a class='btn btn-default btn-sm' href='#' role='button' id='cancelCase'>Cancel</a></td><td style='width:50px'></td>"
caseBtn+="<td style='width: 20px'></td><td class='deleteCase'><td></tr></table><hr>"

newCaseDis="<a class='btn btn-default btn-sm disabled' href='#' role='button' id='newCase'>New</a>"
saveCaseEn1="<a class='editablecase btn btn-default btn-sm' id='saveCase' data-dbid='";
saveCaseEn2="' href='#' role='button'>Save</a>";

caseForm="<div class='case_header'><table class='editablecase' data-dbid='newCase' style='width:100%'><tr><th>Name:</th><th>";
caseForm+="<input type='text' name='title' class='form-control' value='Name' readonly></th></tr>";
caseForm+="<tr><th>Priority:</th><th><input type='number' name='priority' class='form-control' value='Priority' readonly>";
caseForm+="</th></tr><tr><th>Data:</th><th><input type='text' name='data' class='form-control' value='Description' readonly>";
caseForm+="</th></tr></table><div style='width:100%'><table style='width:100%' class='case_table_no'>";
caseForm+="<tr><th>Action</th><th>Result</th></tr><tr>";
caseForm+="<th><input class='action form-control' type='text' name='action[]' value='Action description' readonly></th>";
caseForm+="<th><input class='result form-control' type='text' name='result[]' value='Result description' readonly></th>";
caseForm+="</tr></table></div></div>";

editableCaseForm="<div class='case_header'><table class='editablecase' data-dbid='newCase' style='width:100%'><tr><th>Name:</th><th>";
editableCaseForm+="<input type='text' name='title' class='form-control' value='Name' id='name'></th></tr>";
editableCaseForm+="<tr><th>Priority:</th><th><input type='number' name='priority' class='form-control' value='Priority'>";
editableCaseForm+="</th></tr><tr><th>Data:</th><th><input type='text' name='data' class='form-control' value='Description'>";
editableCaseForm+="</th></tr></table><div style='width:100%'><table style='width:100%' class='case_table_no'>";
editableCaseForm+="<div class='stepBtn'></div>";
editableCaseForm+="<tr><th>Action</th><th>Result</th></tr><tr>";
editableCaseForm+="<th><input class='action form-control' type='text' name='action[]' value='Action description'></th>";
editableCaseForm+="<th><input class='result form-control' type='text' name='result[]' value='Result description'></th>";
editableCaseForm+="</tr></table></div></div>";