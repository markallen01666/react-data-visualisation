import React from "react";

const Header = props => {
  return (
    <div style={headerStyle}>
      <h1 style={{ ...titleStyle, ...props.style }}>{props.title}</h1>
    </div>
  );
};

const headerStyle = {
 display: "flex",
 color: "#323330",
 backgroundColor: "#F0DB4F"
};
const titleStyle = {
  margin: "auto",
  padding: 20,
  fontSize: 24
};

export default Header;
