import React from 'react';
import ReactDOMServer from 'react-dom/server';

// Using React to render the resolver template, because it feels easy to feed in states,
//   and React in ES6 is easy to read!

class UploadResolver extends React.Component {
  constructor(props) {
    super(props);

    let fontFamily = "'proxima-nova','Avenir Next','Segoe UI','Calibri','Helvetica Neue',Helvetica,Arial,sans-serif";

    this.state = {
      caption: this.props.data.caption,
      containerStyle: {
        border: "1px solid #295191",
        padding: "15px",
        width: "400px",
        borderRadius: "3px"
      },
      headerStyle: {
        color: "#333",
        fontFamily: fontFamily,
        fontSize: "18px",
        fontWeight: "600",
        paddingTop: "6px",
        lineHeight: "26px",
        width: "100%"
      },
      captionStyle: {
        color: "#aab",
        fontSize: "12px",
        fontFamily: fontFamily,
        marginTop: "5px",
        marginBottom: "5px"
      },
      uploadButtonStyle: {
        backgroundColor: "#1155cc",
        borderRadius: "3px",
        padding: "6px 4px 4px 4px",
        textAlign: "center"
      },
      uploadButtonTextStyle: {
        fontFamily: fontFamily,
        color: "white",
        textTransform: "uppercase",
        fontSize: "14px",
        textDecoration: "none"
      },
      url: "https://mixmax-file-requests.herokuapp.com/uploader?requester=!!!SENDER_EMAIL_URL!!!&provider=!!!EMAIL_ADDR_URL!!!"
    }
  }

  render() {
    return (
      <div className="preview-card" style={this.state.containerStyle}>
        <div style={this.state.headerStyle}>!!!SENDER_EMAIL!!! asks you for a file:</div>
        <div style={this.state.captionStyle}>{ this.state.caption }</div>
        <div style={this.state.uploadButtonStyle}>
          <a style={this.state.uploadButtonTextStyle} href={ this.state.url } target="_blank">Upload Now</a>
        </div>
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
