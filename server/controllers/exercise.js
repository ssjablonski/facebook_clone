import express from 'express';
import neo4j from 'neo4j-driver';
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'test1234'));

const session = driver.session();

const getAllExercises = () => {
    session
        .run("MATCH (e:Exercise) RETURN e")
        .then((result) => {
        const exercises = result.records.map((record) => {
            return {
            id: record._fields[0].identity.low,
            name: record._fields[0].properties.name,
            muscleGroup: record._fields[0].properties.muscleGroup,
            description: record._fields[0].properties.description,
            };
        });
        console.log(exercises);
        return exercises;
        })
        .catch((error) => {
        console.log(error);
        });
}

const getExerciseById = (id) => {
    session
    .run(`MATCH (e:Exercise) WHERE id(e) = $id RETURN e`, { id: parseInt(id) })
    .then((result) => {
        const exercise = {
        id: result.records[0]._fields[0].identity.low,
        name: result.records[0]._fields[0].properties.name,
        muscleGroup: result.records[0]._fields[0].properties.muscleGroup,
        description: result.records[0]._fields[0].properties.description,
        };
        console.log(exercise);
        return exercise;
    })
    .catch((error) => {
        console.log(error);
    });
}

const deleteExercise = (id) => {
    session
    .run(`MATCH (e:Exercise) WHERE id(e) = $id DETACH DELETE e`, { id: parseInt(id) })
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });

}

const addExercise = (name, muscleGroup, description) => {
    session
    .run(`CREATE (e:Exercise {name: $name, muscleGroup: $muscleGroup, description: $description}) RETURN e`, { name: name, muscleGroup: muscleGroup, description: description })
    .then((result) => {
        const exercise = result.records.map((record) => {
        return {
            id: record._fields[0].identity.low,
            name: record._fields[0].properties.name,
            muscleGroup: record._fields[0].properties.muscleGroup,
            description: record._fields[0].properties.description,
        };
        });
        console.log(exercise);
        return exercise;
    })
    .catch((error) => {
        console.log(error);
    });
}

const updateExercise = (id, name, muscleGroup, description) => {
    session
    .run(`MATCH (e:Exercise) WHERE id(e) = $id SET e.name = $name, e.muscleGroup = $muscleGroup, e.description = $description RETURN e`, { id: parseInt(id), name: name, muscleGroup: muscleGroup, description: description })
    .then((result) => {
        const exercise = result.records.map((record) => {
        return {
            id: record._fields[0].identity.low,
            name: record._fields[0].properties.name,
            muscleGroup: record._fields[0].properties.muscleGroup,
            description: record._fields[0].properties.description,
        };
        });
        console.log(exercise);
        return exercise;
    })
    .catch((error) => {
        console.log(error);
    });
}



export {
    getAllExercises,
    getExerciseById,
    deleteExercise,
    addExercise,
    updateExercise
};