import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'
import styles from './styles.module.sass'

const Cup = ({ select, cupKey, hasRedBall, canPreviewContent, revealContent }) => {
  return <button
    onClick={() => select(cupKey)}
    className={styles.Cup}
  >
    { hasRedBall &&
      <img
        className={styles.RedBall}
        src={process.env.baseURL + '/images/red-ball.png'}
      /> 
    }
    <div className={cn(styles.CupMovable, {
      [styles.CupMovableForceJump]: revealContent,
      [styles.CupMovableJumpOnHover]: canPreviewContent
    })}>
      <img
        className={styles.CupImage}
        src={process.env.baseURL + '/images/plastic-cup.svg' }
      />
    </div>
  </button>
}

Cup.defaultProps = {
  select: () => {},
  cupKey: null,
  hasRedBall: false,
  revealContent: false,
  canPreviewContent: false
}

Cup.propTypes = {
  select: PropTypes.func,
  cupKey: PropTypes.number,
  hasRedBall: PropTypes.bool,
  revealContent: PropTypes.bool,
  canPreviewContent: PropTypes.bool
}

export default Cup
