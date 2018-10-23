/*
#УВЕЛИЧЕНИЕ РАЗМЕРА КОЛЕС
#СОБЫТИЯ СТРАНИЦЫ
	- Событие увеличения колеса
	- Кнопка ОТМЕНА в винилах
	- Нажатие на кнопку ВЫБРАТЬ в  винилах
	- Нажатие на одно из изображений винилов
	- Выбор дисков
	- Применение цвета к диску
	- Смена колеса в рабочей области
	- Применение функции перетаскивания для дисков
	- Пролистывание дисков
#СОБЫТИЯ СТРАНИЦЫ
*/


/*#ИЗМЕНЕНИЕ ОТОБРАЖАЕМОГО ИЗОБРАЖЕНИЯ ПРИ ЕГО ВЫБОРЕ*/
function FormMotoOk(){
    $(".selectAuto .images").removeClass("current");
    $(".selectMoto .images").removeClass("current");
    var picture = $(".selectMoto .images.select").removeClass("select").addClass("current").find(".picture").data('picture');
    $("#img img#otobrajenie").attr("src", picture);
    $("li#osnovnoy").trigger("click");
    return false;
}
/*#ИЗМЕНЕНИЕ ОТОБРАЖАЕМОГО ИЗОБРАЖЕНИЯ ПРИ ЕГО ВЫБОРЕ*/

/*УВЕЛИЧЕНИЕ РАЗМЕРА КОЛЕС*/
	function zoomWhell(className){
		//текущая ширина колес
		var imageWidth = $("#left_wheel img").width();
        var rightPos = $("#right_wheel").position();
        var leftPos = $("#left_wheel").position();
        //console.log(leftPos);
		//новая ширина колес
		var newImageWidth = "";
		var newTopr = "";
		var newLeftr = "";
        var newTopl = "";
        var newLeftl = "";
		if(className == "plus"){
			newImageWidth = imageWidth + 10;
			newTopr = rightPos.top - 5;
            newLeftr = rightPos.left - 5
            newTopl = leftPos.top - 5;
            newLeftl = leftPos.left - 5;
		}
		else if(className == "minus"){
			newImageWidth = imageWidth - 10;
            newTopr = rightPos.top + 5;
            newLeftr = rightPos.left + 5
            newTopl = leftPos.top + 5;
            newLeftl = leftPos.left + 5;
		}
        //console.log(newLeftr);
		if(newImageWidth <= 150 && newImageWidth >= 80){
			$(".wheel img").animate({width:newImageWidth},100);
            $("#right_wheel").animate({left:newLeftr,top:newTopr},100);
            $("#left_wheel").animate({left:newLeftl,top:newTopl},100);

		}
	}
/*УВЕЛИЧЕНИЕ РАЗМЕРА КОЛЕС*/


/*СОБЫТИЯ СТРАНИЦЫ*/
	$(document).ready(function(){

		//Событие увеличения колеса
		$("#zoom_block a").click(function(){
			zoomWhell($(this).parent().attr("class"));
			return false;
		});
		//Событие увеличения колеса

		//Кнопка отмена	внутри блока
		$(".selectCancel").click(function(){
			$("li#osnovnoy").trigger("click");
			return false;
		});
		//Кнопка отмена	внутри блока

		//Нажатие на кнопку ВЫБРАТЬ в винилах
		$(".AutoOk").click(function(){
			FormAutoOk();
		});

		$(".MotoOk").click(function(){
			FormMotoOk();
		});
		//Нажатие на кнопку ВЫБРАТЬ в винилах
		$(".selectPrint .print").click(function(){


		if($(this).hasClass("select")){
        	FormAutoOk();
        }
        else{
            $(".selectPrint .images").removeClass("select");
            $(this).addClass("select");
			var newPrint = $(this).find('img').data('print');
			var printPos = $(this).find('img').data('position');
			var printRep = $(this).find('img').data('repeat');
			$('#otobrajenie').css('background-image', 'url('+newPrint+')');
			$('#otobrajenie').css('background-repeat', ''+printRep+'');
			$('#otobrajenie').css('background-position', ''+printPos+'');
        }
			});
		//Выбор дисков
		$(".selectDisk .disk").click(function(){
			//Кнопки управления каруселью
			if($(".disk.select").length >= 7){
				$(".carousel .buttons").fadeIn(300);
			}
			else{
				$(".carousel .buttons").fadeOut(300);
			}
			return false;
		});
		//Выбор дисков

		$(".loadPrints").click(function(){
			$("#printSet").trigger("click");
		});


		//Применение цвета к диску
		$("#selectedColor span").live("click", function(){
			if($(this).hasClass("mirror")){
				$(".wheel img").attr("src", $(this).data("mirrorpicture"));
				$(this).addClass("selected");
				return false;
			}
			
            if($(this).hasClass("yellow")){
				$(".wheel img").attr("src", $(this).data("yellowpicture"));
				$(this).addClass("selected");
				return false;
			}



			else{
				
				var wheelRealPicture = $(this).data("realpicture");
				$(".wheel img").attr("src", wheelRealPicture);
				if($(this).hasClass("nocolor")){
					
					$(".select_color").parent().trigger("click");
				}
				else{
					$(".yellow").removeClass("selected");
					$(".mirror").removeClass("selected");
					
					$("#selectedColor span").removeClass("currents");
					$(this).addClass("currents");
					var colorCode = $(this).data("color");
					var relColorCode = $(this).data("relcolor");
					var whellId = $(".carousel-block.select").attr("id");
					var wheelUrl = $(".carousel-block.select").children("img").attr("src");
					var stringToAjax = "COLOR_CODE="+colorCode+"&WHELL_ID="+whellId+"&WHELL_URL="+wheelUrl;
					capture_data_for_element_name(false, false, relColorCode);
					
					SendCustomAjax(stringToAjax, OnLoadAjaxConfig);
				}
			}
		});
		//Применение цвета к диску

		//Смена колеса в рабочей области
		$(".carousel-block").live("click", function(){
			$("#viewer .wheel").removeClass("none");
			$(".carousel-block").removeClass("select");
			$(this).addClass("select");
			var whells = $(this).children("img").attr("src");
			$(".wheel img").attr("src", whells);
			var mirrorSrc = $(this).data("mirrorpicture");
			var mirrorTitle = $(this).data("title");

			var yellowSrc = $(this).data("yellowpicture");
			var yellowTitle = $(this).data("title");

			$("#selectedColor span").data("realpicture", whells);
			$("#selectedColor .mirror").data("mirrorpicture", mirrorSrc);
			capture_data_for_element_name(false, mirrorTitle, false);

			$("#selectedColor .yellow").data("yellowpicture", yellowSrc);
			capture_data_for_element_name(false, yellowTitle, false);
		});
		//Смена колеса в рабочей области

         //Выбор цветов
		$("li#osnovnoy").click(function(){
			$("#selectedColor .colorRemove").attr("style", "display:none");
		});
		$("li#colorSet").click(function(){
			$("#selectedColor .colorRemove").removeAttr("style");
		});
        //Выбор цветов
		

		//Вывод подсказки
		$(".hint").live("mouseover", function(e){
			$('.hiddenHint').css({"display":"inline-block","position":"absolute", "top":e.pageY, "left":e.pageX}).html($(this).data("name"));
		});
		$(".hint").live("mouseout", function(e){
			$('.hiddenHint').css({"display":"none"});
		});
		//Вывод подсказки


	});

/*КОНЕЦ СОБЫТИЯ СТРАНИЦЫ*/

	/*Применение функции перетаскивания для дисков*/
	$(function() {
		$("#right_wheel").draggable({containment:"#viewer", scroll:false});
        $("#left_wheel").draggable({containment:"#viewer", scroll:false});
	});
	/*Применение функции перетаскивания для дисков*/

	/*Пролистывание дисков*/
	(function($) {
		$(function() {

		  $('ul.tabs').on('click', 'li:not(.current)', function() {
		      $(this).addClass('current').siblings().removeClass('current')
		          .parents('div.section').find('div.box').eq($(this).index()).fadeIn(150).siblings('div.box').hide();
		  });

		});
	})(jQuery);
	/*Пролистывание дисков*/


/*СОБЫТИЯ СТРАНИЦЫ*/