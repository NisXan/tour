import COUNTRIES from './countries.json'
import TYPE from './countries.json'

$(function() {
  //Menu open/close
  $('.menu__burger').click(() => {
    if ($('.menu__burger').hasClass('active')) {
      $('body').removeClass('fixed');
      $('.menu').removeClass('active');
      $('.menu__burger').removeClass('active');
      $('.menu__container').removeClass('active');
    } else {
      $('body').addClass('fixed');
      $('.menu').addClass('active');
      $('.menu__burger').addClass('active');
      $('.menu__container').addClass('active');
    }
  });

  const CloseMenu = () => {
    $('body').toggleClass('fixed');
    $('.menu').toggleClass('active');
    $('.menu__burger').toggleClass('active');
    $('.menu__container').toggleClass('active');
  }

  $('body').click((e) => {
    if ($(e.target).hasClass('fixed')) {
      CloseMenu()
    }
  });


  //slider initialis
  const init_slider = () => {
    if ($(window).width() >= 1024) {
      $('.hot__container.carousel').slick({
        slidesPerRow: 2,
        rows: 2
      })
    }
  }

  $('.popular__container.carousel').slick({
    slidesToShow: 2,
    slidesToScroll: 2,
    infinite: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          variableWidth: true,
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  })
  

  
  //Filtering by Tags
  const $slider = $('.hot__container.carousel');
  const $slider_clone  = $slider.clone( true, true );
  const $new_slider = $slider_clone.clone( true, true );
  let filtered = false;

  init_slider();

  $('.tags').click((e) => {
    let filter = $(e.target).data('countries');    
    let $new_slider = $slider_clone.clone( true, true );
    const sliderError = $('.hot__filter--empty');
    sliderError.removeClass('active');
    $slider.slick( 'unslick' );
    $slider.empty();

    if (filtered === true) {
      $('.hot__filter--item').removeClass('active');
      $slider.append( $new_slider.find( '.card' ) );
      filtered = false;
    } else {
      $('.hot__filter--item').removeClass('active');
      $slider.append( $new_slider.find( '.card.' + filter ) );
      $(`.hot__filter--item[data-countries=${filter}]`).addClass('active');      
      if ($($slider)[0].innerText == '') {
        sliderError.addClass('active');
      }
      filtered = true;
    }
    init_slider();
  });

  $(window).resize((e) => {
    $('.hot__container .card:lt(' + cardNum + ')').css('display','inline-flex');
    if ($(window).width() < 1024) {
      if ($('.hot__container.carousel').hasClass('slick-initialized')) {
        $('.hot__container.carousel').slick( 'unslick' );
      }
    } else {
      if (!$('.hot__container.carousel').hasClass('slick-initialized')) {
        init_slider();
      }
    }
  })

  //mobile card loader
  let cardNum = 3;
  let cardSum = 0;
  $('.hot__container .card:lt(' + cardNum + ')').css('display','inline-flex');
  $('.hot__filter--loader').click(() => {
    $(".hot__container .card").each((i) => {
      cardSum = i+1;      
    })
    cardNum = (cardNum + 3 <= cardSum) ? cardNum + 3 : cardSum;
    $('.hot__container .card:lt(' + cardNum + ')').css('display','inline-flex');
    $('html, body').stop().animate( {
      'scrollTop': $(`.hot__container .card:eq(${cardNum - 3})`).offset().top - 70
    }, 300 );
    if (cardNum == cardSum) {
      $('.hot__filter--loader').hide()
    }
  })



  //Select open/close
  $('.selector').click(function(e) {    
    if ($(e.target).hasClass('selector__optgroup')) {
      $(e.target).toggleClass('expanded');
    } else {      
      $('.selector').not(this).removeClass('expanded');
      $(e.target).toggleClass('expanded');
      $('#'+$(e.target).attr('for')).prop('checked',true);
    }
  });
  $(document).click(function(e) {
    if ($(e.target).is(":not(.selector)")) {
      if (!$(e.target).is(".selector *")) {
        $('.selector').removeClass('expanded');
      }      
    }
  });

  //Menu select fill
  const $selectCountries = $("#countries > .selector__container");
  $.each(COUNTRIES, (i, optgroups) => {
    $.each(optgroups, (groupName, options) => {
      const $optgroup = $(`<div class="selector__optgroup">${groupName}</div>`);
      $optgroup.appendTo($selectCountries);

      $.each(options, (j, option) => {
        const $option = $(`<input class="selector__option" type="radio" name="sortType" value="${option.name}" id="${option.name}"><label for="${option.name}">${option.name}</label>`);
        $option.appendTo($optgroup);
      });
    });
  });

  const $selectType = $("#type > .selector__container");
  $.each(TYPE, (i, optgroups) => {
    $.each(optgroups, (groupName, options) => {
      const $optgroup = $(`<div class="selector__optgroup">${groupName}</div>`);
      $optgroup.appendTo($selectType);

      $.each(options, (j, option) => {
        const $option = $(`<input class="selector__option" type="radio" name="sortType" value="${option.name}" id="${option.name}"><label for="${option.name}">${option.name}</label>`);
        $option.appendTo($optgroup);
      });
    });
  });


  //agree popup
  const popup = $('#popup');
  const cheked =  $('.agree-init');

  const Popup = () => {
    $(popup).addClass('close-popup');
    $('html').css('overflow', 'hidden');
    $('body').css('overflow', 'hidden');
  }
  const ClosePopup = () => {
    $(popup).removeClass('close-popup');
    $('html').css('overflow', 'initial');
    $('body').css('overflow', 'initial');
  }

  $('body').click((e) => {
    if ($(e.target).hasClass('close-popup')) {
      ClosePopup();
    } else if ($(e.target).hasClass('popup-init')) {      
      e.preventDefault();
      cheked.prop('checked',false);
      Popup();
    } else if ($(e.target).hasClass('agreed')) {
      cheked.prop('checked',true);
      ClosePopup();
    } else if ($(e.target).hasClass('disagreed')) {
      cheked.prop('checked',false);
      ClosePopup();
    }
  });

  $('.callback-init').click(() => {
    CloseMenu();
    $('html,body').animate({scrollTop: $('#callback').offset().top},'slow');
  })
})