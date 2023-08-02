import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import SideNavBox from "./SideNavBox";

const Mainpage = (props) => {
  const num = useSelector((state) => state.A);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col className="px-0" md={3}>
            <SideNavBox />
          </Col>
          <Col md={9}>
            <h1>메인페이지</h1>
            <h3>{num}</h3>
            {/* nav */}
            <button>main</button>
            <Link to="/mypage">
              <button>Profile</button>
            </Link>

            <button>Enter code(친구초대)</button>
            <button>BGM</button>

            {/* 모달+ */}
            {/* 슬라이드 작업 */}
            <Link to="/gamepage/1">
              <button>박터트리기-게임선택</button>
            </Link>
            <Link to="/">
              <button>게임선택</button>
            </Link>
            <Link to="/">
              <button>게임선택</button>
            </Link>
            {/*  */}
            <Link to="/">
              <button>로그아웃</button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Mainpage;
