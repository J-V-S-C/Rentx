<div id="top">

# Rentx

<em>Car project:</em>

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

---

## Table of Contents

- [Car Registration](#car-registration)
- [Car Listing](#car-listing)

---

## Car Registration

### Functional Requirements (FR)

- ✅ FR01 - It should be possible to register a new car.
- ❌ FR02 - It should **not** be possible to register a car with an already registered license plate.
- 🔒 FR03 - The license plate of a registered car **must not be editable**.
- 🚗 FR04 - A newly registered car must be set as **available** by default.
- 👤 FR05 - Only **admin users** can register new cars.

### Non-Functional Requirements (NFR)

- 🔐 NFR01 - The car registration endpoint must validate admin privileges using JWT authentication.
- ⏱️ NFR02 - The operation should complete within 1 second under normal conditions.

---

## Car Listing

### Functional Requirements (FR)

- ✅ FR06 - It should be possible to list all **available** cars.
- 🔍 FR07 - The list should support filters by:
  - **Brand**
  - **Name**
  - **Category**

### Non-Functional Requirements (NFR)

- 📦 NFR03 - The response should include the following fields for each car:
  - `name`
  - `description`
  - `daily_rate`
  - `license_plate`
  - `brand`
  - `category_id`
  - `available`
  - `created_at`
- 🚫 NFR04 - Cars marked as unavailable must not be returned in the listing.
- ⚡ NFR05 - The listing should support pagination for scalability.
