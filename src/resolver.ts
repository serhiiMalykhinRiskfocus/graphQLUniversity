
import db from './_db.js';
// import {Role} from './schema.js';


export const resolvers = {
    Query: {
        sessions() {
            return db.sessions
        },        
        users() {
            return db.users
        },        
        roles() {
            return db.roles
        }
    },
    Session: {
        user(parent) {
            // console.log("session users", parent);
            return db.users.find((u) => u.id === parent.user.id);
        }
    },
    User: {
        roles(parent) {
            // console.log("user roles", parent);
            return parent.roles.map((role)=>{
                return db.roles.find((r) => r.id === role.id)
            })
            .filter((r) => r);
        },
        session(parent) {
            return db.sessions.find((r) => r.sessionUID === parent.session.sessionUID)
        }
    },
    Mutation: {
        createRole(_, args) {
            // console.log('createRole:', args);
            let role = {
                ...args.role,
                id: Math.floor(Math.random() * 10000)
            }
            db.roles.push(role);
            return db.roles
        },
        editRole(_, args) {
            // console.log('editRole:', args);
            db.roles = db.roles.map((r) => {
                if (r.id === args.id) {
                    var newRole = {...r, ...args.role};
                    return newRole;
                }
                return r
            });
            return db.roles;
        },
        
        deleteRole(_, args) {
            // console.log('deleteRole:', args);
            db.roles = db.roles.filter((r) => r.id !== args.id);
            return db.roles;
        },
        
        deleteSession(_, args) {
            console.log('deleteSession:', args);
            db.sessions = db.sessions.filter((r) => {
                console.log(`${typeof r.sessionUID} !== ${typeof args.sessionUID}`)
                return r.sessionUID !== args.sessionUID
            });
            return db.sessions;
        },

        editUser(_, args) {
            // console.log('editUser:', args);
            db.users = db.users.map((u) => {
                if (u.id === args.id) {
                    var newUser = {...u, ...args.user};
                    return newUser
                }
                return u
            });
            return db.users;
        },       

        createSessionsWithUsers: (_, { sessionAndUser }) => {
            console.log('createSessionsWithUsers:', sessionAndUser);
      
            const { session, user } = sessionAndUser;
            const userID = Math.floor(Math.random() * 1000);
      
            // Create a new session with updated properties
            const newSession = {
              ...session,
              createdTime: getEpochDays(),
              expirationTime: getEpochDays() + 1,
              sessionUID: generateSessionUID(),
              user: { id: userID },
            };
      
            console.log('newSession', newSession);
      
            // Map role IDs to actual roles from the database
            const newRoles = user.roles
            .map((roleInput) => {
              return db.roles.find((r) => r.id === roleInput.id);
            })
            .filter((v) => v);
      
            console.log('newRoles', newRoles);
      
            // Create a new user with updated properties
            const newUser = {
              ...user,
              id: userID,
              roles: newRoles,
              session: newSession,
            };
      
            console.log('newUser', newUser);
      
            // Push the new session and user to the database
            db.sessions.push(newSession);
            db.users.push(newUser);
      
            // Return the updated sessions array
            return db.sessions;
          },
        },
};

function generateSessionUID() {
    return Math.random().toString(36).substr(2, 9);
  }
  
  function getEpochDays() {
    return Math.floor(Date.now() / (24 * 60 * 60 * 1000));
  }