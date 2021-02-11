import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { IconContext } from 'react-icons'
import store from 'store'
import TopRightShortcut from 'components/TopRightShortcut'
import translation from 'lang'
import DEFAULT_VALUES from 'default'
import AppStyles from 'styles/app.module.sass'

translation.setLanguage(DEFAULT_VALUES.settings.lang)

interface Props {
  Component: React.FunctionComponent
}

const App = ({ Component }: Props) => {
  return <div className={AppStyles.TopLevel}>
    <ReduxProvider store={store}>
      <IconContext.Provider
        value={{
          color: 'black',
          className: 'global-class-name'
        }}
      >
        <Component />
        <TopRightShortcut />
      </IconContext.Provider>
    </ReduxProvider>
  </div>
}

export default App
