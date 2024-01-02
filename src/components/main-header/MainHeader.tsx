import styled from "styled-components";

const StyledHeader = styled.header`
  margin: 0;
  padding: 20px 0 0 20px;
`

export default function MainHeader({ title }: { title: string }) {
  //const todayDate = new Date().toLocaleDateString();
  return (
    <StyledHeader>
      <h1>{title}</h1>
    </StyledHeader>
  );
}
