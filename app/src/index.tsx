import { WalletKitProvider } from '@gokiprotocol/walletkit'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from 'view/app'
import './index.css'
import { store } from './store'



ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <WalletKitProvider
        defaultNetwork="devnet"
        app={{
          name: 'My App',
        }}
      >
        <App />
      </WalletKitProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
)
