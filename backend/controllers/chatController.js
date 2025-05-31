const pool = require('../config/db');

// Create chat (group or direct)
exports.createChat = async (req, res) => {
  const { name, type, participants } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO chats (name, type) VALUES ($1, $2) RETURNING id',
      [name || null, type]
    );
    const chatId = result.rows[0].id;

    for (const userId of participants) {
      await pool.query(
        'INSERT INTO chat_participants (chat_id, user_id) VALUES ($1, $2)',
        [chatId, userId]
      );
    }

    res.status(201).json({ message: 'Chat created', chatId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user chats
exports.getUserChats = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(`
      SELECT c.id, c.name, c.type, c.created_at
      FROM chats c
      JOIN chat_participants cp ON c.id = cp.chat_id
      WHERE cp.user_id = $1
    `, [userId]);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Send message
exports.sendMessage = async (req, res) => {
  const { chatId, senderId, content, attachments } = req.body;

  try {
    const messageResult = await pool.query(
      'INSERT INTO messages (chat_id, sender_id, content) VALUES ($1, $2, $3) RETURNING id',
      [chatId, senderId, content]
    );

    const messageId = messageResult.rows[0].id;

    if (attachments && attachments.length > 0) {
      for (const fileUrl of attachments) {
        await pool.query(
          'INSERT INTO message_attachments (message_id, file_url) VALUES ($1, $2)',
          [messageId, fileUrl]
        );
      }
    }

    res.status(201).json({ message: 'Message sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get chat messages
exports.getChatMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await pool.query(`
      SELECT m.*, u.username
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.chat_id = $1
      ORDER BY m.created_at ASC
    `, [chatId]);

    res.json(messages.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
