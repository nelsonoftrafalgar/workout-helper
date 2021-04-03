import { ChangeEvent, FC } from 'react'

interface IProps {
	name: string
	value: string
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<IProps> = ({ name, value, onChange }) => {
	return (
		<div className='input-wrapper'>
			<input
				name={name}
				value={value}
				onChange={onChange}
				placeholder=''
				type='text'
				className='input'
			/>
			<label className='label'>{name}</label>
		</div>
	)
}

export default Input
