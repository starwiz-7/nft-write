import '../styles/globals.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import { AddressContextProvider } from '../context/addressContext';
import '@fontsource/inter/400.css';
function MyApp({ Component, pageProps }) {
  const supportedChainIds = [1, 4, 80001];
  const connectors = {
    injected: {},
  };

  const theme = extendTheme({
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <ThirdwebProvider
        connectors={connectors}
        supportedChainIds={supportedChainIds}
        desiredChainId={ChainId.Rinkeby}
      >
        <AddressContextProvider>
          <Component {...pageProps} />
        </AddressContextProvider>
      </ThirdwebProvider>
    </ChakraProvider>
  );
}

export default MyApp;
