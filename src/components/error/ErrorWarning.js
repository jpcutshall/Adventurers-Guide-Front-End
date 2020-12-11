import React from "react"
import { Alert } from "react-bootstrap"
import { XOctagon } from "react-bootstrap-icons"

export default function ErrorWarning(props) {

		return (
			<Alert className="text-center shadow p-3 mb-5 rounded" variant="danger" onClose={props.clearError} dismissible>
			  <Alert.Heading><XOctagon color="red" /></Alert.Heading>
			  <p>
			    {props.message}
			  </p>

			</Alert>

		)


}
