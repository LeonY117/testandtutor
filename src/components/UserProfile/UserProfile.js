import React from "react";
import UserInfo from "./UserInfo/UserInfo";
import Overview from "../../pages/Dashboard/Overview/Overview";
import TopicBreakdown from "./TopicBreakdown/TopicBreakdown";
import TestPrompter from "./TestPrompter/TestPrompter";

const userProfile = (props) => {
  return (
    <React.Fragment>
      <UserInfo
        username={props.username}
        date={props.examDate}
        subject={props.subject}
      />
      {/* <Dashboard
        suggestions={props.suggestedTopics}
        testButtonClicked={props.testButtonClicked}
        topics={props.topics}
      /> */}
      <TopicBreakdown
        selectChangedHandler={props.selectChangedHandler}
        topics={props.topics}
        selectedTopicBreakdown={props.selectedTopicBreakdown}
      />
      <TestPrompter testButtonClicked={props.testButtonClicked} />
    </React.Fragment>
  );
};

export default userProfile;
