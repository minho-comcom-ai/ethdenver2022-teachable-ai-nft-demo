// Next
import Document, { Html, Head, Main, NextScript } from 'next/document';
// React
import React from 'react';
import { ServerStyleSheets as MuiServerStyleSheet } from '@material-ui/core/styles';
import { ServerStyleSheet as ScServerStyleSheet } from 'styled-components';
import MuiTheme from 'theme/MuiTheme';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const muiSheet = new MuiServerStyleSheet();
        const scSheet = new ScServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        scSheet.collectStyles(
                            muiSheet.collect(<App {...props} />)
                        ),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {muiSheet.getStyleElement()}
                        {scSheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            scSheet.seal();
        }
    }

    render() {
        const { styles } = this.props;

        return (
            <Html lang="en">
                <Head>
                    {/* Required meta tags */}
                    <meta charSet="utf-8" />

                    {/* Favicon */}
                    <link rel="shortcut icon" href="/favicon.png" />

                    {/* PWA primary color */}
                    <meta
                        name="theme-color"
                        content={MuiTheme.palette.primary.main}
                    />

                    <link rel="manifest" href="/manifest.json" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js" ></script>
                </body>
            </Html>
        );
    }
}

MyDocument.propTypes = {};

export default MyDocument;
