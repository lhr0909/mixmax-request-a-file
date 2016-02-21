import React from 'react';
import ReactDOMServer from 'react-dom/server';

class UploadResolver extends React.Component {
  render() {
    return (
      <div>Hello World!</div>
    );
  }
}

function expressResolver(req, res) {
  let data = JSON.parse(req.body.params);
  if (!data) {
    res.status(403 /* unauthorized */).send('Invalid params');
  }

  let html = ReactDOMServer.renderToStaticMarkup(<UploadResolver />);
  res.json({
    body: html
  });
}

export default expressResolver;
