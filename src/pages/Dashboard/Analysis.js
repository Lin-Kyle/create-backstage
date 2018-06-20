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
    Label,
    Guide
} from 'bizcharts'
import {DataSet, DataView} from '@antv/data-set';
import numeral from 'numeral';
import './Analysis.less'
import styled from 'styled-components'

const {Html} = Guide,
    ds = new DataSet();

export default class Analysis extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (<Fragment>
            <Row gutter={12}>
                <Col span={12}>
                    <Card title="餅圖"><Pie/></Card>
                </Col>
                <Col span={12}>
                    <Card title="折线图"><Line/></Card>
                </Col>
            </Row>
            <br />
            <Card loading={this.state.loading} title="Card title">
                    <ATable />
            </Card>
        </Fragment>)
    }
}

class ATable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    filters: [
                        {
                            text: 'Joe',
                            value: 'Joe'
                        }, {
                            text: 'Jim',
                            value: 'Jim'
                        }, {
                            text: 'Submenu',
                            value: 'Submenu',
                            children: [
                                {
                                    text: 'Green',
                                    value: 'Green'
                                }, {
                                    text: 'Black',
                                    value: 'Black'
                                }
                            ]
                        }
                    ],
                    // specify the condition of filtering result
                    // here is that finding the name started with `value`
                    onFilter: (value, record) => record.name.indexOf(value) === 0,
                    sorter: (a, b) => a.name.length - b.name.length
                }, {
                    title: 'Age',
                    dataIndex: 'age',
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.age - b.age
                }, {
                    title: 'Address',
                    dataIndex: 'address',
                    filters: [
                        {
                            text: 'London',
                            value: 'London'
                        }, {
                            text: 'New York',
                            value: 'New York'
                        }
                    ],
                    filterMultiple: false,
                    onFilter: (value, record) => record.address.indexOf(value) === 0,
                    sorter: (a, b) => a.address.length - b.address.length
                }
            ],
            data: [
                {
                    key: '1',
                    name: 'John Brown',
                    age: 32,
                    address: 'New York No. 1 Lake Park'
                }, {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 1 Lake Park'
                }, {
                    key: '3',
                    name: 'Joe Black',
                    age: 32,
                    address: 'Sidney No. 1 Lake Park'
                }, {
                    key: '4',
                    name: 'Jim Red',
                    age: 32,
                    address: 'London No. 2 Lake Park'
                }
            ]
        }
    }

    onChange = (pagination, filters, sorter) => {
        console.log('params', pagination, filters, sorter);
    }

    render() {
        const {data, columns} = this.state;
        return <Table columns={columns} dataSource={data} onChange={this.onChange}/>
    }
}

//餅圖
class Pie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'pie',
            data: [
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
            ],
            cols: {
                percent: {
                    formatter: val => !(+ val)
                        ? '0'
                        : ((val * 100).toFixed(1)) + '%'
                }
            },
            Tooltip_itemTpl: `<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>`,
            Guide_html: `<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">主机<br><span style="color:#262626;font-size:2.5em">200</span>次數</div>`,
            Geom_tooltip: (item, percent) => {
                return {
                    name: item,
                    value: !(+ percent)
                        ? '0'
                        : ((percent * 100).toFixed(1)) + '%'
                };
            },
            Label_formatter: (val, item) => item.point.item + ': ' + val
        }
    }

    render() {
        const _state = this.state;
        let dv = ds.getView(_state.name);
        if (!dv) {
            dv = ds.createView(_state.name).source(_state.data).transform({type: 'percent', field: 'count', dimension: 'item', as: 'percent'})
        }
        return PieChart(dv, this.state)
    }
}
const PieChart = (dv, {
    height = 500,
    cols,
    Tooltip_itemTpl,
    Guide_html,
    Geom_tooltip,
    Label_formatter
}) => {
    return (<Chart height={height} data={dv} scale={cols} forceFit="forceFit">
        <Coord type={'theta'} radius={0.7} innerRadius={0.6}/>
        <Axis name="percent" title="title"/>
        <Legend position='right' offsetX={-80}/>
        <Tooltip showTitle={false} itemTpl={Tooltip_itemTpl}/>
        <Guide >
            <Html position={['50%', '50%']} html={Guide_html} alignX='middle' alignY='middle'/>
        </Guide>
        <Geom type="intervalStack" position="percent" color='item' tooltip={['item*percent', Geom_tooltip]}>
            <Label content='percent' formatter={Label_formatter}/>
        </Geom>
    </Chart>)
}

//折线图
class Line extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'line',
            data: [
                {
                    month: 'Jan',
                    Tokyo: 7.0,
                    London: 3.9
                }, {
                    month: 'Feb',
                    Tokyo: 6.9,
                    London: 4.2
                }, {
                    month: 'Mar',
                    Tokyo: 9.5,
                    London: 5.7
                }, {
                    month: 'Apr',
                    Tokyo: 14.5,
                    London: 8.5
                }, {
                    month: 'May',
                    Tokyo: 18.4,
                    London: 11.9
                }, {
                    month: 'Jun',
                    Tokyo: 21.5,
                    London: 15.2
                }, {
                    month: 'Jul',
                    Tokyo: 25.2,
                    London: 17.0
                }, {
                    month: 'Aug',
                    Tokyo: 26.5,
                    London: 16.6
                }, {
                    month: 'Sep',
                    Tokyo: 23.3,
                    London: 14.2
                }, {
                    month: 'Oct',
                    Tokyo: 18.3,
                    London: 10.3
                }, {
                    month: 'Nov',
                    Tokyo: 13.9,
                    London: 6.6
                }, {
                    month: 'Dec',
                    Tokyo: 9.6,
                    London: 4.8
                }
            ],
            cols: {
                month: {
                    range: [0, 1]
                }
            },
            Axis_label: {
                formatter: val => `${val}°C`
            }
        }
    }

    render() {
        const _state = this.state;
        let dv = ds.getView(_state.name);
        if (!dv) {
            dv = ds.createView(_state.name).source(_state.data).transform({
                type: 'fold',
                fields: [
                    'Tokyo', 'London'
                ], // 展开字段集
                key: 'city', // key字段
                value: 'temperature', // value字段
            })
        }
        return LineChart(dv, this.state)
    }

}
const LineChart = (dv, {
    height = 500,
    cols,
    Axis_label
}) => {
    return (<Chart height={height} data={dv} scale={cols} forceFit="forceFit">
        <Legend/>
        <Axis name="temperature" label={Axis_label}/>
        <Axis name="month"/>
        <Tooltip crosshairs={{
                type: "y"
            }}/>
        <Geom type="line" position="month*temperature" size={2} color={'city'} shape={'smooth'}/>
        <Geom type='point' position="month*temperature" size={4} color={'city'} shape={'circle'}/>
    </Chart>)
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
