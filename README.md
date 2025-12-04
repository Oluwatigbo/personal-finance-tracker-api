# Personal Finance Tracker API

This project is a full-featured backend API designed for managing
personal financial data.
------------------------------------------------------------------------

## Overview

The **Personal Finance Tracker API** allows authenticated users to:
-   Track income and expenses\
-   Categorize transactions\
-   Create and manage budgets\
-   Set and monitor financial goals\
-   View financial data securely

The API follows clean MVC structure, includes validation, and is
deployed with full Swagger documentation.
------------------------------------------------------------------------

## Purpose
The purpose of this project is to:

-   Demonstrate backend development skills using **Node.js**,
    **Express**, and **MongoDB**
-   Implement secure authentication (OAuth/JWT)
-   Practice API architecture, documentation, and deployment
-   Showcase teamwork and real-world development workflow

------------------------------------------------------------------------

## Live API Documentation

Access full Swagger docs:

👉 **https://personal-finance-tracker-api-k3ya.onrender.com/api-docs**

Endpoints from the documentation have been incorporated below.

------------------------------------------------------------------------

# Development Environment

-   **Node.js + Express**
-   **MongoDB Atlas**
-   **Mongoose ODM**
-   **Swagger UI**
-   **Render.com** (Deployment)
-   **Git + GitHub** (Version control)
-   **VS Code** (Development)

------------------------------------------------------------------------

# Database Structure

The API stores data in MongoDB with collections:

-   **Users**
-   **Transactions** (11+ fields)
-   **Categories**
-   **Budgets**
-   **Goals**

Data uses references (userId) to ensure secure multi-user isolation.

------------------------------------------------------------------------

# Security

Security features include:

-   OAuth or JWT authentication\
-   Password hashing\
-   Input validation (Joi)\
-   HTTPS via Render\
-   Error handling without leaking internal details\
-   Rate limiting

------------------------------------------------------------------------

# Team Members

-   **Oluwatigbo Alao**\
-   **Nyasha Chimutapira**\
-   **Emmanuel Ezechukwu**\
-   **Mpinga Kalambayi Antoine**\
-   **Bhekimpilo Ncube**\
-   **DAGBAME FRANCK ZAGADOU**

------------------------------------------------------------------------

# YouTube Demo

A video presentation demonstrating routes, authentication, and database
operations is available on [Youtube](https://youtu.be/KBVP4Ycwt14).
