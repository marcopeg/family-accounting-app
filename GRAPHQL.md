t1: 7b0a141c-033a-4374-9558-c68cad0aff07
t2: dee5a90c-1c1e-430f-a6ef-b65db686a5cc



Create new project

```gql
mutation MyMutation($title: String = "project2") {
  insert_projects_one(object: {title: $title}) {
    created_at
    created_by
    id
    meta
    title
    updated_at
  }
}
```

Insert project-user relationship

```gql
mutation AddRelation (
  $project_id: uuid = "3a5f0531-1218-4045-a2e8-cd6a85d72b52", 
  $user_id: uuid = "dee5a90c-1c1e-430f-a6ef-b65db686a5cc"
) {
  insert_projects_users_one(object: {project_id: $project_id, user_id: $user_id}) {
    created_at
    meta
    project_id
    updated_at
    user_id
  }
}
```

get all projects

```gql
query GetAllProjects {
  projects {
    created_at
    created_by
    id
    meta
    title
    updated_at
    user {
      displayName
      avatarUrl
    }
    projects_users {
      user {
        displayName
        avatarUrl
      }
    }
  }
}
```