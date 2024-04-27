import { useState, useImperativeHandle, forwardRef } from 'react'

const Togglable = forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return { toggleVisibility }
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				<button
					className="border-0 bg-gray-700 rounded px-3 py-1 my-3 mr-2 text-white"
					onClick={toggleVisibility}
				>
					{props.buttonLabel}
				</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button
					className="border-0 bg-red-500 rounded px-3 py-1 my-3 mr-2 text-white"
					onClick={toggleVisibility}
				>
					cancel
				</button>
			</div>
		</div>
	)
})

export default Togglable
