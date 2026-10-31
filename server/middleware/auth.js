const { clerkMiddleware, getAuth } = require("@clerk/express");
const { users } = require("@clerk/clerk-sdk-node");

// Verifies the Clerk session token sent as "Authorization: Bearer <token>"
// and attaches the signed-in Clerk user to req.clerkUser / req.userEmail.
const loadUser = async (req, res, next) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = await users.getUser(userId);
    const primaryEmail = user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    );
    req.clerkUser = user;
    req.userEmail = primaryEmail?.emailAddress;
    next();
  } catch (err) {
    console.error("Error loading Clerk user:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const checkAdmin = (req, res, next) => {
  const { role, college_id } = req.clerkUser.publicMetadata || {};
  if (role !== "admin" || !college_id) {
    return res
      .status(403)
      .json({ status: "Unauthorized", message: "You are not an Admin" });
  }
  req.college_id = college_id;
  next();
};

const requireUser = [clerkMiddleware(), loadUser];
const requireAdmin = [...requireUser, checkAdmin];

module.exports = { requireUser, requireAdmin };
