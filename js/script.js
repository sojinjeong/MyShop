$(function(){
    $('body').scroll(function(){
        let sc= $(this).scrollTop();
    });
    
    $(window).scroll(function(){
        let tops = $(window).scrollTop();  
        if(tops > 0) {
           $('header').css({
              'position': 'fixed',
              'backgroundColor': 'rgba(255,255,255,0.8)',
              'top': 0,
              'width': '100%',
              'zIndex':1000
           }).addClass('fixed');
        }else{
          $('header').css({
             'position': 'static',
             'backgroundColor': 'rgba(255,255,255)',
             'top': 0,
             'width': '100%'
          }).removeClass('fixed');
        } 
     });

    $(document).on("mouseenter",'.pr-category>li',function(){
        $(this).find('.sub-cate').fadeIn();
    })
    .on("mouseleave",'.pr-category>li',function(){
        $('.pr-category>li>.sub-cate').fadeOut();
    });

    
    $('.category')
    .mouseenter(function(){
        $(this).find('.category-subnav').css('display','flex');
    }).mouseleave(function(){
        $(this).find('.category-subnav').css('display','none');
    });
    // $('.pr-category>li').hover(function(){
    //     $(this).find('.sub-cate').fadeToggle();
    // });

    $('.listview').click(function(e){
        e.preventDefault();
        const view = $(this).data("view");
        $('#pdlist>div').removeClass();
        $('.listview rect').removeClass('list-act-color').addClass('list-color');
        if(view == 3){
            $(this).find('rect').removeClass('list-color').addClass('list-act-color');
            $('#pdlist>div').addClass("col-md-4 mb-5");
        }else if(view == 4){
            $('#pdlist>div').addClass("col-md-3 mb-5");
            $(this).find('rect').removeClass('list-color').addClass('list-act-color');
        }else if(view == 5){
            $('#pdlist>div').addClass("col-md-55 mb-5");
            $(this).find('rect').removeClass('list-color').addClass('list-act-color');
        }
    })

    $('.tops').click(function(e){
        e.preventDefault();
        $('html,body').animate({
            scrollTop:0
        }, 500);
    });


    $('.news').click(function(e){
        e.preventDefault();
        let thenew;
        if($('header').css('position','fixed')){
            thenew = $('#new').offset().top - 100;
        }else{
            thenew = $('#new').offset().top - 200;
        }
        $('html,body').animate({
            scrollTop: thenew + "px"
        }, 500);
    });

    $('.hots').click(function(e){
        e.preventDefault();
        let thenew;
        if($('header').css('position','fixed')){
            thenew = $('#list').offset().top - 100;
        }else{
            thenew = $('#list').offset().top - 200;
        }
        $('html,body').animate({
            scrollTop: thenew + "px"
        }, 500);
    });

    $('.bottoms').click(function(e){
        e.preventDefault();
        $('html,body').animate({
            scrollTop: $(document).height()
        }, 500);
    });



});