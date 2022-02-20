import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

const Wrapper = styled(Grid)`
    max-width: ${(props) => props.theme.layout.maxWidth};
    padding: 32px 16px;
    @media only screen and (min-width: ${(props) =>
            props.theme.breakpoint.md}px) {
        padding: 32px 0;
    }
`;

const Title = styled.div`
    font-size: 32px;
    font-weight: bold;
    color: ${(props) => props.theme.color.BLACK};
`;

const Description = styled.div`
    margin-top: 37px;
    font-size: 14px;
    color: ${(props) => props.theme.color.BLACK};
`;

const Image = styled.img`
    margin-top: 32px;
    width: 100%;
    max-width: 516px;
`;

class NotFoundPage extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    render() {
        return (
            <Wrapper container>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Title>{'404. Page not found'}</Title>

                    <Description>
                        Either something went wrong or the page doesn't exist
                        anymore.
                    </Description>

                    <Image src="/images/img-404-error.png" />
                </Grid>
            </Wrapper>
        );
    }
}

export default NotFoundPage;
