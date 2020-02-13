import React from 'react'
import SettingIcon from 'react-icons/lib/md/settings'
import '../styles/shadows.sass'

interface Props {
  open: Function
}
interface State {}


class PreferencesEditToggler extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = { }
  }

  public render() {
    return(
      <div onClick={() => this.props.open()} className="absolute right-0 bottom-0 dib ph3 pv2 bg-white mb3 mr3 light-shadow">
        <SettingIcon />
      </div>
    )
  }
};

export default PreferencesEditToggler