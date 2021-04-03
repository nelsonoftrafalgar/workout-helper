import { ChangeEvent, useState } from 'react'

import Timer from './Timer'

export interface ISequence {
	id: number
	count: string
	interval: string
}

const Setup = () => {
	const [sequence, setSequence] = useState<ISequence[]>([{ id: 0, count: '', interval: '' }])
	const [submitted, setSubmitted] = useState(false)

	const handleChange = (id: number) => (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.currentTarget
		const currentSequence = sequence.find((item) => item.id === id)!!
		setSequence(sequence.map((el) => (el.id === id ? { ...currentSequence, [name]: value } : el)))
	}

	const handleRemove = (id: number) => () => {
		const newSequence = sequence.filter((item) => item.id !== id)
		setSequence(newSequence)
	}

	return (
		<>
			{submitted ? (
				<Timer sequence={sequence} />
			) : (
				<div className='setup-container'>
					{sequence.map(({ id, interval, count }) => (
						<div key={id}>
							<input
								className='setup-input'
								value={count}
								type='text'
								placeholder='count'
								name='count'
								onChange={handleChange(id)}
							/>
							<input
								className='setup-input'
								value={interval}
								type='text'
								placeholder='interval'
								name='interval'
								onChange={handleChange(id)}
							/>
							<button onClick={handleRemove(id)}>X</button>
						</div>
					))}
					<button
						className='setup-add-button'
						onClick={() => setSequence([...sequence, { id: Date.now(), count: '', interval: '' }])}
					>
						Add sequence
					</button>
					<button className='setup-submit-button' onClick={() => setSubmitted(true)}>
						Submit
					</button>
				</div>
			)}
		</>
	)
}

export default Setup
