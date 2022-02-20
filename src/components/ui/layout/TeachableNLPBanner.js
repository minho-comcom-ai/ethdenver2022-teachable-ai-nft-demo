import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import {
    AinizePattern,
    ArrowForwardIcon,
} from 'components/ui/icon/IconSet';

const Wrapper = styled.div`
    width: 100%;
    padding: 8px;
    background-color: #a575f3;
    position: relative;

    @media only screen and (min-width: ${(props) => props.theme.layout.teachableNlpMinWidthMobile}) {
      display: none;
    }
    @media only screen and (min-width: ${(props) => props.theme.layout.teachableNlpMinWidthDesktop}) {
      display: block;
    }
`;

const AinizePatternContainer = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    @media only screen and (min-width: ${(props) =>
            props.theme.breakpoint.md}px) {
        left: -423px;
        top: -12px;
    }
    text-align: center;
`;

const BannerContentContainer = styled.div`
    max-width: ${(props) => `${Number.parseInt(props.theme.layout.maxWidth) + 120}px`};
    margin: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const BannerText = styled.div`
    font-family: Mulish;
    font-weight: 700;
    font-style: normal;
    font-size: 16px;
    color: #ffffff;
    text-align: center;

    @media only screen and (max-width: ${(props) => props.theme.breakpoint.md}px) {
        font-size: 14px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const BannerButton = withStyles((theme) => ({
    root: {
        padding: '6px 24px',
        fontFamily: 'Mulish',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 700,
        color: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        borderRadius: 32,
        backgroundColor: 'transparent',
        '&:hover': {
            border: '1px solid rgba(255, 255, 255, 0.5)',
            backgroundColor: '#7342ff',
        },
        '&:disabled': {
            color: '#ffffff',
            backgroundColor: '#b890dd',
        },
    },
}))(Button);

function TeachableNLPBanner(props) {
    const { title, buttonTitle, buttonLinkUrl } = props;

    return (
        <Wrapper>
            <AinizePatternContainer>
                <AinizePattern width={371} height={135} fill={'#ffffff'} />
            </AinizePatternContainer>

            <BannerContentContainer>
                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justify="center">
                    <Grid item xs={12} sm={12} md={7}>
                        <BannerText>{title}</BannerText>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <ButtonContainer>
                            <BannerButton
                                variant="outlined"
                                color="primary"
                                startIcon={<ArrowForwardIcon />}
                                onClick={() => {
                                    window.open(buttonLinkUrl);
                                }}>
                                {buttonTitle}
                            </BannerButton>
                        </ButtonContainer>
                    </Grid>
                </Grid>
            </BannerContentContainer>
        </Wrapper>
    );
}

TeachableNLPBanner.propTypes = {
    title: PropTypes.string.isRequired,
    buttonTitle: PropTypes.string.isRequired,
    buttonLinkUrl: PropTypes.string.isRequired,
};

export default TeachableNLPBanner;
