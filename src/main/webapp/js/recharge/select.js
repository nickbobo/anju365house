$(function(){
	var flag = true;
	$('.selcet-clone').on('click',function(e){
		var T = $(this);

		if(T.attr('data-status') == 'cancel'){
			return false;
		}
		
		if(flag){
			T.parent().find('dl').fadeIn(200);
			flag = false;

			$(document).one('click',function(){
				T.parent().find('dl').fadeOut(200);
				flag = true;
			});

			e.stopPropagation();
		}else{
			T.parent().find('dl').fadeOut(200);
			flag = true;
		}
	});
	$('.other dl').on('click','dd',function(){
		$(this).parent().parent().find('.selcet-clone').text($(this).text());
	});
});