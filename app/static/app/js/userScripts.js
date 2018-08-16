var removed_string = '';
var len = 0;
var para1, para2;
function remove(i,j)
{
	
console.log(i);
console.log(j);
var ifrm = parent.document.getElementById('doc1');
var doc = ifrm.contentDocument? ifrm.contentDocument: ifrm.contentWindow.document;
var get_str = doc.getElementById("target1").innerHTML;
var set_str = get_str.slice(0,i)+get_str.slice(j)	
removed_string = set_str;
doc.getElementById("target1").innerHTML = set_str;
//console.log(str.slice(0,len-i)+str.slice(len-j));
document.getElementById("But"+i+"").style.visibility = "hidden";

//len = len+(j-i);

/*//console.log(doc.getElementById('target1'));
var str = doc.getElementById("target1").innerHTML;
doc.getElementById("target1").innerHTML=" ";
console.log(str.slice(0,i)+str.slice(j));
doc.getElementById("target1").innerHTML = str;*/
}

function add(i,strr){
	//alert("haaan okay");
	//console.log(i);
	//console.log(str);
	var ifrm = parent.document.getElementById('doc1');
	var doc = ifrm.contentDocument? ifrm.contentDocument: ifrm.contentWindow.document;
	var get_str = doc.getElementById("target1").innerHTML;
	doc.getElementById("target1").innerHTML = get_str.slice(0,i)+strr+get_str.slice(i);
	removed_string = get_str.slice(0,i)+strr+get_str.slice(i);
	//console.log(get_str);
	//console.log(get_str.slice(0,i) + strr + get_str.slice(i));
	document.getElementById("add"+i+"").style.visibility = "hidden";

}

$(document).ready(function(){
	//var para1, para2;
	var diffs_array = []
	var html_string = '';

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
					//alert("hurray");
					//$('#resultant').contents().find('#result').html(data);
					process(data);
					}
		});
    });
	
	
	
	function process(data){
		//alert(`asdasd`);
		var json = JSON.parse(data);
		diffs_array = json['diffs'];
		
		
		var added_string = '';
		$.each(diffs_array, function(index, array) { // This each iterates over the arrays.
			
			if (array[0] == 0){
			html_string += array[1]+"<br>";
			removed_string += array[1];
			added_string += array[1];
			}
			
			if (array[0] == -1){
				//i+=1;
			html_string += "<strike>"+array[1]+`</strike><br><button class="remove"  id="But`+removed_string.length+`" onclick = "remove(`+parseInt(removed_string.length)+','+(parseInt(array[1].length)+parseInt(removed_string.length))+`)"> Accept</button><br>`;
			removed_string += array[1];
			}
			
			if (array[0] == 1){
				var ar = array[1];
			html_string += "<u>"+array[1]+`</u><br><button class="add"  id="add`+added_string.length+`" onclick = "add(`+parseInt(added_string.length)+`,'`+ar+`')">Accept</button><br>`;
			added_string += array[1];
			//console.log(html_string)
			}
		});
		
		$('#resultant').contents().find('#result').html(html_string);
	}
	
});
