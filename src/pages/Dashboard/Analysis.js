import React, {Fragment, Component} from 'react';
import {
    Card,
    Icon,
    Row,
    Col,
    Tooltip as AntTooltip,
    Radio,
    Modal,
    Table,
    Input,
    Form
} from 'antd'
import {
    Chart,
    Axis,
    Geom,
    Tooltip,
    Coord,
    Legend,
    Label
} from 'bizcharts'
import {View} from '@antv/data-set';
import numeral from 'numeral';
import './Analysis.less'
import styled from 'styled-components'
// import Line from '../../components/Chart/Line'
// import Inter from '../../components/Chart/IntervalStack'
// import '../../components/Chart'
// import KeyTable from './keyTable'

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const data3 = [
    {
        item: '事例一',
        count: 40
    }, {
        item: '事例二',
        count: 21
    }, {
        item: '事例三',
        count: 17
    }, {
        item: '事例四',
        count: 13
    }, {
        item: '事例五',
        count: 9
    }
];
const dv = new View();
dv
    .source(data3)
    .transform({type: 'percent', field: 'count', dimension: 'item', as: 'percent'});
const cols1 = {
    percent: {
      formatter: val => !(+val) ? '0' :  ((val * 100).toFixed(1)) + '%'
    }
}
const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: {
        marginBottom: 24
    }
};

const data2 = [
    {
        year: "1991",
        value: 3
    }, {
        year: "1992",
        value: 4
    }, {
        year: "1993",
        value: 3.5
    }, {
        year: "1994",
        value: 5
    }, {
        year: "1995",
        value: 4.9
    }, {
        year: "1996",
        value: 6
    }, {
        year: "1997",
        value: 7
    }, {
        year: "1998",
        value: 9
    }, {
        year: "1999",
        value: 13
    }
];
const cols11 = {
    // y轴间隔
    'sales': {tickInterval: 20},
};
const data11 = [
    { year: '1951 年', sales: 38 },
    { year: '1952 年', sales: 52 },
    { year: '1956 年', sales: 61 },
    { year: '1957 年', sales: 145 },
    { year: '1958 年', sales: 48 },
    { year: '1959 年', sales: 38 },
    { year: '1960 年', sales: 38 },
    { year: '1962 年', sales: 38 },
  ];

const cols = {
    'value': {
        min: 0
    },
    'year': {
        range: [0, 1]
    }
};

const visitData = [
    {
        "x": "2018-05-23",
        "y": 7
    }, {
        "x": "2018-05-24",
        "y": 5
    }, {
        "x": "2018-05-25",
        "y": 4
    }, {
        "x": "2018-05-26",
        "y": 2
    }, {
        "x": "2018-05-27",
        "y": 4
    }, {
        "x": "2018-05-28",
        "y": 7
    }, {
        "x": "2018-05-29",
        "y": 5
    }, {
        "x": "2018-05-30",
        "y": 6
    }, {
        "x": "2018-05-31",
        "y": 5
    }, {
        "x": "2018-06-01",
        "y": 9
    }, {
        "x": "2018-06-02",
        "y": 6
    }, {
        "x": "2018-06-03",
        "y": 3
    }, {
        "x": "2018-06-04",
        "y": 1
    }, {
        "x": "2018-06-05",
        "y": 5
    }, {
        "x": "2018-06-06",
        "y": 3
    }, {
        "x": "2018-06-07",
        "y": 6
    }, {
        "x": "2018-06-08",
        "y": 5
    }
]

function onChange(e) {
    console.log(`radio checked:${e.target.value}`);
}

export default class Analysis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            visible: false,
            trendVisible: false,
            modalTitle: '关键指标',
            keyColumns: [
                {
                    title: '序号',
                    dataIndex: 'key',
                    align: 'center',
                    width: 70
                    // render: (text, record) => <a href="javascript:;">{text}</a>,
                }, {
                    title: '小标题',
                    dataIndex: 'title',
                    align: 'center',
                    render: (text, record) => <Input
                            value={text}
                            onChange={(e) => {
                            this.changeValue(record.index, 'title', e.target.value)
                        }}/>
                }, {
                    title: '报表ID',
                    width: 100,
                    dataIndex: 'reportId',
                    align: 'center',
                    // render: text => <Input value={text} onChange={null}/>
                }, {
                    title: '指标序号',
                    width: 100,
                    dataIndex: 'indexNum',
                    align: 'center',
                    // render: text => <Input value={text} onChange={null}/>
                }, {
                    title: '操作',
                    width: 70,
                    dataIndex: 'operation',
                    align: 'center',
                    render: (text, record) => <a
                            href="javascript:;"
                            onClick={this
                            .empty
                            .bind(this, record.index)}>清空</a>
                }
            ],
            keyData: [
                {
                    key: '1',
                    index: 1,
                    title: '新增用户数',
                    indexNum: '1',
                    reportId: '2'
                }, {
                    key: '2',
                    index: 2,
                    title: '活跃用户数',
                    indexNum: '2',
                    reportId: '1'
                }, {
                    key: '3',
                    index: 3,
                    title: '完成支付新卡订单',
                    indexNum: '1',
                    reportId: '2'
                }, {
                    key: '4',
                    index: 4,
                    title: '激活成功新卡订单',
                    indexNum: '1',
                    reportId: '1'
                }
            ],
            trendColumns: [
                {
                    title: '序号',
                    dataIndex: 'key',
                    align: 'center',
                    width: 70
                    // render: (text, record) => <a href="javascript:;">{text}</a>,
                }, {
                    title: '小标题',
                    dataIndex: 'title',
                    align: 'center',
                    render: (text, record) => <Input
                            value={text}
                            onChange={(e) => {
                            this.changeValue(record.index, 'title', e.target.value)
                        }}/>
                }, {
                    title: '报表ID',
                    width: 100,
                    dataIndex: 'reportId',
                    align: 'center',
                    render: (text, record) => <Input
                            value={text}
                            onChange={(e) => {
                            this.changeValue(record.index, 'reportId', e.target.value)
                        }}/>
                }, {
                    title: '指标序号',
                    width: 100,
                    dataIndex: 'indexNum',
                    align: 'center',
                    render: (text, record) => <Input
                            value={text}
                            onChange={(e) => {
                            this.changeValue(record.index, 'indexNum', e.target.value)
                        }}/>
                }, {
                    title: '操作',
                    width: 70,
                    dataIndex: 'operation',
                    align: 'center',
                    render: (text, record) => <a
                            href="javascript:;"
                            onClick={this
                            .empty
                            .bind(this, record.index)}>清空</a>
                }
            ],
            trendIndex: [
                {
                    title: '新增用户数',
                    key: 0
                }, {
                    title: '活跃用户数',
                    key: 1
                }, {
                    title: '新增申办订单数',
                    key: 2
                }, {
                    title: '完成支付新卡订单数',
                    key: 3
                }, {
                    title: '激活成功新卡订单',
                    key: 4
                }, {
                    title: '结余黑名单用户数',
                    key: 5
                }
            ]
        }
    }
    /**
     * TODO
     * key 关键字
     */
    changeValue = (index, key, value) => {
        // 找到对应index 修改对应 key value
        let keyData = this.state.keyData;
        let keyIndex = keyData.findIndex(item => item.index === index)
        keyData[keyIndex][key] = value
        this.setState({keyData})
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({loading: false})
        }, 500)
    }
    empty(index) {
        let keyData = this.state.keyData
        // 对应 index
        let newKeyData = keyData.map(item => {
            if (item.index === index) {
                console.log(this.reportDom);
                item = {
                    ...item,
                    title: '',
                    indexNum: '',
                    reportId: ''
                }
            }
            return item
        })

        this.setState({keyData: newKeyData})

    }
    showKeyModal = () => {
        this.setState({modalTitle: '关键指标', visible: true})
    }

    changeStatus = (visible) => {
        this.setState({visible})
    }
    handleOk = () => {
        this.changeStatus(false)
    }
    handleCancel = () => {
        this.changeStatus(false)
    }
    render() {
        const {keyColumns, keyData, modalTitle, visible, trendIndex} = this.state
        return (
            <Fragment>
                <Card
                    style={{
                    marginTop: 24
                }}
                    loading={this.state.loading}
                    title={<span> 整体趋势 < Icon type = "edit" /></span>}
                    bordered={false}>

                    <RadioGroup onChange={onChange} defaultValue={trendIndex[0].title}>
                        {trendIndex.map(item => (
                            <RadioButton key={item.title} value={item.title}>{item.title}</RadioButton>
                        ))
}

                    </RadioGroup>
                    {/* <Line data={data2} scale={cols} type='line'></Line> */}
                </Card>


                <Modal
                    title={'整体趋势'}
                    visible={this.state.trendVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    maskClosable={false}
                    width={600}>
                    <Table
                        columns={this.state.trendColumns}
                        dataSource={this.state.keyData}
                        bordered
                        pagination={false}/>
                </Modal>
                {/* // ------------------ */}
                <Row gutter={24} style={{
                    marginTop: 24
                }}>
                    <Col span={12}>
                        <Card title="新卡申办步骤转化" bordered={false} loading={this.state.loading}>
                        <Chart height={500} data={data11} scale={cols11} forceFit>
                            <Axis name="year" />
                            <Axis name="sales" />
                            <Tooltip crosshairs={{type : "y"}}/>
                            <Geom type="interval" position="year*sales" />
                        </Chart>


                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="省份每日新卡申办量" bordered={false} loading={this.state.loading}>
                            <Chart
                                height={500}
                                data={dv}
                                scale={cols1}
                                padding={[80, 100, 80, 80]}
                                forceFit>
                                <Coord type='theta' radius={0.75}/>
                                <Axis name="percent"/> {/* 选择样式 */}
                                <Legend position='right'/> {/* 鼠标移入的样式 */}
                                <Tooltip
                                    showTitle={false}
                                    itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'/>

                                <Geom
                                    type="intervalStack"
                                    position="percent"
                                    color='item'
                                    tooltip={[
                                    'item*percent',
                                    (item, percent) => {
                                        percent = percent * 100 + '111%';
                                        return {name: item, value: percent};
                                    }
                                ]}
                                    style={{
                                    lineWidth: 1,
                                    stroke: '#fff'
                                }}>

                                    <Label
                                        content='percent'
                                        formatter={(val, item) => {
                                        return item.point.item + ': ' + val;
                                    }}/>
                                </Geom>
                            </Chart>
                        </Card>
                    </Col>
                </Row>
                {/* {*-------------------------- *} */}
                <Row gutter={24} style={{
                    marginTop: 24
                }}>
                    <Col span={12}>
                        <Card title="新卡付费率" bordered={false} loading={this.state.loading}>
                            {/* <Inter></Inter> */}


                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="黑名单监控" bordered={false} loading={this.state.loading}>
                            {/* <Line data={data2} scale={cols} type='line'></Line> */}
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

const Top = styled.div `

    .action {
        cursor: pointer;
        float: right;
    }
`

const CardFooter = styled.div `
        font-size: 14px;
        line-height: 22px;
    .caret {
        margin-left: 4px;
        position: relative;
        top: 1px;
    }
`

const Body = styled.div `
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
    color: @heading-color;
    margin-top: 4px;
    margin-bottom: 0;
    font-size: 30px;
    line-height: 38px;
    height: 38px;
    margin-bottom: 12px;
`
