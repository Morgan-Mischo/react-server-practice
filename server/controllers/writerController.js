const bcrypt = require('bcrypt');
const saltRounds = 12;

module.exports = {
  async login(req, res) {
    let { username, password } = req.body;
    const db = req.app.get('db');
    let [existingWriter] = await db.get_writer_by_username(username);
    if (!existingWriter) return res.status(401).send('Username not found');
    let result = await bcrypt.compare(password, existingWriter.password);
    if (result) {
      req.session.writer = {
        username: existingWriter.username,
        id: existingWriter.id,
        loggedIn: true
      };
      res.send(req.session.writer);
    } else res.status(401).send('Username or password incorrect');
  },
  async signup(req, res) {
    let { username, password } = req.body;
    const db = req.app.get('db');
    let [existingWriter] = await db.get_writer_by_username(username);
    if (existingWriter) return res.status(400).send('Username exists already');
    let salt = await bcrypt.genSalt(saltRounds);
    let hash = await bcrypt.hash(password, salt);
    let [writer] = await db.create_writer([username, hash]);
    req.session.user = { username: writer.username, id: writer.id, loggedIn: true };
    res.send(req.session.user);
  },
  logout(req, res) {
    req.session.destroy();
    res.sendStatus(200);
  },
  getUser(req, res) {
    res.send(req.session.writer);
  }
};