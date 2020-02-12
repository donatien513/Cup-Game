import React from 'react'

interface Props {
  selected: Function,
  cupKey: number
}
interface State {}


class Cup extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = { }
  }

  public render() {
    return(
      <button onClick={() => this.props.selected(this.props.cupKey)} className="cup">
        { this.props.cupKey }
      </button>
    )
  }
};

export default Cup