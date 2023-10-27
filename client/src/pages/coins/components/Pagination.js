import styled from "styled-components";
import { useLocation, createSearchParams, useNavigate } from "react-router-dom";
import chevronLeft from "../../../images/chevron-left.svg";
import chevronRight from "../../../images/chevron-right.svg";

// Styled components
const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
`;

const enabled = `
cursor: pointer;
background-color: var(--color-green);
transition: background-color 0.2s;

&:hover {
  background-color: var(--color-dark-green);
}
`;

const disabled = `
  background-color: var(--color-dark-gray);
`;

const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 50px;
  img {
    filter: invert(100%);
  }
  ${(props) => (props.disabled ? disabled : enabled)};
`;

const PaginationText = styled.p`
  font-size: 1.2rem;
  margin-right: 1rem;
  margin-left: 1rem;
`;

export default function Pagination() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") || "1";

  // Check if the current page is the first one
  function isFirstPage() {
    return page === "1";
  }

  // Move to next page
  function incrementPage() {
    navigate({
      pathname: "/",
      search: `?${createSearchParams({ page: Number(page) + 1 })}`,
    });
  }

  // Move to prev page
  function decrementPage() {
    if (page === "2") {
      navigate({
        pathname: "/",
      });
      return;
    }

    navigate({
      pathname: "/",
      search: `?${createSearchParams({ page: Number(page) - 1 })}`,
    });
  }

  return (
    <PaginationContainer>
      <PaginationButton onClick={() => decrementPage()} disabled={isFirstPage()}>
        <img src={chevronLeft} alt="prev" />
      </PaginationButton>
      <PaginationText>{page}</PaginationText>
      <PaginationButton onClick={incrementPage}>
        <img src={chevronRight} alt="next" />
      </PaginationButton>
    </PaginationContainer>
  );
}
