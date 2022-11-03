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
    gameData,
    setStealError,
  } = props;

  const [steal, setSteal] = useState(false);
  const [chooseGiftToggle, setChooseGiftToggle] = useState(false);

  const updatePlayerOrder = async (
    type,
    currentPlayerId,
    stolenPlayerId = null
  ) => {
    const playerList = JSON.parse(localStorage.getItem("shuffledPlayers"));
  
    switch (type) {
      case "choose":
        const playerExists = playerList.find(player => player.playerId === currentPlayerId)
        if (playerExists) {
          playerList.shift();
          await ioSocket.emit("updatePlayerOrder", {
            playerList,
            playerId: playerList[0].playerId,
          });
          await setCurrentTurn(playerList[0].playerId, gameData.game_id);
        }
        if (!playerExists) {
          await ioSocket.emit("updatePlayerOrder", {
            playerList,
            playerId: playerList[0].playerId,
          });
          await setCurrentTurn(playerList[0].playerId, gameData.game_id);
        }
        break
      case "steal":
        const filteredPlayerList = playerList.filter(
          (player) => player.playerId !== currentPlayerId
        );
        await localStorage.setItem(
          "shuffledPlayers",
          JSON.stringify(filteredPlayerList)
        );
        await ioSocket.emit("updatePlayerOrder", {
          playerList: filteredPlayerList,
          playerId: stolenPlayerId,
        });
        await setCurrentTurn(stolenPlayerId, gameData.game_id);
        break;
      default:
        break;
    }
  };

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
      <div className="player-buttons">
        {playerData.player_current_prize ? (
          <button
            className="choose-gift-btn btn"
            disabled
            onClick={handleChooseGiftToggle}
          >
            {" "}
            Choose Gift{" "}
          </button>
        ) : (
          <button
            className="choose-gift-btn btn"
            onClick={handleChooseGiftToggle}
          >
            {" "}
            Choose Gift{" "}
          </button>
        )}
        <button className="steal-gift-btn btn" onClick={handleStealGiftToggle}>
          Steal Gift
        </button>
      </div>
      {chooseGiftToggle && (
        <AvailableGifts
          prizes={prizes}
          setPlayerPrize={setPlayerPrize}
          setChooseGiftToggle={setChooseGiftToggle}
          playerData={playerData}
          ioSocket={ioSocket}
          updatePlayerOrder={updatePlayerOrder}
        />
      )}
      {steal && (
        <StealGift
          prizes={prizes}
          playerData={playerData}
          players={players}
          stealPrize={stealPrize}
          stealToggle={setSteal}
          updatePlayerOrder={updatePlayerOrder}
          ioSocket={ioSocket}
          setStealError={setStealError}
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

export default connect(mapStateToProps, {
  ...playerActions,
  ...prizeActions,
  ...gameActions,
})(PlayerActions);

const PlayerActionsStyled = styled.div`
  color: white;

  .player-buttons {
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    width: 100%;
    max-width: 500px;
    margin-bottom: 20px;
  }

  .btn {
    background: rgba(248, 0, 3, 0.3);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    color: white;
    font-size: ${(props) => props.theme.fonts.size.large};
    padding: 10px 20px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    width: 150px;
    height: 50px;

    &:hover {
      background: rgba(248, 0, 3, 0.5);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      scale: 1.1;
    }
  }
`;
