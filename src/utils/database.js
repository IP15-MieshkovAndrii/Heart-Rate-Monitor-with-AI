import gql from 'graphql-tag';

const GET_PROFILE = gql`
    query Profile {
        profile {
            id
            name
        }
    }
`;

const CREATE_PROFILE = gql`
    mutation ProfileCreate($input: ProfileCreateInput!) {
        profileCreate(input: $input) {
            id
            name
        }
    }
`;

const UPDATE_PROFILE = gql`
    mutation ProfileUpdate($id: ID!, $input: ProfileUpdateInput!) {
        profileUpdate(id: $id, input: $input) {
            id
            gender
            height
        }
    }
`;

const CREATE_PULSE_HISTORY = gql`
    mutation PulseHistoryCreate($input: PulseHistoryCreateInput!) {
        pulseHistoryCreate(input: $input) {
            id
            pulse
            createdAt
        }
    }
`;

const PULSE_HISTORY_QUERY = gql`
  query PulseHistory($limit: Int, $offset: Int) {
    pulseHistory(limit: $limit, offset: $offset) {
      items {
        id
        pulse
        createdAt
      }
      totalCount
    }
  }
`;

const PULSE_HISTORY_REMOVE = gql`
  mutation PulseHistoryRemove($id: ID!) {
    pulseHistoryRemove(id: $id) {
      success
    }
  }
`;

export {GET_PROFILE, CREATE_PROFILE, UPDATE_PROFILE, CREATE_PULSE_HISTORY, PULSE_HISTORY_QUERY, PULSE_HISTORY_REMOVE};