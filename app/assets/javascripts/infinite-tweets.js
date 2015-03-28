$.InfiniteTweets = function(el) {
  this.$el = $(el);
  this.$el.find('.fetch-more').on('click', this.fetchTweets.bind(this));
};

$.fn.infiniteTweets = function () {
  this.each(function() {
    new $.InfiniteTweets(this);
  });
};

$.InfinitTweets.prototype = {
  fetchTweets: function() {
    $.ajax({
      url: '/feed',
      type: 'GET',
      data: {
        num: ,
        max_created_at:
      },
      success: function(response) {
        this.insertTweets(response);
      }
    })
  },

  insertTweets: function(response) {
    var listItems = response.map(function(tweet) {
      var $li = $('<li>');
      $li.html(JSON.stringify(tweet));
    });
    this.$el.find('#feed').append(listItems);
  }
};
