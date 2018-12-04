// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import App from './components/app'
import MetaTags from 'react-meta-tags';



import {BrowserRouter} from 'react-router-dom'

class Component1 extends React.Component {
  render() {
    return (
          <MetaTags>
            <meta name="description" content="Some description." />
            <meta property="og:title" content="MyApp" />
            <meta property="og:image" content="path/to/image.jpg" />
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
          </MetaTags>
      )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <div>
    <Component1/>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </div>,
    document.body.appendChild(document.createElement('div')),
  )
})
