import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import cn from 'classnames'
import InputSlider from 'react-input-slider'
import { useSelector, useDispatch } from 'react-redux'
import translation from 'lang'
import LanguageSwitch from 'components/language-switch'
import { gameSettingsActions } from 'actions'

import ButtonStyles from 'styles/button.module.sass'
import SizingStyles from 'styles/sizing.module.sass'
import SpacingStyles from 'styles/spacing.module.sass'
import PositionStyles from 'styles/position.module.sass'
import FlexStyles from 'styles/flex.module.sass'

const { SET_NUMBER_OF_CUP, SET_SHUFFLE_SPEED } = gameSettingsActions

const MIN_NUMBER_OF_CUP: number = 3
const MAX_NUMBER_OF_CUP: number = 8
const MIN_SHUFFLE_SPEED: number = 1200
const MAX_SHUFFLE_SPEED: number = 200

const PreferencesEdit = () => {
  const router = useRouter()
  const initialSettings = useSelector(({ settings }) => settings)
  const [editedSettings, setEditedSettings] = useState({
    lang: initialSettings.lang,
    numberOfCups: initialSettings.numberOfCups,
    shuffleSpeed: initialSettings.shuffleSpeed
  })
  const dispatch = useDispatch()
  const save = () => {
    translation.setLanguage(editedSettings.lang.toLowerCase())
    dispatch({ type: SET_NUMBER_OF_CUP, payload: editedSettings.numberOfCups })
    dispatch({ type: SET_SHUFFLE_SPEED, payload: editedSettings.shuffleSpeed })
    router.push('/')
  }

return <div>
  <Head>
    <title>Gobelets | Jeux</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  </Head>
  <div 
    className={cn(
      SizingStyles.w100,
      SizingStyles.h100,
      PositionStyles.absolute,
      FlexStyles.Centerize
    )}
  >
    <div>
      <h1>{ translation.preferences }</h1>
      <div className={cn(SpacingStyles.mt4, SpacingStyles.mb4)}>
      { translation.numOfCup } : { editedSettings.numberOfCups }<br />
        <InputSlider
          axis="x"
          xstep={1}
          xmin={MIN_NUMBER_OF_CUP}
          xmax={MAX_NUMBER_OF_CUP}
          x={editedSettings.numberOfCups}
          onChange={newNumber => setEditedSettings(prevSettings => ({
            ...prevSettings,
            numberOfCups: newNumber.x
          }))}
        />
      </div>
      <div className={cn(SpacingStyles.mt4, SpacingStyles.mb4)}>
      { translation.shuffleSpeed }: { editedSettings.shuffleSpeed }ms<br />
        <InputSlider
          axis="x"
          xstep={1}
          xmin={MAX_SHUFFLE_SPEED}
          xmax={MIN_SHUFFLE_SPEED}
          x={editedSettings.shuffleSpeed}
          onChange={newNumber => setEditedSettings(prevSettings => ({
            ...prevSettings,
            shuffleSpeed: newNumber.x
          }))}
        />
      </div>
      <div>
      { translation.lang }<br />
        <LanguageSwitch
          lang={editedSettings.lang}
          change={langValue => setEditedSettings(prevSettings => ({
            ...prevSettings,
            lang: langValue
          }))}
        />
      </div>
      <div className={SpacingStyles.mt4}>
        <button onClick={save} className={ButtonStyles.Button}>
          { translation.save }
        </button>
      </div>
      </div>
    </div>
  </div>
}

export default PreferencesEdit
