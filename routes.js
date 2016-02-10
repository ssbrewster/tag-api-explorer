var router = require('express').Router(),
    mongoose = require('mongoose'),
    tagController = require('./controllers/tagController.js');

mongoose.Promise = global.Promise;

router.post('/tags', createTag);
router.get('/tags/:tagName', getOneTag);
router.get('/current', getAllTags);

function createTag(req, res) {
    if (!req.body) {
        throw new Error('Expected tag body instead got ' + req.body);
    }
    var tag = req.body;
    
    tagController.createTag(tag)
    .then(function(response) {
        res.json(response).end();
    })
    .catch(function(err) {
        console.log(err);
        res.send(err).end();
    });
}

function getOneTag(req, res) {
    if (!req.params) {
        throw new Error('Expected a tag name but instead got ' + req.params);
    }

    var tagName = req.params.tagName;

    tagController.getOneTag(tagName)
    .then(function(tag) {
        res.json(tag.tags[0]);
    })
    .catch(function(err) {
        res.send(err).end();
    });
}

function getAllTags(req, res) {
    tagController.getAllTags()
    .then(function(tags) {
        res.json(tags);
    })
    .catch(function(err) {
        res.send(err).end();
    });
}

module.exports = router;
