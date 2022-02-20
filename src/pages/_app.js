// Next
import App from 'next/app';
import { DefaultSeo } from 'next-seo';
// React
import React, { useEffect } from 'react';

// Styled-components
import { ThemeProvider } from 'styled-components';
// Theme
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiTheme from 'theme/MuiTheme';
import StyledComponentsTheme from 'theme/StyledComponentsTheme';
// Layout components
import FullScreenLayout from 'components/base/FullScreenLayout';

import 'styles/global.css';

MyApp.getInitialProps = async (appContext) => {
  const { ctx } = appContext;
  const { req } = ctx;
  if (!req) {
    return { pageProps: {}, authProps: {} };
  }

  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps, authProps: {} };
};

function MyApp({ Component, pageProps, router, authProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <MuiThemeProvider theme={MuiTheme}>
      <ThemeProvider theme={StyledComponentsTheme}>
        <CssBaseline />

        {/* Default meta data for SEO */}
        <DefaultSeo
          title="ethdenver2022-teachable-ai-nft-demo"
          description="Turn your NFT into an AI NFT on Harmony Testnet"
          canonical={process.env.ORIGIN}
          openGraph={{
            type: 'website',
            locale: 'en_US',
            url: process.env.ORIGIN,
            title: 'ethdenver2022-teachable-ai-nft-demo',
            description:
              'Turn your NFT into an AI NFT on Harmony Testnet',
            images: [
              {
                url: `${process.env.ORIGIN}images/cover_image.png`,
                width: 1200,
                height: 630,
                alt: 'ethdenver2022-teachable-ai-nft-demo',
              },
            ],
            site_name: 'ethdenver2022-teachable-ai-nft-demo',
          }}
        />
        <FullScreenLayout wrapperBackgroundColor={'#ffffff'}>
          <Component {...pageProps} />
        </FullScreenLayout>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default MyApp;
