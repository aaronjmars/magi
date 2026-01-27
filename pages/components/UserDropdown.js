import React, { useState } from "react";
import styles from "./UserDropdown.module.css";
import Image from "next/image";
import { track } from "@vercel/analytics";

const UserDropdown = ({ user, instance, onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  if (!user || !user.pfpUrl || !user.displayName) {
    return null;
  }

  return (
    <div className={styles.dropdown}>
      <button
        onClick={() => {
          track("ToggleDropdown", { username: user.username });
          toggleDropdown();
        }}
        data-umami-event="toggle-dropdown"
        className={styles.button}
      >
        <div className={styles.userProfile}>
          <Image
            src={user.pfpUrl}
            alt={user.displayName}
            className={styles.userImage}
            width={50}
            height={50}
          />
          <div className={styles.userName}>{user.displayName}</div>
        </div>
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          <div className={styles.points}>
            Points: soon...
            <span className={styles.tooltip}>
              {instance === "farcaster"
                ? `Recast memes you like on /memes to earn points.`
                : `Recast memes you like on /${instance} to earn points.`}
            </span>
          </div>
          <button
            onClick={() => {
              onSignOut();
            }}
            data-umami-event="fc-logout"
            className={styles.signOutButton}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
