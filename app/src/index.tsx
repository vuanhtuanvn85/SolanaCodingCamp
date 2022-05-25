import { WalletKitProvider } from '@gokiprotocol/walletkit'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
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
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WalletKitProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
)
