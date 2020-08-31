import { connect } from 'react-redux';
class Num extends React.Component {

    render() {
        return (
            <div>
              <h1>
                Num: <span>{this.props.num}</span>
              </h1>
              <div>{this.props.userAgent}</div>
            </div>
          )
    }

}

const mapState = state => ({
    num: state.num.num
  })
  
const mapDispatch = (dispatch) => {
    return {
        add: dispatch.num.add
    }
}
  
  export default connect(
    mapState,
    mapDispatch
  )(Num)
