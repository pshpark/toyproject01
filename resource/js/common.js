function init(){
    // header, footer 호출 (Lice Server 환경)
    $('#header').load('inc.html #header .stn',mobileBurgerMenuEvent);
    $('#footer').load('inc.html #footer .stn',goTopButtonEvent);

    // forEach for "IE"
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }

    // visual section animation start
    $(".visual.bg_filter").addClass("on");

    // Slick Slider
    $('.main_slick').slick({
        slidesToShow:3.5,
        arrows: false,
        dots: false,
        infinite: true,
        draggable: true,
        autoplay:true,
        autoplaySpeed:2000,
    });
    $('.sub_slick').slick({
        slidesToShow:3,
        arrows: true,
        dots: false,
        infinite: true,
        draggable: true,
        autoplay:true,
        prevArrow: '<button class="swiper-btn-prev01"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
        nextArrow: '<button class="swiper-btn-next01"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
        autoplaySpeed:2000,
    });
    $('.sub_slick02').slick({
        centerMode:true,
        slidesToShow:1,
        arrows: true,
        dots: false,
        infinite: true,
        draggable: true,
        lazyLoad:'progressive',
        prevArrow: '<button class="swiper-btn-prev02"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
        nextArrow: '<button class="swiper-btn-next02"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
        autoplay:true,
        autoplaySpeed:2500,
        speed:3500,
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        if (currentSlide !== nextSlide) {
            document.querySelectorAll('.slick-center + .slick-cloned').forEach(function(next){
                setTimeout(
                    function(){ next.classList.add('slick-current', 'slick-center') }
                );
            });
        }
    });
    $('.project_slick').slick({
        slidesToShow:1,
        slidesToScroll:1,
        centerMode:true,
        arrows: true,
        dots: false,
        infinite: true,
        draggable: true,
        variableWidth: true,
        autoplay:true,
        autoplaySpeed:3500,
        prevArrow: '<button class="swiper-btn-prev03"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
        nextArrow: '<button class="swiper-btn-next03"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
    });

    // masonry grid effect
    const gridArea01 = document.querySelector(".grid");
    if ( document.body.contains(gridArea01) ) {
        const msnry01 = new Masonry( '.grid', {
            itemSelector: '.grid-item',
            gutter: 20,
            horizontalOrder: true,
            fitWidth: true,
        });
    }
    const gridArea02 = document.querySelector(".grid02");
    if ( document.body.contains(gridArea02) ) {
        const msnry02 = new Masonry( '.grid02', {
            itemSelector: '.grid-item02',
            gutter: 20,
            horizontalOrder: true,
            fitWidth: true,
        });
    }
    const gridArea03 = document.querySelector(".grid03");
    if ( document.body.contains(gridArea03) ) {
        const msnry03 = new Masonry( '.grid03', {
            itemSelector: '.grid-item03',
            gutter: 24,
            horizontalOrder: true,
            fitWidth: true,
        });
    }

    // select box effect
    const selectedArea = document.querySelector(".selected_area");
    if (document.body.contains(selectedArea)) {
        const selectBox = document.querySelector(".custom_select");
        const selectList = document.querySelectorAll(".custom_select ul li");
        $("select").on("change",function(){
            selectedArea.innerHTML = this.value;
        })
        selectedArea.addEventListener("click",function(){
            selectBox.classList.toggle("on");
            selectedArea.classList.toggle("on");
        })
        for(let i=0; i<selectList.length; i++){
            selectList[i].addEventListener("click",function(){
                selectedArea.innerHTML = selectList[i].dataset.value;
                $("select").val(selectList[i].dataset.value);
                selectBox.classList.remove("on");
                selectedArea.classList.remove("on");
            })
        }
    }

    // input selected focus on
    const nameBox01 = document.querySelector("#firstName");
    const nameBox02 = document.querySelector("#lastName");
    const mailBox = document.querySelector("#email");
    const textareaBox = document.querySelector("textarea");
    const nameBoxLabel = document.querySelectorAll(".name_box");
    const mailBoxLabel = document.querySelector(".mail_box");
    const textareaBoxLabel = document.querySelector(".textarea");
    function inputFocusEvent(x,y){
        x.onfocus = function(){
            y.classList.add("on");
        }
        x.onblur = function(){
            y.classList.remove("on");
        }
    }
    if (document.body.contains(nameBox01)) {
        inputFocusEvent(nameBox01,nameBoxLabel[0]);
        inputFocusEvent(nameBox02,nameBoxLabel[1]);
        inputFocusEvent(mailBox,mailBoxLabel);
        inputFocusEvent(textareaBox,textareaBoxLabel);
    }

    // submit button event
    const btnSubmitInquire = document.querySelector(".btn_inquire");
    if (document.body.contains(btnSubmitInquire)) {
        btnSubmitInquire.addEventListener("click",function(e){
            e.preventDefault();
            $(".form.inquire_form").addClass("on");
        })
    }

    // device image scroll movement event
    const scrStn = document.querySelector('.scroll_stn');
    if (document.body.contains(scrStn)) {
        const imgMovementArea = document.querySelector(".bg_device img");
        let scrollNum = 0;
        let scrStnYTop, scrStnYBottom, scrStnUp, scrStnDown, delta, winSize;
        $(window).on('mousewheel DOMMouseScroll', function (e) {
            winSize = window.innerWidth;
            delta = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
            scrStnYTop = (scrStn.getBoundingClientRect().top + window.pageYOffset) - window.innerHeight;
            scrStnYBottom = (scrStn.getBoundingClientRect().top + window.pageYOffset) + window.innerHeight;
            scrStnUp = scrStnYTop - (window.innerHeight/4) <= window.pageYOffset;
            scrStnDown = scrStnYBottom - (window.innerHeight/4) <= window.pageYOffset;
            if( scrStnUp && !(scrStnDown) ){ // 해당 컨텐츠가 화면 안에 나타날 때 (조금이라도 보일 때)
                if( delta < 0 ){ // 스크롤을 아래로 내일 때
                    scrollNum++;
                } else { // 스크롤을 위로 올릴 때
                    scrollNum--;
                }
            }
            // 스크롤이동용 변수 수치 초기화
            if( !(scrStnUp) || (scrStnDown) ){ // 해당 컨텐츠가 화면 밖으로 벗어날 때 (위 or 아래)
                scrollNum = 0; // scrollNum을 0으로 초기화해서 이미지 bottom을 초기값으로 변경
            }
        
            if( winSize > 1024 ){
                imgMovementArea.style.bottom = 50 + (scrollNum*5) + "%";
            }
            if( winSize > 360 ){
                imgMovementArea.style.bottom = 0 + (scrollNum*2) + "%";
            }
        })
    }

    // Checkbox event (type radio)
    const btnRadio = document.querySelectorAll(".btn_radio");
    btnRadio.forEach(function(i){
        i.addEventListener("click",function(){
            btnRadio.forEach(function(v){v.classList.remove("on");})
            if( i.checked ){
                i.classList.remove("on");
            } else {
                i.classList.add("on");
            }
        })
    })

    // Mobile burgermenu button event
    function mobileBurgerMenuEvent(){
        function scrollDisable(){
            $('body').addClass('scrollDisable').on('scroll touchmove mousewheel', function(e){
                e.preventDefault();
            });
        }
        function scrollAble(){
            $('body').removeClass('scrollDisable').off('scroll touchmove mousewheel');
        }
        function removeClass(CLASSNAME){
            CLASSNAME.classList.remove("on");
        }
        function addClass(CLASSNAME){
            CLASSNAME.classList.add("on");
        }

        const gnbArea = document.querySelector(".gnb");
        const headerRightArea = document.querySelector(".hd_right_area");
        $('.btn_menu').click(function(e){
            if( gnbArea.classList.contains("on") ){
                removeClass(gnbArea);
                removeClass(headerRightArea);
                removeClass(document.body);
                this.classList.remove("on");
                scrollAble();
            } else {
                addClass(gnbArea);
                addClass(headerRightArea);
                addClass(document.body);
                this.classList.add("on");
                scrollDisable();
            }
        })
    }

    // Go Top button event
    function goTopButtonEvent(){
        $(window).scroll(function () {
            var scrollTop = $(window).scrollTop();
            if( scrollTop > 5) {
                $('.btn_top').css({
                    bottom: 20,
                    opacity: 1,
                }, 100);
            } else {
                $('.btn_top').css({
                    bottom: 10,
                    opacity: 0,
                }, 100);
            }
        });
        $('.btn_top').click(function(){
            $('html, body').animate({scrollTop: '0'}, 300);
        })
    }
}
window.onload = init;