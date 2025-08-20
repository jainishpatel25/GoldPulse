
import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "../../styles/main.css"; // keep your global css

const marketNews = [
  {
    title: "Gold prices surge amid economic uncertainty",
    text: "Analysts predict further gains as investors seek safe-haven assets.",
    image: "https://plus.unsplash.com/premium_photo-1678025061535-91fe679f8105?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z29sZHxlbnwwfHwwfHx8MA%3D%3D", // gold bars
  },
  {
    title: "Central bank policies impact gold market",
    text: "Interest rate decisions and inflation data influence gold prices.",
    image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFua3xlbnwwfHwwfHx8MA%3D%3D", // central bank
  },
  {
    title: "Geopolitical tensions drive gold demand",
    text: "Global events and political instability increase demand for gold.",
    image: "https://images.unsplash.com/photo-1502920514313-52581002a659", // world map
  },
];

function MarketNews() {
  return (
    <section className="market-news-section">
      <Container className="py-5">
        <h3 className="mb-4 fw-bold text-light">Market News</h3>
        {marketNews.map((news, index) => (
          <Row key={index} className="align-items-center mb-5">
            {/* Text Section */}
            <Col md={8}>
              <h5 className="fw-bold text-light">{news.title}</h5>
              <p className="text-muted">{news.text}</p>
            </Col>

            {/* Image Section */}
            <Col md={4} className="text-center">
              <Image
                src={news.image}
                alt={news.title}
                fluid
                rounded
                style={{  width: "270px", height: "170px", objectFit: "cover" }}
              />
            </Col>
          </Row>
        ))}
      </Container>
    </section>
  );
}

export default MarketNews;
