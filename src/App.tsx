import styled from "styled-components";

import MainHeader from "./components/main-header/MainHeader";
import Tasks from "./components/tasks/Tasks";

const Main = styled.main`
  width: 60%;
  margin: 0 auto;
`;

function App() {
  return (
    <>
      <MainHeader title={"Todays tasks:"} />
      <Main>
        <Tasks />
      </Main>
    </>
  );
}

export default App;
