import React from 'react'
import Head from 'next/head'

import AskPlay from '../components/ask-play'
import GameBoard from '../components/game-board'
import AscendingBoxes from '../components/ascending-boxes'
import Score from '../components/score'

import '../styles/main.sass'

interface Props {}
interface State {
  score: number,
  playing: boolean,
  lastResultWasSuccess: boolean
}


class Main extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      score: 0,
      playing: false,
      lastResultWasSuccess: null
    }
    this.play = this.play.bind(this)
    this.done = this.done.bind(this)
  }

  private play() {
    this.setState({
      playing: true,
      lastResultWasSuccess: null
    })
  }

  private done(success: boolean) {
    this.setState({
      playing: false,
      lastResultWasSuccess: success,
      score: success ? this.state.score + 1 : this.state.score
    })
  }

  public render() {
    return(
      <div>
        <Head>
          <title>Gobelets | Jeux</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Kalam" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css" />
        </Head>
        <div className={'absolute w-100 vh-100 bg-fade ' + (this.state.playing ? 'bg-transparent' : 'bg-near-black')}>
          <div style={{ zIndex: -1 }} className="absolute w-100 h-75" >
            <AscendingBoxes />
          </div>
          <div className="w-100 h-100 flex items-center justify-center">
            {
              this.state.playing ? <GameBoard done={this.done} /> : <AskPlay success={this.state.lastResultWasSuccess} play={this.play}  />
            }
          </div>
          <Score score={this.state.score} />
        </div>
      </div>
    )
  }
};

export default Main