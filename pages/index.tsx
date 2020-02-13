import React from 'react'
import Head from 'next/head'
import Modal from 'react-modal'

import AskPlay from '../components/ask-play'
import GameBoard from '../components/game-board'
import AscendingBoxes from '../components/ascending-boxes'
import PreferencesEdit from '../components/preferences-edit'

import PreferencesEditToggler from '../components/preferences-edit-toggler'
import Score from '../components/score'


import '../styles/main.sass'

const DEFAULT_VALUES = {
  numberOfCups: 5,
  shuffleSpeed: 450,
  cupColor: '#1BC56E'
}

const PREFERENCES_EDIT_STYLE = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

interface Props {}
interface State {
  score: number,
  playing: boolean,
  lastResultWasSuccess: boolean,
  editingPreferences: boolean,
  numberOfCups: number,
  shuffleSpeed: number,
  cupColor: string
}


class Main extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      score: 0,
      playing: false,
      lastResultWasSuccess: null,
      editingPreferences: false,
      numberOfCups: DEFAULT_VALUES.numberOfCups,
      shuffleSpeed: DEFAULT_VALUES.shuffleSpeed,
      cupColor: DEFAULT_VALUES.cupColor
    }
    this.play = this.play.bind(this)
    this.done = this.done.bind(this)
    this.updatePreferences = this.updatePreferences.bind(this)
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
  private updatePreferences(newPreferences: {
    numberOfCups: number,
    shuffleSpeed: number,
    cupColor: string
  }) {
    this.setState({
      ...newPreferences,
      editingPreferences: false
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
              this.state.playing ?
                <GameBoard
                  numberOfCups={this.state.numberOfCups}
                  shuffleSpeed={this.state.shuffleSpeed}
                  cupColor={this.state.cupColor}
                  done={this.done}
                /> :
                <AskPlay success={this.state.lastResultWasSuccess} play={this.play}  />
            }
          </div>
          <Score score={this.state.score} />
          <PreferencesEditToggler open={() => this.setState({ editingPreferences: true }) } />
          <Modal
            ariaHideApp={false}
            isOpen={this.state.editingPreferences}
            onRequestClose={() => this.setState({ editingPreferences: false })}
            contentLabel="Préférences"
            style={PREFERENCES_EDIT_STYLE}
          >
            <PreferencesEdit
              done={this.updatePreferences}
              cancel={() => this.setState({ editingPreferences: false })}
              numberOfCups={this.state.numberOfCups}
              shuffleSpeed={this.state.shuffleSpeed}
              cupColor={this.state.cupColor}
            />
          </Modal>
        </div>
      </div>
    )
  }
}

export default Main