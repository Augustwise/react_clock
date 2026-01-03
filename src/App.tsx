import React from 'react';
import './App.scss';
import { Clock } from './Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

interface State {
  hasClock: boolean;
  clockName: string;
}

export class App extends React.Component<{}, State> {
  nameTimerId: number | null = null;

  hasClock = true;

  state: State = {
    hasClock: true,
    clockName: 'Clock-0',
  };

  componentDidMount(): void {
    this.nameTimerId = window.setInterval(() => {
      this.setState({
        clockName: getRandomName(),
      });
    }, 3300);

    document.addEventListener('contextmenu', (event: MouseEvent) => {
      event.preventDefault();

      this.hasClock = false;
      this.setState({ hasClock: false });
    });

    document.addEventListener('click', () => {
      this.hasClock = true;
      this.setState({ hasClock: true });
    });
  }

  componentWillUnmount(): void {
    if (this.nameTimerId !== null) {
      window.clearInterval(this.nameTimerId);
    }
  }

  render() {
    const { hasClock, clockName } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>

        {hasClock && <Clock name={clockName} />}
      </div>
    );
  }
}
