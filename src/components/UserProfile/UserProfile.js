import React from "react";
import Aux from "../../hoc/Aux";
import UserInfo from "./UserInfo/UserInfo";
import Dashboard from "./Dashboard/Dashboard";
import TopicBreakdown from "./TopicBreakdown/TopicBreakdown";

const userProfile = (props) => {
  return (
    <Aux>
      <UserInfo
        username={props.username}
        date={props.examDate}
        subject={props.subject}
      />
      <Dashboard suggestions={props.suggestedTopics} />
      <TopicBreakdown />
    </Aux>
  );
};

export default userProfile;
