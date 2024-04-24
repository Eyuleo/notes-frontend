const LoginForm = ({
	handleLogin,
	username,
	password,
	setPassword,
	setUserName,
}) => {
	return (
		<form onSubmit={handleLogin}>
			<div>
				<label className=" block" htmlFor="username">
					username
				</label>

				<input
					className=" border-2 border-gray-200 w-full"
					type="text"
					value={username}
					name="Username"
					id="username"
					onChange={({ target }) => setUserName(target.value)}
				/>
			</div>
			<div>
				<label className=" block" htmlFor="password">
					password
				</label>
				<input
					className=" border-2 border-gray-200 w-full"
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
	)
}

export default LoginForm
