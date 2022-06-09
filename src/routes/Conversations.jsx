import React from "react"
import { getData } from "../data"
import ConversationsBox from "../components/ConversationsBox"

function Conversations() {
	let data = getData()

	return (
		<>
			{data.conversations
				.filter((x) => x.client_id == 0) // 0 means currentClient --temporary--
				.map((x) => {
					return (
						<ConversationsBox key={x.worker_id} workersIds_={x.worker_id} />
					)
				})}
		</>
	)
}

export default Conversations
