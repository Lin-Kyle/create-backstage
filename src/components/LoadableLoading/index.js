import React from 'react';
import {Spin} from 'antd';
import styled from 'styled-components'

export default({isLoading, pastDelay, error}) => {
    if (isLoading && pastDelay) {
        return <Wrapper>
            <Spin/>
        </Wrapper>;
    } else if (error && !isLoading) {
        return <div>Error!</div>;
    } else {
        return null;
    }
}

const Wrapper = styled.div `{
  text-align: center;
}`
