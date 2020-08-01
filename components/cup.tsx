import React from 'react'

interface Props {
  select: Function,
  cupKey: number
}

const Cup = ({ select, cupKey }: Props) => {
  return <div style={{ order: cupKey }} onClick={() => select(cupKey)} className="dib w3 mh2 cup">
    <img className="upside-down" src={process.env.baseURL + '/images/plastic-cup.svg' } />
  </div>
}

export default Cup