import React from 'react';
import ReactDOMServer from 'react-dom/server';

// Using React to render the resolver template, because it feels easy to feed in states,
//   and React in ES6 is easy to read!

class UploadResolver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      caption: this.props.data.caption,
      url: "https://mixmax-file-requests.herokuapp.com/uploader?requester=!!!SENDER_EMAIL_URL!!!&provider=!!!EMAIL_ADDR_URL!!!"
    }
  }

  render() {
    return (
      <div>
        <div>!!!SENDER_EMAIL!!! says:</div>
        <div>{ this.state.caption }</div>
        <div><a href={ this.state.url } target="_blank">Upload Now</a></div>
      </div>
    );
  }
}

function expressResolver(req, res) {
  let data = JSON.parse(req.body.params);
  if (!data) {
    res.status(403 /* unauthorized */).send('Invalid params');
    return;
  }

  let html = ReactDOMServer.renderToStaticMarkup(<UploadResolver data={ data } />);
  res.json({
    body: html,
    subject: "File Request"
  });
}

export default expressResolver;
