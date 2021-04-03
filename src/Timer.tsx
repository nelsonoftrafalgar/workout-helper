import { FC, useEffect, useState } from 'react'

import { ISequence } from './Setup'

interface IProps {
	sequence: ISequence[]
}

const Timer: FC<IProps> = ({ sequence }) => {
	const [step, setStep] = useState(0)
	const [seconds, setSeconds] = useState(+sequence[0].interval)
	const [active, setActive] = useState(false)

	useEffect(() => {
		if (step < sequence.length) setSeconds(+sequence[step].interval)
	}, [step, sequence])

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
			{step === sequence.length ? (
				<span>Done!</span>
			) : (
				<>
					<span>To go: {sequence.length - step}</span>
					<span className='timer-sequence'>{sequence[step].count}</span>
					<span className='timer-counter'>{seconds}</span>
					<button className='timer-toggle-button' onClick={() => setActive(!active)}>
						{active ? 'Pause' : 'Start'}
					</button>
				</>
			)}
		</div>
	)
}

export default Timer
