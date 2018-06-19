import React, {Component} from 'react';
import styled from 'styled-components';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {observer, inject} from 'mobx-react';

const FormItem = Form.Item,
    LoginWrapper = styled.div `
width: 300px;
margin: 0 auto;
`;

@inject(stores => ({global: stores.global, user: stores.user}))
@observer class NormalLoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const _props = this.props;
        _props.form.validateFields((err, values) => {
            if (!err) {
                _props.user.login({username: values.userName, password: values.password, remember: values.remember}).then(res => {
                    if (res) {
                        // 成功需要获取菜单然后再决定跳转位置
                        _props.global.getDefaultMenu()
                        _props.history.push(_props.global.firstPath)
                    }
                })
            }
        });
    }
    render() {
        const {getFieldDecorator} = this.props.form;

        return (<LoginWrapper>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {
                        getFieldDecorator('userName', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                    initialValue: 'admin'
                                }
                            ]
                        })(<Input prefix={<Icon type = "user" style = {{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="Username"/>)
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                    initialValue: '111111'
                                }
                            ]
                        })(<Input prefix={<Icon type = "lock" style = {{ color: 'rgba(0,0,0,.25)' }}/>} type="password" placeholder="Password"/>)
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: 1
                        })(<Checkbox>Remember me</Checkbox>)
                    }
                    <br/>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{
                            width: '100%'
                        }}>
                        Log in
                    </Button>
                </FormItem>
            </Form>
        </LoginWrapper>);
    }
}
//经 Form.create() 包装过的组件会自带 this.props.form 属性
const Login = Form.create()(NormalLoginForm);

export default Login;
