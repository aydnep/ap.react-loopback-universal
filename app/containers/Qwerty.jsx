import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import { bindActionCreators } from 'redux';


const Qwerty = () => {
  return (
    <section>
      <h1>QWERTY</h1>
      <Link to="/">home</Link>
    </section>
  );
};

function mapStateToProps(state) {
  const props = {
    state,
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
