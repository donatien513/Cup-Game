import React from 'react'
import lang from 'lang'
import 'styles/shadows.sass'

interface Props {
  score: number,
}

const Score = ({ score }: Props) => {
  return <div className="absolute right-0 top-0 dib ph3 pv2 bg-white mt3 mr3 light-shadow">
    { lang.score } : { score }
  </div>
}

export default Score