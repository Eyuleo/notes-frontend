import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
const Note = ({ note, toggleImportance, deleteNote }) => {
	const label = note.important ? 'make not important' : 'make important'
	return (
		<div className="py-4 px-3 mb-3 bg-white shadow-sm ring-1 ring-gray-200 rounded-lg divide-y">
			<div className="flex items-center justify-end  space-x-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 text-gray-600 -scale-x-100"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth="2"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
					/>
				</svg>
				<small className="text-sm text-gray-600 ">
					{dayjs(note.createdAt).fromNow()}
				</small>
			</div>
			<li className="text-gray-800 font-medium">{note.content}</li>
			<button
				className="border-0 bg-gray-700 rounded px-3 py-1 my-3 mr-2 text-white"
				onClick={toggleImportance}
			>
				{label}
			</button>
			<button
				className="border-0 bg-red-500 rounded px-3 py-1 my-3 mr-2 text-white"
				onClick={deleteNote}
			>
				Delete
			</button>
		</div>
	)
}

export default Note
