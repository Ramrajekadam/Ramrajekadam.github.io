$(document).ready(function()
{
	//slides the element with class "menu_body" when paragraph with class "menu_head" is clicked 
	$("#firstpane p.menu_head").click(function()
    {
		$(this).next("div.menu_body").slideToggle(300).siblings("div.menu_body").slideUp("slow");
       	//$(this).siblings().css({backgroundImage:"url(images/bullet.png)"});
		$("#firstpane div.menu_body").css({backgroundImage:"none"});
	});
	//slides the element with class "menu_body" when mouse is over the paragraph

});