const Notification = ({ message }) => {
	return (
		message && <div className="bg-gray-200 p-3 text-red-600 m-3">{message}</div>
	)
}

export default Notification
