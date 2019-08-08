module.exports = {
    async getEntries(req, res) {
        let { writerId } = req.params; 
        const db = req.app.get('db'); 
        let entries = await db.get_entries_by_user(+writerId); 
        res.send(entries); 
    }, 
    async deleteEntry(req, res) {
        let { entryId } = req.params;
        const db = req.app.get('db');
        let entries = await db.delete_entry([+entryId, req.session.writer.id]);
        console.log(entries);
        res.send(entries);
      },
      async editEntry(req, res) {
        let { entryId } = req.params;
        let { newTitle, newContent } = req.body;
        const db = req.app.get('db');
        let entry = await db.edit_entry([
          +entryId,
          newTitle,
          newContent,
          req.session.user.id
        ]);
        res.send(entry);
      },
      async saveEntry(req, res) {
        let { title, content } = req.body;
        const db = req.app.get('db');
        let entries = await db.save_entry([title, content, req.session.writer.id]);
        res.send(entries);
      }
    };