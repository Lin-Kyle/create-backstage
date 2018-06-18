import React, {Component} from 'react';
import styled from 'styled-components';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {observer, inject} from 'mobx-react';

const FormItem = Form.Item,
    LoginWrapper = styled.div `
width: 300px;
margin: 0 auto;
transform: translate(0, 200px);
`;

@inject(stores => ({user: stores.user}))
@observer class NormalLoginForm extends Component {
    handleSubmit = (e) => {
        const _props = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                _props.user.login(values);
            }
        });
    }
    render() {
        const {getFieldDecorator} = this.props.form;

        return (<LoginWrapper>
            <h1>账号密码登陆</h1>
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
const Login = Form.create()(NormalLoginForm);

export default Login;
