import React from 'react'
import Reward from 'react-rewards'

import lang from 'lang'
import 'styles/button-get-started.scss'

interface Props {
  success: boolean
  play: Function
}

const AskPlay = ({ success, play }: Props) => {
  let reward: Reward
  if (success !== null) {
    success ? reward.rewardMe() : reward.punishMe()
  }

  return <div className="tc">
    <div className="mv4">
      <div className="f1 the-cup-game"><strong>THE CUP GAME</strong></div>
      <img className="w3" src={ process.env.baseURL + '/images/plastic-cup.svg' } />
    </div>
    <div className="mv4">
      <Reward ref={ref => reward = ref} type='memphis'>
        <button className="get-started" onClick={() => play()} >
          <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
          </span>
          <span className="button-text">{ lang.play }</span>
        </button>
      </Reward>
      <div className="mv3 white">
        { success === true ? <div>{ lang.rightSelection } :)</div> : null }
        { success === false ? <div>{ lang.wrongSelection }</div> : null }
      </div>
    </div>
  </div>
}

export default AskPlay
