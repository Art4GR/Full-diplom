
$(document).ready(function(){
	
	
	$('.blk1').click(function(){
		var p=$(this).next().next('div');
		if(p.css('display')!='none') p.slideUp('fast'); else p.slideDown('fast');
	});
	
	});

