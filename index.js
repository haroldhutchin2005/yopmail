const express = require('express');
const easyYOPmail = require('easy-yopmail');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/create', async (req, res) => {
    try {
        const mail = await easyYOPmail.getMail();
        console.log(mail);
        res.json({ email: mail });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/mes', async (req, res) => {
    const mailAddress = req.query.read;

    if (!mailAddress) {
        return res.status(400).json({ error: 'Email address is required' });
    }

    try {
        const inbox = await easyYOPmail.getInbox(mailAddress);
        console.log(inbox);
        res.json(inbox);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
