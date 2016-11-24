(function ($, root, undefined) {$(function () {'use strict'; // on ready start
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////
//        general
///////////////////////////////////////

  // css tricks snippet - http://css-tricks.com/snippets/jquery/smooth-scrolling/
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 500);
          return false;
        }
      }
    });
  });

  // inserts current year
  $('.js-year').html(new Date().getFullYear());

  // detects touch device
  if ("ontouchstart" in document.documentElement){
    $('html').addClass('touch');
  }


///////////////////////////////////////
//      SVG image swap
///////////////////////////////////////

  // finds image with class and swaps .png with .svg in img source string
  if (Modernizr.svgasimg) {
    var svgSwap = $('img.js-svg-swap');
    svgSwap.each( function() {
      var currentSrc = $(this).attr('src'),
          newSrc = currentSrc.replace('.png', '.svg');
      $(this).attr('src', newSrc);
    });
  }


///////////////////////////////////////
//      Advent
///////////////////////////////////////



function adventPageToggle(){
  if($('.advent').hasClass('offer')){
    $('.advent').removeClass('offer');
    $('.advent').addClass('calendar');
    $('.advent-toggle--text').html("View today's offer");
  }else{
    $('.advent').removeClass('calendar');
    $('.advent').addClass('offer');
    $('.advent-toggle--text').html("View the advent calendar");
  }
}

$('.advent-toggle').click(function(){
  adventPageToggle();
});

$('.advent-calendar-day').click(function(){
  if($(this).hasClass('current')){
    adventPageToggle();
  }
});

function checkKey(e) {
  e = e || window.event;
  if (e.keyCode == '37') {
    // left
    if($('.advent').hasClass('calendar')){
      $('.advent').removeClass('calendar');
      $('.advent').addClass('offer');
    }
  }else if (e.keyCode == '39') {
     // right
     if($('.advent').hasClass('offer')){
       $('.advent').removeClass('offer');
       $('.advent').addClass('calendar');
     }
  }
}
document.onkeydown = checkKey;


/*/////////////////////////////////////
      Advent:
        - Show current days offer, delete others
        - Format calendar
//////////////////////////////////////*/

var currentDate = new Date();

$('.advent-calendar-day').each(function(){
  var adventDateStr = $(this).attr('data-advent-date');
  var adventDate = new Date(Date.parse(adventDateStr));
  if(adventDate.toDateString() == currentDate.toDateString()){
    $(this).addClass('current');
  }else if(adventDate < currentDate){
    $(this).addClass('past');
  }else if(adventDate > currentDate){
    $(this).addClass('future');
  }
});

$('.advent--page-offer').each(function(){
  var adventDateStr = $(this).attr('data-advent-date');
  var adventDate = new Date(Date.parse(adventDateStr));
  if(adventDate.toDateString() == currentDate.toDateString()){
  }else{
    $(this).remove();
  }
});


///////////////////////////////////////////////////////////////////////////////
});})(jQuery, this); // on ready end