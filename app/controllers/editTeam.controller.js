const EditTeam = require("../models/editTeam.model");
const Rosponse = require("../config/response");
const response = new Rosponse();

exports.fetchTournamentPlayers = (req, res) => {
  EditTeam.fetchTournamentPlayers(req.body.tourid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.sendNoData(req, res, "No Record Found");
      } else {
        response.sendError(req, res, "Please try again");
      }
    } else {
      response.sendResponse(req, res, data, "Player list has been fetched successfully.");
    }
  });
};
exports.getTournamentTeam = (req, res) => {
  EditTeam.getTournamentTeam(req.body.tourid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.sendNoData(req, res, "No Record Found");
      } else {
        response.sendError(req, res, "Please try again");
      }
    } else {
      if (data.length) {
        let teamIDArr = data.map(a => a.team_id)
        console.log(teamIDArr);
        EditTeam.getTeamsPlayer(teamIDArr,1, (err, data1) => {
          for(let i=0;i<data.length;i++){
            var playerData=[];
            if(data1!= null && data1!= undefined && data1.length>0){
            for(let j=0;j<data1.length;j++){
              var index = playerData.findIndex(object => object.player_id === data1[j].player_id);
              if(data[i].team_id==data1[j].team_id && index === -1){
                playerData.push(data1[j]);
              }
            }
            data[i].playerData = playerData;
          }else{
            data[i].playerData = [];
          }
          }
          console.log(data);
          response.sendResponse(req, res, data, "Team Fetch Successfully");
        })
      }
    }
  });
};
exports.getUserTeams = (req, res) => {
  EditTeam.getUserTeams(req.body.user_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.sendNoData(req, res, "No Record Found");
      } else {
        response.sendError(req, res, "Please try again");
      }
    } else {
      let teamIDArr = data.map(a => a.team_id)
      console.log(teamIDArr);
      EditTeam.getTeamsPlayer(teamIDArr,1, (err, data1) => {
        for(let i=0;i<data.length;i++){
          var playerData=[];
          if(data1!=null && data1 != undefined){
          for(let j=0;j<data1.length;j++){
            var index = playerData.findIndex(object => object.player_id === data1[j].player_id);
            if(data[i].team_id==data1[j].team_id && index === -1){
              playerData.push(data1[j]);
            }
          }
          data[i].playerData = playerData;
        }else{
          data[i].playerData = [];
        }
        }
        console.log(data);
        response.sendResponse(req, res, data, "Team Fetch Successfully");
      })
    }
  });
};
exports.searchTeams = (req, res) => {
  EditTeam.searchTeams(req.body.team_name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.sendNoData(req, res, "No Record Found");
      } else {
        response.sendError(req, res, "Please try again");
      }
    } else {
      let teamIDArr = data.map(a => a.team_id)
      console.log(teamIDArr);
      EditTeam.getTeamsPlayer(teamIDArr,1, (err, data1) => {
        for(let i=0;i<data.length;i++){
          var playerData=[];
          if(data1!=null && data1 != undefined){
          for(let j=0;j<data1.length;j++){
            var index = playerData.findIndex(object => object.player_id === data1[j].player_id);
            if(data[i].team_id==data1[j].team_id && index === -1){
              playerData.push(data1[j]);
            }
          }
          data[i].playerData = playerData;
        }else{
          data[i].playerData = [];
        }
        }
        console.log(data);
        response.sendResponse(req, res, data, "Team Fetch Successfully");
      })
    }
  });
};
exports.getTournamentTeamSquad = (req, res) => {
  EditTeam.getTournamentTeamSquad(req.body.tourid, req.body.teamid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.sendNoData(req, res, "No Record Found");
      } else {
        response.sendError(req, res, "Please try again");
      }
    } else {
      response.sendResponse(req, res, data, "Team Player Fetch Successfully");
    }
  });
};
exports.insertTeam = (req, res) => {
  EditTeam.insertTeam(req.body.team_name, req.body.team_place, req.body.team_logo, req.body.tour_id, req.body.user_id, (err, teamid) => {
    if (err) {
      if (err.kind === "Team already exist") {
        response.sendNoData(req, res, "Team already exist");
      } else {
        response.sendError(req, res, "Please try again");
      }
    } else {
      response.sendResponse(req, res, { "teamId": teamid }, "Team has been added successfully");
    }
  });
};
exports.updateTeam = (req, res) => {
  EditTeam.updateTeam(req.body.id, req.body.teamname, req.body.logopath, req.body.teamcolor, req.body.textcolor, (err, data) => {
    if (err) {
      response.sendError(req, res, "Please try again");
    } else {
      response.sendResponse(req, res, [], "Team has been updated successfully");
    }
  });
};

exports.addPlayersToSquad = (req, res) => {
  var reqData = req.body.squadPlayers;
  var error = false
  for (let i = 0; i < reqData.length; i++) {
    EditTeam.addPlayerToSquad(reqData[i].tourid, reqData[i].teamid, reqData[i].playerid, reqData[i].playing11, (err, data) => {
      if (err) {
        error = true
      } else {
        error = false
      }
    });
  }
  if (error) {
    response.sendError(req, res, "Please try again");
  }
  else {
    response.sendResponse(req, res, [], "Squad has been added successfully");
  }
};
exports.addPlayerToSquad = (req, res) => {
  EditTeam.addPlayerToSquad(req.body.tourid, req.body.teamid, req.body.playerid, req.body.playing11, (err, data) => {
    if (err) {
      if (err.kind === "player already exist") {
        response.sendNoData(req, res, "player already exist");
      } else {
        response.sendError(req, res, "Please try again");
      }
    } else {
      response.sendResponse(req, res, data, "Player has been added successfully");
    }
  });
};
exports.removePlayerFromSquad = (req, res) => {
  EditTeam.removePlayerFromSquad(req.body.tourid, req.body.teamid, req.body.playerid, (err, data) => {
    if (err) {
      response.sendError(req, res, "Please try again");
    } else {
      response.sendResponse(req, res, data, "Player has been deleted successfully");
    }
  });
};
exports.updateSquadPlayer = (req, res) => {
  EditTeam.updateSquadPlayer(req.body.tourid, req.body.teamid, req.body.playerid, req.body.playing11, (err, data) => {
    if (err) {
      response.sendError(req, res, "Please try again");
    } else {
      if (req.body.playing11 == "yes") {
        response.sendResponse(req, res, data, "Player has been added successfully");
      } else {
        response.sendResponse(req, res, data, "Player has been removed successfully");
      }
    }
  });
};
exports.getTeamsPlayer = (req, res) => {
EditTeam.getTeamsPlayer(req.body.teamid,0, (err, data) => {
  if (err) {
    if (err.kind === "not_found") {
      response.sendNoData(req, res, "No Record Found");
    } else {
      response.sendError(req, res, "Please try again");
    }
  } else {
    const key = 'player_id';
    var uniquePlayerList = [...new Map(data.map(item =>[item[key], item])).values()];
    response.sendResponse(req, res, uniquePlayerList, "Team Player Fetch Successfully");
  }
})
}
