import React, { useState } from "react"
import { Alert } from "react-bootstrap"

export default function ErrorWarning(props) {

		return (
			<Alert variant="warning" onClose={props.clearError} dismissible>
			  <Alert.Heading>Warning!</Alert.Heading>
			  <p>
			    {props.message}
			  </p>

			</Alert>

		)


}
