let timerId: number | null = null

// the interval time in milliseconds
let interval = 20

// event handler for Worker.postMessage
self.onmessage = ({ data }: { data: { interval: number, message: 'start' | 'stop' | 'interval' | 'close' } }) => {
  console.log(data)
  switch (data.message) {
    case 'start':
      start()
      break
    case 'stop':
      stop()
      break
    case 'interval':
      changeInterval(data.interval)
      break
    case 'close':
      stop()
      close()
      break
  }
}

// starts the timer
function start (): void {
  if (timerId !== null) return
  timerId = setInterval(tick, interval) as unknown as number
}

// stops the interval
function stop (): void {
  if (timerId === null) return
  console.log('stop', timerId)
  clearInterval(timerId)
  timerId = null
}

// stops the timer, changes the interval and starts timer again
function changeInterval (intervalParam: number): void {
  interval = intervalParam
  if (timerId !== null) {
    stop()
    start()
  }
}

// posts the tick message
function tick (): void {
  postMessage('tick')
}
