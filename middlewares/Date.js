exports.Date = (req, res, next) => {
    console.log('Task Manager 💼 ');
    console.log(new Date().toISOString().replace('T', ' ').slice(0, 19));
    next();
};
