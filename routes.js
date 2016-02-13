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
    .then(response => res.json(response).end())
    .catch(err => res.send(err).end());
}

function getOneTag(req, res) {
    if (!req.params) {
        throw new Error('Expected a tag name but instead got ' + req.params);
    }

    var tagName = req.params.tagName;

    tagController.getOneTag(tagName)
    .then(tag => res.json(tag.tags[0]))
    .catch(err => res.send(err).end());
}

function getAllTags(req, res) {
    tagController.getAllTags()
    .then(tags => res.json(tags))
    .catch(err => res.send(err).end());
}

module.exports = router;
