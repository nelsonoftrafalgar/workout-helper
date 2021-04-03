import { ChangeEvent, useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import Input from './components/Input'
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
		<div className='py-5 d-flex flex-column align-items-center w-100'>
			{submitted ? (
				<Timer sequence={sequence} />
			) : (
				<>
					{sequence.map(({ id, interval, count }) => (
						<Row className='w-100 mb-3' key={id}>
							<Col xs='5'>
								<Input value={count} name='count' onChange={handleChange(id)} />
							</Col>
							<Col xs='5'>
								<Input value={interval} name='interval' onChange={handleChange(id)} />
							</Col>
							<Col xs='2'>
								<div className='h-100 d-flex align-items-center justify-content-center'>
									<button className='remove-button' onClick={handleRemove(id)}>
										&#x2716;
									</button>
								</div>
							</Col>
						</Row>
					))}
					<div className='d-flex'>
						<button
							className='button mx-3'
							onClick={() =>
								setSequence([...sequence, { id: Date.now(), count: '', interval: '' }])
							}
						>
							Add sequence
						</button>
						<button className='button mx-3' onClick={() => setSubmitted(true)}>
							Submit
						</button>
					</div>
				</>
			)}
		</div>
	)
}

export default Setup
