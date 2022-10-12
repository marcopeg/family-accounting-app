import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_PROJECT = gql`
  query GetProjet($id: uuid!) {
    project: projects_by_pk(id: $id) {
      id
      title
      categories: projects_categories(order_by: { order: asc }) {
        id
        title
      }
      members: projects_users {
        user {
          id
          displayName
          avatarUrl
          email
        }
      }
      owner: user {
        id
        displayName
        avatarUrl
        email
      }
    }
  }
`;

export const useProject = () => {
  const { id } = useParams();
  const { loading, data, error } = useQuery(GET_PROJECT, {
    variables: { id }
  });

  if (loading || error) {
    return {
      projectId: id,
      loading,
      error,
      project: null,
      categories: [],
      members: []
    };
  }

  // Handle project not found:
  if (data && !data.project) {
    return {
      error: new Error("Project not found"),
      projectId: id,
      loading: false,
      project: null,
      categories: [],
      members: []
    };
  }

  return {
    projectId: id,
    loading: false,
    error: null,
    project: data.project,
    categories: data.project.categories,
    members: [
      data.project.owner,
      ...data.project.members.map(($) => $.user)
    ].map(($) => ({
      ...$,
      isOwner: $.id === data.project.owner.id
    }))
  };
};
