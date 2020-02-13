import React from 'react'

interface Props {
  select: Function,
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
      <div style={{ order: this.props.cupKey }} onClick={() => this.props.select(this.props.cupKey)} className="dib w3 mh2 cup">
        <img className="upside-down" src={process.env.baseURL + '/images/plastic-cup.svg' } />
      </div>
    )
  }
};

export default Cup