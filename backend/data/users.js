import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('test', 10),
        isAdmin: true
    },
    {
        name: 'テストユーザー',
        email: 'test@test.com',
        password: bcrypt.hashSync('test', 10),
    },
    {
        name: 'テストユーザー2',
        email: 'test2@test.com',
        password: bcrypt.hashSync('test', 10),
    },
]

export default users