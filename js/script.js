const startBtn = document.querySelector('.start')
const pauseBtn = document.querySelector('.pause')
const stopBtn = document.querySelector('.stop')
const resetBtn = document.querySelector('.reset')
const archiveBtn = document.querySelector('.archive')
const stopwatch = document.querySelector('.stopwatch')
const time = document.querySelector('.time')
const timeList = document.querySelector('.time-list')
const infoBtn = document.querySelector('.info')
const modal = document.querySelector('.modal-shadow')
const closeBtn = document.querySelector('.close')

let countTime
let minutes = 0
let seconds = 0

let timesArr = []

const handleStart = () => {
	clearInterval(countTime)
	countTime = setInterval(() => {
		console.log(seconds)
		if (seconds < 9) {
			seconds++
			stopwatch.textContent = `${minutes}:0${seconds}`
		} else if (seconds >= 9 && seconds < 59) {
			seconds++
			stopwatch.textContent = `${minutes}:${seconds}`
		} else {
			minutes++
			seconds = 0
			stopwatch.textContent = `${minutes}:00`
		}
	}, 50)
}

const handlePause = () => {
	clearInterval(countTime)
}

const handleStop = () => {
	time.innerHTML = `Ostatni czas: ${stopwatch.textContent}`

	if (stopwatch.textContent !== '0:00') {
		time.style.visibility = 'visible'
		timesArr.push(stopwatch.textContent)
	}
	clearStuff()
}

const handleReset = () => {
	clearStuff()
	timesArr = []
	time.style.visibility = 'hidden'
}

const clearStuff = () => {
	clearInterval(countTime)
	stopwatch.textContent = `0:00`
	timeList.textContent = ''
	minutes = 0
	seconds = 0
}

const showArchive = () => {
	timeList.textContent = ''
	let num = 1
	timesArr.forEach((time) => {
		const newTime = document.createElement('li')
		newTime.innerHTML = `Pomiar nr ${num}: <span> ${time}</span>`
		timeList.appendChild(newTime)
		num++
	})
}

const showInfo = () => {
	modal.style.display = 'block'
	modal.classList.toggle('modal-animation')
}
const closeInfo = () => {
	modal.style.display = 'none'
}

startBtn.addEventListener('click', handleStart)
pauseBtn.addEventListener('click', handlePause)
stopBtn.addEventListener('click', handleStop)
resetBtn.addEventListener('click', handleReset)
archiveBtn.addEventListener('click', showArchive)

infoBtn.addEventListener('click', showInfo)
closeBtn.addEventListener('click', closeInfo)
window.addEventListener('click', (e) => {
	e.target === modal ? closeInfo() : false
})
