import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  min-height: 100vh;
`;

const cursorPointer = `
  tbody tr {
    cursor: pointer;

    &:hover {
      filter: brightness(0.8);
    }
  }
`;

const cursorAuto = `
  tbody tr {
    cursor: auto;
  }
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;

  thead tr {
    width: 100%;
    padding: 1rem;
    background: var(--color-light-blue);
  }

  tbody tr {
    width: 100%;
    padding: 1rem;
    background: var(--color-gray);

    &:nth-of-type(odd) {
      background: var(--color-light-gray);
    }
  }

  td,
  th {
    padding: 1rem;
    text-align: left;
  }

  ${(props) => (props.$cursorPointer ? cursorPointer : cursorAuto)};
`;
