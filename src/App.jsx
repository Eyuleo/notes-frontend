import { useEffect, useState, useRef } from 'react'
import noteService from './services/notes'
import loginService from './services/login'
import Note from './components/Note'
import Notification from './components/Notification'
import NoteForm from './components/NoteForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Welcome from './components/Welcome'

const App = () => {
	const [notes, setNotes] = useState([])
	const [showAll, setShowAll] = useState(true)
	const [errorMessage, setErrorMessage] = useState(null)
	const [username, setUserName] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [loginVisible, setLoginVisible] = useState(false)

	const noteFormRef = useRef()

	useEffect(() => {
		noteService.getAll().then((res) => {
			setNotes(res)
		})
	}, [])

	useEffect(() => {
		const loggedUser = localStorage.getItem('loggedInUser')
		if (loggedUser) {
			const user = JSON.parse(loggedUser)
			setUser(user)
			noteService.setToken(user.token)
		}
	}, [])
	const addNote = (noteObject) => {
		noteFormRef.current.toggleVisibility()
		noteService.create(noteObject).then((res) => {
			setNotes(notes.concat(res))
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

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username,
				password,
			})
			localStorage.setItem('loggedInUser', JSON.stringify(user))
			noteService.setToken(user.token)
			setUser(user)
			setUserName('')
			setPassword('')
		} catch (error) {
			setErrorMessage('Wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 3000)
		}
	}

	const handleLogOut = () => {
		localStorage.removeItem('loggedInUser')
		setUser(null)
	}

	const notesToShow = showAll
		? notes
		: notes.filter((note) => note.important === true)

	return (
		<>
			<h1 className="text-xl text-gray-800 mb-2">Notes</h1>
			<Notification message={errorMessage} />

			{!user && (
				<Togglable buttonLabel="log in">
					<LoginForm
						handleLogin={handleLogin}
						setPassword={setPassword}
						setUserName={setUserName}
						username={username}
						password={password}
					/>
				</Togglable>
			)}
			{user && (
				<>
					<Welcome name={user.name} onClick={handleLogOut} />
					<Togglable buttonLabel="new note" ref={noteFormRef}>
						<NoteForm createNote={addNote} />
					</Togglable>
				</>
			)}
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
