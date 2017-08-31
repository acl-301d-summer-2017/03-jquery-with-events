'use strict'

// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.populateFilters = function () {
  $('article').each(function () {
    var authorName, category, optionTag
    if (!$(this).hasClass('template')) {
      authorName = $(this).attr('data-author');
      optionTag = '<option value="' + authorName + '">' + authorName + '</option>'

      if ($('#author-filter option[value="' + authorName + '"]').length === 0) {
        $('#author-filter').append(optionTag)
      }

      category = $(this).attr('data-category');
      optionTag = '<option value="' + category + '">' + category + '</option>'
      if ($('#category-filter option[value="' + category + '"]').length === 0) {
        $('#category-filter').append(optionTag)
      }
    }
  })
}

articleView.handleAuthorFilter = function () {

  $('#author-filter').on('change', function () {
    if ( $(this).val() ) {
      $('article').hide();
      var authorName = $(this).val();
      $('article[data-author = "' + authorName + '"]').fadeIn();

    } else {
      $('article').show();
    }
    $('#category-filter').val('');
  });

}

articleView.handleCategoryFilter = function () {
  $('#category-filter').on('change', function () {
    if ($(this).val()) {
      $('article').hide()
      var categoryName = $(this).val()
      $('article[data-category = "' + categoryName + '"]').fadeIn()
    } else {
      $('article').show()
    }
    $('#author-filter').val('')
  })
}

// vanilla JS
var thing = document.getElementById( 'hg1' );
thing.addEventListener( 'click', whatIsThis );

function whatIsThis () {
  console.log( 'this is', this );
}



articleView.handleMainNav = function () {
  // $( '.tab' ).on( 'click', whatIsThis );

  // $( '.main-nav' ).on( 'click', '.tab', whatIsThis );


  $('.main-nav').on('click', '.tab', function () {
    $('.tab-content').hide();

    var $clickedTab = $(this);
    var clickedTab = $clickedTab.attr('data-content'); // "about"
    console.log( 'this is ', this );
    console.log( 'clickedTab:', clickedTab );
    $('#' + clickedTab).show();

  });

  $('.main-nav .tab:first').click();
}

articleView.setTeasers = function () {

  // https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-of-type
  console.log( '.article-body:', $('.article-body' ) );
  console.log( '.article-body:', $('.article-body *' ) );
  console.log( 'stuffs:', $('.article-body *:nth-of-type(n+2)') );
  $('.article-body *:nth-of-type(n+2)').hide() // Hide elements beyond the first 2 in any article body.
  
  $('.read-on').on('click', function () {
    $('.article-body *:nth-of-type(n+2)').show()
  })
}

// TODO: Call all of the above functions, once we are sure the DOM is ready.
$(document).ready(function () {
  articleView.populateFilters()
  articleView.handleAuthorFilter()
  articleView.handleCategoryFilter()
  articleView.handleMainNav()
  articleView.setTeasers()
})
