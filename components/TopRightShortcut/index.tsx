import React from 'react'
import { useSelector } from 'react-redux'
import { MdSettings } from 'react-icons/md'
import Link from 'next/link'
import translation from 'lang'
import styles from './styles.module.sass'

const TopRightShortcut = () => {
  const score = useSelector(({ score }) => score)
  return <div
    className={styles.Container}
  >
    <Link href="/setting">
      <MdSettings className={styles.SettingIcon} />
    </Link>
    <span>
      { translation.score } : { score }
    </span>
  </div>
}

export default TopRightShortcut