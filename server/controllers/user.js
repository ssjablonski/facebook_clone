import express from 'express';
import neo4j from 'neo4j-driver';
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'test1234'));

const session = driver.session();

const getAllUsers = () => {
  session
    .run("MATCH (u:User) RETURN u")
    .then((result) => {
      const user = result.records.map((record) => {
        return {
          id: record._fields[0].identity.low,
          username: record._fields[0].properties.username,
          password: record._fields[0].properties.password,
          friends: record._fields[0].properties.friends || [],
          plans: record._fields[0].properties.plans || [],
        };
      });
      console.log(JSON.stringify(user, null, 2));
      return user;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getUserById = (id) => {
    session
    .run(`MATCH (u:User) WHERE ID(u) = $id RETURN u`, { id: parseInt(id) })
    .then((result) => {
      const user = result.records.map((record) => {
        return {
          id: record._fields[0].identity.low,
          username: record._fields[0].properties.username,
          password: record._fields[0].properties.password,
          friends: record._fields[0].properties.friends || [],
          plans: record._fields[0].properties.plans || [],

        };
      });
      console.log(user);
      return user;
    })
    .catch((error) => {
        console.log(error);
    });
};

const deleteUser = (id, res) => {
    session
    .run(`MATCH (u:User) WHERE ID(u) = $id DETACH DELETE u`, { id: parseInt(id) })
    .catch((error) => {
        console.log(error);
    });
}

const createUser = (username, password) => {
    session
    .run(`CREATE (u:User {username: $username, password: $password}) RETURN u`, { username: username, password: password })
    .then((result) => {
      const user = result.records.map((record) => {
        return {
          id: record._fields[0].identity.low,
          username: record._fields[0].properties.username,
          password: record._fields[0].properties.password,
          friends: ["dummy"],
          plans: ["dummy"]
        };
      });
      console.log(user);
      return user;
    })
    .catch((error) => {
        console.log(error);
    });
}

const changePassword = (id, password) => {
    session
    .run(`MATCH (u:User) WHERE ID(u) = $id SET u.password = $password RETURN u`, { id: parseInt(id), password: password })
    .then((result) => {
      const user = result.records.map((record) => {
        return {
          id: record._fields[0].identity.low,
          username: record._fields[0].properties.username,
          password: record._fields[0].properties.password,
          friends: record._fields[0].properties.friends || [],
          plans: record._fields[0].properties.plans || [],
        };
      });
      console.log(user);
      return user;
    })
    .catch((error) => {
        console.log(error);
    });
}

const addFriend = (id, friendId) => {
    session
        .run(`
            MATCH (u:User), (f:User) 
            WHERE ID(u) = $id AND ID(f) = $friendId 
            CREATE (u)-[:FRIENDS_WITH]->(f), (f)-[:FRIENDS_WITH]->(u) 
            SET u.friends = coalesce(u.friends, []) + f.username, f.friends = coalesce(f.friends, []) + u.username
            RETURN u, f
        `, { id: parseInt(id), friendId: parseInt(friendId) })
        .then((result) => {
            const plans = result.records.map((record) => {
                const user = record.get('u');
                const friend = record.get('f');
                return {
                    user: {
                        id: user.identity.low,
                        username: user.properties.username,
                        password: user.properties.password,
                        friends: user.properties.friends || [],
                        plans: user.properties.plans || [],
                    },
                    friend: {
                        id: friend.identity.low,
                        username: friend.properties.username,
                        password: friend.properties.password,
                        friends: friend.properties.friends || [],
                        plans: friend.properties.plans || [],
                    }
                };
            });
            console.log(JSON.stringify(plans, null, 2));
            return plans;
        })
        .catch((error) => {
            console.log(error);
        });
}

const deleteFriend = (id, friendId) => {
    session
        .run(`
            MATCH (u:User)-[r:FRIENDS_WITH]-(f:User) 
            WHERE ID(u) = $id AND ID(f) = $friendId 
            SET u.friends = [name IN u.friends WHERE name <> f.username], 
                f.friends = [name IN f.friends WHERE name <> u.username]
            DELETE r
            RETURN u, f
        `, { id: parseInt(id), friendId: parseInt(friendId) })
        .then((result) => {
            const plans = result.records.map((record) => {
                const user = record.get('u');
                const friend = record.get('f');
                return {
                    user: {
                        id: user.identity.low,
                        username: user.properties.username,
                        password: user.properties.password,
                        friends: user.properties.friends || [],
                        plans: user.properties.plans || [],
                    },
                    friend: {
                        id: friend.identity.low,
                        username: friend.properties.username,
                        password: friend.properties.password,
                        friends: friend.properties.friends || [],
                        plans: friend.properties.plans || [],
                    }
                };
            });
            // console.log(plans);
            return plans;
        })
        .catch((error) => {
            console.log(error);
        });
}


export {
    getAllUsers,
    getUserById,
    deleteUser,
    createUser,
    changePassword,
    addFriend,
    deleteFriend
};