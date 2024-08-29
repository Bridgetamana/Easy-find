import React, { useState, useEffect } from 'react';
import style from './style.module.scss';

// Function to fetch random user data from randomuser.me API
const fetchRandomUserData = async () => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=4');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching random user data:', error);
    return [];
  }
};

export default function CompanyTeam() {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    // Fetch random user data on component mount
    fetchRandomUserData().then((randomUsers) => {
      const teamMembersData = randomUsers.map((user) => {
        return {
          name: `${user.name.first} ${user.name.last}`,
          position: getRandomPosition(),
          image: user.picture.large,
        };
      });
      setTeamMembers(teamMembersData);
    });
  }, []);

  // Function to generate random team member position
  const getRandomPosition = () => {
    const positions = ['CEO', 'COO', 'CTO', 'Marketing Director'];
    return positions[Math.floor(Math.random() * positions.length)];
  };

  return (
    <section className={style.team__section}>
      <div className={style.section__header}>
        <h2 className={style.section__title}>Our Team</h2>
      </div>

      <div className={style.team__container}>
        {teamMembers.map((member, index) => (
          <div key={index} className={style.team__member}>
            <img
              src={member.image}
              alt={member.name}
              className={style.member__image}
            />
            <h3 className={style.member__name}>{member.name}</h3>
            <p className={style.member__position}>{member.position}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
