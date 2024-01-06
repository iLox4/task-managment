import { ReactElement } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const ModalStyled = styled.div`
  border: 1px transparent solid;
  border-radius: 8px;
  background-color: white;
  padding: 20px;
  position: relative;
  z-index: 100;
`;

const OverlayStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #47474792;
  z-index: 10;
`;

const ModalWrapper = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  place-items: center;
  background: transparent;
`;

export default function Modal({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  let modalDiv = document.getElementById("modal");
  if (!modalDiv) {
    modalDiv = document.createElement("div");
    modalDiv.setAttribute("id", "modal");
  }

  const modalContent = (
    <>
      <OverlayStyled />
      <ModalWrapper>
        <ModalStyled>{children}</ModalStyled>
      </ModalWrapper>
    </>
  );

  return createPortal(modalContent, modalDiv);
}
