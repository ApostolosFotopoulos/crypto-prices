import styled from "styled-components";

const PageNotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

export default function PageNotFound() {
  return (
    <PageNotFoundContainer>
      <h2>404 Page not found</h2>
    </PageNotFoundContainer>
  );
}
