import React from "react"

class Detail extends React.Component {
  componentDidMount() {
    const { location, history } = this.props
    if (location.state === undefined) {
      history.push("/")
    } 
  }
  render() {
    console.log(this.props) // 라우팅을 할 때 전달되는 props들
    const { location } = this.props
    if (location.state) {
      return <span>{location.state.title}</span>
    } else {
      return null
    }
  }
}

export default Detail