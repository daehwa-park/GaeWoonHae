import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { roomActions } from "../../redux/reducer/roomInfoReducer";
// import "./LimitTime.css";
const LimitTime = () => {
  const hostName = useSelector((state) => state.roomInfo.hostName);
  const myName = useSelector((state) => state.auth.user.nickname);

  const dispatch = useDispatch();
  const [limitTime, setLimitTime] = useState(60);
  const saveTime = () => {
    dispatch(roomActions.getLimitTime({ limitTime }));
  };
  const handleTimeChange = (event) => {
    setLimitTime(Number(event.target.value)); // 선택된 값을 timeSecond로 설정
  };
  useEffect(() => {
    console.log("제한시간이양", limitTime);
    saveTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limitTime]);
  return (
    <Card bg="light">
      <Card.Header className="card-head">
        제한 시간
      </Card.Header>
      <Card.Body>
        <Row className="text-center">
          {hostName === myName ? (
            <>
              <Col lg={8}>{`${limitTime} 초`}</Col>
              <Col lg={4}>
                <select name="time" onChange={handleTimeChange}>
                  <option value={60}>60</option>
                  <option value={90}>90</option>
                  <option value={120}>120</option>
                  <option value={150}>150</option>
                </select>
              </Col>
            </>
          ) : (
            <Col lg={12}>
              시간 설정을 채팅으로 <br />
              방장과 상의하세요!
            </Col>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default LimitTime;