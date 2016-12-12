import React from 'react';
import { connect } from 'react-redux';


class SSE extends React.Component {
  componentDidMount() {
    const sseUrl = '/api/sses/change-stream?_format=event-stream';
    const src = new EventSource(sseUrl);
    src.addEventListener('data', (msg) => {
      // const data = JSON.parse(msg.data);
      // console.log(data);
      this.setState({ sse: msg.data });
    });
  }
  render() {
    return (
      <section>
        {this.state && this.state.sse}
      </section>
    );
  }
}

function mapStateToProps(state) {
  const props = {
    app: state.app,
  };
  return props;
}
// function mapDispatchToProps(dispatch) {
function mapDispatchToProps() {
  return {
    // actions: bindActionCreators(boovatechActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SSE);
