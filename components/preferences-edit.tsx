import React, { useState } from 'react'
import InputSlider from 'react-input-slider'

import translation from 'lang'
import LanguageSwitch from 'components/language-switch'
import 'styles/shadows.sass'


interface Props {
  done: Function,
  cancel: Function,
  lang: string,
  numberOfCups: number,
  shuffleSpeed: number
}

const MIN_NUMBER_OF_CUP: number = 3
const MAX_NUMBER_OF_CUP: number = 8
const MIN_SHUFFLE_SPEED: number = 1200
const MAX_SHUFFLE_SPEED: number = 200

const PreferencesEdit = ({
  done,
  cancel,
  lang: initialLang,
  numberOfCups: initialNumberOfCups,
  shuffleSpeed: initialShuffleSpeed
}: Props) => {
  const [newLang, setNewLang] = useState(initialLang)
  const [newNumberOfCups, setNewNumberOfCups] = useState(initialNumberOfCups)
  const [newShuffleSpeed, setNewShuffleSpeed] = useState(initialShuffleSpeed)

  const save = () => {
    translation.setLanguage(newLang.toLowerCase())
    done({
      numberOfCups: newNumberOfCups,
      shuffleSpeed: newShuffleSpeed
    })
  }

  return <div>
    <h1 className="lh-solid mt0 mb2">{ translation.preferences }</h1>
    <div className="mv3">
      { translation.numOfCup } : { newNumberOfCups }<br />
      <InputSlider
        axis="x"
        xstep={1}
        xmin={MIN_NUMBER_OF_CUP}
        xmax={MAX_NUMBER_OF_CUP}
        x={newNumberOfCups}
        onChange={(newNumber) => setNewNumberOfCups(newNumber.x)}
      />
    </div>
    <div className="mv3">
      { translation.shuffleSpeed }: { newShuffleSpeed }ms<br />
      <InputSlider
        axis="x"
        xstep={1}
        xmin={MAX_SHUFFLE_SPEED}
        xmax={MIN_SHUFFLE_SPEED}
        x={newShuffleSpeed}
        onChange={(newNumber) => setNewShuffleSpeed(newNumber.x)}
      />
    </div>
    <div>
      { translation.lang }<br />
      <LanguageSwitch lang={initialLang} change={langValue => setNewLang(langValue)} />
    </div>
    <div className="mt4">
      <button
        onClick={save}
        className="ph3 pv2 mh3 bn bg-blue white light-shadow"
      >{ translation.save }</button>
      <button onClick={() => cancel()} className="ph3 pv2 mh3 bn bg-transparent light-shadow">{ translation.cancel }</button>
    </div>
  </div>
}

export default PreferencesEdit