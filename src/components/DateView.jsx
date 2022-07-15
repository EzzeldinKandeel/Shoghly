import React from "react"

function DateView(props) {
	let uploadDate = new Date(props.dateCreated)
	let editDate = props.dateUpdated
		? new Date(props.dateUpdated)
		: new Date(props.dateCreated)

	function addZeroOnTheLeft(inputNumber) {
		let outputNumber = String(inputNumber)
		if (outputNumber.length === 1) {
			outputNumber = "0" + outputNumber
		}
		return outputNumber
	}

	return (
		<>
			<div className="review-date">
				<span>
					الوقت:&nbsp;
					{addZeroOnTheLeft(uploadDate.getMinutes())} :&nbsp;
					{addZeroOnTheLeft(uploadDate.getHours())}
					&nbsp;&nbsp;&nbsp; التاريخ:&nbsp;
					{addZeroOnTheLeft(uploadDate.getDate())} /&nbsp;
					{addZeroOnTheLeft(uploadDate.getMonth() + 1)} /&nbsp;
					{String(uploadDate.getFullYear())}
				</span>
			</div>
			{props.dateUpdated && props.dateCreated !== props.dateUpdated && (
				<div className="review-date" style={{ marginBlockStart: "-0.2rem" }}>
					<span>
						أخر تعديل&nbsp;-&nbsp; الوقت:&nbsp;
						{addZeroOnTheLeft(editDate.getMinutes())} :&nbsp;
						{addZeroOnTheLeft(editDate.getHours())}
						&nbsp;&nbsp;&nbsp; التاريخ:&nbsp;
						{addZeroOnTheLeft(editDate.getDate())} /&nbsp;
						{addZeroOnTheLeft(editDate.getMonth() + 1)} /&nbsp;
						{String(editDate.getFullYear())}
					</span>
				</div>
			)}
		</>
	)
}

export default DateView
