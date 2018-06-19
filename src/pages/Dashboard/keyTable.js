import React from 'react';
import { Modal, Table, Input } from 'antd'

export default class KeyTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ...props,
            keyColumns: [{
                title: '序号',
                dataIndex: 'key',
                align: 'center',
                width: 70
                // render: (text, record) => <a href="javascript:;">{text}</a>,
              }, {
                title: '小标题',
                dataIndex: 'title',
                align: 'center',
                render: (text, record) => <Input value={text} onChange={(e) => {this.changeValue(record.index, 'title', e.target.value )}}/>
              }, {
                title: '报表ID',
                width: 100,
                dataIndex: 'reportId',
                align: 'center',
                render: (text, record) => <Input value={text} onChange={(e) => {this.changeValue(record.index, 'reportId', e.target.value )}}/>
              }, {
                title: '指标序号',
                width: 100,
                dataIndex: 'indexNum',
                align: 'center',
                render: (text, record) => <Input value={text} onChange={(e) => {this.changeValue(record.index, 'indexNum', e.target.value )}}/>
              }, {
                title: '操作',
                width: 70,
                dataIndex: 'operation',
                align: 'center',
                render: (text, record) => <a href="javascript:;" onClick={this.empty.bind(this, record.index)}>清空</a>
              }
            ]
        }
    }
    changeValue = (index, key, value ) => {
        // 找到对应index 修改对应 key value 
        let keyData = this.state.keyData;
        let keyIndex = keyData.findIndex(item => item.index === index)
        keyData[keyIndex][key] = value
        this.setState({
            keyData
        })
    }
    upData = () => {
        console.log(this.state.keyData);
        this.props.handleOk()
    }
    empty(index) {
        let keyData = this.state.keyData
        // 对应 index
        let newKeyData = keyData.map( item => {
            if ( item.index === index ) {
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
        this.setState({
            keyData: newKeyData
        })

    }
    render() {
        const { handleOk,  handleCancel, visible } = this.props 
        const { modalTitle,  keyColumns, keyData  } = this.state
        return (
            <Modal
                title={modalTitle}
                visible={visible}
                onOk={this.upData}
                onCancel={ handleCancel}
                maskClosable={false}
                width={600}>
                <Table columns={keyColumns} dataSource={keyData} bordered pagination={false}/>
            </Modal>
        )
    }
}
