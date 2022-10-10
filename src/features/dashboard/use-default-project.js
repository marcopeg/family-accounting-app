/**
 * It should find the default project from the list of available projects
 * and return its ID.
 *
 * If no projects are available, one project should be created with default values.
 *
 * If a project exists, but no defaults are available, the first project should be set
 * as default in the user's profile.
 */

import { useEffect, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_PROJECTS = gql`
  query GetAllProjectsWithDefault($userId: uuid!) {
    projects {
      id
      title
    }
    user(id: $userId) {
      defaultProject: metadata(path: "defaultProject")
    }
  }
`;

const SET_DEFAULT_PROJECT = gql`
  mutation SetDefaultProject($metadata: jsonb!, $userId: uuid!) {
    updateUser(pk_columns: { id: $userId }, _append: { metadata: $metadata }) {
      id
    }
  }
`;

const CREATE_DEFAULT_PROJECT = gql`
  mutation CreateDefaultProject($title: String!) {
    insert_projects_one(object: { title: $title }) {
      id
    }
  }
`;

export const useDefaultProject = (userId) => {
  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null
  });

  const projects = useQuery(GET_PROJECTS, {
    variables: { userId },
    skip: true
  });

  const [createDefaultProject] = useMutation(CREATE_DEFAULT_PROJECT);
  const [setDefaultProject] = useMutation(SET_DEFAULT_PROJECT);

  useEffect(() => {
    const loop = async () => {
      try {
        const { data } = await projects.refetch();

        // Create new project:
        if (!data.projects.length) {
          await createDefaultProject({
            variables: {
              title: "Personal Economy"
            }
          });

          loop();
          return;
        }

        // Set default project:
        const defaultProject = data.projects.find(
          (project) => project.id === data.user.defaultProject
        );
        if (!defaultProject) {
          await setDefaultProject({
            variables: {
              userId,
              metadata: {
                defaultProject: data.projects[0].id
              }
            }
          });

          loop();
          return;
        }

        // Exit the loop with the default project:
        setState({
          loading: false,
          data: defaultProject
        });
      } catch (error) {
        setState(($) => ({ ...$, loading: false, error }));
      }
    };

    loop();
  }, [createDefaultProject, setDefaultProject, projects, userId]);

  return state;
};
