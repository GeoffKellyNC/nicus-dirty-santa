import React, { useState } from "react";
import { connect } from "react-redux";
import * as playerActions from "../../store/playerState/playerState.actions";
import * as prizeActions from "../../store/prizeState/prizeState.actions";
import * as gameActions from "../../store/gameState/gameState.actions";
import styled from "styled-components";

import AvailableGifts from "./AvailableGifts";
import StealGift from "./StealGift";

const PlayerActions = (props) => {
  const { 
    prizes,
    playerData, 
    setPlayerPrize, 
    players, 
    stealPrize,
    ioSocket,
    setCurrentTurn,
    gameData } = props;

  const [steal, setSteal] = useState(false);
  const [chooseGiftToggle, setChooseGiftToggle] = useState(false);

  const setNextPlayer = async () => {

    const playerList = JSON.parse(localStorage.getItem("shuffledPlayers"));
    await playerList.shift();
    await localStorage.setItem("shuffledPlayers", JSON.stringify(playerList));
    await ioSocket.emit("updatePlayerOrder", { playerList });
    console.log('playerId: ', playerList[0].playerId)
    await setCurrentTurn(playerList[0].playerId, gameData.game_id);
    await ioSocket.emit("nextPlayer", { playerId: playerList[0].playerId });
  }

  const stealNextPlayer = async (playerId) => {
    const nextPlayerId = players.filter(player => player.player_id === playerId)[0].player_id;
    await setCurrentTurn(nextPlayerId, gameData.game_id);
    await ioSocket.emit("nextPlayer", { playerId: nextPlayerId });

  }

  const handleChooseGiftToggle = () => {
    if (steal) {
      setSteal(!steal);
      setChooseGiftToggle(!chooseGiftToggle);
    }
    setChooseGiftToggle(!chooseGiftToggle);
  };

  const handleStealGiftToggle = () => {
    if (chooseGiftToggle) {
      setChooseGiftToggle(!chooseGiftToggle);
      setSteal(!steal);
    }
    setSteal(!steal);
  };

  return (
    <PlayerActionsStyled>
      <div>
        {
          playerData.player_current_prize ? 
          <button className = 'choose-gift-btn' disabled onClick={handleChooseGiftToggle}> Choose Gift </button> :
          <button className = 'choose-gift-btn' onClick={handleChooseGiftToggle}> Choose Gift </button>
        }
        <button onClick={handleStealGiftToggle}>Steal Gift</button>
      </div>
      {chooseGiftToggle && (
        <AvailableGifts
          prizes={prizes}
          setPlayerPrize={setPlayerPrize}
          setChooseGiftToggle={setChooseGiftToggle}
          playerData={playerData}
          ioSocket = {ioSocket}
          setNextPlayer = {setNextPlayer}
        />
      )}
      {steal && (
        <StealGift
          prizes={prizes}
          playerData={playerData}
          players={players}
          stealPrize={stealPrize}
          stealToggle={setSteal}
          stealNextPlayer = {stealNextPlayer}
        />
      )}
    </PlayerActionsStyled>
  );
};

const mapStateToProps = (state) => {
  return {
    prizes: state.prizes,
    playerData: state.playerData,
    players: state.players,
    ioSocket: state.ioSocket,
    gameData: state.gameData,
  };
};

export default connect(mapStateToProps, { ...playerActions, ...prizeActions, ...gameActions })(
  PlayerActions
);

const PlayerActionsStyled = styled.div`
  color: white;
`;
