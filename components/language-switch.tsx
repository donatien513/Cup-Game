
import React from 'react'
import Select from 'react-select'
import translation from 'lang'

const languages = translation.getAvailableLanguages().map((langCode) => {
  return {
    label: langCode.toUpperCase(),
    value: langCode
  }
})

interface Props {
  change: Function,
  lang: string
}

const LanguageSwitch = ({ change, lang }: Props) => {
  const changeLang = (newLang) => change(newLang.value.toLowerCase())

  return <div>
    <Select
      menuPlacement="top"
      defaultValue={languages.find(availableLang => availableLang.value === lang)}
      isSearchable={false}
      onChange={changeLang}
      options={languages}
    />
  </div>
}

export default LanguageSwitch
