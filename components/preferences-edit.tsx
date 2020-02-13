import React from 'react'
import InputSlider from 'react-input-slider'

import lang from '../lang'
import LanguageSwitch from './language-switch'
import '../styles/shadows.sass'


interface Props {
  done: Function,
  cancel: Function,
  lang: string,
  numberOfCups: number,
  shuffleSpeed: number
}
interface State {
  numberOfCups: number,
  shuffleSpeed: number,
  lang: string
}

const MIN_NUMBER_OF_CUP: number = 3
const MAX_NUMBER_OF_CUP: number = 8
const MIN_SHUFFLE_SPEED: number = 1200
const MAX_SHUFFLE_SPEED: number = 200

class PreferencesEdit extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      lang: this.props.lang,
      numberOfCups: this.props.numberOfCups,
      shuffleSpeed: this.props.shuffleSpeed
    }
    this.save = this.save.bind(this)
  }

  private save() {
    lang.setLanguage(this.state.lang.toLowerCase())
    this.props.done({
      numberOfCups: this.state.numberOfCups,
      shuffleSpeed: this.state.shuffleSpeed,
    })
  }

  public render() {
    return(
      <div>
        <h1 className="lh-solid mt0 mb2">{ lang.preferences }</h1>
        <div className="mv3">
          { lang.numOfCup } : { this.state.numberOfCups }<br />
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
          { lang.shuffleSpeed }: { this.state.shuffleSpeed }ms<br />
          <InputSlider
            axis="x"
            xstep={1}
            xmin={MAX_SHUFFLE_SPEED}
            xmax={MIN_SHUFFLE_SPEED}
            x={this.state.shuffleSpeed}
            onChange={(newNumber) => this.setState({ shuffleSpeed: newNumber.x })}
          />
        </div>
        <div>
          { lang.lang }<br />
          <LanguageSwitch lang={this.props.lang} change={newLang => this.setState({ lang: newLang })} />
        </div>
        <div className="mt4">
          <button
            onClick={this.save}
            className="ph3 pv2 mh3 bn bg-blue white light-shadow"
          >{ lang.save }</button>
          <button onClick={() => this.props.cancel()} className="ph3 pv2 mh3 bn bg-transparent light-shadow">{ lang.cancel }</button>
        </div>
      </div>
    )
  }
}

export default PreferencesEdit