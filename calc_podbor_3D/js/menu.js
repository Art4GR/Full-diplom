hs.lang = {
	cssDirection: 'ltr',
	loadingText : 'Загрузка...',
	loadingTitle : 'Нажмите, чтобы отменить',
	focusTitle : 'Поместить на передний план',
	fullExpandTitle : 'Увеличить до оригинального размера (f)',
	creditsText : 'Powered by <i>Highslide JS</i>',
	creditsTitle : 'Go to the Highslide JS homepage',
	previousText : 'Предыдущий',
	nextText : 'Вперед', 
	moveText : 'Переместить',
	closeText : 'Закрыть', 
	closeTitle : 'Закрыть (esc)', 
	resizeTitle : 'Изменить размер',
	playText : 'Play',
	playTitle : 'Play slideshow (spacebar)',
	pauseText : 'Пауза',
	pauseTitle : 'Pause slideshow (spacebar)',
	previousTitle : 'Назад (стредка влево)',
	nextTitle : 'Вперед (стрелка вправо)',
	moveTitle : 'Переместить',
	fullExpandText : 'В полный размер',
	restoreTitle : '',
	number: 'Image %1 of %2',
	restoreTitle : 'Click to close image, click and drag to move. Use arrow keys for next and previous.'
};

hs.graphicsDir = '/js/hs/graphics/';
hs.expandCursor = 'zoomin.cur'; // null disables
hs.restoreCursor = 'zoomout.cur'; // null disables
hs.expandDuration = 150; // milliseconds
hs.restoreDuration = 250;
hs.marginLeft = 15;
hs.marginRight = 15;
hs.marginTop = 15;
hs.marginBottom = 15;
hs.zIndexCounter = 1001; // adjust to other absolutely positioned elements
hs.loadingOpacity = 0.75;
hs.allowMultipleInstances= true;
hs.numberOfImagesToPreload = 0;
hs.outlineWhileAnimating = 2; // 0 = never; 1 = always; 2 = HTML only 
hs.outlineStartOffset = 3; // ends at 10
hs.padToMinWidth = false; // pad the popup width to make room for wide caption
hs.fullExpandPosition = 'bottom right';
hs.fullExpandOpacity = 1;
hs.showCredits = false; // you can set this to false if you want
hs.creditsHref = 'http=//highslide.com/';
hs.creditsTarget = '_self';
hs.enableKeyListener = true;
hs.openerTagNames = ['a', 'area']; // Add more to allow slideshow indexing
hs.transitions = [];
hs.transitionDuration = 250;
hs.dimmingOpacity = 0; // Lightbox style dimming background
hs.dimmingDuration = 50; // 0 for instant dimming

hs.allowWidthReduction = false;
hs.allowHeightReduction = true;
hs.preserveContent = true; // Preserve changes made to the content and position of HTML popups.
hs.objectLoadTime = 'before'; // Load iframes 'before' or 'after' expansion.
hs.cacheAjax = false; // Cache ajax popups for instant display. Can be overridden for each popup.
hs.anchor = 'auto'; // where the image expands from
hs.align = 'auto'; // position in the client (overrides anchor)
hs.targetX = null; // the id of a target element
hs.targetY = null;
hs.dragByHeading= true;
hs.minWidth= 200;
hs.minHeight= 200;
hs.allowSizeReduction= true; // allow the image to reduce to fit client size. If false; this overrides minWidth and minHeight
hs.outlineType = 'rounded-white'; // set null to disable outlines

function logit(msg){
	if (($.browser.webkit || $.browser.mozilla) && typeof(console)!='undefined') console.log(msg);
}

var hsCmp;

hs.Expander.prototype.onAfterExpand = function (sender) {
	if(sender.a.id.indexOf('cmp')!=-1) {
		hsCmp=sender;
	}
}

var boxyInstance=null;

/*  demo
hs.Expander.prototype.onBeforeExpand = function (sender) {
	logit('before ewxpand');
}
hs.Expander.prototype.onInit = function (sender) {
	logit('init');
}

hs.Expander.prototype.onInit = function (sender) {
   var s = "The current properties of sender:\n\n";
   for (var x in sender) {
      if (typeof sender[x] != "function")
         s += x +": "+ sender[x] +"\n";
   }
   s += "\nClick OK to continue, or Cancel to cancel the expander."
   return confirm(s);
}
hs.Expander.prototype.onAfterExpand = function () {
   alert (this.caption.innerHTML);
}
hs.Expander.prototype.onImageClick = function (sender) {
   return confirm("Do you really want to close this nice image?");
}
*/

/*--- tabs ---*/
function initTabs(tabsContainer, tabsList, tabItem)
{
	$(tabsContainer).each(function(){

        var _hold = $(this);
        var _btn = _hold.find(tabsList);
		var _box = _hold.find(tabItem);

        var _a = _btn.index(_btn.filter('.active:eq(0)'));
		if(_a == -1) _a = 0;
		_btn.removeClass('active').eq(_a).addClass('active');
		_box.removeClass('active').css({
			display:'none'
		});
		_box.eq(_a).addClass('active').css({
			display:'block'
		});
		
		_btn.click(function(e){
			changeTab(_btn.index(this));
			return false;
		});

        if(window.location.hash) changeTab(window.location.hash);

		function changeTab(_ind){
            if(typeof _ind != 'number'){
                var i=_btn.index(_btn.find('a[href="'+_ind+'"]').parent());
                if(i == -1) return; else _ind=i;
            }
			if(_ind != _a){
				_btn.eq(_a).removeClass('active');
				_btn.eq(_ind).addClass('active');
				_box.eq(_a).removeClass('active').css({
					display:'none'
				});
				_box.eq(_ind).addClass('active').css({
					display:'block'
				});
				_a = _ind;
			}
		}
	});
}

function initWinterAPEvents()
{

	var models0='<option value="">модель</option>';
	var years0='<option value="">год выпуска</option>';
	var modifs0='<option value="">двигатель</option>';
	var loader='<img src="/images/ax/6.gif">';
	
	$('#winterAPForm .ap-mark').val('');
	$('#winterAPForm .ap-model').html(models0).prop('disabled',true);
	$('#winterAPForm .ap-year').html(years0).prop('disabled',true);
	$('#winterAPForm .ap-modif').html(modifs0).prop('disabled',true);
	
	$('#winterAPForm .ap-mark').change(function(){
		$('#winterAPForm .sizes').html('').hide();
		if($(this).val()!=''){
			$('#winterAPForm .loader').html(loader);
			$.ajax({
				url: '/fe/ap.php?act=get_models',
				data: {mark: $(this).val()},
				success: function(r){
					if(r.fres){
						$('#winterAPForm .ap-model').html(r.s).prop('disabled',false);
						$('#winterAPForm .ap-year').html(years0).prop('disabled',true);
						$('#winterAPForm .ap-modif').html(modifs0).prop('disabled',true);
					}else emsg(r);
				},
				complete: function(){
					$('#winterAPForm .loader').html('');
				}
			});
		}else{
			$('#winterAPForm .ap-model').html(models0).prop('disabled',true);
			$('#winterAPForm .ap-year').html(years0).prop('disabled',true);
			$('#winterAPForm .ap-modif').html(modifs0).prop('disabled',true);
		}
	});

	$('#winterAPForm .ap-model').change(function(){
		$('#winterAPForm .sizes').html('').hide();
		if($(this).val()!=''){
			$('#winterAPForm .loader').html(loader);
			$.ajax({
				url: '/fe/ap.php?act=get_years',
				data: {model: $(this).val()},
				success: function(r){
					if(r.fres){
						$('#winterAPForm .ap-year').html(r.s).prop('disabled',false);
						$('#winterAPForm .ap-modif').html(modifs0).prop('disabled',true);
					}else emsg(r);
				},
				complete: function(){
					$('#winterAPForm .loader').html('');
				}
			});
		}else{
			$('#winterAPForm .ap-year').html(years0).prop('disabled',true);
			$('#winterAPForm .ap-modif').html(modifs0).prop('disabled',true);
		}
	});


	$('#winterAPForm .ap-year').change(function(){
		$('#winterAPForm .sizes').html('').hide();
		if($(this).val()!=''){
			$('#winterAPForm .loader').html(loader);
			$.ajax({
				url: '/fe/ap.php?act=get_modifs',
				data: {year: $(this).val()},
				success: function(r){
					if(r.fres){
						$('#winterAPForm .ap-modif').html(r.s).prop('disabled',false);
					}else emsg(r);
				},
				complete: function(){
					$('#winterAPForm .loader').html('');
				}
			});
		}else{
			$('#winterAPForm .ap-modif').html(modifs0).prop('disabled',true);
		}
	});


	$('#winterAPForm .ap-modif').change(function(){
		if($(this).val()!=''){
			$('#winterAPForm .loader').html(loader);
			$.ajax({
				url: '/fe/ap.php?act=select_modif',
				data: {modif: $(this).val()},
				dataType: 'html',
				success: function(r){
					$('#winterAPForm .sizes').html(r).show();
				},
				complete: function(){
					$('#winterAPForm .loader').html('');
				}
			});
		}else{
			$('#winterAPForm .sizes').html('').hide();
		}
	});
		
}

$(document).ready(function(){
	
	initTabs('div.tabs', '.tabs-nav li', 'div.tabs-content div.tabs-box');
	
	if($('#winterAPForm').length) initWinterAPEvents();
	
	$('.scdet a').live('click',function(e){
		e.preventDefault();
		var cat_id=$(this).attr('cat_id');
		var span=$(this).parent();
		var tr=$(this).parent().parent().parent();
		var tdNum=tr.children('td').length;
		if(tr.next('tr').hasClass('scl')){
			if(tr.next('.scl').css('display')=='none'){
				tr.next('.scl').show();
				tr.next('.scl').children('td').slideDown(100);
				span.addClass('up');
			}else{
				tr.next('.scl').children('td').slideUp(100,function(){
					tr.next('.scl').hide();
					span.removeClass('up');
				});
			}
		}else{
			tr.after('<tr class="scl"><td style="display:none" class="cat" colspan="'+tdNum+'"><img src="/images/ax/3.gif"></td><tr>');
			tr.next('.scl').children('td').slideDown(100);
			span.addClass('up');
			$.ajax({
				url: '/fe/scl.php?act=list&cat_id='+cat_id,
				method:'POST',
				success: function(r){
					var cc='';
					var am=0;
					if(r.fres){
						if(isDefined(r.scl[2])){
							sc=r.scl[2]['sc'];
							cc=cc+'<table class="sc"><th nowrap>Центральный склад: Береговой проезд, д.3</th><td class="m"></td><td nowrap>'+sc+' шт.</td></tr></table>';
							cc=cc+r.texts[2];
							am=am+sc;
						}
						if(isDefined(r.scl[1])){
							sc=r.scl[1]['sc'];
							cc=cc+'<table class="sc"><th nowrap>Удаленный склад</th><td class="m"> </td><td nowrap>'+sc+' шт.</td></tr></table>';
							cc=cc+r.texts[1];
							am=am+sc;
						}
						if(am==0) {
							cc='<p>Нет информации по наличию</p>';
						}else{
							cc=cc+'<div class="gray">'+r.texts['bottom']+'</div>';
						}
						tr.next('.scl').children('td').html(cc);
					} else {
						tr.next('.scl').children('td').html('Ошибка загрузки');
					}
				}
			});
		}
	});
	
	$('#tabs').easytabs();

	$('.show-search-tipos').click(function(e){
		e.preventDefault();
		$(this).hide();
		if($(this).attr('loaded')){
			$(this).parent().next('div').slideDown('fast');
			$(this).parent().next().next('a').show();
		}else{
			$(this).parent().next('div').html('<img src="/images/ax/9.gif">');
			$(this).parent().next('div').load('/fe/search.htm',{mid:$(this).attr('rel'),gr:$(this).attr('gr')},function(){
				$('.explain').click(explain);
				$('.tocart').click(tocart);
				$('.colvo').keydown(function(e){
					if(e.keyCode==13) tocart(e);
				});
				$(this).next('a').show();
				$(this).prev().children('a').attr('loaded','1');
			});
		}
	});
	
	$('a.hide-search-tipos').click(function(e){
		e.preventDefault();
		$(this).hide().prev('div').slideUp('fast');
		$(this).prev().prev().children('a').show();
	});
	
	$('form.search').submit(function(e){
		if($('form.search input').val().length<3 || $('form.search input').hasClass('grey')){
			e.preventDefault();
		}
	});
	
	if($('form.search input').val()==''){
		$('form.search input').val('Введите название модели').addClass('grey');
	}
	
	$('form.search input').focusin(function(e){
		if($(this).val()=='Введите название модели'){
			$(this).val('');
			$(this).removeClass('grey');
		}
	});
	$('form.search input').focusout(function(e){
		if($(this).val()==''){
			$(this).val('Введите название модели');
			$(this).addClass('grey');
		}
	});

	$('#apblk1up').click(function(e){
		hide_ap_blk(1);
		e.preventDefault();
	});
	$('#apblk1down').click(function(e){
		show_ap_blk(1);
		e.preventDefault();
	});
	$('#apblk2up').click(function(e){
		hide_ap_blk(2);
		return false;
	});
	$('#apblk2down').click(function(e){
		show_ap_blk(2);
		e.preventDefault();
	});
	$('#delauto').click(function(e){
		delAuto();
		e.preventDefault();
	});
	
	$('.blk1').click(function(){
		var p=$(this).next().next('div');
		if(p.css('display')!='none') p.slideUp('fast'); else p.slideDown('fast');
	});
	
	$('.tip').each(function(){
		if($(this).hasClass('ship-ico')) $(this).attr('title','|Шипованная резина');
		else if($(this).hasClass('sezon-ico')) {
			var src=$(this).attr('src');
			if(src.indexOf('zimaleto')!=-1)  $(this).attr('title','Сезон|Всесезонная резина');
			else if(src.indexOf('zima')!=-1)  $(this).attr('title','Сезон|Зимняя резина');
			else if(src.indexOf('leto')!=-1)  $(this).attr('title','Сезон|Летняя резина');
		}
		var s=$(this).attr('title');
		if(s.indexOf('|')==-1) $(this).attr('title','|'+s);
	});
	
	$('.sc-icon0').addClass('tip').attr('title','нет на складе');
	$('.sc-icon1').addClass('tip').attr('title','есть на складе');
	$('img[src*="leto.gif"]').addClass('tip').attr('title','сезон|летние шины');
	$('img[src*="zimaleto.gif"]').addClass('tip').attr('title','сезон|всесезонные шины');
	$('img[src*="zima.gif"]').addClass('tip').attr('title','сезон|зимние шины');
	$('img[src*="ship.gif"]').addClass('tip').attr('title','сезон и шипы|зимняя шипованная шина');

	$('img[src*="legk.gif"]').addClass('tip').attr('title','применяемость шины|для легковых автомобилей');
	$('img[src*="vnedor.gif"]').addClass('tip').attr('title','применяемость шины|для внедорожников');
	$('img[src*="lgruz.gif"]').addClass('tip').attr('title','применяемость шины|для легких грузовиков');
	$('img[src*="legk_vnedor.gif"]').addClass('tip').attr('title','применяемость шины|для внедорожников и легких грузовиков');
	
	$('.tip').cluetip({
		tracking: true,
		splitTitle: '|',
		showTitle:false,
/*		dropShadow: false,
		cluetipClass: 'rounded',*/
		arrows: true
	});
	

	$('a.compare').attr('title',' нажмите чтобы сравнить товар');
	
	$.ajaxSetup({
		type:'POST',
		cache:false,
		dataType: 'json',
		error: Err
	});  
	
	$('#ptype1').click(function(e){
			$('#dptype0').show('fast');
			$('#dptype1').hide('fast');
	});
	$('#ptype2').click(function(e){
			$('#dptype1').show('fast');
			$('#dptype0').hide('fast');
	});
	$('#_tc').change(function(){
		if($(this).val()!='') 
			$('#tc_url').html('<a href="http://'+$('#_tc > option[value="'+$(this).val()+'"]').attr('u')+'" target=_blank>Перейти на сайт &quot;'+$(this).val()+'&quot;</a>');
		else $('#tc_url').html('');
	});
	
	$("select[name='_city']").change(function(){
		$('#_tc').css('display','none');
		$('#tc_loading').css('display','block');
		$.ajax({
			data: {act:'get_tc', city: $(this).val()},
			url: '/fe/basket.php',
			success: function(res){
				if(res.fres==false) emsg(res);
				else {
					if(res.c==0) $("#tc_row").css('display','none'); else {
						$("#tc_row").css('display','block');
					}					
					$("select[name='tc']").html(res.data);
				}
			},
			complete: function(){
				$('#tc_loading').css('display','none');
				$('#_tc').css('display','block');
			}
		});
	});
	
	$('.compare').click(function (e){
		e.preventDefault();
		var cat_id=$(this).attr('cat_id');
		var gr=$(this).attr('gr');
		var v='cmp'+gr+'_'+cat_id;
		if(getCookie(v)!=null){
			$(this).html('добавить к сравнению').css('background-image','url(/images/cmp.gif)');
			$('.cmpLine input[cat_id='+cat_id+']').parent().remove();
			if(!$('#leftCmp input').length) $('#leftCmp').hide('fast');
			delCookie(v);
	//			note('Размер исключен из списка сравнения','cmp');
		}else{
			$(this).html('отменить сравнение').css('background-image','url(/images/cmp0.gif)');
			$('#leftCmpWrapper').append('<div class="cmpLine"><input type="image" src="/images/del.gif" width="12" height="12" cat_id="'+cat_id+'" gr="'+gr+'" /><a href="'+((gr==1?'/t_cat/tipo-':'/d_cat/tipo-')+cat_id+'.html')+'">'+$(this).attr('fname')+'</a></div>');
			$('.cmpLine input').click(cmpDel);
			$('#leftCmp').show('fast');
			setCookie(v,1);
	//			note('Размер добавлен к сравнению','cmp');
			if(typeof _gaq !='undefined'){
				_gaq.push(['_trackEvent', 'Interface', 'Compare', (gr==1?'PushTyres':'PushDisks')]);
			}	
			if(hsCmp!=null) {
				hsCmp.close();
				hsCmp=null;
			}
			hs.htmlExpand(this,{preserveContent:false, targetX: $(this).attr('id')+' 170px',targetY: null, maincontentText: '<div id="popCmp">'+$('#leftCmp').html()+'</div>'});
			//logit(hsCmp.a.href);
			$('.cmpLine input').click(cmpDel);
		}
	});
	
	$('.cmpLine input').click(cmpDel);
	
	$('.explain').click(explain);
	
	$('.infoPop').click(function(e){
		var opt={};
		opt.objectType='ajax';
		opt.preserveContent=true;
		if(typeof($(this).attr('minWidth'))!='undefined') opt.minWidth=$(this).attr('minWidth'); else opt.minWidth=700;
		if(typeof($(this).attr('marginTop'))!='undefined') opt.marginTop=$(this).attr('marginTop'); else opt.marginTop=50;
	 	hs.htmlExpand(this,opt);
		e.preventDefault();
	});
	
	/* CART  */
	
	$('.tocart').click(tocart);
		
	if($('#cart_tbl').length){
	
		$('#delivery_but').click(cartDeliverySW);
		
		$('.colvo').keydown(function(e){
			if(e.keyCode==13) tocart(e);
		});
		
		$('.smDelCart').click(smDelCart);
		$('.dopDelCart').click(dopDelCart);
		$('.catDelCart').click(catDelCart);
		$('#cart_tbl .inc').click(cartInc);
		$('#cart_tbl .dec').click(cartDec);
		$('#cart_tbl input.colvo').keypress(function(){
			return false;
		});
	}
	
	/*  ---- CART   */
	

});

function tocart (e){
	e.preventDefault();
	if($(e.target).hasClass('colvo')){
		var el=$('.tocart[cat_id='+$(e.target).attr('name').substr(1)+']');
	} else var el=$(this);
	var cat_id=el.attr('cat_id');
	var am=$('input[name=c'+cat_id+']').val()*1;
	var sc=$('input[name=c'+cat_id+']').attr('sc')*1;
	if(am<=0) {
		alert('Укажите кол-во для добавления в корзину');
		return;
	}
	
	if(am>sc){
		Boxy.ask('Вы указали кол-во, превышающее имеющееся на складе. Положить в корзину '+sc+' шт.?',{1:"Добавить", 0:"Не добавлять"},
			function(r){
				if(r==0) return;
				else{
					am=sc;
					$('input[name=c'+cat_id+']').val(sc);
					addToCart(cat_id, am);
				}
			});
	} else addToCart(cat_id, am);
	
}

function addToCart(id,am){
	var cartb=new Boxy('<p>Добавляем в корзину....</p>',{title:'Корзина',center:true, modal:true});
	boxyInstance=cartb;
	cartb.toTop();
	$.ajax({
		url: '/fe/basket.php',
		type: 'GET',
		data: { act: 'add', cat_id: id, amount: am },
		success: function(d){
			if(d.fres) {
				if(!isDefined(d.exist)){
					if(typeof _gaq !='undefined'){
						if(d.gr==1)	_gaq.push(['_trackEvent', 'Cart', 'addTyre', d.fn]);
						if(d.gr==2)	_gaq.push(['_trackEvent', 'Cart', 'addDisk', d.fn]);
					}		
					if(typeof yaCounter184489 !='undefined'){	
						yaCounter184489.reachGoal("ADD-TO-CART");
					}	
				}
				if(false && window.MD) 
					location.href='/basket.html';
				else {
					cartb.show();
					cartb.setContent(d.fres_msg); 
					cartb.center('x');
					cartb.center('y');
					
					if(isDefined(d.fn)) reloadCornerCart();
					
				}
			}else emsg(d);
			
		}
	});
}

var tc_row_val;

function cartDeliverySW (e){
	e.preventDefault();
	if($("INPUT[name='no_delivery']").val()=='0'){
		$('#delivery_but').html('c доставкой');
		$('#delivery_text').html('Самовывоз');
		$('#delivery_cost').html('0 руб.');
		$('#cart_itog').html(totalSum);
		$("INPUT[name='no_delivery']").val('1');
		setCookie('no_delivery',1);
		$('#gd_row').hide('fast');
		tc_row_val=$('#tc_row').css('display');
		$('#tc_row').hide('fast');
		$('#ad_row1').hide('fast');
		$('#nd_row').show('fast');
	}else{
		$('#delivery_but').html('забрать со склада');
		$('#delivery_text').html('Доставка');
		$('#delivery_cost').html($("INPUT[name='delivery_cost']").val()+' руб.');
		$("INPUT[name='no_delivery']").val('0');
		$('#cart_itog').html(totalNdSum);
		delCookie('no_delivery');
		$('#nd_row').hide('fast');
		$('#gd_row').show('fast');
		$('#tc_row').css('display',tc_row_val);
		$('#ad_row1').show('fast');
	}
//		$('#itog').fadeOut('fast').fadeIn('fast');
	$('#delivery_cost').fadeOut('fast').fadeIn('fast');
	return false;
}

function reloadCornerCart()
{
	$.ajax({
		url: '/fe/basket.php',
		type: 'GET',
		dataType: 'html',
		data: {act:'cornerCart'},
		success: function(r){
			if(r!=''){
				$('#corner-cart #ccart-c').html(r);
				$('#corner-cart').slideDown(500);
			} else $('#corner-cart').slideUp(500);
		}
	});
}

function smDelCart(e)
{
	e.preventDefault();
	var cat_id=$(e.target).parent().parent('tr').attr('sm_cat_id');
	$.ajax({
		url: '/fe/basket.php',
		type: 'GET',
		data: { act: 'delCart_sm', cat_id: cat_id },
		success: function(r){
			if(!r.fres) emsg(r); else {
				$('#cart_asum').html(r['cart_asum']);
				$('#cart_discountNdSum').html(r['cart_discountNdSum']);
				$('#cart_sm_discountCurrent').html(r['cart_sm_discountCurrent']);
				$('#cart_sm_sum').html(r['cart_sm_sum']);
				$('#cart_economySum').html(r['cart_economySum']);
				$('#cart_itog').html(r['cart_itog']);
				if(r['cart_sm_sum']==0) $('.cart_sm_fields').remove();
				$('tr[sm_cat_id='+cat_id+']').each(function(){
					$(this).fadeOut(800,function (){ 
						$(this).remove();
					});
				});
			}
		}
	});
	return false;
}

function dopDelCart(e)
{
	e.preventDefault();
	var cat_id=$(e.target).parent().parent('tr').attr('dop_cat_id');
	var dop_id=$(e.target).parent().parent('tr').attr('dop_id');
	$.ajax({
		url: '/fe/basket.php',
		type: 'GET',
		data: { act: 'dopDelCart', cat_id: cat_id, dop_id: dop_id },
		success: function(r){
			if(!r.fres) emsg(r); else {
				$('#cart_asum').html(r['cart_asum']);
				$('#cart_discountNdSum').html(r['cart_discountNdSum']);
				$('#cart_sm_discountCurrent').html(r['cart_sm_discountCurrent']);
				$('#cart_sm_sum').html(r['cart_sm_sum']);
				$('#cart_economySum').html(r['cart_economySum']);
				$('#cart_itog').html(r['cart_itog']);
				$('tr[dop_id='+dop_id+']').each(function(){
					$(this).fadeOut(800,function (){ 
						$(this).remove(); 
					});
				});
			}
		}
	});
	return false;
}

function ccartDel(cat_id)
{
	$.ajax({
		url: '/fe/basket.php',
		type: 'GET',
		data: { act: 'catDelCart', cat_id: cat_id },
		success: function(r){
			if(!r.fres) emsg(r); else {
				reloadCornerCart();
			}
		}
	});
	return false;

}

function catDelCart(e)
{
	e.preventDefault();
	var cat_id=$(e.target).parent().parent('tr').attr('cat_id');
	$.ajax({
		url: '/fe/basket.php',
		type: 'GET',
		data: { act: 'catDelCart', cat_id: cat_id },
		success: function(r){
			if(!r.fres) emsg(r); else {
				$('#cart_asum').html(r['cart_asum']);
				$('#cart_discountNdSum').html(r['cart_discountNdSum']);
				$('#cart_sm_discountCurrent').html(r['cart_sm_discountCurrent']);
				$('#cart_sm_sum').html(r['cart_sm_sum']);
				$('#cart_economySum').html(r['cart_economySum']);
				$('#cart_itog').html(r['cart_itog']);
				if(r['cart_sm_sum']==0) $('.cart_sm_fields').remove();
				$('tr[sm_cat_id='+cat_id+'], tr[dop_cat_id='+cat_id+'], tr[cat_id='+cat_id+']').each(function(){
					$(this).fadeOut(800,function (){ 
						$(this).remove(); 
						if(!$('#cart_tbl tr.tov').length) {
							$('.cartNE').slideUp(100);
							$('.cartEmpty').fadeIn(800);
						}
					});
				});
			}
		}
	});
	return false;
}

function cartInc(e)
{
	e.preventDefault();
	var cat_id=parseInt($(e.target).parent().parent('tr').attr('cat_id'));
	var maxSC=parseInt($(e.target).parent().parent('tr').attr('maxSC'));
	var curAm=parseInt($(e.target).siblings('.colvo').val());
	if(maxSC && curAm>=maxSC) return;
	$.ajax({
		url: '/fe/basket.php',
		type: 'GET',
		data: { act: 'changeAm', cat_id: cat_id, am: curAm+1 },
		success: function(r){
			if(!r.fres) emsg(r); else {
				$('#cart_asum').html(r['cart_asum']);
				$('#cart_discountNdSum').html(r['cart_discountNdSum']);
				$('#cart_sm_discountCurrent').html(r['cart_sm_discountCurrent']);
				$('#cart_sm_sum').html(r['cart_sm_sum']);
				$('#cart_economySum').html(r['cart_economySum']);
				$('#cart_itog').html(r['cart_itog']);
				$(e.target).siblings('.colvo').val(r.am);
				$(e.target).parent().parent('tr').find('.itemSum').html(r.itemSum);
			}
		}
	});
}

function cartDec(e){
	e.preventDefault();
	var cat_id=parseInt($(e.target).parent().parent('tr').attr('cat_id'));
	var maxSC=parseInt($(e.target).parent().parent('tr').attr('maxSC'));
	var curAm=parseInt($(e.target).siblings('.colvo').val());
	if(curAm<=1) return;
	$.ajax({
		url: '/fe/basket.php',
		type: 'GET',
		data: { act: 'changeAm', cat_id: cat_id, am: curAm-1 },
		success: function(r){
			if(!r.fres) emsg(r); else {
				$('#cart_asum').html(r['cart_asum']);
				$('#cart_discountNdSum').html(r['cart_discountNdSum']);
				$('#cart_sm_discountCurrent').html(r['cart_sm_discountCurrent']);
				$('#cart_sm_sum').html(r['cart_sm_sum']);
				$('#cart_economySum').html(r['cart_economySum']);
				$('#cart_itog').html(r['cart_itog']);
				$(e.target).siblings('.colvo').val(r.am);
				$(e.target).parent().parent('tr').find('.itemSum').html(r.itemSum);
			}
		}
	});
}

function explain(e){
	 hs.htmlExpand(this, { objectType: 'ajax', preserveContent: true} );
	 e.preventDefault();
}

function cmpDel(e){
	e.preventDefault();
	var cat_id=$(this).attr('cat_id');
	var v='cmp'+$(this).attr('gr')+'_'+cat_id;
	$('#popCmp input[cat_id='+cat_id+']').parent().remove();
	$('#leftCmp input[cat_id='+cat_id+']').parent().remove();
	$('.compare[cat_id='+cat_id+']').html('добавить к сравнению').css('background-image','url(/images/cmp.gif)');
	if(!$('#leftCmp input').length) {
		$('#leftCmp').hide('fast');
		hs.close();
	}
	delCookie(v);
//	note('Размер исключен из списка сравнения','cmp');
}

function compare(gr) 
{
	var string='/compare.php?gr='+gr+(typeof(sid)!='undefined'?("&"+sidName+"="+sid):'')+'&_='+Math.random()||'';
	window.open(string,"CMPWIN");
}

function note(text,lifeGr){
	var life=3000;
	var sticky=false;
	if(lifeGr=='cmp') life=3000;
	$.jGrowl(text,{sticky:sticky,life:life});
}

function show_ap_blk(gr)
{
	setCookie('_last_ap_hide',0);
	$('#ap_blk_'+gr).show('fast');
	$('#ap_blk0_'+gr).hide('fast');
}
function hide_ap_blk(gr)
{
	setCookie('_last_ap_hide',1);
	$('#ap_blk_'+gr).hide('fast');
	$('#ap_blk0_'+gr).show('fast');
}
function delAuto()
{
	delCookie('_last_ap');	
	$('#_ap').hide('slow');
}

function check_order()
{
	ret=true;
	s=document.forms['frm'].r_name.value;
	if(s.length<2) {
		window.alert('Не заполнено поле "Фамилия"/"Контактное лицо"');
		ret=false;
	}
	if (typeof(document.forms['frm'].r_name1)!='undefined'){
		s=document.forms['frm'].r_name1.value;
	if(s.length<2) {
		window.alert('Не заполнено поле "Имя"');
		ret=false;
	}
	}
	if (typeof(document.forms['frm'].r_city)!='undefined'){
		s=document.forms['frm'].r_city.value;
	if(s.length<4) {
		window.alert('Не заполнено поле "Город"');
		ret=false;
	}
	}
	s=document.forms['frm'].r_addr.value;
	if(s.length<10) {
		window.alert('Не заполнено поле "Адрес"');
		ret=false;
	}
	return(ret);
}

function check_que()
{
	ret=true;
	s=document.forms['cform'].name.value;
	if(s.length<2) {
		window.alert('Не заполнено поле "Ваше имя"');
		ret=false;
	}
	ret=true;
	s=document.forms['cform'].msg.value;
	if(s.length<10) {
		window.alert('Не заполнено поле "Текст сообщения"');
		ret=false;
	}
	return(ret);
}

function tsform()
{
	var empty=true;
	$('#ts_form select, #ts_form input[type=checkbox]').each(function(){
		if(this.value!='' && this.tagName!='INPUT') empty=false; 
		if(this.checked && this.tagName=='INPUT') empty=false;
	});
	if(!empty){
		$('#ts_form').get(0).submit();
	}else{
		alert('Необходимо еще один параметр для поиска');
		return false;
	}
	return false;
}

function dsform()
{
	var empty=true;
	$('#ds_form select').each(function(){
		if(this.value!='') empty=false; 
	});
	if(!empty){
		$('#ds_form').get(0).submit();
	}else{
		alert('Необходимо еще один параметр для поиска');
		return false;
	}
	return false;
}

function in_array(needle, haystack, strict) {	// Checks if a value exists in an array
	// 
	// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

	var found = false, key, strict = !!strict;

	for (key in haystack) {
		if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
			found = true;
			break;
		}
	}

	return found;
}


function emsg(d){
//	window.alert("ОШИБКА!\r\n\r\n"+strip_tags(d.err_msg));
	if(typeof _gaq !='undefined') _gaq.push(['_trackEvent', 'Errors', 'emsg', d.err_msg]);
	if(window.boxyInstance) window.boxyInstance.hideAndUnload();
	Boxy.alert('<p><b>Ошибка.</b></p><p>'+d.err_msg+'</p>');
}

function Err (XMLHttpRequest, textStatus, errorThrown){
	//window.alert('Ошибка при загрузке данных ('+textStatus+'). Попробуйте обновить страницу и повторить запрос');
	if(typeof _gaq !='undefined') _gaq.push(['_trackEvent', 'Errors', 'ax', textStatus]);
	if(window.boxyInstance) window.boxyInstance.hideAndUnload();
	Boxy.alert('Ошибка при загрузке данных ('+textStatus+': '+errorThrown+'). Попробуйте обновить страницу и повторить запрос. ');
}

function strip_tags( str ){	// Strip HTML and PHP tags from a string

	return str.replace(/<\/?[^>]+>/gi, '');
}


function clone(o) {
 if(!o || 'object' !== typeof o)  {
   return o;
 }
 var c = 'function' === typeof o.pop ? [] : {};
 var p, v;
 for(p in o) {
 if(o.hasOwnProperty(p)) {
  v = o[p];
  if(v && 'object' === typeof v) {
    c[p] = clone(v);
  }
  else {
    c[p] = v;
  }
 }
}
 return c;
}

function isArray (v){
	return typeof(v)=='object'&&typeof(v.length)=='number';
}
function isObject (v){
	return v && typeof v == "object";
}
function isFunction (v){
	return toString.apply(v) === '[object Function]';
}
function isNumber (v){
	return typeof v === 'number'; // && $$.isFinite(v)
}
function isString (v){
	return typeof v === 'string';
}
function isBoolean (v){
	return typeof v === 'boolean';
}
function isDefined (v){
	return typeof v !== 'undefined';
}
function isEmpty (v, allowBlank){
	return v === null || v === undefined || ((isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
}
function isPrimitive (v){
	return isString(v) || isNumber(v) || isBoolean(v);
}

			   
function setCookie (cookieName, cookieContent)
{
 var expDate=new Date();
 expDate.setTime(expDate.getTime()+8640000000000);
 var expires=expDate.toGMTString();
 document.cookie=cookieName+"="+escape(cookieContent)+"; path="+escape('/')+"; expires="+expires;
}
function getCookie (name){ 
	var cname = name + "=";               
	var dc = document.cookie;             
	if (dc.length > 0) { 
		begin = dc.indexOf(cname);       
		if (begin != -1) { 
			begin += cname.length;
			end = dc.indexOf(";", begin);
			if (end == -1) end = dc.length;
			return unescape(dc.substring(begin, end));
		} 
	}
	return null;
}
function delCookie (cookieName)
{
 var expDate=new Date();
 expDate.setTime(expDate.getTime()-1000);
 var expires=expDate.toGMTString();
 document.cookie=cookieName+"=; path="+escape('/')+"; expires="+expires;
}

function count (obj) {
    var i = 0;
    for(var c in obj) {
        i++;
    }
    return i;
}



function SortTable(myTable, nCol, nRow, mode)
{//перебираю строки таблицы, начиная с nRow
for(k=nRow; k<myTable.rows.length; k++)
  {//перебираю строки таблицы начиная с k-той строки
   for(i=k; i<myTable.rows.length; i++)
    {//сравниваю i-тую строку с k-той по значению текста ячейки nCol 
	 s1=myTable.rows[i].cells[nCol].innerHTML;
	 s1=s1.replace(/<\/?[^>]+>/gi, '');
	 s2=myTable.rows[k].cells[nCol].innerHTML;
	 s2=s2.replace(/<\/?[^>]+>/gi, '');
	 if(mode=='number'){
		 s1=s1.split(" ");
		 s1=Number(s1[0]);
		 s2=s2.split(" ");
		 s2=Number(s2[0]);
	 }
     if(s1<s2)
      {//если значение i-той < k-той - вставляю новую строку в позицию k 
       newrow=myTable.insertRow(k);
       //(таблица раздвинулась, i-тая строка першла в позицию i+1)
       for(j=0; j<myTable.rows[i+1].cells.length; j++)
        {//заполняю значения ячеек вновь созданной строки значениями ячеек из строки i+1
         newcell=newrow.insertCell(j);
         newcell.innerHTML=myTable.rows[i+1].cells[j].innerHTML;
		 newcell.align=myTable.rows[i+1].cells[j].align;
		 newcell.id=myTable.rows[i+1].cells[j].id;
        }
       //удаляю строку i+1
       myTable.deleteRow(i+1);
      }
    }
  }
}

function AC_AddExtension(src, ext)
{
  if (src.indexOf('?') != -1)
    return src.replace(/\?/, ext+'?'); 
  else
    return src + ext;
}

function AC_Generateobj(objAttrs, params, embedAttrs) 
{ 
  var str = '<object ';
  for (var i in objAttrs)
    str += i + '="' + objAttrs[i] + '" ';
  str += '>';
  for (var i in params)
    str += '<param name="' + i + '" value="' + params[i] + '" /> ';
  str += '<embed ';
  for (var i in embedAttrs)
    str += i + '="' + embedAttrs[i] + '" ';
  str += ' ></embed></object>';

  document.write(str);
}

function AC_FL_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
     , "application/x-shockwave-flash"
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_SW_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".dcr", "src", "clsid:166B1BCA-3F9C-11CF-8075-444553540000"
     , null
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_GetArgs(args, ext, srcParamName, classid, mimeType){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();    

    switch (currArg){	
      case "classid":
        break;
      case "pluginspage":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "src":
      case "movie":	
        args[i+1] = AC_AddExtension(args[i+1], ext);
        ret.embedAttrs["src"] = args[i+1];
        ret.params[srcParamName] = args[i+1];
        break;
      case "onafterupdate":
      case "onbeforeupdate":
      case "onblur":
      case "oncellchange":
      case "onclick":
      case "ondblClick":
      case "ondrag":
      case "ondragend":
      case "ondragenter":
      case "ondragleave":
      case "ondragover":
      case "ondrop":
      case "onfinish":
      case "onfocus":
      case "onhelp":
      case "onmousedown":
      case "onmouseup":
      case "onmouseover":
      case "onmousemove":
      case "onmouseout":
      case "onkeypress":
      case "onkeydown":
      case "onkeyup":
      case "onload":
      case "onlosecapture":
      case "onpropertychange":
      case "onreadystatechange":
      case "onrowsdelete":
      case "onrowenter":
      case "onrowexit":
      case "onrowsinserted":
      case "onstart":
      case "onscroll":
      case "onbeforeeditfocus":
      case "onactivate":
      case "onbeforedeactivate":
      case "ondeactivate":
      case "type":
      case "codebase":
        ret.objAttrs[args[i]] = args[i+1];
        break;
      case "width":
      case "height":
      case "align":
      case "vspace": 
      case "hspace":
      case "class":
      case "title":
      case "accesskey":
      case "name":
      case "id":
      case "tabindex":
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }
  }
  ret.objAttrs["classid"] = classid;
  if (mimeType) ret.embedAttrs["type"] = mimeType;
  return ret;
}


function serialize (mixed_value) {
    // Returns a string representation of variable (which can later be unserialized)  
    // 
    // version: 1009.820
    // discuss at: http://phpjs.org/functions/serialize    // +   original by: Arpad Ray (mailto:arpad@php.net)
    // +   improved by: Dino
    // +   bugfixed by: Andrej Pavlovic
    // +   bugfixed by: Garagoth
    // +      input by: DtTvB (http://dt.in.th/2008-09-16.string-length-in-bytes.html)    // +   bugfixed by: Russell Walker (http://www.nbill.co.uk/)
    // +   bugfixed by: Jamie Beck (http://www.terabit.ca/)
    // +      input by: Martin (http://www.erlenwiese.de/)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net/)
    // +   improved by: Le Torbi (http://www.letorbi.de/)    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net/)
    // -    depends on: utf8_encode
    // %          note: We feel the main purpose of this function should be to ease the transport of data between php & js
    // %          note: Aiming for PHP-compatibility, we have to translate objects to arrays
    // *     example 1: serialize(['Kevin', 'van', 'Zonneveld']);    // *     returns 1: 'a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}'
    // *     example 2: serialize({firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'});
    // *     returns 2: 'a:3:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";}'
        var _utf8Size = function (str) {
            var size = 0, i = 0, l = str.length, code = '';            for (i = 0; i < l; i++) {
                code = str[i].charCodeAt(0);
                if (code < 0x0080) {
                    size += 1;
                } else if (code < 0x0800) {                    size += 2;
                } else {
                        size += 3;
                        }
            }            return size;
        };
    var _getType = function (inp) {
        var type = typeof inp, match;
        var key; 
        if (type === 'object' && !inp) {
            return 'null';
        }
        if (type === "object") {            if (!inp.constructor) {
                return 'object';
            }
            var cons = inp.constructor.toString();
            match = cons.match(/(\w+)\(/);            if (match) {
                cons = match[1].toLowerCase();
            }
            var types = ["boolean", "number", "string", "array"];
            for (key in types) {                if (cons == types[key]) {
                    type = types[key];
                    break;
                }
            }        }
        return type;
    };
    var type = _getType(mixed_value);
    var val, ktype = '';    
    switch (type) {
        case "function": 
            val = ""; 
            break;        case "boolean":
            val = "b:" + (mixed_value ? "1" : "0");
            break;
        case "number":
            val = (Math.round(mixed_value) == mixed_value ? "i" : "d") + ":" + mixed_value;            break;
        case "string":
                        val = "s:" + _utf8Size(mixed_value) + ":\"" + mixed_value + "\"";
            break;
        case "array":        case "object":
            val = "a";
            /*
            if (type == "object") {
                var objname = mixed_value.constructor.toString().match(/(\w+)\(\)/);                if (objname == undefined) {
                    return;
                }
                objname[1] = this.serialize(objname[1]);
                val = "O" + objname[1].substring(1, objname[1].length - 1);            }
            */
            var count = 0;
            var vals = "";
            var okey;            var key;
            for (key in mixed_value) {
                            if (mixed_value.hasOwnProperty(key)) {
                   ktype = _getType(mixed_value[key]);
                       if (ktype === "function") {                            continue; 
                       }
               
                       okey = (key.match(/^[0-9]+$/) ? parseInt(key, 10) : key);
                       vals += this.serialize(okey) +                               this.serialize(mixed_value[key]);
                       count++;
                        }
            }
            val += ":" + count + ":{" + vals + "}";            break;
        case "undefined": // Fall-through
        default: // if the JS object has a property which contains a null value, the string cannot be unserialized by PHP
            val = "N";
            break;    }
    if (type !== "object" && type !== "array") {
        val += ";";
    }
    return val;
}

function unserialize (data) {
    // Takes a string representation of variable and recreates it  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/unserialize    // +     original by: Arpad Ray (mailto:arpad@php.net)
    // +     improved by: Pedro Tainha (http://www.pedrotainha.com)
    // +     bugfixed by: dptr1988
    // +      revised by: d3x
    // +     improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)    // +        input by: Brett Zamir (http://brett-zamir.me)
    // +     improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     improved by: Chris
    // +     improved by: James
    // +        input by: Martin (http://www.erlenwiese.de/)    // +     bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     improved by: Le Torbi
    // +     input by: kilops
    // +     bugfixed by: Brett Zamir (http://brett-zamir.me)
    // -      depends on: utf8_decode    // %            note: We feel the main purpose of this function should be to ease the transport of data between php & js
    // %            note: Aiming for PHP-compatibility, we have to translate objects to arrays
    // *       example 1: unserialize('a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}');
    // *       returns 1: ['Kevin', 'van', 'Zonneveld']
    // *       example 2: unserialize('a:3:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";}');    // *       returns 2: {firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'}
    var that = this;
    var utf8Overhead = function(chr) {
        // http://phpjs.org/functions/unserialize:571#comment_95906
        var code = chr.charCodeAt(0);        if (code < 0x0080) {
            return 0;
        }
        if (code < 0x0800) {
             return 1;        }
        return 2;
    };
 
     var error = function (type, msg, filename, line){throw new that.window[type](msg, filename, line);};
    var read_until = function (data, offset, stopchr){
        var buf = [];
        var chr = data.slice(offset, offset + 1);
        var i = 2;        while (chr != stopchr) {
            if ((i+offset) > data.length) {
                error('Error', 'Invalid');
            }
            buf.push(chr);            chr = data.slice(offset + (i - 1),offset + i);
            i += 1;
        }
        return [buf.length, buf.join('')];
    };    var read_chrs = function (data, offset, length){
        var buf;
 
        buf = [];
        for (var i = 0;i < length;i++){            var chr = data.slice(offset + (i - 1),offset + i);
            buf.push(chr);
            length -= utf8Overhead(chr); 
        }
        return [buf.length, buf.join('')];    };
    var _unserialize = function (data, offset){
        var readdata;
        var readData;
        var chrs = 0;        var ccount;
        var stringlength;
        var keyandchrs;
        var keys;
         if (!offset) {offset = 0;}
        var dtype = (data.slice(offset, offset + 1)).toLowerCase();
 
        var dataoffset = offset + 2;
        var typeconvert = function(x) {return x;}; 
        switch (dtype){
            case 'i':
                typeconvert = function (x) {return parseInt(x, 10);};
                readData = read_until(data, dataoffset, ';');                chrs = readData[0];
                readdata = readData[1];
                dataoffset += chrs + 1;
            break;
            case 'b':                typeconvert = function (x) {return parseInt(x, 10) !== 0;};
                readData = read_until(data, dataoffset, ';');
                chrs = readData[0];
                readdata = readData[1];
                dataoffset += chrs + 1;            break;
            case 'd':
                typeconvert = function (x) {return parseFloat(x);};
                readData = read_until(data, dataoffset, ';');
                chrs = readData[0];                readdata = readData[1];
                dataoffset += chrs + 1;
            break;
            case 'n':
                readdata = null;            break;
            case 's':
                ccount = read_until(data, dataoffset, ':');
                chrs = ccount[0];
                stringlength = ccount[1];                dataoffset += chrs + 2;
 
                readData = read_chrs(data, dataoffset+1, parseInt(stringlength, 10));
                chrs = readData[0];
                readdata = readData[1];                dataoffset += chrs + 2;
                if (chrs != parseInt(stringlength, 10) && chrs != readdata.length){
                    error('SyntaxError', 'String length mismatch');
                }
                 // Length was calculated on an utf-8 encoded string
                // so wait with decoding
                readdata = that.utf8_decode(readdata);
            break;
            case 'a':                readdata = {};
 
                keyandchrs = read_until(data, dataoffset, ':');
                chrs = keyandchrs[0];
                keys = keyandchrs[1];                dataoffset += chrs + 2;
 
                for (var i = 0; i < parseInt(keys, 10); i++){
                    var kprops = _unserialize(data, dataoffset);
                    var kchrs = kprops[1];                    var key = kprops[2];
                    dataoffset += kchrs;
 
                    var vprops = _unserialize(data, dataoffset);
                    var vchrs = vprops[1];                    var value = vprops[2];
                    dataoffset += vchrs;
 
                    readdata[key] = value;
                } 
                dataoffset += 1;
            break;
            default:
                error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype);            break;
        }
        return [dtype, dataoffset - offset, typeconvert(readdata)];
    };
        return _unserialize((data+''), 0)[2];
}

function utf8_decode ( str_data ) {
    // Converts a UTF-8 encoded string to ISO-8859-1  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/utf8_decode    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +      input by: Aman Gupta
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Norman "zEh" Fuchs
    // +   bugfixed by: hitwork    // +   bugfixed by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: utf8_decode('Kevin van Zonneveld');
    // *     returns 1: 'Kevin van Zonneveld'    var tmp_arr = [], i = 0, ac = 0, c1 = 0, c2 = 0, c3 = 0;
    
    str_data += '';
    var i=0;
	var tmp_arr=[];
	ac=0;
    while ( i < str_data.length ) {        c1 = str_data.charCodeAt(i);
        if (c1 < 128) {
            tmp_arr[ac++] = String.fromCharCode(c1);
            i++;
        } else if ((c1 > 191) && (c1 < 224)) {            c2 = str_data.charCodeAt(i+1);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = str_data.charCodeAt(i+1);            c3 = str_data.charCodeAt(i+2);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    } 
    return tmp_arr.join('');
}

function implode (glue, pieces) {
    // Joins array elements placing glue string between items and return one string  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/implode    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Waldo Malqui Silva
    // +   improved by: Itsacon (http://www.itsacon.net/)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: implode(' ', ['Kevin', 'van', 'Zonneveld']);    // *     returns 1: 'Kevin van Zonneveld'
    // *     example 2: implode(' ', {first:'Kevin', last: 'van Zonneveld'});
    // *     returns 2: 'Kevin van Zonneveld'
    var i = '', retVal='', tGlue='';
    if (arguments.length === 1) {        pieces = glue;
        glue = '';
    }
    if (typeof(pieces) === 'object') {
        if (pieces instanceof Array) {            return pieces.join(glue);
        }
        else {
            for (i in pieces) {
                retVal += tGlue + pieces[i];                tGlue = glue;
            }
            return retVal;
        }
    }    else {
        return pieces;
    }
}

function explode (delimiter, string, limit) {
    // Splits a string on string separator and return array of components. If limit is positive only limit number of components is returned. If limit is negative all components except the last abs(limit) are returned.  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/explode    // +     original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     improved by: kenneth
    // +     improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     improved by: d3x
    // +     bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)    // *     example 1: explode(' ', 'Kevin van Zonneveld');
    // *     returns 1: {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}
    // *     example 2: explode('=', 'a=bc=d', 2);
    // *     returns 2: ['a', 'bc=d']
     var emptyArray = { 0: '' };
    
    // third argument is not required
    if ( arguments.length < 2 ||
        typeof arguments[0] == 'undefined' ||        typeof arguments[1] == 'undefined' ) {
        return null;
    }
 
    if ( delimiter === '' ||        delimiter === false ||
        delimiter === null ) {
        return false;
    }
     if ( typeof delimiter == 'function' ||
        typeof delimiter == 'object' ||
        typeof string == 'function' ||
        typeof string == 'object' ) {
        return emptyArray;    }
 
    if ( delimiter === true ) {
        delimiter = '1';
    }    
    if (!limit) {
        return string.toString().split(delimiter.toString());
    } else {
        // support for limit argument        var splitted = string.toString().split(delimiter.toString());
        var partA = splitted.splice(0, limit - 1);
        var partB = splitted.join(delimiter.toString());
        partA.push(partB);
        return partA;    }
}

// jGrowl
(function($) {

	/** jGrowl Wrapper - Establish a base jGrowl Container for compatibility with older releases. **/
	$.jGrowl = function( m , o ) {
		// To maintain compatibility with older version that only supported one instance we'll create the base container.
		if ( $('#jGrowl').size() == 0 ) 
			$('<div id="jGrowl"></div>').addClass($.jGrowl.defaults.position).appendTo('body');

		// Create a notification on the container.
		$('#jGrowl').jGrowl(m,o);
	};


	/** Raise jGrowl Notification on a jGrowl Container **/
	$.fn.jGrowl = function( m , o ) {
		if ( $.isFunction(this.each) ) {
			var args = arguments;

			return this.each(function() {
				var self = this;

				/** Create a jGrowl Instance on the Container if it does not exist **/
				if ( $(this).data('jGrowl.instance') == undefined ) {
					$(this).data('jGrowl.instance', $.extend( new $.fn.jGrowl(), { notifications: [], element: null, interval: null } ));
					$(this).data('jGrowl.instance').startup( this );
				}

				/** Optionally call jGrowl instance methods, or just raise a normal notification **/
				if ( $.isFunction($(this).data('jGrowl.instance')[m]) ) {
					$(this).data('jGrowl.instance')[m].apply( $(this).data('jGrowl.instance') , $.makeArray(args).slice(1) );
				} else {
					$(this).data('jGrowl.instance').create( m , o );
				}
			});
		};
	};

	$.extend( $.fn.jGrowl.prototype , {

		/** Default JGrowl Settings **/
		defaults: {
			pool: 			0,
			header: 		'&nbsp;',
			group: 			'',
			sticky: 		false,
			position: 		'bottom-right', // Is this still needed?
			glue: 			'after',
			theme: 			'default',
			corners: 		'10px',
			check: 			250,
			life: 			3000,
			speed: 			'normal',
			easing: 		'swing',
			closer: 		true,
			closeTemplate: '&times;',
			closerTemplate: '<div>[ скрыть все ]</div>',
			log: 			function(e,m,o) {},
			beforeOpen: 	function(e,m,o) {},
			open: 			function(e,m,o) {},
			beforeClose: 	function(e,m,o) {},
			close: 			function(e,m,o) {},
			animateOpen: 	{
				opacity: 	'show'
			},
			animateClose: 	{
				opacity: 	'hide'
			}
		},
		
		notifications: [],
		
		/** jGrowl Container Node **/
		element: 	null,
	
		/** Interval Function **/
		interval:   null,
		
		/** Create a Notification **/
		create: 	function( message , o ) {
			var o = $.extend({}, this.defaults, o);

			this.notifications.push({ message: message , options: o });
			
			o.log.apply( this.element , [this.element,message,o] );
		},
		
		render: 		function( notification ) {
			var self = this;
			var message = notification.message;
			var o = notification.options;

			var notification = $(
				'<div class="jGrowl-notification ui-state-highlight ui-corner-all' + 
				((o.group != undefined && o.group != '') ? ' ' + o.group : '') + '">' +
				'<div class="close">' + o.closeTemplate + '</div>' +
				'<div class="header">' + o.header + '</div>' +
				'<div class="message">' + message + '</div></div>'
			).data("jGrowl", o).addClass(o.theme).children('div.close').bind("click.jGrowl", function() {
				$(this).parent().trigger('jGrowl.close');
			}).parent();


			/** Notification Actions **/
			$(notification).bind("mouseover.jGrowl", function() {
				$('div.jGrowl-notification', self.element).data("jGrowl.pause", true);
			}).bind("mouseout.jGrowl", function() {
				$('div.jGrowl-notification', self.element).data("jGrowl.pause", false);
			}).bind('jGrowl.beforeOpen', function() {
				if ( o.beforeOpen.apply( notification , [notification,message,o,self.element] ) != false ) {
					$(this).trigger('jGrowl.open');
				}
			}).bind('jGrowl.open', function() {
				if ( o.open.apply( notification , [notification,message,o,self.element] ) != false ) {
					if ( o.glue == 'after' ) {
						$('div.jGrowl-notification:last', self.element).after(notification);
					} else {
						$('div.jGrowl-notification:first', self.element).before(notification);
					}
					
					$(this).animate(o.animateOpen, o.speed, o.easing, function() {
						// Fixes some anti-aliasing issues with IE filters.
						if ($.browser.msie && (parseInt($(this).css('opacity'), 10) === 1 || parseInt($(this).css('opacity'), 10) === 0))
							this.style.removeAttribute('filter');

						$(this).data("jGrowl").created = new Date();
					});
				}
			}).bind('jGrowl.beforeClose', function() {
				if ( o.beforeClose.apply( notification , [notification,message,o,self.element] ) != false )
					$(this).trigger('jGrowl.close');
			}).bind('jGrowl.close', function() {
				// Pause the notification, lest during the course of animation another close event gets called.
				$(this).data('jGrowl.pause', true);
				$(this).animate(o.animateClose, o.speed, o.easing, function() {
					$(this).remove();
					var close = o.close.apply( notification , [notification,message,o,self.element] );

					if ( $.isFunction(close) )
						close.apply( notification , [notification,message,o,self.element] );
				});
			}).trigger('jGrowl.beforeOpen');
		
			/** Optional Corners Plugin **/
			if ( $.fn.corner != undefined ) $(notification).corner( o.corners );

			/** Add a Global Closer if more than one notification exists **/
			if ( $('div.jGrowl-notification:parent', self.element).size() > 1 && 
				 $('div.jGrowl-closer', self.element).size() == 0 && this.defaults.closer != false ) {
				$(this.defaults.closerTemplate).addClass('jGrowl-closer ui-state-highlight ui-corner-all').addClass(this.defaults.theme)
					.appendTo(self.element).animate(this.defaults.animateOpen, this.defaults.speed, this.defaults.easing)
					.bind("click.jGrowl", function() {
						$(this).siblings().children('div.close').trigger("click.jGrowl");

						if ( $.isFunction( self.defaults.closer ) ) {
							self.defaults.closer.apply( $(this).parent()[0] , [$(this).parent()[0]] );
						}
					});
			};
		},

		/** Update the jGrowl Container, removing old jGrowl notifications **/
		update:	 function() {
			$(this.element).find('div.jGrowl-notification:parent').each( function() {
				if ( $(this).data("jGrowl") != undefined && $(this).data("jGrowl").created != undefined && 
					 ($(this).data("jGrowl").created.getTime() + $(this).data("jGrowl").life)  < (new Date()).getTime() && 
					 $(this).data("jGrowl").sticky != true && 
					 ($(this).data("jGrowl.pause") == undefined || $(this).data("jGrowl.pause") != true) ) {

					// Pause the notification, lest during the course of animation another close event gets called.
					$(this).trigger('jGrowl.beforeClose');
				}
			});

			if ( this.notifications.length > 0 && 
				 (this.defaults.pool == 0 || $(this.element).find('div.jGrowl-notification:parent').size() < this.defaults.pool) )
				this.render( this.notifications.shift() );

			if ( $(this.element).find('div.jGrowl-notification:parent').size() < 2 ) {
				$(this.element).find('div.jGrowl-closer').animate(this.defaults.animateClose, this.defaults.speed, this.defaults.easing, function() {
					$(this).remove();
				});
			}
		},

		/** Setup the jGrowl Notification Container **/
		startup:	function(e) {
			this.element = $(e).addClass('jGrowl').append('<div class="jGrowl-notification"></div>');
			this.interval = setInterval( function() { 
				$(e).data('jGrowl.instance').update(); 
			}, this.defaults.check);
			
			if ($.browser.msie && parseInt($.browser.version) < 7 && !window["XMLHttpRequest"]) {
				$(this.element).addClass('ie6');
			}
		},

		/** Shutdown jGrowl, removing it and clearing the interval **/
		shutdown:   function() {
			$(this.element).removeClass('jGrowl').find('div.jGrowl-notification').remove();
			clearInterval( this.interval );
		},
		
		close: 	function() {
			$(this.element).find('div.jGrowl-notification').each(function(){
				$(this).trigger('jGrowl.beforeClose');
			});
		}
	});
	
	/** Reference the Defaults Object for compatibility with older versions of jGrowl **/
	$.jGrowl.defaults = $.fn.jGrowl.prototype.defaults;

})(jQuery);// end jGrowl


/* -------------bgiframe--------------*/
(function($){

/**
 * The bgiframe is chainable and applies the iframe hack to get 
 * around zIndex issues in IE6. It will only apply itself in IE 
 * and adds a class to the iframe called 'bgiframe'. The iframe
 * is appeneded as the first child of the matched element(s) 
 * with a tabIndex and zIndex of -1.
 * 
 * By default the plugin will take borders, sized with pixel units,
 * into account. If a different unit is used for the border's width,
 * then you will need to use the top and left settings as explained below.
 *
 * NOTICE: This plugin has been reported to cause perfromance problems
 * when used on elements that change properties (like width, height and
 * opacity) a lot in IE6. Most of these problems have been caused by 
 * the expressions used to calculate the elements width, height and 
 * borders. Some have reported it is due to the opacity filter. All 
 * these settings can be changed if needed as explained below.
 *
 * @example $('div').bgiframe();
 * @before <div><p>Paragraph</p></div>
 * @result <div><iframe class="bgiframe".../><p>Paragraph</p></div>
 *
 * @param Map settings Optional settings to configure the iframe.
 * @option String|Number top The iframe must be offset to the top
 * 		by the width of the top border. This should be a negative 
 *      number representing the border-top-width. If a number is 
 * 		is used here, pixels will be assumed. Otherwise, be sure
 *		to specify a unit. An expression could also be used. 
 * 		By default the value is "auto" which will use an expression 
 * 		to get the border-top-width if it is in pixels.
 * @option String|Number left The iframe must be offset to the left
 * 		by the width of the left border. This should be a negative 
 *      number representing the border-left-width. If a number is 
 * 		is used here, pixels will be assumed. Otherwise, be sure
 *		to specify a unit. An expression could also be used. 
 * 		By default the value is "auto" which will use an expression 
 * 		to get the border-left-width if it is in pixels.
 * @option String|Number width This is the width of the iframe. If
 *		a number is used here, pixels will be assume. Otherwise, be sure
 * 		to specify a unit. An experssion could also be used.
 *		By default the value is "auto" which will use an experssion
 * 		to get the offsetWidth.
 * @option String|Number height This is the height of the iframe. If
 *		a number is used here, pixels will be assume. Otherwise, be sure
 * 		to specify a unit. An experssion could also be used.
 *		By default the value is "auto" which will use an experssion
 * 		to get the offsetHeight.
 * @option Boolean opacity This is a boolean representing whether or not
 * 		to use opacity. If set to true, the opacity of 0 is applied. If
 *		set to false, the opacity filter is not applied. Default: true.
 * @option String src This setting is provided so that one could change 
 *		the src of the iframe to whatever they need.
 *		Default: "javascript:false;"
 *
 * @name bgiframe
 * @type jQuery
 * @cat Plugins/bgiframe
 * @author Brandon Aaron (brandon.aaron@gmail.com || http://brandonaaron.net)
 */
$.fn.bgIframe = $.fn.bgiframe = function(s) {
	// This is only for IE6
	if ( $.browser.msie && parseInt($.browser.version) <= 6 ) {
		s = $.extend({
			top     : 'auto', // auto == .currentStyle.borderTopWidth
			left    : 'auto', // auto == .currentStyle.borderLeftWidth
			width   : 'auto', // auto == offsetWidth
			height  : 'auto', // auto == offsetHeight
			opacity : true,
			src     : 'javascript:false;'
		}, s || {});
		var prop = function(n){return n&&n.constructor==Number?n+'px':n;},
		    html = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+
		               'style="display:block;position:absolute;z-index:-1;'+
			               (s.opacity !== false?'filter:Alpha(Opacity=\'0\');':'')+
					       'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';'+
					       'left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';'+
					       'width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':prop(s.width))+';'+
					       'height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':prop(s.height))+';'+
					'"/>';
		return this.each(function() {
			if ( $('> iframe.bgiframe', this).length == 0 )
				this.insertBefore( document.createElement(html), this.firstChild );
		});
	}
	return this;
};

// Add browser.version if it doesn't exist
if (!$.browser.version)
	$.browser.version = navigator.userAgent.toLowerCase().match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)[1];

})(jQuery);

/*-------------------dimension ---------------------*/
(function($){

// store a copy of the core height and width methods
var height = $.fn.height,
    width  = $.fn.width;

$.fn.extend({
	/**
	 * If used on document, returns the document's height (innerHeight)
	 * If used on window, returns the viewport's (window) height
	 * See core docs on height() to see what happens when used on an element.
	 *
	 * @example $("#testdiv").height()
	 * @result 200
	 *
	 * @example $(document).height()
	 * @result 800
	 *
	 * @example $(window).height()
	 * @result 400
	 *
	 * @name height
	 * @type Object
	 * @cat Plugins/Dimensions
	 */
	height: function() {
		if ( this[0] == window )
			return self.innerHeight ||
				$.boxModel && document.documentElement.clientHeight || 
				document.body.clientHeight;
		
		if ( this[0] == document )
			return Math.max( document.body.scrollHeight, document.body.offsetHeight );
		
		return height.apply(this, arguments);
	},
	
	/**
	 * If used on document, returns the document's width (innerWidth)
	 * If used on window, returns the viewport's (window) width
	 * See core docs on height() to see what happens when used on an element.
	 *
	 * @example $("#testdiv").width()
	 * @result 200
	 *
	 * @example $(document).width()
	 * @result 800
	 *
	 * @example $(window).width()
	 * @result 400
	 *
	 * @name width
	 * @type Object
	 * @cat Plugins/Dimensions
	 */
	width: function() {
		if ( this[0] == window )
			return self.innerWidth ||
				$.boxModel && document.documentElement.clientWidth ||
				document.body.clientWidth;

		if ( this[0] == document )
			return Math.max( document.body.scrollWidth, document.body.offsetWidth );

		return width.apply(this, arguments);
	},
	
	/**
	 * Returns the inner height value (without border) for the first matched element.
	 * If used on document, returns the document's height (innerHeight)
	 * If used on window, returns the viewport's (window) height
	 *
	 * @example $("#testdiv").innerHeight()
	 * @result 800
	 *
	 * @name innerHeight
	 * @type Number
	 * @cat Plugins/Dimensions
	 */
	innerHeight: function() {
		return this[0] == window || this[0] == document ?
			this.height() :
			this.is(':visible') ?
				this[0].offsetHeight - num(this, 'borderTopWidth') - num(this, 'borderBottomWidth') :
				this.height() + num(this, 'paddingTop') + num(this, 'paddingBottom');
	},
	
	/**
	 * Returns the inner width value (without border) for the first matched element.
	 * If used on document, returns the document's Width (innerWidth)
	 * If used on window, returns the viewport's (window) width
	 *
	 * @example $("#testdiv").innerWidth()
	 * @result 1000
	 *
	 * @name innerWidth
	 * @type Number
	 * @cat Plugins/Dimensions
	 */
	innerWidth: function() {
		return this[0] == window || this[0] == document ?
			this.width() :
			this.is(':visible') ?
				this[0].offsetWidth - num(this, 'borderLeftWidth') - num(this, 'borderRightWidth') :
				this.width() + num(this, 'paddingLeft') + num(this, 'paddingRight');
	},
	
	/**
	 * Returns the outer height value (including border) for the first matched element.
	 * Cannot be used on document or window.
	 *
	 * @example $("#testdiv").outerHeight()
	 * @result 1000
	 *
	 * @name outerHeight
	 * @type Number
	 * @cat Plugins/Dimensions
	 */
	outerHeight: function() {
		return this[0] == window || this[0] == document ?
			this.height() :
			this.is(':visible') ?
				this[0].offsetHeight :
				this.height() + num(this,'borderTopWidth') + num(this, 'borderBottomWidth') + num(this, 'paddingTop') + num(this, 'paddingBottom');
	},
	
	/**
	 * Returns the outer width value (including border) for the first matched element.
	 * Cannot be used on document or window.
	 *
	 * @example $("#testdiv").outerHeight()
	 * @result 1000
	 *
	 * @name outerHeight
	 * @type Number
	 * @cat Plugins/Dimensions
	 */
	outerWidth: function() {
		return this[0] == window || this[0] == document ?
			this.width() :
			this.is(':visible') ?
				this[0].offsetWidth :
				this.width() + num(this, 'borderLeftWidth') + num(this, 'borderRightWidth') + num(this, 'paddingLeft') + num(this, 'paddingRight');
	},
	
	/**

	 * Returns how many pixels the user has scrolled to the right (scrollLeft).
	 * Works on containers with overflow: auto and window/document.
	 *
	 * @example $("#testdiv").scrollLeft()
	 * @result 100
	 *
	 * @name scrollLeft
	 * @type Number
	 * @cat Plugins/Dimensions
	 */
	/**
	 * Sets the scrollLeft property and continues the chain.
	 * Works on containers with overflow: auto and window/document.
	 *
	 * @example $("#testdiv").scrollLeft(10).scrollLeft()
	 * @result 10
	 *
	 * @name scrollLeft
	 * @param Number value A positive number representing the desired scrollLeft.
	 * @type jQuery
	 * @cat Plugins/Dimensions
	 */
	scrollLeft: function(val) {
		if ( val != undefined )
			// set the scroll left
			return this.each(function() {
				if (this == window || this == document)
					window.scrollTo( val, $(window).scrollTop() );
				else
					this.scrollLeft = val;
			});
		
		// return the scroll left offest in pixels
		if ( this[0] == window || this[0] == document )
			return self.pageXOffset ||
				$.boxModel && document.documentElement.scrollLeft ||
				document.body.scrollLeft;
				
		return this[0].scrollLeft;
	},
	
	/**
	 * Returns how many pixels the user has scrolled to the bottom (scrollTop).
	 * Works on containers with overflow: auto and window/document.
	 *
	 * @example $("#testdiv").scrollTop()
	 * @result 100
	 *
	 * @name scrollTop
	 * @type Number
	 * @cat Plugins/Dimensions
	 */
	/**
	 * Sets the scrollTop property and continues the chain.
	 * Works on containers with overflow: auto and window/document.
	 *
	 * @example $("#testdiv").scrollTop(10).scrollTop()
	 * @result 10
	 *
	 * @name scrollTop
	 * @param Number value A positive number representing the desired scrollTop.
	 * @type jQuery
	 * @cat Plugins/Dimensions
	 */
	scrollTop: function(val) {
		if ( val != undefined )
			// set the scroll top
			return this.each(function() {
				if (this == window || this == document)
					window.scrollTo( $(window).scrollLeft(), val );
				else
					this.scrollTop = val;
			});
		
		// return the scroll top offset in pixels
		if ( this[0] == window || this[0] == document )
			return self.pageYOffset ||
				$.boxModel && document.documentElement.scrollTop ||
				document.body.scrollTop;

		return this[0].scrollTop;
	},
	
	/** 
	 * Returns the top and left positioned offset in pixels.
	 * The positioned offset is the offset between a positioned
	 * parent and the element itself.
	 *
	 * @example $("#testdiv").position()
	 * @result { top: 100, left: 100 }
	 * 
	 * @name position
	 * @param Map options Optional settings to configure the way the offset is calculated.
	 * @option Boolean margin Should the margin of the element be included in the calculations? False by default.
	 * @option Boolean border Should the border of the element be included in the calculations? False by default.
	 * @option Boolean padding Should the padding of the element be included in the calculations? False by default.
	 * @param Object returnObject An object to store the return value in, so as not to break the chain. If passed in the
	 *                            chain will not be broken and the result will be assigned to this object.
	 * @type Object
	 * @cat Plugins/Dimensions
	 */
	position: function(options, returnObject) {
		var elem = this[0], parent = elem.parentNode, op = elem.offsetParent,
		    options = $.extend({ margin: false, border: false, padding: false, scroll: false }, options || {}),
			x = elem.offsetLeft,
			y = elem.offsetTop, 
			sl = elem.scrollLeft, 
			st = elem.scrollTop;
			
		// Mozilla and IE do not add the border
		if ($.browser.mozilla || $.browser.msie) {
			// add borders to offset
			x += num(elem, 'borderLeftWidth');
			y += num(elem, 'borderTopWidth');
		}

		if ($.browser.mozilla) {
			do {
				// Mozilla does not add the border for a parent that has overflow set to anything but visible
				if ($.browser.mozilla && parent != elem && $.css(parent, 'overflow') != 'visible') {
					x += num(parent, 'borderLeftWidth');
					y += num(parent, 'borderTopWidth');
				}

				if (parent == op) break; // break if we are already at the offestParent
			} while ((parent = parent.parentNode) && (parent.tagName.toLowerCase() != 'body' || parent.tagName.toLowerCase() != 'html'));
		}
		
		var returnValue = handleOffsetReturn(elem, options, x, y, sl, st);
		
		if (returnObject) { $.extend(returnObject, returnValue); return this; }
		else              { return returnValue; }
	},
	
	/**
	 * Returns the location of the element in pixels from the top left corner of the viewport.
	 *
	 * For accurate readings make sure to use pixel values for margins, borders and padding.
	 * 
	 * Known issues:
	 *  - Issue: A div positioned relative or static without any content before it and its parent will report an offsetTop of 0 in Safari
	 *    Workaround: Place content before the relative div ... and set height and width to 0 and overflow to hidden
	 *
	 * @example $("#testdiv").offset()
	 * @result { top: 100, left: 100, scrollTop: 10, scrollLeft: 10 }
	 *
	 * @example $("#testdiv").offset({ scroll: false })
	 * @result { top: 90, left: 90 }
	 *
	 * @example var offset = {}
	 * $("#testdiv").offset({ scroll: false }, offset)
	 * @result offset = { top: 90, left: 90 }
	 *
	 * @name offset
	 * @param Map options Optional settings to configure the way the offset is calculated.
	 * @option Boolean margin Should the margin of the element be included in the calculations? True by default.
	 * @option Boolean border Should the border of the element be included in the calculations? False by default.
	 * @option Boolean padding Should the padding of the element be included in the calculations? False by default.
	 * @option Boolean scroll Should the scroll offsets of the parent elements be included in the calculations? True by default.
	 *                        When true it adds the totla scroll offets of all parents to the total offset and also adds two properties
	 *                        to the returned object, scrollTop and scrollLeft. 
	 * @options Boolean lite Will use offsetLite instead of offset when set to true. False by default.
	 * @param Object returnObject An object to store the return value in, so as not to break the chain. If passed in the
	 *                            chain will not be broken and the result will be assigned to this object.
	 * @type Object
	 * @cat Plugins/Dimensions
	 */
	offset: function(options, returnObject) {
		var x = 0, y = 0, sl = 0, st = 0,
		    elem = this[0], parent = this[0], op, parPos, elemPos = $.css(elem, 'position'),
		    mo = $.browser.mozilla, ie = $.browser.msie, sf = $.browser.safari, oa = $.browser.opera,
		    absparent = false, relparent = false, 
		    options = $.extend({ margin: true, border: false, padding: false, scroll: true, lite: false }, options || {});
		
		// Use offsetLite if lite option is true
		if (options.lite) return this.offsetLite(options, returnObject);
		
		if (elem.tagName.toLowerCase() == 'body') {
			// Safari is the only one to get offsetLeft and offsetTop properties of the body "correct"
			// Except they all mess up when the body is positioned absolute or relative
			x = elem.offsetLeft;
			y = elem.offsetTop;
			// Mozilla ignores margin and subtracts border from body element
			if (mo) {
				x += num(elem, 'marginLeft') + (num(elem, 'borderLeftWidth')*2);
				y += num(elem, 'marginTop')  + (num(elem, 'borderTopWidth') *2);
			} else
			// Opera ignores margin
			if (oa) {
				x += num(elem, 'marginLeft');
				y += num(elem, 'marginTop');
			} else
			// IE does not add the border in Standards Mode
			if (ie && jQuery.boxModel) {
				x += num(elem, 'borderLeftWidth');
				y += num(elem, 'borderTopWidth');
			}
		} else {
			do {
				parPos = $.css(parent, 'position');
			
				x += parent.offsetLeft;
				y += parent.offsetTop;

				// Mozilla and IE do not add the border
				if (mo || ie) {
					// add borders to offset
					x += num(parent, 'borderLeftWidth');
					y += num(parent, 'borderTopWidth');

					// Mozilla does not include the border on body if an element isn't positioned absolute and is without an absolute parent
					if (mo && parPos == 'absolute') absparent = true;
					// IE does not include the border on the body if an element is position static and without an absolute or relative parent
					if (ie && parPos == 'relative') relparent = true;
				}

				op = parent.offsetParent;
				if (options.scroll || mo) {
					do {
						if (options.scroll) {
							// get scroll offsets
							sl += parent.scrollLeft;
							st += parent.scrollTop;
						}
				
						// Mozilla does not add the border for a parent that has overflow set to anything but visible
						if (mo && parent != elem && $.css(parent, 'overflow') != 'visible') {
							x += num(parent, 'borderLeftWidth');
							y += num(parent, 'borderTopWidth');
						}
				
						parent = parent.parentNode;
					} while (parent != op);
				}
				parent = op;

				if (parent.tagName.toLowerCase() == 'body' || parent.tagName.toLowerCase() == 'html') {
					// Safari and IE Standards Mode doesn't add the body margin for elments positioned with static or relative
					if ((sf || (ie && $.boxModel)) && elemPos != 'absolute' && elemPos != 'fixed') {
						x += num(parent, 'marginLeft');
						y += num(parent, 'marginTop');
					}
					// Mozilla does not include the border on body if an element isn't positioned absolute and is without an absolute parent
					// IE does not include the border on the body if an element is positioned static and without an absolute or relative parent
					if ( (mo && !absparent && elemPos != 'fixed') || 
					     (ie && elemPos == 'static' && !relparent) ) {
						x += num(parent, 'borderLeftWidth');
						y += num(parent, 'borderTopWidth');
					}
					break; // Exit the loop
				}
			} while (parent);
		}

		var returnValue = handleOffsetReturn(elem, options, x, y, sl, st);

		if (returnObject) { $.extend(returnObject, returnValue); return this; }
		else              { return returnValue; }
	},
	
	/**
	 * Returns the location of the element in pixels from the top left corner of the viewport.
	 * This method is much faster than offset but not as accurate. This method can be invoked
	 * by setting the lite option to true in the offset method.
	 *
	 * @name offsetLite
	 * @param Map options Optional settings to configure the way the offset is calculated.
	 * @option Boolean margin Should the margin of the element be included in the calculations? True by default.
	 * @option Boolean border Should the border of the element be included in the calculations? False by default.
	 * @option Boolean padding Should the padding of the element be included in the calculations? False by default.
	 * @option Boolean scroll Should the scroll offsets of the parent elements be included in the calculations? True by default.
	 *                        When true it adds the totla scroll offets of all parents to the total offset and also adds two properties
	 *                        to the returned object, scrollTop and scrollLeft. 
	 * @param Object returnObject An object to store the return value in, so as not to break the chain. If passed in the
	 *                            chain will not be broken and the result will be assigned to this object.
	 * @type Object
	 * @cat Plugins/Dimensions
	 */
	offsetLite: function(options, returnObject) {
		var x = 0, y = 0, sl = 0, st = 0, parent = this[0], op, 
		    options = $.extend({ margin: true, border: false, padding: false, scroll: true }, options || {});
				
		do {
			x += parent.offsetLeft;
			y += parent.offsetTop;

			op = parent.offsetParent;
			if (options.scroll) {
				// get scroll offsets
				do {
					sl += parent.scrollLeft;
					st += parent.scrollTop;
					parent = parent.parentNode;
				} while(parent != op);
			}
			parent = op;
		} while (parent && parent.tagName.toLowerCase() != 'body' && parent.tagName.toLowerCase() != 'html');

		var returnValue = handleOffsetReturn(this[0], options, x, y, sl, st);

		if (returnObject) { $.extend(returnObject, returnValue); return this; }
		else              { return returnValue; }
	}
});

/**
 * Handles converting a CSS Style into an Integer.
 * @private
 */
var num = function(el, prop) {
	return parseInt($.css(el.jquery?el[0]:el,prop))||0;
};

/**
 * Handles the return value of the offset and offsetLite methods.
 * @private
 */
var handleOffsetReturn = function(elem, options, x, y, sl, st) {
	if ( !options.margin ) {
		x -= num(elem, 'marginLeft');
		y -= num(elem, 'marginTop');
	}

	// Safari and Opera do not add the border for the element
	if ( options.border && ($.browser.safari || $.browser.opera) ) {
		x += num(elem, 'borderLeftWidth');
		y += num(elem, 'borderTopWidth');
	} else if ( !options.border && !($.browser.safari || $.browser.opera) ) {
		x -= num(elem, 'borderLeftWidth');
		y -= num(elem, 'borderTopWidth');
	}

	if ( options.padding ) {
		x += num(elem, 'paddingLeft');
		y += num(elem, 'paddingTop');
	}
	
	// do not include scroll offset on the element
	if ( options.scroll ) {
		sl -= elem.scrollLeft;
		st -= elem.scrollTop;
	}

	return options.scroll ? { top: y - st, left: x - sl, scrollTop:  st, scrollLeft: sl }
	                      : { top: y, left: x };
};

})(jQuery);


/*
 * jQuery EasyTabs plugin 2.0.2
 *
 * Copyright (c) 2010-2011 Steve Schwartz (JangoSteve)
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: Sat Jan 15 02:40:00 2011 -0500
 */
(function($) {
  
  $.fn.easyTabs = function(){ $.error("easyTabs() is no longer used. Now use easytabs() -- no capitalization."); }
  
  $.fn.easytabs = function(options) {
    
    var args = arguments;

    return this.each(function() {
      var $container = $(this),
          data = $container.data("easytabs");
      
      // Initialization was called with $(el).easytabs( { options } ); 
      if ( ! data ) {
        $.fn.easytabs.methods.init.apply($container,[options]);
        $.fn.easytabs.methods.initHashChange.apply($container);
        $.fn.easytabs.methods.initCycle.apply($container);
      }
      
      // User called public method
      if ( $.fn.easytabs.publicMethods[options] ){
        return $.fn.easytabs.publicMethods[ options ].apply( $container, Array.prototype.slice.call( args, 1 ));
      }
    });
  }
  
  $.fn.easytabs.defaults = {
    animate: true, 
    panelActiveClass: "active", 
    tabActiveClass: "active", 
    defaultTab: "li:first-child", 
    animationSpeed: "normal", 
    tabs: "> ul > li", 
    updateHash: true, 
    cycle: false
  }
  
  $.fn.easytabs.methods = {
    init: function(options){
      var $container = this,
          opts = $.extend({}, $.fn.easytabs.defaults, options),
          $tabs = $container.find(opts.tabs),
          $panels = $(),
          $defaultTab,
          $defaultTabLink;

      $tabs.each(function(){
        targetId = $(this).children("a").attr("href").match(/#([^\?]+)/)[0].substr(1);
        $matchingPanel = $container.find("div[id=" + targetId + "]");
        if ( $matchingPanel.size() > 0 ) {
          $panels = $panels.add($matchingPanel.hide());
        } else {
          $tabs = $tabs.not($(this)); // excludes tabs from set that don't have a target div
        }
      });
      $('a.anchor').remove().prependTo('body');
      
      $container.data("easytabs", {
        opts: opts,
        skipUpdateToHash: false,
        tabs: $tabs,
        panels: $panels
      });
      
      $.fn.easytabs.methods.setDefaultTab.apply($container);
      
      $tabs.children("a").bind("click.easytabs", function(e) {
        $container.data("easytabs").opts.cycle = false;
        $container.data("easytabs").skipUpdateToHash = false;
        $clicked = $(this);
        $.fn.easytabs.methods.selectTab.apply($clicked, [$container]);
        e.preventDefault();
      });
    },
    loadFromData: function(){
      return this.data("easytabs");
    },
    setDefaultTab: function(){
      var $container = this,
          data = $.fn.easytabs.methods.loadFromData.apply($container),
          opts = data.opts,
          $tabs = data.tabs,
          $panels = data.panels,
          hash = window.location.hash.match(/^[^\?]*/)[0],
          $selectedTab = $tabs.find("a[href='" + hash + "']").parent(),
          $defaultTab,
          $defaultTabLink;
      
      if( $selectedTab.size() == 1 ){
        $defaultTab = $selectedTab;
        $container.data("easytabs").opts.cycle = false;
      } else {
        $defaultTab = $tabs.parent().find(opts.defaultTab);
        if ( $defaultTab.size() == 0 ) { $.error("The specified default tab ('" + opts.defaultTab + "') could not be found in the tab set."); }
      }
      $defaultTabLink = $defaultTab.children("a").first();
      $container.data("easytabs").defaultTab = $defaultTab;
      $container.data("easytabs").defaultTabLink = $defaultTabLink;
      
      $panels.filter("#" + $defaultTabLink.attr("href").match(/#([^\?]+)/)[0].substr(1)).show().addClass(opts.panelActiveClass);
      $defaultTab.addClass(opts.tabActiveClass).children().addClass(opts.tabActiveClass);
    },
    selectTab: function($container,callback){
      var $clicked = this,
          url = window.location,
          hash = url.hash.match(/^[^\?]*/)[0],
          data = $.fn.easytabs.methods.loadFromData.apply($container),
          opts = data.opts,
          skipUpdateToHash = data.skipUpdateToHash,
          $tabs = data.tabs,
          $panels = data.panels,
          $targetPanel = $panels.filter( $clicked.attr("href").match(/#([^\?]+)/)[0] ),
          $defaultTabLink = data.defaultTabLink,
          transitions = ( opts.animate ) ? {
            show: "fadeIn",
            hide: "fadeOut",
            speed: opts.animationSpeed
          } :
          {
            show: "show",
            hide: "hide",
            speed: 0
          };
      
      if( ! $clicked.hasClass(opts.tabActiveClass) || ! $targetPanel.hasClass(opts.panelActiveClass) ){
        $panels.stop(true,true);
        $container.trigger("easytabs:before");
        
        // Change the active tab *first* to provide immediate feedback when the user clicks
        $tabs.filter("." + opts.tabActiveClass).removeClass(opts.tabActiveClass).children().removeClass(opts.tabActiveClass);
        $clicked.parent().addClass(opts.tabActiveClass).children().addClass(opts.tabActiveClass);
        
        $panels.filter("." + opts.panelActiveClass).removeClass(opts.panelActiveClass);
        $targetPanel.addClass(opts.panelActiveClass);
        
        $panels.filter(":visible")
          [transitions.hide](transitions.speed, function(){
            // At this point, the previous panel is hidden, and the new one will be selected
            $container.trigger("easytabs:midTransition");
            if ( opts.updateHash && ! skipUpdateToHash ) {
              //window.location = url.toString().replace((url.pathname + hash), (url.pathname + $clicked.attr("href")));
              // Not sure why this behaves so differently, but it's more straight forward and seems to have less side-effects
              window.location.hash = $clicked.attr("href");
            } else {
              $container.data("easytabs").skipUpdateToHash = false;
            }
            $targetPanel
              [transitions.show](transitions.speed, function(){
                // Save the new tabs and panels to the container data (with new active tab/panel)
                $container.data("easytabs").tabs = $tabs;
                $container.data("easytabs").panels = $panels;
                $container.trigger("easytabs:after"); 
                // callback only gets called if selectTab actually does something, since it's inside the if block
                if(typeof callback == 'function'){
                  callback();
                }
            });
        });
      }
    },
    selectTabFromHashChange: function(){
      var $container = this,
          data = $.fn.easytabs.methods.loadFromData.apply($container),
          opts = data.opts,
          $tabs = data.tabs,
          $defaultTab = data.defaultTab,
          $defaultTabLink = data.defaultTabLink,
          hash = window.location.hash.match(/^[^\?]*/)[0],
          $tab = $tabs.find("a[href='" + hash + "']");
      if ( opts.updateHash ) {
        if( $tab.size() > 0 ){
          $.fn.easytabs.methods.selectTab.apply( $tab, [$container] );
        } else if ( hash == '' && ! $defaultTab.hasClass(opts.tabActiveClass) && ! opts.cycle ) {
          $container.data("easytabs").skipUpdateToHash = true;
          $.fn.easytabs.methods.selectTab.apply( $defaultTabLink, [$container] );
        }
      }
    },
    cycleTabs: function(tabNumber){
      var $container = this,
          data = $.fn.easytabs.methods.loadFromData.apply($container),
          opts = data.opts,
          $tabs = data.tabs;
      if(opts.cycle){
        tabNumber = tabNumber % $tabs.size();
        $tab = $($tabs[tabNumber]).children("a").first();
        $container.data("easytabs").skipUpdateToHash = true;
        $.fn.easytabs.methods.selectTab.apply($tab, [$container, function(){
          setTimeout(function(){ $.fn.easytabs.methods.cycleTabs.apply($container,[tabNumber + 1]);}, opts.cycle);
        }]);
      }
    },
    initHashChange: function(){
      var $container = this;
      // enabling back-button with jquery.hashchange plugin
      // http://benalman.com/projects/jquery-hashchange-plugin/
      if(typeof $(window).hashchange == 'function'){
        $(window).hashchange( function(){
          $.fn.easytabs.methods.selectTabFromHashChange.apply($container);
        });
      }else if($.address && typeof $.address.change == 'function'){ // back-button with jquery.address plugin http://www.asual.com/jquery/address/docs/
        $.address.change( function(){
          $.fn.easytabs.methods.selectTabFromHashChange.apply($container);
        });
      }
    },
    initCycle: function(){
      var $container = this,
          data = $.fn.easytabs.methods.loadFromData.apply($container),
          opts = data.opts,
          $tabs = data.tabs,
          $defaultTab = data.defaultTab,
          tabNumber;
      if (opts.cycle) {
        tabNumber = $tabs.index($defaultTab);
        setTimeout( function(){ $.fn.easytabs.methods.cycleTabs.apply($container, [tabNumber + 1]); }, opts.cycle);
      }
    }
  }
  
  $.fn.easytabs.publicMethods = {
    select: function(tabSelector){
      var $container = this,
          data = $.fn.easytabs.methods.loadFromData.apply($container),
          $tabs = data.tabs,
          $tab;
      if ( ($tab = $tabs.filter(tabSelector)).size() == 0 ) {                       // Find tab container that matches selector (like 'li#tab-one' which contains tab link)
        if ( ($tab = $tabs.find("a[href='" + tabSelector + "']")).size() == 0 ) {   // Find direct tab link that matches href (like 'a[href="#panel-1"]')
          if ( ($tab = $tabs.find("a" + tabSelector)).size() == 0 ) {               // Find direct tab link that matches selector (like 'a#tab-1')
            $.error('Tab \'' + tabSelector + '\' does not exist in tab set');
          }
        }
      } else {
        $tab = $tab.children("a").first();                                          // Select the child tab link, since the first option finds the tab container (like <li>)
      }
      $.fn.easytabs.methods.selectTab.apply($tab, [$container]);
    }
  }
})(jQuery);

/*!
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery hashchange event
//
// *Version: 1.3, Last updated: 7/21/2010*
// 
// Project Home - http://benalman.com/projects/jquery-hashchange-plugin/
// GitHub       - http://github.com/cowboy/jquery-hashchange/
// Source       - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.js
// (Minified)   - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.min.js (0.8kb gzipped)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// hashchange event - http://benalman.com/code/projects/jquery-hashchange/examples/hashchange/
// document.domain - http://benalman.com/code/projects/jquery-hashchange/examples/document_domain/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - 1.2.6, 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-4, Chrome 5-6, Safari 3.2-5,
//                   Opera 9.6-10.60, iPhone 3.1, Android 1.6-2.2, BlackBerry 4.6-5.
// Unit Tests      - http://benalman.com/code/projects/jquery-hashchange/unit/
// 
// About: Known issues
// 
// While this jQuery hashchange event implementation is quite stable and
// robust, there are a few unfortunate browser bugs surrounding expected
// hashchange event-based behaviors, independent of any JavaScript
// window.onhashchange abstraction. See the following examples for more
// information:
// 
// Chrome: Back Button - http://benalman.com/code/projects/jquery-hashchange/examples/bug-chrome-back-button/
// Firefox: Remote XMLHttpRequest - http://benalman.com/code/projects/jquery-hashchange/examples/bug-firefox-remote-xhr/
// WebKit: Back Button in an Iframe - http://benalman.com/code/projects/jquery-hashchange/examples/bug-webkit-hash-iframe/
// Safari: Back Button from a different domain - http://benalman.com/code/projects/jquery-hashchange/examples/bug-safari-back-from-diff-domain/
// 
// Also note that should a browser natively support the window.onhashchange 
// event, but not report that it does, the fallback polling loop will be used.
// 
// About: Release History
// 
// 1.3   - (7/21/2010) Reorganized IE6/7 Iframe code to make it more
//         "removable" for mobile-only development. Added IE6/7 document.title
//         support. Attempted to make Iframe as hidden as possible by using
//         techniques from http://www.paciellogroup.com/blog/?p=604. Added 
//         support for the "shortcut" format $(window).hashchange( fn ) and
//         $(window).hashchange() like jQuery provides for built-in events.
//         Renamed jQuery.hashchangeDelay to <jQuery.fn.hashchange.delay> and
//         lowered its default value to 50. Added <jQuery.fn.hashchange.domain>
//         and <jQuery.fn.hashchange.src> properties plus document-domain.html
//         file to address access denied issues when setting document.domain in
//         IE6/7.
// 1.2   - (2/11/2010) Fixed a bug where coming back to a page using this plugin
//         from a page on another domain would cause an error in Safari 4. Also,
//         IE6/7 Iframe is now inserted after the body (this actually works),
//         which prevents the page from scrolling when the event is first bound.
//         Event can also now be bound before DOM ready, but it won't be usable
//         before then in IE6/7.
// 1.1   - (1/21/2010) Incorporated document.documentMode test to fix IE8 bug
//         where browser version is incorrectly reported as 8.0, despite
//         inclusion of the X-UA-Compatible IE=EmulateIE7 meta tag.
// 1.0   - (1/9/2010) Initial Release. Broke out the jQuery BBQ event.special
//         window.onhashchange functionality into a separate plugin for users
//         who want just the basic event & back button support, without all the
//         extra awesomeness that BBQ provides. This plugin will be included as
//         part of jQuery BBQ, but also be available separately.

(function($,window,undefined){
  '$:nomunge'; // Used by YUI compressor.
  
  // Reused string.
  var str_hashchange = 'hashchange',
    
    // Method / object references.
    doc = document,
    fake_onhashchange,
    special = $.event.special,
    
    // Does the browser support window.onhashchange? Note that IE8 running in
    // IE7 compatibility mode reports true for 'onhashchange' in window, even
    // though the event isn't supported, so also test document.documentMode.
    doc_mode = doc.documentMode,
    supports_onhashchange = 'on' + str_hashchange in window && ( doc_mode === undefined || doc_mode > 7 );
  
  // Get location.hash (or what you'd expect location.hash to be) sans any
  // leading #. Thanks for making this necessary, Firefox!
  function get_fragment( url ) {
    url = url || location.href;
    return '#' + url.replace( /^[^#]*#?(.*)$/, '$1' );
  };
  
  // Method: jQuery.fn.hashchange
  // 
  // Bind a handler to the window.onhashchange event or trigger all bound
  // window.onhashchange event handlers. This behavior is consistent with
  // jQuery's built-in event handlers.
  // 
  // Usage:
  // 
  // > jQuery(window).hashchange( [ handler ] );
  // 
  // Arguments:
  // 
  //  handler - (Function) Optional handler to be bound to the hashchange
  //    event. This is a "shortcut" for the more verbose form:
  //    jQuery(window).bind( 'hashchange', handler ). If handler is omitted,
  //    all bound window.onhashchange event handlers will be triggered. This
  //    is a shortcut for the more verbose
  //    jQuery(window).trigger( 'hashchange' ). These forms are described in
  //    the <hashchange event> section.
  // 
  // Returns:
  // 
  //  (jQuery) The initial jQuery collection of elements.
  
  // Allow the "shortcut" format $(elem).hashchange( fn ) for binding and
  // $(elem).hashchange() for triggering, like jQuery does for built-in events.
  $.fn[ str_hashchange ] = function( fn ) {
    return fn ? this.bind( str_hashchange, fn ) : this.trigger( str_hashchange );
  };
  
  // Property: jQuery.fn.hashchange.delay
  // 
  // The numeric interval (in milliseconds) at which the <hashchange event>
  // polling loop executes. Defaults to 50.
  
  // Property: jQuery.fn.hashchange.domain
  // 
  // If you're setting document.domain in your JavaScript, and you want hash
  // history to work in IE6/7, not only must this property be set, but you must
  // also set document.domain BEFORE jQuery is loaded into the page. This
  // property is only applicable if you are supporting IE6/7 (or IE8 operating
  // in "IE7 compatibility" mode).
  // 
  // In addition, the <jQuery.fn.hashchange.src> property must be set to the
  // path of the included "document-domain.html" file, which can be renamed or
  // modified if necessary (note that the document.domain specified must be the
  // same in both your main JavaScript as well as in this file).
  // 
  // Usage:
  // 
  // jQuery.fn.hashchange.domain = document.domain;
  
  // Property: jQuery.fn.hashchange.src
  // 
  // If, for some reason, you need to specify an Iframe src file (for example,
  // when setting document.domain as in <jQuery.fn.hashchange.domain>), you can
  // do so using this property. Note that when using this property, history
  // won't be recorded in IE6/7 until the Iframe src file loads. This property
  // is only applicable if you are supporting IE6/7 (or IE8 operating in "IE7
  // compatibility" mode).

  // 
  // Usage:
  // 
  // jQuery.fn.hashchange.src = 'path/to/file.html';
  
  $.fn[ str_hashchange ].delay = 50;
  /*
  $.fn[ str_hashchange ].domain = null;
  $.fn[ str_hashchange ].src = null;
  */
  
  // Event: hashchange event
  // 
  // Fired when location.hash changes. In browsers that support it, the native
  // HTML5 window.onhashchange event is used, otherwise a polling loop is
  // initialized, running every <jQuery.fn.hashchange.delay> milliseconds to
  // see if the hash has changed. In IE6/7 (and IE8 operating in "IE7
  // compatibility" mode), a hidden Iframe is created to allow the back button
  // and hash-based history to work.
  // 
  // Usage as described in <jQuery.fn.hashchange>:
  // 
  // > // Bind an event handler.
  // > jQuery(window).hashchange( function(e) {
  // >   var hash = location.hash;
  // >   ...
  // > });
  // > 
  // > // Manually trigger the event handler.
  // > jQuery(window).hashchange();
  // 
  // A more verbose usage that allows for event namespacing:
  // 
  // > // Bind an event handler.
  // > jQuery(window).bind( 'hashchange', function(e) {
  // >   var hash = location.hash;
  // >   ...
  // > });
  // > 
  // > // Manually trigger the event handler.
  // > jQuery(window).trigger( 'hashchange' );
  // 
  // Additional Notes:
  // 
  // * The polling loop and Iframe are not created until at least one handler
  //   is actually bound to the 'hashchange' event.
  // * If you need the bound handler(s) to execute immediately, in cases where
  //   a location.hash exists on page load, via bookmark or page refresh for
  //   example, use jQuery(window).hashchange() or the more verbose 
  //   jQuery(window).trigger( 'hashchange' ).
  // * The event can be bound before DOM ready, but since it won't be usable
  //   before then in IE6/7 (due to the necessary Iframe), recommended usage is
  //   to bind it inside a DOM ready handler.
  
  // Override existing $.event.special.hashchange methods (allowing this plugin
  // to be defined after jQuery BBQ in BBQ's source code).
  special[ str_hashchange ] = $.extend( special[ str_hashchange ], {
    
    // Called only when the first 'hashchange' event is bound to window.
    setup: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }
      
      // Otherwise, we need to create our own. And we don't want to call this
      // until the user binds to the event, just in case they never do, since it
      // will create a polling loop and possibly even a hidden Iframe.
      $( fake_onhashchange.start );
    },
    
    // Called only when the last 'hashchange' event is unbound from window.
    teardown: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }
      
      // Otherwise, we need to stop ours (if possible).
      $( fake_onhashchange.stop );
    }
    
  });
  
  // fake_onhashchange does all the work of triggering the window.onhashchange
  // event for browsers that don't natively support it, including creating a
  // polling loop to watch for hash changes and in IE 6/7 creating a hidden
  // Iframe to enable back and forward.
  fake_onhashchange = (function(){
    var self = {},
      timeout_id,
      
      // Remember the initial hash so it doesn't get triggered immediately.
      last_hash = get_fragment(),
      
      fn_retval = function(val){ return val; },
      history_set = fn_retval,
      history_get = fn_retval;
    
    // Start the polling loop.
    self.start = function() {
      timeout_id || poll();
    };
    
    // Stop the polling loop.
    self.stop = function() {
      timeout_id && clearTimeout( timeout_id );
      timeout_id = undefined;
    };
    
    // This polling loop checks every $.fn.hashchange.delay milliseconds to see
    // if location.hash has changed, and triggers the 'hashchange' event on
    // window when necessary.
    function poll() {
      var hash = get_fragment(),
        history_hash = history_get( last_hash );
      
      if ( hash !== last_hash ) {
        history_set( last_hash = hash, history_hash );
        
        $(window).trigger( str_hashchange );
        
      } else if ( history_hash !== last_hash ) {
        location.href = location.href.replace( /#.*/, '' ) + history_hash;
      }
      
      timeout_id = setTimeout( poll, $.fn[ str_hashchange ].delay );
    };
    
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // vvvvvvvvvvvvvvvvvvv REMOVE IF NOT SUPPORTING IE6/7/8 vvvvvvvvvvvvvvvvvvv
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    $.browser.msie && !supports_onhashchange && (function(){
      // Not only do IE6/7 need the "magical" Iframe treatment, but so does IE8
      // when running in "IE7 compatibility" mode.
      
      var iframe,
        iframe_src;
      
      // When the event is bound and polling starts in IE 6/7, create a hidden
      // Iframe for history handling.
      self.start = function(){
        if ( !iframe ) {
          iframe_src = $.fn[ str_hashchange ].src;
          iframe_src = iframe_src && iframe_src + get_fragment();
          
          // Create hidden Iframe. Attempt to make Iframe as hidden as possible
          // by using techniques from http://www.paciellogroup.com/blog/?p=604.
          iframe = $('<iframe tabindex="-1" title="empty"/>').hide()
            
            // When Iframe has completely loaded, initialize the history and
            // start polling.
            .one( 'load', function(){
              iframe_src || history_set( get_fragment() );
              poll();
            })
            
            // Load Iframe src if specified, otherwise nothing.
            .attr( 'src', iframe_src || 'javascript:0' )
            
            // Append Iframe after the end of the body to prevent unnecessary
            // initial page scrolling (yes, this works).
            .insertAfter( 'body' )[0].contentWindow;
          
          // Whenever `document.title` changes, update the Iframe's title to
          // prettify the back/next history menu entries. Since IE sometimes
          // errors with "Unspecified error" the very first time this is set
          // (yes, very useful) wrap this with a try/catch block.
          doc.onpropertychange = function(){
            try {
              if ( event.propertyName === 'title' ) {
                iframe.document.title = doc.title;
              }
            } catch(e) {}
          };
          
        }
      };
      
      // Override the "stop" method since an IE6/7 Iframe was created. Even
      // if there are no longer any bound event handlers, the polling loop
      // is still necessary for back/next to work at all!
      self.stop = fn_retval;
      
      // Get history by looking at the hidden Iframe's location.hash.
      history_get = function() {
        return get_fragment( iframe.location.href );
      };
      
      // Set a new history item by opening and then closing the Iframe
      // document, *then* setting its location.hash. If document.domain has
      // been set, update that as well.
      history_set = function( hash, history_hash ) {
        var iframe_doc = iframe.document,
          domain = $.fn[ str_hashchange ].domain;
        
        if ( hash !== history_hash ) {
          // Update Iframe with any initial `document.title` that might be set.
          iframe_doc.title = doc.title;
          
          // Opening the Iframe's document after it has been closed is what
          // actually adds a history entry.
          iframe_doc.open();
          
          // Set document.domain for the Iframe document as well, if necessary.
          domain && iframe_doc.write( '<script>document.domain="' + domain + '"</script>' );
          
          iframe_doc.close();
          
          // Update the Iframe's hash, for great justice.
          iframe.location.hash = hash;
        }
      };
      
    })();
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // ^^^^^^^^^^^^^^^^^^^ REMOVE IF NOT SUPPORTING IE6/7/8 ^^^^^^^^^^^^^^^^^^^
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    
    return self;
  })();
  
})(jQuery,this);




/*
 * jQuery clueTip plugin
 * Version 1.0.7  (January 28, 2010)
 * @requires jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
 
/*
 *
 * Full list of options/settings can be found at the bottom of this file and at http://plugins.learningjquery.com/cluetip/
 *
 * Examples can be found at http://plugins.learningjquery.com/cluetip/demo/
 *
*/

;(function($) { 
  $.cluetip = {version: '1.0.6'};
  var $cluetip, $cluetipInner, $cluetipOuter, $cluetipTitle, $cluetipArrows, $cluetipWait, $dropShadow, imgCount;
  
  $.fn.cluetip = function(js, options) {
    if (typeof js == 'object') {
      options = js;
      js = null;
    }
    if (js == 'destroy') {
      return this.removeData('thisInfo').unbind('.cluetip');
    }
    return this.each(function(index) {
      var link = this, $this = $(this);
      
      // support metadata plugin (v1.0 and 2.0)
      var opts = $.extend(true, {}, $.fn.cluetip.defaults, options || {}, $.metadata ? $this.metadata() : $.meta ? $this.data() : {});

      // start out with no contents (for ajax activation)
      var cluetipContents = false;
      var cluezIndex = +opts.cluezIndex;
      $this.data('thisInfo', {title: link.title, zIndex: cluezIndex});
      var isActive = false, closeOnDelay = 0;

      // create the cluetip divs
      if (!$('#cluetip').length) {
        $(['<div id="cluetip">',
          '<div id="cluetip-outer">',
            '<h3 id="cluetip-title"></h3>',
            '<div id="cluetip-inner"></div>',
          '</div>',
          '<div id="cluetip-extra"></div>',
          '<div id="cluetip-arrows" class="cluetip-arrows"></div>',
        '</div>'].join(''))
        [insertionType](insertionElement).hide();
        
        $cluetip = $('#cluetip').css({position: 'absolute'});
        $cluetipOuter = $('#cluetip-outer').css({position: 'relative', zIndex: cluezIndex});
        $cluetipInner = $('#cluetip-inner');
        $cluetipTitle = $('#cluetip-title');        
        $cluetipArrows = $('#cluetip-arrows');
        $cluetipWait = $('<div id="cluetip-waitimage"></div>')
          .css({position: 'absolute'}).insertBefore($cluetip).hide();
      }
      var dropShadowSteps = (opts.dropShadow) ? +opts.dropShadowSteps : 0;
      if (!$dropShadow) {
        $dropShadow = $([]);
        for (var i=0; i < dropShadowSteps; i++) {
          $dropShadow = $dropShadow.add($('<div></div>').css({zIndex: cluezIndex-1, opacity:.1, top: 1+i, left: 1+i}));
        }
        $dropShadow.css({position: 'absolute', backgroundColor: '#000'})
        .prependTo($cluetip);
      }
      var tipAttribute = $this.attr(opts.attribute), ctClass = opts.cluetipClass;
      if (!tipAttribute && !opts.splitTitle && !js) {
        return true;
      }
      // if hideLocal is set to true, on DOM ready hide the local content that will be displayed in the clueTip
      if (opts.local && opts.localPrefix) {tipAttribute = opts.localPrefix + tipAttribute;}
      if (opts.local && opts.hideLocal) { $(tipAttribute + ':first').hide(); }
      var tOffset = parseInt(opts.topOffset, 10), lOffset = parseInt(opts.leftOffset, 10);
      // vertical measurement variables
      var tipHeight, wHeight,
          defHeight = isNaN(parseInt(opts.height, 10)) ? 'auto' : (/\D/g).test(opts.height) ? opts.height : opts.height + 'px';
      var sTop, linkTop, posY, tipY, mouseY, baseline;
      // horizontal measurement variables
      var tipInnerWidth = parseInt(opts.width, 10) || 275,
          tipWidth = tipInnerWidth + (parseInt($cluetip.css('paddingLeft'),10)||0) + (parseInt($cluetip.css('paddingRight'),10)||0) + dropShadowSteps,
          linkWidth = this.offsetWidth,
          linkLeft, posX, tipX, mouseX, winWidth;
            
      // parse the title
      var tipParts;
      var tipTitle = (opts.attribute != 'title') ? $this.attr(opts.titleAttribute) : '';
      if (opts.splitTitle) {
        if (tipTitle == undefined) {tipTitle = '';}
        tipParts = tipTitle.split(opts.splitTitle);
        tipTitle = tipParts.shift();
      }
      if (opts.escapeTitle) {
        tipTitle = tipTitle.replace(/&/g,'&amp;').replace(/>/g,'&gt;').replace(/</g,'&lt;');
      }
      
      var localContent;
      function returnFalse() { return false; }

/***************************************      
* ACTIVATION
****************************************/
    
//activate clueTip
    var activate = function(event) {
      if (!opts.onActivate($this)) {
        return false;
      }
      isActive = true;
      $cluetip.removeClass().css({width: tipInnerWidth});
      if (tipAttribute == $this.attr('href')) {
        $this.css('cursor', opts.cursor);
      }
      if (opts.hoverClass) {
        $this.addClass(opts.hoverClass);
      }
      linkTop = posY = $this.offset().top;
      linkLeft = $this.offset().left;
      mouseX = event.pageX;
      mouseY = event.pageY;
      if (link.tagName.toLowerCase() != 'area') {
        sTop = $(document).scrollTop();
        winWidth = $(window).width();
      }
// position clueTip horizontally
      if (opts.positionBy == 'fixed') {
        posX = linkWidth + linkLeft + lOffset;
        $cluetip.css({left: posX});
      } else {
        posX = (linkWidth > linkLeft && linkLeft > tipWidth)
          || linkLeft + linkWidth + tipWidth + lOffset > winWidth 
          ? linkLeft - tipWidth - lOffset 
          : linkWidth + linkLeft + lOffset;
        if (link.tagName.toLowerCase() == 'area' || opts.positionBy == 'mouse' || linkWidth + tipWidth > winWidth) { // position by mouse
          if (mouseX + 20 + tipWidth > winWidth) {  
            $cluetip.addClass(' cluetip-' + ctClass);
            posX = (mouseX - tipWidth - lOffset) >= 0 ? mouseX - tipWidth - lOffset - parseInt($cluetip.css('marginLeft'),10) + parseInt($cluetipInner.css('marginRight'),10) :  mouseX - (tipWidth/2);
          } else {
            posX = mouseX + lOffset;
          }
        }
        var pY = posX < 0 ? event.pageY + tOffset : event.pageY;
        $cluetip.css({
          left: (posX > 0 && opts.positionBy != 'bottomTop') ? posX : (mouseX + (tipWidth/2) > winWidth) ? winWidth/2 - tipWidth/2 : Math.max(mouseX - (tipWidth/2),0),
          zIndex: $this.data('thisInfo').zIndex
        });
        $cluetipArrows.css({zIndex: $this.data('thisInfo').zIndex+1});
      }
        wHeight = $(window).height();

/***************************************
* load a string from cluetip method's first argument
***************************************/
      if (js) {
        if (typeof js == 'function') {
          js = js.call(link);
        }
        $cluetipInner.html(js);
        cluetipShow(pY);
      }
/***************************************
* load the title attribute only (or user-selected attribute). 
* clueTip title is the string before the first delimiter
* subsequent delimiters place clueTip body text on separate lines
***************************************/

      else if (tipParts) {
        var tpl = tipParts.length;
        $cluetipInner.html(tpl ? tipParts[0] : '');
        if (tpl > 1) {
          for (var i=1; i < tpl; i++){
            $cluetipInner.append('<div class="split-body">' + tipParts[i] + '</div>');
          }          
        }
        cluetipShow(pY);
      }
/***************************************
* load external file via ajax          
***************************************/

      else if (!opts.local && tipAttribute.indexOf('#') !== 0) {
        if (/\.(jpe?g|tiff?|gif|png)$/i.test(tipAttribute)) {
          $cluetipInner.html('<img src="' + tipAttribute + '" alt="' + tipTitle + '" />');
          cluetipShow(pY);
        } else if (cluetipContents && opts.ajaxCache) {
          $cluetipInner.html(cluetipContents);
          cluetipShow(pY);
        } else {
          var optionBeforeSend = opts.ajaxSettings.beforeSend,
              optionError = opts.ajaxSettings.error,
              optionSuccess = opts.ajaxSettings.success,
              optionComplete = opts.ajaxSettings.complete;
          var ajaxSettings = {
            cache: false, // force requested page not to be cached by browser
            url: tipAttribute,
            beforeSend: function(xhr) {
              if (optionBeforeSend) {optionBeforeSend.call(link, xhr, $cluetip, $cluetipInner);}
              $cluetipOuter.children().empty();
              if (opts.waitImage) {
                $cluetipWait
                .css({top: mouseY+20, left: mouseX+20, zIndex: $this.data('thisInfo').zIndex-1})
                .show();
              }
            },
            error: function(xhr, textStatus) {
              if (isActive) {
                if (optionError) {
                  optionError.call(link, xhr, textStatus, $cluetip, $cluetipInner);
                } else {
                  $cluetipInner.html('<i>sorry, the contents could not be loaded</i>');  
                }
              }
            },
            success: function(data, textStatus) {       
              cluetipContents = opts.ajaxProcess.call(link, data);
              if (isActive) {
                if (optionSuccess) {optionSuccess.call(link, data, textStatus, $cluetip, $cluetipInner);}
                $cluetipInner.html(cluetipContents);
              }
            },
            complete: function(xhr, textStatus) {
              if (optionComplete) {optionComplete.call(link, xhr, textStatus, $cluetip, $cluetipInner);}
              var imgs = $cluetipInner[0].getElementsByTagName('img');
              imgCount = imgs.length;
              for (var i=0, l = imgs.length; i < l; i++) {
                if (imgs[i].complete) {
                  imgCount--;
                }
              }
              if (imgCount && !$.browser.opera) {
                $(imgs).bind('load error', function() {
                  imgCount--;
                  if (imgCount<1) {
                    $cluetipWait.hide();
                    if (isActive) { cluetipShow(pY); }
                  }
                }); 
              } else {
                $cluetipWait.hide();
                if (isActive) { cluetipShow(pY); }
              } 
            }
          };
          var ajaxMergedSettings = $.extend(true, {}, opts.ajaxSettings, ajaxSettings);
          
          $.ajax(ajaxMergedSettings);
        }

/***************************************
* load an element from the same page
***************************************/
      } else if (opts.local) {
        
        var $localContent = $(tipAttribute + (/#\S+$/.test(tipAttribute) ? '' : ':eq(' + index + ')')).clone(true).show();
        $cluetipInner.html($localContent);
        cluetipShow(pY);
      }
    };

// get dimensions and options for cluetip and prepare it to be shown
    var cluetipShow = function(bpY) {
      $cluetip.addClass('cluetip-' + ctClass);
      if (opts.truncate) { 
        var $truncloaded = $cluetipInner.text().slice(0,opts.truncate) + '...';
        $cluetipInner.html($truncloaded);
      }
      function doNothing() {}; //empty function
      tipTitle ? $cluetipTitle.show().html(tipTitle) : (opts.showTitle) ? $cluetipTitle.show().html('&nbsp;') : $cluetipTitle.hide();
      if (opts.sticky) {
        var $closeLink = $('<div id="cluetip-close"><a href="#">' + opts.closeText + '</a></div>');
        (opts.closePosition == 'bottom') ? $closeLink.appendTo($cluetipInner) : (opts.closePosition == 'title') ? $closeLink.prependTo($cluetipTitle) : $closeLink.prependTo($cluetipInner);
        $closeLink.bind('click.cluetip', function() {
          cluetipClose();
          return false;
        });
        if (opts.mouseOutClose) {
          $cluetip.bind('mouseleave.cluetip', function() {
            cluetipClose();
          });
        } else {
          $cluetip.unbind('mouseleave.cluetip');
        }
      }
// now that content is loaded, finish the positioning 
      var direction = '';
      $cluetipOuter.css({zIndex: $this.data('thisInfo').zIndex, overflow: defHeight == 'auto' ? 'visible' : 'auto', height: defHeight});
      tipHeight = defHeight == 'auto' ? Math.max($cluetip.outerHeight(),$cluetip.height()) : parseInt(defHeight,10);   
      tipY = posY;
      baseline = sTop + wHeight;
      if (opts.positionBy == 'fixed') {
        tipY = posY - opts.dropShadowSteps + tOffset;
      } else if ( (posX < mouseX && Math.max(posX, 0) + tipWidth > mouseX) || opts.positionBy == 'bottomTop') {
        if (posY + tipHeight + tOffset > baseline && mouseY - sTop > tipHeight + tOffset) { 
          tipY = mouseY - tipHeight - tOffset;
          direction = 'top';
        } else { 
          tipY = mouseY + tOffset;
          direction = 'bottom';
        }
      } else if ( posY + tipHeight + tOffset > baseline ) {
        tipY = (tipHeight >= wHeight) ? sTop : baseline - tipHeight - tOffset;
      } else if ($this.css('display') == 'block' || link.tagName.toLowerCase() == 'area' || opts.positionBy == "mouse") {
        tipY = bpY - tOffset;
      } else {
        tipY = posY - opts.dropShadowSteps;
      }
      if (direction == '') {
        posX < linkLeft ? direction = 'left' : direction = 'right';
      }
      $cluetip.css({top: tipY + 'px'}).removeClass().addClass('clue-' + direction + '-' + ctClass).addClass(' cluetip-' + ctClass);
      if (opts.arrows) { // set up arrow positioning to align with element
        var bgY = (posY - tipY - opts.dropShadowSteps);
        $cluetipArrows.css({top: (/(left|right)/.test(direction) && posX >=0 && bgY > 0) ? bgY + 'px' : /(left|right)/.test(direction) ? 0 : ''}).show();
      } else {
        $cluetipArrows.hide();
      }

// (first hide, then) ***SHOW THE CLUETIP***
      $dropShadow.hide();
      $cluetip.hide()[opts.fx.open](opts.fx.openSpeed || 0);
      if (opts.dropShadow) { $dropShadow.css({height: tipHeight, width: tipInnerWidth, zIndex: $this.data('thisInfo').zIndex-1}).show(); }
      if ($.fn.bgiframe) { $cluetip.bgiframe(); }
      // delayed close (not fully tested)
      if (opts.delayedClose > 0) {
        closeOnDelay = setTimeout(cluetipClose, opts.delayedClose);
      }
      // trigger the optional onShow function
      opts.onShow.call(link, $cluetip, $cluetipInner);
    };

/***************************************
   =INACTIVATION
-------------------------------------- */
    var inactivate = function(event) {
      isActive = false;
      $cluetipWait.hide();
      if (!opts.sticky || (/click|toggle/).test(opts.activation) ) {
        cluetipClose();
        clearTimeout(closeOnDelay);        
      }
      if (opts.hoverClass) {
        $this.removeClass(opts.hoverClass);
      }
    };
// close cluetip and reset some things
    var cluetipClose = function() {
      $cluetipOuter 
      .parent().hide().removeClass();
      opts.onHide.call(link, $cluetip, $cluetipInner);
      $this.removeClass('cluetip-clicked');
      if (tipTitle) {
        $this.attr(opts.titleAttribute, tipTitle);
      }
      $this.css('cursor','');
      if (opts.arrows) {
        $cluetipArrows.css({top: ''});
      }
    };

    $(document).bind('hideCluetip', function(e) {
      cluetipClose();
    });
/***************************************
   =BIND EVENTS
-------------------------------------- */
  // activate by click
      if ( (/click|toggle/).test(opts.activation) ) {
        $this.bind('click.cluetip', function(event) {
          if ($cluetip.is(':hidden') || !$this.is('.cluetip-clicked')) {
            activate(event);
            $('.cluetip-clicked').removeClass('cluetip-clicked');
            $this.addClass('cluetip-clicked');
          } else {
            inactivate(event);
          }
          this.blur();
          return false;
        });
  // activate by focus; inactivate by blur    
      } else if (opts.activation == 'focus') {
        $this.bind('focus.cluetip', function(event) {
          activate(event);
        });
        $this.bind('blur.cluetip', function(event) {
          inactivate(event);
        });
  // activate by hover
      } else {
        // clicking is returned false if clickThrough option is set to false
        $this[opts.clickThrough ? 'unbind' : 'bind']('click', returnFalse);
        //set up mouse tracking
        var mouseTracks = function(evt) {
          if (opts.tracking == true) {
            var trackX = posX - evt.pageX;
            var trackY = tipY ? tipY - evt.pageY : posY - evt.pageY;
            $this.bind('mousemove.cluetip', function(evt) {
              $cluetip.css({left: evt.pageX + trackX, top: evt.pageY + trackY });
            });
          }
        };
        if ($.fn.hoverIntent && opts.hoverIntent) {
          $this.hoverIntent({
            sensitivity: opts.hoverIntent.sensitivity,
            interval: opts.hoverIntent.interval,  
            over: function(event) {
              activate(event);
              mouseTracks(event);
            }, 
            timeout: opts.hoverIntent.timeout,  
            out: function(event) {inactivate(event); $this.unbind('mousemove.cluetip');}
          });           
        } else {
          $this.bind('mouseenter.cluetip', function(event) {
            activate(event);
            mouseTracks(event);
          })
          .bind('mouseleave.cluetip', function(event) {
            inactivate(event);
            $this.unbind('mousemove.cluetip');
          });
        }
        $this.bind('mouseover.cluetip', function(event) {
          $this.attr('title','');
        }).bind('mouseleave.cluetip', function(event) {
          $this.attr('title', $this.data('thisInfo').title);
        });
      }
    });
  };
  
/*
 * options for clueTip
 *
 * each one can be explicitly overridden by changing its value. 
 * for example: $.fn.cluetip.defaults.width = 200; 
 * would change the default width for all clueTips to 200. 
 *
 * each one can also be overridden by passing an options map to the cluetip method.
 * for example: $('a.example').cluetip({width: 200}); 
 * would change the default width to 200 for clueTips invoked by a link with class of "example"
 *
 */
  
  $.fn.cluetip.defaults = {  // set up default options
    width:            275,      // The width of the clueTip
    height:           'auto',   // The height of the clueTip
    cluezIndex:       97,       // Sets the z-index style property of the clueTip
    positionBy:       'auto',   // Sets the type of positioning: 'auto', 'mouse','bottomTop', 'fixed'
    topOffset:        15,       // Number of px to offset clueTip from top of invoking element
    leftOffset:       15,       // Number of px to offset clueTip from left of invoking element
    local:            false,    // Whether to use content from the same page for the clueTip's body
    localPrefix:      null,       // string to be prepended to the tip attribute if local is true
    hideLocal:        true,     // If local option is set to true, this determines whether local content
                                // to be shown in clueTip should be hidden at its original location
    attribute:        'rel',    // the attribute to be used for fetching the clueTip's body content
    titleAttribute:   'title',  // the attribute to be used for fetching the clueTip's title
    splitTitle:       '',       // A character used to split the title attribute into the clueTip title and divs
                                // within the clueTip body. more info below [6]
    escapeTitle:      false,    // whether to html escape the title attribute
    showTitle:        true,     // show title bar of the clueTip, even if title attribute not set
    cluetipClass:     'default',// class added to outermost clueTip div in the form of 'cluetip-' + clueTipClass.
    hoverClass:       '',       // class applied to the invoking element onmouseover and removed onmouseout
    waitImage:        true,     // whether to show a "loading" img, which is set in jquery.cluetip.css
    cursor:           'help',
    arrows:           false,    // if true, displays arrow on appropriate side of clueTip
    dropShadow:       true,     // set to false if you don't want the drop-shadow effect on the clueTip
    dropShadowSteps:  6,        // adjusts the size of the drop shadow
    sticky:           false,    // keep visible until manually closed
    mouseOutClose:    false,    // close when clueTip is moused out
    activation:       'hover',  // set to 'click' to force user to click to show clueTip
                                // set to 'focus' to show on focus of a form element and hide on blur
    clickThrough:     false,    // if true, and activation is not 'click', then clicking on link will take user to the link's href,
                                // even if href and tipAttribute are equal
    tracking:         false,    // if true, clueTip will track mouse movement (experimental)
    delayedClose:     0,        // close clueTip on a timed delay (experimental)
    closePosition:    'top',    // location of close text for sticky cluetips; can be 'top' or 'bottom' or 'title'
    closeText:        'Close',  // text (or HTML) to to be clicked to close sticky clueTips
    truncate:         0,        // number of characters to truncate clueTip's contents. if 0, no truncation occurs
    
    // effect and speed for opening clueTips
    fx: {             
                      open:       'show', // can be 'show' or 'slideDown' or 'fadeIn'
                      openSpeed:  ''
    },     

    // settings for when hoverIntent plugin is used             
    hoverIntent: {    
                      sensitivity:  3,
              			  interval:     50,
              			  timeout:      0
    },

    // short-circuit function to run just before clueTip is shown. 
    onActivate:       function(e) {return true;},
    // function to run just after clueTip is shown. 
    onShow:           function(ct, ci){},
    // function to run just after clueTip is hidden.
    onHide:           function(ct, ci){},
    // whether to cache results of ajax request to avoid unnecessary hits to server    
    ajaxCache:        true,  

    // process data retrieved via xhr before it's displayed
    ajaxProcess:      function(data) {
                        data = data.replace(/<(script|style|title)[^<]+<\/(script|style|title)>/gm, '').replace(/<(link|meta)[^>]+>/g,'');
                        return data;
    },                

    // can pass in standard $.ajax() parameters. Callback functions, such as beforeSend, 
    // will be queued first within the default callbacks. 
    // The only exception is error, which overrides the default
    ajaxSettings: {
                      // error: function(ct, ci) { /* override default error callback */ }
                      // beforeSend: function(ct, ci) { /* called first within default beforeSend callback }
                      dataType: 'html'
    },
    debug: false
  };


/*
 * Global defaults for clueTips. Apply to all calls to the clueTip plugin.
 *
 * @example $.cluetip.setup({
 *   insertionType: 'prependTo',
 *   insertionElement: '#container'
 * });
 * 
 * @property
 * @name $.cluetip.setup
 * @type Map
 * @cat Plugins/tooltip
 * @option String insertionType: Default is 'appendTo'. Determines the method to be used for inserting the clueTip into the DOM. Permitted values are 'appendTo', 'prependTo', 'insertBefore', and 'insertAfter'
 * @option String insertionElement: Default is 'body'. Determines which element in the DOM the plugin will reference when inserting the clueTip.
 *
 */
   
  var insertionType = 'appendTo', insertionElement = 'body';

  $.cluetip.setup = function(options) {
    if (options && options.insertionType && (options.insertionType).match(/appendTo|prependTo|insertBefore|insertAfter/)) {
      insertionType = options.insertionType;
    }
    if (options && options.insertionElement) {
      insertionElement = options.insertionElement;
    }
  };
  
})(jQuery);



/**
 * Boxy 0.1.4 - Facebook-style dialog, with frills
 *
 * (c) 2008 Jason Frame
 * Licensed under the MIT License (LICENSE)
 */
 
/*
 * jQuery plugin
 *
 * Options:
 *   message: confirmation message for form submit hook (default: "Please confirm:")
 * 
 * Any other options - e.g. 'clone' - will be passed onto the boxy constructor (or
 * Boxy.load for AJAX operations)
 */
jQuery.fn.boxy = function(options) {
    options = options || {};
    return this.each(function() {      
        var node = this.nodeName.toLowerCase(), self = this;
        if (node == 'a') {
            jQuery(this).click(function() {
                var active = Boxy.linkedTo(this),
                    href = this.getAttribute('href'),
                    localOptions = jQuery.extend({actuator: this, title: this.title}, options);
                    
                if (active) {
                    active.show();
                } else if (href.indexOf('#') >= 0) {
                    var content = jQuery(href.substr(href.indexOf('#'))),
                        newContent = content.clone(true);
                    content.remove();
                    localOptions.unloadOnHide = false;
                    new Boxy(newContent, localOptions);
                } else { // fall back to AJAX; could do with a same-origin check
                    if (!localOptions.cache) localOptions.unloadOnHide = true;
                    Boxy.load(this.href, localOptions);
                }
                
                return false;
            });
        } else if (node == 'form') {
            jQuery(this).bind('submit.boxy', function() {
                Boxy.confirm(options.message || 'Please confirm:', function() {
                    jQuery(self).unbind('submit.boxy').submit();
                });
                return false;
            });
        }
    });
};

//
// Boxy Class

function Boxy(element, options) {
    
    this.boxy = jQuery(Boxy.WRAPPER);
    jQuery.data(this.boxy[0], 'boxy', this);
    
    this.visible = false;
    this.options = jQuery.extend({}, Boxy.DEFAULTS, options || {});
    
    if (this.options.modal) {
        this.options = jQuery.extend(this.options, {center: true, draggable: false});
    }
    
    // options.actuator == DOM element that opened this boxy
    // association will be automatically deleted when this boxy is remove()d
    if (this.options.actuator) {
        jQuery.data(this.options.actuator, 'active.boxy', this);
    }
    
    this.setContent(element || "<div></div>");
    this._setupTitleBar();
    
    this.boxy.css('display', 'none').appendTo(document.body);
    this.toTop();

    if (this.options.fixed) {
        if (jQuery.browser.msie && jQuery.browser.version < 7) {
            this.options.fixed = false; // IE6 doesn't support fixed positioning
        } else {
            this.boxy.addClass('fixed');
        }
    }
    
    if (this.options.center && Boxy._u(this.options.x, this.options.y)) {
        this.center();
    } else {
        this.moveTo(
            Boxy._u(this.options.x) ? this.options.x : Boxy.DEFAULT_X,
            Boxy._u(this.options.y) ? this.options.y : Boxy.DEFAULT_Y
        );
    }
    
    if (this.options.show) this.show();

};

Boxy.EF = function() {};

jQuery.extend(Boxy, {
    
    WRAPPER:    "<table cellspacing='0' cellpadding='0' border='0' class='boxy-wrapper'>" +
                "<tr><td class='top-left'></td><td class='top'></td><td class='top-right'></td></tr>" +
                "<tr><td class='left'></td><td class='boxy-inner'></td><td class='right'></td></tr>" +
                "<tr><td class='bottom-left'></td><td class='bottom'></td><td class='bottom-right'></td></tr>" +
                "</table>",
    
    DEFAULTS: {
        title:                  null,           // titlebar text. titlebar will not be visible if not set.
        closeable:              true,           // display close link in titlebar?
        draggable:              true,           // can this dialog be dragged?
        clone:                  false,          // clone content prior to insertion into dialog?
        actuator:               null,           // element which opened this dialog
        center:                 true,           // center dialog in viewport?
        show:                   true,           // show dialog immediately?
        modal:                  false,          // make dialog modal?
        fixed:                  true,           // use fixed positioning, if supported? absolute positioning used otherwise
        closeText:              '[закрыть]',      // text to use for default close link
        unloadOnHide:           false,          // should this dialog be removed from the DOM after being hidden?
        clickToFront:           true,          // bring dialog to foreground on any click (not just titlebar)?
        behaviours:             Boxy.EF,        // function used to apply behaviours to all content embedded in dialog.
        afterDrop:              Boxy.EF,        // callback fired after dialog is dropped. executes in context of Boxy instance.
        afterShow:              Boxy.EF,        // callback fired after dialog becomes visible. executes in context of Boxy instance.
        afterHide:              Boxy.EF,        // callback fired after dialog is hidden. executed in context of Boxy instance.
        beforeUnload:           Boxy.EF         // callback fired after dialog is unloaded. executed in context of Boxy instance.
    },
    
    DEFAULT_X:          50,
    DEFAULT_Y:          50,
    zIndex:             1337,
    dragConfigured:     false, // only set up one drag handler for all boxys
    resizeConfigured:   false,
    dragging:           null,
    
    // load a URL and display in boxy
    // url - url to load
    // options keys (any not listed below are passed to boxy constructor)
    //   type: HTTP method, default: GET
    //   cache: cache retrieved content? default: false
    //   filter: jQuery selector used to filter remote content
    load: function(url, options) {
        
        options = options || {};
        
        var ajax = {
            url: url, type: 'GET', dataType: 'html', cache: false, success: function(html) {
                html = jQuery(html);
                if (options.filter) html = jQuery(options.filter, html);
                new Boxy(html, options);
            }
        };
        
        jQuery.each(['type', 'cache'], function() {
            if (this in options) {
                ajax[this] = options[this];
                delete options[this];
            }
        });
        
        jQuery.ajax(ajax);
        
    },
    
    // allows you to get a handle to the containing boxy instance of any element
    // e.g. <a href='#' onclick='alert(Boxy.get(this));'>inspect!</a>.
    // this returns the actual instance of the boxy 'class', not just a DOM element.
    // Boxy.get(this).hide() would be valid, for instance.
    get: function(ele) {
        var p = jQuery(ele).parents('.boxy-wrapper');
        return p.length ? jQuery.data(p[0], 'boxy') : null;
    },
    
    // returns the boxy instance which has been linked to a given element via the
    // 'actuator' constructor option.
    linkedTo: function(ele) {
        return jQuery.data(ele, 'active.boxy');
    },
    
    // displays an alert box with a given message, calling optional callback
    // after dismissal.
    alert: function(message, callback, options) {
        return Boxy.ask(message, ['Закрыть'], callback, options);
    },
    
    // displays an alert box with a given message, calling after callback iff
    // user selects OK.
    confirm: function(message, after, options) {
        return Boxy.ask(message, ['OK', 'Отмена'], function(response) {
            if (response == 'OK') after();
        }, options);
    },
    
    // asks a question with multiple responses presented as buttons
    // selected item is returned to a callback method.
    // answers may be either an array or a hash. if it's an array, the
    // the callback will received the selected value. if it's a hash,
    // you'll get the corresponding key.
    ask: function(question, answers, callback, options) {
        
        options = jQuery.extend({modal: true, closeable: false},
                                options || {},
                                {show: true, unloadOnHide: true});
        
        var body = jQuery('<div></div>').append(jQuery('<div class="question"></div>').html(question));
        
        // ick
        var map = {}, answerStrings = [];
        if (answers instanceof Array) {
            for (var i = 0; i < answers.length; i++) {
                map[answers[i]] = answers[i];
                answerStrings.push(answers[i]);
            }
        } else {
            for (var k in answers) {
                map[answers[k]] = k;
                answerStrings.push(answers[k]);
            }
        }
        
        var buttons = jQuery('<form class="answers"></form>');
        buttons.html(jQuery.map(answerStrings, function(v) {
            return "<input type='button' value='" + v + "' />";
        }).join(' '));
        
        jQuery('input[type=button]', buttons).click(function() {
            var clicked = this;
            Boxy.get(this).hide(function() {
                if (callback) callback(map[clicked.value]);
            });
        });
        
        body.append(buttons);
        
        new Boxy(body, options);
        
    },
    
    // returns true if a modal boxy is visible, false otherwise
    isModalVisible: function() {
        return jQuery('.boxy-modal-blackout').length > 0;
    },
    
    _u: function() {
        for (var i = 0; i < arguments.length; i++)
            if (typeof arguments[i] != 'undefined') return false;
        return true;
    },
    
    _handleResize: function(evt) {
        var d = jQuery(document);
        jQuery('.boxy-modal-blackout').css('display', 'none').css({
            width: d.width(), height: d.height()
        }).css('display', 'block');
    },
    
    _handleDrag: function(evt) {
        var d;
        if (d = Boxy.dragging) {
            d[0].boxy.css({left: evt.pageX - d[1], top: evt.pageY - d[2]});
        }
    },
    
    _nextZ: function() {
        return Boxy.zIndex++;
    },
    
    _viewport: function() {
        var d = document.documentElement, b = document.body, w = window;
        return jQuery.extend(
            jQuery.browser.msie ?
                { left: b.scrollLeft || d.scrollLeft, top: b.scrollTop || d.scrollTop } :
                { left: w.pageXOffset, top: w.pageYOffset },
            !Boxy._u(w.innerWidth) ?
                { width: w.innerWidth, height: w.innerHeight } :
                (!Boxy._u(d) && !Boxy._u(d.clientWidth) && d.clientWidth != 0 ?
                    { width: d.clientWidth, height: d.clientHeight } :
                    { width: b.clientWidth, height: b.clientHeight }) );
    }

});

Boxy.prototype = {
    
    // Returns the size of this boxy instance without displaying it.
    // Do not use this method if boxy is already visible, use getSize() instead.
    estimateSize: function() {
        this.boxy.css({visibility: 'hidden', display: 'block'});
        var dims = this.getSize();
        this.boxy.css('display', 'none').css('visibility', 'visible');
        return dims;
    },
                
    // Returns the dimensions of the entire boxy dialog as [width,height]
    getSize: function() {
        return [this.boxy.width(), this.boxy.height()];
    },
    
    // Returns the dimensions of the content region as [width,height]
    getContentSize: function() {
        var c = this.getContent();
        return [c.width(), c.height()];
    },
    
    // Returns the position of this dialog as [x,y]
    getPosition: function() {
        var b = this.boxy[0];
        return [b.offsetLeft, b.offsetTop];
    },
    
    // Returns the center point of this dialog as [x,y]
    getCenter: function() {
        var p = this.getPosition();
        var s = this.getSize();
        return [Math.floor(p[0] + s[0] / 2), Math.floor(p[1] + s[1] / 2)];
    },
                
    // Returns a jQuery object wrapping the inner boxy region.
    // Not much reason to use this, you're probably more interested in getContent()
    getInner: function() {
        return jQuery('.boxy-inner', this.boxy);
    },
    
    // Returns a jQuery object wrapping the boxy content region.
    // This is the user-editable content area (i.e. excludes titlebar)
    getContent: function() {
        return jQuery('.boxy-content', this.boxy);
    },
    
    // Replace dialog content
    setContent: function(newContent) {
        newContent = jQuery(newContent).css({display: 'block'}).addClass('boxy-content');
        if (this.options.clone) newContent = newContent.clone(true);
        this.getContent().remove();
        this.getInner().append(newContent);
        this._setupDefaultBehaviours(newContent);
        this.options.behaviours.call(this, newContent);
        return this;
    },
    
    // Move this dialog to some position, funnily enough
    moveTo: function(x, y) {
        this.moveToX(x).moveToY(y);
        return this;
    },
    
    // Move this dialog (x-coord only)
    moveToX: function(x) {
        if (typeof x == 'number') this.boxy.css({left: x});
        else this.centerX();
        return this;
    },
    
    // Move this dialog (y-coord only)
    moveToY: function(y) {
        if (typeof y == 'number') this.boxy.css({top: y});
        else this.centerY();
        return this;
    },
    
    // Move this dialog so that it is centered at (x,y)
    centerAt: function(x, y) {
        var s = this[this.visible ? 'getSize' : 'estimateSize']();
        if (typeof x == 'number') this.moveToX(x - s[0] / 2);
        if (typeof y == 'number') this.moveToY(y - s[1] / 2);
        return this;
    },
    
    centerAtX: function(x) {
        return this.centerAt(x, null);
    },
    
    centerAtY: function(y) {
        return this.centerAt(null, y);
    },
    
    // Center this dialog in the viewport
    // axis is optional, can be 'x', 'y'.
    center: function(axis) {
        var v = Boxy._viewport();
        var o = this.options.fixed ? [0, 0] : [v.left, v.top];
        if (!axis || axis == 'x') this.centerAt(o[0] + v.width / 2, null);
        if (!axis || axis == 'y') this.centerAt(null, o[1] + v.height / 2);
        return this;
    },
    
    // Center this dialog in the viewport (x-coord only)
    centerX: function() {
        return this.center('x');
    },
    
    // Center this dialog in the viewport (y-coord only)
    centerY: function() {
        return this.center('y');
    },
    
    // Resize the content region to a specific size
    resize: function(width, height, after) {
        if (!this.visible) return;
        var bounds = this._getBoundsForResize(width, height);
        this.boxy.css({left: bounds[0], top: bounds[1]});
        this.getContent().css({width: bounds[2], height: bounds[3]});
        if (after) after(this);
        return this;
    },
    
    // Tween the content region to a specific size
    tween: function(width, height, after) {
        if (!this.visible) return;
        var bounds = this._getBoundsForResize(width, height);
        var self = this;
        this.boxy.stop().animate({left: bounds[0], top: bounds[1]});
        this.getContent().stop().animate({width: bounds[2], height: bounds[3]}, function() {
            if (after) after(self);
        });
        return this;
    },
    
    // Returns true if this dialog is visible, false otherwise
    isVisible: function() {
        return this.visible;    
    },
    
    // Make this boxy instance visible
    show: function() {
        if (this.visible) return;
        if (this.options.modal) {
            var self = this;
            if (!Boxy.resizeConfigured) {
                Boxy.resizeConfigured = true;
                jQuery(window).resize(function() { Boxy._handleResize(); });
            }
            this.modalBlackout = jQuery('<div class="boxy-modal-blackout"></div>')
                .css({zIndex: Boxy._nextZ(),
                      opacity: 0.7,
                      width: jQuery(document).width(),
                      height: jQuery(document).height()})
                .appendTo(document.body);
            this.toTop();
            if (this.options.closeable) {
                jQuery(document.body).bind('keypress.boxy', function(evt) {
                    var key = evt.which || evt.keyCode;
                    if (key == 27) {
                        self.hide();
                        jQuery(document.body).unbind('keypress.boxy');
                    }
                });
            }
        }
        this.boxy.stop().css({opacity: 1}).show();
        this.visible = true;
        this._fire('afterShow');
        return this;
    },
    
    // Hide this boxy instance
    hide: function(after) {
        if (!this.visible) return;
        var self = this;
        if (this.options.modal) {
            jQuery(document.body).unbind('keypress.boxy');
            this.modalBlackout.animate({opacity: 0}, function() {
                jQuery(this).remove();
            });
        }
        this.boxy.stop().animate({opacity: 0}, 300, function() {
            self.boxy.css({display: 'none'});
            self.visible = false;
            self._fire('afterHide');
            if (after) after(self);
            if (self.options.unloadOnHide) self.unload();
        });
        return this;
    },
    
    toggle: function() {
        this[this.visible ? 'hide' : 'show']();
        return this;
    },
    
    hideAndUnload: function(after) {
        this.options.unloadOnHide = true;
        this.hide(after);
        return this;
    },
    
    unload: function() {
        this._fire('beforeUnload');
        this.boxy.remove();
        if (this.options.actuator) {
            jQuery.data(this.options.actuator, 'active.boxy', false);
        }
    },
    
    // Move this dialog box above all other boxy instances
    toTop: function() {
        this.boxy.css({zIndex: Boxy._nextZ()});
        return this;
    },
    
    // Returns the title of this dialog
    getTitle: function() {
        return jQuery('> .title-bar h2', this.getInner()).html();
    },
    
    // Sets the title of this dialog
    setTitle: function(t) {
        jQuery('> .title-bar h2', this.getInner()).html(t);
        return this;
    },
    
    //
    // Don't touch these privates
    
    _getBoundsForResize: function(width, height) {
        var csize = this.getContentSize();
        var delta = [width - csize[0], height - csize[1]];
        var p = this.getPosition();
        return [Math.max(p[0] - delta[0] / 2, 0),
                Math.max(p[1] - delta[1] / 2, 0), width, height];
    },
    
    _setupTitleBar: function() {
        if (this.options.title) {
            var self = this;
            var tb = jQuery("<div class='title-bar'></div>").html("<h2>" + this.options.title + "</h2>");
            if (this.options.closeable) {
                tb.append(jQuery("<a href='#' class='close'></a>").html(this.options.closeText));
            }
            if (this.options.draggable) {
                tb[0].onselectstart = function() { return false; }
                tb[0].unselectable = 'on';
                tb[0].style.MozUserSelect = 'none';
                if (!Boxy.dragConfigured) {
                    jQuery(document).mousemove(Boxy._handleDrag);
                    Boxy.dragConfigured = true;
                }
                tb.mousedown(function(evt) {
                    self.toTop();
                    Boxy.dragging = [self, evt.pageX - self.boxy[0].offsetLeft, evt.pageY - self.boxy[0].offsetTop];
                    jQuery(this).addClass('dragging');
                }).mouseup(function() {
                    jQuery(this).removeClass('dragging');
                    Boxy.dragging = null;
                    self._fire('afterDrop');
                });
            }
            this.getInner().prepend(tb);
            this._setupDefaultBehaviours(tb);
        }
    },
    
    _setupDefaultBehaviours: function(root) {
        var self = this;
        if (this.options.clickToFront) {
            root.click(function() { self.toTop(); });
        }
        jQuery('.close', root).click(function() {
            self.hide();
            return false;
        }).mousedown(function(evt) { evt.stopPropagation(); });
    },
    
    _fire: function(event) {
        this.options[event].call(this);
    }
    
};
