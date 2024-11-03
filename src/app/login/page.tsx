'use client'
import { useState } from "react";
import styles from "../Home.module.css"

export default function Login() {
    function activeOrDesactive(value: number) {
        if (toggleActiveInfo === value) {
            setToggleActiveInfo(0);
        } else {
            setToggleActiveInfo(value);
        }
    }
    function portChange() {
        return ("/pedroflix/")
    }
    function englishChange() {
        return ("/pedroflix/en")
    }
    const [toggleActiveInfo, setToggleActiveInfo] = useState<number>(0)
    return (
       <div></div> 
    )
}