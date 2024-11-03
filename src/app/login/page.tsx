'use client'
import { useState } from "react";

export default function Login() {
    function activeOrDesactive(value: number) {
        if (toggleActiveInfo === value) {
            setToggleActiveInfo(0);
        } else {
            setToggleActiveInfo(value);
        }
    }
    const [toggleActiveInfo, setToggleActiveInfo] = useState<number>(0)
    return (
       <div>
        <button onClick={() => activeOrDesactive}></button>
       </div> 
    )
}