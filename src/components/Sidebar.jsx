import React from "react";
import { Navigation } from "react-minimal-side-navigation";
// import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { useHistory, Switch, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SidebarImg from "./../assets/img/sidebar-1.jpg";

function Sidebar() {
  const history = useHistory();
  const name = useSelector(state => state.user.user.name);


  return (
    <div className="sidebar">

    <div class="sidebar" data-color="purple" data-background-color="white" data-image={SidebarImg} >
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
                    elemBefore: () => <i class="material-icons pl-2">library_books</i>,
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
                    elemBefore: () => <i class="material-icons pl-2">person</i>,
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
                ]}
              />

            </div>
      </div>
    </div>


  );
}

export default Sidebar;
