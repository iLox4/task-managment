import { useState } from "react";
import styled from "styled-components";

import MainHeader from "./components/main-header/MainHeader";
import Tasks from "./components/tasks/Tasks";
import ModalForm from "./components/form/ModalForm";

const Main = styled.main`
  width: 60%;
  margin: 0 auto;
`;

function App() {
  const [isModalVis, setIsModalVis] = useState<boolean>(false);

  const handleOpenModal = (): void => {
    setIsModalVis(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = (): void => {
    setIsModalVis(false);
    document.body.style.overflow = "auto";
  }

  return (
    <>
      {isModalVis && <ModalForm onClose={handleCloseModal} />}
      <MainHeader
        title={"Todays tasks:"}
        openModal={handleOpenModal}
      />
      <Main>
        <Tasks />
      </Main>
    </>
  );
}

export default App;
