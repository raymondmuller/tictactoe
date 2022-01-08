import { useState } from "react";
import styled from "styled-components";
import game from "../stores/game";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default (): JSX.Element => {
  const [gridSize, setGridSize] = useState(3);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setGridSize(parseInt(e.target.value)); // update grid size
  };

  const play = (): void => {
    game.play(gridSize); // start the game
  };

  return (
    <Menu>
      <div className="form-group">
        <label className="mb-2">Grid Size</label>
        <input
          type="range"
          min="3"
          max="20"
          value={gridSize}
          className="form-control"
          onChange={handleChange}
        />
        <small>
          You will play on a {gridSize}x{gridSize} grid
        </small>
      </div>
      <br />
      <button className="btn btn-lg btn-primary" onClick={play}>
        PLAY
      </button>
    </Menu>
  );
};
