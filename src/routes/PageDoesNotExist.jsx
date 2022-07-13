import React from "react"

function PageDoesNotExist() {
	document.title = "شغلي"
	return (
		<h1 className="content-does-not-exist">
			الصفحة التي تحاول الوصول إليها غير موجودة.
		</h1>
	)
}

export default PageDoesNotExist
