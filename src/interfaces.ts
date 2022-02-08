export interface TaskType {
    taskKey: string;
    title: string;
    description: string;
    type: string;
    assginees: [{
        userId: string;
        name: string
    }];
    reporter: {
        userId: string;
        name: string;
    },
    status: string;
    resolution: string;
    dateCreated: string;
    dateUpdated: string;
    dateDue: string;
    comments: [
        {
            content: string;
            taggedUsers: [
                { userId: string }
            ]
        }
    ];
    subtasks: [
        {
            columnName: string;
            tasks: [
                {
                    title: string;
                    description: string;
                }
            ]
        }
    ]
}

export type UserOptions = "Team Leader" | "Client" | "Developer"

export interface UserType {
    userId: string;
    name: string;
    username: string;
    role: UserOptions;
}

export interface ProjectType {
    _id: string;
    title: string;
    description: string;
    githubURL: string;
    tasks: [TaskType];
    users: [UserType];
}
