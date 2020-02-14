const User = require('.././models/users');
const mongoose = require('mongoose');
const DbTest = 'mongodb://localhost:27017/testdb';

beforeAll(async () => {
    await mongoose.connect(DbTest, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
})

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
})

describe('User Schema Test', () => {
    it('should be able to add new user', async () => {
        let user = await User.create({ 'fullName': "Pasanglakpa Sherpa" });
        expect(user.fullName).toMatch("Pasanglakpa Sherpa");
    })

    it('should be able to update user', async () => {
        let user = await User.findOne({
            'fullName': 'shyam kumar'
        });
        user.fullName = 'shyam kumar';

        let newUser = await user.save();
        expect(newUser.fullName).toBe('Lakpa Sherpa');
    })

    it("should delete the User", async () => {
        let user = await User.findOneAndDelete({
            'fullName': 'shyam kumar'
        })
            .then((response) => {
                expect(response.fullName).toBe('shyam kumar')
            })
    })
})