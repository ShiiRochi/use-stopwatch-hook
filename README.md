# React Stopwatch Hook

#### Purpose
This package allows everyone to use stopwatch hook to count some spent time.

#### Demo
[View on CodeSandbox](https://codesandbox.io/embed/use-stopwatch-hook-demo-z6lno)

#### API

##### useStopwatch
Default export from the package.  
Accepts the following list of arguments:
1. interval:number (default is 10)  
Interval timing and basis for increment operation
2. onStop:Function<{ts: number, ms: number}>  
Callback that is called when stop has been called 
3. onStart:Function<{ts: number, ms: number}>  
Callback that is called when start has been called 
4. onPause:Function<{ts: number, ms: number}>  
Callback that is called when pause has been called 
5. onRestart:Function<{ts: number, ms: number}>  
Callback that is called when restart has been called

Each callback function returns timestamp and amount of milliseconds registered on the moment when they were called.

##### milliseconds
Amount of milliseconds passed since stopwatch start.

##### status
Indicator on current stopwatch status.  
Can be one of the following:
- running  
Stopwatch is running
- paused  
Stopwatch was paused
- stopped  
Stopwatch is not running

##### start
Starts stopwatch.  
Calls onStart.

##### pause
Pauses stopwatch, without resetting amount of milliseconds.  
Calls onPause.

##### stop
Stops stopwatch, resets passed milliseconds.  
Calls onStop.

##### restart
Resets passed milliseconds, does not stop stopwatch.  
Calls onRestart.

#### Example

```javascript
import useStopwatchHook from 'use-stopwatch-hook';

function App() {
  const [milliseconds, status, start, pause, stop, restart] = useStopwatch({
    interval: 100,
  });

  return (
    <div className="App">
      <h1>Use Stopwatch Hook</h1>
      <div className="demo-row">
        <b>{milliseconds}</b> milliseconds passed
      </div>
      <div className="demo-row">
        current status is <b>{status}</b>
      </div>
      <div className="demo-row">
        <button className="btn" onClick={start}>
          Start
        </button>
        <button className="btn" onClick={pause}>
          Pause
        </button>
        <button className="btn" onClick={restart}>
          Restart
        </button>
        <button className="btn" onClick={stop}>
          Stop
        </button>
      </div>
    </div>
  );
}
```

#### TODO
- [x] Start
- [x] Pause
- [x] Restart
- [x] Stop
- [ ] Laps

#### Contribution
If you have an idea (or many of them) on how to improve and accelerate performance of the hook, then you should fork the repository, make changes and, finally, create a pull-request with a description of what you've done.