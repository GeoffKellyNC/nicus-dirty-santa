import React, { useState } from "react";
import { connect } from "react-redux";
import * as playerActions from "../../store/playerState/playerState.actions";
import * as prizeActions from "../../store/prizeState/prizeState.actions";
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
    ioSocket } = props;

  const [steal, setSteal] = useState(false);
  const [chooseGiftToggle, setChooseGiftToggle] = useState(false);

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
        />
      )}
      {steal && (
        <StealGift
          prizes={prizes}
          playerData={playerData}
          players={players}
          stealPrize={stealPrize}
          stealToggle={setSteal}
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
    ioSocket: state.ioSocket
  };
};

export default connect(mapStateToProps, { ...playerActions, ...prizeActions })(
  PlayerActions
);

const PlayerActionsStyled = styled.div`
  color: white;
`;
