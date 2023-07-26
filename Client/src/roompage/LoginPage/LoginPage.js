// import { Link } from "react-router-dom";
// import { Container, Row, Col } from "react-bootstrap";
import LoginBox from "./LoginBox";
import "./LoginPage.css";
const LoginPage = () => {
  return (
    <div className="login-bg">
      <LoginBox />
      {/* <Container>
        <Row>
          <Col lg={3}>
            <Link to="/main">
              <img src="/images/img/KakaoLoginBtn.png" alt="dsa" />
            </Link>
          </Col>
          <Col lg={9}>
            <img src="/images/img/bg.png" alt="" />
          </Col>
        </Row> 
  </Container> */}
    </div>
  );
};

export default LoginPage;