import React from 'react'

interface Props {
  play: Function
}
interface State {}


class AskPlay extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = { }
  }

  public render() {
    return(
      <div>
        <button onClick={() => this.props.play()} >Jouer</button>
      </div>
    )
  }
};

export default AskPlay