import React, { useState } from 'react'
import Head from 'next/head'
import cn from 'classnames'
import Reward from 'react-rewards'
import GameTable from 'components/GameTable'
import AskReplay from 'components/AskPlay'
import translation from 'lang'

import TextStyles from 'styles/text.module.sass'
import SizingStyles from 'styles/sizing.module.sass'
import SpacingStyles from 'styles/spacing.module.sass'
import PositionStyles from 'styles/position.module.sass'
import FlexStyles from 'styles/flex.module.sass'

const Play = () => {
  const [previousGameResult, setPreviousGameResult] = useState<string | null>(null)
  const [reward, setReward] = useState<Reward | null>(null)
  const handleGameResult = (resultStatus: string) => {
    setPreviousGameResult(resultStatus)
    if (resultStatus === 'WIN') {
      reward.rewardMe()
    } else if (resultStatus === 'LOSE') {
      reward.punishMe()
    }
  }

  return <div>
    <Head>
      <title>Gobelets | Jeux</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div
      className={cn(
        SizingStyles.w100,
        SizingStyles.h100,
        PositionStyles.absolute,
        FlexStyles.Centerize
      )}
    >
      { !previousGameResult && <GameTable onGameResult={handleGameResult} /> }
      <div
        style={{ display: previousGameResult ? 'block' : 'none' }}
        className={cn(SpacingStyles.mt3, SpacingStyles.mb3, TextStyles.Center)}
      >
        <Reward
          ref={ref => setReward(ref)}
          type='memphis'
        >
          <AskReplay onClick={() => setPreviousGameResult(null)} />
        </Reward>
        <div className={cn(SpacingStyles.mt3, SpacingStyles.mb3)}>
          { previousGameResult === 'WIN' && <div>{ translation.rightSelection } :)</div> }
          { previousGameResult === 'LOSE' && <div>{ translation.wrongSelection }</div> }
        </div>
      </div>
    </div>
  </div>
}

export default Play