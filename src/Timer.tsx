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
		<>
			{step === sequence.length ? (
				<div className='d-flex align-items-center justify-content-center h-100'>
					<span className='done'>Done!</span>
				</div>
			) : (
				<div className='d-flex flex-column align-items-center justify-content-between h-100'>
					<span className='timer-to-go'>To go: {sequence.length - step}</span>
					<span className='timer-sequence px-5'>{sequence[step].count}</span>
					<span className='timer-counter'>{seconds} s</span>
					<button className='button' onClick={() => setActive(!active)}>
						{active ? 'Pause' : 'Start'}
					</button>
				</div>
			)}
		</>
	)
}

export default Timer
