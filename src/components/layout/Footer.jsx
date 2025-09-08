import { Container, Row, Col, Nav } from "react-bootstrap";
import "../../styles/main.css"

function AppFooter() {
  return (
    <footer className="text-light py-3 mt-0">
      <Container>
        {/* Top Links */}
        <Row>
          <Col>
            <Nav className="justify-content-center flex-wrap text-center">
              <Nav.Link href="#about" className="footer-link">About</Nav.Link>
              <Nav.Link href="#api" className="footer-link">API Info</Nav.Link>
              <Nav.Link href="#contact" className="footer-link">Contact</Nav.Link>
              <Nav.Link href="https://github.com" className="footer-link">GitHub</Nav.Link>
              <Nav.Link href="#privacy" className="footer-link">Privacy Policy</Nav.Link>
            </Nav>
          </Col>
        </Row>

        {/* Bottom Copyright */}
        <Row className="mt-2">
          <Col className="text-center">
            <small>
              ©{new Date().getFullYear()} Gold Tracker. All rights reserved.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default AppFooter;
