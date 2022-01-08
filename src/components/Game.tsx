import { observer } from "mobx-react-lite";
import { useState } from "react";
import styled from "styled-components";
import game from "../stores/game";

const Grid = styled.div`
  display: grid;
  grid-template: ${(props: { size: number }) =>
    `repeat(${props.size}, 1fr) / repeat(${props.size}, 1fr)`};
  width: 80vw;
  aspect-ratio: 1/1;
  max-height: 80vh;
  max-width: 80vh;
  margin: auto;
`;

export default observer((): JSX.Element => {
  // initialize the 2D array which builds up the UI
  const [grid, setGrid] = useState(
    new Array(game.gridSize)
      .fill(null)
      .map(() => new Array(game.gridSize).fill(null))
  );

  const handleClick = (row: number, col: number): void => {
    // update the visual representation of the grid
    const newGrid = [...grid];
    newGrid[row][col] = game.player;
    setGrid(newGrid);
    game.move(row, col); // let the store know that a move was made
  };

  return (
    <>
    <h4 className="mt-4">Current player: {game.player}</h4>
    <Grid size={game.gridSize}>
      {grid.map((i: any, row: number) =>
        i.map((j: any, col: number) => (
          <button
            disabled={j}
            key={`${row}-${col}`}
            onClick={() => handleClick(row, col)}
          >
            {j}
          </button>
        ))
      )}
    </Grid>
    </>
  );
});
