<div id="top">


# Rentx
<em></em>

<!-- BADGES -->
<!-- local repository, no metadata badges. -->

<em>Built with the tools and technologies:</em>

<img src="https://img.shields.io/badge/Express-000000.svg?style=flat-square&logo=Express&logoColor=white" alt="Express">
<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat-square&logo=JSON&logoColor=white" alt="JSON">
<img src="https://img.shields.io/badge/npm-CB3837.svg?style=flat-square&logo=npm&logoColor=white" alt="npm">
<img src="https://img.shields.io/badge/TypeORM-FE0803.svg?style=flat-square&logo=TypeORM&logoColor=white" alt="TypeORM">
<img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=flat-square&logo=Prettier&logoColor=black" alt="Prettier">
<img src="https://img.shields.io/badge/.ENV-ECD53F.svg?style=flat-square&logo=dotenv&logoColor=black" alt=".ENV">
<br>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat-square&logo=JavaScript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/Docker-2496ED.svg?style=flat-square&logo=Docker&logoColor=white" alt="Docker">
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat-square&logo=TypeScript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/tsnode-3178C6.svg?style=flat-square&logo=ts-node&logoColor=white" alt="tsnode">
<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat-square&logo=ESLint&logoColor=white" alt="ESLint">

<br clear="left"/>

## Table of Contents

- [Project Structure](#project-structure)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Testing](#testing)
- [Contributing](#contributing)

---

## Project Structure

```sh
Rentx/
│── diagrama.png
│── docker-compose.yml
│── Dockerfile
│── eslint.config.js
│── package.json
│── package-lock.json
│── README.md
│── routes.http
│── tsconfig.json
│── yarn.lock
│── tmp/
│
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── swagger.json
│   │
│   ├── database/
│   │   ├── index.ts
│   │   ├── migrations/
│   │   │   └── 1741526446282-CreateCategories.ts
│   │
│   ├── modules/
│   │   ├── cars/
│   │   │   ├── entities/
│   │   │   │   ├── Category.ts
│   │   │   │   ├── Specification.ts
│   │   │   │
│   │   │   ├── repositories/
│   │   │   │   ├── ICategoriesRepository.ts
│   │   │   │   ├── ISpecificationRepository.ts
│   │   │   │   ├── implementations/
│   │   │   │   │   ├── CategoriesRepository.ts
│   │   │   │   │   ├── SpecificationRepository.ts
│   │   │   │
│   │   │   ├── useCases/
│   │   │   │   ├── createCategory/
│   │   │   │   │   ├── CreateCategoryController.ts
│   │   │   │   │   ├── CreateCategoryUseCase.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │
│   │   │   │   ├── createSpecification/
│   │   │   │   │   ├── CreateSpecificationController.ts
│   │   │   │   │   ├── CreateSpecificationUseCase.ts
│   │   │   │   │
│   │   │   │   ├── importCategory/
│   │   │   │   │   ├── ImportCategoryController.ts
│   │   │   │   │   ├── ImportCategoryUseCase.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │
│   │   │   │   ├── listCategories/
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── ListCategoriesController.ts
│   │   │   │   │   ├── ListCategoriesUseCase.ts
│   │   │   │   │
│   │   │   │   ├── listSpecifications/
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── ListSpecificationsController.ts
│   │   │   │   │   ├── ListSpecificationsUseCase.ts
│
│   ├── routes/
│   │   ├── categories.routes.ts
│   │   ├── index.ts
│   │   ├── specification.routes.ts
│
│   ├── shared/
│   │   ├── container/
│   │   │   ├── index.ts


```

### Prerequisites

This project requires the following dependencies:

- **Programming Language:** TypeScript
- **Package Manager:** Npm
- **Container Runtime:** Docker

### Installation

Build cnwincienicnoen from the source and intsall dependencies:

1. **Clone the repository:**

    ```sh
    ❯ git clone ../Rentx
    ```

2. **Navigate to the project directory:**

    ```sh
    ❯ cd Rentx
    ```

3. **Install the dependencies:**

<!-- SHIELDS BADGE CURRENTLY DISABLED -->
	<!-- [![docker][docker-shield]][docker-link] -->
	<!-- REFERENCE LINKS -->
	<!-- [docker-shield]: https://img.shields.io/badge/Docker-2CA5E0.svg?style={badge_style}&logo=docker&logoColor=white -->
	<!-- [docker-link]: https://www.docker.com/ -->

	**Using [docker](https://www.docker.com/):**

	```sh
	❯ docker build -t Rentx/ .
	```
<!-- SHIELDS BADGE CURRENTLY DISABLED -->
	<!-- [![npm][npm-shield]][npm-link] -->
	<!-- REFERENCE LINKS -->
	<!-- [npm-shield]: https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white -->
	<!-- [npm-link]: https://www.npmjs.com/ -->

	**Using [npm](https://www.npmjs.com/):**

	```sh
	❯ npm install
	```

### Usage

Run the project with:

**Using [docker](https://www.docker.com/):**
```sh
docker run -it {image_name}
```
**Using [npm](https://www.npmjs.com/):**
```sh
npm start
```

### Testing

Cnwincienicnoen uses the {__test_framework__} test framework. Run the test suite with:

**Using [npm](https://www.npmjs.com/):**
```sh
npm test
```
## Contributing

- **💬 [Join the Discussions](https://LOCAL/Rentx/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://LOCAL/Rentx/issues)**: Submit bugs found or log feature requests for the `Rentx` project.
- **💡 [Submit Pull Requests](https://LOCAL/Rentx/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your LOCAL account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone /home/joao_victor/Projects/Learning/Web/Node/Rentx
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to LOCAL**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>
---
