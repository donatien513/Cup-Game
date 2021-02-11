import React from 'react'
import Link from 'next/link'
import cn from 'classnames'
import PropTypes from 'prop-types'
import translation from 'lang'
import styles from './styles.module.scss'

const AskPlay = ({ onClick }) => {
  return <Link href="/play">
    <a className={styles.Button} onClick={onClick}>
      <span className={styles.Circle} aria-hidden="true">
        <span className={cn(styles.Icon, styles.Arrow)}></span>
      </span>
      <span className={styles.Text}>{ translation.play }</span>
    </a>
  </Link>
}

AskPlay.defaultProps = {
  onClick: () => {}
}

AskPlay.propTypes = {
  onClick: PropTypes.func
}

export default AskPlay
