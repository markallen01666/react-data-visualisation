import React from "react";

const Picker = props => {
  const selecter = [props.cardId] + "selecter";
  const selectHandler = () => {
    let e = document.getElementById(selecter).value;
    let chosenTool = {
      [props.cardId]: e
    }
    props.changeTool(chosenTool);
  };
  return (
    <div style={pickerStyle}>
      <select
        id={selecter}
        style={{ ...pickerStyle, ...props.style }}
        onChange={selectHandler}
      >
        <option value="none">- none -</option>
        <option value="react">React</option>
        <option value="angular">Angular</option>
        <option value="vuejs">Vue</option>
        <option value="jest">Jest</option>
        <option value="reactnative">React Native</option>
      </select>
    </div>
  );
};

const pickerStyle = {
  flex: 1
};

export default Picker;
