<h1 align="center">Teste Java + Angular com Tabelas</h1>

<p align="center">
  Aplicação fullstack com CRUD focado em listagem em tabelas, integrando Spring Boot e Angular 14.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Java-1.8-007396?style=for-the-badge&logo=java&logoColor=white"/>
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white"/>
  <img src="https://img.shields.io/badge/Angular-14-DD0031?style=for-the-badge&logo=angular&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white"/>
</p>

## 📋 Sobre o projeto

Projeto de teste técnico fullstack que implementa um CRUD completo com listagem em tabelas. Comunicação entre front e back via proxy do Angular CLI.

## 🛠️ Tecnologias

### Back-end
- Java 8
- Spring Boot (Web, Data JPA, DevTools)
- MySQL / PostgreSQL (drivers)
- MapStruct + Lombok
- Bean Validation (`validation-api`)
- JUnit 5

### Front-end
- Angular CLI 14.0.4
- TypeScript

## ✅ Pré-requisitos

- JDK 8+
- Maven 3.6+
- Node.js 14+
- Angular CLI 14
- MySQL 5.7+

## 🚀 Como executar

### Back-end

```bash
cd backend
mvn spring-boot:run
```

API em `http://localhost:8080`.

### Front-end

```bash
cd front-end
npm install
ng serve --proxy-config proxy.config.json
```

Aplicação em `http://localhost:4200`.

## 📁 Estrutura

```
.
├── backend/      # API Spring Boot
└── front-end/    # SPA Angular 14
```

---

Desenvolvido por [Gabriel Fernandes](https://github.com/Gabrielfsg).
