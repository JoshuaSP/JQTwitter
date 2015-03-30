$.InfiniteTweets = function(el) {
  this.maxCreatedAt = null;
  this.$el = $(el);
  this.$moreTweets = this.$el.find('.fetch-more');
  this.$moreTweets.on('click', this.fetchTweets.bind(this));
  this.fetchTweets();
};

$.fn.infiniteTweets = function () {
  this.each(function() {
    new $.InfiniteTweets(this);
  });
};

$.InfiniteTweets.prototype = {
  fetchTweets: function() {
    var data = this.maxCreatedAt ? {max_created_at: this.maxCreatedAt} : {};
    $.ajax({
      url: '/feed',
      type: 'GET',
      data: data,
      dataType: 'json',
      success: function(response) {
        this.insertTweets(response);
        if (response.length < 20) {
          this.toggleMoreButton();
          return;
        }
        this.maxCreatedAt = response.slice(-1)[0].created_at;
      }.bind(this)
    });
  },

  insertTweets: function(response) {
    var listItems = response.map(function(tweet) {
      var $li = $('<li>');
      return $li.html(JSON.stringify(tweet));
    });
    this.$el.find('#feed').append(listItems);
  },

  toggleMoreButton: function() {
    this.$moreTweets.html("NO MOAR TWEETS").off().prop('disable', true);
  }
};
