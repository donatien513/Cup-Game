import React from 'react'

interface Props {
  score: number,
}
interface State {}


class Score extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = { }
  }

  public render() {
    return(
      <div className="absolute right-0 top-0 dib ph3 pv2 bg-white shadow-1 mt3 mr3  ">
        Votre score : { this.props.score }
      </div>
    )
  }
};

export default Score