import React from 'react'
import Head from 'next/head'
import cn from 'classnames'
import AskPlay from 'components/AskPlay'

import TextStyles from 'styles/text.module.sass'
import SizingStyles from 'styles/sizing.module.sass'
import SpacingStyles from 'styles/spacing.module.sass'
import PositionStyles from 'styles/position.module.sass'
import FlexStyles from 'styles/flex.module.sass'

const Main = () => {
  return <div>
    <Head>
      <title>Gobelets | Jeux</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className={
      cn(
        SizingStyles.w100,
        SizingStyles.h100,
        PositionStyles.absolute,
        FlexStyles.Centerize
      )
    }>
      <div>
        <div className={TextStyles.Center}>
          <div className={cn(SpacingStyles.mt3, SpacingStyles.mb3)}>
            <div className={TextStyles.TrendyTitle}><strong>THE CUP GAME</strong></div>
            <img className={SizingStyles.w4} src={ process.env.baseURL + '/images/plastic-cup.svg' } />
          </div>
          <div className={cn(SpacingStyles.mt3, SpacingStyles.mb3)}>
            <AskPlay />
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default Main
