import { useState } from 'react'

const Togglable = ({ buttonLabel, children }) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	return (
		<div>
			<div style={hideWhenVisible}>
				<button
					className="border-0 bg-gray-700 rounded px-3 py-1 my-3 mr-2 text-white"
					onClick={toggleVisibility}
				>
					{buttonLabel}
				</button>
			</div>
			<div style={showWhenVisible}>
				{children}
				<button
					className="border-0 bg-red-500 rounded px-3 py-1 my-3 mr-2 text-white"
					onClick={toggleVisibility}
				>
					cancel
				</button>
			</div>
		</div>
	)
}

export default Togglable
