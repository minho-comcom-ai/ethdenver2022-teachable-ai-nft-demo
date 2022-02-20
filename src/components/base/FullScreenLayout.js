// React
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    height: auto !important;
    min-height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #000000;
`;

class FullScreenLayout extends React.Component {
    render() {
        const { children, wrapperBackgroundColor } = this.props;

        return wrapperBackgroundColor
            ? <Wrapper style={{ backgroundColor: wrapperBackgroundColor}}>{children}</Wrapper>
            : <Wrapper>{children}</Wrapper>;
    }
}

export default FullScreenLayout;
