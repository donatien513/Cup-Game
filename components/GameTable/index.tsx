import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import cn from 'classnames'
import lodashShuffle from 'lodash.shuffle'
import iota from 'iota-array'
import { Flipper, Flipped } from 'react-flip-toolkit'
import translation from 'lang'
import Cup from 'components/Cup'
import { gameScoreActions } from 'actions'

import styles from './styles.module.sass'
import ButtonStyles from 'styles/button.module.sass'
import TextStyles from 'styles/text.module.sass'
import SpacingStyles from 'styles/spacing.module.sass'

const { INCREMENT_SCORE } = gameScoreActions

const ShuffleState = {
  UNSHUFFLED: 'UNSHUFFLED',
  SHUFFLING: 'SHUFFLING',
  SHUFFLED: 'SHUFFLED'
}

const SHUFFLE_NUMBER: number = 8
const CUP_INDEX_WITH_RED_BALL: number = 2
const DELAY_BEFORE_RESULT_FEEDBACK: number = 800

const wait = (duration = 500) => new Promise((resolve) => setTimeout(resolve, duration))

const GameTable = ({ onGameResult }) => {
  const dispatch = useDispatch()
  const { numberOfCups, shuffleSpeed } = useSelector(({ settings }) => {
    const { numberOfCups, shuffleSpeed } = settings
    return { numberOfCups, shuffleSpeed }
  })

  const [cups, setCups] = useState<number[]>(iota(numberOfCups).map(num => num + 1))
  const [selectedCup, setSelectedCup] = useState<number>(null)
  const [shuffleStatus, setShuffleStatus] = useState<string>(ShuffleState.UNSHUFFLED)

  const selectAndSubmit = async (cupNumber: number) => {
    if (shuffleStatus !== ShuffleState.SHUFFLED) return
    setSelectedCup(cupNumber)
    await wait(DELAY_BEFORE_RESULT_FEEDBACK)
    const winned_a_point: boolean = cupNumber === CUP_INDEX_WITH_RED_BALL
    if (winned_a_point) {
      dispatch({
        type: INCREMENT_SCORE
      })
      onGameResult('WIN')
    } else {
      onGameResult('LOSE')
    }
  }

  const shuffle = () => {
    if (shuffleStatus === ShuffleState.SHUFFLING) return
    setShuffleStatus(ShuffleState.SHUFFLING)
    let shuffleCount: number = 0
    const interval = setInterval(() => {
      setCups(prevCups => lodashShuffle(prevCups))
      shuffleCount++
      if (shuffleCount >= SHUFFLE_NUMBER) {
        clearInterval(interval)
        setShuffleStatus(ShuffleState.SHUFFLED)
      }
    }, shuffleSpeed)
  }

  return <div
    className={cn(
      TextStyles.Center,
      SpacingStyles.pt4,
      SpacingStyles.pb4,
      SpacingStyles.pl4,
      SpacingStyles.pr4,
    )}
  >
    <h2 className={TextStyles.StandardTitle}>{ translation.chooseTheRightCup }</h2>
    <p>{ translation.gameRuleGeneral }</p>
    <div className={styles.CupContainer}>
      <Flipper flipKey={cups.join('')}>
        {
          cups.map(cupKey => {
            return <Flipped key={cupKey} flipId={cupKey}>
              <div className={styles.CupContainer}>
                <Cup
                  cupKey={cupKey}
                  select={selectAndSubmit}
                  hasRedBall={CUP_INDEX_WITH_RED_BALL === cupKey}
                  canPreviewContent={shuffleStatus === ShuffleState.UNSHUFFLED}
                  revealContent={cupKey === selectedCup}
                />
              </div>
            </Flipped>
          })
        }
      </Flipper>
    </div>
    <div className={styles.ShuffleButtonContainer}>
      <button className={ButtonStyles.Button} onClick={shuffle}>
        { translation.shuffle }
      </button>
    </div>
  </div>
}

GameTable.defaultProps = {
  onGameResult: () => {}
}

GameTable.propTypes = {
  onGameResult: PropTypes.func
}

export default GameTable
