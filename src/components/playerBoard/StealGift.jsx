import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StealGift = ({
  prizes,
  playerData,
  players,
  stealPrize,
  stealToggle
}) => {
  const [giftsToSteal, setGiftsToSteal] = useState([]);
  const [currentGift, setCurrentGift] = useState(null);

  useEffect(() => {
    setGiftsToSteal(
      prizes.filter((prize) => prize.prize_current_owner != null)
    );
    setCurrentGift(playerData.player_current_prize);
  }, [playerData.player_current_prize, prizes]);

  const handleSteal = async (giftId, oldPlayerId) => {
    const newPlayerId = playerData.player_id;
    await stealPrize(giftId, oldPlayerId, newPlayerId, currentGift);
    stealToggle(false);
  };

  return (
    <StealGiftStyled>
      <div>
        {prizes.length < 1 ? (
          <span className="no-gifts-text"> No Gifts Set! </span>
        ) : (
          giftsToSteal.map((gift, idx) => {
            if (gift.prize_id === playerData.player_current_prize){
              return null
            }
            return (
              <div className="steal-gift-container" key={idx}>
                <div className="steal-gift-header">
                  <span className="steal-gift-name"> {gift.prize_name}</span>
                  <img
                    src={gift.prize_image}
                    alt="prize"
                    className="steal-prize-image"
                  />
                </div>
                <div className="steal-gift-body">
                  <span className="steal-current-owner">
                    {
                      players.filter(
                        (player) =>
                          player.player_id === gift.prize_current_owner)[0].player_name
                    }
                  </span>
                </div>
                <button
                  className="steal-gift-button"
                  onClick={() =>
                    handleSteal(gift.prize_id, gift.prize_current_owner)
                  }
                > STEAL GIFT </button>
              </div>
            );
          })
        )}
      </div>
    </StealGiftStyled>
  );
};

export default StealGift;

const StealGiftStyled = styled.div`
  background: black;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;
  padding: 5%;
  border: 1px solid ${(pr) => pr.theme.colors.berry};
  text-align: center;
  font-size: 1.5rem;
  z-index: 10;
  height: auto;
  font-family: ${(pr) => pr.theme.fonts.primary};
  border-radius: 5px;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  overflow: scroll;
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  flex-wrap: wrap;



  .steal-gift-container {
    background-color: red;
    width: 300px;
    height: 300px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: ${pr => pr.theme.fonts.family.nicus};
    border-radius: 16px;
    margin-top: 1%;
  }

  .steal-gift-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }


  .steal-prize-image{
    height: 100px;
    width: 100px;
  }
`;
