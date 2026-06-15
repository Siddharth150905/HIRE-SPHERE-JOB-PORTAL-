const sanitizeUser = (user) => {
  return {
    _id: user._id,

    name: user.name,

    email: user.email,

    role: user.role,

    isVerified: user.isVerified,

    profileImage: user.profileImage,

    skills: user.skills,

    experience: user.experience,

    education: user.education,

    github: user.github,

    linkedin: user.linkedin,

    portfolio: user.portfolio,

    company: user.company,

    resume:user.resume, 
  };
};

module.exports = sanitizeUser;