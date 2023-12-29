import express from 'express';
import neo4j from 'neo4j-driver';
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'test1234'));

const session = driver.session();

const addExcerciseToPlan = (planId, excerciseId) => {
    session
        .run(`MATCH (p:Plan), (e:Exercise)
            WHERE id(p) = $planId AND id(e) = $excerciseId
            CREATE (p)-[r:CONTAINS]->(e)
            RETURN p, e
            `, { planId: parseInt(planId), excerciseId: parseInt(excerciseId) })
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        });
}

const removeExcerciseFromPlan = (planId, excerciseId) => {
    session
        .run(`MATCH (p:Plan)-[r:CONTAINS]->(e:Exercise) WHERE id(p) = $planId AND id(e) = $excerciseId 
                DELETE r
                RETURN p`, { planId: parseInt(planId), excerciseId: parseInt(excerciseId) })
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        });
}

const createSession = (planId) => {
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    session
        .run(`MATCH (p:Plan) WHERE id(p) = $planId CREATE (s:Session {date: date($today)})-[:FOR]->(p) RETURN s`, { planId: parseInt(planId), today: dateString })
        .then((result) => {
            const plan = result.records.map((record) => {
                return {
                id: record._fields[0].identity.low,
                date: record._fields[0].properties.date
                };
        });
      console.log(plan);
        })
        .catch((error) => {
            console.log(error);
        });
}

const deleteSession = (sessionId) => {
    session
        .run(`MATCH (s:Session) WHERE id(s) = $sessionId DETACH DELETE s`, { sessionId: parseInt(sessionId) })
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        });
}


const addSetToExcercise = (sessionId, excerciseId, weight, reps) => {
    session
        .run(`MATCH (e:Exercise), (ss:Session)
            WHERE ID(e) = $excerciseId AND ID(ss) = $sessionId
            CREATE (s:Set)-[:OF]->(e)
            SET s.weight = $weight, s.reps = $reps
            CREATE (s)-[:DID_ON]->(ss)
            RETURN s
            `, { sessionId: parseInt(sessionId), excerciseId: parseInt(excerciseId),  weight: parseInt(weight), reps: parseInt(reps) })
        
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        });
}

const deleteSetFromExcercise = (setId) => {
    session
        .run(`MATCH (s:Set) WHERE id(s) = $setId DETACH DELETE s`, { setId: parseInt(setId) })
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        });
}




export {
    addExcerciseToPlan,
    removeExcerciseFromPlan,
    createSession,
    deleteSession,
    addSetToExcercise,
    deleteSetFromExcercise

}