import React from "react";
import { Navigation } from "react-minimal-side-navigation";
// import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { useHistory, Switch, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import SidebarImg from "./../assets/img/sidebar-1.jpg";

function Sidebar() {
  const history = useHistory();
  const name = useSelector(state => state.user.user.name);


  return (
    <div className="sidebar">

    <div class="sidebar" data-color="purple" data-background-color="white"  >
      <div className="logo"  ><Link to="/dashboard" className="simple-text text-white logo-normal">
          {name}
        </Link></div>
      {/* <div class="sidebar-wrapper">
        <ul class="nav">  
          <li class="nav-item active  ">
            <a class="nav-link" href="./dashboard.html">
              <i class="material-icons">dashboard</i>
              <p>Dashboard</p>
            </a>
          </li>
          <li class="nav-item ">
            <a class="nav-link" href="./user.html">
              <i class="material-icons">person</i>
              <p>User Profile</p>
            </a>
          </li>
          <li class="nav-item ">
            <a class="nav-link" href="./tables.html">
              <i class="material-icons">content_paste</i>
              <p>Table List</p>
            </a>
          </li>
          <li class="nav-item ">
            <a class="nav-link" href="./typography.html">
              <i class="material-icons">library_books</i>
              <p>Typography</p>
            </a>
          </li>
          <li class="nav-item ">
            <a class="nav-link" href="./icons.html">
              <i class="material-icons">bubble_chart</i>
              <p>Icons</p>
            </a>
          </li>
          <li class="nav-item ">
            <a class="nav-link" href="./map.html">
              <i class="material-icons">location_ons</i>
              <p>Maps</p>
            </a>
          </li>
          <li class="nav-item ">
            <a class="nav-link" href="./notifications.html">
              <i class="material-icons">notifications</i>
              <p>Notifications</p>
            </a>
          </li>
          <li class="nav-item ">
            <a class="nav-link" href="./rtl.html">
              <i class="material-icons">language</i>
              <p>RTL Support</p>
            </a>
          </li>
          <li class="nav-item active-pro ">
            <a class="nav-link" href="./upgrade.html">
              <i class="material-icons">unarchive</i>
              <p>Upgrade to PRO</p>
            </a>
          </li>
        </ul> */}
            
            <div className="sidebar-wrapper">
            <Navigation
                className="nav"
                // you can use your own router's api to get pathname
                activeItemId="/management"
                onSelect={({ itemId }) => {
                    // maybe push to the route
                      history.push(itemId); 
                }}
                items={[
                  {
                      title: `Dashboard`,
                      itemId: "/",
                      elemBefore: () => <i class="material-icons pl-2">dashboard</i>,
                  },                  
                  {
                    title: " Categories",
                    itemId: "/categories",
                    elemBefore: () => <i class="material-icons pl-2">library_books</i>,
                    subNav: [
                      {
                        title: "Add Categories",
                        itemId: "/add-category",
                      },
                      {
                        title: "View Categories",
                        itemId: "/view-category",
                      }, 
                    ],
                  },
                  {
                    title: "Location",
                    itemId: "/location",
                    elemBefore: () => <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.364 17.364L12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zM12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="rgba(255,255,255,1)"/></svg>,
                    subNav: [
                      {
                        title: "Add Location",
                        itemId: "/add-location",
                      },
                      {
                        title: "View Location",
                        itemId: "/view-location",
                      },
                    ],
                  },
                  {
                    title: "Workers",
                    itemId: "/workers",
                    elemBefore: () => <i class="material-icons pl-2">person</i>,
                    subNav: [
                      {
                        title: "View Workers",
                        itemId: "/view-workers",
                      },
                    ],
                  },
                  {
                    title: "Admin",
                    itemId: "/admin",
                    elemBefore: () => <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 14v8H4a8 8 0 0 1 8-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm2.595 5.812a3.51 3.51 0 0 1 0-1.623l-.992-.573 1-1.732.992.573A3.496 3.496 0 0 1 17 14.645V13.5h2v1.145c.532.158 1.012.44 1.405.812l.992-.573 1 1.732-.992.573a3.51 3.51 0 0 1 0 1.622l.992.573-1 1.732-.992-.573a3.496 3.496 0 0 1-1.405.812V22.5h-2v-1.145a3.496 3.496 0 0 1-1.405-.812l-.992.573-1-1.732.992-.572zM18 17a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" fill="rgba(247,249,251,1)"/></svg>,
                    subNav: [
                      {
                        title: "Add Admin",
                        itemId: "/add-admin",
                      },
                      {
                        title: "View Admin",
                        itemId: "/view-admins",
                      },
                    ], 
                  },
                  { 
                    title: "Others",
                    itemId: "/others",
                    elemBefore: () => <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M21 18v3h-2v-3h-2v-3h6v3h-2zM5 18v3H3v-3H1v-3h6v3H5zm6-12V3h2v3h2v3H9V6h2zm0 5h2v10h-2V11zm-8 2V3h2v10H3zm16 0V3h2v10h-2z" fill="rgba(255,255,255,1)"/></svg>,
                    subNav: [
                      {
                        title: "Join Team",
                        itemId: "/view-team",
                      },
                      {
                        title: "Contact List",
                        itemId: "/view-contact",
                      },
                    ], 
                  },
                ]}
              />

            </div>
      </div>
    </div>


  );
}

export default Sidebar;
