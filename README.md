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
- [Car Specification Registration](#car-specification-registration)
- [Car Images Upload](#car-images-upload)
- [Rental](#rental)

---

## Car Registration

### Functional Requirements (FR)

- ✅ FR01 - It must be possible to register a new car.
- ✅ FR02 - It must be possible to list all car categories.

### Business Rules (BR)

- ❌ BR01 - It must not be possible to register a car with a license plate that already exists.
- 🔒 BR02 - The license plate of a registered car cannot be changed.
- 🚗 BR03 - A new car must be registered as available by default.
- 👤 BR04 - Only admin users can register new cars.

---

## Car Listing

### Functional Requirements (FR)

- ✅ FR03 - It must be possible to list all available cars.
- ✅ FR04 - It must be possible to filter available cars by category.
- ✅ FR05 - It must be possible to filter available cars by name.
- ✅ FR06 - It must be possible to filter available cars by brand.

### Business Rules (BR)

- 👤 BR05 - The user does not need to be authenticated to view available cars.

---

## Car Specification Registration

### Functional Requirements (FR)

- ✅ FR07 - It must be possible to register a specification to a car.
- ✅ FR08 - It must be possible to list all specifications.
- ✅ FR09 - It must be possible to list all cars.

### Business Rules (BR)

- ❌ BR06 - It must not be possible to register a specification for a non-existent car.
- ❌ BR07 - It must not be possible to register a specification that already exists for the same car.
- 👤 BR08 - Only admin users can register specifications.

---

## Car Images Upload

### Functional Requirements (FR)

- ✅ FR10 - It must be possible to upload images for a car.
- ✅ FR11 - It must be possible to list all cars.

### Non-Functional Requirements (NFR)

- 📦 NFR01 - Multer must be used for file upload.

### Business Rules (BR)

- ✅ BR09 - It must be possible to upload multiple images for the same car.
- 👤 BR10 - Only admin users can upload car images.

---

## Rental

### Functional Requirements (FR)

- ✅ FR12 - It must be possible to create a new rental.

### Business Rules (BR)

- ❌ BR11 - A rental cannot be created if there is already one open for the same user.
- ❌ BR12 - A rental cannot be created if the car is already rented.
