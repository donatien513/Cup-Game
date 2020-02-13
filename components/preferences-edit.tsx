import React from 'react'
import InputSlider from 'react-input-slider'
import '../styles/shadows.sass'

interface Props {
  done: Function,
  cancel: Function,
  numberOfCups: number,
  shuffleSpeed: number,
  cupColor: string
}
interface State {
  numberOfCups: number,
  shuffleSpeed: number,
  cupColor: string
}

const MIN_NUMBER_OF_CUP: number = 3
const MAX_NUMBER_OF_CUP: number = 8
const MIN_SHUFFLE_SPEED: number = 1200
const MAX_SHUFFLE_SPEED: number = 200

class PreferencesEdit extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      numberOfCups: this.props.numberOfCups,
      shuffleSpeed: this.props.shuffleSpeed,
      cupColor: this.props.cupColor,
    }
  }

  public render() {
    return(
      <div>
        <h1 className="lh-solid mt0 mb2">Préférences</h1>
        <div className="mv3">
          Nombre de gobelet: { this.state.numberOfCups }<br />
          <InputSlider
            axis="x"
            xstep={1}
            xmin={MIN_NUMBER_OF_CUP}
            xmax={MAX_NUMBER_OF_CUP}
            x={this.state.numberOfCups}
            onChange={(newNumber) => this.setState({ numberOfCups: newNumber.x })}
          />
        </div>
        <div className="mv3">
          Vitesse du mélange: { this.state.shuffleSpeed }ms<br />
          <InputSlider
            axis="x"
            xstep={1}
            xmin={MAX_SHUFFLE_SPEED}
            xmax={MIN_SHUFFLE_SPEED}
            x={this.state.shuffleSpeed}
            onChange={(newNumber) => this.setState({ shuffleSpeed: newNumber.x })}
          />
        </div>
        <div className="mt4">
          <button
            onClick={() => this.props.done({
              numberOfCups: this.state.numberOfCups,
              shuffleSpeed: this.state.shuffleSpeed,
              cupColor: this.state.cupColor,
            })}
            className="ph3 pv2 mh3 bn bg-blue white light-shadow"
          >
            Enregistrer
          </button>
          <button onClick={() => this.props.cancel()} className="ph3 pv2 mh3 bn bg-transparent light-shadow">Annuler</button>
        </div>
      </div>
    )
  }
};

export default PreferencesEdit