// import Image from "next/image"
// import ShareUnslt from "../../../public/icons/share_unselected.svg"
// import Shareslt from "../../../public/icons/share_selected.svg"
// import DashUnslt from "../../../public/icons/dashboard_unselected.svg"
// import Dashslt from "../../../public/icons/dashboard_selected.svg"
// import PeopleUnslt from "../../../public/icons/people_unselected.svg"
// import Peopleslt from "../../../public/icons/people_selected.svg"
// import StarUnslt from "../../../public/icons/star_unselected.svg"
// import Starslt from "../../../public/icons/star_selected.svg"
// import { useState } from "react"




// export default function Navbar(){
//     return(<>
//     <nav className="px-6 py-4 bg-base-300 .box-shadow">
//         <ul className="flex flex-row justify-between items-center1">
//             <a href=""><li className="flex justify-center items-center flex-col">
//                 <Image src={DashUnslt}/>
//                 <p className={`flex justify-center items-center flex-col`}>Dashboard</p>
//             </li></a>
//             <a href=""><li className="flex justify-center items-center flex-col">
//                 <Image src={ShareUnslt}/>
//                 <p className="caption-1 text-white">Share</p>
//             </li></a>
//             <a href=""><li className="flex justify-center items-center flex-col">
//                  <Image src={StarUnslt}/>
//                  <p className="caption-1 text-white">Star</p>
//             </li></a>
//             <a href=""><li className="flex justify-center items-center flex-col">
//                   <Image src={PeopleUnslt}/>
//                   <p className="caption-1 text-white">People</p>
//             </li></a>
//         </ul>
//     </nav>
//     </>)
// }
"use client"
import Link from "next/link";
import Image from "next/image";
import ShareUnselected from "../../../public/icons/share_unselected.svg";
import ShareSelected from "../../../public/icons/share_selected.svg";
import DashboardUnselected from "../../../public/icons/dashboard_unselected.svg";
import DashboardSelected from "../../../public/icons/dashboard_selected.svg";
import PeopleUnselected from "../../../public/icons/people_unselected.svg";
import PeopleSelected from "../../../public/icons/people_selected.svg";
import StarUnselected from "../../../public/icons/star_unselected.svg";
import StarSelected from "../../../public/icons/star_selected.svg";
import { useState } from "react";

export default function Navbar() {
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <>
      <nav className="px-6 py-4 bg-base-300 .box-shadow">
        <ul className="flex flex-row justify-between items-center1">
          <Link href="/class" onClick={() => handleMenuClick("dashboard")}>
            <li className="flex justify-center items-center flex-col">
              <Image
                src={selectedMenu === "dashboard" ? DashboardSelected : DashboardUnselected}
              />
              <p className={`caption-1 text-white`}>Dashboard</p>
            </li>
          </Link>
          <Link href="/share" onClick={() => handleMenuClick("share")}>
            <li className="flex justify-center items-center flex-col">
              <Image
                src={selectedMenu === "share" ? ShareSelected : ShareUnselected}
              />
              <p className="caption-1 text-white">Share</p>
            </li>
          </Link>
          <Link href="/starred" onClick={() => handleMenuClick("star")}>
            <li className="flex justify-center items-center flex-col">
              <Image
                src={selectedMenu === "star" ? StarSelected : StarUnselected}
              />
              <p className="caption-1 text-white">Star</p>
            </li>
          </Link>
          <Link href="/people" onClick={() => handleMenuClick("people")}>
            <li className="flex justify-center items-center flex-col">
              <Image
                src={selectedMenu === "people" ? PeopleSelected : PeopleUnselected}
              />
              <p className="caption-1 text-white">People</p>
            </li>
          </Link>
        </ul>
      </nav>
    </>
  );
}