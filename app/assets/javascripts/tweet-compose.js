$.fn.tweetCompose = function () {
  this.each(function() {
    new $.TweetCompose(this);
  });
};

$.TweetCompose = function(el) {
  this.$el = $(el);
  $.extend(this, this.$el.data());
  this.$feed = $(this.tweetUl);
  this.$el.on("submit", this.submit.bind(this));
  this.$inputs = this.$el.find(':input');
  this.$msg = this.$inputs.filter('textarea');
  this.$msg.on('input', this.countChars.bind(this));
  this.$charsLeft = this.$el.find('.chars-left');
  this.$mentions = this.$el.find('.mentioned-users');
  this.$el.find('.add-mentioned-user').on("click", this.addMentionedUser.bind(this));
  this.$mentions.on('click', '.remove-mentioned-user', this.removeMentionedUser.bind(this));
};

$.TweetCompose.prototype = {
  removeMentionedUser: function(event) {
    event.currentTarget.parentElement.remove();
  },

  addMentionedUser: function() {
    this.$mentions.append(this.$el.find('.mention-select').html());
  },

  submit: function(event) {
    event.preventDefault();
    $.ajax({
      url:"/tweets",
      type: "POST",
      dataType: "json",
      data: this.$el.serializeJSON(),
      success: function(response) {
        this.handleSuccess(response);
      }.bind(this)
    });
    this.$inputs.prop('disable', true);
  },

  handleSuccess: function(response) {
    this.$inputs.prop('disable', false);
    this.clearInputs();
    var tweetLi = $('<li>').html(JSON.stringify(response));
    this.$feed.prepend(tweetLi);
  },

  clearInputs: function() {
    this.$inputs.removeAttr('selected').filter('textarea').val('');
    this.$charsLeft.html('');
    this.$mentions.empty();
  },

  countChars: function() {
    this.$charsLeft.html(140 - this.$msg.val().length);
  }
};
