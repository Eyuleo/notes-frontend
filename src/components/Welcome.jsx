import React from 'react'

const Welcome = ({ name, onClick }) => {
	return (
		<div className="flex justify-between items-center">
			<p className="text-gray-800 text-xl">welcome {name}</p>
			<button
				onClick={onClick}
				className="border-0 bg-red-500 rounded px-3 py-1 my-3 mr-2 text-white"
			>
				Log Out
			</button>
		</div>
	)
}

export default Welcome
