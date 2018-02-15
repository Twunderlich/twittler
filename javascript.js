      $(document).ready(function(){
        var $body = $('body');
        var startIndex = 0;
        var currentTime = new Date();

        // var usersObjects = [];
        // users.forEach(function(val, i) {
        // usersObjects.push({name: val, startIndex: 0});
        // });

        // var counter = 0;
        // var updateTime = function(timeStamp) {
        //   counter += 1
        //   setTimeout(updateTime, 60000);
        // }
        // updateTime();


        // populate following list

        var getFollowees = function() {
          var index = users.length - 1;
          while (index >= 0) {
            var followee = users[index];
            var $followee = $('<div class="followee"></div>');
            $followee.text(users[index]);
            $followee.appendTo('.following');
            index -= 1
          }
        };

        getFollowees();

        // create Twit elements and add them to feed
          // want to reverse the feed so newest elements always on top

        function getAllTwits(startPoint) {
          var $content = $('.content');
          var newTwits = streams.home.slice(startPoint);
          startIndex = streams.home.length - 1;
          newTwits.forEach(function(ele, i) {
            var twit = streams.home[i];
            var $twit = $('<article class="twit active ' + twit.user + '" />');

            $twit.html('<a href="#">@' + twit.user + '</a>:<blockquote> ' +     twit.message + '</blockquote><time>' + twit.created_at + '</time>');
            $content.append($twit);
          });

        }

        // var getAllTwits = function(startPoint) {
        //   var index = streams.home.length - 1;
        //   var tempStartIndex = streams.home.length
        //   while (index >= startPoint) {
        //     var twit = streams.home[index];
        //     var $twit = $('<div class="twit"></div>');
        //     $twit.text('@' + twit.user + ': ' + twit.message + ' - ' + twit.created_at);
        //     $twit.appendTo($('.content'));
        //     index -= 1;
        //   }
        //   startIndex = tempStartIndex;
        // };

        getAllTwits(startIndex);

        // shows 'show new twits' button
        var checkForNewTwits = function(){
          if ((streams.home.length - 1) - startIndex > 10) {
            $('#update').slideDown();
          }
          setTimeout(checkForNewTwits, 500);
        };

        checkForNewTwits();

        // get twits per indiviual (not currently used)
        var getTwits = function(person) {
          var twitter = person;
          var index = streams.users[twitter].length - 1;
          while (index >= 0) {
            var twit = streams.users[twitter][index];
            var $twit = $('<div class= "twit"></div>')
            $twit.text('@' + twit.user + ': ' + twit.message);
            $('.content').first('.twit').prepend($twit);
            $twit.appendTo('.content');
            index -= 1;
          }
        };


      // update feed button
        $('#update').on('click', function() {
          // alert(startIndex);
          if (streams.home.length - 1 > startIndex) {
            getAllTwits(startIndex);
          }
          $('#update').slideUp();
        });

      // select individual user
        $('.followee').on('click', function() {
          var $name = $(this).text();
          $('.active').hide();
          $('.active').remove("active");
          $('.' + $name).addClass("active")
          $('.active').show();
        });

      });