SetForm="<h1>Sets</h1><div style='width:100%'><table style='width:100%' class='set_no'><tr><td class='set_staic_name'>Name:</td>";
SetForm+="<td class='set_staic_input'><input type='text' name='name' value='Name' class='set_input form-control' readonly></td></tr>";
SetForm+="<tr><td>Date:</td><td><input type='date' name='date' class='set_input form-control' readonly></td></tr>";
SetForm+="<tr><td>Priority:</td><td><input type='text' name='priority' value='high' class='set_input form-control' readonly></td></tr></table>";
SetForm+="<div class='textAreas'><p>Text Areas:</p><span><input type='checkbox'>Admin</span><span><input type='checkbox'>Security Policy</span><span><input type='checkbox'>Set Form Test</span></div>";
SetForm+="<p>Included Cases</p><div class='incCases' style='height: 300px; background-color: #777;'></div></div>"

editableSetForm="<h1>Sets</h1><div style='width:100%'><table style='width:100%' class='set_no'><tr><td class='set_staic_name'>Name:</td>";
editableSetForm+="<td class='set_staic_input'><input type='text' name='name' value='Name' class='set_input form-control'></td></tr>";
editableSetForm+="<tr><td>Date:</td><td><input type='date' name='date' class='set_input form-control'></td></tr>";
editableSetForm+="<tr><td>Priority:</td><td><input type='text' name='priority' value='high' class='set_input form-control'></td></tr></table>";
editableSetForm+="<div class='textAreas'><p>Text Areas:</p><span><input type='checkbox'>Admin</span><span><input type='checkbox'>Security Policy</span><span><input type='checkbox'>Set Form Test</span></div>";
editableSetForm+="<p>Included Cases</p><div class='incCases' ondrop='drop(event)' ondragover='allowDrop(event)' style='height: 300px; background-color: #777;'></div></div>"

setBtn="<table><tr><td class='newSet' style='width:50px'><a class='btn btn-default btn-sm' href='#' role='button' id='newSet'>New</a></td>";
setBtn+="<td class='saveSet' style='width:53px'><a class='btn btn-default btn-sm disabled' href='#' role='button' id='saveSet'>Save</a></td>";
setBtn+="<td class='cancelSet' style='width:50px'><a class='btn btn-default btn-sm' href='#' role='button' id='cancelSet'>Cancel</a></td><td style='width:50px'></td>"
setBtn+="<td style='width: 20px'></td><td class='deleteCase'><td></tr></table><hr>"

newSetDis="<a class='btn btn-default btn-sm disabled' href='#' role='button' id='newSet'>New</a>"
saveSetEn="<a class='btn btn-default btn-sm' href='#' role='button' id='saveSet'>Save</a>"