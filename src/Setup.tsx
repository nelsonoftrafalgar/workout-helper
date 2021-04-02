import { ChangeEvent, useState } from 'react'

const Setup = () => {
	const [sequence, setSequence] = useState<Array<Record<string, string>>>([
		{ count: '', break: '' },
	])

	const handleChange = (idx: number) => (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.currentTarget
		const currentSequence: Record<string, string> = { ...sequence[idx] }
		currentSequence[name] = value
		setSequence(sequence.map((el, i) => (i === idx ? currentSequence : el)))
	}

	return (
		<div className='setup-container'>
			{sequence.map((item, idx) => (
				<div key={idx}>
					<input
						className='setup-input'
						value={item.count}
						type='text'
						placeholder='count'
						name='count'
						onChange={handleChange(idx)}
					/>
					<input
						className='setup-input'
						value={item.break}
						type='text'
						placeholder='break'
						name='break'
						onChange={handleChange(idx)}
					/>
				</div>
			))}
			<button
				className='setup-add-button'
				onClick={() => setSequence([...sequence, { count: '', break: '' }])}
			>
				Add sequence
			</button>
		</div>
	)
}

export default Setup
