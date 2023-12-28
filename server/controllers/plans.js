import express from 'express';
import neo4j from 'neo4j-driver';
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'test1234'));

const session = driver.session();

const getAllPlans = () => {
  session
    .run("MATCH (p:Plan) RETURN p")
    .then((result) => {
      const plans = result.records.map((record) => {
        return {
          id: record._fields[0].identity.low,
          name: record._fields[0].properties.name,
          description: record._fields[0].properties.description,
        };
      });
      console.log(plans);
      return plans;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getPlanById = (id) => {
  session
  .run(`MATCH (p:Plan) WHERE id(p) = $id RETURN p`, { id: parseInt(id) })
  .then((result) => {
    const plan = {
      id: result.records[0]._fields[0].identity.low,
      name: result.records[0]._fields[0].properties.name,
      description: result.records[0]._fields[0].properties.description,
    };
    console.log(plan);
    return plan;
  })
  .catch((error) => {
    console.log(error);
  });
}

const deletePlan = (id) => {
  session
  .run(`MATCH (p:Plan) WHERE id(p) = $id DELETE p`, { id: parseInt(id) })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

}

const createPlan = (name, description) => {
  session
  .run(`CREATE (p:Plan {name: $name, description: $description}) RETURN p`, { name: name, description: description })
  .then((result) => {
      const plan = result.records.map((record) => {
        return {
          id: record._fields[0].identity.low,
          name: record._fields[0].properties.name,
          description: record._fields[0].properties.description,
        };
      });
      console.log(plan);
      return plan;
    })
  .catch((error) => {
    console.log(error);
  });
}

const updatePlan = (id, name, description) => {
  if (name === undefined) {
    session
    .run(`MATCH (p:Plan) WHERE id(p) = $id SET p.description = $description RETURN p`, { id: parseInt(id), description: description })
    .then((result) => {
      const plan = result.records.map((record) => {
        return {
          id: record._fields[0].identity.low,
          name: record._fields[0].properties.name,
          description: record._fields[0].properties.description,
        };
      });
      console.log(plan);
      return plan;
    })
    .catch((error) => {
      console.log(error);
    });
  } else if (description === undefined) {
    session
    .run(`MATCH (p:Plan) WHERE id(p) = $id SET p.name = $name RETURN p`, { id: parseInt(id), name: name })
    .then((result) => {
      const plan = result.records.map((record) => {
        return {
          id: record._fields[0].identity.low,
          name: record._fields[0].properties.name,
          description: record._fields[0].properties.description,
        };
      });
      console.log(plan);
      return plan;
    })
    .catch((error) => {
      console.log(error);
    });
  } else {
    session
    .run(`MATCH (p:Plan) WHERE id(p) = $id SET p.name = $name, p.description = $description RETURN p`, { id: parseInt(id), name: name, description: description })
    .then((result) => {
      const plan = result.records.map((record) => {
        return {
          id: record._fields[0].identity.low,
          name: record._fields[0].properties.name,
          description: record._fields[0].properties.description,
        };
      });
      console.log(plan);
      return plan;
    })
    .catch((error) => {
      console.log(error);
    });
  }
} 

export {
  getAllPlans,
  getPlanById,
  deletePlan,
  createPlan,
  updatePlan
};