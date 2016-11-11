import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import MainComponent from '../components/main/main';


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
export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
