var removed_string = '';
var added_string = '';
var html_string = '';
var para1, para2;
var diffs_array = [];


function remove(start,end,pos){
	//console.log(i);
	//console.log(j);
	console.log(pos);
	console.log(diffs_array);
	var ifrm = parent.document.getElementById('doc1');
	var doc = ifrm.contentDocument? ifrm.contentDocument: ifrm.contentWindow.document;
	var get_str = doc.getElementById("target1").innerHTML;
	var set_str = get_str.slice(0,start)+get_str.slice(end)	
	removed_string = set_str;
	doc.getElementById("target1").innerHTML = set_str;
	document.getElementById("But"+start+"").style.visibility = "hidden";
}

function add(i,strr){
	var ifrm = parent.document.getElementById('doc1');
	var doc = ifrm.contentDocument? ifrm.contentDocument: ifrm.contentWindow.document;
	var get_str = doc.getElementById("target1").innerHTML;
	doc.getElementById("target1").innerHTML = get_str.slice(0,i)+strr+get_str.slice(i);
	removed_string = get_str.slice(0,i)+strr+get_str.slice(i);
	document.getElementById("add"+i+"").style.visibility = "hidden";
}

$(document).ready(function(){

	$("#d1").on("input",function(){
		para1 = $("#d1").val();
		$.ajax({
			url: '/d1/',
			method: 'POST',
			data:{
				'd1': para1
				},
			success: function (data) {
				$('#doc1').contents().find('#target1').html(data);
				}
		});		
	});
		
	
	
	$("#d2").on("input",function(){
		para2 = $("#d2").val();
		$.ajax({
			url: '/d2/',
			method: 'POST',
			data: {
				  'd2': para2
				  },
			success: function (data) {
					$('#doc2').contents().find('#target2').html(data);
					}
		});		
	});	
	
	
	
	$("#b1").click(function(){
        //alert("button");
		//var para1 = $("#d1").val();
		//var para2 = $("#d2").val();
		$.ajax({
			url: '/dmp/',
			method: 'POST',
			data: {
				  'd1': para1,
				  'd2': para2
				  },
			dataType:'json',
			success: function (data) {
					var json = JSON.parse(data);
					diffs_array = json['diffs'];
					process(diffs_array);
					}
		});
    });
	
	
	var array_pos = -1;
	
	function process(diffs_array){
		console.log(diffs_array);
		 
		$.each(diffs_array, function(index, array) { // This each iterates over the arrays.
			array_pos += 1;
			if (array[0] == 0){
				html_string += array[1]+"<br>";
				removed_string += array[1];
				added_string += array[1];
			}
			
			if (array[0] == -1){
				start_index = parseInt(removed_string.length);
				end_index = (parseInt(array[1].length)+parseInt(removed_string.length));
				html_string += "<strike>"+array[1]+`</strike><br><button class="remove"  id="But`+removed_string.length+`" onclick = "remove(`+start_index+`,`+end_index+`,`+array_pos+`)"> Accept</button><br>`;
				removed_string += array[1];
			}
			
			if (array[0] == 1){
			var ar = array[1];
			html_string += "<u>"+array[1]+`</u><br><button class="add"  id="add`+added_string.length+`" onclick = "add(`+parseInt(added_string.length)+`,'`+ar+`')">Accept</button><br>`;
			added_string += array[1];
			}
		});
		
		$('#resultant').contents().find('#result').html(html_string);
	}
	
});
