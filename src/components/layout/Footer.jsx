import { Container } from "react-bootstrap";

function AppFooter() {
  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <Container className="text-center">
        <p className="mb-0">&copy; {new Date().getFullYear()} GoldPulse. All Rights Reserved.</p>
      </Container>
    </footer>
  );
}

export default AppFooter;
