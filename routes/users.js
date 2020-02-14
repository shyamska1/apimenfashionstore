const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/users');
const auth = require('../routes/auth');

router.post('/register', (req, res, next) => {
    if(req.body.password == null){
        res.send(400).send("password is required");
    }else{
        bcrypt.hash(req.body.password,10,(error,hash)=>{
            if(error){
                res.status(500).send(error)
            }else{
                user = {
                    fullname:req.body.fullName,
                    email: req.body.email,
                    username : req.body.username,
                    address:req.body.address,
                    phonenumber:req.body.phonenumber,
                    password : hash,
                    CnfPassword:hash
                }
                User.create(user).then((cuser)=>{
                    res.send(cuser);
                }).catch(next);
            }
        })
    }
    // console.log({data: req.body.username})
    // bcyrpt.has//req.body.password

    // req.body.password = createdhash

    // user = {
    //     fullName = req.body.fullName,
    //     username = req.body.username
    //     password = generatedhash
    // }

    // User.find();
    // User.findOne({username:"username"})

    // User.create(req.body).then((user)={


    // }).catch((error)=>{
    //     res.status(500).send(error);
    // })
    // User.findOne({ username: req.body.username })
    //     .then((user) => {
    //         res.send(user);
    //         if (user != null) {
    //             let err = new Error('Username already exists!');
    //             err.status = 401;
    //             return next(err);
    //         }

            // bcrypt.hash(req.body.password, 10, function (err, hash) {
            //     if (err) {
            //         throw new Error('Could not encrypt password!');
            //     }
            //     User.create({
            //         fullname: req.body.fullname,
            //         email: req.body.email,
            //         address: req.body.address,
            //         username: req.body.username,
            //         phonenumber:req.body.phonenumber,
            //         password: hash,
            //         cnfpassword:hash
            //     }).then((user) => {
            //         let token = jwt.sign({ userId: user._id }, process.env.SECRET);
            //         res.json({ status: "Regiset Successfully!", token: token });
            //     }).catch(next);
            // });
        // });
});

router.post('/login', (req, res, next) => {
    console.log({data:req.body.username});
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user === null) {
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            }
            bcrypt.compare(req.body.password, user.password, function (err, status) {
                if (!status) {
                    let err = new Error('Password does not match!');
                    err.status = 401;
                    return next(err);
                }
                let token = jwt.sign({ userId: user._id }, process.env.SECRET);
                res.json({ status: 'Login Successful!', token: token });
            });
        }).catch(next);
});

router.get('/me', auth.verifyUser, (req, res, next) => {
    // res.json({ username: req.user.username, firstName: req.user.firstName, lastName: req.user.lastName });
    res.json(req.user);
});
router.put('/me', auth.verifyUser, (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
        .then((user) => {
            res.json({ fullname: user.fullname, email: user.email, address: user.address, phonenumber: user.phonenumber,username:user.username,password:user.password,cnfpassword:user.cnfpassword });
        })
});
// router.delete('/me', auth.verifyUser, (req, res, next) => {
//     User.findByIdAndDelete(req.user._id)
//         .then((user) => {
//             res.json({ status: 'User deleted!', user: user })
//         }).catch(next);
// });
// router.delete('/:userId', auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
//     User.findByIdAndDelete(req.params.userId)
//         .then((user) => {
//             res.json({ status: 'User deleted!', user: user });
//         }).catch(next);
// });
// router.get('/all', auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
//     User.find()
//         .then((users) => {
//             res.json(users);
//         }).catch(next);
// });
module.exports = router;