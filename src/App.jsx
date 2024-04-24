import { useEffect, useState } from 'react'
import noteService from './services/notes'
import Note from './components/Note'
import Notification from './components/Notification'

const App = () => {
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState('')
	const [showAll, setShowAll] = useState(true)
	const [errorMessage, setErrorMessage] = useState(null)
	const [username, setUserName] = useState('')
	const [password, setPassword] = useState('')
	useEffect(() => {
		noteService.getAll().then((res) => {
			setNotes(res)
		})
	}, [])

	const addNote = (event) => {
		event.preventDefault()
		const noteObject = {
			content: newNote,
			important: Math.random() > 0.5,
		}

		noteService.create(noteObject).then((res) => {
			setNotes(notes.concat(res))
			setNewNote('')
		})
	}

	const toggleImportanceOf = (id) => {
		const note = notes.find((n) => n.id === id)
		const changedNote = { ...note, important: !note.important }

		noteService
			.update(id, changedNote)
			.then((returnedNote) => {
				setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
			})
			.catch((error) => {
				setErrorMessage(`${note.content} was already removed from server`)
				setTimeout(() => {
					setErrorMessage(null)
				}, 3000)
			})
	}

	const deleteNote = (id) => {
		noteService.deleteNote(id).then((res) => {
			setNotes(notes.filter((note) => note.id !== id))
		})
	}

	const handleNoteChange = (event) => {
		setNewNote(event.target.value)
	}

	const handleLogin = (event) => {
		event.preventDefault()
		console.log('logging in with', username, password)
	}

	const notesToShow = showAll
		? notes
		: notes.filter((note) => note.important === true)
	return (
		<>
			<h1 className="text-xl text-gray-800 mb-2">Notes</h1>
			<Notification message={errorMessage} />

			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div>
					<label className=" block" htmlFor="username">
						username
					</label>

					<input
						className=" border-2 border-gray-200"
						type="text"
						value={username}
						name="Username"
						id="username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					<label className=" block" htmlFor="password">
						password
					</label>
					<input
						type="password"
						value={password}
						name="Password"
						id="password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button
					className="bg-gray-800 my-2 px-6 py-1 rounded text-white"
					type="submit"
				>
					login
				</button>
			</form>

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
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? 'important' : 'all'}
				</button>
			</div>
			<ul>
				{notesToShow.map((note) => (
					<Note
						key={note.id}
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
						deleteNote={() => deleteNote(note.id)}
					/>
				))}
			</ul>
		</>
	)
}

export default App
