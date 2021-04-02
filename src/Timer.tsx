import { useEffect, useState } from 'react'

import { sequence } from './sequence'

const Timer = () => {
	const [step, setStep] = useState(0)
	const [seconds, setSeconds] = useState(sequence[step].break)
	const [active, setActive] = useState(false)

	useEffect(() => {
		setSeconds(sequence[step].break)
	}, [step])

	useEffect(() => {
		let timer: number = 0

		if (active) timer = window.setInterval(() => setSeconds((seconds) => seconds - 1), 1000)
		else clearInterval(timer)

		if (active && seconds < 0) {
			setStep((step) => step + 1)
			setActive(false)
		}

		return () => {
			clearInterval(timer)
		}
	}, [active, seconds])

	return (
		<div className='timer-container'>
			<span className='timer-sequence'>{sequence[step].count}</span>
			<span className='timer-counter'>{seconds}</span>
			<button className='timer-toggle-button' onClick={() => setActive(!active)}>
				{active ? 'Pause' : 'Start'}
			</button>
		</div>
	)
}

export default Timer
