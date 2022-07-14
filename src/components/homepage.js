import React from "react";
import '../styles/base.scss'
import Logo from './logo.png'
import Pointer from './pointer.png'

export default function Homepage() {
    return (
        <div>
            <Banner />
        </div>
    )
}

function Banner() {
    return (
        <div className="landing">
            <span id="top-left">
                Poster <br />
                Collection
            </span>
            <span id="top-right">
                Volume. 01 <br />
                July 2022
            </span>
            <span id="bottom-left">
                "30 days"
            </span>
            <span id="bottom-right">
                <a href="/gallery">
                    <img src={Pointer} height={'40px'} width={'auto'} alt="" />
                </a>
            </span>
            <img src={Logo} alt="" id="middle" />
        </div>
    )
}
