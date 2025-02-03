exports.receiveData = (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    res.status(200).json({ message: 'Data received successfully', data: req.body });
  };
  