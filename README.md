# Introduction

TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project.

# Getting Started

TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:

1. Installation process
2. Software dependencies
3. Latest releases
4. API references

# Build and Test

```
# Install dependencies
npm install
```

```
# Run the development with (starts server and client on specified localhost ports):
npm run
```

# Testing

This project uses Cypress for end-to-end (E2E) testing.

Test Structure:

- cypress/e2e/api/ – contains API tests (e.g. /get)

- cypress/e2e/ui/ – contains UI tests (e.g. dashboard table rendering)

# Chat Functionality

This project includes real-time chat functionality implemented with Socket.IO. Users can interact with the chat by passing query parameters to specify the user identity when accessing the application:

Access the chat as Admin:

```http://localhost:3000/?user=1```

Access the chat as default user Jane Doe:

```http://localhost:3000/?user=2```

The user ID parameter sets the chat identity, ensuring messages are correctly routed and displayed according to the user identity specified.

# Kanban Functionality

The application includes a fully interactive Kanban board that supports:

- Drag-and-drop functionality: Tasks can be freely moved between columns using intuitive drag-and-drop interactions (powered by @hello-pangea/dnd).

- Persistent state: The board state is saved locally using localStorage, ensuring that changes remain across sessions.

- Pre-filled data: The board is initialized with predefined columns and tasks, giving users a starting point.

- Task creation: Users can add new tasks inline using the input field in each column.

- Non-deletable columns: Board columns are fixed and cannot be removed, ensuring consistent structure.

To start using the Kanban board, simply navigate to the board route in the frontend interface.

# Contribute

TODO: Explain how other users and developers can contribute to make your code better.

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:

- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)

-
