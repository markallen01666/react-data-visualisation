import React from "react";

import Text from "./Text";

const TextBlock = props => {
  return (
    <Text style={{ ...textBlockStyle, ...props.style }}>{props.children}</Text>
  );
};

const textBlockStyle = {
  margin: 10,
  backgroundColor: "white",
  color: "#555",
  textAlign: 'left'
};

export default TextBlock;
