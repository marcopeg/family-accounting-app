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
    }
  }
`;

export const useProject = () => {
  const { id } = useParams();
  const { loading, data, ...getProject } = useQuery(GET_PROJECT, {
    variables: { id }
  });

  // Handle project not found:
  if (data && !data.project) {
    return {
      projectId: id,
      loading: false,
      project: null,
      categories: [],
      error: new Error("Project not found")
    };
  }

  return {
    projectId: id,
    loading,
    project: data ? data.project : null,
    categories: data ? data.project.categories : [],
    error: getProject.error
  };
};
