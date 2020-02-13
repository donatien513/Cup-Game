import React from 'react'
import Reward from 'react-rewards'

import lang from '../lang'
import '../styles/button-get-started.scss'

interface Props {
  success: boolean
  play: Function
}
interface State {}


class AskPlay extends React.Component<Props, State> {
  reward: Reward

  constructor(props) {
    super(props)
    this.state = { }
  }

  componentDidMount() {
    if (this.props.success === null) return
    this.props.success ? this.reward.rewardMe() : this.reward.punishMe()
  }

  public render() {
    return(
      <div>
        <Reward ref={ref => this.reward = ref} type='memphis'>
          <button className="get-started" onClick={() => this.props.play()} >
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text">{ lang.play }</span>
          </button>
        </Reward>
        <div className="mv3 white">
          { this.props.success === true ? <div>{ lang.rightSelection } :)</div> : null }
          { this.props.success === false ? <div>{ lang.wrongSelection }</div> : null }
          
        </div>
      </div>
    )
  }
}

export default AskPlay