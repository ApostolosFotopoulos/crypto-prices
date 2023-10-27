import Pagination from "./components/Pagination";
import CoinsList from "./components/CoinsList";
import { Container } from "../../styledComponents/StyledComponents";

export default function Coins() {
  return (
    <Container>
      <CoinsList />
      <Pagination />
    </Container>
  );
}
