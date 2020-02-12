import React from 'react'
import Head from 'next/head'

import AskPlay from '../components/ask-play'
import GameBoard from '../components/game-board'

import '../styles/main.sass'

interface Props {}
interface State {
  playing: boolean
}


class Main extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      playing: false
    }
    this.play = this.play.bind(this)
  }

  private play() {
    this.setState({
      playing: true
    })
  }

  public render() {
    return(
      <div>
        <Head>
          <title>Gobelets | Jeux</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" />
        </Head>
        <div className="game-container">
          {
            this.state.playing ? <GameBoard /> : <AskPlay play={this.play}  />
          }
        </div>
      </div>
    )
  }
};

export default Main