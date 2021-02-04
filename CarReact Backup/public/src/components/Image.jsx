import React from 'react'

export default function Image(props) {
    return (
        <img src={props.src} className={props.class} style={props.style} alt={props.alt} onClick={props.onClick} height={props.height} width={props.width}/>
    )
}
