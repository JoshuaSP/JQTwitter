$.UsersSearch = function(el) {
  this.$el = $(el)
  this.$input = this.$el.find('input');
  this.$users = this.$el.find('ul.users');
  this.$input.on('input', this.handleInput.bind(this));
}

$.fn.usersSearch = function() {
  return this.each(function() {
    new $.UsersSearch(this);
  });
}


$.UsersSearch.prototype = {
  handleInput: function(event) {
    $.ajax({
      url: "/users/search",
      type: "GET",
      data: "query=" + this.$input.val(),
      dataType: 'json',
      success: function(response) {
        this.renderResults(response);
      }.bind(this)
    })
  },

  renderResults: function(response) {
    var $userList = $('<ul></ul>')
    Array.prototype.slice.call(response).forEach(function(userObj) {
      var $userName = $("<li>" + userObj.username + "</li>");
      var $button = $('<button class="follow-toggle"></button>');
      $button.attr({
        'data-user-id': userObj.id,
        'data-follow-state': userObj.followed ? "followed" : "unfollowed"
      });
      $userList.append($userName.append($button));
    })
    this.$users.html($userList.html());
    this.$users.find('button.follow-toggle').followToggle()
  }
}
