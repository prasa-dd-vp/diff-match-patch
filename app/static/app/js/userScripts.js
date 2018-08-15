$(document).ready(function(){
	var para1, para2;
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
		var i=0,j,k;
		var string = '';
		$.each(diffs_array, function(index, array) { // This each iterates over the arrays.
			
			if (array[0] == 0){
			html_string += array[1]+"<br>";
			string += array[1]
			}
			
			if (array[0] == -1){
				i+=1;
			html_string += "<strike>"+array[1]+`</strike><br><button class="remove"  id="But" onclick = "sample(`+string.length+`)"> Accept</button><br>`;
			string += array[1]
			}
			
			if (array[0] == 1){
			html_string += "<u>"+array[1]+"</u><br>";
			}
		});
		console.log(string)
		$('#resultant').contents().find('#result').html(html_string);
	}
	
});
