import Infoicon from "../../../public/img/svgs/Info.svg"
import Image from "next/image"

export default function Topbar(){
    return(<>
    <div className="border-b-2 border-base-100 p-4 flex justify-between items-center">
        <img src="/img/ggs1.jpg" className="rounded-full w-8 h-8"/>
        <p className="title-2 text-white">39XE/7A</p>
        <a href=""><Image
        src={Infoicon} 
        /></a>
    </div>
    </>)
}2