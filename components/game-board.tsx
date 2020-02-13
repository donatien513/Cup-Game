import React from 'react'
import bluebird from 'bluebird'
import shuffle from 'shuffle-array'
import { Flipper, Flipped } from 'react-flip-toolkit'

import Cup from './cup'

import '../styles/game-board.sass'

interface Props {
  done: Function
}
interface State {
  redBallHolder: number,
  cups: number[],
  openedCup: number,
  shuffling: boolean
  shuffled: boolean
}

const SHUFFLE_SPEED: number = 500
const CUP_SHOWING_DURATION: number = 1000

const wait = (duration = 500) => new Promise((resolve) => setTimeout(resolve, duration))

const choosetext = "Choisissez votre gobelet"

class GameBoard extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      redBallHolder: 2,
      cups: [1, 2, 3],
      openedCup: null,
      shuffling: false,
      shuffled: false
    }
    this.selectAndSubmit = this.selectAndSubmit.bind(this)
    this.shuffle = this.shuffle.bind(this)
    this.openCups = this.openCups.bind(this)
  }

  private async selectAndSubmit(selectedCup: number) {
    if (this.state.shuffling || !this.state.shuffled) return
    //await this.openCups()
    const success: boolean = selectedCup === this.state.redBallHolder
    this.props.done(success)
    this.setState({
      shuffled: false
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
    this.setState({
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
      }, SHUFFLE_SPEED)
    })
  }

  public render() {
    return(
      <div className="relative">
        
        <div className="tc pa4">
          <h2 className="fw1 f1 lh-solid mb1 title">
            {
              choosetext.split('').map((char, index) => {
                return <div style={{
                  transitionDelay: index * 1 + 's !important'
                }} key={'chooseText-' + index} className="dib animated fadeIn">{ char === ' ' ? <span>&nbsp;</span> : char }</div>
              })
            }
          </h2>
          <p className="gray mw5 center">Mémorisez le gobelet qui contient la boule rouge. vous gagnez un (1) point pour chaque bonne réponse.</p>
          <div className="mv4">
            <Flipper flipKey={this.state.cups.join('')}>
              {
                this.state.cups.map((cupKey) => {
                  return <Flipped key={cupKey} flipId={cupKey}>
                    <div className="dib">
                      {
                        this.state.redBallHolder === cupKey ?
                          <img className="red-ball" src="/images/red-ball.png" /> :
                          <div className="red-ball"></div>
                      }
                      <div className={ 'cup-container ' + (cupKey === this.state.openedCup ? 'jump' : '') + ' ' + (this.state.shuffling || this.state.shuffled ? '' : 'can-jump') }>
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
              Mélanger
            </button>
          </div>
        </div>
        
      </div>
    )
  }
};

export default GameBoard