const express = require('express');
const consolidate = require('consolidate');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const swig = require('swig');

const remote = require('electron').remote;
const { ipcRenderer } = require('electron')

var appExp = express();

const sequelize = new Sequelize('giullare', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});


appExp.use(bodyParser.urlencoded({ extended: true }));
appExp.engine('html', swig.renderFile);
appExp.set('view engine', 'html');
appExp.use(express.static('src'));

appExp.get('/', function(req, res) {
    res.render('index');
});
appExp.get('/info', function(req, res) {
    res.render('info');
});
appExp.post('/dashboard', function(req, res) {
    var id = req.body.id
    sequelize.query("SELECT * FROM totmess where(id= \'" + id + "\')", { type: sequelize.QueryTypes.SELECT })
        .then(totmess => {
            res.render('dashboard', { totmess: totmess[0] });
        });

});
appExp.get('/dashboard', function(req, res) {
    res.render('dashboard', { totmess: null });
})




var server = appExp.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});