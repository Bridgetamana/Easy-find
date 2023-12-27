import React, { useState, useEffect } from 'react';
import './style.scss';

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
    <section className="team__section">
      <div className="section__header">
        <h2 className="section__title">Our Team</h2>
      </div>

      <div className="team__container">
        {teamMembers.map((member, index) => (
          <div key={index} className="team__member">
            <img src={member.image} alt={member.name} className="member__image" />
            <h3 className="member__name">{member.name}</h3>
            <p className="member__position">{member.position}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
