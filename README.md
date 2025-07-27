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

**FR**  
- It must be possible to register a new car.

**BR**  
- It must not be possible to register a car with a license plate that already exists.  
- A new car must be registered as available by default.  
- Only admin users can register new cars.

---

## Car Listing

**FR**  
- It must be possible to list all available cars.  
- It must be possible to filter available cars by category.  
- It must be possible to filter available cars by name.  
- It must be possible to filter available cars by brand.

**BR**  
- The user does not need to be authenticated to view available cars.

---

## Car Specification Registration

**FR**  
- It must be possible to register a specification to a car.  
- It must be possible to list all specifications.  
- It must be possible to list all cars.

**BR**  
- It must not be possible to register a specification for a non-existent car.  
- It must not be possible to register a specification that already exists for the same car.  
- Only admin users can register specifications.

---

## Car Images Upload

**FR**  
- It must be possible to upload images for a car.  
- It must be possible to list all cars.

**BR**  
- It must be possible to upload multiple images for the same car.  
- Only admin users can upload car images.
- Multer must be used for file upload.

---

## Rental

**FR**  
- It must be possible to create a new rental.

**BR**  
- A rental cannot be created if there is already one open for the same user.  
- A rental cannot be created if the car is already rented.  
- The user must be logged in the application.
- The rental must have at least 24 hours as duration.
- Upon created, the car status must be changed to unavailable

---

## Car Return

**FR**  
- It must be possible to return a car.

**BR**  
- If the car is returned in less than 24 hours, the full daily rate will be charged.  
- Upon return, the car must be available for another rental.  
- Upon return, the user must be available for another rental.  
- Upon return, the total rental cost must be calculated.  
- If the return time exceeds the expected time, a fine proportional to the delay must be charged.  
- If there is a fine, it must be added to the total rental amount.
- The user must be logged in the application.

---

## Rental Listing

**FR**
- It must be possible to list all rentals for the user

**BR**
- The user must be logged in the application

---

## Recover Password

**FR**
- It must be possible the user recover his password informing his email
- The user must receive an email with the step-by-step to recover his password
- The user should be able to insert a new password

**BR**
- The user needs inform the new password
- The link send to recover the password must expire in 3hours
