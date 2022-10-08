import React, { useState, useContext, useEffect } from "react";

import Content from "hoc/Content/Content";
import Loading from "components/Loading/Loading";
import TestLists from "components/TestLists/TestLists";

import axios from "store/axios";
import AuthContext from "store/auth-context";

const SelectTest = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tests, setTests] = useState({});
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    // console.log({ data: { userId: this.state.userId } });
    axios
      .get("/tests/available_tests")
      .then((response) => {
        const responseData = response.data.data;
        const testsCopy = {};

        for (const test of responseData) {
          testsCopy[test.id] = {};
          testsCopy[test.id]["name"] = test.title;
          // TODO: this should come from the backend
          testsCopy[test.id]["topic"] = test.title.split(" ")[0];
          testsCopy[test.id]["status"] = test.last_attempt
            ? "finished"
            : "unfinished";
          testsCopy[test.id]["length"] = test.duration;
          testsCopy[test.id]["score"] = test.last_attempt
            ? test.last_attempt.score
            : null;
          testsCopy[test.id]["totalScore"] = test.max_marks; //test.totalScore
        }
        setTests(testsCopy);
        setIsLoading(false);
      })
      .catch((error) => {
        authCtx.logout();
        setIsLoading(false);
      });
  }, [authCtx]);

  return (
    <Content withNav>
      {isLoading && <Loading />}
      {!isLoading && <TestLists tests={tests} />}
    </Content>
  );
};

export default SelectTest;
