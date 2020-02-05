import React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { getListEventsFromAPI } from "./listEvents.action";
import { Row, Col, Layout, Rate, Tag, Spin } from "antd";
import faker from "faker";

const { Content } = Layout;
const LIST_EVENTS_STORE = "LIST_EVENTS_STORE";

const loadListEventsFromReducer = state => state[LIST_EVENTS_STORE].listEvents;
const loaddingRequestFromReducer = state => state[LIST_EVENTS_STORE].loading;

const startSelector = createSelector(
  loadListEventsFromReducer,
  loaddingRequestFromReducer,
  (listEvents, loading) => ({
    listEvents: listEvents || [],
    loading: loading
  })
);

class ListEvents extends React.Component {
  componentDidMount() {
    this.props.getListEventsFromAPI && this.props.getListEventsFromAPI();
  }

  render() {
    return (
      <Content
        style={{
          padding: "25px 100px 0px 100px",
          backgroundColor: "white"
        }}
      >
        <Spin spinning={this.props.loading} tip="Loading..." >
          {this.props.listEvents.map((data, key) => (
            <div key={key}>
              <Row>
                <Col span={10}>
                  <div
                    style={{
                      backgroundImage: `url(${faker.image.transport()})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "noRepeat",
                      width: "450px",
                      height: "280px"
                    }}
                  />
                </Col>
                <Col span={14}>
                  <span>{data.title}</span>
                  <h3>
                    <a href="">{data.title}</a>
                  </h3>
                  <span>Ngày 28, tháng 1, 2019</span>
                  <span> {data.numberOfFeedback} Đánh giá</span>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Culpa, provident corporis laudantium cumque vitae quisquam
                    maiores fuga voluptatum delectus? Aperiam repudiandae
                    aspernatur quidem, quam atque architecto minima asperiores
                    animi libero? Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Harum, rerum omnis rem nobis, commodi unde
                    natus molestiae pariatur magnam quos maxime necessitatibus
                    magni. Amet perspiciatis quod totam voluptatibus velit
                    deserunt? Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Quo dolorum eaque totam iste eligendi repellat animi
                    velit, deserunt pariatur nulla deleniti! Porro blanditiis
                    fugiat est temporibus suscipit ea dolorum a? Lorem, ipsum
                    dolor sit amet consectetur adipisicing elit. Cumque est ex
                    repellendus saepe dolor quisquam veritatis at omnis commodi
                    dolorem impedit, alias fuga iusto hic aliquid placeat,
                    voluptatem, expedita similique!
                  </p>
                  <Tag color="#f50">Đang diễn ra</Tag>
                  <Tag color="#2db7f5">Sắp diễn ra</Tag>
                  <Tag color="#87d068">Đã diễn ra</Tag>
                  <h2> {data.rate} </h2>
                  <Rate allowHalf disabled defaultValue={data.rate} />
                </Col>
              </Row>
            </div>
          ))}
        </Spin>
      </Content>
    );
  }
}

export default connect(
  startSelector,
  { getListEventsFromAPI }
)(ListEvents);
