import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, StyledTable } from "../../styledComponents/StyledComponents";

// Styled components
const CoinDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  gap: 2rem;
  width: 1000px;
`;

const PriceChangeContainer = styled.div`
  width: 100%;
`;

const PriceChangeHeader = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export default function CoinDetails() {
  const [coin, setCoin] = useState(null);
  const { id } = useParams();

  function createMarkup(description) {
    return { __html: description };
  }

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/api/coins/${id}`);
        const data = await response.json();

        if (data?.errMsg) {
          throw new Error(data.errMsg);
        }

        setCoin(data);
      } catch (err) {
        toast.error(err.toString(), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }

    fetchData();
  }, [id]);
  return (
    coin && (
      <Container>
        <CoinDetailsContainer>
          <h1>{coin.name || "Coin"}</h1>
          <p dangerouslySetInnerHTML={createMarkup(coin.description || "")}></p>
          <StyledTable>
            <thead>
              <tr>
                <th>Price</th>
                <th>High 24h</th>
                <th>Low 24h</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{coin.currentPrice || "NA"}$</td>
                <td>{coin.high24h || "NA"}$</td>
                <td>{coin.low24h || "NA"}$</td>
              </tr>
            </tbody>
          </StyledTable>
          <PriceChangeContainer>
            <PriceChangeHeader>Price Change</PriceChangeHeader>
            <StyledTable>
              <thead>
                <tr>
                  <th>24h</th>
                  <th>7d</th>
                  <th>14d</th>
                  <th>30d</th>
                  <th>60d</th>
                  <th>200d</th>
                  <th>1y</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={
                      coin.priceChange24h && coin.priceChange24h > 0 ? { color: "green" } : { color: "red" }
                    }
                  >
                    {coin.priceChange24h ? coin.priceChange24h.toFixed(2) : "NA"}%
                  </td>
                  <td
                    style={
                      coin.priceChange7d && coin.priceChange7d > 0 ? { color: "green" } : { color: "red" }
                    }
                  >
                    {coin.priceChange7d ? coin.priceChange7d.toFixed(2) : "NA"}%
                  </td>
                  <td
                    style={
                      coin.priceChange14d && coin.priceChange14d > 0 ? { color: "green" } : { color: "red" }
                    }
                  >
                    {coin.priceChange14d ? coin.priceChange14d.toFixed(2) : "NA"}%
                  </td>
                  <td
                    style={
                      coin.priceChange30d && coin.priceChange30d > 0 ? { color: "green" } : { color: "red" }
                    }
                  >
                    {coin.priceChange30d ? coin.priceChange30d.toFixed(2) : "NA"}%
                  </td>
                  <td
                    style={
                      coin.priceChange60d && coin.priceChange60d > 0 ? { color: "green" } : { color: "red" }
                    }
                  >
                    {coin.priceChange60d ? coin.priceChange60d.toFixed(2) : "NA"}%
                  </td>
                  <td
                    style={
                      coin.priceChange200d && coin.priceChange200d > 0 ? { color: "green" } : { color: "red" }
                    }
                  >
                    {coin.priceChange200d ? coin.priceChange200d.toFixed(2) : "NA"}%
                  </td>
                  <td
                    style={
                      coin.priceChange1y && coin.priceChange1y > 0 ? { color: "green" } : { color: "red" }
                    }
                  >
                    {coin.priceChange1y ? coin.priceChange1y.toFixed(2) : "NA"}%
                  </td>
                </tr>
              </tbody>
            </StyledTable>
          </PriceChangeContainer>
        </CoinDetailsContainer>
      </Container>
    )
  );
}
