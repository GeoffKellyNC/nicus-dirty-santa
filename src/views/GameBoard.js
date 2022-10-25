import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { connect } from "react-redux";
import * as playerActions from "../store/playerState/playerState.actions";
import * as gameActions from "../store/gameState/gameState.actions";

import AddPrizeForm from "../components/gameBoard/AddPrize.form";
import PlayersList from "../components/gameBoard/PlayersList";
import PlayerOrder from "../components/gameBoard/PlayerOrder";
import CurrentGame from "../components/gameBoard/CurrentGame";

const GameBoard = (props) => {
  const {
    players,
    getPlayers,
    ioSocket,
    startGame,
    setPlayerOrder,
    gameData,
    setLocalCurrentTurn,
  } = props;
  // eslint-disable-next-line no-unused-vars
  const [started, setStarted] = useState(false);
  const [moveMade, setMoveMade] = useState(false);
  const [playerMove, setPlayerMove] = useState({ player: "", prize: "" });

  const nav = useNavigate();

  setTimeout(() => {
    (() => {
      console.log("ioSocket: ", ioSocket);
      ioSocket.on("startGame", (data) => {
        localStorage.setItem("gameData", JSON.stringify(data.gameData));
        setStarted(true);
      });
      ioSocket.on("giftChosen", (data) => {
        console.log("GiftChosen", data);
        setPlayerMove({
          ...playerMove,
          player: data.playerName,
          prize: data.giftName,
        });
        setMoveMade(true);
      });
      ioSocket.on("sendNextPlayer", (data) => {
        const { playerId } = data;
        setLocalCurrentTurn(playerId);
        localStorage.setItem("currentTurn", JSON.stringify(playerId));
      });
    })();
  }, 1000);

  useEffect(() => {
    getPlayers();
  }, [getPlayers]);

  const handleStart = async () => {
    const gameData = await startGame();
    ioSocket.emit("startGame", { gameId: gameData.game_id, gameData });
  };

  return (
    <GameBoardStyled>
      <div className="gameboard-header">
        <h1 className="gameboard-text">Nicus Dirty Santa GameBoard</h1>
      </div>
      <button
        className="btn view-prize-btn"
        onClick={() => nav("/masterprizes")}
      >
        {" "}
        View Prizes{" "}
      </button>
      <button className="btn start-game-btn" onClick={handleStart}>
        {" "}
        Start Game{" "}
      </button>
      <div className="gameboard-body">
        <div className="gameboard-right">
          <PlayersList players={players} />
        </div>
        <div className="gameboard-middle">
          <CurrentGame ioSocket={ioSocket} />
        </div>
        <div className="gameboard-left">
          <PlayerOrder
            players={players}
            setPlayerOrder={setPlayerOrder}
            gameData={gameData}
            ioSocket={ioSocket}
          />
        </div>
      </div>
      <AddPrizeForm />
      {moveMade && (
        <div className="move-made">
          <span>
            {" "}
            {playerMove.player} chose {playerMove.prize}{" "}
          </span>
        </div>
      )}
    </GameBoardStyled>
  );
};

const mapStateToProps = (state) => {
  return {
    players: state.players,
    ioSocket: state.ioSocket,
    playerOrder: state.playerOrder,
    gameData: state.gameData,
  };
};

export default connect(mapStateToProps, { ...playerActions, ...gameActions })(
  GameBoard
);

const GameBoardStyled = styled.div`
  background: rgb(47,109,211);
  background: linear-gradient(0deg, rgba(47,109,211,1) 6%, rgba(80,148,228,1) 60%, rgba(47,109,211,1) 100%);
  height: 100vh;
  overflow-y: hidden;
  color: white;

  .gameboard-header {
    display: flex;
    justify-content: center;
    margin: 2%;
    font-family: ${(pr) => pr.theme.fonts.family.christmas};
    font-size: ${(pr) => pr.theme.fonts.size.title};
    color: ${(pr) => pr.theme.fonts.color.green};
  }

  .gameboard-body {
    display: flex;
    justify-content: space-between;
    ${"" /* margin: 2%; */}
  }

  .btn {
    width: 10rem;
    height: 3rem;
    border: none;
  }

  .move-made {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    padding: 1rem;
    border-radius: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    font-family: ${pr => pr.theme.fonts.family.nicus};

  }
`;
