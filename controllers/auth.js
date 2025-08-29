// routers decide WHERE to go, and controllers decide WHAT to do
const register = async (req, res) => {
  res.send("register user");
};

const login = async (req, res) => {
  res.send("login user");
};

module.exports = { register, login };
