const NoteForm = ({ addNote, handleNoteChange, newNote }) => {
	return (
		<form onSubmit={addNote}>
			<textarea
				className="block w-full pl-3 pt-3 border-gray-400 ring-1 ring-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
				value={newNote}
				onChange={handleNoteChange}
				placeholder="What's on your mind?"
				required
			></textarea>
			<button
				className="bg-gray-800 my-2 px-6 py-1 rounded text-white"
				type="submit"
			>
				save
			</button>
		</form>
	)
}

export default NoteForm
