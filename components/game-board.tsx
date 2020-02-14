import React from 'react'
import bluebird from 'bluebird'
import shuffle from 'shuffle-array'
import iota from 'iota-array'
import { Flipper, Flipped } from 'react-flip-toolkit'
import ShuffleIcon from 'react-icons/lib/md/shuffle'

import lang from '../lang'
import Cup from './cup'

import '../styles/game-board.sass'

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

const CUP_SHOWING_DURATION: number = 1000
const DELAY_BEFORE_RESULT_FEEDBACK: number = 800

const wait = (duration = 500) => new Promise((resolve) => setTimeout(resolve, duration))

class GameBoard extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      redBallHolder: 2,
      cups: iota(this.props.numberOfCups).map(num => num + 1),
      openedCup: null,
      shuffling: false,
      shuffled: false
    }
    this.selectAndSubmit = this.selectAndSubmit.bind(this)
    this.shuffle = this.shuffle.bind(this)
    this.openCups = this.openCups.bind(this)
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.numberOfCups !== this.props.numberOfCups) {
      this.setState({
        cups: iota(this.props.numberOfCups).map(num => num + 1)
      })
    }
  }

  private async selectAndSubmit(selectedCup: number) {
    if (this.state.shuffling || !this.state.shuffled) return
    this.setState({
      openedCup: selectedCup
    }, async () => {
      await wait(DELAY_BEFORE_RESULT_FEEDBACK)
      const success: boolean = selectedCup === this.state.redBallHolder
      this.props.done(success)
    })
  }

  private async openCups() {
    await bluebird.each(this.state.cups, async (cupKey) => {
      this.setState({
        openedCup: cupKey
      })
      await wait(CUP_SHOWING_DURATION)
    })
    this.setState({
      openedCup: null
    })
  }

  private async shuffle() {
    if (this.state.shuffling) return 
    this.setState({
      shuffled: false,
      shuffling: true
    }, () => {
      let iteration = 0
      const interval = setInterval(() => {
        this.setState({
          cups: shuffle(this.state.cups)
        })
        iteration++
        if (iteration >= 8) {
          clearInterval(interval)
          this.setState({
            shuffled: true,
            shuffling: false
          })
        }
      }, this.props.shuffleSpeed)
    })
  }

  public render() {
    return(
      <div className="relative">
        
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
            <Flipper flipKey={this.state.cups.join('')}>
              {
                this.state.cups.map((cupKey) => {
                  return <Flipped key={cupKey} flipId={cupKey}>
                    <div className="dib">
                      {
                        this.state.redBallHolder === cupKey ?
                          <img className="red-ball" src={process.env.baseURL + '/images/red-ball.png'} /> :
                          <div className="red-ball"></div>
                      }
                      <div className={ 'cup-container ' + (cupKey === this.state.openedCup ? 'jump' : '') + ' ' +
                        ((this.state.shuffling || this.state.shuffled) ? '' : 'can-jump-on-hover')
                      }>
                        <Cup cupKey={cupKey} select={this.selectAndSubmit} />
                      </div>
                    </div>
                  </Flipped>
                })
              }
            </Flipper>
          </div>
          <div className="mt4">
            <button className="bn bg-transparent f3" onClick={this.shuffle}>
             <ShuffleIcon /> { lang.shuffle }
            </button>
          </div>
        </div>
        
      </div>
    )
  }
}

export default GameBoard