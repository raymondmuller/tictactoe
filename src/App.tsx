import { observer } from "mobx-react-lite";
import "./App.css";

import game, { View } from "./stores/game";

import Game from "./components/Game";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Result from "./components/Result";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 50px;
`;

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        {game.view === View.MENU ? (
          <Menu />
        ) : game.view === View.RESULT ? (
          <Result />
        ) : (
          <Game />
        )}
      </Container>
    </div>
  );
}

export default observer(App);
