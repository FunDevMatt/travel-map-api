const {
    gql
} = require('apollo-server');
const PlaceVisited = require('../models').Place_visited;
const User = require('../models').User;
const PlaceVisitedService = require('../services/places_visited.service');

const typeDefs = gql `
    extend type Query {
        places_visited(id: Int, UserId: Int, country: String, countryId: Float, countryISO: String, city: String, cityId: Float, city_latitude: Float, city_longitude: Float): Place_visited!
    }

    extend type Mutation {
        addPlaceVisited(country: Country!, cities: [City!], desription: String, arrival_date: String, departing_date: String): [Place_visiting!]!
        removePlaceVisited(place_visited_id: Int!): Place_visited
    }

    type Place_visited {
        id: Int!
        UserId: Int!
        country: String!
        countryId: Float!
        countryISO: String!
        city: String
        cityId: Float
        city_latitude: Float
        city_longitude: Float
        arrival_date: String
        departing_date: String
    }

`


const resolvers = {
    Query: {
        places_visited: async (_, args) => {
            let places = await PlaceVisited.findAll({
                where: args
            })
            return places;
        }
    },
    Mutation: {
        addPlaceVisited: async (_, args, context) => {
            return await PlaceVisitedService.addPlaceVisited(context.user_id, args);
        },
        removePlaceVisited: async (_, {
            place_visited_id
        }, context) => {
            return await PlaceVisitedService.deletePlaceVisited(context.user_id, place_visited_id);
        }

    }
}

module.exports = {
    typeDefs,
    resolvers
}