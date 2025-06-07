import React from "react";

const teamMembers = [
  {
    name: "Ritesh More",
    role: "Full Stack Developer",
    avatar: "https://ui-avatars.com/api/?name=Ritesh+More&background=random",
    social: {
      github: "#",
      linkedin: "#",
      instagram: "#",
      leetcode: "#",
    },
  },
  {
    name: "Shivam Prajapati",
    role: "Full Stack Developer",
    avatar: "https://ui-avatars.com/api/?name=Shivam+Prajapati&background=random",
    social: {
      github: "#",
      linkedin: "#",
      instagram: "#",
      leetcode: "#",
    },
  },
  {
    name: "Rohit Singh",
    role: "Full Stack Developer",
    avatar: "https://ui-avatars.com/api/?name=Rohit+Singh&background=random",
    social: {
      github: "#",
      linkedin: "#",
      instagram: "#",
      leetcode: "#",
    },
  },
  {
    name: "Siddharth Surve",
    role: "Full Stack Developer",
    avatar: "https://ui-avatars.com/api/?name=Siddharth+Surve&background=random",
    social: {
      github: "#",
      linkedin: "#",
      instagram: "#",
      leetcode: "#",
    },
  },
];

function AboutUs() {
  return (
    <section className="text-gray-400  body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="text-2xl font-medium title-font mb-4 text-white tracking-widest">
            OUR TEAM
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            We are a group of passionate Full Stack Developers with a shared
            mission to build clean, efficient, and impactful web applications.
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="p-4 lg:w-1/2">
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img
                  alt={member.name}
                  className="flex-shrink-0 rounded-full w-32 h-32 object-cover object-center sm:mb-0 mb-4 bg-white p-1"
                  src={member.avatar}
                />
                <div className="flex-grow sm:pl-8">
                  <h2 className="title-font font-medium text-lg text-white">{member.name}</h2>
                  <h3 className="text-gray-500 mb-3">{member.role}</h3>
                  <p className="mb-4">Building seamless experiences and scalable apps across the stack.</p>
                  <span className="inline-flex space-x-3">
                    <a href={member.social.github} target="_blank" rel="noreferrer" className="text-gray-500">
                      <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M12 0.3a12 12 0 00-3.8 23.4c0.6 0.1 0.8-0.3 0.8-0.6v-2.2c-3.3 0.7-4-1.5-4-1.5a3.1 3.1 0 00-1.3-1.7c-1-0.7 0.1-0.7 0.1-0.7a2.5 2.5 0 011.8 1.2 2.6 2.6 0 003.5 1 2.7 2.7 0 01.8-1.7c-2.7-0.3-5.5-1.4-5.5-6.1a4.8 4.8 0 011.3-3.3 4.4 4.4 0 01.1-3.3s1-0.3 3.4 1.2a11.7 11.7 0 016.3 0c2.4-1.5 3.4-1.2 3.4-1.2a4.4 4.4 0 01.1 3.3 4.8 4.8 0 011.3 3.3c0 4.7-2.8 5.8-5.5 6.1a3 3 0 01.9 2.3v3.3c0 0.3 0.2 0.7 0.8 0.6A12 12 0 0012 0.3z" />
                      </svg>
                    </a>
                    <a href={member.social.linkedin} target="_blank" rel="noreferrer" className="text-gray-500">
                      <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M19 0h-14a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5v-14a5 5 0 00-5-5zm-11 19h-3v-9h3v9zm-1.5-10.3a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm13.5 10.3h-3v-4.8c0-1.1-0.4-1.8-1.4-1.8s-1.6 0.8-1.6 1.8v4.8h-3v-9h3v1.3a3.2 3.2 0 012.9-1.7c2.1 0 3.1 1.5 3.1 3.6v5.8z" />
                      </svg>
                    </a>
                    <a href={member.social.instagram} target="_blank" rel="noreferrer" className="text-gray-500">
                      <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M7 2C4.8 2 3 3.8 3 6v12c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4H7zm5 5.3a4.7 4.7 0 014.7 4.7A4.7 4.7 0 0112 16.7 4.7 4.7 0 017.3 12 4.7 4.7 0 0112 7.3zm0 7.6a2.9 2.9 0 100-5.8 2.9 2.9 0 000 5.8zm4.9-9.7a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2z" />
                      </svg>
                    </a>
                    <a href={member.social.leetcode} target="_blank" rel="noreferrer" className="text-gray-500">
                      <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 50 50">
                        <path d="M34.5,8L15.5,25l19,17L30,45L6,25L30,5L34.5,8z M36.5,30h9v-4h-9V30z"/>
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
