import React from "react";


function Footer() {
  return (
      <footer class="footer">
        <div class="container-fluid">
          <nav class="float-left">
            <ul>
              <li>
                <a href="http://theangrynerds.com/" target="_blank" >
                  About Us
                </a>
              </li>
              <li>
              <a href="http://theangrynerds.com/" target="_blank" >
                  Crowdly
                </a>
              </li>
              <li>
              <a href="http://theangrynerds.com/" target="_blank" >
                  Licenses
                </a>
              </li>
            </ul> 
          </nav>
          <div class="copyright float-right">
            &copy;
                 powered by 
            <span className="text-success" >  <a href="http://theangrynerds.com/" target="_blank" style={{color: 'green'}} >AngryNerds.</a></span>
          </div>
        </div>
      </footer>
  );
}

export default Footer;

