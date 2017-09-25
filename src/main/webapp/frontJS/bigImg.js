//弹出二维码
function createWeChat(imgUrl){
	$('<div id="pop_page" style="display:none;position:fixed;top:0;right:0;bottom:0;left:0;background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNFMkE0MDBBOERFNTExRTVBRjUxRDg2NzNENDQ3NDNCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjNFMkE0MDBCOERFNTExRTVBRjUxRDg2NzNENDQ3NDNCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M0UyQTQwMDg4REU1MTFFNUFGNTFEODY3M0Q0NDc0M0IiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M0UyQTQwMDk4REU1MTFFNUFGNTFEODY3M0Q0NDc0M0IiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz64ZzTUAAAAD0lEQVR42mIQFlXaDxBgAAGTAQpzue8GAAAAAElFTkSuQmCC) 0 0 repeat;background-size:1px 1px;z-index:1000;"><div style="background:#fff;padding:20px;width:340px;position:absolute;top:50%;left:50%;margin-top:-170px;margin-left:-170px;z-index:1000;"><img src="'+imgUrl+'" style="display:block;margin:0 auto;"></div></div>').appendTo('body');
	$('#pop_page').fadeIn(300);


	$('#pop_page').on('click',function(){
		$(this).fadeOut(300,function(){
			$(this).remove();
		});
	});
}