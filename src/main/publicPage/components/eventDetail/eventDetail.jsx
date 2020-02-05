import React from 'react';
import { Carousel, Layout, Row, Steps, Rate, Popover, Button, Table, Comment, Tooltip, List } from 'antd';
import faker from 'faker';
import '../../../../assets/scss/eventStyle.css';
import moment from 'moment';
const { Content } = Layout;
const listEventImg = [faker.image.city(), faker.image.food(),
faker.image.nature(), faker.image.city(), faker.image.food(), faker.image.nature()];

const tmp = [];

for (let i = 1; i < 4; i++) {
    tmp.push({
        key: i,
        name: `Edward King ${i}`,
        registeredTime: '3/2/2019',
        ticket: i
    });
}


const columns = [{
    title: 'Tên',
    dataIndex: 'name',
    width: 150
}, {
    title: 'Ngày mua',
    dataIndex: 'registeredTime',
    width: 150
}, {
    title: 'Số lượng vé',
    dataIndex: 'ticket'
}];


const Step = Steps.Step;

const customDot = (dot, { status, index }) => (
    <Popover content={<span> Mốc {index} Trạng Thái: {status}</span>}>
        {dot}
    </Popover>
);

class EventDetail extends React.Component {
    state = { listEventImg }
    render() {
        return (
            <Content style={{ padding: '25px 100px 0px 100px', backgroundColor: 'white' }} >

                <Carousel autoplay>
                    {this.state.listEventImg.map((data, i) => {
                        return <img src={data} alt="" className="cover" key={i} />;
                    })}
                </Carousel>
                <div>
                    <Row>
                        <Steps current={1} progressDot={customDot}>
                            <Step title="Ngày công bố" description="You can hover on the dot." />
                            <Step title="Ngày đăng ký" description="You can hover on the dot." />
                            <Step title="Ngày đóng đăng ký" description="You can hover on the dot." />
                            <Step title="Ngày diễn ra" description="You can hover on the dot." />
                            <Step title="Ngày kết thúc" description="You can hover on the dot." />
                        </Steps>
                    </Row>
                    <Row>
                        <span>{faker.name.title()}</span>
                        <h3><a href="">{faker.name.title()}</a></h3>
                        <span>Ngày 28, tháng 1, 2019</span>
                        <span>  {faker.random.number()} Đánh giá</span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate nemo ad atque quae nostrum dolor perspiciatis reprehenderit sunt ut laboriosam. Quos repudiandae tempore quam perspiciatis, at ex dolorum eum enim?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ad iure atque delectus natus sint repellat? Quidem quo fuga, nemo tenetur reiciendis modi nulla, maxime aliquid minima ipsa, veritatis natus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia repellat corporis totam cupiditate tenetur. A aliquid autem voluptate reprehenderit obcaecati minima ipsa. Aperiam maxime maiores hic dicta nulla assumenda consectetur.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam sunt eligendi, aspernatur voluptas dicta quos, aut voluptates placeat mollitia error hic ducimus illo quis consequatur, eos repellendus temporibus dolores?
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores saepe doloremque alias molestias ullam nemo expedita, aperiam corporis maxime ducimus omnis esse, beatae obcaecati unde architecto voluptas similique temporibus quasi!
                        </p>
                        <h2> 4 </h2>
                        <Rate allowHalf disabled defaultValue={4} />
                        <Button type="primary" icon="wallet" size="large">Mua vé</Button>
                    </Row>
                    <Row>
                        <Table columns={columns} dataSource={tmp} pagination={{ pageSize: 20 }} scroll={{ y: 240 }} />
                    </Row>
                    <List
                        className="comment-list"
                        header={`${tmp.length} replies`}
                        itemLayout="horizontal"
                        dataSource={tmp}
                        renderItem={item => (
                            <Comment
                                // actions={item.actions}
                                author={item.name}
                                avatar={faker.image.avatar()}
                                content={item.registeredTime}
                                datetime={(
                                    <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                                        {/* <span>{moment().subtract(2, 'days').fromNow()}</span> */}
                                        <span>{moment("2019-01-21 21:15:00").fromNow()}</span>
                                    </Tooltip>
                                )}
                            />
                        )}
                    />,
                </div>
            </Content>
        );
    }
}

export default EventDetail;