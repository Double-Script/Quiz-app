
---

# Quiz App

A full-stack Quiz application built with **Spring Boot** (backend), **React + Vite** (frontend), and **MySQL** (database). The application is fully Dockerized using **Docker Compose**.

---

## Features

* Take quizzes with one question displayed at a time
* Timer per quiz (1 minute per question)
* Submit answers and get dynamic scoring
* Session-based tracking for each quiz attempt
* REST API backend with Spring Boot
* Frontend with React + Vite
* Database persistence using MySQL

> Note: CRUD operations for quizzes and questions were initially included but removed to match project requirements. The focus is on quiz attempts and scoring.

---

## Project Structure

```

Quiz-App/
├── backend/          # Spring Boot project
│   ├── Dockerfile
│   └── target/Quiz-App-1-0.0.1-SNAPSHOT.jar
├── frontend/         # React + Vite project
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md

````

---

## Prerequisites

* Docker >= 24
* Docker Compose >= 2.20
* (Optional) Postman or a browser for testing APIs

---

## Docker Setup

The project uses **three services**:

1. **db** → MySQL database
2. **backend** → Spring Boot API
3. **frontend** → React + Vite application

---

## Step 1: Clone the project

```bash
git clone https://github.com/<your-username>/quiz-app.git
cd quiz-app
````

---

## Step 2: Docker Compose Build & Up

Run the following command from the root project folder:

```bash
docker-compose up --build
```

* This will build **backend** and **frontend** images and start all three services.
* The first time may take a few minutes.

---

## Step 3: Access the services

| Service          | URL                                                                            | Notes                                                  |
| ---------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------ |
| Frontend         | [http://localhost:5173](http://localhost:5173)                                 | React app                                              |
| Backend API      | [http://localhost:8080/quiz/getallquiz](http://localhost:8080/quiz/getallquiz) | Spring Boot REST API                                   |
| Database (MySQL) | 127.0.0.1:3306                                                                 | Use MySQL client/Postman; root password = `Veeruved18` |

---

## Step 4: React Frontend API Configuration

* Frontend communicates with backend via environment variable:

```env
# frontend/.env
VITE_API_URL=http://localhost:8080
```

* In code:

```js
fetch(`${import.meta.env.VITE_API_URL}/quiz/getallquiz`)
```

> This ensures the frontend works correctly when accessed from your browser outside Docker.

---

## Step 5: Stopping the project

```bash
docker-compose down
```

* Stops and removes containers
* Use `docker-compose down -v` to also remove volumes (database data)

---

## Notes

* **Database Credentials** in `docker-compose.yml`:

```yaml
environment:
  MYSQL_ROOT_PASSWORD: Veeruved18
  MYSQL_DATABASE: quizdb
```

* Spring Boot `application.properties` for Docker:

```properties
spring.datasource.url=jdbc:mysql://db:3306/quizdb?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=Veeruved18
server.address=0.0.0.0
server.port=8080
```
## 🧱 Database Credentials

| Key      | Value      |
| -------- | ---------- |
| Database | empdb      |
| Username | root       |
| Password | Veeruved18 |

Database data is persisted using the Docker volume `db_data`.

---

## 🧹 Step 4: Stop the Containers

```bash
docker-compose down
```

To remove all data (including database):

```bash
docker-compose down -v
```

---

## 🧑‍💻 Author

**Vedantraj K Patil**
📧 Email: [patilvedantraj@gmail.com](mailto:patilvedantraj@gmail.com)

---

## 🏁 Summary

This project demonstrates a complete **Full Stack CRUD system** using
**Spring Boot**, **React**, and **MySQL**, all running seamlessly with **Docker Compose**.
It’s a simple and clean example of how modern web applications can be structured and deployed.

---
