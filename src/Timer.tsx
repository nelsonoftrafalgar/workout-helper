import { FC, useEffect, useRef, useState } from 'react'

import { ISequence } from './Setup'

interface IProps {
	sequence: ISequence[]
}

const Timer: FC<IProps> = ({ sequence }) => {
	const step = useRef(0)
	const [seconds, setSeconds] = useState(+sequence[0].interval)
	const [active, setActive] = useState(false)

	useEffect(() => {
		let timer: number = 0

		if (active && seconds === 0) {
			timer = window.setInterval(() => {
				step.current++
				if (step.current < sequence.length) setSeconds(+sequence[step.current].interval)
				setActive(false)
			}, 1000)
		}

		if (active && seconds > 0) {
			timer = window.setInterval(() => setSeconds((seconds) => seconds - 1), 1000)
		}

		return () => {
			clearInterval(timer)
		}
	}, [active, seconds, sequence])

	return (
		<>
			{step.current === sequence.length ? (
				<div className='d-flex align-items-center justify-content-center h-100'>
					<span className='done'>Done!</span>
				</div>
			) : (
				<div className='d-flex flex-column align-items-center justify-content-between h-100'>
					<span className='timer-to-go'>To go: {sequence.length - step.current}</span>
					<span className='timer-sequence px-5'>{sequence[step.current].count}</span>
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
