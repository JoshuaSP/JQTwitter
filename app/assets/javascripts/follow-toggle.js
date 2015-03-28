$.FollowToggle = function(el) {
  this.$el = $(el);
  $.extend(this, this.$el.data());
  this.render();
  this.$el.on("click", this.handleClick.bind(this))
}

$.fn.followToggle = function () {
  return this.each(function () {
    new $.FollowToggle(this);
  });
}

$.FollowToggle.prototype = {
  render: function() {
    if (this.followState.slice(-3) === "ing") {
      this.$el.prop("disabled", true);
    } else {
      this.$el.prop("disabled", false);
    }

    this.$el.html(function() {
      if (this.followState === "followed") {
        return "Unfollow!"
      } else if (this.followState === "unfollowed") {
        return "Follow!"
      }
    }.bind(this)());
  },

  handleClick: function(event) {
    event.preventDefault();
    var type;
    if (this.followState !== "followed") {
      type = "POST";
      this.followState = "following";
    } else {
      type = "DELETE";
      this.followState = "unfollowing";
    }

    $.ajax({
      url: "/users/" + this.userId + "/follow",
      type: type,
      dataType: "json",
      success: function () {
        this.followState = this.followState.slice(0, -3) + 'ed';
        this.render()
      }.bind(this)
    });
  }
}
