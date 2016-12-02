import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import { bindActionCreators } from 'redux';


const Qwerty = (props) => {
  return (
    <section>
      <h1>{props.app.title}</h1>
      <Link to="/">home</Link>
    </section>
  );
};

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
export default connect(mapStateToProps, mapDispatchToProps)(Qwerty);
