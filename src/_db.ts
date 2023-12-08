let users = [
    {
        id: "1", 
        name: "user1", 
        roles: [
            {
                id: "1"
            }
        ], 
        session: { sessionUID: "sessionID1"}
    },
    {
        id: "2", 
        name: "user2", 
        roles: [
            {
                id: "1"
            }
        ], 
        session: { "sessionUID": "sessionID2"}
    }
]

let sessions = [
    {
        sessionUID: "sessionID1",
        createdTime: 1,
        expirationTime: 2,
        user: {id:"1"}
    },    
    {
        sessionUID: "sessionID2",
        createdTime: 2,
        expirationTime: 3,
        user: {id:"2"}
    }
];

let roles = [
    {author: "author1",id: "1", title: "role1"},
    {author: "author2",id: "2", title: "role2"}
]
export default {users, sessions, roles};