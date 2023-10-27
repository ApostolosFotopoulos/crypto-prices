import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StyledTable } from "../../../styledComponents/StyledComponents";

// Styled components
const CoinsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  width: 1000px;
`;

export default function CoinsList() {
  const [coins, setCoins] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") || "1";

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/api/coins/markets/${page}`);
        const data = await response.json();

        if (data?.errMsg) {
          throw new Error(data.errMsg);
        }

        setCoins(data);
      } catch (err) {
        toast.error(err.toString(), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }

    fetchData();
  }, [page]);

  // Open the details page of a coin
  function openCoinPage(e) {
    const id = e.currentTarget.id;
    navigate({
      pathname: `/coins/${id}`,
    });
  }

  return (
    coins && (
      <CoinsContainer>
        <StyledTable $cursorPointer>
          <thead>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price</th>
              <th>High 24h</th>
              <th>Low 24h</th>
              <th>Price Change 24h</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr key={coin.id} id={coin.id} onClick={(e) => openCoinPage(e)}>
                <td>{coin.name || "NA"}</td>
                <td>{coin.symbol || "NA"}</td>
                <td>{coin.currentPrice || "NA"}$</td>
                <td>{coin.high24h || "NA"}$</td>
                <td>{coin.low24h || "NA"}$</td>
                <td
                  style={
                    coin.priceChangePercentage24h && coin.priceChangePercentage24h > 0
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  {coin.priceChangePercentage24h ? coin.priceChangePercentage24h.toFixed(2) : "NA"}%
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </CoinsContainer>
    )
  );
}
