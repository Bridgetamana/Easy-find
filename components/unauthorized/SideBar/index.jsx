import React, { useState, useEffect } from "react";
import { BsDot } from "react-icons/bs";
import { Posts} from "../BlogList/index"
import axios from "axios";
import styles from "./style.module.scss";
import Link from "next/link";



export default function Sidebar() {
  const [users, setUsers] = useState([]);
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://randomuser.me/api/?results=8"
        );
        const { results } = response.data;
        setUsers(results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const generatePostData = () => {
      setPostData(Posts);
    };

    generatePostData();
  }, []);

  return (
    <aside className={styles.sidebar__component}>
      <div className={styles.side__piece}>
        <div className={styles.side__piece_author}>
          <h3 className={styles.author__header}>Popular Companies</h3>
          <div className={styles.authors__list}>
            {users.map((user, idx) => {
              return (
                <div className={styles.author} key={idx}>
                  <img
                    src={user.picture.thumbnail}
                    alt="User"
                    className={styles.author__img}
                  />
                  <div className={styles.author__dets}>
                    <p className={styles.author__name}>{`${user.name.first} ${user.name.last}`}</p>
                    <p className={styles.author__about}>
                      Industry
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.side__piece_recents}>
          <h3 className={styles.recent__header}>Popular Posts</h3>
          <div className={styles.recent__list}>
            {postData.map((post, idx) => {
              if (idx < users.length) {
                const user = users[idx];
                return (
                  <div className={styles.recent} key={idx}>
                    <div className={styles.author__dets}>
                      <img
                        src={user.picture.thumbnail}
                        alt="User"
                        className={styles.author__img}
                      />
                      <p className={styles.author__names}>{`${user.name.first} ${user.name.last}`}</p>
                    </div>
                    <h3 className={styles.recent__topic}> {post.title} </h3>
                    <div className={styles.recent__date}>
                      <p className={styles.date}>{post.date_posted}, 2023</p>
                      <BsDot />
                      <p className={styles.recent__read}>{post.minutes} minutes</p>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
        <div className={styles.side__piece_cta}>
          <div className={styles.cta__container}>
            <h3 className={styles.cta__header}>Become a Member</h3>
            <p className={styles.cta__text}>...and enjoy all the great benefits</p>
            <button className={styles.cta__button}>
            <Link href={"/signup"}>
              Get started
            </Link>
              </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
