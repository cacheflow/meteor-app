Meteor.publish("thePlayers", function(){
   var currentUser = this.userId; 
   return PlayersList.find({createdBy: this.userId});
  })

Meteor.methods({
  'insertPlayerData':function(playerNameVar){
    var currentUserId = Meteor.userId();
    PlayersList.insert({
      name: playerNameVar,
      score: 0, 
      createdBy: currentUserId
    });
  }, 

  "removePlayerData":function(selectedPlayer){
    PlayersList.remove(selectedPlayer);
  },

  "modifyPlayerScore":function(selectedPlayer, scoreValue){
    PlayersList.update(selectedPlayer, {$inc: {score: scoreValue} });
  }

});
