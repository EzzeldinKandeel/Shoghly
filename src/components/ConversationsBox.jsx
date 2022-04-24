import React from "react";
import workerPic from "../images/placeholder_200px_200px.png";
import { getData } from "../data";
import "../styles/conversationsBox.css";

function ConversationsBox(props) {
  console.log(props.workersIds_);
  let data = getData();
  let workerName;
  data.workers
    .filter((x) => x.id == props.workersIds_)
    .map((x) => {
      workerName = `${x.name.first} ${x.name.last}`;
    });
  return (
    <div className="convContainer">
      <div className="leftSection">
        <img className="workerImage" src={workerPic}></img>
        <div>{workerName}</div>
      </div>
      <div className="rightSection"></div>
    </div>
  );
}

export default ConversationsBox;
