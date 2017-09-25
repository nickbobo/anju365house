$(function() {
    initMenu();
});

function initMenu() {
	$('.easyui-accordion').empty();
	var menuslist = "";

	$.each(_menus.menus, function(i, n) {
		menuslist += '<div title="'+ n.menuname +'" icon="'+ n.icon +'" style="overflow:auto; padding:10px;" >';
			menuslist += '<ul>';
				$.each(n.menus, function(j, o) {
					menuslist += '<li><div><a target="mainFrame" href="'+ o.url +'"><span class="icon '+ o.icon +'">'+ o.menuname +'</span></a></div></li>';
				})
			menuslist += '</ul>';
		menuslist += '</div>';
	})

	$('.easyui-accordion').append(menuslist);

	$('.easyui-accordion li a').click(function() {
		var tblTitle = $(this).text();
		var url = $(this).attr("href");
		addTab(tblTitle, url);
		$('.easyui-accordion li div').removeClass("selected");
		$(this).parent().addClass("selected");
	}).hover(function() {
		$(this).parent().addClass("hover");
	}, function() {
		$(this).parent().removeClass("hover");
	});

	$(".easyui-accordion").accordion();
}

function addTab(title, url) {
	if(!$('#tabs').tabs('exists', title)) {
		$('#tabs').tabs('add', {
			title:title,
			content:createFrame(url),
			closable:true,
			width:$('#mainPanle').width() - 10,
			height:$('#mainPanle').height() - 26
		});
	} else {
		$('#tabs').tabs('select', title);
	}
}

function createFrame(url) {
	return '<iframe name="mainFrame" scrolling="auto" frameborder="0" src="'+ url +'" style="width:100%; height:100%;"></iframe>';
}