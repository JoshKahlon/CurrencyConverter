# USD to CAD Converter

A full-stack USD → CAD currency converter built with Next.js and TypeScript.

The app uses a backend API route to fetch live USD/CAD exchange rates from the Bank of Canada API, validates the response, and performs client-side conversion based on user input.

## Tech Stack
- Next.js (App Router)
- TypeScript
- React
- Bank of Canada Valet API

## Features
- Live USD → CAD exchange rates
- Backend API route with error handling
- Input validation and runtime response validation
- Simple React UI with state management

## How It Works
1. User enters a USD amount in the frontend
2. Frontend requests the latest exchange rate from a Next.js API route
3. Backend fetches data from the Bank of Canada API and validates it
4. Frontend computes and displays the converted CAD amount

## Running Locally
```bash
npm install
npm run dev
