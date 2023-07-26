import React from "react";
import "./MainPage.css";
import styled from "styled-components";

const SideNavBtn = styled.div`
  width: 100px;
  height: 100px;
  background-color: white;
`;

const SideNavBox = () => {
  return (
    <div className="SideBox">
      SideNavBox
      <SideNavBtn>qwdn</SideNavBtn>
    </div>
  );
};

export default SideNavBox;
