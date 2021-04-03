import React from "react";
import Aux from "../../hoc/Aux";
import UserInfo from "./UserInfo/UserInfo";
import Dashboard from "./Dashboard/Dashboard";
import TopicBreakdown from "./TopicBreakdown/TopicBreakdown";
import TestPrompter from './TestPrompter/TestPrompter'

const userProfile = (props) => {
  return (
    <Aux>
      <UserInfo
        username={props.username}
        date={props.examDate}
        subject={props.subject}
      />
      <Dashboard suggestions={props.suggestedTopics} />
      <TopicBreakdown
        selectChangedHandler={props.selectChangedHandler}
        topics={props.topics}
        selectedTopicBreakdown={props.selectedTopicBreakdown}
      />
      <TestPrompter />
    </Aux>
  );
};

export default userProfile;
