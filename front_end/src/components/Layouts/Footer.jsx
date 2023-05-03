import { Link } from "react-router-dom";
import React from "react";

export const  Footer = ()=>{
    return (
        <footer style={{ display: "flex", bottom: "0",alignItems:"baseline", justifyContent: "space-between"  ,zIndex:"200",backgroundColor:"black",color:"whitesmoke"}}>
      <div >
        AROGYA JABALPUR
        <div style={{ display: "flex" }}>
          <ul>
            <li>About</li>
            <li>Blog</li>
            <li>Careers</li>
            <li><a href="mailto: mohitdubey1322001@gmail.com" >ContectUs</a></li>
            <li><Link to="/doctorSigin">Join us as Doctor</Link></li>
          </ul>

        </div>
      </div>
      <div>
        Social
        <div style={{ display: "flex" }} >
          <ul>
            <li> Facebook</li>
            <li><a href="https://twitter.com/MohitDu25017405" alt="https://twitter.com">Twitter</a></li>
            <li> <a href="https://www.linkedin.com/in/mohit-dubey-0903b6226" alt="https://www.linkedin.com">Linkdin</a></li>
            <li> Youtube</li>
            <li><a href="https://github.com/mohitdubey132" alt="https://github.com">Github</a></li>
          </ul>

        </div>
      </div>
    </footer>

    )
}