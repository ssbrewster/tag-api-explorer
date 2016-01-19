var router = require('express').Router(),
    mongoose = require('mongoose'),
    tagController = require('./controllers/tagController.js');

mongoose.Promise = global.Promise;

router.post('/tags', createTag);
router.get('/tags/:tagName', retrieveTag);
router.get('/current', retrieveAllTags);

function createTag(req, res) {
    if (!req.body) {
        throw new Error('Expected tag body instead got ' + req.body);
    }
    var tag = req.body;
    
    tagController.createTag(tag)
    .then(function(response) {
        res.status(200).end();
    })
    .catch(function(err) {
        console.log(JSON.stringify(err));
        res.send(err).end();
    });
}

function retrieveTag(req, res) {
    if (!req.params) {
        throw new Error('Expected a tag name but instead got ' + req.params);
    }

    var tagName = req.params.tagName;

    tagController.retrieveTag(tagName)
    .then(function(tag) {
        res.json(tag);
    })
    .catch(function(err) {
        res.send(err).end();
    });
}

function retrieveAllTags(req, res) {
    tagController.retrieveAllTags()
    .then(function(tags) {
        res.json(tags);
    })
    .catch(function(err) {
        res.send(err).end();
    });
}

module.exports = router;
