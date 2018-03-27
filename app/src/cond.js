import React from 'react'

const Cond = props => {
  let match, element

  React.Children.forEach(props.children, el => {
    if (!match && el.props.equals === props.test) {
      match = true
      element = el
    }
  })
  return match ? React.cloneElement(element) : null
}

Cond.State = ({ component: Component }) => <Component />

export default Cond
