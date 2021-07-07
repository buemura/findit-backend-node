const customExpress = require("./config/customExpress");
const app = customExpress();
require("./config/redis");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
