import React from 'react'
import shuffle from 'shuffle-array'

import Cup from './cup'

interface Props {}
interface State {
  selectedCup: number,
  cups: number[]
}


class GameBoard extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      selectedCup: null,
      cups: [1, 2, 3]
    }
    this.selected = this.selected.bind(this)
    this.shuffle = this.shuffle.bind(this)
  }

  private selected(cup: number) {
    this.setState({
      selectedCup: cup
    })
  }

  private shuffle() {
    let iteration = 0;
    const interval = setInterval(() => {
      if (iteration >= 8) {
        clearInterval(interval)
      }
      this.setState({
        cups: shuffle(this.state.cups)
      })
      iteration++;
      console.log('Shuffling ' + iteration);
    }, 500)
  }

  public render() {
    return(
      <div>
        <h2 className="choose-cup">Choisissez votre gobelet</h2>
        <div className="table">
            {
              this.state.cups.map((cupKey) => {
                return <Cup key={cupKey} cupKey={cupKey} selected={this.selected} />
              })
            }
        </div>
        <div className="text-center">
          <button onClick={this.shuffle}>Commencer</button>
        </div>
      </div>
    )
  }
};

export default GameBoard