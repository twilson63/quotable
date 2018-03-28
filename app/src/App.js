import React from 'react'
import Container from 'react-declarative-container'
import Cond from './cond'
import logo from './famous-quotes.png'

const QUOTE = process.env.REACT_APP_API
const State = Cond.State

const center = 'vh-100 flex items-center justify-center'
const button = 'ba ph3 pv2 ba br2 b--white white'
const toJSON = res => res.json()
const getQuote = dispatch =>
  fetch(QUOTE)
    .then(toJSON)
    .then(quote => {
      dispatch({ type: 'quote', payload: quote })
      dispatch({ type: 'componentState', payload: 'READY' })
    })
    .catch(err => {
      dispatch({ type: 'error', payload: err.message })
      dispatch({ type: 'componentState', payload: 'ERROR' })
    })

const App = props => (
  <Container
    initialState={{ componentState: 'LOADING', quote: null }}
    didMount={getQuote}
  >
    {containerProps => (
      <Cond test={containerProps.componentState}>
        <State
          equals="LOADING"
          component={() => <div className={center}>Loading...</div>}
        />
        <State
          equals="READY"
          component={() => (
            <div className={center}>
              <div className="ma4 avenir">
                <div className="tc">
                  <img className="w3 h3" src={logo} alt="famous quotes" />
                </div>
                <h4 className="tc f4" style={{ color: '#82BC00' }}>
                  Famous Quotes
                </h4>
                <h3 style={{ color: 'rgba(0,0,0,.87)' }}>
                  {containerProps.quote.quote}
                </h3>
                <div style={{ color: 'rgba(0,0,0,.54)' }}>
                  Author: {containerProps.quote.author}
                </div>
                <div style={{ color: 'rgba(0,0,0,.54)' }}>
                  Genre: {containerProps.quote.genre}
                </div>
                <div className="mt4 tc">
                  <button
                    onClick={() => getQuote(containerProps.dispatch)}
                    className={button}
                    style={{ backgroundColor: '#82BC00' }}
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          )}
        />
        <State
          equals="ERROR"
          component={() => (
            <div className="vh-100 bg-red f1 white">{containerProps.error}</div>
          )}
        />
      </Cond>
    )}
  </Container>
)

export default App
