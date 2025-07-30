import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

router.get("/google/callback", passport.authenticate("google", {
  failureRedirect: "/login",
  session: true
}), (req, res) => {
  res.redirect("http://localhost:5173/google-dashboard");
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out" });
  });
});

router.get("/current-user", (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

export default router;



// import express from "express";
// import passport from "passport";

// const router = express.Router();

// router.get("/auth/google", passport.authenticate("google", {
//   scope: ["profile", "email"]
// }));

// router.get("/google/callback", passport.authenticate("google", {
//   failureRedirect: "/login",
//   session: true
// }), (req, res) => {
//   res.redirect("http://localhost:5173/google-dashboard");
// });

// router.get("/logout", (req, res) => {
//   req.logout(() => {
//     res.clearCookie("connect.sid");
//     res.status(200).json({ message: "Logged out" });
//   });
// });

// router.get("/current-user", (req, res) => {
//   if (req.user) {
//     res.json({ user: req.user });
//   } else {
//     res.status(401).json({ message: "Not authenticated" });
//   }
// });

// export default router;
