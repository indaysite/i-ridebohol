$(document).ready( function() {      
   slider();
   toggleMapForm();
   clickCallRent();
   backToTop();
   detailBlock();
})


function slider() {  
   $('.thumb-item').click( function() {
      var $this = $(this),
          slideWidth = parseInt($('#slide .slide-container .slide-item').width()),
          position = $this.parent().children().index($this);

      if ( $this.hasClass('active-thumb') ) {
         return;
      } else {
         $('.slide-item').eq(position).addClass('reserve-slide');
         $('.slide-container').find('.active-slide').animate({left: - (slideWidth + 100) }, 700, function() {
            $(this).css('left', '');
            $('.slide-item').removeClass('active-slide reserve-slide').eq(position).addClass('active-slide').find('.slide-img').addClass('show-slide-img');
            
            $('.thumb-item').removeClass('disable-thumb');
         });
      }
      $('.thumb-item').addClass('disable-thumb');
      $('.thumb-item').removeClass('active-thumb').eq(position).addClass('active-thumb');
   });

   var autoSlide = function() {            
      interval = setInterval(
         function() {
            var $this = $('.active-slide'),
                marLeft = $(window).width() * 2,
                childCount = $('.slide-item').length,
                position = $this.parent().children().index($this);
            
            if ( position < childCount - 1) {
               $this.next().addClass('reserve-slide');
               $('.active-thumb').removeClass('active-thumb').next().addClass('active-thumb');
               $this.animate({left: - marLeft}, 2000, function() {
                  $('.slide-item').css('left', '');
                  $('.slide-item').removeClass('reserve-slide');
                  $this.removeClass('active-slide').next().addClass('active-slide');
               });      
            } else {                  
               $('.slide-item').first().addClass('reserve-slide');
               $('.thumb-item').removeClass('active-thumb').first().addClass('active-thumb');
               $this.animate({left: - marLeft}, 2000, function() {
                  $('.slide-item').css('left', '');
                  $('.slide-item').removeClass('reserve-slide');
                  $('.slide-item').removeClass('active-slide').first().addClass('active-slide');
               });
            }
         }, 5000); 
   }
   
   $('.slide-container').hover(function() {
      clearInterval(interval);
   });
   
   $('.slide-container').mouseleave(function() {
      autoSlide();
   });
      
   autoSlide();   
}

function toggleMapForm() {   
   $('.or').on('click', '.toggle', function() {
      var $this = $(this),
          slideWidth = $('.form-map').width();
      
      if ( $this.hasClass('or-toggled') ) {
         $this.removeClass('or-toggled');
         $('.form-map-container').animate({left: ''}, 700);   
      } else {
         $this.addClass('or-toggled');
         $('.form-map-container').animate({left: - slideWidth}, 700);               
      }      
   });
   
   $('html').on('click', '.toggle-form-map', function() {
      var $this = $(this),
          slideWidth = $('.rent-lb-form-map').width();  
      
      if ( $this.hasClass('toggled') ) {
         $this.removeClass('toggled');
         $('.form-map-container').animate({left: ''}, 700);
      } else {
         $this.addClass('toggled');
         $('.form-map-container').animate({left: - slideWidth}, 700);
      }    
   });
   
   $('.toggled-info-map').click( function() {
      var $this = $(this),
          slideWidth = $('.overflow-hidder').width(),
          slideTo = $('.info-map-container');
      
      if ( $this.hasClass('info-nav') ) {
         slideTo.animate({left: ''}, 700);
         slideTo.find('.map').removeClass('active-map');
         $this.parent().children().removeClass('toggled');
         $this.addClass('toggled');
      } else {
         slideTo.animate({left: - slideWidth}, 700);         
         slideTo.find('.map').addClass('active-map');
         $this.parent().children().removeClass('toggled');
         $this.addClass('toggled');
      }
   });
   
}

function clickCallRent() {
   $('html').on('click', '.call', function(event) {
      event.preventDefault();   
      
      $('body').css('overflow', 'hidden');
      $('.lightbox-call').addClass('active-lightbox');
      $('.lightbox-rent').removeClass('active-lightbox');
   });
   
   $('html').on('click', '.rent-now', function(event) {
      event.preventDefault();      
      
      function inputWidth() {
         var $this = $('input[name="selected"]'),
             thisWidth = $('input[name="selected"]').val().length;
         
         $this.css({'width' : ((thisWidth + 1) * 10) + 'px' });
      }
             
      $('body').css('overflow', 'hidden');
      $('.lightbox-rent').addClass('active-lightbox');
      
      inputWidth();  
   })
   
   $('body').on('click', '.close', function () {
      $('body').css('overflow', 'auto');
      $('.lightbox').removeClass('active-lightbox');   
   })
}

function backToTop(){
   var $this = $('.back-to-top'),
       dHeight = $(document).height();
   
   var bttVisible = function() {
      var st = $(window).scrollTop();
      
      if ( st > dHeight / 5 && dHeight > 1700) {
         $this.addClass('active-btt');      
      } else {
         $this.removeClass('active-btt');
      }
   }   
   
   $(window).scroll(bttVisible);
   bttVisible();
   
   $('.back-to-top').on('click', function() {
      $('html,body').animate({
         scrollTop: 0
      }, 800);
   });
}

function detailBlock() {
   var $this = $('html .details-flex'),
       width = $this.width();
   
   if ( width < 285 ) {
      $this.addClass('details-block');
   } else {
      $this.removeClass('details-block');
   }
}
