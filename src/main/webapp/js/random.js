function getRandomParam() {
	var date = new Date();
	return "" + (parseInt(date.getFullYear()) - 1900) + (date.getMonth() + 1)
			+ date.getDate() + date.getHours() + date.getMinutes()
			+ date.getSeconds() + date.getMilliseconds();
}