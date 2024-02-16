//$(function(){
   $(document).ready(function(){
      $('.img-thumb-box>img').click(function(){
          const src = $(this).attr('src');
          $('.img-box>img').attr('src', src);  
      });
      $('.colors input[type=radio]').click(function(){
          const color = $(this).val();
          //alert(color);
          $('.selected').text(color+'색');
      });   
  
      
  
  //상품가격 계산
  const prcode = $("#prcode").val();
     const prprice = Number($('#prprice').val());
     const reserves = parseInt($("#reserves").val()); 
     const delivery = parseInt($("#delivery").val());
     const prtitle = $("#title").val();
     let totalmoney = prprice;
     let tmoney = prprice; 
     let totalTextLength, opt1, opt11, colortxt, color, opt2, opt21, size, sizetxt, optionText; //밖에서 미리 전부 선언해야 아래 함수 먹힘
   
     $('input[name="color"]').change(function(){
      $('.size').find("option:first").prop("selected", true); //html에서 사이즈선택 후 초기화
      opt1 = Number($(this).data('color')); //추가금액
      colortxt = $(this).data("colorname"); //컬러값 잡는방법
      color = $(this).val();                //폼으로 전송할 색상값 (orders1)
      //console.log(opt1, colortxt, color);
      if(opt1 > 0){
          opt11 = "(+" + opt1.toLocaleString() + "원)"; //Number타입으로 받아놓고 여기서 문자열로 받음!
      }else{
          opt11 = "";
      }
      colortxt += " " + opt11;             //화면에 출력할 색상이름 (orders2)
      $('.size').attr('disabled', false); //컬러선택 후 사이즈 박스 disabled(비활성화) -> 활성화시킴 (orders3)
     });
     
     let opthtml = `
     <ul class="add-opt">
           <li class="d-flex align-items-center">
              <div class="total-text col"></div>
              <ul class="add-opts col">
                 <li class="addbox d-flex align-items-center">
                 <label class="title-label">수량</label>
                 <div class="input-group">
                    <div class="input-group-prepend">
                       <button class="btn btn-outline-line qdown" type="button">
                          <i class="fa-solid fa-chevron-down"></i>
                       </button>
                    </div>
                    <input type="number" 
                             class="quantity"                           
                             name="quantity[]" 
                             readonly>
                    <div class="input-group-append">      
                          <button class="btn btn-outline-line qup" type="button">
                             <i class="fa-solid fa-chevron-up"></i>
                          </button>
                    </div>                 
                 </div>
              </li>
         </ul>
         <input type="hidden" name = "subtitle[]" class="subtitle">
         <input type="hidden" name = "toptmoney[]" class="toptmoney">
         <div class="tomoney col text-right"></div>
         <i class="fa-solid fa-close remove-order"></i> 
          
     </li>  
   </ul>`;
  
     $('.size').change(function(){
      totalTextLength = $('.total-text').length; //totalTextLength 갯수를 구하고(11)
      //console.log(totalTextLength);
      const oradd = $('.addquantity').html();
      //console.log(oradd); 주문상품창 console로 뜨는지 확인...실시간으로 추가되는값이 추가되는거라 확인x
      let quantityArray = [];  //quantity value 값을 따로 읽어서 배열에 저장
      for (let i = 0; i < $('.quantity').length; i++){
         quantityArray[i] = $('.quantity').eq(i).val();
      } 

      const livequantity = $(".quantity").eq(totalTextLength).val();
      opt2 = Number($(this).find("option:selected").data('size')); //추가금액
      size = $(this).find("option:selected").val(); //사이즈값 잡는방법
      sizetxt = $(this).find("option:selected").text();
      //console.log(opt2, size);
      if(opt2 > 0){
          //totalmoney += opt2;
          opt21 = "(+" + opt2.toLocaleString() + "원)";
      }else{
          opt21 = "";
      }
      //console.log(size); 사이즈 잘 찍히나 점검
      if(size){ //size의 폼이 계속 만들어지는 구간
          //totalmoney += (opt1 + opt2); //최초의 상품가격에 계속 더해지는거라 최초의 prprice로 바꿔야 금액++ 안됨 85번줄로 수정
          tmoney = prprice + (opt1 + opt2); //totalmoney -> tmoney로 수정
          sizetxt += " " + opt21; 
          optionText = `<p>${colortxt}-${sizetxt}</p>`;
          $('.addquantity').html(oradd + opthtml);

          for(let i = 0; i < $('.quantity').length; i++){
            $('.quantity').eq(i).val(quantityArray[i]);
          }
          $('.subtitle').eq(totalTextLength).val(`${colortxt}-${sizetxt}`); //input type hidden 에 정보 저장
          $('.toptmoney').eq(totalTextLength).val(tmoney); //가격 저장
          $('.total-text').eq(totalTextLength).html(optionText); //totalTextLength 갯수를 구하고 eq로 순서 정렬(22) 
          $('.quantity').eq(totalTextLength).val(1);
          $('.tomoney').eq(totalTextLength).html(tmoney.toLocaleString()+"원"); // totalmoney -> tmoney로 수정
          $('#submit, #cart').attr('disabled', false);
          totalMoney(delivery);
      }    
     });
  
  
  
  
     //$('#qup').click(function(){
      $(document).on('click', '.qup', function(){  //예전엔 live로 썼는데 on으로 통일시킴
        let quantity = Number($(this).parent().prev().val()); //부모 이전의 형제
        //let quantity = Number($('.quantity').eq(totalTextLength).val());
        quantity += 1;
        if(quantity > 9){
           alert("최대수량입니다.");
           quantity = 9;
        }
      //   let ind = $('.qup').index(this);
        //$('.quantity').eq(totalTextLength).val(quantity);
        $(this).parent().prev().val(quantity);
        tmoney = $(this).parents('.add-opt').find('.toptmoney').val();
        let ttmoney = tmoney * quantity; //totalmoney를 일일히 계산해야함 
        ttmoney = ttmoney.toLocaleString();
        $(this).parents('.add-opt').find('.tomoney').html(ttmoney + "원");
      //   $('.tomoney').eq(ind).html(tmoney + "원");
        let txt = "총 상품금액(수량) : <strong>"+ttmoney+"원</strong>("+quantity+"개)";
        $('.totalmoney').html(txt);
        totalMoney(delivery);
     });
  
     //$('#qdown').click(function(){
      $(document).on('click', '.qdown', function(){ //예전엔 live로 썼는데 on으로 통일시킴
        //let quantity = Number($('.quantity').eq(totalTextLength).val());
        let quantity = Number($(this).parent().next().val());
        quantity -= 1;
        if(quantity < 1){
           quantity = 1;
        }
        //$('.quantity').eq(totalTextLength).val(quantity);
        $(this).parent().next().val(quantity);
        tmoney = $(this).parents('.add-opt').find('.toptmoney').val();
        let ttmoney = tmoney * quantity; //totalmoney를 일일히 계산해야함 
        ttmoney = ttmoney.toLocaleString();
        $(this).parents('.add-opt').find('.tomoney').html(ttmoney + "원");


       
        totalMoney(delivery);
     });
  
     //주문 수량추가 후 엑스하면 
     $(document).on('click', '.remove-order', function(){
        $(this).parents('.add-opt').remove(); //remove-order가 속한 조상중의 add-opt를 지우고 add-opt의 아이들 빼라
        if($('.addquantity').children().hasClass('add-opt')){
         totalMoney(delivery);
        }else{
         $('.size').find("option:first").prop("selected", true);
         $('#submit,#cart').attr('disabled',true);
         $('.totalmoney').html('');
        }

     });

     //본문 상세보기 스크립트
     $('.nav-pills li').click(function(){
      $('.nav-pills>li').removeClass('active');
      $(this).addClass('active');

      
     });
     viewReview();

     //리뷰 슬릭
     
     $('#review').show(function(){
      $('.review-photo').slick({
        slidesToScroll:1,
        slidesToShow:11,
        centerMode: true,
        focusOnSelect: true
      });

   });



     
  });//jquery


  //리뷰 퍼센트 보기 함수
  function viewReview(){
   $('.box-line-color').each(function(){
      let h = $(this).css('height');
      $(this).html("<span>"+h+"</span>")
   });
  }
         
  function totalMoney(delivery){
   let tm = 0;
      $("input[name='toptmoney[]']").each(function(index){
         let moneyVal = parseInt($(this).val());
         if(moneyVal){}
         let qt = parseInt($(".quantity").eq(index).val());
         tm += moneyVal*qt;
         //배송정책
         if(tm > 200000){
            delivery = 0;
         }
         let txt = "총 상품금액(수량) : <strong>"+tm.toLocaleString()+"원</strong>+(배송비 : "+ delivery.toLocaleString() +"원)";
         $('.totalmoney').html(txt);
     });
   
    
  }
   