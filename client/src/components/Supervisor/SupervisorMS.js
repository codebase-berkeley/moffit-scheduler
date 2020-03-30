import React from "react";
import "./SupervisorCover.css";
import "./SidebarElement.css";
import "./SupervisorMS.css";
import "./SidebarElement.js";
import SidebarElement from "./SidebarElement";
import MSRenderer from "../MasterSchedule/MSRenderer";

export default function SupervisorMS(props) {
  return (
    <div class="everything">
      <div class="line"></div>
      <div className="top-bar">
        <div class="user-box">
          <div class="user-id">
            <div class="user-name">Bianca Lee</div>
            <div class="dropdown-arrow"></div>
            <div class="dropdown-menu">
              <ul>
                <li>View Profile</li>
                <li>Log Out</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="sidebar">
        <SidebarElement title="Master Schedule" />
        <SidebarElement title="Cover Requests" />
        <SidebarElement title="Employees" />
        <SidebarElement title="Schedule Requests" />
      </div>
      <div class="coverz">
        <MSRenderer />
      </div>
    </div>
  );
}