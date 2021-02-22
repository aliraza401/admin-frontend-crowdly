import React from "react";


function Footer() {
  return (
      <footer class="footer">
        <div class="container-fluid">
          <nav class="float-left">
            <ul>
              <li>
                <a href="">
                  About Us
                </a>
              </li>
              <li>
                <a href="">
                  Crowdlys
                </a>
              </li>
              <li>
                <a href="https://www.creative-tim.com/license">
                  Licenses
                </a>
              </li>
            </ul>
          </nav>
          <div class="copyright float-right">
            &copy;
                 powered by {" "}
            <span className="text-success" >AngryNerds.</span>
          </div>
        </div>
      </footer>
  );
}

export default Footer;
