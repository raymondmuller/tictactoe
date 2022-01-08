import { observer } from "mobx-react-lite";
import game from "../stores/game";

export default observer((): JSX.Element => {
  const backToMenu = (): void => {
    game.backToMenu();
  };

  return (
    <>
      <h4>{game.winner ? `Winner is ${game.winner}` : "It's a draw!"}</h4>
      <button className="btn btn-lg btn-primary mt-5" onClick={backToMenu}>
        BACK TO THE MENU
      </button>
    </>
  );
});
