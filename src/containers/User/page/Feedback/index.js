/* eslint-disable react/prop-types */

import { Avatar, Button, Comment, Form, Input, List, Typography } from "antd";
import moment from "moment";
import React, { memo, useState } from "react";
import { compose } from "redux";
import { storeFeedbackEvaluation } from "./component/evaluation";

const { TextArea } = Input;

const { Paragraph } = Typography;

//  propType
// const propsProTypes = {};

// const propsDefault = {};

const renderValue = (value = "") => {
  return <Paragraph>{value}</Paragraph>;
};

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);


export const Feedback = () => {
  const [comments, setComments] = useState([]);
  const [submitting, setSubmittings] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value) {
      return;
    }

    const currentUser = localStorage.getItem("dictionary__username");
    console.log(currentUser);
    storeFeedbackEvaluation(0, value);

    setSubmittings(true);

    setTimeout(() => {
      setSubmittings(false);
      setValue("");
      setComments([
        {
          author: "Han Solo",
          avatar:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          content: renderValue(value),
          datetime: moment().fromNow(),
        },
        ...comments,
      ]);
    }, 1000);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </>
  );
};

export default compose(memo)(Feedback);
