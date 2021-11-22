import React, { useState } from "react";
import CreateTask from "../modals/CreateTask";
import About from "./About";
import styles from "./ResponsiveSidemenu1.module.css";
import { Link } from "react-router-dom";
export const Responsivesidemenu1 = ({ createTask, notifications, missed }) => {
  const [modal, setModal] = useState(false);
  // const [taskList, setTaskList] = useState([]);
  const toggle = () => setModal(!modal);
  const saveTask = () => {
    createTask();
    setModal(false);
  };
  return (
    <div className={styles.mybody}>
      <div className={styles["main-menu"]}>
        <br />
        <br />
        <br />
        <br />
        <ul>
          <Link to="/MilestonesHome">
            <li className={styles["menu-item"]}>
              {" "}
              <a href="#">
                <i class="fas fa-home"></i> &nbsp; &nbsp;Home
              </a>
            </li>
          </Link>
          <Link to="/About">
            <li className={styles["menu-item"]}>
              {" "}
              <a href="#">
                <i className="fa fa-question-circle"></i>&nbsp;
                &nbsp;&nbsp;&nbsp;About
              </a>
            </li>
          </Link>
          <Link to="/Timeline">
            <li className={styles["menu-item"]}>
              <a href="#">
                <i class="fas fa-list-alt"></i>&nbsp; &nbsp;&nbsp;Achievements
              </a>
            </li>
          </Link>

          <li className={styles["menu-item"]} onClick={() => setModal(true)}>
            <a href="#">
              <i class="fas fa-pencil"></i>&nbsp; &nbsp;&nbsp;Create New
            </a>
          </li>
          <Link to="/Notifications">
            <li className={styles["menu-item"]}>
              <a href="#">
                <i class="fas fa-bell"></i>&nbsp; &nbsp;&nbsp;
                <span>Notifications ({notifications})</span>
              </a>
            </li>
          </Link>
          <Link to="/Missed">
            <li className={styles["menu-item"]}>
              <a href="#">
                <i class="fas fa-bell"></i>&nbsp; &nbsp;&nbsp;
                <span>Missed ({missed})</span>
              </a>
            </li>
          </Link>
        </ul>
      </div>
      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
    </div>
  );
};
