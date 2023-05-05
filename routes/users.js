const router = require('express').Router();
const { response } = require('express');
const User = require('../models/User');

// Update user
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });

            res.status(200).json({
                message: 'Account updated successfully'
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json({
            message: 'You are not allowed to update this account'
        });
    }
});

// Delete user
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);

            res.status(200).json({
                message: 'Account has been deleted successfully'
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json({
            message: 'You can delete only your account'
        });
    }
});

// Get a user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Follow user
router.put('/:id/follow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ 
                    $push: { 
                        followers: req.body.userId 
                    } 
                });
                await currentUser.updateOne({
                    $push: {
                        followings: req.params.id
                    }
                });

                res.status(200).json({
                    message: 'You have successfully followed this user'
                });
            } else {
                return res.status(403).json({
                    message: 'You already followed this user'
                });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json({
            message: 'You can not follow yourself!'
        });
    }
});

// Unfollow user
router.put('/:id/unfollow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({
                    $pull: {
                        followers: req.body.userId
                    }
                });
                await currentUser.updateOne({
                    $pull: {
                        followings: req.params.id
                    }
                });

                res.status(200).json({
                    message: 'You have successfully unfollowed this user'
                });
            } else {
                res.status(403).json({
                    message: 'You dont follow this user'
                });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        return res.status(403).json({
            message: 'You can not unfollow yourself'
        });
    }
});

module.exports = router;