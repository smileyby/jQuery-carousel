~function(options){
	var $container = $('#container'),
		$wrapper = $container.children('.wrapper'),
		$focusBox = $container.children('.focusBox'),
		$arrowLeft = $container.children('.arrowLeft'),
		$arrowRight = $container.children('.arrowRight');
	var $slideList = null,
		$imgList = null,
        $focusList = null,
        bannerData = null;

	//=> init parameters
    var _default = {
        initIndex: 0,
        autoInterval: 2000,
        showFocus: true,
        needFocus: true,
        eventFocus: 'mouseenter',
        showArrow: true,
        eventArrow: 'click',
        needAuto: true
    };
    options && $.each(options,  function(key, value){
       if (options.hasOwnProperty(key)){
           _default[key] = value;
       }
    });
    var initIndex = _default.initIndex,
        autoInterval = _default.autoInterval,
        showFocus = _default.showFocus,
        needFocus = _default.needFocus,
        eventFocus = _default.eventFocus,
        showArrow = _default.showArrow,
        eventArrow = _default.eventArrow,
        needAuto = _default.needAuto;



	//=> get data and bind data
    ~function(){
        $.ajax({
            url: 'json/banner.json',
            method: 'get',
            dataType: 'json',
            async: false,
            success: function(res){
                bannerData = res;
            }
        });

        var str = ``,
            strFocus = ``;
        $.each(bannerData,  function(index, item){
            str += `<li class="slide"><img src="" data-img="${item.images}" alt=""></li>`;

            if (showFocus){
                strFocus += `<li class="${index === bannerData.length-1?'last':''}"><a href=""></a></li>`;
            }
       });
        $wrapper.html(str);
        showFocus ? $focusBox.html(strFocus) : null;

        //=> get element
        $slideList = $wrapper.children();
        $imgList = $wrapper.find('img');
        showFocus ? $focusList = $focusBox.children() : null;
    }();

    //=> init show
    ~function(){
        $slideList.css({
            opacity: 0,
            zIndex: 0
        }).eq(initIndex).css({
            opacity: 1,
            zIndex: 1
        });

        if (showFocus){
            $focusList.removeClass('select')
                .eq(initIndex).addClass('select');
        }
    }();

    //=> lazy img
    $(window).on('load', function(){
        $imgList.each(function(index, item){
            var tempImg = new Image;
            tempImg.onload = function(){
                item.src = this.src;
                item.style.display = 'block';
                tempImg = null;
            };
            tempImg.src = $(item).data('img');
        });
    });

    //=> change banner
    var autoTimer = null,
        count = bannerData.length;

    needAuto ? autoTimer = setInterval(autoMove, autoInterval) : null;

    function autoMove(){
        initIndex += 1;
        initIndex === count? initIndex = 0 : null;
        change();
    }

    //=> other change
    $container.on('mouseenter', function(){
        needAuto ? clearInterval(autoTimer) : null;

        if (showArrow){
            $arrowLeft.css('display', 'block');
            $arrowRight.css('display', 'block');
        }
    }).on('mouseleave', function(){
        needAuto ? autoTimer = setInterval(autoMove, autoInterval) : null;

        if (showArrow){
            $arrowLeft.css('display', 'none');
            $arrowRight.css('display', 'none');
        }
    });

    if (showArrow){
        $arrowRight.on(eventArrow, autoMove);
        $arrowLeft.on(eventArrow, function(){
            initIndex -= 1;
            initIndex < 0? initIndex = count - 1 : null;
            change();
        });
    }


    if (showFocus && needFocus){
        $focusList.on(eventFocus, function(){
            initIndex = $(this).index();
            change();
        });
    }

    //=> change
    function change(){
        var $curSlide = $slideList.eq(initIndex);
        $curSlide.css('zIndex', 1)
            .siblings().css('zIndex', 0);
        $curSlide.stop().animate({opacity:1},200,function(){
            $(this).siblings().css('opacity', 0);
        });

        //=> focus
        if (showFocus){
            $focusList.eq(initIndex).addClass('select')
                .siblings().removeClass('select');
        }
    }

}();