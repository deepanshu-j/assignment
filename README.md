# RECRUITMENT PORTAL BACKEND

#### Implemented in NODE.JS and MONGODB

## How to Run The server
0. Make sure you have Nodejs and npm installed
1. Clone the Repository
2. npm install
3. npm start
4. If doesn't works delete the node_modules folder (rm -rf node_modules) in the root dir and repeat from 2. 

## Problem Statement 

3 Main Entities ```Recruiter```, ```Candidate``` and ```Job```. <br />
```Recruiter``` can post many ```Job```s, ```Candidate``` can apply to many ```job```s. <br />

Features:

```Recruiter```
- Post a job
- List candidates who applied to a job.
- Reject or accept a candidate.
- Accepting a candidate at the end of vacancies available should change the status of job as ‘CLOSED’.

```Candidate```
- List all applied jobs and their status.
- Apply to one or more jobs.

## Some DB association Stuff and Rough Database Modelling 
Many to Many Relationship <br />
Used Two way embedding in mongoDB

## API endpoints
https://assign-ment.herokuapp.com/
