window.__require=function e(t,a,i){function s(r,c){if(!a[r]){if(!t[r]){var o=r.split("/");if(o=o[o.length-1],!t[o]){var l="function"==typeof __require&&__require;if(!c&&l)return l(o,!0);if(n)return n(o,!0);throw new Error("Cannot find module '"+r+"'")}}var p=a[r]={exports:{}};t[r][0].call(p.exports,function(e){return s(t[r][1][e]||e)},p,p.exports,e,t,a,i)}return a[r].exports}for(var n="function"==typeof __require&&__require,r=0;r<i.length;r++)s(i[r]);return s}({Board:[function(e,t,a){"use strict";cc._RF.push(t,"88492rqawhPEIOC3iSc02ck","Board"),cc.Class({extends:cc.Component,properties:{gameManager:{default:null,type:cc.Node},player:{default:null,type:cc.Node},pieces:{default:[],type:cc.Sprite},flippedPieceSprite:{default:null,type:cc.SpriteFrame},kingSprite:{default:null,type:cc.SpriteFrame},rookSprite:{default:null,type:cc.SpriteFrame},bishopSprite:{default:null,type:cc.SpriteFrame},goldGeneralSprite:{default:null,type:cc.SpriteFrame},silverGeneralSprite:{default:null,type:cc.SpriteFrame},knightSprite:{default:null,type:cc.SpriteFrame},lanceSprite:{default:null,type:cc.SpriteFrame},pawnSprite:{default:null,type:cc.SpriteFrame}},onLoad:function(){this.pieceCounter=0,this.pieceTypes=[]},start:function(){},addPieceToBoard:function(e,t){if(e)this.pieces[this.pieceCounter].spriteFrame=this.flippedPieceSprite,this.pieceTypes.push("");else{switch(t){case"king":this.pieces[this.pieceCounter].spriteFrame=this.kingSprite;break;case"rook":this.pieces[this.pieceCounter].spriteFrame=this.rookSprite;break;case"bishop":this.pieces[this.pieceCounter].spriteFrame=this.bishopSprite;break;case"gold":this.pieces[this.pieceCounter].spriteFrame=this.goldGeneralSprite;break;case"silver":this.pieces[this.pieceCounter].spriteFrame=this.silverGeneralSprite;break;case"knight":this.pieces[this.pieceCounter].spriteFrame=this.knightSprite;break;case"lance":this.pieces[this.pieceCounter].spriteFrame=this.lanceSprite;break;case"pawn":this.pieces[this.pieceCounter].spriteFrame=this.pawnSprite}this.pieceTypes.push(t)}this.pieceCounter++,this.pieceCounter>7&&(this.pieceCounter=0,this.pieceTypes[6]==this.pieceTypes[7]?this.gameManager.getComponent("GameManager").endRoundWithDouble(this.player,this.pieceTypes[6],this.pieceTypes[7]):this.gameManager.getComponent("GameManager").endRound(this.player,this.pieceTypes[7]))},clearBoard:function(){for(var e=0;e<8;e++)this.pieces[e].spriteFrame=null}}),cc._RF.pop()},{}],DebugHandler:[function(e,t,a){"use strict";cc._RF.push(t,"ed96dJrJXJN3baIVoh9VneT","DebugHandler"),cc.Class({extends:cc.Component,properties:{gameManager:{default:null,type:cc.Node}},start:function(){},resetLocalStorage:function(){cc.sys.localStorage.setItem("hasEndedRoundBefore",!1),cc.sys.localStorage.setItem("firstPlayerIndex",0),cc.sys.localStorage.setItem("teamAScore",0),cc.sys.localStorage.setItem("teamBScore",0)},win:function(){this.gameManager.getComponent("GameManager").endGame()}}),cc._RF.pop()},{}],GameManager:[function(e,t,a){"use strict";cc._RF.push(t,"c8121lKjkNJZLjY6ImmCzwc","GameManager"),cc.Class({extends:cc.Component,properties:{players:{default:[],type:cc.Node},teamAScoreLabel:{default:null,type:cc.Label},teamBScoreLabel:{default:null,type:cc.Label},lastAttackPieceNode:{default:null,type:cc.Node},timerLabel:{default:null,type:cc.Label},timerTime:30,kingHasDefended:!1},onLoad:function(){this.deck=[],this.passCounter=0,this.teamAScore=0,this.teamBScore=0,this.timerIsOn=!1,this.timer=this.timerTime,this.lastAttackPieceType=""},start:function(){"true"==cc.sys.localStorage.getItem("hasEndedRoundBefore")?(this.firstPlayerIndex=cc.sys.localStorage.getItem("firstPlayerIndex"),this.teamAScore=parseInt(cc.sys.localStorage.getItem("teamAScore")),this.teamBScore=parseInt(cc.sys.localStorage.getItem("teamBScore")),this.updateScore(),this.startRound()):(this.shuffleDeck(),this.chooseFirstPlayer())},shuffleDeck:function(){this.fillDeck();for(var e=0,t=0;t<4;t++){e=0;for(var a=0;a<8;a++){var i=Math.floor(Math.random()*this.deck.length),s=this.deck[i];if("pawn"==s&&e<=4&&e++,e>4)for(;"pawn"==s;)i=Math.floor(Math.random()*this.deck.length),s=this.deck[i];this.players[t].getComponent("Player").addPieceToHand(s),this.deck.splice(i,1)}this.players[t].getComponent("Player").debugPrintHand(),console.log("PAWNS: "+e)}},fillDeck:function(){for(var e=0;e<10;e++)this.deck.push("pawn");for(e=0;e<4;e++)this.deck.push("knight");for(e=0;e<4;e++)this.deck.push("lance");for(e=0;e<4;e++)this.deck.push("silver");for(e=0;e<4;e++)this.deck.push("gold");for(e=0;e<2;e++)this.deck.push("bishop");for(e=0;e<2;e++)this.deck.push("rook");for(e=0;e<2;e++)this.deck.push("king")},chooseFirstPlayer:function(){this.firstPlayerIndex=Math.floor(Math.random()*this.players.length),this.currentPlayerIndex=this.firstPlayerIndex,this.startTimer(),this.players[this.firstPlayerIndex].getComponent("Player").startPlayerTurn(!0,"")},passTurn:function(){this.passCounter++,this.currentPlayerIndex++,this.currentPlayerIndex=this.currentPlayerIndex%4,this.startTimer(),3==this.passCounter?(this.passCounter=0,this.players[this.currentPlayerIndex].getComponent("Player").startPlayerTurn(!0,"")):this.players[this.currentPlayerIndex].getComponent("Player").startPlayerTurn(!1,this.lastAttackPieceType)},advanceTurn:function(e){this.lastAttackPieceNode.getComponent("LastAttackPieceHandler").setLastAttackPieceSprite(e),this.lastAttackPieceType=e,this.currentPlayerIndex++,this.currentPlayerIndex=this.currentPlayerIndex%4,this.startTimer(),3==this.passCounter?(this.passCounter=0,this.players[this.currentPlayerIndex].getComponent("Player").startPlayerTurn(!0,"")):(this.passCounter=0,this.players[this.currentPlayerIndex].getComponent("Player").startPlayerTurn(!1,this.lastAttackPieceType))},startRound:function(){this.shuffleDeck(),this.currentPlayerIndex=this.firstPlayerIndex,this.startTimer(),console.log("CURRENT PLAYER INDEX: "+this.currentPlayerIndex),console.log("FIRST PLAYER INDEX: "+this.firstPlayerIndex),this.players[this.firstPlayerIndex].getComponent("Player").startPlayerTurn(!0,"")},endRound:function(e,t){var a=0;switch(t){case"king":a=50;break;case"rook":case"bishop":a=40;break;case"gold":case"silver":a=30;break;case"knight":case"lance":a=20;break;case"pawn":a=10}for(var i=-1,s=0;s<this.players.length;s++)if(e.name==this.players[s].name){s%2==0?this.teamAScore+=a:this.teamBScore+=a,i=s;break}this.checkPoints(i)},endRoundWithDouble:function(e,t,a){if(t==a){var i=0;switch(a){case"king":i=100;break;case"rook":case"bishop":i=80;break;case"gold":case"silver":i=60;break;case"knight":case"lance":i=40;break;case"pawn":i=20}for(var s=-1,n=0;n<this.players.length;n++)if(e.name==this.players[n].name){n%2==0?(this.teamAScore+=i,console.log):this.teamBScore+=i,s=n;break}this.checkPoints(s)}else this.endRound(e,a)},checkPoints:function(e){this.updateScore(),this.teamAScore>=100||this.teamBScore>=100?this.endGame():(cc.sys.localStorage.setItem("hasEndedRoundBefore",!0),cc.sys.localStorage.setItem("firstPlayerIndex",e),cc.sys.localStorage.setItem("teamAScore",this.teamAScore),cc.sys.localStorage.setItem("teamBScore",this.teamBScore),cc.director.loadScene(cc.director.getScene().name))},updateScore:function(){this.teamAScoreLabel.string=this.teamAScore.toString(),this.teamBScoreLabel.string=this.teamBScore.toString()},endGame:function(){cc.sys.localStorage.setItem("teamAScore",this.teamAScore),cc.sys.localStorage.setItem("teamBScore",this.teamBScore);for(var e=0;e<4;e++)this.players[e].destroy();this.teamAScore>this.teamBScore?cc.sys.localStorage.setItem("winner",0):this.teamAScore<this.teamBScore?cc.sys.localStorage.setItem("winner",1):cc.sys.localStorage.setItem("winner",2),this.scheduleOnce(function(){cc.director.loadScene("Results")},2)},update:function(e){this.timerIsOn&&(this.timer>0?(this.timer-=e,parseFloat(this.timerLabel.string)!=Math.round(this.timer)&&(this.timerLabel.string=Math.round(this.timer))):(this.timerIsOn=!1,this.timerLabel.string=this.timerTime,this.players[0].getComponent("Player").isDefending?this.timer<=0&&(console.log(this.players[0].getComponent("Player").isDefending),this.passTurn()):this.players[0].getComponent("Player").chooseRandomPiece()))},startTimer:function(){this.timer=this.timerTime,this.timerIsOn=!0}}),cc._RF.pop()},{}],HandBoard:[function(e,t,a){"use strict";cc._RF.push(t,"efd7d4NlaJK4quLeHb2k01g","HandBoard"),cc.Class({extends:cc.Component,properties:{player:{default:null,type:cc.Node},pieces:{default:[],type:cc.Node},flippedPieceSprite:{default:null,type:cc.SpriteFrame},kingSprite:{default:null,type:cc.SpriteFrame},rookSprite:{default:null,type:cc.SpriteFrame},bishopSprite:{default:null,type:cc.SpriteFrame},goldGeneralSprite:{default:null,type:cc.SpriteFrame},silverGeneralSprite:{default:null,type:cc.SpriteFrame},knightSprite:{default:null,type:cc.SpriteFrame},lanceSprite:{default:null,type:cc.SpriteFrame},pawnSprite:{default:null,type:cc.SpriteFrame}},onLoad:function(){this.hasFilledHand=!1},start:function(){},update:function(e){!this.hasFilledHand&&this.player.getComponent("Player").handHasBeenFilled&&(this.fillBoard(),this.hasFilledHand=!0)},fillBoard:function(){for(var e=0;e<8;e++){var t=this.player.getComponent("Player").hand[e].type;this.pieces[e].getComponent("HandPiece").setHandPiece(t)}},removePiece:function(e){for(var t=0,a=0;a<8;a++)if(e==this.pieces[a]){t=a;break}this.player.getComponent("Player").putPiece(e.getComponent("HandPiece").pieceType,t)},deactivatePiece:function(e){this.pieces[e].getComponent(cc.Button).interactable=!1},activatePiece:function(e){this.pieces[e].getComponent("HandPiece").activate()},deactivateAllPieces:function(){for(var e=0;e<8;e++)this.pieces[e].getComponent(cc.Button).interactable=!1},activateAllPieces:function(){for(var e=0;e<8;e++)this.pieces[e].getComponent("HandPiece").activate()}}),cc._RF.pop()},{}],HandPiece:[function(e,t,a){"use strict";cc._RF.push(t,"4492arymbxCmKtVKyQQA9To","HandPiece"),cc.Class({extends:cc.Component,properties:{pieceType:"",handBoard:{default:null,type:cc.Node},kingSprite:{default:null,type:cc.SpriteFrame},rookSprite:{default:null,type:cc.SpriteFrame},bishopSprite:{default:null,type:cc.SpriteFrame},goldGeneralSprite:{default:null,type:cc.SpriteFrame},silverGeneralSprite:{default:null,type:cc.SpriteFrame},knightSprite:{default:null,type:cc.SpriteFrame},lanceSprite:{default:null,type:cc.SpriteFrame},pawnSprite:{default:null,type:cc.SpriteFrame}},onLoad:function(){this.spriteComponent=this.node.getChildByName("Background").getComponent(cc.Sprite)},start:function(){},setHandPiece:function(e){switch(this.pieceType=e,e){case"king":this.spriteComponent.spriteFrame=this.kingSprite;break;case"rook":this.spriteComponent.spriteFrame=this.rookSprite;break;case"bishop":this.spriteComponent.spriteFrame=this.bishopSprite;break;case"gold":this.spriteComponent.spriteFrame=this.goldGeneralSprite;break;case"silver":this.spriteComponent.spriteFrame=this.silverGeneralSprite;break;case"knight":this.spriteComponent.spriteFrame=this.knightSprite;break;case"lance":this.spriteComponent.spriteFrame=this.lanceSprite;break;case"pawn":this.spriteComponent.spriteFrame=this.pawnSprite;break;default:this.spriteComponent.spriteFrame=null}},sendToBoard:function(){this.handBoard.getComponent("HandBoard").removePiece(this.node),this.setHandPiece(""),this.getComponent(cc.Button).interactable=!1},activate:function(){null!=this.spriteComponent.spriteFrame&&(this.getComponent(cc.Button).interactable=!0)}}),cc._RF.pop()},{}],HowToPlayManager:[function(e,t,a){"use strict";cc._RF.push(t,"409c7+dl85JuK98qultXSqW","HowToPlayManager"),cc.Class({extends:cc.Component,properties:{pages:{default:[],type:cc.Node},pageNumberText:{default:null,type:cc.Label}},start:function(){this.currIndex=0,this.pages[this.currIndex].active=!0,this.maxPageNumber=parseInt(this.pages.length),this.updatePageNumberText()},nextPage:function(){this.currIndex++,this.currIndex>=this.pages.length?(this.currIndex=0,this.pages[this.currIndex].active=!0,this.pages[this.pages.length-1].active=!1):(this.pages[this.currIndex].active=!0,this.pages[this.currIndex-1].active=!1),this.updatePageNumberText()},prevPage:function(){this.currIndex--,this.currIndex<0?(this.currIndex=this.pages.length-1,this.pages[this.currIndex].active=!0,this.pages[0].active=!1):(this.pages[this.currIndex].active=!0,this.pages[this.currIndex+1].active=!1),this.updatePageNumberText()},updatePageNumberText:function(){this.pageNumberText.string=parseInt(this.currIndex+1)+"/"+this.maxPageNumber}}),cc._RF.pop()},{}],InGameButtonHandler:[function(e,t,a){"use strict";cc._RF.push(t,"bd5de9rkbVF45x5D43DKap/","InGameButtonHandler"),cc.Class({extends:cc.Component,properties:{audioClip:{default:null,type:cc.AudioClip}},start:function(){},playClip:function(){cc.audioEngine.play(this.audioClip,!1,1)}}),cc._RF.pop()},{}],LastAttackPieceHandler:[function(e,t,a){"use strict";cc._RF.push(t,"a255egh0kRF858SCbASrnUQ","LastAttackPieceHandler"),cc.Class({extends:cc.Component,properties:{pieceType:"",gameManager:{default:null,type:cc.Node},kingSprite:{default:null,type:cc.SpriteFrame},rookSprite:{default:null,type:cc.SpriteFrame},bishopSprite:{default:null,type:cc.SpriteFrame},goldGeneralSprite:{default:null,type:cc.SpriteFrame},silverGeneralSprite:{default:null,type:cc.SpriteFrame},knightSprite:{default:null,type:cc.SpriteFrame},lanceSprite:{default:null,type:cc.SpriteFrame},pawnSprite:{default:null,type:cc.SpriteFrame}},start:function(){this.spriteComponent=this.node.getComponent(cc.Sprite),this.pieceType=this.gameManager.getComponent("GameManager").lastAttackPieceType},setLastAttackPieceSprite:function(e){switch(this.pieceType=e,e){case"king":this.spriteComponent.spriteFrame=this.kingSprite;break;case"rook":this.spriteComponent.spriteFrame=this.rookSprite;break;case"bishop":this.spriteComponent.spriteFrame=this.bishopSprite;break;case"gold":this.spriteComponent.spriteFrame=this.goldGeneralSprite;break;case"silver":this.spriteComponent.spriteFrame=this.silverGeneralSprite;break;case"knight":this.spriteComponent.spriteFrame=this.knightSprite;break;case"lance":this.spriteComponent.spriteFrame=this.lanceSprite;break;case"pawn":this.spriteComponent.spriteFrame=this.pawnSprite;break;default:this.spriteComponent.spriteFrame=null}}}),cc._RF.pop()},{}],MenuButtonHandler:[function(e,t,a){"use strict";cc._RF.push(t,"be3e58+FX5Ob62lTXnGUiI5","MenuButtonHandler"),cc.Class({extends:cc.Component,properties:{audioClip:{default:null,type:cc.AudioClip}},start:function(){},loadScene:function(e,t){"InGame"==t&&(cc.sys.localStorage.setItem("hasEndedRoundBefore",!1),cc.sys.localStorage.setItem("firstPlayerIndex",-1),cc.sys.localStorage.setItem("teamAScore",0),cc.sys.localStorage.setItem("teamBScore",0),cc.sys.localStorage.setItem("winner",0)),cc.director.loadScene(t)},quitGame:function(){cc.game.end()},playClip:function(){cc.audioEngine.play(this.audioClip,!1,1)}}),cc._RF.pop()},{}],PassButton:[function(e,t,a){"use strict";cc._RF.push(t,"909fbcE1UNDo4hKrYE3/NUa","PassButton"),cc.Class({extends:cc.Component,properties:{gameManager:{default:null,type:cc.Node}},start:function(){},pass:function(){this.node.getComponent(cc.Button).interactable=!1,this.gameManager.getComponent("GameManager").passTurn()}}),cc._RF.pop()},{}],Piece:[function(e,t,a){"use strict";cc._RF.push(t,"f3d88i6mAZLTIAFYpc5lbj/","Piece"),cc.Class({extends:cc.Component,properties:{scoreValue:0,type:"",player:{default:null,type:cc.Node}},start:function(){},sendToBoard:function(){player.putPiece(this)}}),cc._RF.pop()},{}],Player:[function(e,t,a){"use strict";cc._RF.push(t,"17b2ffVic1EBJba9m82ecCa","Player"),cc.Class({extends:cc.Component,properties:{isAI:!1,aiReactionDelay:1,gameManager:{default:null,type:cc.Node},board:{default:null,type:cc.Node},handBoard:{default:null,type:cc.Node},passButton:{default:null,type:cc.Button},hand:[],handHasBeenFilled:!1,isDefending:!0},onLoad:function(){this.hand=[],this.isDefending=!0},start:function(){this.pieceCounter=0},addPieceToHand:function(e){var t={type:e,index:this.hand.length};this.hand.push(t),this.hand.length>=7&&(this.handHasBeenFilled=!0)},startPlayerTurn:function(e,t){this.isFlipped=e,this.lastAttackPieceType=t,this.isDefending=!0,this.isAI?this.scheduleOnce(function(){this.checkPieceAvailability(this.isDefending)},this.aiReactionDelay):(this.passButton.interactable=!0,this.handBoard.getComponent("HandBoard").activateAllPieces(),e?(this.passButton.interactable=!1,2==this.hand.length&&"king"==this.hand[0].type&&"king"==this.hand[1].type&&(this.isFlipped=!1)):this.checkPieceAvailability(this.isDefending))},reset:function(){this.hand=[],this.pieceCounter=0,this.isDefending=!0,this.board.getComponent("Board").clearBoard()},putPiece:function(e,t){if(console.log(this.node.name+": put piece "+e),this.board.getComponent("Board").addPieceToBoard(this.isFlipped,e),this.isDefending){if("king"!=e||this.isFlipped||this.gameManager.getComponent("GameManager").kingHasDefended||(this.gameManager.getComponent("GameManager").kingHasDefended=!0),this.isDefending=!1,this.isFlipped=!1,!this.isAI){for(var a=0;a<this.hand.length;a++)this.hand[a].index==t&&this.hand.splice(a,1);this.passButton.interactable=!1}this.checkPieceAvailability(!1)}else{if(!this.isAI){for(a=0;a<this.hand.length;a++)this.hand[a].index==t&&this.hand.splice(a,1);this.handBoard.getComponent("HandBoard").deactivateAllPieces(),this.passButton.interactable=!1}this.gameManager.getComponent("GameManager").advanceTurn(e)}},checkPieceAvailability:function(e){if(this.isAI)if(e){if(2==this.hand.length){for(i=-1,s=!1,n=0;n<this.hand.length;n++)if("king"==this.hand[n].type){i=n,s=!0;break}if(s&&!this.gameManager.getComponent("GameManager").kingHasDefended){if("pawn"==this.lastAttackPieceType||"lance"==this.lastAttackPieceType)return console.log(this.node.name+" passes."),void this.gameManager.getComponent("GameManager").passTurn();var t=this.hand[i].type;this.hand.splice(i,1),this.debugPrintHand(),this.putPiece(t,-1)}}if(""==this.lastAttackPieceType){t=this.hand[0].type;this.hand.splice(0,1),this.debugPrintHand(),this.putPiece(t,-1)}else{var a=!0;for(n=0;n<this.hand.length;n++){if("king"==this.hand[n].type&&"pawn"!=this.lastAttackPieceType&&"lance"!=this.lastAttackPieceType){t=this.hand[n].type;this.hand.splice(n,1),this.putPiece(t,-1),a=!1;break}if(this.hand[n].type===this.lastAttackPieceType){t=this.hand[n].type;this.hand.splice(n,1),this.debugPrintHand(),this.putPiece(t,-1),a=!1;break}}a&&(console.log(this.node.name+" passes."),this.gameManager.getComponent("GameManager").passTurn())}}else for(n=0;n<this.hand.length;n++){if("king"!=this.hand[n].type){t=this.hand[n].type;this.hand.splice(n,1),this.putPiece(t,-1),this.debugPrintHand();break}if(1==this.hand.length&&this.gameManager.getComponent("GameManager").kingHasDefended){var t=this.hand[n].type;this.hand.splice(n,1),this.putPiece(t,-1),this.debugPrintHand();break}}else if(e){if(2==this.hand.length){for(var i=-1,s=!1,n=0;n<this.hand.length;n++)if("king"==this.hand[n].type){i=n,s=!0;break}if(s){if(!this.gameManager.getComponent("GameManager").kingHasDefended){var r=(i+1)%2;null!=this.handBoard&&this.handBoard.getComponent("HandBoard").deactivatePiece(this.hand[r].index),"pawn"!=this.lastAttackPieceType&&"lance"!=this.lastAttackPieceType||this.handBoard.getComponent("HandBoard").deactivatePiece(this.hand[i].index)}return}}for(var n=0;n<this.hand.length;n++)this.hand[n].type!=this.lastAttackPieceType&&("king"==this.hand[n].type?"lance"==this.lastAttackPieceType||"pawn"==this.lastAttackPieceType?null!=this.handBoard&&this.handBoard.getComponent("HandBoard").deactivatePiece(this.hand[n].index):null!=this.handBoard&&this.handBoard.getComponent("HandBoard").activatePiece(this.hand[n].index):null!=this.handBoard&&this.handBoard.getComponent("HandBoard").deactivatePiece(this.hand[n].index))}else for(var n=0;n<this.hand.length;n++)this.gameManager.getComponent("GameManager").kingHasDefended?null!=this.handBoard&&this.handBoard.getComponent("HandBoard").activatePiece(this.hand[n].index):"king"===this.hand[n].type?null!=this.handBoard&&this.handBoard.getComponent("HandBoard").deactivatePiece(this.hand[n].index):null!=this.handBoard&&this.handBoard.getComponent("HandBoard").activatePiece(this.hand[n].index)},debugPrintHand:function(){for(var e=this.node.name+": ",t=0;t<this.hand.length;t++)e+=this.hand[t].type,t<this.hand.length-1&&(e+=", ");console.log(e)},chooseRandomPiece:function(){this.handBoard.getComponent("HandBoard").pieces[this.hand[0].index].getComponent("HandPiece").sendToBoard()}}),cc._RF.pop()},{}],ResultsManager:[function(e,t,a){"use strict";cc._RF.push(t,"e12b4jWr2JDKbY+DFmWQ8TZ","ResultsManager"),cc.Class({extends:cc.Component,properties:{resultLabel:{default:null,type:cc.Label},teamAScoreLabel:{default:null,type:cc.Label},teamBScoreLabel:{default:null,type:cc.Label}},onLoad:function(){var e=cc.sys.localStorage.getItem("winner");0==e?this.resultLabel.string="YOU WIN":1==e&&(this.resultLabel.string="YOU LOSE");var t=cc.sys.localStorage.getItem("teamAScore"),a=cc.sys.localStorage.getItem("teamBScore");this.teamAScoreLabel.string=t.toString(),this.teamBScoreLabel.string=a.toString()},start:function(){},returnToMainMenu:function(){cc.director.loadScene("MainMenu")},playAgain:function(){cc.sys.localStorage.setItem("hasEndedRoundBefore",!1),cc.sys.localStorage.setItem("firstPlayerIndex",-1),cc.sys.localStorage.setItem("teamAScore",0),cc.sys.localStorage.setItem("teamBScore",0),cc.sys.localStorage.setItem("winner",0),cc.director.loadScene("InGame")}}),cc._RF.pop()},{}],SettingsManager:[function(e,t,a){"use strict";cc._RF.push(t,"0a4f2J3J/9HgKZANzno373J","SettingsManager"),cc.Class({extends:cc.Component,properties:{masterVolumeBar:{default:null,type:cc.Slider},bgmVolumeBar:{default:null,type:cc.Slider},sfxVolumeBar:{default:null,type:cc.Slider}},start:function(){var e=cc.sys.localStorage.getItem("masterVol");null===e?cc.sys.localStorage.setItem("masterVol",1):this.masterVolumeBar.progress=e;var t=cc.sys.localStorage.getItem("bgmVol");null===t?cc.sys.localStorage.setItem("bgmVol",1):this.bgmVolumeBar.progress=t*e;var a=cc.sys.localStorage.getItem("sfxVol");null===a?cc.sys.localStorage.setItem("sfxVol",1):this.sfxVolumeBar.progress=a*e},updateVolume:function(e,t){switch(t){case"bgmVol":case"sfxVol":var a=cc.sys.localStorage.getItem("masterVol");e.progress>a&&(e.progress=a)}cc.sys.localStorage.setItem(t,e.progress)},updateSubVolumes:function(e){var t=cc.sys.localStorage.getItem("bgmVol");this.bgmVolumeBar.progress=t*e.progress,cc.sys.localStorage.setItem("bgmVol",this.bgmVolumeBar.progress);var a=cc.sys.localStorage.getItem("sfxVol");this.sfxVolumeBar.progress=a*e.progress,cc.sys.localStorage.setItem("sfxVol",this.sfxVolumeBar.progress)}}),cc._RF.pop()},{}]},{},["Board","DebugHandler","GameManager","HandBoard","HandPiece","InGameButtonHandler","LastAttackPieceHandler","MenuButtonHandler","PassButton","Piece","Player","HowToPlayManager","ResultsManager","SettingsManager"]);