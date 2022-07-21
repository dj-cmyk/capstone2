// const SECRET_KEY = process.env.SECRET_KEY || "secretsssss";

const PORT = +process.env.PORT || 3001;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
      ? "dance_plan_it_test"
      : process.env.DATABASE_URL || "dance_plan_it";
}


module.exports = {
  // SECRET_KEY,
  PORT,
  getDatabaseUri,
};
