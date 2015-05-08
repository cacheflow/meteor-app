PlayersList = new Mongo.Collection('players');
// PlayersList.insert({name: "lex", score: 3, name: "tom", score: 0});

if(Meteor.isClient) {
  Template.leaderboard.helpers({
    player:function(){
      var currentUserId = Meteor.userId();
      return PlayersList.find({createdBy: currentUserId}, 
        {sort: {score: -1, name: 1}});

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
      PlayersList.remove(selectedPlayer);
    },

    "click .decrement":function(){
      var selectedPlayer = Session.get("selectedPlayer");
      PlayersList.update(selectedPlayer, {$inc: {score: -5} });
    },

    "click .increment":function(){

      var selectedPlayer = Session.get("selectedPlayer");
      PlayersList.update(selectedPlayer, {$inc: {score: 5} });
    }
  })

  Template.addPlayerForm.events({
    'submit form': function(event){
      event.preventDefault();
      var playerNameVar = event.target.playerName.value;
      var currentUserId = Meteor.userId();
      PlayersList.insert({
        name: playerNameVar, 
        score: 0,
        createdBy: currentUserId
      });
    }
  });
};


