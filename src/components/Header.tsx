import styled from "styled-components"

const Header = styled.h1`
    position: absolute;
    width: 100vw;
    top: 0;
    height: 50px;
`;


export default (): JSX.Element => {
    return (
        <Header className="py-2 mb-4 border-bottom w-100">Tic Tac Toe</Header>
    )
}