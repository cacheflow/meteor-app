Meteor.subscribe("thePlayers");

Template.leaderboard.helpers({
  player:function(){
    var currentUserId = Meteor.userId();
    return PlayersList.find({}, {sort: {score: -1, name: 1}});
    // return PlayersList.find().fetch();

  }, 
  'selectedClass': function(){
    var playerId = this._id;
    var selectedPlayer = Session.get("selectedPlayer");
    if(playerId == selectedPlayer){
      return "selected"
    }
  }
})

Template.leaderboard.events({
  "click .player":function(){
    var playerId = this._id;
    Session.set('selectedPlayer', playerId);
    $('.increment, .decrement, .remove').show();

    // Session.get('selectedPlayer');
    // console.log(Session.get('selectedPlayer'));
  }, 

  "click .remove":function(){
    var selectedPlayer = Session.get("selectedPlayer");
    Meteor.call('removePlayerData', selectedPlayer);
  },

  "click .decrement":function(){
    var selectedPlayer = Session.get("selectedPlayer");
    Meteor.call('modifyPlayerScore', selectedPlayer, -5);
  },

  "click .increment":function(){
    var selectedPlayer = Session.get("selectedPlayer");
    Meteor.call("modifyPlayerScore", selectedPlayer, 5);
  }
})

Template.addPlayerForm.events({
  'submit form': function(event){
    event.preventDefault();
    var playerNameVar = event.target.playerName.value
    Meteor.call("insertPlayerData", playerNameVar);  
  }
});


