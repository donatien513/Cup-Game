
import React from 'react'
import Select from 'react-select'
import lang from 'lang'

const languages = lang.getAvailableLanguages().map((langCode) => {
  return {
    label: langCode.toUpperCase(),
    value: langCode
  };
});

interface Props {
  change: Function,
  lang: string
}
interface State { }

class LanguageSwitch extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {}
    this.changeLang = this.changeLang.bind(this);
  }

  private changeLang(newLang) {
    this.props.change(newLang.value.toLowerCase())
  }

  public render() {
    return(
      <div className="">
        <Select
          menuPlacement="top"
          defaultValue={languages.find(lang => lang.value === this.props.lang)}
          isSearchable={false}
          onChange={this.changeLang}
          options={languages}
        />
      </div>
    );
  }
}

export default LanguageSwitch;