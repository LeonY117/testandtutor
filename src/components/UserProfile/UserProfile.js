import React from "react";
import Aux from "../../hoc/Aux";
import UserInfo from "./UserInfo/UserInfo";
import Dashboard from "./Dashboard/Dashboard";

const userProfile = (props) => {
  return (
    <Aux>
      <UserInfo
        username={props.username}
        date={props.examDate}
        subject={props.subject}
      />
      <Dashboard suggestions={props.suggestedTopics}/>
      <div>Topic Breakdown</div>
    </Aux>
  );
};

export default userProfile;
