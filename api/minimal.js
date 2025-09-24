module.exports = (req, res) => {
  res.json({
    message: 'Minimal JS function works',
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString()
  });
};
