import React from "react";

export default function newGame(props : any) {
	return <a onClick={() => props.handleClick()}>new game</a>;
}