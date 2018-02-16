$(document).ready(function(){
  var $body = $('body');
  var startIndex = 0;
  var currentUser = $('.currentUser').text();

  /* create Twit elements and add them to feed */
    // ToDo - want to reverse the feed so newest elements always on top
      // possible solution:
        // $('.content').first('.twit').prepend($twit);
        // $twit.appendTo('.content');

  if (currentUser === 'Me') {
    getAllTwits(startIndex);
  } else {
    getUserTwits(currentUser, startIndex);
  }

  function getAllTwits(startPoint) {
    var $content = $('.content');
    var allTwits = streams.home.slice(startPoint);
    allTwits.forEach(function(ele, i) {
      var twit = streams.home[i];
      var $twit = $('<article class="twit ' + twit.user + '" />');

      $twit.html('<a href="#">@' + twit.user + '</a>:<blockquote> ' +     twit.message + '</blockquote><time>' + twit.created_at + '</time>');
      $content.append($twit);
    });

    startIndex = streams.home.length - 1;
  }

  function getUserTwits(person, startPoint) {
    var $content = $('.content');
    var userTwits = streams.users[person].slice(startPoint);
    userTwits.forEach(function(ele, i) {
      var twit = ele
      var $twit = $('<article class="twit ' + twit.user + '" />');

      $twit.html('<a href="#">@' + twit.user + '</a>:<blockquote> ' +     twit.message + '</blockquote><time>' + twit.created_at + '</time>');
      $content.append($twit);
    });
    startIndex = streams.users[person].length - 1;
  };

  function checkForNewTwits(){
    if ((streams.home.length - 1) - startIndex > 10) {
      $('#update').slideDown();
    }
    setTimeout(checkForNewTwits, 500);
  };

  checkForNewTwits();

  $('#update').on('click', function() {
      alert(startIndex);
      getAllTwits(startIndex);
      startIndex = streams.home.length - 1;
    $('#update').slideUp();
  });

});














  /* populate following list */
      // not using
  function getFollowees() {
    var index = users.length - 1;
    while (index >= 0) {
      var followee = users[index];
      var $followee = $('<div class="followee"></div>');
      $followee.text(users[index]);
      $followee.appendTo('.following');
      index -= 1
      $followee.click(filterByUser)
    }
  };

  // getFollowees();

  /* filter feed */
    // not using
  $('.dropdown').on('click', function() {
    $('.dropDownList').toggle();
  });

  function populateFilter() {
    var allFollowees = users;
    allFollowees.forEach(function(ele, i) {
      var $followee = $('<div class="followee"></div>');
      $followee.text(ele);
      $followee.appendTo('.dropDownList');
      $followee.click(filterByUser)
    });
  }

  $('.all').on('click', function (){
    filterByUser();
  });

  // populateFilter();

  function filterByUser() {
    var $name = $(this).text();
    if ($name === '') {
      $('.twit').show();
    } else {
      $('.twit').hide();
      $('.' + $name).show();
    }
  }

