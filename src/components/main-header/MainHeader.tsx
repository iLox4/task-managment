import styled from "styled-components";

const StyledHeader = styled.header`
  margin: 0;
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    display: inline;
  }

  button {
    border: 1px transparent solid;
    border-radius: 8px;
    cursor: pointer;
    padding: 7px 12px;
    background-color: #626262;
    font-size: 17px;
    font-weight: bold;
  }

  button:hover {
    background-color: #737373;
  }
`;

export default function MainHeader({ title, openModal }: { title: string; openModal: () => void }) {
  //const todayDate = new Date().toLocaleDateString();
  return (
    <StyledHeader>
      <h1>{title}</h1>
      <button onClick={openModal}>+Add</button>
    </StyledHeader>
  );
}
