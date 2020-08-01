import React, { useState } from 'react'
import arrayShuffle from 'shuffle-array'
import iota from 'iota-array'
import { Flipper, Flipped } from 'react-flip-toolkit'
import ShuffleIcon from 'react-icons/lib/md/shuffle'

import lang from 'lang'
import Cup from 'components/cup'

import 'styles/game-board.sass'

interface Props {
  done: Function,
  numberOfCups: number
  shuffleSpeed: number
}
interface State {
  redBallHolder: number,
  cups: number[],
  openedCup: number,
  shuffling: boolean
  shuffled: boolean
}

const redBallHolder = 2
const DELAY_BEFORE_RESULT_FEEDBACK: number = 800

const wait = (duration = 500) => new Promise((resolve) => setTimeout(resolve, duration))

const GameBoard = ({ done, numberOfCups, shuffleSpeed }: Props) => {
  const [cups, setCups] = useState(iota(numberOfCups).map(num => num + 1))
  const [openedCup, setOpenedCup] = useState(null)
  const [shuffleStatus, setShuffleStatus] = useState('')

  const selectAndSubmit = async (selectedCup: number) => {
    if (shuffleStatus === 'SHUFFLING' || shuffleStatus !== 'SHUFFLED') return
    setOpenedCup(selectedCup)
    await wait(DELAY_BEFORE_RESULT_FEEDBACK)
    const success: boolean = selectedCup === redBallHolder
    done(success)
  }

  const shuffle = () => {
    if (shuffleStatus === 'SHUFFLING') return 
    setShuffleStatus('SHUFFLING')
    let iteration = 0
    const interval = setInterval(() => {
      setCups(prevCups => arrayShuffle(prevCups))
      iteration++
      if (iteration >= 8) {
        clearInterval(interval)
        setShuffleStatus('SHUFFLED')
      }
    }, shuffleSpeed)
  }

  return <div className="relative">
    <div className="tc pa4">
      <h2 className="fw1 f1 lh-solid mb1 title">
        {
          lang.chooseTheRightCup.split('').map((char, index) => {
            return <div style={{
              transitionDelay: index * 1 + 's !important'
            }} key={'chooseText-' + index} className="dib animated fadeIn">{ char === ' ' ? <span>&nbsp;</span> : char }</div>
          })
        }
      </h2>
      <p className="gray mw5 center">{ lang.gameRuleGeneral }</p>
      <div className="mv4">
        <Flipper flipKey={cups.join('')}>
          {
            cups.map((cupKey) => {
              return <Flipped key={cupKey} flipId={cupKey}>
                <div className="dib">
                  {
                    redBallHolder === cupKey ?
                      <img className="red-ball" src={process.env.baseURL + '/images/red-ball.png'} /> :
                      <div className="red-ball"></div>
                  }
                  <div className={ 'cup-container ' + (cupKey === openedCup ? 'jump' : '') + ' ' +
                    (shuffleStatus === '' ? '' : 'can-jump-on-hover')
                  }>
                    <Cup cupKey={cupKey} select={selectAndSubmit} />
                  </div>
                </div>
              </Flipped>
            })
          }
        </Flipper>
      </div>
      <div className="mt4">
        <button className="bn bg-transparent f3" onClick={shuffle}>
          <ShuffleIcon /> { lang.shuffle }
        </button>
      </div>
    </div>
  </div>
}

export default GameBoard