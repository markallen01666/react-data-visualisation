import React from "react";

const Text = props => {
  return (
    <div style={textStyle}>
      <p style={{...contentStyle, ...props.style}}>{props.children}</p>
    </div>
  );
};

const textStyle = {
  width: "100%",
};

const contentStyle = {
  fontSize: 10
};

export default Text;
