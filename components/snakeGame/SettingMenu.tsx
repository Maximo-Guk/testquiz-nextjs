import React from "react";

export default function SettingMenu(props : any) {
	return <a onClick={() => props.handleClick(2)}>settings</a>;
}